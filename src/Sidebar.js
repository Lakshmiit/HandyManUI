import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RouteIcon from '@mui/icons-material/Route';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';

const Sidebar = () => {
  return (
    <div className="m-0 p-0 sde_mnu">
            <div className="_mnu_dv">
              <span><DashboardIcon /> Dashboard</span>
            </div>
            <div className="_mnu_dv">
              <span><SupportAgentIcon /> Raise Ticket</span>
            </div>
            <div className="_mnu_dv">
              <span><PersonAddIcon /> Add Member</span>
            </div>
            <div className="_mnu_dv">
              <span><RouteIcon /> Track Ticket Status</span>
            </div>
            <div className="_mnu_dv">
              <span><NotificationsIcon /> Notifications</span>
            </div>
            <div className="_mnu_dv">
              <span><PaymentsIcon /> Buy Products</span>
            </div>
            <div className="_mnu_dv">
              <span><InventoryIcon /> Orders</span>
            </div>
            <div className="_mnu_dv">
              <span><ShoppingCartIcon /> Cart</span>
            </div>
            <div className="_mnu_dv">
              <span><AccountCircle /> My Accounts</span>
            </div>
          </div>
  );
};

export default Sidebar;
