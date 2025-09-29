import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Modal, Button} from 'react-bootstrap';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import NotificationBell from "./NotificationsBell";
// import OrdersNotificationBell from "./OrdersBellNotifications";
// import TrackStatusNotificationBell from "./TrackStatusBellNotifications";
import axios from "axios";    
import Footer from './Footer.js';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RouteIcon from "@mui/icons-material/Route";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import AddToCartCount from "./AddToCartCount.js";
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';  
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
// import Banner1 from './img/Ads1.jpeg';
import BannerVideo from './img/Dusshera.mp4';
// import BannerVideo from './img/AdsVideo.mp4';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';    
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import Banner3 from './img/banner-4.jpg'; 
// import Banner2 from './img/Ads2.jpeg';
import { useNavigate, useParams } from "react-router-dom"; 
import Logo from "./img/Hm_Logo 1.png";
// import SearchIcon from "@mui/icons-material/Search";
// import ArticleIcon from '@mui/icons-material/Article';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MenuIcon from '@mui/icons-material/Menu';
import Electrical from './img/Electrical.jpeg';
import Electronics from './img/Electronics.jpeg';
import Plumbing from './img/Plumbing.jpeg';
import Hardware from './img/Hardware.jpeg';
import HomeDecor from './img/HomeDecor.jpeg';
import BabyKidsImg from './img/BabyKids.jpeg';
import FamilyPackImg from './img/FamilyPack.jpeg';
import PersonalCareImg from './img/PersonalCare.jpeg';
import SnacksImg from './img/Snacks.jpeg';
import StaplesImg from './img/Staples.jpeg';
import HouseHoldImg from './img/HouseHold.jpeg';
import setkurti from './img/3pcsset.jpeg';
import kurti from './img/2pcsset.jpeg';
import { CartStorage } from "./CartStorage";
const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName, isMobile) => {
  const iconSize = isMobile ? 20  : 40;
  const customer = [
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
    }] : []),
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
    //   ...(!isMobile ? [{MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: isMobile ? "Track Ticket" : "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`
    // }] : []),
    //   ...(!isMobile ? [{MenuIcon: <NotificationBell sx={{ fontSize: 40 }} />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}`
    // }] : []),
    //  ...(!isMobile ? [{MenuIcon: <OrdersNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}`
    // }] : []),
    ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
    }] : []),
    ...(!isMobile ? [{MenuIcon: <DeliveryDiningIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Delivery Partner", TargetUrl: `/deliveryPartner/${userType}/${userId}`
    }] : []),
      ];

      const admin = [
      // { MenuIcon: <ShoppingCartIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Lakshmi Mart", TargetUrl: `/groceryIcons/${userType}/${userId}`},
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
    }] : []),
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
    //   ...(!isMobile ? [{MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: isMobile ? "Track Ticket" : "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`
    // }] : []),
    //   ...(!isMobile ? [{MenuIcon: <NotificationBell sx={{ fontSize: 40 }} />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}`
    // }] : []),
    //  ...(!isMobile ? [{MenuIcon: <OrdersNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}`
    // }] : []),
    ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
    }] : []),
    ...(!isMobile ? [{MenuIcon: <DeliveryDiningIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Delivery Partner", TargetUrl: `/deliveryPartner/${userType}/${userId}`
    }] : []),
      ];

  const builder = [
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Member" },
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote" },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications" },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: "/BuyProducts" },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account" },
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: "/TicketRaise" },
      { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status" }
  ];
 
  const dealer = [
      { MenuIcon: <UploadIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Upload Products" },
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote" },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account" },
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
  ];

  const trader = [
    { MenuIcon: <UploadIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Upload Products" },
    { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote"},
    { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
    { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
    { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account" },
    { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account"},
    { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
    { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
];

  const technician = [
      { MenuIcon: <PersonAddAltIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Technician"},
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote", TargetUrl: `/notificationTechnician/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications" ,TargetUrl:`/technicianDetailsNotifications/${userType}/${userId}/${category}/${ZipCode}/${technicianFullName}`},
      { MenuIcon: <TransferWithinAStationIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Technician" },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account"},
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status" }
  ]; 
     switch (userType) {
      case "builder":
          return builder;
      case "dealer":
          return dealer;
      case "trader":
          return trader;
      case "technician":
          return technician;
      case "customer":
       return customer; 
      case "admin":
          return admin; 
      default:
          return []; 
  }
};
const categories = [
{ label: 'Home Decors', value: 'Home Decors', image: HomeDecor },          
{ label: 'Electrical Items', value: 'Electrical items', image: Electrical }, 
{ label: 'Electronics Appliances', value: 'Electronics appliances', image: Electronics },   
{ label: 'Plumbing & Sanitary', value: 'Sanitary items', image: Plumbing },         
{ label: 'Hardware Items', value: 'Hardware items', image: Hardware },      
];

const groceryCategories = [
  { label: 'Staples & Grains', value: 'Staples & Grains', image: StaplesImg },
  { label: 'Snacks & Foods', value: 'Snacks & Branded Foods', image: SnacksImg },
  { label: 'Home Needs', value: 'Home Needs', image: HouseHoldImg },
  { label: 'Personal Care', value: 'Personal Care', image: PersonalCareImg },
  { label: 'Baby Products', value: 'Baby Products', image: BabyKidsImg },
  { label: 'Family Pack', value: 'Family Pack', image: FamilyPackImg },
];

const collectionsCategories = [
  { label: 'Dupatta Sets', value: 'Dupatta Sets', image: setkurti },
  { label: 'Kurta Sets', value: 'Kurta Sets', image: kurti},
  ];

const ProfilePage = () => {
  const navigate = useNavigate();
  const {userId} = useParams();
    const {userType} = useParams();
    const [category, setCategory] = useState('');
    const [fullName, setFullName] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true); 
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const menuRef = useRef(null);
    const ticketScrollRef = useRef(null);  
   const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
     const videoRef = useRef(null);
const [isMuted] = useState(true);
// const [isMuted, setIsMuted] = useState(true);
const [unreadCount, setUnreadCount] = useState(0);
const [messageCounts, setMessageCounts] = useState({
  news:     0,
  buysell:  0,
  tolet:    0  
});    
const [grocery, setGrocery] = useState([]);
const [cartSummary, setCartSummary] = useState({
  items: 0,
  total: 0,
  products: [],
}); 
const [dress] = useState([]);
// const [dress, setDress] = useState([]);
  const [deliveryProfile, setDeliveryProfile] = useState(null);
const [showInterestModal, setShowInterestModal] = useState(false);
const [showNotificationModal, setShowNotificationModal] = useState(false);
const [selectedOption, setSelectedOption] = useState("");
const [groceryData, setGroceryData] = useState([]);
const [state, setState] = useState("");
const [address, setAddress] = useState("");  
const [district, setDistrict] = useState("");
const [zipCode, setZipCode] = useState("");
const [mobileNumber, setMobileNumber] = useState('');
const [status, setStatus] = useState('');  
const [id, setId] = useState('');
const [pinCode, setPinCode] = useState("");
const [martId, setMartId] = useState('');
const [paymentMode, setPaymentMode] = useState('');
const clickLock = useRef(false);
const [isRegistered, setIsRegistered] = useState(false);
const [partnerStatus, setPartnerStatus] = useState("");
const [isPickup] = useState(false);
// const [isPickup, setIsPickup] = useState(false);
const [cartData, setCartData] = useState(null);
const [transactionDetails, setTransactionDetails] = useState('');
const [transactionStatus, setTransactionStatus] = useState('');
const [longitude, setLongitude] = useState('');
const [latitude, setLatitude] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [date, setDate] = useState('');
// const [customerId, setCustomerId] = useState('');
const [grandTotal, setGrandTotal] = useState('');
const [items, setItems] = useState('');
const [assignedTo, setAssignedTo] = useState('');
const [deliveryPartnerUserId, setDeliveryPartnerUserId] = useState('');
// const [customerName, setCustomerName] = useState('');
const [totalItemsSelected, setTotalItemsSelected] = useState('');
const [transactionNumber, setTransactionNumber] = useState('');
const [city, setCity] = useState('');

useEffect(() => {
  console.log( items, grocery,error, unreadCount, showMenu, products, selectedCategory, dress);
}, [ items, grocery, error,unreadCount, showMenu, products, selectedCategory, dress]);
 
// useEffect(() => {
//   console.log(address, state, district, mobileNumber, pinCode, martId, paymentMode, status)
// })

useEffect(() => {
  const fetchDeliveryData = async () => {
    try { 
      const response = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch grocery product data");
      }
      const data = await response.json();
      console.log("Fetched Grocery Data:", data);
      setCartData(data);
      // setCustomerId(data.userId);
      setId(data.id);
      setMartId(data.martId);
      setDate(data.date);
      // setCustomerName(data.customerName);
      setMobileNumber(data.customerPhoneNumber);
      setAddress(data.address);
      setState(data.state);
      setCity(data.district);
      // console.log(district);
      setPinCode(data.zipCode);
      setPaymentMode(data.paymentMode);
      setTransactionDetails(data.utrTransactionNumber);
      setLongitude(data.longitude);
      setLatitude(data.latitude);
      setGrandTotal(data.grandTotal);
      setPaymentMode(data.paymentMode);
      setTotalItemsSelected(data.totalItemsSelected);
      setTransactionStatus(data.transactionStatus);
      // setTransactionType(data.transactionType);
      setPaidAmount(data.paidAmount);
      setTransactionNumber(data.transactionNumber);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setTotalItemsSelected(data.totalItemsSelected);
      setDeliveryPartnerUserId(data.deliveryPartnerUserId);
      setAssignedTo(data.assignedTo);

      if (data.categories && Array.isArray(data.categories)) {
        let allProducts = [];
        data.categories.forEach((cat) => {
          cat.products.forEach((p, idx) => {
            allProducts.push({
              serial: allProducts.length + 1,
              name: p.productName,
              category: cat.categoryName,
              mrp: p.mrp,
              discount: p.discount,
              afterDiscountPrice: p.afterDiscountPrice,
              quantity: p.noOfQuantity,
              total: p.afterDiscountPrice * p.noOfQuantity,
            });
          });
        });
        setItems(allProducts);
      }
    } catch (error) {
      console.error("Error fetching grocery product data:", error);
    } finally {
      setLoading(false);
    }
  };
  if (id) {
    fetchDeliveryData();
  }
}, [id]);
 useEffect(() => {
  const fetchGroceryData = async () => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/GetMartTicketsByUserId?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch ticket data');
      const data = await response.json();
      const tickets = Array.isArray(data) ? data
                    : (data && typeof data === "object" ? [data] : []);
      setGroceryData(tickets);
      const first = tickets[0] || {};
      setMartId(first.martId || "");
      setState(first.state || "");
      setDistrict(first.district);
      setPinCode(first.zipCode || first.pinCode || "");
      setAddress(first.address || "");
      setId(first.id || "");
      setPaymentMode(first.paymentMode || "");
      setStatus(first.status || "");
      setFullName(first.customerName || "");
      setMobileNumber(first.customerPhoneNumber || "");
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      setGroceryData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchGroceryData();
}, [userId]);

  useEffect(() => {            
    console.log(deliveryProfile);
  }, [deliveryProfile]);


const handleDeliveryPartnerClick = async () => {
  if (clickLock.current) return;
  clickLock.current = true;
  try {
    const res = await axios.get(
      `https://handymanapiv2.azurewebsites.net/api/DeliveryPartner/GetDeliveryPartnerDetailsByUserId?userId=${userId}`
    );
    const raw = res?.data ?? null;

    const profile = Array.isArray(raw)
      ? (raw.length > 0 ? raw[0] : null)
      : (raw && typeof raw === "object" && Object.keys(raw).length > 0 ? raw : null);

    setDeliveryProfile(profile);

    const reg = profile?.isRegistered === true;
    const st = (profile?.status || "").toLowerCase();

    setIsRegistered(reg);
    setPartnerStatus(st);

    if (reg) {
      setShowNotificationModal(true); // modal opens
    } else {
      setShowInterestModal(true);
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
    setShowInterestModal(true);
  } finally {
    setTimeout(() => { clickLock.current = false; }, 200);
  }
};

const handleConfirmInterest = () => {
  if (selectedOption === "yes") {
    setShowInterestModal(false);
    navigate(`/deliveryPartner/${userType}/${userId}`);
  } else {
    setShowInterestModal(false);
  }
};

useEffect(() => {
  const summary = CartStorage.grandSummary();
  setCartSummary(summary);
}, []);

useEffect(() => {
  const updateCartSummary = () => {
    const savedCategories = JSON.parse(localStorage.getItem("allCategories")) || [];
    let items = 0, total = 0, products = [];

    savedCategories.forEach((cat) => {
      cat.products.forEach((p) => {
        if (Number(p.qty) > 0) {
          items += Number(p.qty);
          const afterDiscountPrice = Number(
            p.afterDiscountPrice || p.price || p.finalPrice || 0
          );
          total += afterDiscountPrice * Number(p.qty);

          products.push({
            id: p.productId || p.id, 
            productName: p.productName || p.name || "", 
            image: p.image || p.img || "", 
            mrp: Number(p.mrp) || Number(p.mrpPrice) || 0,
            discount: Number(p.discount) || Number(p.discountPercent) || 0,
            afterDiscountPrice,
            qty: Number(p.qty),
            category: cat.categoryName,
          });
        }
      });
    });
    setCartSummary({ items, total, products });
    console.log("cartSummary:", { items, total, products });
  };
  updateCartSummary();
  window.addEventListener("storage", updateCartSummary);
  return () => window.removeEventListener("storage", updateCartSummary);
}, []);

const handleUpdatePaymentMethod = async () => {
    try {
  const payload = {
    ...cartData,
    customerName: fullName,
    address: address, 
    state: state,
    district: city,
    zipCode: pinCode,
    customerPhoneNumber: mobileNumber,
    id: id,
    userId: userId, 
    martId: martId,
    date: date,
    grandTotal: grandTotal,
    totalItemsSelected: totalItemsSelected,
    status: status,
    paymentMode: paymentMode,
    utrTransactionNumber: transactionDetails,
    transactionNumber: transactionNumber,
    transactionStatus: transactionStatus,
    paidAmount: paidAmount,
    AssignedTo: assignedTo,
    DeliveryPartnerUserId: deliveryPartnerUserId,
    latitude: latitude,
    longitude: longitude,
    isPickUp: isPickup,
    isDelivered: false,    
  };

    let response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to Update Technician.');
    }
    window.location.href = `/deliveryTracking/${id}`;
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to Update Technician. Please try again later.');
  }
};

useEffect(() => {    
  const storedCounts = localStorage.getItem("chatCounts");
  if (storedCounts) {
    try { 
      const parsedCounts = JSON.parse(storedCounts);
      setMessageCounts(parsedCounts); 
    } catch (err) {
      console.error("Error parsing stored counts:", err);
    }
  }
}, []);

const totalUnreadMessages = messageCounts.news + messageCounts.buysell + messageCounts.tolet;

  // const toggleMute = () => {
  //   const video = videoRef.current;
  //   if (video) {
  //     video.muted = !isMuted; 
  //     setIsMuted(!isMuted);
  //   }
  // };

  useEffect(() => {
  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessages`);
      const data = await response.json();
      const lastReadTime = localStorage.getItem('lastReadTime');
      const unreadMessages = data.filter(msg => {
        return !lastReadTime || new Date(msg.dateTime) > new Date(lastReadTime);
      });
      setUnreadCount(unreadMessages.length);         
    } catch (error) {
      console.error("Failed to fetch unread message count:", error);
    }
  };
  if (userId && userType) {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }
}, [userId, userType]);

const handleCategoryClick = async (category) => {
  const { value } = category; 
  try {
    setSelectedCategory(category);
    setProducts([]);
    setError("");
    const encodedCategory = encodeURIComponent(value);
    localStorage.setItem("encodedCategory", encodedCategory);
    navigate(`/offers/${userType}/${userId}`, {
      state: { encodedCategory }, 
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    setProducts([]);
    setError(`Oops! No products found for ${value} category.`);
  }
};

const handleGroceryCategoryClick = async (category) => {
  const { value } = category;
   if (value === "Family Pack") {
    console.log("Family Pack clicked - navigation blocked");
    setSelectedCategory(category); 
    return;
  }
  try {
    setSelectedCategory(category);
    setGrocery([]);
    setError("");
    const encodedCategory = encodeURIComponent(value);
    localStorage.setItem("encodedCategory", encodedCategory);
    navigate(`/grocery/${userType}/${userId}`, {
      state: { encodedCategory },  
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    setGrocery([]);
    setError(`Oops! No grocery items found for ${value} category.`);
  }
};

// const handleDressCategoryClick = async (category) => {
//   const { value } = category;
//   try {
//     setSelectedCategory(category);
//     setDress([]);
//     setError("");
//     const encodedCategory = encodeURIComponent(value);
//     localStorage.setItem("encodedCategory", encodedCategory);
//     navigate(`/lakshmiCollections/${userType}/${userId}`, {
//       state: { encodedCategory },  
//     });
//   } catch (error) {
//     console.error("Error fetching collections:", error);
//     setGrocery([]);
//     setError(`Oops! No collections found for ${value} category.`);
//   }
// };    
        useEffect(() => {
          const fetchAllTickets = async () => {
            try { 
              const [ticketResponse, productResponse, technicianResponse, groceriesResponse] = await Promise.all([
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=raiseTicket`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=buyProduct`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=bookTechnician`),
                fetch(``),
              ]);
              if (!ticketResponse.ok || !productResponse.ok || !technicianResponse || !groceriesResponse) {
                throw new Error("Failed to fetch ticket, product and technician data");
              }
              const ticketData = await ticketResponse.json();
              const productData = await productResponse.json();
              const technicianData = await technicianResponse.json(); 
              const groceryData = await groceriesResponse.json(); 
              setAllTickets([...ticketData, ...productData, ...technicianData, ...groceryData]);
            } catch (error) {
              console.error("Error fetching ticket, product and technician data:", error);
            } finally {
              setLoading(false);
            }
          };
          fetchAllTickets();
        }, [userId]);
      
        useEffect(() => {
          if (profile?.mobileNumber) {
            localStorage.setItem('mobileNumber', profile.mobileNumber);
          }
        }, [profile]);        

  const handleMoreIconClick = () => {
    setShowProfile(!showProfile);
  };

      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (!document.getElementById("dropdown-container")?.contains(event.target)) {
            // setShowDropdown(false);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }, []);

      useEffect(() => { 
        const handleCloseMenuOnClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
          }
        };
        document.addEventListener("mousedown", handleCloseMenuOnClickOutside);
        return () => document.removeEventListener("mousedown", handleCloseMenuOnClickOutside);
      }, []);
            
      useEffect(() => {
        if (!userId || !userType) return;
        const fetchProfileData = async () => {
          try {
            let apiUrl = "";
            if (userType === "customer") {
            
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`;
            }
              else if (userType === "admin") {
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`;
              }
                           else if (userType === "technician") {
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/technician/technicianProfileData?profileType=${userType}&UserId=${userId}`;
            } else if (userType === "dealer") {
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/dealer/dealerProfileData?profileType=${userType}&UserId=${userId}`;
            }
            if (!apiUrl) return;
            const response = await axios.get(apiUrl);
            setProfile(response.data); 
            setCategory(response.data.category);
            setDistrict(response.data.district);
            setZipCode(response.data.zipCode);
            setFullName(response.data.fullName);
            if (response.data.photoAttachmentId) {
              fetchImageUrl(response.data.photoAttachmentId);
            }
              setMenuList(getMenuList(userType, userId, response.data.category, response.data.district, response.data.zipCode, response.data.fullName, isMobile));
          } catch (error) {
            console.log("Error Fetching Data:", error)
          } finally {
            setLoading(false);
          }
        };
        fetchProfileData();
      }, [userType, userId, isMobile]);
      
      useEffect(() => {
        if (category && district) {
          setMenuList(getMenuList(userType, userId, category, district, zipCode, fullName, isMobile));
        }
      }, [category, district, userType, userId, zipCode, fullName, isMobile]);

