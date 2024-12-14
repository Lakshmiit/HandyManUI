
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadIcon from "@mui/icons-material/Upload";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ForumIcon from "@mui/icons-material/Forum";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GroupsIcon from "@mui/icons-material/Groups";

const menuConfig = [
  { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: "https://lakshmisaiserviceproviders.com/UserIdLogin" },
  {
    MenuIcon: <AccountCircleIcon />,
    MenuTitle: "Profile Directory",
    TargetUrl: "#",
    subMenu: [
      { MenuTitle: "Customer", TargetUrl: "/ProfileDirectory/Customer" },
      { MenuTitle: "Trader / Dealer", TargetUrl: "/ProfileDirectory/Trader" },
      { MenuTitle: "Technician / Technical Agency", TargetUrl: "/ProfileDirectory/Technician" },
      { MenuTitle: "Builder / Contractor", TargetUrl: "/ProfileDirectory/Builder" },
      { MenuTitle: "Estimator / Engineer", TargetUrl: "/ProfileDirectory/Estimator" },
    ],
  },
  { MenuIcon: <ImportContactsIcon />, MenuTitle: "Customer Care Directory", TargetUrl: "/CustomerDirectory" },
  { MenuIcon: <PersonOutlineIcon />, MenuTitle: "Accounts", TargetUrl: "/Accounts" },
  { MenuIcon: <UploadIcon />, MenuTitle: "Upload Product", TargetUrl: "/product-list" },
  { MenuIcon: <SupportAgentIcon />, MenuTitle: "Customer Care Helpdesk", TargetUrl: "/CustomerHelpDesk" },
  { MenuIcon: <ForumIcon />, MenuTitle: "Chat", TargetUrl: "/Chat" },
  { MenuIcon: <MailOutlineIcon />, MenuTitle: "SMS Center", TargetUrl: "/SMSCenter" },
  { MenuIcon: <GroupsIcon />, MenuTitle: "Meetings", TargetUrl: "/meetings" },
];

const AdminSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (menuTitle) => {
    setOpenDropdown(openDropdown === menuTitle ? null : menuTitle);
  };

  return (
    <div>
      {menuConfig.map((menu, index) => (
        <div key={index}>
          <div className="menu-item">
            <Link to={menu.TargetUrl}>
            <div
              className="_mnu_dv"
              onClick={() => menu.subMenu && handleDropdownToggle(menu.MenuTitle)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", gap: "10px"}}>
                {menu.MenuIcon} {menu.MenuTitle}
              </div>
              {menu.subMenu && <ArrowDropDownIcon />}
            </div>
            </Link>
          </div>

          {menu.subMenu && openDropdown === menu.MenuTitle && (
            <div className="dropdown">
              {menu.subMenu.map((subItem, subIndex) => (
                <Link to={subItem.TargetUrl} key={subIndex}>
                  <div className="_mnu_dv">{subItem.MenuTitle}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// App Component
const App = () => {
  return (
    <div className="d-flex">
      <div className="m-0 p-0 adm_mnu">
        <AdminSidebar />
      </div>
    </div>
  );
};

export default App;