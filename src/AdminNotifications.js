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

const NotificationsList = ({ notifications, highlightedItem }) => {
  const navigate = useNavigate();

  const raiseTicketNotifications = notifications.filter(
    (item) => item.internalStatus === "Open" && item.assignedTo === "Customer Care" 
  );
 
  const getQuoteNotifications = notifications.filter(
    (item) =>  item.internalStatus === "Pending" && item.assignedTo === "Technical Agency"  
  );
    
  const dealerQuoteNotifications = notifications.filter(
    (item) => item.internalStatus === "Pending" && item.assignedTo === "Dealer/Trader"
  );

  
 const orderTicketNotifications = notifications.filter(
  (item) => item.internalStatus === "Customer Approved"
);

  
  const handleTicketClick = (ticketId) => {
    navigate(`/raiseTicketActionView/${ticketId}`, { state: { ticketId } });
  };

  const handleQuoteClick = (ticketId) => {
    navigate(`/raiseTicketQuotation/${ticketId}`, { state: { ticketId } });
  };

  const handleDealerClick = (raiseTicketId) => {
    navigate(`/bidderTicketQuotation/${raiseTicketId}`, { state: { raiseTicketId } });
  };

  const handleOrderClick = (raiseTicketId) => {
    navigate(`/customerCareConfirmation/${raiseTicketId}`, { state: { raiseTicketId}});
  }

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
        {dealerQuoteNotifications.map((notification) => (
          <div
            key={notification.raiseTicketId}
            className={`notification-item ${
              notification.raiseTicketId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
              <span
                onClick={() => handleDealerClick(notification.id)}
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
        {orderTicketNotifications.map((notification) => (
          <div
            key={notification.raiseTicketId}
            className={`notification-item ${
              notification.raiseTicketId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
              <span
                onClick={() => handleOrderClick(notification.id)}
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
  const [dealerNotifications, setDealerNotifications] = useState([]);
  const [orderNotifications, setOrderNotifications] = useState([]);
  const [newTicketCount, setNewTicketCount] = useState(0);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
  const [newDealerCount, setNewDealerCount] = useState(0);
  const [newOrderCount, setNewOrderCount] = useState(0); 
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [glowTicket, setGlowTicket] = useState(false);
  const [glowQuote, setGlowQuote] = useState(false);
  const [glowDealer, setGlowDealer] = useState(false);
  const [glowOrder, setGlowOrder] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [highlightedDealer, setHighlightedDealer] = useState(null);
  const [highlightedOrder, setHighlightedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  // const {raiseTicketId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNotifications = async () => {
    try {
      const [raiseTicketResponse, getQuoteResponse, getDealerResponse, getOrderResponse] = await Promise.all([
        fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications"
        ),
        fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotificationsForTechnician"
        ),
        fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetRaiseTicketsForDealers"
        ),
        fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications`),
      ]);

      const raiseTicketData = await raiseTicketResponse.json();
      const raiseTicketFiltered = raiseTicketData.filter(
        (item) => item.internalStatus === "Open" && item.assignedTo === "Customer Care"
      );
      const raiseTicketCount = raiseTicketFiltered.length;

      setTicketNotifications(raiseTicketFiltered);
      setNewTicketCount(raiseTicketCount);
      setGlowTicket(raiseTicketCount > 0);

      if (raiseTicketCount > 0) {
        setHighlightedTicket(raiseTicketFiltered[0].raiseTicketId);
      }

      const getQuoteData = await getQuoteResponse.json();
      const quoteTicketFiltered = getQuoteData.filter(
        (item) => item.assignedTo === "Technical Agency" && item.status === "Assigned" && item.assignedTo !== "Dealer/Trader"
      );
      const getQuoteCount = quoteTicketFiltered.length;

      setQuoteNotifications(quoteTicketFiltered);
      setNewQuoteCount(getQuoteCount);
      setGlowQuote(getQuoteCount > 0);

      if (getQuoteCount > 0) {
        setHighlightedQuote(quoteTicketFiltered[0].raiseAQuoteId);
      }

      const getDealerData = await getDealerResponse.json();
      const dealerTicketFiltered = getDealerData.filter(
        (item) => item.internalStatus === "Pending" && item.assignedTo === "Dealer/Trader" 
      );
      const getDealerCount = dealerTicketFiltered.length;

      setDealerNotifications(dealerTicketFiltered);
      setNewDealerCount(getDealerCount);
      setGlowDealer(getDealerCount > 0);

      if (getDealerCount > 0) {
        setHighlightedQuote(dealerTicketFiltered[0].raiseTicketId);
      }
     const getOrderData = await getOrderResponse.json();
   const orderFiltered = getOrderData.filter((item) => item.internalStatus === "Customer Approved");
     const getOrderCount = orderFiltered.length;
     setOrderNotifications(orderFiltered);
     setNewOrderCount(getOrderCount);
     setGlowOrder(getOrderCount > 0);

     if (getOrderCount > 0) {
      setHighlightedOrder(orderFiltered[0].raiseTicketId);
     }
      const totalNotifications = raiseTicketCount + getQuoteCount + getDealerCount + getOrderCount;
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
    setGlowTicket(false);
    setHighlightedTicket(null);
  };

  const handleClearQuoteNotifications = () => {
    setNewQuoteCount(0);
    setGlowQuote(false);
    setHighlightedQuote(null);
  };

  const handleClearDealerNotifications = () => {
    setNewDealerCount(0);
    setGlowDealer(false);
    setHighlightedDealer(null);
  };

  const handleClearOrderNotifications = () => {
    setNewOrderCount(0);
    setGlowOrder(false);
    setHighlightedOrder(null);
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  return ( 
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 p-0 adm_mnu">
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

      <div className={`container m-1  ${isMobile ? "w-100" : "w-75"}`}>
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

<div className="notifications-container d-flex bg-white p-1">
{isMobile ? (
  <div className="tabs-mobile d-flex flex-column">
    {["Raise Ticket", "Technician Get Quote", "Dealer Get Quote", "Raise Ticket Orders"].map((tab) => (
      <div
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise Ticket" && glowTicket ? "glow" : ""} 
          ${tab === "Technician Get Quote" && glowQuote ? "glow" : ""} 
          ${tab === "Dealer Get Quote" && glowDealer ? "glow" : ""} 
          ${tab === "Raise Ticket Orders" && glowOrder ? "glow" : ""}`}
        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer" }}
      >
        {tab}{" "}
        {tab === "Raise Ticket" && newTicketCount > 0 && (
          <span className="badge bg-danger">{newTicketCount}</span>
        )}
        {tab === "Technician Get Quote" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )}
        {tab === "Dealer Get Quote" && newDealerCount > 0 && (
          <span className="badge bg-danger">{newDealerCount}</span>
        )}
        {tab === "Raise Ticket Orders" && newOrderCount > 0 && (
          <span className="badge bg-danger">{newOrderCount}</span>
        )}
      </div>
    ))}
  </div>
) : (
  <div className="tabs d-flex">
    {["Raise Ticket", "Technician Get Quote", "Dealer Get Quote", "Raise Ticket Orders"].map((tab) => (
      <span
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise Ticket" && glowTicket ? "glow" : ""} 
          ${tab === "Technician Get Quote" && glowQuote ? "glow" : ""} 
          ${tab === "Dealer Get Quote" && glowDealer ? "glow" : ""} 
          ${tab === "Raise Ticket Orders" && glowOrder ? "glow" : ""}`}
        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        {tab}{" "}
        {tab === "Raise Ticket" && newTicketCount > 0 && (
          <span className="badge bg-danger">{newTicketCount}</span>
        )}
        {tab === "Technician Get Quote" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )}
        {tab === "Dealer Get Quote" && newDealerCount > 0 && (
          <span className="badge bg-danger">{newDealerCount}</span>
        )}
        {tab === "Raise Ticket Orders" && newOrderCount > 0 && (
          <span className="badge bg-danger">{newOrderCount}</span>
        )}
      </span>
    ))}
  </div>
)}
<div>
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
          </div>
          <div>
          {activeTab === "Technician Get Quote" && (
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
          <div>
{activeTab === "Dealer Get Quote" && (
              <>
                <NotificationsList
                  notifications={dealerNotifications}
                  highlightedItem={highlightedDealer}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/dealerGrid`);
                    handleClearDealerNotifications();
                  }} 
                  style={{ cursor: "pointer" }}
                >
                  View All Notifications
                </div>
              </>
            )}
            </div>
            <div>
{activeTab === "Raise Ticket Orders" && (
            <>
              <NotificationsList
                notifications={orderNotifications}
                highlightedItem={highlightedOrder}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/customerCareGrid`);
                  handleClearOrderNotifications();
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
        {/* Styles for floating menu */}
<style jsx>{`
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