import React from "react";
import HandyManLogo from "./img/Hm_Logo 1.png";

export default function PrivacyPolicy() {
  return (
    <body>
      <header className="header d-flex">
        <img
          className="h-100"
          src={HandyManLogo}
          alt="Handy Man Logo"
        />
        <div className="spacer"></div>
        <div className="d-flex align-items-center gap-3">
          <div className="hdr_icns d-flex gap-3"></div>
        </div>
      </header>
 
      <div className="wrapper">
        <div className="container mt_120px h-100 p-0" style={{marginTop: "80px"}}>
          <div align="center">
            <h1 className="tc">Privacy Policy</h1>
          </div>

          <div className="text-justify">
            <div className="mt-20">
              <h4>Ensuring Your Data's Confidentiality</h4>

              <div className="mt-20">
                <h4>
                  Welcome to Lakshmi Sai Service Providers privacy policy
                  ("Privacy Policy" or "Policy").
                </h4>
                <p>
                  Lakshmi Sai Service Providers are engaged in the business of
                  providing web-based solutions to facilitate connections
                  between customers that seek specific services and service
                  professionals that offer these services. This Policy outlines
                  our practices in relation to the collection, storage, usage,
                  processing, and disclosure of personal data that you have
                  consented to share with us when you access, use, or otherwise
                  interact with our website or mobile application (collectively,
                  "Platform").
                </p>

                <h4>1. BACKGROUND AND KEY INFORMATION</h4>
                <p>(a) How this Policy applies:</p>
                <p>
                  This Policy applies to individuals who access or use the
                  Services or otherwise avail the Professional Services.
                </p>
                <p>
                  By using the Platform, you consent to the collection, storage,
                  usage, and disclosure of your personal data.
                </p>
                <p>(b) Review and Updates:</p>
                <p>
                  We regularly review and update our Privacy Policy. Please
                  ensure your personal data is accurate and current.
                </p>
              </div>

              <div className="mt-20">
                <p>(c) Third-Party Services:</p>
                <p>
                  The Platform may include links to third-party websites,
                  plug-ins, and services. We are not responsible for their
                  privacy statements.
                </p>
              </div>

              <div className="mt-20">
                <h4>2. PERSONAL DATA THAT WE COLLECT</h4>
                <p>
                  (a) We collect different types of personal data about you,
                  including but not limited to:
                </p>
                <p>(i) Contact Data</p>
                <p>(ii) Identity and Profile Data</p>
                <p>(iii) Marketing and Communications Data</p>
                <p>(iv) Technical Data</p>
                <p>(v) Usage Data</p>
                <p>
                  (b) We may collect aggregated data for analytical purposes.
                </p>
                <p>
                  (c) Refusal to provide personal data may limit your access to
                  the Services.
                </p>
              </div>

              <div className="mt-20">
                <h3>3. HOW DO WE COLLECT PERSONAL DATA?</h3>
                <p>(a) Direct Interactions</p>
                <p>(b) Automated technologies such as cookies</p>
                <p>(c) Third-party sources</p>
              </div>

              <div className="mt-20">
                <h3>4. HOW DO WE USE YOUR PERSONAL DATA?</h3>
                <p>(a) We use your personal data for the following purposes:</p>
                <p>(i) To verify identity</p>
                <p>(ii) Provide Services</p>
                <p>(iii) Enable Professional Services</p>
                <p>(iv) Personalize experience</p>
                <p>
                  (v-xvi) Other operational, legal, and service-related purposes
                </p>
                <p>(b) You authorise communication from us.</p>
                <p>
                  (c) Information may be shared with service professionals,
                  partners, and affiliates.
                </p>
                <p>(d) Data may be disclosed when required by law.</p>
              </div>

              <div className="mt-20">
                <h3>5. COOKIES</h3>
                <p>(a) Cookies enable recognition and tracking</p>
                <p>(b) Used for personalization and analytics</p>
                <p>(c) Third-party cookies may also be used</p>
              </div>

              <div className="mt-20">
                <h3>6. DISCLOSURES OF YOUR PERSONAL DATA</h3>
                <p>(a) We may share your data with:</p>
                <p>(i) Service professionals</p>
                <p>(ii) Internal third parties</p>
                <p>(iii) External service providers and regulators</p>
                <p>(b) All third parties must follow data protection rules.</p>
              </div>

              <div className="mt-20">
                <h3>7. YOUR RIGHTS IN RELATION TO YOUR PERSONAL DATA</h3>
                <p>(a) Access and Updates</p>
                <p>(b) Opt-out from marketing communications</p>
              </div>

              <div className="mt-20">
                <h4>8. DELETION OF ACCOUNT AND PERSONAL DATA</h4>
                <p>You may delete your account by contacting us.</p>
              </div>

              <div className="mt-20">
                <h3>9. TRANSFERS OF YOUR PERSONAL DATA</h3>
                <p>
                  Your data may be transferred across countries where our
                  servers or partners operate.
                </p>
              </div>

              <div className="mt-20">
                <h4>10. DATA SECURITY</h4>
                <p>
                  We implement appropriate security measures including
                  encryption and password protection.
                </p>
              </div>

              <div className="mt-20">
                <h4>11. DATA RETENTION</h4>
                <p>
                  Your data is retained as long as necessary for stated
                  purposes.
                </p>
              </div>

              <div className="mt-20">
                <h4>12. BUSINESS TRANSITIONS</h4>
                <p>Your data may be transferred during business transitions.</p>
              </div>

              <div className="mt-20">
                <h4>13. USER GENERATED CONTENT</h4>
                <p>Your posted content may become public.</p>
              </div>

              <div className="mt-20">
                <h4>14. UPDATES TO THIS POLICY</h4>
                <p>The Policy may be updated periodically.</p>
              </div>

              <div className="mt-20">
                <h4>15. GRIEVANCE OFFICER</h4>
                <p>Contact us at handymanserviceproviders@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        Powered by{" "}
        <span className="text-primary strong">
          Lakshmi Sai Service Provider
        </span>
        <br />
        <span className="small">
          © 2025 Lakshmi software development center. All rights reserved.
        </span>
      </div>
    </body>
  );
}
