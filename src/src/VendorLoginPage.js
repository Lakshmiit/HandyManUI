import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findVendorByCredentials, vendorAdminLogin, VENDOR_ADMIN_CREDENTIALS } from "./utils/vendorStorage";

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

    const username = email.trim();

    // Same login form doubles as the admin gate: if the username matches
    // the admin account, route to the vendor-approval console instead of
    // a vendor profile. Any other username goes through normal vendor auth.
    if (username.toLowerCase() === VENDOR_ADMIN_CREDENTIALS.username.toLowerCase()) {
      const isAdmin = vendorAdminLogin(username, password);
      if (!isAdmin) {
        setError("Invalid admin credentials.");
        return;
      }
      navigate("/admin/vendor/requests");
      return;
    }

    const vendor = findVendorByCredentials(username.toLowerCase(), password.trim());

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
              type="text"
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
