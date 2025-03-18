import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RouteIcon from '@mui/icons-material/Route';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StorefrontIcon from '@mui/icons-material/Storefront';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useParams } from 'react-router-dom';
// Sidebar component
const Sidebar = () => {  
  const {userType} = useParams();
  const {userId} = useParams();
  // const {dealerId} = useParams();
  // const {technicianId} = useParams();
  const {ProductOwnedBy} = useParams();
  // const {UserId} = useParams();
  const {district} = useParams();
  const {category} = useParams();

const menuConfig = {
    customer: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", 
        TargetUrl: `/profilePage/${userType}/${userId}`},
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Book A Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` },
    { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}` }, 
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <InventoryIcon />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}` },
      { MenuIcon: <LocalOfferIcon />, MenuTitle: "Offers", TargetUrl: "" },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "Accounts", TargetUrl: "" },
    ],
    builder: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `/profilePage/${userType}/${userId}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Book A Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: "" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` },
    ],
    dealer: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `/profilePage/${userType}/${userId}` },
      { MenuIcon: <UploadIcon />, MenuTitle: "Upload Products", TargetUrl: `/product-list/${ProductOwnedBy}` },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}`},
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`},
    ],
    trader: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `/profilePage/${userType}/${userId}` },
      { MenuIcon: <UploadIcon />, MenuTitle: "Upload Products", TargetUrl: "" },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}`},
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`},
    ],
    estimator: [
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `/profilePage/${userType}/${userId}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Book A Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: "" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` },
    ],
    technician: [ 
      { MenuIcon: <DashboardIcon />, MenuTitle: "Dashboard", TargetUrl: `/profilePage/${userType}/${userId}` },
      { MenuIcon: <PersonAddIcon />, MenuTitle: "Add Technician", TargetUrl: "" },
    { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: `/notificationTechnician/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <NotificationsActiveIcon />, MenuTitle: "Notifications", TargetUrl: "" },
      { MenuIcon: <TransferWithinAStationIcon />, MenuTitle: "Track Technician", TargetUrl: "" },
      { MenuIcon: <AccountCircleIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`},
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

