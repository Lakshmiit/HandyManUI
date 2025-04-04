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
   const {technicianName} = useParams();

  const getTechnicianNotifications = notifications.filter(
    (item) => item.assignedTo === "Technician" && item.status === "Assigned");

  const handleTechnicianClick = (ticketId) => {
     navigate(`/technicianViewBookTechnician/${userType}/${userId}/${technicianName}/${ticketId}`, { state: { ticketId } });
  };

  return (
    <div> 
    <div className="notification-list">
      {getTechnicianNotifications.map((notification) => (
        <div
          key={notification.bookTechnicianId}
          className={`notification-item ${
            notification.bookTechnicianId === highlightedItem ? "highlight" : ""
          }`}
        >
          <div className="notification-header">
            <strong>Book Technician ID: </strong>
            <span
              onClick={() => handleTechnicianClick(notification.id)}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {notification.bookTechnicianId}
            </span>
          </div>
          <div>
            <strong>Job Description:</strong> {notification.jobDescription}
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

const TechnicianDetailsNotification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [technicianNotifications, setTechnicianNotifications] = useState([]);
  const [newTechnicianCount, setNewTechnicianCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [highlightedTechnician, setHighlightedTechnician] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [glow, setGlow] = useState(false);
  const [glowTechnician, setGlowTechnician] = useState(false);
  const { category } = useParams();
  const { pincode } = useParams();
  const { technicianName } = useParams();
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
  const fetchTechnicianNotifications = async () => {
    try {
      const technicianTicketResponse = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianNotifications?category=${category}&pincode=${pincode}&technicianName=${technicianName}`
      );
      const technicianData = await technicianTicketResponse.json();
      const getTechnicianNotifications = technicianData.filter(
        (item) => item.assignedTo === "Technician" && item.status === "Assigned")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
        const technicianCount = getTechnicianNotifications.length;

        setTechnicianNotifications(getTechnicianNotifications);
        setNewTechnicianCount(technicianCount);
        setGlowTechnician(technicianCount > 0);
        if (technicianCount > 0) {
          setHighlightedTechnician(getTechnicianNotifications[0].bookTechnicianId);
        }
        const totalNotifications = technicianCount;
        setNewNotificationCount(totalNotifications);
        setGlow(totalNotifications > 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchTechnicianNotifications();
 }, [category, pincode, technicianName]);
    

  const handleClearTechnicianNotifications = () => {
    setNewTechnicianCount(0);
    setGlowTechnician(false);
    setHighlightedTechnician(null);
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

        <div className="notifications-container d-flex bg-white border rounded shadow-sm m-4 p-3">
          <div className="tabs d-flex mb-3">
            {["Book Technician Notifications"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Book Technician Notifications" && glowTechnician ? "glow" : ""}
                }`}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Book Technician Notifications" && (
                  <>
                Book Technician Notifications{" "}
                {newTechnicianCount > 0 && (
                  <span className="badge bg-danger">{newTechnicianCount}</span>
                )}
                </>
                )}
              </span>
            ))}
          </div>

          <div>
            {activeTab === "Book Technician Notifications" && (
              <>
                <NotificationsList
                  notifications={technicianNotifications}
                  highlightedItem={highlightedTechnician}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                     navigate(`/technicianGridDetails/${userType}/${userId}/${category}/${pincode}/${technicianName}`);
                    handleClearTechnicianNotifications();
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

export default TechnicianDetailsNotification;
