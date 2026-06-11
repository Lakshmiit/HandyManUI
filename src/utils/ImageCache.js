const PREFIX = "img_b64_";
const DB_NAME = "LakshmiMartImages";
const STORE = "images";
const blobCache = {};

const MAX_IMAGES = 500;
const EXPIRY_MS = 3 * 24 * 60 * 60 * 1000;

let dbInstance = null;

// ─── Open DB 
function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      // stores { base64, savedAt } together
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };

    req.onsuccess = (e) => {
      dbInstance = e.target.result;

      // If another tab deletes the DB, reset our instance
      dbInstance.onversionchange = () => {
        dbInstance.close();
        dbInstance = null;
      };

      resolve(dbInstance);
    };

    req.onerror = (e) => reject(e.target.error);

    req.onblocked = () => {
      console.warn("DB open blocked by another tab");
    };
  });
}

// ─── Save image with timestamp 
async function saveToDB(db, filename, base64) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(
      { base64, savedAt: Date.now() },
      PREFIX + filename
    );
    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
}

async function evictIfNeeded(db) {
  try {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const now = Date.now();
   
    const keys = await new Promise((res, rej) => {
      const r = store.getAllKeys();
      r.onsuccess = () => res(r.result || []);
      r.onerror = (e) => rej(e.target.error);
    });

    const values = await new Promise((res, rej) => {
      const r = store.getAll();
      r.onsuccess = () => res(r.result || []);
      r.onerror = (e) => rej(e.target.error);
    });

    // pair keys with values
    const entries = keys.map((key, i) => ({
      key,
      savedAt: values[i]?.savedAt || 0,
    }));

    // Step 1: delete expired images (older than 3 days)
    const expired = entries.filter((e) => now - e.savedAt > EXPIRY_MS);
    for (const entry of expired) {
      store.delete(entry.key);
      delete blobCache[entry.key.replace(PREFIX, "")];
    }

    // Step 2: if still over limit, delete oldest first
    const remaining = entries.filter((e) => now - e.savedAt <= EXPIRY_MS);
    if (remaining.length > MAX_IMAGES) {
      remaining.sort((a, b) => a.savedAt - b.savedAt);
      const overflow = remaining.length - MAX_IMAGES;
      const toDelete = remaining.slice(0, overflow + Math.ceil(MAX_IMAGES * 0.1));
      for (const entry of toDelete) {
        store.delete(entry.key);
        delete blobCache[entry.key.replace(PREFIX, "")];
      }
    }

    await new Promise((res) => { tx.oncomplete = res; tx.onerror = res; });

    if (expired.length > 0) {
      console.log(`Removed ${expired.length} expired images from cache`);
    }
  } catch (e) {
    console.warn("Eviction failed silently:", e);
  }
}
const ImageCache = {

  // Save base64 image to IndexedDB
  async setBase64(filename, base64) {
    try {
      const db = await openDB();
      await evictIfNeeded(db);
      await saveToDB(db, filename, base64);
    } catch (e) {
      if (e?.name === "QuotaExceededError") {
        // Storage full — wipe everything and save fresh
        console.warn("Storage full — clearing cache and retrying");
        await ImageCache.clearAll();
        try {
          const db = await openDB();
          await saveToDB(db, filename, base64);
        } catch (e2) {
          console.error("Save failed after quota clear:", e2);
        }
      }
      // any other error — skip silently, image will load from API next time
    }
  },

  // Get base64 image — returns null if not cached or expired
  async getBase64(filename) {
    try {
      const db = await openDB();
      const record = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const req = tx.objectStore(STORE).get(PREFIX + filename);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = (e) => reject(e.target.error);
      });

      if (!record) return null;

      // Check if expired
      if (Date.now() - record.savedAt > EXPIRY_MS) {
        try {
          const tx = db.transaction(STORE, "readwrite");
          tx.objectStore(STORE).delete(PREFIX + filename);
        } catch {}
        delete blobCache[filename];
        return null; 
      }

      return record.base64;
    } catch (e) {
      return null; 
    }
  },

  getBlobUrl(filename) {
    return blobCache[filename] || null;
  },

  setBlobUrl(filename, blobUrl) {
    blobCache[filename] = blobUrl;
  },

  async clearAll() {
    try {
      if (dbInstance) {
        dbInstance.close();
        dbInstance = null;
      }
      await new Promise((resolve) => {
        const req = indexedDB.deleteDatabase(DB_NAME);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve(); 
        req.onblocked = () => setTimeout(resolve, 2000); 
      });
      Object.keys(blobCache).forEach((k) => delete blobCache[k]);
      console.log("Image cache cleared");
    } catch (e) {
      console.error("Cache clear failed:", e);
    }
  },
};

export default ImageCache;

// const PREFIX = "img_b64_";

// // Memory cache for blob URLs (fast access within same session)
// const blobCache = {};

// const ImageCache = {

//   // ✅ GET base64 from localStorage (persists across sessions)
//   getBase64(generatedFilename) {
//     try {
//       return localStorage.getItem(PREFIX + generatedFilename) || null;
//     } catch {
//       return null;
//     }
//   },

//   // ✅ SAVE base64 to localStorage (persists across sessions)
//   setBase64(generatedFilename, base64) {
//     try {
//       localStorage.setItem(PREFIX + generatedFilename, base64);
//     } catch (e) {
//       // localStorage full — clear old image cache and retry
//       console.warn("Storage full, clearing image cache...");
//       ImageCache.clearAll();
//       try {
//         localStorage.setItem(PREFIX + generatedFilename, base64);
//       } catch (e2) {
//         console.error("Cache save failed after clear:", e2);
//       }
//     }
//   },

//   // ✅ Check if image exists in cache
//   has(generatedFilename) {
//     return !!ImageCache.getBase64(generatedFilename);
//   },

//   // Blob URL cache (in-memory only, for fast re-renders in same session)
//   getBlobUrl(generatedFilename) {
//     return blobCache[generatedFilename] || null;
//   },

//   setBlobUrl(generatedFilename, blobUrl) {
//     blobCache[generatedFilename] = blobUrl;
//   },

//   // ✅ Clear all cached images from localStorage
//   clearAll() {
//     try {
//       Object.keys(localStorage)
//         .filter(key => key.startsWith(PREFIX))
//         .forEach(key => localStorage.removeItem(key));
//       // Also clear blob cache
//       Object.keys(blobCache).forEach(k => delete blobCache[k]);
//     } catch (e) {
//       console.error("Cache clear failed:", e);
//     }
//   }
// };

// export default ImageCache;

// // const PREFIX = "img_b64_";

// // // memory cache for blob urls (fast access)
// // const blobCache = {};

// // const ImageCache = {
// //   getBase64(generatedFilename) {
// //     try {
// //       return sessionStorage.getItem(PREFIX + generatedFilename) || null;
// //     } catch {
// //       return null;
// //     }
// //   },

// //   setBase64(generatedFilename, base64) {
// //     try {
// //       sessionStorage.setItem(PREFIX + generatedFilename, base64);
// //     } catch {
// //     }
// //   },

// //   getBlobUrl(generatedFilename) {
// //     return blobCache[generatedFilename] || null;
// //   },

// //   setBlobUrl(generatedFilename, blobUrl) {
// //     blobCache[generatedFilename] = blobUrl;
// //   }
// // };

// // export default ImageCache;