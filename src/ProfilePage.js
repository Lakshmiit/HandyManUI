import React, { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Modal, Button, Form, Carousel } from 'react-bootstrap';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationBell from "./NotificationsBell";
import OrdersNotificationBell from "./OrdersBellNotifications";
import TrackStatusNotificationBell from "./TrackStatusBellNotifications";
import axios from "axios";
import Footer from './Footer.js';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RouteIcon from "@mui/icons-material/Route";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
// import AddToCartCount from "./AddToCartCount.js";
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';  
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
// import Banner1 from './img/Ads1.jpeg';
// import BannerVideo from './img/TicketVideo.mp4';
import BannerVideo from './img/HandymanAd.mp4';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import Banner3 from './img/banner-4.jpg'; 
// import Banner2 from './img/Ads2.jpeg';
import { useNavigate, useParams } from "react-router-dom"; 
import Logo from "./img/Hm_Logo 1.png";
import SearchIcon from "@mui/icons-material/Search";
// import ChatIcon from '@mui/icons-material/Chat';
// import ArticleIcon from '@mui/icons-material/Article';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import IronIcon from '@mui/icons-material/Iron';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HardwareIcon from '@mui/icons-material/Hardware';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import BuildIcon from '@mui/icons-material/Build';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import TimelapseIcon from '@mui/icons-material/Timelapse';
// import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName, isMobile) => {
  const iconSize = isMobile ? 20  : 40;
  const customer = [
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
    }] : []),
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: isMobile ? "Track Ticket" : "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`
    }] : []),
      ...(!isMobile ? [{MenuIcon: <NotificationBell sx={{ fontSize: 40 }} />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}`
    }] : []),
     ...(!isMobile ? [{MenuIcon: <OrdersNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}`
    }] : []),
    // { MenuIcon: <ChatIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Chat",  TargetUrl: `/chatPage/${userType}/${userId}`},
    ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
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
      default:
          return customer; 
  }
};

const categories = [
    // { label: 'Blush & Beauty', value: 'Blush & Beauty', icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 30, color: '#d81b60' }} /> },                              
    { label: 'Home Decors',value:'Home Decors', icon: <MapsHomeWorkIcon sx={{ fontSize: 30, color: '#fe6f5e' }} /> },
    { label: 'Electrical Items',value:'Electrical items', icon: <ElectricalServicesIcon sx={{ fontSize: 30, color: '#1976d2' }} /> },
    { label: 'Electronic Appliances', value:'Electronics appliances',icon: <IronIcon sx={{ fontSize: 30, color: '#f57c00' }} /> },
    { label: 'Plumbing & Sanitary',value: 'Sanitary items',  icon: <PlumbingIcon sx={{ fontSize: 30, color: '#388e3c' }} /> },
    { label: 'Hardware Items',value:'Hardware items', icon: <HardwareIcon sx={{ fontSize: 30, color: '#512da8' }} /> },
  ];

const ProfilePage = () => {
  const navigate = useNavigate();
    const {userId} = useParams();
    const {userType} = useParams();
    const [category, setCategory] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true); 
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    // const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const menuRef = useRef(null);
    const productScrollRef = useRef(null); 
    const ticketScrollRef = useRef(null);  
    const scrollRef = useRef(null);
    const [productData, setProductData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showZoomModal, setShowZoomModal] = useState(false);
    const [zoomImage, setZoomImage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState({}); 
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [guestCustomerId, setGuestCustomerId] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [state, setState] = useState('');
    const [districtList, setDistrictList] = useState([]);  
    const [stateList, setStateList] = useState([]);
    const [district, setDistrict] = useState('');  
    const [districtId, setDistrictId] = useState('');    
    const [stateId, setStateId] = useState(null);   
    const [addressData, setAddressData] = useState({
    fullName  : '',
    mobileNumber: '',
    address: '',
    zipCode: '',
    state: '',
    district: '',
    });
 const videoRef = useRef(null);
const [isMuted, setIsMuted] = useState(true);
const [groupedProducts, setGroupedProducts] = useState({});
const [expandedCategories, setExpandedCategories] = useState({});
const [unreadCount, setUnreadCount] = useState(0);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted; 
      setIsMuted(!isMuted);
    }
  };

useEffect(() => {
  console.log(showMenu, productData, products, selectedCategory, addresses, editingAddressId, addressData);
}, [showMenu, productData, products, selectedCategory, addresses, editingAddressId, addressData]);
    // const bottomRefs = useRef({});
// useEffect(() => {
//   bottomRefs.current = {};
//   productData?.forEach(product => {
//     bottomRefs.current[product.id] = React.createRef();
//   });
// }, [productData]);

   const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = isMobile ? 100 : 160;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
        //  if (value === 'Blush & Beauty') {
        //   navigate(`/beautyIcons/${userType}/${userId}`);
        //   return; 
        // }
        try {
          setSelectedCategory(category);
          setProducts([]);
          setError("");
          const encodedCategory = encodeURIComponent(value);
          const url = `https://handymanapiv2.azurewebsites.net/api/Product/GetProductsByCategory?Category=${encodedCategory}`;
          const response = await axios.get(url);
          const productsData = response.data;
          if (productsData.length === 0) {
            setError("Oops! No products found for this category.");
            console.log("No products found.");
          } else {
            setProducts(productsData);
          }
          localStorage.setItem('encodedCategory', encodedCategory);
          navigate(`/offers/${userType}/${userId}`, {
            state: encodedCategory,
          });
          console.log('encodedCategory:', encodedCategory);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
          setError(`Oops! No products found for ${value} category.`);
        }
      };

        useEffect(() => {
          const fetchAllTickets = async () => {
            try { 
              const [ticketResponse, productResponse, technicianResponse] = await Promise.all([
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=raiseTicket`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=buyProduct`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=bookTechnician`),
              ]);
              if (!ticketResponse.ok || !productResponse.ok || !technicianResponse) {
                throw new Error("Failed to fetch ticket, product and technician data");
              }
              const ticketData = await ticketResponse.json();
              const productData = await productResponse.json();
              const technicianData = await technicianResponse.json();      
              setAllTickets([...ticketData, ...productData, ...technicianData]);
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

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };

   const fetchCustomerData = useCallback(async () => {
        try {
          const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Address/GetAddressById/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch customer profile data');
          } 
          const data = await response.json();
          console.log(data);
          const addresses = Array.isArray(data) ? data : [data];
          const formattedAddresses = addresses.map((addr) => ({
            id: addr.addressId, 
            type: addr.isPrimaryAddress ? 'primary' : 'secondary',
            address: addr.address,
            state: addr.state,
            district: addr.district,
            zipCode: addr.zipCode, 
            emailAddress: addr.emailAddress,
            mobileNumber: addr.mobileNumber,
            fullName: addr.fullName,
          }));
          console.log("address1", addresses);
          setAddresses(formattedAddresses);
          const customerName = Array.isArray(data) ? data[0]?.fullName || '' : data.fullName || '';
          setFullName(customerName);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
    }, [userId]);
    
  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  useEffect(() => {
    axios.get('https://handymanapiv2.azurewebsites.net/api/MasterData/getStates')
      .then(response => {
        const data = response.data;
        console.log("States API Response:", data); 
        setStateList(data);
        setStateId('');
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);
  
   useEffect(() => {
    if (stateId) {
      axios.get(`https://handymanapiv2.azurewebsites.net/api/MasterData/getDistricts/${stateId}`)
        .then(response => {
          setDistrictList(response.data);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    } else {
      setDistrictList([]);
    }
  }, [stateId]);
  
   const resetAddressForm = () => {
    setFullName('');
    setMobileNumber('');
    setNewAddress(''); 
    setState('');
    setDistrict('');
    setZipCode('');
  };
  
   const handleAddressEdit = async () => {
  if (!newAddress || !zipCode || !mobileNumber || !state || !district) {
    alert("Please fill in all required fields.");
    return; 
  }
  if (fullName.trim().toLowerCase() === 'guest') {
    alert("Please Change Your Full Name.");
    return;
  }  
  if (!/^\d{6}$/.test(zipCode)) {
    alert("Pincode must be exactly 6 digits.");
    return;
  }
    const updatedAddress = {
      id: guestCustomerId,
      fullName,
      mobileNumber,
      address: newAddress,
      state,
      district,
      zipCode,
    };
    const payload3 = {
      id: guestCustomerId,
      profileType: "profileType",
      addressId: guestCustomerId,
      isPrimaryAddress: true,
      address: newAddress,
      state: state,
      district: district,
      StateId: "1",
      DistrictId: districtId,
      zipCode: zipCode,
      mobileNumber: mobileNumber,
      emailAddress: "emailAddress",
      userId: userId,
      firstName: fullName,
      lastName: "lastName",
      fullName: fullName,
    };
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Customer/CustomerAddressEdit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload3),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error("Failed to edit address.");
      }
      setAddresses(prev =>
        prev.map(addr => addr.id === guestCustomerId ? updatedAddress : addr)
      );
      setAddressData(updatedAddress);
      await fetchCustomerData();
      alert("Address Updated Successfully!");
      setShowModal(false);
      resetAddressForm();
      setIsEditing(false);
      setEditingAddressId(null);
    } catch (error) {
      console.error("Error editing address:", error);
      alert("Failed to edit address. Please try again later.");
    }
  };

useEffect(() => {
  const fetchProductsAndImages = async () => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/GetAllProductList`);
      const data = await response.json();
      setProductData(data);

      const groupProductsByCategory = (products) => {
        return products.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
      };

      const grouped = groupProductsByCategory(data);  
      setGroupedProducts(grouped); 

      data.forEach((product) => {
        if (product.productPhotos?.length) {
          fetchImagesForProduct(product);
        }
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const fetchImagesForProduct = async (product) => {
    try {
      setLoadingStatus((prev) => ({ ...prev, [product.id]: true }));
      const photoPromises = product.productPhotos.map(async (photo) => {
        const res = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
        );
        const imgData = await res.json();
        return { imageData: imgData.imageData };
      });
      const allImages = await Promise.all(photoPromises);
      setImageUrls((prev) => ({ ...prev, [product.id]: allImages }));
    } catch (err) {
      console.error(`Failed to fetch images for product ${product.id}`, err);
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [product.id]: false }));
    }
  };
  fetchProductsAndImages();
}, []);

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
            } else if (userType === "technician") {
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
  // const fetchUserDetails = async () => {
  //   const userId = sessionStorage.getItem("UserId");
  //   const userType = sessionStorage.getItem("UserProfileType");
  //   if (!userId || !userType) {
  //   //   window.location.href = "/logout";
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(
  //       `https://handymanapiv2.azurewebsites.net/api/${userType}/${userType}ProfileData?profileType=${userType}&UserId=${userId}`
  //     );
  //     if (response.status === 200) {
  //       setProfile(response.data);
  //       // alert(JSON.stringify(response.data));        
  //       fetchImageUrl(response.data.PhotoAttachmentId);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user details:", error)
  //   }
  // }; 
  // const handleEditClick = () => setIsEditing(true);
  //  const handleProfileClick = () => {
  //   fileInputRef.current.click(); 
  // };
  // const handleCancel = () => {
  //   setIsEditing(false);
  //   setName(profile.fullName);
  // };
  // const handleSave = async () => {
  //   setProfile((prev) => ({ ...prev, fullName: name }));
  //   setIsEditing(false);
  // };
  // const uploadFile = async () => {
  //   if (!profile.photoUrl) return;
  //   const formData = new FormData();
  //   formData.append("file", profile.photoUrl);
  //   try {
  //     const response = await axios.post(
  //       "https://handymanapiv2.azurewebsites.net/api/FileUpload/upload",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };
  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setProfileImage(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  //   const uploadedFile = await uploadFile(file);
  //   if (uploadedFile?.fileId) {
  //     await updateProfileImage(uploadedFile.fileId);
  //   }  
  // };
  // const uploadFile = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     const response = await axios.post(
  //       "https://handymanapiv2.azurewebsites.net/api/FileUpload/upload",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     if (response.data.fileId) {
  //       await updateProfileImage(response.data.fileId);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };
  // const updateProfileImage = async (fileId) => {
  //   try {
  //     await axios.post(
  //       `https://handymanapiv2.azurewebsites.net/api/${profile.UserProfileType}/Edit`,
  //       {
  //         UserId: profile.UserId,
  //         FullName: profile.fullName,
  //         PhotoDocumentId: fileId,
  //       }
  //     );
  //     alert("Profile photo updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating profile image:", error);
  //   }
  // };
  // const handleSubmit = async () => {
  //   if (!profile) return;
  //   const fileId = profile.photoUrl ? await uploadFile() : profile.PhotoAttachmentId;
  //   try {
  //     const response = await axios.post(
  //       `https://handymanapiv2.azurewebsites.net/api/${profile.UserProfileType}/Edit`,
  //       {
  //         UserId: profile.UserId,
  //         FullName: profile.fullName,
  //         PhotoDocumentId: fileId,
  //       }
  //     );
  //     alert(response.data.message || "Profile updated successfully!");
  //     fetchUserDetails();
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     alert("Error updating profile: " + (error.response?.data?.message || error.message));
  //   }
  // };
  
  if (loading) {
    return 
  }

  return (
    <>
    <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm">
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
       {isMobile && (
        <div className="d-flex align-items-center">
  {/* Profile Image */}
  <div className="profile-img-wrapper">
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
      // style={{ width: "40px", height: "40px", borderRadius: "10%", objectFit: "cover" }}
    />
  </div>
  {/* <div className="d-flex align-items-center" onClick={() => navigate(`/customerNotification/${userType}/${userId}`)} style={{ cursor: "pointer" }}>
  <NotificationBell fontSize="medium" />
</div> */}
<div
  className="d-flex align-items-center"
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}
>
  <div style={{ position: "relative", display: "inline-block" }}>
    <OrdersNotificationBell fontSize="medium" />
  </div>
</div>
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
</div>
)}
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
      </div>
    </div>
    </header>
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
                   <div className="text-warning fs-3 mt-0">{profile.userProfileType}</div>
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
               <p className="logout-btn m-1" onClick={() => window.location.href = "https://handymanserviceproviders.com/Logout"}>
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
           {showProfile && (
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
                  {/* <div className="d-flex align-items-start" style={{ cursor: "pointer" }} onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}>
                      <OrdersNotificationBell sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "13px", fontFamily: "Poppins", lineHeight: "28px" }}>My Orders</small>
                    </div> */}
                    {/* <hr style={{ margin: '8px 0' }} /> */}
                    <div className="d-flex align-items-start" style={{ cursor: "pointer" }} onClick={() => navigate(`/trackStatusNotifications/${userType}/${userId}`)}>
                      <TrackStatusNotificationBell sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "13px", fontFamily: "Poppins", lineHeight: "28px" }}>Track Ticket</small>
                    </div>
                    <hr style={{ margin: '8px 0' }} />
                    <div className="d-flex align-items-start" style={{ cursor: "pointer" }} onClick={() => document.getElementById('myTicketsSection')?.scrollIntoView({ behavior: 'smooth' })}>
                      <ConfirmationNumberIcon sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "13px", fontFamily: "Poppins", lineHeight: "28px" }}>My Tickets</small>
                    </div>
                    <hr style={{ margin: '8px 0' }} />
                  <div className="d-flex align-items-center logout-btn" style={{ cursor: 'pointer' }} onClick={() => window.location.href = "https://handymanserviceproviders.com/Logout"}>
                    <LogoutIcon className="me-2" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
         </div> 
    
          {isMobile && (
            <div
              className="d-flex justify-content-between align-items-center px-2"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}
            >
              <div className="text-primary fw-bold fs-5">
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
      height: '70px',
      padding: '10px 12px',
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
          {React.cloneElement(menu.MenuIcon, { sx: { fontSize: 28 } })}
          <small style={{
          fontSize: "12px",
          fontFamily: 'Poppins',
          textAlign: 'center',
          lineHeight: '16px'
        }}>
          {menu.MenuTitle.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              {word}
              {index !== menu.MenuTitle.split(" ").length - 1 && <br />}
            </React.Fragment>
          ))}
        </small>
        </a>
      ))}
    </div>
  </div>
)}
        {/* Address with Location */}
        <div className="col-md-9 bg-white">
        {profile && profile.fullName && profile.address && profile.zipCode && (
  <div className="w-100 bg-dark text-white d-flex" style={{ backgroundColor: '#2d3e50', padding: "5px", borderRadius: '8px'}}
        onClick={() => setShowLocationModal(true)}>
    <LocationOnIcon
      className="me-2"
      style={{ cursor: 'pointer' }}
      // onClick={() => {
      //   const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address + ', ' + profile.zipCode)}`;
      //   window.open(mapsUrl, '_blank');
      // }}
    />
    <p className="mb-0 text-truncate" style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif'}}>
      Deliver to <span className="fw-bold">{profile.fullName?.charAt(0)}</span> - {profile.address}, {profile.zipCode}
    </p>
      <KeyboardArrowDownIcon
        className="me-2"
        style={{ cursor: 'pointer' }}
      />
  </div>
)}
      {/* Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
              <Modal.Title>{isEditing ? 'Edit Address' : 'Add Address'}</Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name <span className="req_star">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Full name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number <span className="req_star">*</span></Form.Label>
                <Form.Control
                  name="MobileNumber"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  maxLength="10"
                  value={mobileNumber}
                  // onChange={(e) => setMobileNumber(e.target.value)}
                />
                </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="hidden"
                  name="UserId"
                  className="form-control"
                  placeholder="UserId"
                  value={guestCustomerId}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address <span className="req_star">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter address"
                  required
                />
              </Form.Group>
             <Form.Group className="mb-3">
                <Form.Label>State <span className="req_star">*</span></Form.Label>
                <Form.Select
                  value={stateId || ''}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setStateId(selectedId);
                    const selectedState = stateList.find(
                      (s) => s?.StateId?.toString() === selectedId
                    );
                    if (selectedState) {
                      setState(selectedState.StateName);
                    }
                  }}
                  required
                >
                  <option value="">Select State</option>
                  {Array.isArray(stateList) &&
                    stateList
                      .filter((s) => s && s.StateId && s.StateName)
                      .map((s) => (
                        <option key={s.StateId} value={s.StateId.toString()}>
                          {s.StateName}
                        </option>
                      ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>District <span className="req_star">*</span></Form.Label>
              <Form.Select
                  value={districtId || ''}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setDistrictId(selectedId);
                    const selectedDistrict = districtList.find(d => d.districtId.toString() === selectedId);
                    if (selectedDistrict) {
                      setDistrict(selectedDistrict.districtName);
                    }
                  }}
                  required
                >
                  <option value="">Select District</option>
                  {districtList.map((d) => (
                    <option key={d.districtId} value={d.districtId.toString()}>
                      {d.districtName}
                    </option>
                  ))}
                </Form.Select>
                </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pincode <span className="req_star">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={zipCode}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, ""); 
                    if (numericValue.length <= 6) {
                      setZipCode(numericValue);
                    }
                  }}              
                    placeholder="Enter pincode"
                    required
                />
              </Form.Group>
              <Button type="button" variant="primary" onClick={handleAddressEdit}>
                {isEditing ? 'Edit Address' : 'Add Address'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
{/* Location Arrow OnClick */}
{showLocationModal && (
  <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
    <div
      className="location-modal bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content p-4">
        <button
          className="close-button"
          onClick={() => setShowLocationModal(false)}
        >
          &times;
        </button>
        <h4>Confirm Your Location</h4>
        <div className="address-list">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="address-card border rounded bg-light p-3 mb-3 d-flex justify-content-between align-items-start"
            >
              <div className="address-details">
                <p><strong>{address.fullName}</strong></p>
                <p>{address.mobileNumber}</p>
                <p>{address.address}</p>
                <p>{address.state}</p>
                <p>{address.district}</p>
                <p>{address.zipCode}</p>
              </div>
              <Button
                variant="primary"
                className="text-white"
                onClick={() => {
                  setGuestCustomerId(address.id);
                  setFullName(address.fullName);
                  setMobileNumber(address.mobileNumber);
                  setNewAddress(address.address);
                  setState(address.state);
                  setDistrict(address.district);
                  setZipCode(address.zipCode);
                  setIsEditing(true);
                  setShowModal(true);
                }}
              >
                {address.address === "" ? "Add Address" : "Edit Address"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

      {/* Search Icon */}
          <div className="position-relative flex-grow-1">
        <input
          type="text"
          className="form-control w-100 m-2 ps-5"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.trimStart())}
        />
        <SearchIcon
          className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          style={{ pointerEvents: 'none' }}
        />
      </div>

       {/* Category Cards */}
    <div className="position-relative w-100">
  <div
    ref={scrollRef}
    className="category-scroll d-flex flex-nowrap overflow-auto"
    style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
  >
    {categories.map((cat) => (
      <div
        key={cat.label}
        onClick={() => handleCategoryClick(cat)}
        className="d-flex flex-row align-items-center justify-content-center me-3"
        style={{
          width: isMobile ? '100px' : '130px',
          cursor: 'pointer',
        }}
      >
        <div>{cat.icon}</div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'center',
            marginTop: '4px',
            color: '#000',
          }}
        >
          {cat.label.toUpperCase()}
        </div>
      </div>
    ))}
    {error && <div className="text-danger">{error}</div>}
  </div>
  {/* Arrow Buttons */}
  <div className="d-flex justify-content-between ">
    <button
      className="bg-transparent border-0"
      style={{ color: '#000000' }}
      onClick={() => scroll('left')}
    >
      <ArrowBackIcon fontSize="medium" />
    </button>
    <button
      className="bg-transparent border-0 my-1 me-2"
      style={{ color: '#000000' }}
      onClick={() => scroll('right')}
    >
      <ArrowForwardIcon fontSize="medium"/>
    </button>
  </div>
</div>
      {/* Carousel */}
              <div className="container">
                <div className="mx-auto">
              <div
                id="productCarousel"
                className="carousel slide mb-4 rounded "
                data-bs-ride="carousel"
                data-bs-interval="6000"
              >
                {/* Indicators */}
                <div className="carousel-indicators">
                    {/* <button
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
                    ></button> */}
                    {/* <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3" 
                  ></button> */}
                   {/* <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="3"
                    aria-label="Slide 4" 
                  ></button> */}
                </div>
                {/* Carousel items */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <video
                      ref={videoRef}
                      className="d-block w-100 rounded"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      autoPlay
                      loop
                      playsInline
                      muted={isMuted}
                    >
                      <source src={BannerVideo} type="video/mp4" />
                    </video>
                    <button
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
                    </button>
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
                </div> */}
                {/* <div className="carousel-item">
                  <img
                    src={Banner3}
                    className="d-block w-100 img-fluid rounded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Slide 3"
                  />
                </div> */}
              </div>
                {/* Controls */}
                {/* <button
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
                </button> */}
              </div>
              </div>
              </div>

<h4 style={{ color: '#ff5722', fontFamily: 'Poppins, sans-serif', fontWeight: 700,fontSize: '22px', textTransform: 'uppercase',
    letterSpacing: '1px', textAlign: 'center', marginTop: '1px', marginBottom: '1px'}}>
   🎉 Top Deals For You! 🎉
</h4>
{/* Products Display */}
<div className="product-scroll-wrapper " ref={productScrollRef}>
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
                  {product.discount && (
                    <div className="discount-badge-wrapper">
                      <span className="discount-badge">{product.discount}% OFF</span>
                    </div>
                  )}
                  <div className="image-container">
                    {loadingStatus[product.id] ? (
                      <div className="image-placeholder">Loading...</div>
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
                     {/* <p className="text-danger">Limited deal</p> */}
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
</div>
      {/* <div
  className="product-scroll-wrapper"
  ref={productScrollRef}>
  <div className="product-row">
    {productData &&
      productData
        .filter((product) => {
          const productName = product.productName?.toLowerCase().trim();
          const query = searchQuery.toLowerCase().trim();
          const normalize = (str) => (str.endsWith('s') ? str.slice(0, -1) : str);
          return productName.includes(query) || normalize(productName).includes(normalize(query));
        })
        .map((product) => {
          const discountedPrice =
            product.rate && product.discount
              ? (product.rate - (product.rate * product.discount) / 100).toFixed(0)
              : product.rate;
          return (
            <div
  className="product-card"
  onClick={() => setSelectedProduct(product)}
  style={{ cursor: 'pointer' }}
>
  {product.discount ? (
    <div className="discount-badge-wrapper">
      <span className="discount-badge">{product.discount}% OFF</span>
    </div>
  ) : null}

  <div className="image-container">
    {loadingStatus[product.id] ? (
      <div className="image-placeholder">Loading...</div>
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
    <div className="text-start">
    </div>
  </div>
</div>
          );
        })}
  </div>
</div> */}

 {/* Selected Product Display */}
{selectedProduct && (
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
  // <div className="custom-modal-backdrop" onClick={() => setSelectedProduct(null)}>
  //   <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
  //     <button className="close-button" onClick={() => setSelectedProduct(null)}>&times;</button>
  //     {/* <div className="custom-card"> */}
  //       <div className="d-flex">
  //         <div style={{ flex: '0 0 55%' }}>
  //           {loadingStatus[selectedProduct.id] ? (
  //             <div className="d-flex justify-content-center align-items-center" style={{ height: '250px', background: '#f8f9fa' }}>
  //               <div className="spinner-border text-secondary" role="status">
  //                 <span className="visually-hidden">Loading...</span>
  //               </div>
  //             </div>
  //           ) : imageUrls[selectedProduct.id]?.length > 0 ? (
  //             <Carousel>
  //               {imageUrls[selectedProduct.id].map((img, index) => (
  //                 <Carousel.Item key={index}>
  //                   <img
  //                     src={`data:image/jpeg;base64,${img.imageData}`}
  //                     className="card-img-top object-fit-cover"
  //                     style={{ height: '350px', width: '300px', objectFit: 'cover' }}
  //                     alt={`product-image-${index}`}
  //                     onClick={() => handleImageClick(`data:image/jpeg;base64,${img.imageData}`)}
  //                   />
  //                 </Carousel.Item>
  //               ))}
  //             </Carousel>
  //           ) : (
  //             <div className="d-flex justify-content-center align-items-center" style={{ height: '250px', background: '#f8f9fa' }}>
  //               No Image
  //             </div>
  //           )}
  //         </div>
  //         <div>
  //           <h6 className="mb-1 fw-bold" style={{ fontFamily: "Rubik" }}>{selectedProduct.productName.toUpperCase()}</h6>
  //           <div className="small text-primary fw-bold">Rs {(selectedProduct.rate - (selectedProduct.rate * selectedProduct.discount) / 100).toFixed(0)} /-</div>
  //           <div className="small text-muted fw-bold" style={{ textDecoration: 'line-through' }}>MRP: Rs {selectedProduct.rate} /-</div>
  //           <div className=" small text-danger fw-bold">Discount: {selectedProduct.discount}%</div>
  //            <div className="small fw-bold m-1 fs-6" style={{ color: '#7851a9', fontFamily: "Italianno, cursive" }}> <LocalShippingIcon style={{ color: '#f88379', fontSize: '1.25rem' }} /> Free Delivery and Free Installation</div>
  //           <div>
  //           <span className="badge text-primary">✔️ Genuine Product</span>
  //           <span className="badge text-secondary">↩️ Easy Returns</span>
  //           <span className="badge text-success">💳 COD Available</span>
  //         </div>
  //           <button
  //             className=" buy-now-btn mt-2"
  //             onClick={() => navigate(`/offersBuyProduct/${userType}/${userId}/${selectedProduct.id}`)}
  //           >
  //             Buy Now
  //           </button>
  //         </div>
  //       </div>
  //     {/* </div> */}
  //   </div>
  // </div>
)}
  {/* Dashboard Desktop */}
      {!isMobile ? (
        <>
<h5 className="mb-2 fs-4">Dashboard</h5>
          <div className="row g-2">
            {menuList.map((menu, index) => (
              <div className="col-4" key={index}>
                <a href={menu.TargetUrl} className="text-decoration-none" style={{ color: "inherit" }}>
                  <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined custom-icon" style={{fontSize: '40px'}}>
                      {menu.MenuIcon}
                    </span>
                    <span className="fs-6">{menu.MenuTitle}</span>
                  </div>
                </a>
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

    {/* Fixed Chat Icon at bottom right */}
<div
  className="blinking-icon"
  style={{
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: 999,
    backgroundColor: '#03c03cb3',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  }}
  onClick={() => navigate(`/chatPage/${userType}/${userId}`)}
>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <GradeIcon style={{ color: 'white', fontSize: '28px' }} />
    <span
      style={{
        color: 'red',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '2px',
        textAlign: 'center',
        lineHeight: '1.2',
        whiteSpace: 'pre-line', 
      }}
    >
      Free{'\n'}Services
    </span>
  </div>
  {unreadCount > 0 && (
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
      {unreadCount}
    </span>
  )}
</div>
        </div>
        </div> 
        </div>
        {/* Zoom Modal */}
        <Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
          <button className="close-button text-end mt-0" onClick={() => setShowZoomModal(false)}>
              &times; </button>
                <Modal.Body className="text-center position-relative">
                  <div className="zoom-container">
                    <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
                  </div>
                </Modal.Body>
              </Modal>
         <Footer />
        </>
  );
};
export default ProfilePage;