import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  Dashboard as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  NotificationsNone as NotificationsNoneIcon,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
import "./App.css";

const NotificationsList = ({ notifications, highlightedItem, handleItemClick }) => {
  const navigate = useNavigate();
  
  const raiseTicketNotifications = notifications.filter(
    (item) => item.assignedTo === "Customer Care"
  );

  const getQuoteNotifications = notifications.filter(
    (item) => item.assignedTo !== "Customer Care"
  );

  const handleTicketClick = (ticketId) => {
    navigate(`/raiseTicketNotification`, { state: { ticketId } });
  };

  const handleQuoteClick = (raiseTicketId) => {
    navigate(`/quoteNotification`, { state: { raiseTicketId } });
  };

  return (
    <div>
      <div className="notification-list">
        {raiseTicketNotifications.map((notification) => (
          <div
            key={notification.raiseTicketId}
            className={`notification-item ${
              notification.raiseTicketId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>{" "}
              <span
                onClick={() => handleTicketClick(notification.raiseTicketId)}
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
              <strong>Subject:</strong> {notification.subject}
            </div>
            <div>
              <strong>Details:</strong> {notification.details}
            </div>
            <div className="notification-date">
              <strong>Date:</strong> {new Date(notification.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="notification-list">
        {getQuoteNotifications.map((notification) => (
          <div
            key={notification.raiseAQuoteId}
            className={`notification-item ${
              notification.raiseAQuoteId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
              <span
                onClick={() => handleQuoteClick(notification.raiseAQuoteId)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.raiseAQuoteId}
              </span>
            </div>
            <div>
              <strong>Customer ID:</strong> {notification.customerId}
            </div>
            <div>
              <strong>Technician ID:</strong> {notification.technicianId}
            </div>
            <div className="notification-date">
              <strong>Quoted Date:</strong> {new Date(notification.quotedDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Notification Component
const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState([]);
  const [ticketNotifications, setTicketNotifications] = useState([]);
  const [quoteNotifications, setQuoteNotifications] = useState([]);
  const [newTicketCount, setNewTicketCount] = useState(0);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [glowTicket, setGlowTicket] = useState(false);
  const [glowQuote, setGlowQuote] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null); // Track the ticket to highlight
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [activeTab, setActiveTab] = useState("Raise Ticket");
  const navigate = useNavigate();
  const [userType] = useState("");

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
      const raiseTicketResponse = await fetch(
        "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications"
      );
      const raiseTicketData = await raiseTicketResponse.json();

      const raiseTicketFiltered = raiseTicketData.filter(
        (item) => item.assignedTo === "Customer Care"
      );
      const raiseTicketCount = raiseTicketFiltered.length;

      setTicketNotifications(raiseTicketFiltered);
      setNewTicketCount(raiseTicketCount);
      setGlowTicket(raiseTicketCount > 0);

      if (raiseTicketCount > 0) {
        setHighlightedTicket(raiseTicketFiltered[0].raiseTicketId);
      }

      const getQuoteResponse = await fetch(
        "https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetails"
      );
      const getQuoteData = await getQuoteResponse.json();
      const getQuoteCount = getQuoteData.length;

      setQuoteNotifications(getQuoteData);
      setNewQuoteCount(getQuoteCount);
      setGlowQuote(getQuoteCount > 0);

      if (getQuoteCount > 0) {
        setHighlightedQuote(getQuoteData[0].raiseTicketId);
      }

      const totalNotifications = raiseTicketCount + getQuoteCount;
      setNewNotificationCount(totalNotifications);
      setGlow(totalNotifications > 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  fetchNotifications();
}, []);


    const handleClearTicketNotifications = () => {
      setNewTicketCount(0);
      setGlowTicket(false); // Turn off glow effect
      setHighlightedTicket(null); // Clear highlighted ticket
    };

    const handleClearQuoteNotifications = () => {
      setNewQuoteCount(0);
      setGlowQuote(false); // Turn off glow effect
      setHighlightedQuote(null); // Clear highlighted quote
    };

    const handleTabClick = (tab) => setActiveTab(tab);

    const handleItemClick = (id, tab) => {
      const ticket = tab === "Raise  Ticket" ? `/raiseTicketNotification` : `/quoteNotification`;
      navigate(ticket, { state: { id } });
    };

    return (
      <div className="d-flex flex-row justify-content-start align-items-start">
        {!isMobile && (
          <div className="ml-0 m-4 p-0 adm_mnu">
            <AdminSidebar />
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
                <AdminSidebar />
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
            <div className="tabs">
              {["Raise  Ticket", "Get  Quote"].map((tab) => (
                <span
                  key={tab}
                  className={`tab-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                  style={{ cursor: "pointer" }}
                >
                   {tab === "Raise  Ticket" && (
                <>
                  Raise Ticket{" "}
                  {newTicketCount > 0 && (
                    <span className="badge bg-danger">{newTicketCount}</span>
                  )}
                </>
              )}
              {tab === "Get  Quote" && (
                <>
                  Get Quote{" "}
                  {newQuoteCount > 0 && (
                    <span className="badge bg-danger">{newQuoteCount}</span>
                  )}
                </>
              )}
                </span>
              ))}
            </div>
            <div>
              {activeTab === "Raise  Ticket" && (
                <>
                  <NotificationsList
                    notifications={ticketNotifications}
                    highlightedItem={highlightedTicket}
                    handleItemClick={(id) => handleItemClick(id, "Ticket")}
                  />
                  <div
                    className=" view-notifications text-info mx-2"
                    onClick={() => {
                      navigate("/raiseTicketNotification");
                      handleClearTicketNotifications();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    View All Notifications
                  </div>
                </>
              )}
            </div>
            <div>
              {activeTab === "Get  Quote" && (
                <>
                  <NotificationsList
                    notifications={quoteNotifications}
                    highlightedItem={highlightedTicket}
                    handleItemClick={(id) => handleItemClick(id, "Quote")}
                  />
                  <div
                    className="view-notifications text-info mx-2"
                    onClick={() => {
                      navigate(`/quoteNotification`);
                      handleClearQuoteNotifications();
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
