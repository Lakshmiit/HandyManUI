import React, { useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  Dashboard as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  NotificationsNone as NotificationsNoneIcon,
} from "@mui/icons-material";
// import Header from './Header.js';
import Footer from './Footer.js';
import { Button } from "react-bootstrap";    
import "./App.css";

const NotificationsList = ({ notifications, highlightedItem }) => {
  const navigate = useNavigate();
  const raiseTicketNotifications = notifications.filter(
    (item) => item.internalStatus === "Open" && item.assignedTo === "Customer Care" 
  );
//   const getQuoteNotifications = notifications.filter(
//     (item) =>  item.internalStatus === "Pending" && item.assignedTo === "Technical Agency"  
//   );
//   const dealerQuoteNotifications = notifications.filter(
//     (item) => item.internalStatus === "Pending" && item.assignedTo === "Dealer/Trader"
//   );
//  const orderTicketNotifications = notifications.filter(
//   (item) => (item.internalStatus === "Customer Approved" || item.internalStatus === "PaymentDone" || item.internalStatus === "Closed")
// );
const bookTechnicianNotifications = notifications.filter(
  (item) => item.status === "Open" && item.assignedTo !== "Customer Care"  && item.bookTechnicianId != null
);
const buyProductNotifications = notifications.filter(
  (item) => item.status === "Open" && item.assignedTo === "Customer Care" && item.buyProductId != null
);
// const productClosedNotifications = notifications.filter(
//   (item) => (item.assignedTo !== "Customer Care" && item.status === "Closed" && item.assignedTo === "Admin" && item.buyProductId != null) || (item.assignedTo === "Admin" && item.transactionStatus === "Success" && item.buyProductId != null)
// );
// const apartmentMaintenanceNotifications = notifications.filter(
//   (item) => item.status === "Open" && item.apartmentRaiseTicketId != null
// );
const groceryItemNotifications = notifications.filter(
  (item) => item.status === "Open" && item.martId != null
);
const lakshmiCollectionsNotifications = notifications.filter(
  (item) => item.status === "Open" && item.lakshmiCollectionId != null
);
  const handleTicketClick = (ticketId) => {
    navigate(`/raiseTicketActionView/${ticketId}`, { state: { ticketId } });
  };
  // const handleQuoteClick = (ticketId) => {
  //   navigate(`/raiseTicketQuotation/${ticketId}`, { state: { ticketId } });
  // };
  // const handleDealerClick = (raiseTicketId) => {
  //   navigate(`/bidderTicketQuotation/${raiseTicketId}`, { state: { raiseTicketId } });
  // };
  // const handleOrderClick = (raiseTicketId) => {
  //   navigate(`/customerCareConfirmation/${raiseTicketId}`, { state: { raiseTicketId}});
  // };
  const handleTechnicianClick = (bookTechnicianId) => {
    navigate(`/bookTechnicianActionView/${bookTechnicianId}`, { state: { bookTechnicianId}});
  };
  const handleBuyProductClick = (buyProductId) => {
    navigate(`/adminBuyProductOrders/${buyProductId}`, { state: { buyProductId}});
  };
  // const handleClosedClick = (buyProductId) => {
  //   navigate(`/adminClosedBuyProductOrders/${buyProductId}`, { state: { buyProductId}});
  // };
  //  const handleApartmentClick = (apartmentRaiseTicketId) => {
  //   navigate(`/apartmentRaiseTicketActionView/${apartmentRaiseTicketId}`, { state: { apartmentRaiseTicketId } });
  // };

   const handleGroceryClick = (martId) => {
    navigate(`/adminGroceryOrderPage/${martId}`, { state: { martId } });
  };
  const handleCollectionsClick = (lakshmiCollectionId) => {
    navigate(`/adminLakshmiCollectionsOrders/${lakshmiCollectionId}`, { state: { lakshmiCollectionId } });
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

      {/* <div className="notification-list">
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
      </div> */}

      {/* <div className="notification-list">
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
      </div> */}

      {/* <div className="notification-list">
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
      </div> */}

      <div className="notification-list">
        {bookTechnicianNotifications.map((notification) => (
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

      <div className="notification-list">
        {buyProductNotifications.map((notification) => (
          <div
            key={notification.buyProductId}
            className={`notification-item ${
              notification.buyProductId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Buy Product ID: </strong>
              <span
                onClick={() => handleBuyProductClick(notification.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.buyProductId}
              </span>
            </div>
            <div>
              <strong>Product Name:</strong> {notification.productName}
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

      {/* <div className="notification-list">
        {productClosedNotifications.map((notification) => (
          <div
            key={notification.buyProductId}
            className={`notification-item ${
              notification.buyProductId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Buy Product ID: </strong>
              <span
                onClick={() => handleClosedClick(notification.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.buyProductId}
              </span>
            </div>
            <div>
              <strong>Product Name:</strong> {notification.productName}
            </div>
            <div>
              <strong>Category:</strong> {notification.category}
            </div>
            <div className="notification-date">
              <strong>Date:</strong> {new Date(notification.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div> */}

      {/* <div className="notification-list">
        {apartmentMaintenanceNotifications.map((notification) => (
          <div
            key={notification.apartmentRaiseTicketId}
            className={`notification-item ${
              notification.apartmentRaiseTicketId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Ticket ID: </strong>
              <span
                onClick={() => handleApartmentClick(notification.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.apartmentRaiseTicketId}
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
      </div> */}

        <div className="notification-list">
        {groceryItemNotifications.map((notification) => (
          <div
            key={notification.martId}
            className={`notification-item ${
              notification.martId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Grocery ID: </strong>
              <span
                onClick={() => handleGroceryClick(notification.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.martId}
              </span>
            </div>
            <div>
              <strong>Customer Name:</strong> {notification.customerName}
            </div>
            <div>
              <strong>Address:</strong> {notification.address}, {notification.district}, {notification.state}, {notification.zipCode}, {notification.customerPhoneNumber}
            </div>
            <div className="notification-date">
              <strong>Date:</strong> {new Date(notification.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="notification-list">
        {lakshmiCollectionsNotifications.map((notification) => (
          <div
            key={notification.lakshmiCollectionId}
            className={`notification-item ${
              notification.lakshmiCollectionId === highlightedItem ? "highlight" : ""
            }`}
          >
            <div className="notification-header">
              <strong>Collection ID: </strong>
              <span
                onClick={() => handleCollectionsClick(notification.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {notification.lakshmiCollectionId}
              </span>
            </div>
            <div>
              <strong>Collection Name:</strong> {notification.categoriess?.[0]?.productName}
            </div> 
            <div>
              <strong>Category:</strong> {notification.categoriess?.[0]?.categoryName}
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
  // const [quoteNotifications, setQuoteNotifications] = useState([]);
  // const [dealerNotifications, setDealerNotifications] = useState([]);
  // const [orderNotifications, setOrderNotifications] = useState([]);
 const [technicianNotifications, setTechnicianNotifications] = useState([]);
 const [productNotifications, setProductNotifications] = useState([]);
//  const [closedProductNotifications, setClosedProductNotifications] = useState([]);
//   const [apartmentNotifications, setApartmentTicketNotifications] = useState([]);
  const [groceryNotifications, setGroceryItemNotifications] = useState([]);
  // const [deliveryNotifications] = useState([]);
  // const [deliveryNotifications, setDeliveryNotifications] = useState([]);
  const [collectionNotifications, setCollectionNotifications] = useState([]);
  const [newTicketCount, setNewTicketCount] = useState(0);
  // const [newQuoteCount, setNewQuoteCount] = useState(0);
  // const [newDealerCount, setNewDealerCount] = useState(0);
  // const [newOrderCount, setNewOrderCount] = useState(0); 
  const [newTechnicianCount, setNewTechnicianCount] = useState(0);
  const [newProductCount, setNewProductCount] = useState(0);
  // const [newClosedCount, setNewClosedCount] = useState(0); 
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  // const [newApartmentCount, setNewApartmentCount] = useState(0);
  const [newGroceryCount, setNewGroceryCount] = useState(0); 
  // const [newDeliveryCount, setNewDeliveryCount] = useState(0); 
  const [newCollectionCount, setNewCollectionCount] = useState(0); 
  const [glow, setGlow] = useState(false);
  const [glowTicket, setGlowTicket] = useState(false);   
  // const [glowQuote, setGlowQuote] = useState(false);
  // const [glowDealer, setGlowDealer] = useState(false);
  // const [glowOrder, setGlowOrder] = useState(false);
  const [glowTechnician, setGlowTechnician] = useState(false);
  const [glowProduct, setGlowProduct] = useState(false);
  // const [glowClosed, setGlowClosed] = useState(false);
  // const [glowApartment, setGlowApartment] = useState(false);
  const [glowGrocery, setGlowGrocery] = useState(false);
  // const [glowDelivery, setGlowDelivery] = useState(false);
  const [glowCollection, setGlowCollection] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  // const [highlightedQuote, setHighlightedQuote] = useState(null);
  // const [highlightedDealer, setHighlightedDealer] = useState(null);
  // const [highlightedOrder, setHighlightedOrder] = useState(null);
  const [highlightedTechnician, setHighlightedTechnician] = useState(null);
  const [highlightedProduct, setHighlightedProduct] = useState(null);
  // const [highlightedClosed, setHighlightedClosed] = useState(null);
  // const [highlightedApartment, setHighlightedApartment] = useState(null);
  const [highlightedGrocery, setHighlightedGrocery] = useState(null);
  //  const [highlightedDelivery, setHighlightedDelivery] = useState(null);
  const [highlightedCollection, setHighlightedCollection] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  // const {raiseTicketId} = useParams();
  const navigate = useNavigate();
   
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNotifications = useCallback(async () => {
    try { 
      // const [raiseTicketResponse, getQuoteResponse, getDealerResponse, getOrderResponse, BookTechnicianResponse, collectionsResponse, buyProductResponse, productClosedResponse, apartmentRaiseTicketResponse, groceryItemResponse] = await Promise.all([
      const [raiseTicketResponse, BookTechnicianResponse, buyProductResponse, groceryItemResponse, collectionsResponse] = await Promise.all([
        fetch(
          "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications"
        ),
        // fetch(
        //   "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotificationsForTechnician"
        // ),
        // fetch(
        //   "https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetRaiseTicketsForDealers"
        // ),
        // fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicketsNotifications`),
        fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianForAdminList`),
        fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsForAdminList`),
        // fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsForAdminList`),
        // fetch(`https://handymanapiv2.azurewebsites.net/api/ApartmentRaiseTicket/GetGetApartmentMaintenanceForAdminList`),
        fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/GetAllMartItems`),
        fetch(`https://handymanapiv2.azurewebsites.net/api/LakshmiCollection/GetAllLakshmiCollectionsOpen`),
        // fetch(``),
      ]);

      const raiseTicketData = await raiseTicketResponse.json();
      const raiseTicketFiltered = raiseTicketData.filter(
        (item) => item.internalStatus === "Open" && item.assignedTo === "Customer Care")
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      const raiseTicketCount = raiseTicketFiltered.length;
      setTicketNotifications(raiseTicketFiltered);
      setNewTicketCount(raiseTicketCount);
      setGlowTicket(raiseTicketCount > 0);
      if (raiseTicketCount > 0) {
        setHighlightedTicket(raiseTicketFiltered[0].raiseTicketId);
      }

  //     const getQuoteData = await getQuoteResponse.json();
  //     const quoteTicketFiltered = getQuoteData.filter(
  //       (item) => item.assignedTo === "Technical Agency" && item.status === "Assigned" && item.assignedTo !== "Dealer/Trader")
  //       .sort((a, b) => new Date(b.date) - new Date(a.date));
  //     const getQuoteCount = quoteTicketFiltered.length;
  //     setQuoteNotifications(quoteTicketFiltered);
  //     setNewQuoteCount(getQuoteCount);
  //     setGlowQuote(getQuoteCount > 0);
  //     if (getQuoteCount > 0) {
  //       setHighlightedQuote(quoteTicketFiltered[0].raiseAQuoteId);
  //     }

  //     const getDealerData = await getDealerResponse.json();
  //     const dealerTicketFiltered = getDealerData.filter(
  //       (item) => item.internalStatus === "Pending" && item.assignedTo === "Dealer/Trader")
  //       .sort((a, b) => new Date(b.date) - new Date(a.date));
  //     const getDealerCount = dealerTicketFiltered.length;
  //     setDealerNotifications(dealerTicketFiltered);
  //     setNewDealerCount(getDealerCount);
  //     setGlowDealer(getDealerCount > 0);
  //     if (getDealerCount > 0) {
  //       setHighlightedQuote(dealerTicketFiltered[0].raiseTicketId);
  //     }

  //    const getOrderData = await getOrderResponse.json();
  //  const orderFiltered = getOrderData.filter((item) => item.internalStatus === "Customer Approved" || item.internalStatus === "PaymentDone" || item.internalStatus === "Closed")
  //  .sort((a, b) => new Date(b.date) - new Date(a.date));
  //  const getOrderCount = orderFiltered.length;
  //    setOrderNotifications(orderFiltered);
  //    setNewOrderCount(getOrderCount);
  //    setGlowOrder(getOrderCount > 0);
  //    if (getOrderCount > 0) {
  //     setHighlightedOrder(orderFiltered[0].raiseTicketId);
  //    }

     const bookTechnicianData = await BookTechnicianResponse.json();
   const bookTechnicianFiltered = bookTechnicianData.filter((item) => item.status === "Open" && item.assignedTo !== "Customer Care" && item.bookTechnicianId != null)
   .sort((a, b) => new Date(b.date) - new Date(a.date));
   const bookTechnicianCount = bookTechnicianFiltered.length;
     setTechnicianNotifications(bookTechnicianFiltered);
     setNewTechnicianCount(bookTechnicianCount);
     setGlowTechnician(bookTechnicianCount > 0);
     if (bookTechnicianCount > 0) {
      setHighlightedTechnician(bookTechnicianFiltered[0].bookTechnicianId);
     }

   const buyProductData = await buyProductResponse.json();
   const buyProductFiltered = buyProductData.filter((item) => 
    item.status === "Open" && item.assignedTo === "Customer Care" && item.buyProductId != null)
   .sort((a, b) => new Date(b.date) - new Date(a.date));
   const buyProductCount = buyProductFiltered.length;
     setProductNotifications(buyProductFiltered);
     setNewProductCount(buyProductCount);
     setGlowProduct(buyProductCount > 0);
     if (buyProductCount > 0) {
      setHighlightedProduct(buyProductFiltered[0].buyProductId);
     }

    //  const productClosedData = await productClosedResponse.json();
    //  const productClosedFiltered = productClosedData.filter( 
    //   (item) => (item.assignedTo !== "Customer Care" && item.status === "Closed"  && item.assignedTo === "Admin" && item.buyProductId != null) || (item.transactionStatus === "Success" && item.buyProductId != null));
    // //  .sort((a, b) => new Date(b.date) - new Date(a.date));
    //  const productClosedCount = productClosedFiltered.length;
    //  setClosedProductNotifications(productClosedFiltered);
    //  setNewClosedCount(productClosedCount);
    //  setGlowClosed(productClosedCount > 0);
    //  if (productClosedCount > 0) {
    //   setHighlightedProduct(productClosedFiltered[0].buyProductId);
    //  }

    //  const apartmentMaintenanceTicketData = await apartmentRaiseTicketResponse.json();
    //   const apartmentRaiseTicketFiltered = apartmentMaintenanceTicketData.filter(
    //     (item) => item.status === "Open"  && item.apartmentRaiseTicketId != null)
    //     .sort((a, b) => new Date(b.date) - new Date(a.date));
    //   const apartmentTicketCount = apartmentRaiseTicketFiltered.length;
    //   setApartmentTicketNotifications(apartmentRaiseTicketFiltered);
    //   setNewApartmentCount(apartmentTicketCount);
    //   setGlowApartment(apartmentTicketCount > 0);
    //   if (apartmentTicketCount > 0) {
    //     setHighlightedApartment(apartmentRaiseTicketFiltered[0].apartmentRaiseTicketId);
    //   }

      const groceryItemData = await groceryItemResponse.json();
      const groceryItemFiltered = groceryItemData.filter(
        (item) => item.status === "Open"  && item.martId != null)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      const groceryItemCount = groceryItemFiltered.length;
      setGroceryItemNotifications(groceryItemFiltered);
      setNewGroceryCount(groceryItemCount);
      setGlowGrocery(groceryItemCount > 0);
      if (groceryItemCount > 0) {
        setHighlightedGrocery(groceryItemFiltered[0].martId);
      }

      const collectionsData = await collectionsResponse.json();
      const collectionsFiltered = collectionsData.filter(
        (item) => item.status === "Open"  && item.lakshmiCollectionId != null)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      const collectionsCount = collectionsFiltered.length;
      setCollectionNotifications(collectionsFiltered);
      setNewCollectionCount(collectionsCount);
      setGlowCollection(collectionsCount > 0);
      if (collectionsCount > 0) {
        setHighlightedCollection(collectionsFiltered[0].lakshmiCollectionId);
      } 
// const deliveryPartnerData = await deliveryPartnerResponse.json();
//       const deliveryPartnerFiltered = deliveryPartnerData.filter(
//         (item) => item.status === "Draft")
//         .sort((a, b) => new Date(b.date) - new Date(a.date));
//       const deliveryPartnerCount = deliveryPartnerFiltered.length;
//       setDeliveryNotifications(deliveryPartnerFiltered);
//       setNewDeliveryCount(deliveryPartnerCount);
//       setGlowDelivery(deliveryPartnerCount > 0);
//       if (deliveryPartnerCount > 0) {
//         setHighlightedDelivery(deliveryPartnerFiltered[0]);
//       }
      // const totalNotifications = raiseTicketCount + getQuoteCount + getDealerCount + getOrderCount + bookTechnicianCount + buyProductCount + productClosedCount + apartmentTicketCount + collectionsCount+deliveryPartnerCount;
      const totalNotifications = raiseTicketCount + bookTechnicianCount + buyProductCount + groceryItemCount + collectionsCount; 
      setNewNotificationCount(totalNotifications);        
      console.log("newNotificationCount:", newNotificationCount);
      setGlow(totalNotifications > 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [newNotificationCount]);

  useEffect(() => {
  fetchNotifications();
  const interval = setInterval(fetchNotifications, 10000);
  return () => clearInterval(interval);
}, [fetchNotifications]);
  
  const handleClearTicketNotifications = () => {
    setNewTicketCount(0);
    setGlowTicket(false);
    setHighlightedTicket(null);
  };
  // const handleClearQuoteNotifications = () => {
  //   setNewQuoteCount(0);
  //   setGlowQuote(false);
  //   setHighlightedQuote(null);
  // };
  // const handleClearDealerNotifications = () => {
  //   setNewDealerCount(0);
  //   setGlowDealer(false);
  //   setHighlightedDealer(null);
  // };
  // const handleClearOrderNotifications = () => {
  //   setNewOrderCount(0);
  //   setGlowOrder(false);
  //   setHighlightedOrder(null);
  // };
  const handleClearTechnicianNotifications = () => {
    setNewTechnicianCount(0);
    setGlowTechnician(false);
    setHighlightedTechnician(null);
  };
  const handleClearProductNotifications = () => {
    setNewProductCount(0);
    setGlowProduct(false);
    setHighlightedProduct(null);
  };
  // const handleClearClosedNotifications = () => {
  //   setNewClosedCount(0);
  //   setGlowClosed(false);
  //   setHighlightedClosed(null);
  // };
  // const handleClearApartmentNotifications = () => {
  //   setNewApartmentCount(0);
  //   setGlowApartment(false);
  //   setHighlightedApartment(null);
  // };

   const handleClearGroceryNotifications = () => {
    setNewGroceryCount(0);
    setGlowGrocery(false);
    setHighlightedGrocery(null);
  };

  // const handleClearDeliveryNotifications = () => {
  //   setNewDeliveryCount(0);
  //   setGlowDelivery(false);
  //   setHighlightedDelivery(null);
  // };

  const handleClearCollectionNotifications = () => {
    setNewCollectionCount(0);
    setGlowCollection(false);
    setHighlightedCollection(null);
  };

const handleTabClick = (tab) => {
  setActiveTab(tab);
  // if (tab === "Delivery Partner Directory") {
  //   navigate("/deliveryPartnerDirectory");
  // }
};
  return ( 
    <>
    <div className="d-flex flex-row justify-content-start align-items-start mt-mob-50">
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
        <h2 className="text-start mb-1 fs-20">
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
<div className="notifications-container1 d-flex bg-white">
{isMobile ? (
  <div className="tabs-mobile d-flex flex-column">
    {["Raise Ticket", "Book Technician", "Buy Products", "Grocery Items", "Lakshmi Collections"
    //  "Technician Get Quote", "Dealer Get Quote", "Raise Ticket Orders",
      //  "Buy Product Closed Orders", "Apartment Raise Ticket", "Lakshmi Collection Orders", "Lakshmi Collections", "Delivery Partner Directory"
      ].map((tab) => (
      <div
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise Ticket" && glowTicket ? "glow" : ""} 
          ${tab === "Book Technician" && glowTechnician ? "glow" : ""}
          ${tab === "Buy Products" && glowProduct ? "glow" : ""}
          ${tab === "Grocery Items" && glowGrocery ? "glow" : ""}
          ${tab === "Lakshmi Collections" && glowGrocery ? "glow" : ""}
          
          `}
          // ${tab === "Technician Get Quote" && glowQuote ? "glow" : ""} 
          // ${tab === "Dealer Get Quote" && glowDealer ? "glow" : ""} 
          // ${tab === "Raise Ticket Orders" && glowOrder ? "glow" : ""}
          // ${tab === "Buy Product Closed Orders" && glowClosed ? "glow" : ""}
          // ${tab === "Apartment Raise Ticket" && glowApartment ? "glow" : ""}
          // ${tab === "Delivery Partner Directory" && glowDelivery ? "glow" : ""}

        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer" }}
      >
        {tab}{" "}
        {tab === "Raise Ticket" && newTicketCount > 0 && (
          <span className="badge bg-danger">{newTicketCount}</span>
        )}
        {/* {tab === "Technician Get Quote" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )}
        {tab === "Dealer Get Quote" && newDealerCount > 0 && (
          <span className="badge bg-danger">{newDealerCount}</span>
        )}
        {tab === "Raise Ticket Orders" && newOrderCount > 0 && (
          <span className="badge bg-danger">{newOrderCount}</span>
        )} */}
        {tab === "Book Technician" && newTechnicianCount > 0 && (
          <span className="badge bg-danger">{newTechnicianCount}</span>
        )}
        {tab === "Buy Products" && newProductCount > 0 && (
          <span className="badge bg-danger">{newProductCount}</span>
        )}
        {/* {tab === "Buy Product Closed Orders" && newClosedCount > 0 && (
          <span className="badge bg-danger">{newClosedCount}</span>
        )}
        {tab === "Apartment Raise Ticket" && newApartmentCount > 0 && (
          <span className="badge bg-danger">{newApartmentCount}</span>
        )} */}
        {tab === "Grocery Items" && newGroceryCount > 0 && (
          <span className="badge bg-danger">{newGroceryCount}</span>
        )}
        {/* {tab === "Delivery Partner Directory" && newDeliveryCount > 0 && (
          <span className="badge bg-danger">{newDeliveryCount}</span> 
        )} */}
        {tab === "Lakshmi Collections" && newCollectionCount > 0 && (
          <span className="badge bg-danger">{newCollectionCount}</span>
        )}
      </div>
    ))}
  </div>
) : (
  <div className="tabs d-flex">
    {["Raise Ticket",  "Book Technician", "Buy Products", "Grocery Items", "Lakshmi Collections"
    // "Technician Get Quote", "Dealer Get Quote", "Raise Ticket Orders", "Lakshmi Collections", "Delivery Partner Directory"
    //  "Buy Product Closed Orders", "Apartment Raise Ticket"
    ].map((tab) => (
      <span
        key={tab}
        className={`tab-item ${activeTab === tab ? "active" : ""} 
          ${tab === "Raise Ticket" && glowTicket ? "glow" : ""} 
          ${tab === "Book Technician" && glowTechnician ? "glow" : ""} 
          ${tab === "Buy Products" && glowProduct ? "glow" : ""} 
          ${tab === "Grocery Items" && glowGrocery ? "glow" : ""}
          ${tab === "Lakshmi Collections" && glowCollection? "glow" : ""}
          `}
          // ${tab === "Technician Get Quote" && glowQuote ? "glow" : ""} 
          // ${tab === "Dealer Get Quote" && glowDealer ? "glow" : ""} 
          // ${tab === "Raise Ticket Orders" && glowOrder ? "glow" : ""}
          // ${tab === "Buy Product Closed Orders" && glowClosed ? "glow" : ""} 
          // ${tab === "Apartment Raise Ticket" && glowApartment ? "glow" : ""} 
          // ${tab === "Delivery Partner Directory" && glowDelivery ? "glow" : ""}

        onClick={() => handleTabClick(tab)}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        {tab}{" "}
        {tab === "Raise Ticket" && newTicketCount > 0 && (
          <span className="badge bg-danger">{newTicketCount}</span>
        )}
        {/* {tab === "Technician Get Quote" && newQuoteCount > 0 && (
          <span className="badge bg-danger">{newQuoteCount}</span>
        )}
        {tab === "Dealer Get Quote" && newDealerCount > 0 && (
          <span className="badge bg-danger">{newDealerCount}</span>
        )}
        {tab === "Raise Ticket Orders" && newOrderCount > 0 && (
          <span className="badge bg-danger">{newOrderCount}</span>
        )} */}
        {tab === "Book Technician" && newTechnicianCount > 0 && (
          <span className="badge bg-danger">{newTechnicianCount}</span>
        )}
        {tab === "Buy Products" && newProductCount > 0 && (
          <span className="badge bg-danger">{newProductCount}</span>
        )}
         {tab === "Grocery Items" && newGroceryCount > 0 && (
          <span className="badge bg-danger">{newGroceryCount}</span>
        )}
        {/* {tab === "Delivery Partner Directory" && newDeliveryCount > 0 && (
          <span className="badge bg-danger">{newDeliveryCount}</span>
        )} */}
         {tab === "Lakshmi Collections" && newCollectionCount > 0 && (
          <span className="badge bg-danger">{newCollectionCount}</span>
        )}
         {/* {tab === "Buy Product Closed Orders" && newClosedCount > 0 && (
          <span className="badge bg-danger">{newClosedCount}</span>
        )}
        {tab === "Apartment Raise Ticket" && newApartmentCount > 0 && (
          <span className="badge bg-danger">{newApartmentCount}</span>
        )} */}
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
          {/* <div>
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
          </div> */}
          <div>
{activeTab === "Book Technician" && (
            <>
              <NotificationsList
                notifications={technicianNotifications}
                highlightedItem={highlightedTechnician}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/bookTechnicianNotificationGrid`);
                  handleClearTechnicianNotifications();
                }} 
                style={{ cursor: "pointer" }}
              >
                View All Notifications
              </div>
            </>
          )}
          </div>
          <div>
          {activeTab === "Buy Products" && (
            <>
              <NotificationsList
                notifications={productNotifications}
                highlightedItem={highlightedProduct}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/buyProductNotificationGrid`);
                  handleClearProductNotifications();
                }} 
                style={{ cursor: "pointer" }}
              >
                View All Notifications
              </div>
            </>
          )}
          </div>
          {/* <div>
          {activeTab === "Buy Product Closed Orders" && (
            <>
              <NotificationsList
                notifications={closedProductNotifications}
                highlightedItem={highlightedClosed}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/buyProductClosedOrdersGrid`);
                  handleClearClosedNotifications();
                }} 
                style={{ cursor: "pointer" }}
              >
                View All Notifications
              </div>
            </>
          )}
          </div> 
           <div>
          {activeTab === "Apartment Raise Ticket" && (
            <>
              <NotificationsList
                notifications={apartmentNotifications}  
                highlightedItem={highlightedApartment}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/apartmentNotificationGrid`);
                  handleClearApartmentNotifications();
                }}
                style={{ cursor: "pointer" }}
              > 
                View All Notifications
              </div>
            </>
          )}
          </div> */}
          <div>
          {activeTab === "Grocery Items" && (
            <>
              <NotificationsList
                notifications={groceryNotifications}
                highlightedItem={highlightedGrocery}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                   navigate(`/groceryItemsNotificationGrid`);
                  handleClearGroceryNotifications();
                }}
                style={{ cursor: "pointer" }}
              > 
                View All Notifications
              </div>
            </>
          )}
          </div>

          {/* <div>
          {activeTab === "Delivery Partner Directory" && (
            <>
              <NotificationsList
                notifications={deliveryNotifications}
                highlightedItem={highlightedDelivery}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                  navigate(`/deliveryPartnerDirectory`);
                  handleClearDeliveryNotifications();
                }}
                style={{ cursor: "pointer" }}
              > 
                View All Notifications
              </div>
            </>
          )}
          </div>
           */}
          <div>
          {activeTab === "Lakshmi Collections" && (
            <>
              <NotificationsList
                notifications={collectionNotifications}
                highlightedItem={highlightedCollection}
              />
              <div
                className="view-notifications text-info mx-2"
                onClick={() => {
                 navigate(`/lakshmiCollectionsNotificationGrid`);
                 handleClearCollectionNotifications();
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
        </>  
  );
}; 

export default Notification;