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
  const {userType} = useParams();
  const {userId} = useParams();


  const raiseTicketNotifications = notifications.filter(
    (item) => (item.assignedTo === "Customer"  && item.internalStatus === "Assign" && item.raiseTicketId != null) || (item.assignedTo === "Customer"  && item.internalStatus === "Pending"  && item.raiseTicketId != null) || (item.internalStatus === "Assigned")
    // && item.internalStatus === "Pending"
  );

  const getTechnicianNotifications = notifications.filter(
    (item) => (item.status === "Assigned" && item.assignedTo === "Customer"  && item.bookTechnicianId != null) || (item.status === "Draft" && item.assignedTo === "Customer Care"  && item.bookTechnicianId != null)
  );
  const handleTicketClick = (raiseTicketId) => { 
    navigate(`/customerRaiseTicketQuotation/${userType}/${userId}/${raiseTicketId}`, { state: { raiseTicketId } });
  };
  
  const handleTechnicianClick = (technicianId) => {
    navigate(`/customerBookTechnicianQuotation/${userType}/${userId}/${technicianId}`, { state: { technicianId } });
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

      <div className="notification-list">
        {getTechnicianNotifications.map((notification) => (
          <div
            key={notification.bookTechnicianId}
            className={`notification-item ${
              notification.bookTechnicianId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
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

// Main Notification Component
const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [ticketNotifications, setTicketNotifications] = useState([]);
  const [technicianNotifications, setTechnicianNotifications] = useState([]);
  // const [quoteNotifications, setQuoteNotifications] = useState([]);
  const [newTicketCount, setNewTicketCount] = useState(0);
  const [newTechnicianCount, setNewTechnicianCount] = useState(0);
  // const [newOrderCount, setNewOrderCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [glowTicket, setGlowTicket] = useState(false);
  const [glowTechnician, setGlowTechnician] = useState(false);
  const [glowGet] = useState(false);
  // const [glowOrder, setGlowOrder] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  const [highlightedTechnician, setHighlightedTechnician] = useState(null);
  // const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const {userType} = useParams();
  const { userId } = useParams();

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
        const [raiseTicketResponse, getTechnicianResponse] = await Promise.all([
          fetch(
          `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetRaiseTicketNotificationsByCustomerId?customerId=${userId}`
        ),
        fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianDetailsForUserList?userId=${userId}`),
      ]);
        const raiseTicketData = await raiseTicketResponse.json();

        const raiseTicketFiltered = raiseTicketData.filter(
          (item) => (item.assignedTo === "Customer"  && item.internalStatus === "Assign"  && item.raiseTicketId != null) || (item.assignedTo === "Customer"  && item.internalStatus === "Pending"  && item.raiseTicketId != null) || (item.internalStatus === "Assigned")
          // && item.internalStatus === "Pending"
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
        const raiseTicketCount = raiseTicketFiltered.length;

        setTicketNotifications(raiseTicketFiltered);
        setNewTicketCount(raiseTicketCount);
        setGlowTicket(raiseTicketCount > 0);
 
        if (raiseTicketCount > 0) {
          setHighlightedTicket(raiseTicketFiltered[0].raiseTicketId);
        }


        const bookTechnicianData = await getTechnicianResponse.json();

        const getTechnicianFiltered = bookTechnicianData.filter(
          (item) => (item.status === "Assigned" && item.assignedTo === "Customer"&& item.bookTechnicianId != null) || (item.status === "Draft" && item.assignedTo === "Customer Care"  && item.bookTechnicianId != null)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
        const getTechnicianCount = getTechnicianFiltered.length;

        setTechnicianNotifications(getTechnicianFiltered);
        setNewTechnicianCount(getTechnicianCount);
        setGlowTechnician(getTechnicianCount > 0);
 
        if (getTechnicianCount > 0) {
          setHighlightedTechnician(getTechnicianFiltered[0].bookTechnicianId);
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

        const totalNotifications = raiseTicketCount + getTechnicianCount;
        setNewNotificationCount(totalNotifications);
        setGlow(totalNotifications > 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  const handleClearTicketNotifications = () => {
    setNewTicketCount(0);
    setGlowTicket(false);
    setHighlightedTicket(null);
  };


  const handleClearTechnicianNotifications = () => {
    setNewTechnicianCount(0);
    setGlowTechnician(false);
    setHighlightedTechnician(null);
  }
  // const handleClearQuoteNotifications = () => {
  //   setNewQuoteCount(0);
  //   setGlowQuote(false);
  //   setHighlightedQuote(null);
  // };

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div>
  <Header />
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

        <div className="notifications-container d-flex bg-white p-2">
        {isMobile ? (
  <div className="tabs-mobile d-flex flex-column">
    {["Raise Ticket Quotations", "Buy Product Quotations", "Technician Notifications"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Raise Ticket Quotations" && glowTicket ? "glow" : ""}
                ${tab === "Buy Product Quotations" && glowGet ? "glow" : ""}
                ${tab === "Technician Notifications" && glowTechnician ? "glow": ""}`}
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
                    {/* {newQuoteCount > 0 && (
                      <span className="badge bg-danger">{newQuoteCount}</span>
                    )} */}
                  </>
                )}
                 {tab === "Technician Notifications" && (
                  <> 
                    Technician Notifications{" "}
                    {newTechnicianCount > 0 && (
                      <span className="badge bg-danger">{newTechnicianCount}</span>
                    )}
                  </>
                )}
              </span>
            ))}
  </div>
) : (
  <div className="tabs d-flex">
    {["Raise Ticket Quotations", "Buy Product Quotations", "Technician Notifications"].map((tab) => (
      <span
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise Ticket Quotations" && glowTicket ? "glow" : ""} 
          ${tab === "Buy Product Quotations" && glowGet ? "glow" : ""} 
          ${tab === "Technician Notifications" && glowTechnician ? "glow" : ""} `}
        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        {tab}{" "}
        {tab === "Raise Ticket Quotations" && newTicketCount > 0 && (
          <span className="badge bg-danger">{newTicketCount}</span>
        )}
        {/* {tab === "Buy Product Quotations" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )} */}
        {tab === "Technician Notifications" && newTechnicianCount > 0 && (
          <span className="badge bg-danger">{newTechnicianCount}</span>
        )}
      </span>
    ))}
  </div>
)}

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
                    navigate(`/viewCustomer/${userType}/${userId}`);
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
            {activeTab === "Technician Notifications" && (
              <>
                <NotificationsList
                  notifications={technicianNotifications}
                  highlightedItem={highlightedTechnician}
                />
                <div
                  className=" view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/bookTechnicianCustomerGrid/${userType}/${userId}`);
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

export default Notification;