const fetchImageUrl = async (photoId) => {
  try { 
    if (!photoId) return;
    const response = await axios.get(
      `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photoId}`
    );
    if (response.status === 200 && response.data.imageData) {
      const imageUrl = `data:image/jpeg;base64,${response.data.imageData}`;
      setProfileImage(imageUrl);
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
  
  if (loading) {
    return 
  }

  return (
    <>
    <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm" 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1000 }}>
       {isMobile ? (
          <div onClick={handleMoreIconClick} style={{ cursor: "pointer" }}>
          <MenuIcon className="floating-menuIcon" fontSize="medium" />
        </div>
       ) : (null)}
       <img src={Logo} alt="Handy Man Logo" className="logo-img" />
        <div className="spacer"></div>
        <div className="d-flex align-items-center w-100">
      {/* {!isMobile && (
        <div className="srch_dv flex-grow-1 position-relative">
          <input type="text" className="form-control src_input" placeholder="Search / Ask a question" />
          <SearchIcon
            className="position-absolute search-icon"
          />
        </div>
      )} */}
    </div>
        <div className="hdr_icns d-flex align-items-center ">
      <div id="dropdown-container" className="dropdown-container" style={{ position: "relative" }}>
       {/* {isMobile && ( */}
        <div className="d-flex align-items-center">
          {/* Fixed Chat Icon at bottom right */}
            <div
          className="blinking-icon"
          style={{
            backgroundColor: '#03c03cb3',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            position: 'relative', 
          }}
          onClick={() => navigate(`/chatPage/${userType}/${userId}`)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnnouncementIcon style={{ color: 'white', fontSize: '28px' }} />  
          </div>

          {totalUnreadMessages > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {totalUnreadMessages}
            </span>
          )}
        </div>

  {/* Profile Image */}
  {/* <div className="profile-img-wrapper">
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
      // style={{ width: "40px", height: "40px", borderRadius: "10%", objectFit: "cover" }}
    />
  </div> */}
  <div className="profile-img-wrapper">
  {/* <a href="tel:+916281198953">    */}
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
      style={{ width: "40px", height: "40px", borderRadius: "20%", objectFit: "cover", cursor: "pointer" }}
    />
  {/* </a> */}
</div>
</div>
{/* )} */}
</div>
    </div>
    </header>
  {/* <div className="d-flex align-items-center" onClick={() => navigate(`/customerNotification/${userType}/${userId}`)} style={{ cursor: "pointer" }}>
  <NotificationBell fontSize="medium" />
</div> */}
{/* <div
  className="d-flex align-items-center"
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}
>
  <div style={{ position: "relative", display: "inline-block" }}>
    <OrdersNotificationBell fontSize="medium" />
  </div>
</div> */}
{/* <div
  style={{backgroundColor: 'transparent',  display: 'inline-flex', 
    alignItems: 'center', justifyContent: 'center',
  }}
>
  <AddToCartCount style={{ fontSize: 40, color: 'black', }} />
</div> */}
{/* <div
  className="d-flex align-items-center"
  style={{ cursor: "pointer" }}
  // onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}
>
</div> */}


{/* <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}>
                      <OrdersNotificationBell sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "13px", fontFamily: "Poppins", lineHeight: "28px" }}>My Orders</small>
                    </div> */}

       {/* {showDropdown && (
        <div className="dropdown-menu">                   
          <div className="dropdown-content">
            <div className="dropdown-item">
              <span className="settings-title">Settings</span>
                      <a href="/user-settings" role="button" className="settings-link">User Settings</a>
            </div>
            <div className="dropdown-item logout" onClick={() => console.log("Logging out...")}>
              <span className="logout-icon"><LogoutIcon /></span>
              <span>Logout</span>
            </div>
          </div>
        </div>
       )} */}
      <div className="pt-1 mt-100"> 
    <div
      className={`container m-1`}
      style={{
        padding: isMobile ? "8px" : "0px",
        borderRadius: "5px",
        minHeight: "100vh",
        paddingTop:isMobile ? "70px" : "0px"
      }}
    >
      <div className="row">
        <div className="col-md-3">
        <div>
          {/* Desktop Profile Details */}
      {!isMobile ? (
                   <div className="profile-card">
                     <div className="profile-img-container "> 
                   <div className="profile-container"> 
             <div className="profile-info">
               <div className="webprofile-section">
               <div className="text-primary fw-bold cust-name">Welcome  <small className="text-dark" style={{fontFamily: "Poppins, sans-serif"}}>{profile.fullName}{" "}</small></div>
                   <div className="fw-bold fs-4">Lakshmi Sai Service Providers</div>
                   {/* <div className="text-warning fs-3 mt-0">{profile.userProfileType}</div> */}
                   <div className="webprofile-img-wrapper">
                     <img src={profileImage} alt="Profile" 
                     className="webprofile-img" 
                     />
                     <input
                       type="file"
                       ref={fileInputRef}
                       style={{ display: "none" }}
                       accept="image/*"
                     />
                    </div>
                 <div className="label fw-bold fs-5">Name</div>
                   <p className="value">
                     {profile.fullName}
                   </p>
                  <hr />
                 <div className="label fw-bold mt-0 fs-5">Mobile</div>
                 <p className="value">{profile.mobileNumber}</p>
              <hr />
                 <div className="label fw-bold mt-0 fs-5">Address</div>
                 <p className="value">{profile.address}</p>
               <hr />
               <p className="logout-btn m-1" onClick={() => window.location.href = "/loginnew"}>
                 <LogoutIcon />
                 <span className="fs-5">Logout</span>
               </p>
             </div>
           </div>
           </div>
           </div>
                   </div>
      ) : null}
            </div> 
          {/* Mobile Profile Details */}
           {showProfile && !showInterestModal && !showNotificationModal && (
              <div
                className="floating-profile-menu"
                style={{
                  position: 'fixed',
                  top: '60px',
                  left: '10px',
                  backgroundColor: '#fff',
                  zIndex: 1200,
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                  padding: '10px',
                  width: '180px'
                }}
              >
                <div className="profile-info">
                  <div className="fw-bold">Name</div>
                  <p className="mb-2">{profile.fullName}</p>
                  <hr style={{ margin: '8px 0' }} />
                  <div className="fw-bold">Mobile</div>
                  <p className="mb-2">{profile.mobileNumber}</p>
                  <hr style={{ margin: '8px 0' }} />
                  <div className="fw-bold">Address</div>
                  <p className="mb-2">{profile.address}</p>
                  <hr style={{ margin: '8px 0' }} />
                     <div
                      className="d-flex align-items-start"
                      style={{ cursor: "pointer" }}
                      onClick={handleDeliveryPartnerClick}
                    >
                      <DeliveryDiningIcon sx={{ fontSize: 24, marginRight: "4px" }} />
                      <small
                        style={{
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          lineHeight: "28px",
                        }}
                      >
                        Delivery Partner
                      </small>
                    </div>
                    <hr style={{ margin: '8px 0' }} />
                    <div className="d-flex align-items-start" style={{ cursor: "pointer" }} onClick={() => document.getElementById('myTicketsSection')?.scrollIntoView({ behavior: 'smooth' })}>
                      <ConfirmationNumberIcon sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "12px", fontFamily: "Poppins", lineHeight: "28px" }}>My Tickets</small>
                    </div>
                    <hr style={{ margin: '8px 0' }} />
                  <div className="d-flex align-items-center logout-btn" style={{ cursor: 'pointer' }} onClick={() => window.location.href = "/loginnew"}>
                    <LogoutIcon className="me-2" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
         </div> 
       {/* Interest Modal */}
<Modal show={showInterestModal} onHide={() => setShowInterestModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Are you interested in joining as a delivery partner?</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="d-flex flex-column">
      <label>
        <input
          type="radio"
          name="interest"
          value="yes"
          checked={selectedOption === "yes"}
          onChange={(e) => setSelectedOption(e.target.value)}
        />{" "}
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="interest"
          value="no"
          checked={selectedOption === "no"}
          onChange={(e) => setSelectedOption(e.target.value)}
        />{" "}
        No
      </label>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowInterestModal(false)}>
      Cancel
    </Button>
    <Button
      variant="primary"
      onClick={handleConfirmInterest}
      disabled={!selectedOption}
    >
      Continue
    </Button>
  </Modal.Footer>
</Modal>

{/* Notification Modal */}
<Modal
  show={showNotificationModal}
  onHide={() => setShowNotificationModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Notification</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {isRegistered && partnerStatus === "open" ? (
      loading ? (
        <p>Loading tickets…</p>
      ) : groceryData.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="notification-list">
          {groceryData.map((t) => (
            <div key={t.id || t.martId} className="notification-item mb-3 p-2 border rounded">
              <div className="notification-header">
                <strong>Grocery ID: </strong> {t.martId}
              </div>
              <div>
                <strong>Customer Name:</strong> {t.customerName}
              </div>
              <div>
                <strong>Address:</strong>{" "}
                {[t.address, t.district, t.state, (t.zipCode || t.pinCode), t.customerPhoneNumber]
                  .filter(Boolean)
                  .join(", ")}
              </div>
              <div className="notification-date">
                <strong>Payment Mode:</strong> {t.paymentMode}
              </div>
              {t.status && (
                <div>
                  <strong>Status:</strong> {t.status}
                </div>
              )}

              {/* ✅ IsPickup checkbox for this ticket */}
              <div className="form-check mt-2">
                <input
                  id={`isPickup-${t.id || t.martId}`}
                  className="form-check-input border-dark"
                  type="checkbox"
                  checked={!!t.isPickup}
                  onChange={(e) => {
                    const updated = groceryData.map((g) =>
                      g.id === t.id || g.martId === t.martId
                        ? { ...g, isPickup: e.target.checked }
                        : g
                    );
                    setGroceryData(updated);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`isPickup-${t.id || t.martId}`}
                >
                  Is Pickup
                </label>
              </div>

              {/* Go to Maps */}
              {t.isPickup && t.latitude && t.longitude && (
                <div className="mt-1 text-end">
                  <a
                    href={`/deliveryTracking/${t.id}?lat=${t.latitude}&lng=${t.longitude}&isPickup=true`}
                    className="link-primary"
                    onClick={() => {
                      setShowNotificationModal(false);
                      handleUpdatePaymentMethod(t); 
                    }}
                  >
                    Go to Maps
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )
    ) : (
      <p>You are already registered, pending for admin approval.</p>
    )}
  </Modal.Body>
</Modal>

          {isMobile && (
            <div
              className="d-flex justify-content-between align-items-center px-2"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}
            >
              <div className="text-primary fw-bold fs-5 ">
                Welcome{' '}
                <small className="text-dark">
                  {profile.fullName}
                </small>
              </div>

              {/* <a
                href={`https://wa.me/?text=${encodeURIComponent("Check this service: https://handymanserviceproviders.com")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon style={{ color: "#25D366", fontSize: 30, margin: '5px' }} />
              </a> */}
            </div>
          )}

          {/* Mobile Dashboard Icons */}
          {isMobile && (
  <div
    className="mobile-top-icons position-fixed start-0 end-0 bg-white border-bottom shadow-sm"
    style={{
      top: '80px',
      zIndex: 1050,
      height: '90px',
      padding: '8px 10px',
      overflowY: 'hidden',
    }}
  >
    <div className="d-flex flex-wrap justify-content-around align-items-center">
      {menuList.map((menu, index) => (
        <a
          key={index}
          href={menu.TargetUrl}
          className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-dark ms-1"
          style={{ minWidth: '10px', flex: '0 0 auto' }}
        >
          <div
            style={{
              backgroundColor: '#ffc107', 
              borderRadius: '50%',        
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            {React.cloneElement(menu.MenuIcon, { sx: { fontSize: 22, color: '#000' } })}
          </div>
          <small
            style={{
              fontSize: '12px',
              fontFamily: "Roboto", 
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '14px',
              marginTop: '4px',
              color: '#333',
              letterSpacing: '0.5px',
            }}
          >
            {menu.MenuTitle.split(' ').map((word, idx) => (
              <React.Fragment key={idx}>
                {word}
                {idx !== menu.MenuTitle.split(' ').length - 1 && <br />}
              </React.Fragment>
            ))}
          </small>
        </a>
      ))}
    </div>
  </div>
)}

        {/* Address with Location */}
        <div className="col-md-9">

      {/* Carousel */}
              {/* <div className="container">
                <div className="mx-auto">
              <div
                id="productCarousel"
                className="carousel slide mb-4 rounded "
                data-bs-ride="carousel"
                data-bs-interval="6000"
              >
                {/* Indicators 
                <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3" 
                  ></button>
                   <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="3"
                    aria-label="Slide 4" 
                  ></button>
                </div>
                {/* Carousel items */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <video
                      ref={videoRef}
                      className="d-block w-100 rounded"
                      style={{ width: '90%', height: 'auto', objectFit: 'cover' }}
                      autoPlay
                      loop
                      playsInline
                      muted={isMuted}
                    >
                      <source src={BannerVideo} type="video/mp4" />
                    </video>
                    {/* <button
                      onClick={toggleMute}
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '10px',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                      aria-label="Toggle Mute"
                    >
                      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </button> */}
                </div>
                  {/* <div className="carousel-item active">
                  <img
                    src={Banner1}
                    className="d-block w-100 img-fluid rounded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Slide 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={Banner2}
                    className="d-block w-100 img-fluid rounded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Slide 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={Banner3}
                    className="d-block w-100 img-fluid rounded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Slide 3"
                  />
                </div> */}
              </div>
                {/* Controls 
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="prev">
                  <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="next">
                  <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              </div>
              </div> */}
    
<div className="container my-3">
  {/* Handyman Products Section */}
  <div className="shadow-lg p-3 mb-1 rounded-5 bg-transparent border-0">
    <h5 className="text-center fw-bold mb-3" style={{color: "#ff5722", fontSize: "18px"}}>Handyman Products</h5>
    <div className="row row-cols-3 row-cols-md-5 g-2 align-items-stretch">
      {categories.map((cat) => (
        <div
          className="col"
          key={cat.label}
          onClick={() => handleCategoryClick(cat)}
        >
          <div
            className="card border-0 shadow-sm text-center"
            style={{
              height: isMobile ? "120px" : "140px",
              width: isMobile ? "90px" : "120px",
              cursor: "pointer",
              padding: "10px",
              // backgroundColor: "#fafad2",
              marginTop: "5px",
            }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                // fontSize: "11px",
                // fontWeight: "500",
                // marginTop: "0px",
                fontSize: "11px",
                fontWeight: "500",
                marginTop: "5px",
                minHeight: "24px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              {cat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Grocery Categories Section */}
  <div className="shadow-lg p-3 rounded-5 mb-1 text-center bg-transparent border-0">
    <h5 className="fw-bold mb-3" style={{color: "#ff5722", fontSize: "15px"}}>
      Lakshmi Mart  
    </h5>
    <div className="row row-cols-3 row-cols-md-5 g-1">
  {groceryCategories.map((cat) => {
    const isFamilyPack = cat.value === "Family Pack";
    return (
      <div
        className="col"
        key={cat.label}
        onClick={() => !isFamilyPack && handleGroceryCategoryClick(cat)}
        style={{ cursor: isFamilyPack ? "not-allowed" : "pointer" }}     
      >
        <div
          className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
          style={{
            height: isMobile ? "120px" : "140px",
            width: isMobile ? "90px" : "120px",
            cursor: isFamilyPack ? "not-allowed" : "pointer",
            padding: "10px",
            margin: "5px",
            // backgroundColor: "#fafad2",
            opacity: isFamilyPack ? 0.5 : 1, 
            pointerEvents: isFamilyPack ? "auto" : "auto", 
          }}
        >
          <img
            src={cat.image}
            alt={cat.label}
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "8px",
              marginTop: "2px",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              marginTop: "5px",
              minHeight: "24px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            {cat.label}
          </span>
        </div>
      </div>
    );
  })}
</div>

    {/* <div className="row row-cols-3 row-cols-md-5 g-1">
      {groceryCategories.map((cat) => (
        <div className="col" key={cat.label} onClick={() => handleGroceryCategoryClick(cat)}>
          <div
            className="groceryIcon-card border-0 shadow-sm mt-2"
            style={{
              height: isMobile ? "100px" : "120px",
              width: isMobile ? "90px" : "120px",
              cursor: "pointer",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "8px",
                marginTop: "2px",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "500",
                marginBottom: "3px",
              }}
            >
              {cat.label}
            </span>
          </div>
        </div>
      ))}
    </div> */}
  </div>

{cartSummary.items > 0 && (
  <div
    style={{
      position: "fixed",
      bottom: "60px",
      left: 0,
      width: "100%",
      backgroundColor: "green",
      color: "white",
      padding: "12px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 2000,
      borderRadius: "20px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      🛒
      <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
        <span style={{ fontSize: "12px" }}>{cartSummary.items} items</span>
      <span style={{ fontSize: "12px" }}>₹{Math.round(cartSummary.total)}</span>
      </div>
    </div>

    <button
     type="button"
      className="text-white fw-bold d-flex align-items-center gap-1"
      style={{
        fontSize: "12px",
        cursor: "pointer",
        background: "transparent",
        border: "none",
      }}
      onClick={() => navigate(`/groceryCart/${userType}/${userId}`)}
    >
  View Cart →
  {/* ({cartSummary.items}) – ₹{Math.round(cartSummary.total)} */}
</button>
  </div> 
)}

   {/* Collections Section */}
  <div className="shadow-lg p-3 rounded-5 text-center bg-transparent border-0">
   <span
  // className="blinking-text"
  style={{
    background: "linear-gradient(45deg, #ff4081, #ff9800, #ff5722)",
    backgroundClip: "text",             
    WebkitBackgroundClip: "text",       
    color: "transparent",              
    WebkitTextFillColor: "transparent", 
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    display: "inline-block",            
  }}
>
  Lakshmi Collections Launching Soon....
</span>
    <div className="row row-cols-3 row-cols-md-5 g-2">
      {collectionsCategories.map((cat) => (
        <div className="col" key={cat.label} 
        // onClick={() => handleDressCategoryClick(cat)}
        //  onClick={() => navigate(`/lakshmiCollections/${userType}/${userId}`)}
        >
          <div
            className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
            style={{
              height: isMobile ? "120px" : "140px",
              width: isMobile ? "90px" : "120px",
              cursor: "pointer",
              padding: "10px",
              margin: "5px",
              // backgroundColor: "#fafad2",
            }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "8px",
                marginTop: "2px",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "500",
                marginBottom: "3px",
                marginTop: "5px",
                minHeight: "24px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              {cat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* <h4 style={{ color: '#ff5722', fontFamily: 'Poppins, sans-serif', fontWeight: 700,fontSize: '22px', textTransform: 'uppercase',
    letterSpacing: '1px', textAlign: 'center', marginBottom: '1px'}}>
   🎉 Top Deals For You! 🎉
</h4> */}
{/* Products Display */}
{/* <div className="product-scroll-wrapper " ref={productScrollRef}>
  {Object.entries(groupedProducts)
    .sort(([a], [b]) => (a === "Home Decors" ? -1 : b === "Home Decors" ? 1 : 0)) 
    .map(([categoryName, products]) => {
      const isExpanded = expandedCategories[categoryName];
      const filteredProducts = products.filter((product) => {
        const productName = product.productName?.toLowerCase().trim();
        const query = searchQuery.toLowerCase().trim();
        const normalize = (str) => (str.endsWith('s') ? str.slice(0, -1) : str);
        return (
          productName.includes(query) ||
          normalize(productName).includes(normalize(query))
        );
      });
      const sortedProducts = [...filteredProducts].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      const visibleProducts = isExpanded ? sortedProducts : sortedProducts.slice(0, 6);
      if (filteredProducts.length === 0) return null;

      return (
        <div key={categoryName} className="mt-0">
          <h5 className="mb-2 mt-3">{categoryName.toUpperCase()}</h5>
          <div className="product-row">
            {visibleProducts.map((product) => {
              const discountedPrice =
                product.rate && product.discount
                  ? (product.rate - (product.rate * product.discount) / 100).toFixed(0)
                  : product.rate;

              return (
                <>
                <div
                  key={product.id}
                  className="product-card me-2 mb-3"
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                 <div className="image-container">
                  {product.discount && (
                    <div className="discount-badge-wrapper">
                      <span className="discount-badge">{Math.round(product.discount)}%</span>
                    </div>
                  )}
                  {loadingStatus[product.id] ? (
                    <div className="image-placeholder m-1">Loading...</div>
                  ) : imageUrls[product.id]?.length > 0 ? (
                    <img
                      src={`data:image/jpeg;base64,${imageUrls[product.id][0].imageData}`}
                      className="product-image"
                      alt="product"
                    />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>

                  <div className="product-info">
                    <h6 className="product-name">{product.productName.toUpperCase()}</h6>
                    <div className="product-price">Rs {discountedPrice} /-</div>                   
                    </div>
                </div>
           </>
              );
            })}
          </div>

          {filteredProducts.length > 6 && (
  <div className="text-end">
    <Button                          
      variant="outline-primary"
      size="sm"
      onClick={() =>
        setExpandedCategories((prev) => ({
          ...prev, 
          [categoryName]: !prev[categoryName],
        }))
      }
    >
      {isExpanded ? 'Less' : 'More'}
    </Button>
  </div>
)}
        </div>
      );
    })}
</div> */}

 {/* Selected Product Display */} 
{/* {selectedProduct && (
  <div className="custom-modal-backdrop" onClick={() => setSelectedProduct(null)}>
     <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
       <button className="close-button" onClick={() => setSelectedProduct(null)}>&times;</button>
  <div className="d-flex flex-column align-items-center">
  <div style={{ width: '100%', maxWidth: '300px' }}>
    {loadingStatus[selectedProduct.id] ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '250px', background: '#f8f9fa' }}>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : imageUrls[selectedProduct.id]?.length > 0 ? (
      <Carousel>
        {imageUrls[selectedProduct.id].map((img, index) => (
          <Carousel.Item key={index}>
            <img
  src={`data:image/jpeg;base64,${img.imageData}`}
  className="card-img-top"
  style={{
    height: '230px',
    width: '100%',
    objectFit: 'contain',
  }}
  alt={`product-image-${index}`}
  onClick={() => handleImageClick(`data:image/jpeg;base64,${img.imageData}`)}
/>
          </Carousel.Item>
        ))}
      </Carousel>
    ) : (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '150px', background: '#f8f9fa' }}>
        No Image
      </div>
    )}
  </div>

  <div className="text-center mt-3">
    <h6 className=" fw-bold" style={{ fontFamily: "Rubik" }}>
      {selectedProduct.productName.toUpperCase()}
    </h6>
    <div className="small text-primary fw-bold">
      Rs {(selectedProduct.rate - (selectedProduct.rate * selectedProduct.discount) / 100).toFixed(0)} /-
    </div>
    <div className="small text-muted fw-bold" style={{ textDecoration: 'line-through' }}>
      MRP: Rs {selectedProduct.rate} /-
    </div>
    <div className="small text-danger fw-bold">
      Discount: {selectedProduct.discount}%
    </div>
   <div
  className="small fw-bold fs-6 text-start d-flex align-items-center"
  style={{
    color: '#7851a9',
    fontFamily: 'Italianno, cursive',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }}
>
  <LocalShippingIcon style={{ color: '#f88379', fontSize: '1rem' }} />
  <span className="ms-1">Free Delivery and Free Installation</span>
</div>
    <div className="fs-5">
      <span className="badge text-primary">✔️ Genuine Product</span>
      <span className="badge text-secondary">↩️ Easy Returns</span>
      <span className="badge text-success">💳 COD Available</span>
      <span className="badge text-danger">📦 Stock Left : {selectedProduct.numberOfStockAvailable} </span>
    </div>
    <button
      className="buy-now-btn"
      onClick={() => navigate(`/offersBuyProduct/${userType}/${userId}/${selectedProduct.id}`)}
    >
      Buy Now
    </button>
  </div>
</div>
</div>
</div>
)} */}

  {/* Dashboard Desktop */}
     {!isMobile ? (
  <>
    <h5 className="mb-2 fs-4">Dashboard</h5>
    <div className="row g-2">
      {menuList.map((menu, index) => (
        <div className="col-4" key={index}>
          {menu.MenuTitle === "Delivery Partner" ? (
            <div
              className="text-decoration-none"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={handleDeliveryPartnerClick}
            >
              <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center">
                <span className="material-symbols-outlined custom-icon" style={{ fontSize: "40px" }}>
                  {menu.MenuIcon}
                </span>
                <span className="fs-6">{menu.MenuTitle}</span>
              </div>
            </div>
          ) : (
            <a
              href={menu.TargetUrl}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                <span className="material-symbols-outlined custom-icon" style={{ fontSize: "40px" }}>
                  {menu.MenuIcon}
                </span>
                <span className="fs-6">{menu.MenuTitle}</span>
              </div>
            </a>
          )}
        </div>
      ))}
    </div>
  </>
) : null}

              {/* Tickets Section */}
              <div id="myTicketsSection" className="ticket-container">
                <div className="ticket-header">
                <h4 className="ticket-title">My Tickets</h4>
                </div>
      <div className="ticket-scroll" ref={ticketScrollRef}>
      {!loading && allTickets.length > 0 ? (
          allTickets.map((ticket, index) => (
            <div key={index} className={`ticket-card1 ${ticket.raiseTicketId ? "raise-ticket-bg" : ticket.buyProductId ? "buy-product-bg" : "book-technician-bg"}`}>
              <div className="ticket-content">
                <p><strong>{ticket.raiseTicketId ? "Raise TicketId": ticket.buyProductId? "Buy ProductId" : "Book TechnicianId"}:</strong> {ticket.raiseTicketId || ticket.buyProductId || ticket.bookTechnicianId}</p>
                <p><strong>{ticket.subject ? "Subject" : ticket.productName ? "Product Name" : "Job Description"}:</strong> {ticket.subject || ticket.productName || ticket.jobDescription}</p>
                <p><strong>Category:</strong> {ticket.category}</p>
                <p><strong>Status:</strong> 
                <span className={ticket.status.toLowerCase()}> {ticket.status}</span>
                </p> 
                <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
                <p><strong>Date:</strong> {ticket.date ? new Date(ticket.date).toLocaleDateString('en-GB') : "N/A"}</p>
                {ticket.paidAmount ? ( 
                    <>  
                      <p><strong>Paid Amount:</strong> {ticket.paidAmount}</p>
                    </>
                  ) : ( 
                    <p><strong>Paid Amount:</strong> Not Paid</p>
                  )}

                  {ticket.paidAmount && (
                    <>
                      {/* Only show these if payment is done */}
                      <p><strong>Transaction Status:</strong> {ticket.transactionStatus}</p>
                      <p><strong>Paid Date:</strong> {ticket.orderDate}</p>
                    </>
                  )}
                {/* <p><strong>Transaction Status:</strong> {ticket.transactionStatus}</p>
                <p><strong>Paid Amount:</strong> {ticket.paidAmount}</p>
                <p><strong>Paid Date: </strong> {ticket.orderDate}</p> */}
              </div>  
            </div>
          ))
        ) : ( 
          !loading && <p>No tickets found for this {userType}.</p>
        )}
      </div>
    </div>    
        </div>
        </div> 
        </div>
        </div>
        {/* Zoom Modal */}
        {/* <Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
          <button className="close-button text-end mt-0" onClick={() => setShowZoomModal(false)}>
              &times; </button>
                <Modal.Body className="text-center position-relative">
                  <div className="zoom-container">
                    <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
                  </div>
                </Modal.Body>
              </Modal> */}
         <Footer />
        </>
  );
};
export default ProfilePage;