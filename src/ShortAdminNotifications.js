import React, { useState, useEffect } from "react";
import {
  NotificationsNone as NotificationsNoneIcon,
} from "@mui/icons-material";
import "./App.css";

// Component to display notifications in a vertical list
const RaiseTicketNotifications = ({ notifications, highlightedTicket }) => {

  // Sort notifications by date descending and slice to get the latest 10
  const raiseTicketNotifications = notifications
    .filter((item) => item.status === "Open")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const handleTicketClick = (ticketId) => {
   
    window.location.href=`https://lakshmisaiserviceproviders.com/RaiseTicketActionView/${ticketId}`;
  };

  return (
    <div className="notification-list">
      {raiseTicketNotifications.map((notification) => (
        <div
          key={notification.raiseTicketId}
          className={`notification-item ${
            notification.raiseTicketId === highlightedTicket ? "highlight" : ""
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
            <strong>Date:</strong>{" "}
            {new Date(notification.date).toLocaleString()}
          </div>
        </div>
      ))}
      <style jsx>{`
        .notification-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .notification-item {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          width: 100%;
          transition: all 0.3s ease-in-out;
        }
        .highlight {
          background-color: #f0f8ff;
          border-color: #4caf50;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }
        .notification-header {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .notification-date {
          font-size: 12px;
          color: #777;
        }
      `}</style>
    </div>
  );
};

// Main Notification Component
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null); // Track the ticket to highlight

  // API Call to fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications"
        );
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const newItems = data.filter(
            (item) => !notification.some((notif) => notif.id === item.id)
          );

          if (newItems.length > 0) {
            setNotification((prev) => [...newItems, ...prev]);
            setNewNotificationCount((prevCount) => prevCount + newItems.length);
            setGlow(true); // Activate glow effect

            // Set the latest ticket to be highlighted after a short delay
            setTimeout(() => {
              setHighlightedTicket(newItems[0].raiseTicketId);
            }, 1000); // Delay to allow UI update
          }
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    const interval = setInterval(fetchNotifications, 3000);
    return () => clearInterval(interval);
  }, [notification]);


  return (
    <div className="d-flex flex-column">
        <div className="bg-white rounded-3 bx-sdw w-50">
        <div className="bg-warning d-flex justify-content-between py-2 px-3 ">
        <h2 className="text-start mb-2 fs-20">
         <span onClick={() => (window.location.href = `https://lakshmisaiserviceproviders.com/AdminNotifications`)} style={{cursor: "pointer"}}>
          <NotificationsNoneIcon
            fontSize="large"
            className={glow ? "glow" : ""}

           /> {" "}
          Notifications </span>{" "}
          {newNotificationCount > 0 && (
            <span className="badge bg-danger">{newNotificationCount}</span>
          )}
        </h2>
        </div>

        <div className="notifications-container bg-white border rounded shadow-sm m-2 p-2">
          <RaiseTicketNotifications
            notifications={notification}
            highlightedTicket={highlightedTicket}
          />
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
 