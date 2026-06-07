const PREFIX = "img_b64_";
const DB_NAME = "LakshmiMartImages";
const STORE = "images";
const blobCache = {};

let dbInstance = null;

function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore(STORE);
    };
    req.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

const ImageCache = {

  // Save base64 to IndexedDB
  async setBase64(filename, base64) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put(base64, PREFIX + filename);
        tx.oncomplete = () => resolve(true);
        tx.onerror = (e) => reject(e.target.error);
      });
    } catch (e) {
      console.error("Cache save failed:", e);
    }
  },

  // Get base64 from IndexedDB
  async getBase64(filename) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const req = tx.objectStore(STORE).get(PREFIX + filename);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = (e) => reject(e.target.error);
      });
    } catch (e) {
      return null;
    }
  },

  // Memory blob cache (fastest — same session)
  getBlobUrl(filename) {
    return blobCache[filename] || null;
  },

  setBlobUrl(filename, blobUrl) {
    blobCache[filename] = blobUrl;
  },

  // Clear all
  async clearAll() {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).clear();
        tx.oncomplete = () => resolve(true);
      });
    } catch (e) {
      console.error("Cache clear failed:", e);
    }
  }
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