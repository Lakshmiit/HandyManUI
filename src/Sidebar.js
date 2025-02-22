import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RouteIcon from '@mui/icons-material/Route';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useParams } from 'react-router-dom';
// Sidebar component
const Sidebar = () => {  
  const {userType} = useParams();
  const {customerId} = useParams();
  const {dealerId} = useParams();
  const {technicianId} = useParams();
  const {ProductOwnedBy} = useParams();
  // const {UserId} = useParams();
  const {district} = useParams();
  const {category} = useParams();


  const menuConfig = {
    customer: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", 
        TargetUrl: `https://handymanserviceproviders.com/CustomerProfilePage?ReactToken=${customerId}$${userType}`},
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${customerId}/${userType}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Add Member", TargetUrl: "/addMember" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${customerId}` },
    { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${customerId}` }, 
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/buyProducts" },
      { MenuIcon: <InventoryIcon />, MenuTitle: "Orders", TargetUrl: "/Orders" },
      { MenuIcon: <ShoppingCartIcon />, MenuTitle: "Cart", TargetUrl: "/Cart" },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "Accounts", TargetUrl: "/Accounts" },
    ],
    builder: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `https://handymanserviceproviders.com/CustomerProfilePage?ReactToken=${customerId}$${userType}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Add Member", TargetUrl: "/addMember" },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "/raiseQuote" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: "/Notifications" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/buyProducts" },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "/Account" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "/AddAccount" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "/raiseTicket/:customerId/:userType" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: "/TrackTicket" },
    ],
    dealer: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `https://handymanserviceproviders.com/CustomerProfilePage?ReactToken=${dealerId}$${userType}` },
      { MenuIcon: <UploadIcon />, MenuTitle: "Upload Products", TargetUrl: `/product-list/${ProductOwnedBy}/${userType}` },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "/raiseQuote/:userType" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${category}/${district}/${dealerId}` },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/buyProducts"},
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "/Account" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "/AddAccount" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "/raiseTicket/:customerId/:userType" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: "/TrackTicket"},
    ],
    trader: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `https://handymanserviceproviders.com/CustomerProfilePage?ReactToken=${dealerId}$${userType}` },
      { MenuIcon: <UploadIcon />, MenuTitle: "Upload Products", TargetUrl: "/product-list" },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "/raiseQuote/:userType" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${category}/${district}/${dealerId}` },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/buyProducts"},
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "/Account" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "/AddAccount" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "/raiseTicket/:customerId/:userType" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: "/TrackTicket"},
    ],
    estimator: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `https://handymanserviceproviders.com/CustomerProfilePage?ReactToken=${customerId}$${userType}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Add Member", TargetUrl: "/addMember" },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "/raiseQuote" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: "/Notifications" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/buyProducts" },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "/Account" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "/AddAccount" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "/raiseTicket/:customerId/:userType" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: "/TrackTicket" },
    ],
    technician: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `https://handymanserviceproviders.com/CustomerProfilePage?ReactToken=${technicianId}$${userType}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Add Technician", TargetUrl: "/addTechnician" },
    { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: `/notificationTechnician/${userType}/${category}/${district}/${technicianId}` },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: "/Notifications" },
      { MenuIcon: <TransferWithinAStationIcon />, MenuTitle: "Track Technician", TargetUrl: "/TrackTechnician" },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "/Account" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "/AddAccount" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/buyProducts" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "/raiseTicket/:customerId/:userType" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: "/TrackTicket"},
    ],
  };

   const { userType: fallbackUserType } = useParams(); 
   const selectedUserType = userType || fallbackUserType;
  const menuList = menuConfig[selectedUserType] || [];

  return (
    <div>
        {menuList.map((menu, index) => (
          <div key={index}>
            <Link to={menu.TargetUrl}>
              <i className="_mnu_dv">
                {menu.MenuIcon} {menu.MenuTitle}
              </i>
            </Link>
          </div>
        ))}
    </div>
  );
};

const App = () => {
  
  const { selectedUserType } = useParams(); 

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      <div className="m-0 p-0 sde_mnu">
        <Sidebar userType={selectedUserType} />
      </div>
    </div>
  );
};

export default App;

