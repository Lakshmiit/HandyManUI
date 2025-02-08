import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Dashboard as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  NotificationsNone as NotificationsNoneIcon,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
import "./App.css";

const NotificationsList = ({ notifications, highlightedItem, handleItemClick }) => {
  const navigate = useNavigate();
  const {category} = useParams();
  const {userType} = useParams();
  const {technicianId} = useParams();

  const handleQuoteClick = (ticketId) => {
    navigate(`/viewRaiseQuote/${ticketId}/${category}/${userType}/${technicianId}`, { state: { ticketId } });
  };

  // const handleOrderClick = (ticketId) => {
  //   navigate(`/ticketConfirmation/${ticketId}/${userType}/${technicianId}`, { state: { ticketId } });
  // };

  return (
    <div>
    {/* <div className="notification-list">
      {notifications.map((notification) => (
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
    </div> */}


<div className="notification-list">
  {notifications.map((notification) => (
    <div
      key={notification.raiseQuoteId}
      className={`notification-item ${
        notification.raiseQuoteId === highlightedItem ? "highlight" : ""
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

    {/* <div className="notification-list">
    {notifications.map((notification) => (
      <div
        key={notification.raiseAQuoteId}
        className={`notification-item ${
          notification.raiseAQuoteId === highlightedItem ? "highlight" : ""
        }`}
      >
        <div className="notification-header">
          <strong>Ticket ID: </strong>
          <span
            // onClick={() => handleOrderClick(notification.id)}
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
  </div> */}
  </div>
  );  
};

const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [quoteNotifications, setQuoteNotifications] = useState([]);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [glow, setGlow] = useState(false);
  const [glowQuote, setGlowQuote] = useState(false);
  const { district, category } = useParams();
  const { userType } = useParams();
  const { technicianId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

//  useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const getQuoteResponse = await fetch(
        
//         `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByNotExistTechnicianId?district=${district}&category=${category}&technicianId=${technicianId}`
//       );
//       const getQuoteData = await getQuoteResponse.json();
//         const getQuoteCount = getQuoteData.length;
        
//         setQuoteNotifications(getQuoteData);
//         setNewQuoteCount(getQuoteCount);
//         setGlowQuote(getQuoteCount > 0);
//         if (getQuoteCount > 0) {
//           setHighlightedQuote(getQuoteData[0].raiseAQuoteId);
//         }
//         const totalNotifications = getQuoteCount;
//         setNewNotificationCount(totalNotifications);
//         setGlow(totalNotifications > 0);
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };
//     fetchNotifications();
//  }, [district, category, technicianId]);
    
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const getQuoteResponse = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByNotExistTechnicianId?category=${category}&district=${district}&technicianId=${technicianId}`
      );
      const getQuoteData = await getQuoteResponse.json();

      // Ensure we extract the "tickets" array from the response
      const tickets = getQuoteData.tickets || [];
      const getQuoteCount = tickets.length;

      setQuoteNotifications(tickets);  // Setting only tickets
      setNewQuoteCount(getQuoteCount);
      setGlowQuote(getQuoteCount > 0);

      if (getQuoteCount > 0) {
        setHighlightedQuote(tickets[0].raiseTicketId);
      }

      const totalNotifications = getQuoteCount;
      setNewNotificationCount(totalNotifications);
      setGlow(totalNotifications > 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  fetchNotifications();
}, [district, category, technicianId]);

  const handleClearQuoteNotifications = () => {
    setNewQuoteCount(0);
    setGlowQuote(false);
    setHighlightedQuote(null);
  };

  // const handleClearOrderNotifications = () => {
  //   setNewOrderCount(0);
  //   setGlowOrder(false);
  //   setHighlightedOrder(null);
  // };

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
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

        <div className="notifications-container d-flex bg-white border rounded shadow-sm m-4 p-3">
          <div className="tabs d-flex mb-3">
            {["Raise A Quote", "Raise A Quote Orders"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Raise A Quote" && glowQuote ? "glow" : ""}
                }`}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Raise A Quote" && (
                  <>
                Raise A Quote{" "}
                {newQuoteCount > 0 && (
                  <span className="badge bg-danger">{newQuoteCount}</span>
                )}
                </>
                )}
                {tab === "Raise A Quote Orders" && (
                  <>
                    Raise A Quote Orders{" "}
                  
                      <span className="badge bg-danger">{}</span>
                  
                  </>
                )}
              </span>
            ))}
          </div>

          <div>
            {activeTab === "Raise A Quote" && (
              <>
                <NotificationsList
                  notifications={quoteNotifications}
                  highlightedItem={highlightedQuote}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/technicianQuoteNotification/${userType}/${category}/${district}/${technicianId}`);
                    handleClearQuoteNotifications();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View All Notifications
                </div>
              </>
            )}
          </div>
          
          {/* <div>
            {activeTab === "Raise A Quote Orders" && (
              <>
                <NotificationsList
                  notifications={orderNotifications}
                  highlightedItem={highlightedOrder}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/ticketConfirmation/${userType}`);
                    handleClearOrderNotifications();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View All Notifications
                </div>
              </>
            )}
          </div> */}
        </div>
      </div>
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

export default Notification;
