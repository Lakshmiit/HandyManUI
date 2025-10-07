const PREFIX = "img_b64_"; // we store base64 only, not blob URLs

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
      // If storage quota is exceeded, fail silently
    }
  },
};

export default ImageCache;
