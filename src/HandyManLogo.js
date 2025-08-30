import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HandyManCharacter from "./img/hm_char.png";
import HandyManLogo from "./img/Hm_Logo 1.png";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const wordRefs = useRef([]);
  const [platform, setPlatform] = useState("Detecting...");

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      setPlatform("iOS Device");
      alert("Running on iOS");
    } else if (/android/i.test(ua)) {
      setPlatform("Android Device");
     alert("Running on Android");
    } else {
      setPlatform("Other (Web/Desktop)");
      alert("Running on Other Platform");
    }

    // Word animations
    wordRefs.current.forEach((word, index) => {
      setTimeout(() => {
        if (word) word.classList.add('show');
      }, index * 1000);
    });

    // Safe navigation timeout
    const totalDuration = wordRefs.current.length * 1500;
    const redirectTimeout = setTimeout(() => {
      alert("Redirecting to /loginnew...");
      navigate('/loginnew');
    }, totalDuration);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="landing_page h-90 d-flex align-items-center py-2 flex-column mt-2">
      <div className="spacer"></div>
      <div className="w-auto p-4 text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <img src={HandyManCharacter} alt="Character" width="200" height="200" className="img-fluid"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img src={HandyManLogo} alt="Logo" width="190" height="90" className="img-fluid"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div id="ldr_txt" className="gry_fnt py-2">
                <div ref={el => wordRefs.current[0] = el} className="word">• Your Home</div>
                <div ref={el => wordRefs.current[1] = el} className="word">• Your Needs</div>
                <div ref={el => wordRefs.current[2] = el} className="word">• Our Solutions</div>
              </div>
            </div>
          </div>
          {/* Debug Info */}
          <div className="row mt-3">
            <div className="col">
              <small className="text-muted">Platform: {platform}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default LandingPage;