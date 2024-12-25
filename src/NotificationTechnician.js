import React, { useState, useEffect } from "react"; 
import Sidebar from "./Sidebar";
import { Dashboard as MoreVertIcon, ArrowBack as ArrowBackIcon, NotificationsNone as NotificationsNoneIcon } from "@mui/icons-material";
import "./App.css"; 
import { Button } from "react-bootstrap"; 
import { useNavigate, useParams } from "react-router-dom";

const Notification = () => {
  const {userType} = useParams();
    const [selectedUserType] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Raise Ticket"); 
  const navigate = useNavigate();
  const [notification, setNotification] = useState([
    { id: 1, date: "14-12-2024", text: "VMRDA is opting for sealed traders.....", category: "General" },
    { id: 2, text: "Jiyyannavlasa, Palavalasa to the public", category: "General" },
    { id: 3, text: "Apply Here", category: "RaiseTicket" },
    { id: 4, text: "Notification", category: "RaiseQuote" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotification((prev) => [
        { id: Date.now(), date: new Date().toLocaleDateString(), text: "New notification will be added", category: activeTab },
        ...prev,
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredNotifications = notification.filter(
    (item) => item.category === activeTab
  );

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 m-4 p-0 sde_mnu">
          <Sidebar userType={selectedUserType} />
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
              <Sidebar userType={selectedUserType}/>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
        <h2 className="text-start mb-2 fs-20">
          <ArrowBackIcon fontSize="large" /> <NotificationsNoneIcon fontSize="large" /> Notifications
        </h2>

        {/* Tickets Notification Box */}
        <div className="notifications-container bg-white border rounded shadow-sm m-4 p-3">
          <div className="tabs">
            {["RaiseTicket", "RaiseQuote", "BuyProduct", "GetQuote"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="notifictions-content">
            {filteredNotifications.map((item) => (
              <div key={item.id} className="d-flex notification-item">
                {item.date && <span className="date">{item.date}</span>}
                <span className="text">{item.text}</span>
              </div>
            ))}
          </div>
          <div
            className="text-info mx-2 text-end"
            onClick={() => navigate(`/technicianQuoteNotification/${userType}`)}
            style={{ cursor: "pointer" }}
          >
            View All Notifications
          </div>
        </div>
      </div>
      {/* Styles for floating menu */}
<style jsx>{`
        .floating-menu {
          position: fixed;
          top: 80px; /* Increased from 20px to avoid overlapping with the logo */
          left: 20px; /* Adjusted for placement on the left side */
          z-index: 1000;
        }
        .menu-popup {
          position: absolute;
          top: 50px; /* Keeps the popup aligned below the floating menu */
          left: 0; /* Aligns the popup to the left */
          background: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 200px;
        }
      `}</style>
    </div>
  );
};

export default Notification;
