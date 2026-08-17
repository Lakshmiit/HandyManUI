/*
 * speechAlert.js
 *
 * WHY THE VOICE ALERTS WEREN'T SPEAKING ON MOBILE:
 * The existing code called `window.speechSynthesis.speak(...)` directly
 * from a background poll/listener (no click involved). Mobile WebViews
 * apply the same "needs a user gesture" restriction to speech synthesis
 * that they apply to audio playback — a speak() call fired without a
 * prior tap is silently ignored on most Android WebViews.
 *
 * There are two other common mobile/WebView speech-synthesis gotchas
 * this file also works around:
 *   1. Voices load asynchronously — speak() called before the voice
 *      list is ready can silently no-op on some devices.
 *   2. A long-standing Android Chrome/WebView bug where speech just
 *      stops after ~15 seconds unless you periodically call
 *      pause()/resume() to keep it alive.
 *
 * USAGE:
 *   import { speakAlert } from "./speechAlert";
 *   speakAlert("New order received from John, zip code 12345.");
 */

let unlocked = false;
let voicesReady = false;

function primeVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const existing = window.speechSynthesis.getVoices();
  if (existing.length > 0) {
    voicesReady = true;
    return;
  }
  window.speechSynthesis.onvoiceschanged = () => {
    voicesReady = window.speechSynthesis.getVoices().length > 0;
  };
}

function unlockSpeech() {
  if (unlocked) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    // A near-silent, near-instant utterance spoken directly inside a
    // user-gesture handler. This "unlocks" speechSynthesis on mobile
    // WebViews so later automatic (non-gesture) speak() calls are
    // allowed for the rest of the session.
    const unlockUtterance = new SpeechSynthesisUtterance(" ");
    unlockUtterance.volume = 0;
    window.speechSynthesis.speak(unlockUtterance);
    unlocked = true;
  } catch {
    // will retry on the next gesture
  }
}

if (typeof document !== "undefined") {
  primeVoices();
  ["touchstart", "click"].forEach((evt) =>
    document.addEventListener(evt, unlockSpeech, { passive: true })
  );
}

// Android Chrome/WebView bug workaround: speech stops after ~15s unless
// kept alive. While anything is speaking, nudge it every 10s.
let keepAliveTimer = null;
function startKeepAlive() {
  stopKeepAlive();
  keepAliveTimer = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      stopKeepAlive();
      return;
    }
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  }, 10000);
}
function stopKeepAlive() {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

/**
 * Speak a short voice alert. Safe to call from background pollers —
 * silently no-ops on browsers/WebViews without speech support at all,
 * but on ones that support it (including most Android WebViews, once
 * unlocked by a tap) it will actually speak instead of failing silently.
 */
export function speakAlert(message, { rate = 1, pitch = 1 } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  try {
    // Clear any stuck/queued utterances first — Android WebView's queue
    // can get stuck, silently blocking every future speak() call.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onstart = startKeepAlive;
    utterance.onend = stopKeepAlive;
    utterance.onerror = stopKeepAlive;

    window.speechSynthesis.speak(utterance);
  } catch {
    // speech synthesis unsupported/blocked — the bell sound and visual
    // badge still cover the notification
  }
}

export default speakAlert;
