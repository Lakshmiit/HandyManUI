import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
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
  const {category} = useParams();
  const {userType} = useParams();
  const {userId} = useParams();
  const {district} = useParams();

  const getQuoteNotifications = notifications.filter((item) => item.assignedTo === "Technical Agency");

  const getOrderNotifications = notifications.filter((item) => (item.internalStatus === "Customer Approved" || item.internalStatus === "PaymentDone") && item.lowestBidderTechnicainId === userId);


  const handleQuoteClick = (ticketId) => {
    navigate(`/viewRaiseQuote/${userType}/${userId}/${category}/${ticketId}`, { state: { ticketId } });
  };

  const handleOrderClick = (ticketId) => {
    navigate(`/ticketConfirmation/${userType}/${userId}/${category}/${district}/${ticketId}`, { state: { ticketId } });
  };

  return (
    <div>
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

    <div className="notification-list">
    {getOrderNotifications.map((notification) => (
      <div
        key={notification.raiseAQuoteId}
        className={`notification-item ${
          notification.raiseAQuoteId === highlightedItem ? "highlight" : ""
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

const Notification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [quoteNotifications, setQuoteNotifications] = useState([]);
 const [orderNotifications, setOrderNotifications] = useState([]);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
 const [newOrderCount, setNewOrderCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  const [highlightedOrder, setHighlightedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [glow, setGlow] = useState(false);
  const [glowQuote, setGlowQuote] = useState(false);
   const [glowOrder, setGlowOrder] = useState(false);
  //  const [profile, setProfile] = useState([]);
  const { category}= useParams();
  const {district } = useParams();

  const [ category1, setCategory1]= useState("");
  const [ district1, setDistrict1]= useState("");
  const { userType } = useParams();
  // const {location} = useLocation();
  // const [category, setCategory] = useState(sessionStorage.getItem("category") || "");
  // const [district, setDistrict] = useState(sessionStorage.getItem("district") || "");
  // const {raiseTicketId } = useParams();
  const { userId } = useParams();
const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  
    const navigate = useNavigate();
    useEffect(() => {
      console.log(loading, error, glowQuote, glowOrder);
    }, [loading, error, glowQuote, glowOrder]);
  // useEffect(() => {
  //   if (location.state) {
  //     const { category, district } = location.state;
  //     setCategory(category);
  //     setDistrict(district);
  //     sessionStorage.setItem("category", category);
  //     sessionStorage.setItem("district", district);
  //   }
  // }, [location.state]);
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
            if (!userId || !userType) return;
            const fetchProfileData = async () => {
              try {
                let apiUrl = "";
             
                  apiUrl = `https://handymanapiv2.azurewebsites.net/api/technician/technicianProfileData?profileType=${userType}&UserId=${userId}`;
                
                if (!apiUrl) return;
                const response = await axios.get(apiUrl);
                //setProfile(response.data); 
                // alert(response.data.district);
                setCategory1(response.data.category);
             
                setDistrict1(response.data.district);
                // alert(response.data.district);
                
                  
              } catch (err) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            };
          
            fetchProfileData();
          }, [userType, userId]);
          
    
          // useEffect(() => {
          //   if (category && district) {
          //     setMenuList(getMenuList(userType, userId, category, district));
          //   }
          // }, [category, district, userType, userId]);
          
    





useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const [getQuoteResponse, orderResponse] = await Promise.all([
      fetch(
        `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByNotExistTechnicianId?category=${category1}&district=${district1}&technicianId=${userId}`
      ),
      fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByExistingTechnicianId?category=${category1}&district=${district1}&technicianId=${userId}`),

    ]);

      const getQuoteData = await getQuoteResponse.json();
      const tickets = getQuoteData.tickets || [];
      const getTicketsFiltered = tickets.filter((item) => item.assignedTo ==="Technical Agency")
      .sort((a, b) => new Date(b.date) - new Date(a.date));

      const getQuoteCount = getTicketsFiltered.length;

      setQuoteNotifications(getTicketsFiltered);  
      setNewQuoteCount(getQuoteCount);
      setGlowQuote(getQuoteCount > 0);

      if (getQuoteCount > 0) {
        setHighlightedQuote(getTicketsFiltered[0].raiseAQuoteId);
      }

       const getOrderData = await orderResponse.json();
      //  alert(JSON.stringify(getOrderData));
       const orderTickets = getOrderData.tickets || [];
      const ordersFiltered = orderTickets.filter((item) =>
         (item.internalStatus === "Customer Approved" || item.internalStatus === "PaymentDone") && item.lowestBidderTechnicainId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
      const getOrderCount = ordersFiltered.length;
      // alert(ordersFiltered); 

      setOrderNotifications(ordersFiltered);
      setNewOrderCount(getOrderCount);
      setGlowOrder(getOrderCount > 0);
      if (getOrderCount > 0) {
        setHighlightedOrder(ordersFiltered[0].raiseAQuoteId);
      }

      const totalNotifications = getQuoteCount + getOrderCount;
      
      setNewNotificationCount(totalNotifications);
      setGlow(totalNotifications > 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 6000);
    return () => clearInterval(interval);
  }, [category1, district1, userId]);


// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const [getQuoteResponse, orderResponse] = await Promise.all([
//         fetch(
//           `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByNotExistTechnicianId?category=${category}&district=${district}&technicianId=${technicianId}`
//         ),
//         fetch(
//           `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByExistingTechnicianId?category=${category}&district=${district}&technicianId=${technicianId}`
//         ),
//       ]);

//       const getQuoteData = await getQuoteResponse.json();
//       const orderData = await orderResponse.json();
//       // alert(JSON.stringify(orderData)); 
//       const getTicketsFiltered = getQuoteData.tickets?.filter(
//         (item) => item.assignedTo === "Technical Agency"
//       ) || [];

//         const ordersFiltered = orderData?.filter(
//         (item) => item.internalStatus === "Customer Approved"
//       ) || [];
//       //  alert(JSON.stringify(ordersFiltered));

//       setQuoteNotifications(getTicketsFiltered);
//       setOrderNotifications(ordersFiltered);

//       const getQuoteCount = getTicketsFiltered.length;
//       const getOrderCount = ordersFiltered.length;

//       setNewQuoteCount(getQuoteCount);
//       setNewOrderCount(getOrderCount);
//       setNewNotificationCount(getQuoteCount + getOrderCount);

//       setGlowQuote(getQuoteCount > 0);
//       setGlowOrder(getOrderCount > 0);
//       setGlow(getQuoteCount + getOrderCount > 0);

//       if (getQuoteCount > 0) {
//         setHighlightedQuote(getTicketsFiltered[0].raiseAQuoteId);
//       }

//       if (getOrderCount > 0) {
//         setHighlightedOrder(ordersFiltered[0].raiseTicketId);
//       }
//     } catch (error) {
//       console.error("Failed to fetch notifications:", error);
//     }
//   };

//   fetchNotifications();
//   const interval = setInterval(fetchNotifications, 6000);
//   return () => clearInterval(interval);
// }, [category, district, technicianId]);


  const handleClearQuoteNotifications = () => {
    setNewQuoteCount(0);
    setGlowQuote(false);
    setHighlightedQuote(null);
  };

  const handleClearOrderNotifications = () => {
    setNewOrderCount(0);
    setGlowOrder(false);
    setHighlightedOrder(null);
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

        <div className="notifications-container d-flex bg-white p-2">
          {isMobile ? (
  <div className="tabs-mobile d-flex flex-column">
    {["Raise A Quote", "Raise A Quote Orders"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""} 
                ${tab === "Raise A Quote" 
                  // && glowQuote ? "glow" : ""
                }
                ${tab === "Raise A Quote Orders" 
                  // && glowOrder ? "glow" : ""
                }
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
                  {newOrderCount > 0 && (
                      <span className="badge bg-danger">{newOrderCount}</span>
                  )}
                  </>
                )}
              </span>
            ))}
  </div>
) : (
  <div className="tabs d-flex">
    {["Raise A Quote", "Raise A Quote Orders"].map((tab) => (
      <span
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise A Quote" 
            // && glowQuote ? "glow" : ""
          } 
          ${tab === "Raise A Quote Orders" 
            // && glowOrder ? "glow" : ""
          }`}
        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        {tab}{" "}
        {tab === "Raise A Quote" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )}
        {tab === "Raise A Quote Orders" && newOrderCount > 0 && (
          <span className="badge bg-danger">{newOrderCount}</span>
        )}
      </span>
    ))}
  </div>
)}
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
                    navigate(`/technicianQuoteNotification/${userType}/${userId}/${category}/${district}`);
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
            {activeTab === "Raise A Quote Orders" && (
              <>
                <NotificationsList
                  notifications={orderNotifications}
                  highlightedItem={highlightedOrder}
                />
                <div
                  className="view-notifications text-info mx-2"
                  onClick={() => {
                    navigate(`/ticketConfirmationGrid/${userType}/${userId}/${category}/${district}`);
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
