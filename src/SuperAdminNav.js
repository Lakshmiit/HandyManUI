import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutSuperAdmin } from "./utils/superAdminStore";

// Small shared header used across the /superadmin/* pages so the super
// admin can hop between Vendors, Delivery Partners, and Orders without
// having to know the URLs.
const TABS = [
  { label: "Vendors", path: "/superadmin/vendors" },
  { label: "Delivery Partners", path: "/superadmin/delivery-partners" },
  { label: "Orders", path: "/superadmin/orders" },
];

const SuperAdminNav = ({ active }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutSuperAdmin();
    navigate("/vendor/login");
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
      <div className="btn-group" role="group">
        {TABS.map((tab) => (
          <button
            key={tab.path}
            type="button"
            className={`btn btn-sm ${active === tab.path ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => navigate(tab.path)}
            disabled={active === tab.path}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default SuperAdminNav;
