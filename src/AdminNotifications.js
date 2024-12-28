import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    (item) => item.internalStatus === "open"
  );

  const getQuoteNotifications = notifications.filter(
    (item) => item.internalStatus === "Pending"
  );

  const handleTicketClick = (ticketId) => {
    navigate(`/raiseTicketActionView/${ticketId}`, { state: { ticketId } });
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
            key={notification.raiseTicketId}
            className={`notification-item ${
              notification.raiseTicketId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
              <span
                onClick={() => handleQuoteClick(notification.raiseTicketId)}
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
    </div>
  );
};

const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [ticketNotifications, setTicketNotifications] = useState([]);
  const [quoteNotifications, setQuoteNotifications] = useState([]);
  const [newTicketCount, setNewTicketCount] = useState(0);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [activeTab, setActiveTab] = useState("Raise Ticket");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNotifications = async () => {
    try {
      const [raiseTicketResponse, getQuoteResponse] = await Promise.all([
        fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications"
        ),
        fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetails"
        ),
      ]);

      const raiseTicketData = await raiseTicketResponse.json();
      const raiseTicketFiltered = raiseTicketData.filter(
        (item) => item.internalStatus === "open"
      );
      const raiseTicketCount = raiseTicketFiltered.length;

      setTicketNotifications(raiseTicketFiltered);
      setNewTicketCount(raiseTicketCount);

      if (raiseTicketCount > 0) {
        setHighlightedTicket(raiseTicketFiltered[0].raiseTicketId);
      }

      const getQuoteData = await getQuoteResponse.json();
      const getQuoteCount = getQuoteData.length;

      setQuoteNotifications(getQuoteData);
      setNewQuoteCount(getQuoteCount);

      if (getQuoteCount > 0) {
        setHighlightedQuote(getQuoteData[0].raiseAQuoteId);
      }

      const totalNotifications = raiseTicketCount + getQuoteCount;
      setNewNotificationCount(totalNotifications);
      setGlow(totalNotifications > 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Poll every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClearTicketNotifications = () => {
    setNewTicketCount(0);
    setHighlightedTicket(null);
  };

  const handleClearQuoteNotifications = () => {
    setNewQuoteCount(0);
    setHighlightedQuote(null);
  };

  const handleTabClick = (tab) => setActiveTab(tab);

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
            {["Raise Ticket", "Get Quote", "Buy Products"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Raise Ticket" && (
                  <>
                    Raise Ticket{" "}
                    {newTicketCount > 0 && (
                      <span className="badge bg-danger">{newTicketCount}</span>
                    )}
                  </>
                )}
                {tab === "Get Quote" && (
                  <>
                    Get Quote{" "}
                    {newQuoteCount > 0 && (
                      <span className="badge bg-danger">{newQuoteCount}</span>
                    )}
                  </>
                )}
                {tab === "Buy Products" && (
                  <>
                    Buy Products{" "}
                    {/* {0 > 0 && <span className="badge bg-danger">{0}</span>} */}
                  </>
                )}
              </span>
            ))}
          </div>
          {activeTab === "Raise Ticket" && (
            <>
              <NotificationsList
                notifications={ticketNotifications}
                highlightedItem={highlightedTicket}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/raiseTicketNotification`);
                  handleClearTicketNotifications();
                }}
                style={{ cursor: "pointer" }}

              >
                View All Notifications
              </div>
            </>
          )}
          {activeTab === "Get Quote" && (
            <>
              <NotificationsList
                notifications={quoteNotifications}
                highlightedItem={highlightedQuote}
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
  );
};

export default Notification;