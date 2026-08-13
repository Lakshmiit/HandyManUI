import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findVendorByCredentials } from "./utils/vendorStorage";

const VendorLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    const vendor = findVendorByCredentials(email.trim().toLowerCase(), password.trim());

    if (!vendor) {
      setError("Vendor credentials not found. Please register or try again.");
      return;
    }

    localStorage.setItem("vendorSession", vendor.vendorId);
    // A vendor lands on their profile first and can open stock management from there.
    navigate(`/vendor/preview/${vendor.vendorId}`);
  };

  return (
    <div className="h-100 mt-4 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ minWidth: 320, maxWidth: 520, width: "100%" }}>
        <h3 className="mb-3 text-center">Vendor Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vendor@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <small>
            New vendor? <a href="/vendor/register">Register here</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default VendorLoginPage;
