import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
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

  const handleBack = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/profilePage/customer/${userId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
      <div className="d-flex align-items-center gap-2">
        <IconButton
          size="small"
          onClick={handleBack}
          aria-label="go back"
        >
          <ArrowBackIcon />
        </IconButton>

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
      </div>

      <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default SuperAdminNav;