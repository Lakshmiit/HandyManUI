import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from './Header.js';
import Footer from './Footer.js';

import {
  Dashboard as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  NotificationsNone as NotificationsNoneIcon,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
import "./App.css";

const NotificationsList = ({ notifications, highlightedItem }) => {
  const navigate = useNavigate();
  const {userType} = useParams();
  const {userId} = useParams();

  const customerOrdersNotifications = notifications.filter(
    (item) => (item.assignedTo === "Customer" && item.status === "Assigned" ) || (item.assignedTo === "Admin" && item.status === "Draft" && item.buyProductId !== null)
  );
  
  const handleOrdersClick = (buyProductId) => {
    navigate(`/viewCustomerBuyProductOrders/${userType}/${userId}/${buyProductId}`, { state: { buyProductId } });
  };

  return (
    <div>
      <div className="notification-list">
        {customerOrdersNotifications.map((notification) => (
          <div
            key={notification.buyProductId}
            className={`notification-item ${
              notification.buyProductId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Buy Product ID: </strong>{" "}
              <span
                onClick={() => handleOrdersClick(notification.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.buyProductId}
              </span>
            </div>
            <div>
              <strong>Product Name:</strong> {notification.productName}
            </div>
            <div>
              <strong>Category:</strong> {notification.category}
            </div>
            <div className="notification-date">
              <strong>Date:</strong> {new Date(notification.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Notification Component
const CustomerOrders = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [productNotifications, setProductNotifications] = useState([]);
  const [newProductCount, setNewProductCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [glowProduct, setGlowProduct] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const {userType} = useParams();
  const { userId } = useParams();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  // API Call to fetch notifications
  useEffect(() => { 
    const fetchNotifications = async () => {
      try {
        const [buyProductResponse] = await Promise.all([
          fetch(
          `https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsForUserList?UserID=${userId}`
        ),
      ]);
        const productOrdersData = await buyProductResponse.json();

        const productOrdersFiltered = productOrdersData.filter(
          (item) => (item.assignedTo === "Customer" && item.status === "Assigned" ) || (item.assignedTo === "Admin" && item.status === "Draft"  && item.buyProductId !== null));
        const ordersCount = productOrdersFiltered.length;

        setProductNotifications(productOrdersFiltered);
        setNewProductCount(ordersCount);
        setGlowProduct(ordersCount > 0);
 
        if (ordersCount > 0) {
          setHighlightedProduct(productOrdersFiltered[0].buyProductId);
        }

        const totalNotifications = ordersCount ;
        setNewNotificationCount(totalNotifications);
        setGlow(totalNotifications > 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  const handleClearProductNotifications = () => {
    setNewProductCount(0);
    setGlowProduct(false);
    setHighlightedProduct(null);
  };


  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div>
   <Header />
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 p-0 sde_mnu">
          <Sidebar />
        </div>
      )}

      {isMobile && (
        <div className="floating-menu">
          <Button
            variant="primary"
            className="rounded-circle shadow"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertIcon />
          </Button>

          {showMenu && (
            <div className="sidebar-container">
              <Sidebar />
            </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
        <h2 className="text-start mb-2 fs-20">
          <ArrowBackIcon fontSize="large" />{" "}
          <NotificationsNoneIcon
            fontSize="large"
            className={glow ? "glow" : ""}
          />{" "}
          Orders {" "}
          {newNotificationCount > 0 && (
            <span className="badge bg-danger">{newNotificationCount}</span>
          )}
        </h2>

        <div className="notifications-container d-flex bg-white p-2">
        {isMobile ? (
  <div className="tabs-mobile d-flex flex-column">
    {["Buy Product Orders"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Buy Product Orders" && glowProduct ? "glow" : ""}`}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Buy Product Orders" && (
                  <>
                    Buy Product Orders{" "}
                    {newProductCount > 0 && (
                      <span className="badge bg-danger">{newProductCount}</span>
                    )}
                  </>
                )}
              </span>
            ))}
  </div>
) : (
  <div className="tabs d-flex">
    {["Buy Product Orders"].map((tab) => (
      <span
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Buy Product Orders" && glowProduct ? "glow" : ""}`}
        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        {tab}{" "}
        {tab === "Buy Product Orders" && newProductCount > 0 && (
          <span className="badge bg-danger">{newProductCount}</span>
        )}
      </span>
    ))}
  </div>
)}

          <div>
            {activeTab === "Buy Product Orders" && (
              <>
                <NotificationsList
                  notifications={productNotifications}
                  highlightedItem={highlightedProduct}
                />
                <div
                  className=" view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/customerbuyProductOrdersGrid/${userType}/${userId}`);
                    handleClearProductNotifications();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View All Notifications
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      </div>
      <Footer /> 

      <style jsx>{`
        .glow {
          color: gold;
          animation: glow-animation 1s infinite;
        }
        @keyframes glow-animation {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        } 
      `}</style>
    </div>
  );
};

export default CustomerOrders;
