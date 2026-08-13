import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerVendor } from "./utils/vendorStorage";

const VendorRegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const vendor = registerVendor({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password.trim(),
      });

      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/vendor/login");
      }, 1200);
    } catch (err) {
      setError(err.message || "Unable to register vendor.");
    }
  };

  return (
    <div className="h-100 mt-4 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ minWidth: 320, maxWidth: 520, width: "100%" }}>
        <h3 className="mb-3 text-center">Vendor Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Vendor Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Business or contact name"
              required
            />
          </div>
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
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
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
              placeholder="Create password"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          <small>
            Already registered? <a href="/vendor/login">Login here</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default VendorRegisterPage;
