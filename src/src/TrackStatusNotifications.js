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
//   const {category} = useParams();
  const {userType} = useParams();
  const {userId} = useParams();

  const getTrackNotifications = notifications.filter(
    (item) => item.assignedTo === "Customer" && (item.internalStatus === "Assigned" || 
      item.internalStatus === "Closed" 
      // || item.internalStatus === "Pending" 
      || item.internalStatus === "Customer Approved" ||  item.internalStatus === "PaymentDone")
  );

  const handleTicketClick = (ticketId) => {
    navigate(`/customerTrackConfirmation/${userType}/${userId}/${ticketId}`, { state: { ticketId } });
  };

  return (
    <div> 
    <div className="notification-list">
      {getTrackNotifications.map((notification) => (
        <div
          key={notification.raiseTicketId}
          className={`notification-item ${
            notification.raiseTicketId === highlightedItem ? "highlight" : ""
          }`}
        >
          <div className="notification-header">
            <strong>Ticket ID: </strong>
            <span
              onClick={() => handleTicketClick(notification.id)}
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

const TrackNotification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [trackNotifications, setTrackNotifications] = useState([]);
  const [newTrackCount, setNewTrackCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [highlightedTrack, setHighlightedTrack] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [glow, setGlow] = useState(false);
  const [glowTrack, setGlowTrack] = useState(false);
  const { userType } = useParams();
  // const { raiseTicketId } = useParams('');
  const { userId } = useParams('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

 useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const trackTicketResponse = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTrackTicketsByCustomerId?customerId=${userId}`
      );
      const trackData = await trackTicketResponse.json();
      const getTrackNotifications = trackData.filter(
        (item) => item.assignedTo === "Customer" && (item.internalStatus === "Assigned" || item.internalStatus === "Closed" 
          // || item.internalStatus === "Pending" 

          || item.internalStatus === "Customer Approved" ||  item.internalStatus === "PaymentDone") 
      );
        const trackCount = getTrackNotifications.length;

        setTrackNotifications(getTrackNotifications);
        setNewTrackCount(trackCount);
        setGlowTrack(trackCount > 0);
        if (trackCount > 0) {
          setHighlightedTrack(getTrackNotifications[0].raiseTicketId);
        }
        const totalNotifications = trackCount;
        setNewNotificationCount(totalNotifications);
        setGlow(totalNotifications > 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
 }, [userId]);
    
 const handleBackClick = () => {
  navigate(`/profilePage/${userType}/${userId}`);
};


  // const handleClearTrackNotifications = () => {
  //   setNewTrackCount(0);
  //   setGlowTrack(false);
  //   setHighlightedTrack(null);
  // };

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div>
   <Header />
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
        <div onClick={handleBackClick} style={{ cursor: 'pointer' }}>
          <ArrowBackIcon fontSize="large" />{" "}
          <NotificationsNoneIcon
            fontSize="large"
            style={{ color: '#f1b61f' }}
            className={glow ? "glow" : ""}
          />{" "}
          My Tickets{" "}
          {newNotificationCount > 0 && (
            <span className="badge bg-danger">{newNotificationCount}</span>
          )}
          </div>
        </h2>

        <div className="notifications-container d-flex bg-white border rounded shadow-sm m-4 p-3">
          <div className="tabs d-flex mb-3">
            {["Track Ticket Status"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Track Ticket Status" && glowTrack ? "glow" : ""}
                }`}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Track Ticket Status" && (
                  <>
                Track Ticket Status{" "}
                {newTrackCount > 0 && (
                  <span className="badge bg-danger">{newTrackCount}</span>
                )}
                </>
                )}
              </span>
            ))}
          </div>

          <div>
            {activeTab === "Track Ticket Status" && (
              <>
                <NotificationsList
                  notifications={trackNotifications}
                  highlightedItem={highlightedTrack}
                />
                {/* <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/trackStatusGrid/${userType}/${userId}`);
                    handleClearTrackNotifications();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View All Notifications
                </div> */}
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

export default TrackNotification;
