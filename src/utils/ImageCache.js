const PREFIX = "img_b64_";

// memory cache for blob urls (fast access)
const blobCache = {};

const ImageCache = {
  getBase64(generatedFilename) {
    try {
      return sessionStorage.getItem(PREFIX + generatedFilename) || null;
    } catch {
      return null;
    }
  },

  setBase64(generatedFilename, base64) {
    try {
      sessionStorage.setItem(PREFIX + generatedFilename, base64);
    } catch {
      // ignore storage quota errors
    }
  },

  getBlobUrl(generatedFilename) {
    return blobCache[generatedFilename] || null;
  },

  setBlobUrl(generatedFilename, blobUrl) {
    blobCache[generatedFilename] = blobUrl;
  }
};

export default ImageCache;