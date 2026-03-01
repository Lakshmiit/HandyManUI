import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from './Header.js';
import Footer from './Footer.js';

import axios from 'axios';
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
  const {category} = useParams();
  const {district} = useParams();

  const getQuoteNotifications = notifications.filter((item) => item.assignedTo === "Dealer/Trader" && item.internalStatus !== "Customer Approved");

  const getOrdersNotifications = notifications.filter((item) => (item.internalStatus === "Customer Approved" ||  item.internalStatus === "PaymentDone") && item.lowestBidderDealerId === userId);

  const handleQuoteClick = (ticketId) => {
    navigate(`/viewDealerRaiseTicket/${userType}/${userId}/${category}/${ticketId}`, { state: { ticketId } });
  };

  const handleOrdersClick = (ticketId) => {
    navigate(`/traderConfirmation/${userType}/${userId}/${category}/${district}/${ticketId}`, { state: { ticketId } });
  };

  return ( 
    <div>
    <div className="notification-list">

      {getQuoteNotifications.map((notification) => (
        <div
          key={notification.raiseTicketId}
          className={`notification-item ${
            notification.raiseTicketId === highlightedItem ? "highlight" : ""
          }`}
        >
          <div className="notification-header">
            <strong>Ticket ID: </strong>
            <span 
              onClick={() => handleQuoteClick(notification.id)}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {notification.raiseTicketId}
            </span>
          </div>
          <div>
            <strong>Details:</strong> {notification.details}
          </div>
          <div>
            <strong>Subject:</strong> {notification.subject}
          </div>
          <div className="notification-date">
            <strong>Quoted Date:</strong> {new Date(notification.date).toLocaleString()}
          </div>
        </div>
      ))}
    </div>

<div className="notification-list">
{getOrdersNotifications.map((notification) => (
  <div
    key={notification.raiseTicketId}
    className={`notification-item ${
      notification.raiseTicketId === highlightedItem ? "highlight" : ""
    }`}
  >
    <div className="notification-header">
      <strong>Ticket ID: </strong>
      <span
        onClick={() => handleOrdersClick(notification.id)}
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {notification.raiseTicketId}
      </span>
    </div>
    <div>
      <strong>Details:</strong> {notification.details}
    </div>
    <div>
      <strong>Subject:</strong> {notification.subject}
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

const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [quoteNotifications, setQuoteNotifications] = useState([]);
 const [orderNotifications, setOrderNotifications] = useState([]);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
 const [newOrdersCount, setNewOrderCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [highlightedOrder, setHighlightedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [glow, setGlow] = useState(false);
  const [glowQuote, setGlowQuote] = useState(false);
  const [glowOrder, setGlowOrder] = useState(false);
  const { district} = useParams();
  const {category } = useParams();
  const { userType } = useParams();
  const { userId } = useParams();
  // const { raiseTicketId } = useParams();
  const navigate = useNavigate();
  const [ category1, setCategory1]= useState("");
  const [ district1, setDistrict1]= useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    console.log(loading, error, glowQuote, glowOrder);
  }, [loading, error, glowQuote, glowOrder]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  useEffect(() => {
    if (!userId || !userType) return;
    const fetchProfileData = async () => {
      try {
        let apiUrl = "";
     
          apiUrl = `https://handymanapiv2.azurewebsites.net/api/dealer/dealerProfileData?profileType=${userType}&UserId=${userId}`;
        
        if (!apiUrl) return;
        const response = await axios.get(apiUrl);
        //setProfile(response.data); 
        // alert(response.data.district);
        setCategory1(response.data.category);
     
        setDistrict1(response.data.district);
        // alert(response.data.district);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, [userType, userId]);
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [getQuoteResponse, orderResponse] = await Promise.all([
        fetch(
          `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByNotExistDealerId?category=${category1}&district=${district1}&dealerId=${userId}`
        ),
        fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByExistingDealerId?category=${category1}&district=${district1}&dealerId=${userId}`),
      ]);
        const getQuoteData = await getQuoteResponse.json();
        const tickets = getQuoteData.tickets || [];
        const getQuoteFiltered = tickets.filter((item) => item.assignedTo === "Dealer/Trader" && item.internalStatus !== "Customer Approved")
        .sort((a, b) => new Date(b.date) - new Date(a.date));
        const getQuoteCount = getQuoteFiltered.length;
  
          setQuoteNotifications(getQuoteFiltered);
          setNewQuoteCount(getQuoteCount);
          setGlowQuote(getQuoteCount > 0);
          if (getQuoteCount > 0) {
            setHighlightedQuote(getQuoteFiltered[0].raiseTicketId);
          }

          const getOrderData = await orderResponse.json();
          // alert(JSON.stringify(getOrderData));
          // alert(JSON.stringify(tickets));
          const orderTickets = getOrderData.tickets || [];
          const getOrderFiltered = orderTickets.filter((item) => (item.internalStatus === "Customer Approved" ||  item.internalStatus === "PaymentDone") && item.lowestBidderDealerId === userId)
          .sort((a, b) => new Date(b.date) - new Date(a.date));    
          const getOrderCount = getOrderFiltered.length;
          // alert(getOrderCount);
          setOrderNotifications(getOrderFiltered);
          setNewOrderCount(getOrderCount);
          setGlowOrder(getOrderCount > 0);
          if (getOrderCount > 0) {
            setHighlightedOrder(getOrderFiltered[0].raiseTicketId);
          }
          const totalNotifications = getQuoteCount + getOrderCount;
          setNewNotificationCount(totalNotifications);
          setGlow(totalNotifications > 0);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };
      fetchNotifications();
   }, [category1, district1, userId]);
  

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByNotExistDealerId?category=${category}&district=${district}&dealerId=${dealerId}`,
  //         {
  //           method: "GET",
  //           mode: "cors", // Ensure CORS mode is enabled
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       const data = await response.json();
  //       setQuoteNotifications(data);
  //       setNewQuoteCount(data.length);
  //       setGlowQuote(data.length > 0);
  //       if (data.length > 0) {
  //         setHighlightedQuote(data[0].raiseAQuoteId);
  //       }
  //       setNewNotificationCount(data.length);
  //       setGlow(data.length > 0);
  //     } catch (error) {
  //       console.error("Failed to fetch notifications:", error);
  //     }
  //   };
  
  //   fetchNotifications();
  // }, [district, category, dealerId]);
  
  const handleClearQuoteNotifications = () => {
    setNewQuoteCount(0);
    setGlowQuote(false);
    setHighlightedQuote(null);
  };

  const handleClearOrdersNotifications = () => {
    setNewOrderCount(0);
    setGlowOrder(false);
    setHighlightedOrder(null);
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div>
  {isMobile && <Header />}
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 m-4 p-0 sde_mnu">
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
          Notifications{" "}
          {newNotificationCount > 0 && (
            <span className="badge bg-danger">{newNotificationCount}</span>
          )}
        </h2>

        <div className="notifications-container d-flex bg-white p-2">
        {isMobile ? (
  <div className="tabs-mobile d-flex flex-column">
    {["Raise A Quote Buy Products", "Raise A Quote Orders"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Raise A Quote Buy Products"
                  //  && glowQuote ? "glow" : ""
                  }
                ${tab === "Raise A Quote Orders" 
                  // && glowOrder ? "glow" : ""
                }
                `}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Raise A Quote Buy Products" && (
                <>
                Raise A Quote Buy Products{" "}
                {newQuoteCount > 0 && (
                  <span className="badge bg-danger">{newQuoteCount}</span>
                )}
                </>
                )}
                {tab === "Raise A Quote Orders" && (
                <>
                Raise A Quote Orders{" "}
                {newOrdersCount > 0 && (
                  <span className="badge bg-danger">{newOrdersCount}</span>
                )}
                </>
                )}
              </span>
            ))}
  </div>
) : (
  <div className="tabs d-flex">
    {["Raise A Quote Buy Products", "Raise A Quote Orders"].map((tab) => (
      <span
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise A Quote Buy Products" 
            // && glowQuote ? "glow" : ""
          } 
          ${tab === "Raise A Quote Orders" 
            // && glowOrder ? "glow" : ""
          } `}
        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        {tab}{" "}
        {tab === "Raise A Quote Buy Products" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )}
        {tab === "Raise A Quote Orders" && newOrdersCount > 0 && (
          <span className="badge bg-danger">{newOrdersCount}</span>
        )}
      </span>
    ))}
  </div>
)}

          <div>
            {activeTab === "Raise A Quote Buy Products" && (
              <>
                <NotificationsList
                  notifications={quoteNotifications} 
                  highlightedItem={highlightedQuote}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/dealerNotificationsGrid/${userType}/${userId}/${category}/${district}`);
                    handleClearQuoteNotifications();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View All Notifications
                </div>
              </>
            )}
            </div>

            <div>
            {activeTab === "Raise A Quote Orders" && (
              <>
                <NotificationsList
                  notifications={orderNotifications}
                  highlightedItem={highlightedOrder}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/traderConfirmationGrid/${userType}/${userId}/${category}/${district}`);
                    handleClearOrdersNotifications();
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
        .floating-menu {
          position: fixed;
          top: 80px; /* Increased from 20px to avoid overlapping with the logo */
          left: 20px; /* Adjusted for placement on the left side */
          z-index: 1000;
        } 
      `}</style>
    </div>
  );
};

export default Notification;
