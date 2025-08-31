import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HandyManCharacter from "./img/hm_char.png";
import HandyManLogo from "./img/Hm_Logo 1.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const wordRefs = useRef([]);
  const [platform, setPlatform] = useState("Detecting...");
  const [debugMessage, setDebugMessage] = useState("");

  useEffect(() => {
    try {
      // ✅ Safe platform detection
      const ua = navigator.userAgent || "";
      if (/iPad|iPhone|iPod/.test(ua)) {
        setPlatform("iOS Device");
        setDebugMessage("✅ Running on iOS");
      } else if (/android/i.test(ua)) {
        setPlatform("Android Device");
        setDebugMessage("✅ Running on Android");
      } else {
        setPlatform("Other (Web/Desktop)");
        setDebugMessage("✅ Running on Other Platform");
      }

      // ✅ Word animations
      wordRefs.current.forEach((word, index) => {
        setTimeout(() => {
          if (word) word.classList.add("show");
        }, index * 1000);
      });

      // ✅ Safe navigation timeout (extra delay for iOS)
      const totalDuration = wordRefs.current.length * 1500;
      const redirectTimeout = setTimeout(() => {
        setDebugMessage("➡️ Redirecting to /loginnew");
        navigate("/loginnew");
      }, totalDuration + 500);

      return () => clearTimeout(redirectTimeout);
    } catch (err) {
      setDebugMessage("❌ Error: " + err.message);
      console.error("LandingPage Error:", err);
    }
  }, [navigate]);

  return (
    <div className="landing_page h-90 d-flex align-items-center py-2 flex-column mt-2">
      <div className="spacer"></div>
      <div className="w-auto p-4 text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                src={HandyManCharacter}
                alt="Character"
                width="200"
                height="200"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img
                src={HandyManLogo}
                alt="Logo"
                width="190"
                height="90"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div id="ldr_txt" className="gry_fnt py-2">
                <div ref={(el) => (wordRefs.current[0] = el)} className="word">
                  • Your Home
                </div>
                <div ref={(el) => (wordRefs.current[1] = el)} className="word">
                  • Your Needs
                </div>
                <div ref={(el) => (wordRefs.current[2] = el)} className="word">
                  • Our Solutions
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Debug Info (visible on screen) */}
          <div className="row mt-3">
            <div className="col">
              <small className="text-muted">Platform: {platform}</small>
              <br />
              <small style={{ color: "red" }}>{debugMessage}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default LandingPage;
