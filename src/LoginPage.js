 import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import HandyManCharacter from "./img/hm_char.png";
import HandyManLogo from "./img/Hm_Logo 1.png";

const LoginPage = () => {
    const Navigate = useNavigate();
    // const {userType} = useParams();
    // const {userId} = useParams();
  const [mobile, setMobile] = useState('');
  const [consent, setConsent] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }

    if (!consent) {
      setError('You must accept the terms and privacy policy.');
      return;
    }

    setError('');
    setSubmitted(true);
  
    setTimeout(() => {
      alert('Login submitted!');
      setSubmitted(false);
    }, 2000);
  };

  useEffect(() => {
    const input = document.getElementById('mobileInput');
    const preventDefault = (e) => e.preventDefault();
    ['copy', 'paste', 'cut', 'drop', 'contextmenu'].forEach(event =>
      input.addEventListener(event, preventDefault)
    );
    return () => {
      ['copy', 'paste', 'cut', 'drop', 'contextmenu'].forEach(event =>
        input.removeEventListener(event, preventDefault)
      );
    };
  }, []);

  return (
    <div className="h-100 d-flex align-items-center py-2 flex-column">
      <div className="login_section bg-light rounded-3">
        <div className="d-flex justify-content-center mb-3">
          <img src={HandyManCharacter} alt="Handy Man Character" />
        </div>
        <form className="d-flex gap-3 flex-column" onSubmit={handleSubmit} autoComplete="off">
          <img src={HandyManLogo} alt="Handy Man Logo" />
          <h4>Sign into your account</h4>

          <div>
            <label htmlFor="mobileInput">
              Mobile Number<span className="req_star">*</span>
            </label>
            <input
              id="mobileInput"
              type="number"
              className="form-control"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              autoComplete="off"
            />
          </div>

          <span className="link">Login With User ID</span>

          <div>
            <div className="d-flex align-items-start gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                I’ve read the Service{' '}
                <a href="/terms" onClick={() => setShowTerms(true)}>Terms</a> &{' '}
                <a href="/policy" onClick={() => setShowPrivacy(true)}>Privacy Policy</a>.
              </span>
            </div>
          </div>

          {error && <span className="text-danger">{error}</span>}

          <div style={{ width: '100%', textAlign: 'start', padding: '1rem' }}>
            <button type="submit" onClick = {() => Navigate(`/profilePage/customer/74991775-cfb7-47e0-b963-5d32e02a570a`)}
             className={`responsive-login-btn ${submitted ? 'disabled' : ''}`} >
              {submitted ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      {/* Terms Modal */}
      <Modal show={showTerms} onHide={() => setShowTerms(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src="/TermsAndConditions" width="100%" height="400px" title="Terms" />
        </Modal.Body>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal show={showPrivacy} onHide={() => setShowPrivacy(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src="/PrivacyPolicy" width="100%" height="400px" title="Privacy Policy" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPage;