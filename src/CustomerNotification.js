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
  const {userType} = useParams();

  const raiseTicketNotifications = notifications.filter(
    (item) => item.assignedTo === "Customer"
  );
  const handleTicketClick = (ticketId) => {
    navigate(`/customerRaiseTicketQuotation/${userType}/${ticketId}`, { state: { ticketId } });
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

      {/* <div className="notification-list">
        {getQuoteNotifications.map((notification) => (
          <div
            key={notification.ticketId}
            className={`notification-item ${
              notification.ticketId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
              <span
                onClick={() => handleQuoteClick(notification.ticketId)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.ticketId}
              </span>
            </div>
            <div>
              <strong>Customer ID:</strong> {notification.customerId}
            </div>
            <div>
              <strong>Technician ID:</strong> {notification.technicianId}
            </div>
            <div className="notification-date">
              <strong>Date:</strong> {new Date(notification.quotedDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

// Main Notification Component
const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [ticketNotifications, setTicketNotifications] = useState([]);
  // const [orderNotifications, setOrderNotifications] = useState([]);
  // const [quoteNotifications, setQuoteNotifications] = useState([]);
  const [newTicketCount, setNewTicketCount] = useState(0);
  const [newQuoteCount] = useState(0);
  // const [newOrderCount, setNewOrderCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [glowTicket, setGlowTicket] = useState(false);
  const [glowQuote] = useState(false);
  const [glowGet] = useState(false);
  // const [glowOrder, setGlowOrder] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  // const [highlightedOrder, setHighlightedOrder] = useState(null);
  // const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [activeTab, setActiveTab] = useState("Raise Ticket");
  const navigate = useNavigate();
  const {userType} = useParams();
  const { customerId } = useParams();

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
          `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetRaiseTicketNotificationsByCustomerId?customerId=${customerId}`
        );
        const raiseTicketData = await raiseTicketResponse.json();

        const raiseTicketFiltered = raiseTicketData.filter(
          (item) => item.assignedTo === "Customer"
        );
        const raiseTicketCount = raiseTicketFiltered.length;

        setTicketNotifications(raiseTicketFiltered);
        setNewTicketCount(raiseTicketCount);
        setGlowTicket(raiseTicketCount > 0);
 
        if (raiseTicketCount > 0) {
          setHighlightedTicket(raiseTicketFiltered[0].raiseTicketId);
        }
 
        // const getQuoteResponse = await fetch(
        //   "https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetails"
        // );
        // const getQuoteData = await getQuoteResponse.json();
        // const getQuoteCount = getQuoteData.length;

        // setQuoteNotifications(getQuoteData);
        // setNewQuoteCount(getQuoteCount);
        // setGlowQuote(getQuoteCount > 0);

        // if (getQuoteCount > 0) {
        //   setHighlightedQuote(getQuoteData[0].raiseAQuoteId);
        // }

        const totalNotifications = raiseTicketCount;
        setNewNotificationCount(totalNotifications);
        setGlow(totalNotifications > 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, [customerId]);

  const handleClearTicketNotifications = () => {
    setNewTicketCount(0);
    setGlowTicket(false);
    setHighlightedTicket(null);
  };


  // const handleClearOrderNotifications = () => {
  //   setNewOrderCount(0);
  //   setGlowOrder(false);
  //   setHighlightedOrder(null);
  // }
  // const handleClearQuoteNotifications = () => {
  //   setNewQuoteCount(0);
  //   setGlowQuote(false);
  //   setHighlightedQuote(null);
  // };

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
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
          Notifications{" "}
          {newNotificationCount > 0 && (
            <span className="badge bg-danger">{newNotificationCount}</span>
          )}
        </h2>

        <div className="notifications-container d-flex bg-white border rounded shadow-sm p-1">
          <div className="tabs">
            {["Raise Ticket Quotations", "Buy Product Quotations", "General  Notifications"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Raise Ticket Quotations" && glowTicket ? "glow" : ""}
                ${tab === "Buy Product Quotations" && glowQuote ? "glow" : ""}
                ${tab === "General  Notifications" && glowGet ? "glow": ""}`}
                onClick={() => handleTabClick(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab === "Raise Ticket Quotations" && (
                  <>
                    Raise Ticket Quotations{" "}
                    {newTicketCount > 0 && (
                      <span className="badge bg-danger">{newTicketCount}</span>
                    )}
                  </>
                )}
                {tab === "Buy Product Quotations" && (
                  <>
                    Buy Product Quotations{" "}
                    {newQuoteCount > 0 && (
                      <span className="badge bg-danger">{newQuoteCount}</span>
                    )}
                  </>
                )}
                 {tab === "General  Notifications" && (
                  <>
                    General Notifications{" "}
                    {newQuoteCount > 0 && (
                      <span className="badge bg-danger">{newQuoteCount}</span>
                    )}
                  </>
                )}
              </span>
            ))}
          </div>
          <div>
            {activeTab === "Raise Ticket Quotations" && (
              <>
                <NotificationsList
                  notifications={ticketNotifications}
                  highlightedItem={highlightedTicket}
                />
                <div
                  className=" view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/viewCustomer/${userType}/${customerId}`);
                    handleClearTicketNotifications();
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
