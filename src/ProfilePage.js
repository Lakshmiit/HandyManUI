import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Carousel, Modal } from 'react-bootstrap';
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
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';  
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
// import { TextField } from "@mui/material"; 
import Banner1 from './img/banner-1 copy.jpg';
import Banner2 from './img/banner-2.jpg';
import Banner3 from './img/banner-4.jpg';
import { useNavigate, useParams } from "react-router-dom";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logo from "./img/Hm_Logo 1.png";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import IronIcon from '@mui/icons-material/Iron';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HardwareIcon from '@mui/icons-material/Hardware';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MenuIcon from '@mui/icons-material/Menu';
// import { Carousel } from 'react-bootstrap';

const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName, isMobile) => {
  const iconSize = isMobile ? 20 : 40;
  const customer = [
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      // { MenuIcon: <LocalOfferIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
    }] : []),
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
      // { MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: iconSize }}/>, MenuTitle: isMobile ? "Track Ticket" : "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: isMobile ? "Track Ticket" : "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`
    }] : []),
      ...(!isMobile ? [{MenuIcon: <NotificationBell sx={{ fontSize: 40 }} />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}`
    }] : []),
     ...(!isMobile ? [{MenuIcon: <OrdersNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}`
    }] : []),
    ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
    }] : []),
       // { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Accounts"},
       // { MenuIcon: <NotificationBell sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}` },
      //  { MenuIcon: <OrdersNotificationBell sx={{ fontSize: 40 }}/>, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}` },
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
    const [district, setDistrict] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [profile, setProfile] = useState({});
    // const [isEditing, setIsEditing] = useState(false);
    // const [name, setName] = useState(profile.fullName);
    const [loading, setLoading] = useState(true); 
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const bottomRefs = useRef({});
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const menuRef = useRef(null);
    const productScrollRef = useRef(null); 
    const ticketScrollRef = useRef(null);  
    const [productData, setProductData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showZoomModal, setShowZoomModal] = useState(false);
    const [zoomImage, setZoomImage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState({}); 
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
useEffect(() => {
  console.log(showMenu, products, selectedCategory);
}, [showMenu, products, selectedCategory]);

const scroll = (direction, type) => {
  const scrollRef = productScrollRef.current;
  const cardWidth = scrollRef.querySelector('.product-card-wrapper')?.offsetWidth || 320;
  const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

  if (scrollRef) {
    scrollRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

useEffect(() => {
  bottomRefs.current = {};
  productData?.forEach(product => {
    bottomRefs.current[product.id] = React.createRef();
  });
}, [productData]);

 const handleCategoryClick = async (category) => {
        const { value } = category; 
      
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

         // Handle "more" icon click to toggle profile card visibility
  const handleMoreIconClick = () => {
    setShowProfile(!showProfile);
  };

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };


// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/GetAllProductList`);
//         const data = await response.json();
//         setProductData(data);

//         const imageRequests = data.map(async (product) => {
//           if (product.productPhotos?.length) {
//             const photo = product.productPhotos.map(async (photo) => {  
//               const res = await fetch(
//                 `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
//               );
//               const imgData = await res.json();
//               return { id: product.id, imageData: imgData.imageData, allPhotos: product.productPhotos };
//             });
//             const allImages = await Promise.all(photo);
//             return { id: product.id, images: allImages };
//           }
//           return null;
//         });

//         const images = await Promise.all(imageRequests);
//         const imageMap = {};
//         images.forEach((img) => {
//           if (img) imageMap[img.id] = img.images;
//         });
//         setImageUrls(imageMap);
//         setImageLoading(false);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };
//     fetchData();
//   }, []);


useEffect(() => {
  const fetchProductsAndImages = async () => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/GetAllProductList`);
      const data = await response.json();
      setProductData(data);
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
      
      // const toggleDropdown = (event) => {
      //   event.stopPropagation();
      //   console.log("Icon clicked!");
      //   setShowProfile(!showProfile);
      //   setShowDropdown((prev) => !prev);
      // };

      // const toggleMenu = (event) => { 
      //   event.stopPropagation(); 
      //   console.log("Menu Toggled!");
      //   setShowMenu((prev) => !prev);
      // };
      
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (!document.getElementById("dropdown-container")?.contains(event.target)) {
            setShowDropdown(false);
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
    // setProfileImage();
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
    return <div>Loading...</div>;
  }

  return (
    <>
    <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm">
       {/* Menu Icon */}
       {isMobile ? (
          <div onClick={handleMoreIconClick} style={{ cursor: "pointer" }}>
          <MenuIcon className="floating-menuIcon" fontSize="medium" />
        </div>
       ) : (null)}
       <img src={Logo} alt="Handy Man Logo" className="logo-img" />
        {/* <img className="h-90" src={Logo} alt="Handy Man Logo" style={{ height: "60px", width: "190px", paddingLeft: "10px" }}/> */}
        <div className="spacer"></div>
        <div className="d-flex align-items-center w-100">
      {!isMobile && (
        <div className="srch_dv flex-grow-1 position-relative">
          <input type="text" className="form-control src_input" placeholder="Search / Ask a question" />
          <SearchIcon
            className="position-absolute search-icon"
          />
        </div>
      )}
    </div>
        <div className="hdr_icns d-flex align-items-center gap-2 m-2">
      {/* <span className="material-symbols-outlined">
        <ShoppingBagIcon />
      </span> */}
    
      <div id="dropdown-container" className="dropdown-container" style={{ position: "relative" }}>
       {isMobile && (
        <div className="d-flex align-items-center gap-2">
  {/* Profile Image */}
  <div className="profile-img-wrapper">
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
    />
  </div>

  {/* Notification Bell */}
  <div className="d-flex align-items-center" onClick={() => navigate(`/customerNotification/${userType}/${userId}`)} style={{ cursor: "pointer" }}>
  <NotificationBell fontSize="medium" />
</div>
</div>
)}

       {showDropdown && (
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
       )}
      </div>

      {/* More Icon for Mobile */}
      {/* <div className="mob_mnu">
      {/* {isMobile && ( 
        <span 
        className="more-icon" 
        onClick={toggleMenu}  
        style={{ cursor: "pointer" }}>
        <MoreVertIcon />
      </span> */}
      
      {/* )} */}

{/* {showMenu && (
        <div ref={menuRef} id="mobile-menu" className="dropdown-menu p-3 mw_250px">
          <div className="profl_dets mt-3 d-flex flex-column gap-3">
            <div className="profl_dets_mn">
              <span>Name &nbsp; <i className="fas fa-pen"></i></span>
              <span className="h5">{profile.fullName}</span>
            </div>
            <div className="profl_dets_mn">
              <span>Mobile</span>
              <span className="h5">{profile.mobileNumber}</span>
            </div>
            <div className="profl_dets_mn">
              <span>Email</span>
              <span className="h5">{profile.email}</span>
            </div>
            <div className="profl_dets_mn">
              <span>Address</span>
              <span className="h5">
              {profile.address}
              </span>
            </div>
            <div className="profl_dets_mn">
              <span>Change Password</span>
              <a href="#">Click to change</a>
            </div>
            <div className="profl_dets_mn">
              <span>Settings</span>
              <a href="#">User Settings</a>
            </div>

            {/* Logout Button 
            <div className="d-flex align-items-center logout-btn" onClick={() => console.log("Logging out...")}>
              <LogoutIcon />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
      </div> */}
    </div>
    </header>


    <div
      className="container"
      style={{
        padding: "8px",
        borderRadius: "5px",
        minHeight: "100vh", 
      }}
    >
      {/* <Header /> */}
      <div className="row">
        <div className="col-md-3">
        <div>
      
      {!isMobile ? (
                   <div className="profile-card">
                     <div className="profile-img-container "> 
                   <div className="profile-container"> 
             <div className="profile-info">
               <div className="webprofile-section">
               <div className="text-primary fw-bold cust-name">Welcome <br /> 
               <div className="text-dark">{profile.fullName}{" "}</div></div>
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
                       // onChange={handleFileChange}
                     />
                    </div>
                 <div className="label fw-bold fs-5">Name</div>
                 {/* {isEditing ? (
                   <TextField
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     variant="outlined"
                     size="small"
                   />
                 ) : ( */}
                   <p className="value">
                     {profile.fullName}
                     {/* <IconButton size="small" onClick={handleEditClick}>
                       <EditIcon fontSize="small" />
                     </IconButton> */}
                   </p>
                 {/* )} */}
                  <hr />
               {/* </div>
       
               <div className="profile-section"> */}
                 <div className="label fw-bold mt-0 fs-5">Mobile</div>
                 <p className="value">{profile.mobileNumber}</p>
               {/* <hr />
                 <div className="label fw-bold mt-0 fs-5">Email</div>
                 <p className="value">{profile.email}</p> */}
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
              //  </div>
              //  </div>
      ) : null}
            </div> 

           {showProfile && (
              <div
                className="floating-profile-menu"
                style={{
                  position: 'fixed',
                  top: '60px', 
                  left: '10px', 
                  backgroundColor: '#fff',
                  zIndex: 1050,
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                  padding: '5px',
                  width: '180px'
                }}
              >
                <div className="profile-info">
                  <div className="fw-bold">Name</div>
                  <p>{profile.fullName}</p>
                  <hr />
                  <div className="fw-bold">Mobile</div>
                  <p>{profile.mobileNumber}</p>
                  <hr />
                  <div className="fw-bold">Address</div>
                  <p>{profile.address}</p>
                  <hr />
                  <div className="d-flex" style={{ cursor: "pointer" }} onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}>
                    <OrdersNotificationBell className="mt-2" fontSize="medium" />
                    <small className="mt-2">Orders</small>
                  </div>
                  <hr />
                  <div className="d-flex" style={{ cursor: "pointer" }} onClick={() => navigate(`/trackStatusNotifications/${userType}/${userId}`)}>
                    <TrackStatusNotificationBell className="mt-2" fontSize="medium" />
                    <small className="mt-2">Track Ticket</small>
                  </div>
                  <hr />
                  <div className="logout-btn" onClick={() => window.location.href = "https://handymanserviceproviders.com/Logout"}>
                    <LogoutIcon />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          {/* Wrap profile-card and profile-info inside a parent div */}
          {/* <div className="row">
 <div className="col-md-3">
          <div>
          <div 
          // className={`${showProfile ? "show" : ""}`}
        className={`profile-card-container ${showProfile ? "show" : ""}`}
      >
            <div className="profile-card">
              <div className="profile-img-container">
              {/* <img src={profileImage} alt="Profile" 
              className="profile-img" onClick={handleProfileClick}/>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              /> 
              </div>
              <div className="profile-info">
                {/* {isEditing ? (
                  <div className="edit-name d-flex">
                    <label className="fw-bold">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                     <div className="edit-icons d-flex">
                      <IconButton onClick={handleCancel} color="error">
                        <CancelIcon />
                      </IconButton>
                      <IconButton onClick={handleSave} color="success">
                        <CheckCircleIcon />
                      </IconButton>
                    </div> 
                  </div>
                ) : (
                   )} 
                  <div className="name-section">
                    <div className="fw-bold">Name</div>
                    <p>
                      {profile.fullName}{" "}
                      {/* <IconButton size="small" onClick={handleEditClick}>
                        <EditIcon fontSize="small" />
                      </IconButton> 
                    </p>
                    <hr />
                    {/* <p className="text-warning text-center">customer</p> 
                    <div className="fw-bold">Mobile</div>
                    <p className="profile">{profile.mobileNumber}</p>
                    {/* <hr />
                    <div className="fw-bold">Email</div>
                    <p className="profile">{profile.email}</p> 
                    <hr />
                    <div className="fw-bold">Address</div>
                    <p className="profile">
                    {profile.address}
                    </p>
                    <hr />
                    {/* <p className="fw-bold m-1 text-primary" style={{ cursor: "pointer" }}>
                      <a href="/change-password">Click to change password</a>
                    </p> */}

                    {/* <p className="fw-bold m-1 text-primary" style={{ cursor: "pointer" }}>
                      <a href="/user-settings">User Settings</a>
                    </p>

                    <hr /> */}
                    {/* Orders Icon */}
                    {/* <div className="d-flex" style={{ cursor: "pointer" }} onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}>
                      <OrdersNotificationBell className="mt-2" fontSize="medium" />
                      <small className="mt-2" style={{ fontSize: "13px", fontFamily: 'Poppins' }}>
                        Orders
                      </small>
                    </div>
                    <hr />
                    <div className="d-flex" style={{ cursor: "pointer" }} onClick={() => navigate(`/trackStatusNotifications/${userType}/${userId}`)}>
                      <TrackStatusNotificationBell className="mt-2" fontSize="medium" />
                      <small className="mt-2" style={{ fontSize: "13px", fontFamily: 'Poppins' }}>
                        Track Ticket
                      </small>
                    </div>
                    <hr />
                    <div className="logout-btn" onClick={() => window.location.href = "https://handymanserviceproviders.com/Logout"}>
                      <LogoutIcon />
                      <span>Logout</span>
                    </div> */}
                    
                    {/* Logout Button */}
                    {/* <p className="logout-btn" onClick={`https://handymanserviceproviders.com`}>
                      <LogoutIcon />
                      <span>Logout</span>
                    </p> */}
                  {/* </div>
               
              </div>
            </div>
          </div>
        </div> */}
        {/* )}
        </div>
        </div> */}
         </div> 
    
          {isMobile && (
            <div>
            <div className="text-primary fw-bold cust-fullname fs-5 mt-2">Welcome <small className="text-dark" style={{fontSize: "18px", fontFamily: 'Poppins, sans-serif'}}>{profile.fullName}{" "}</small></div>
            {/* <div className="fw-bold fs-5">Lakshmi Sai Service Providers</div>
            <div className="text-warning fs-4">{profile.userProfileType}</div> */}
             </div>
          )}
        <div className="col-md-9 bg-white">
          <div className="position-relative flex-grow-1 m-1">
        <input
          type="text"
          className="form-control w-60 m-2 ps-5"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.trimStart())}
        />
        <SearchIcon
          className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      {/* Carousel */}
              <div className="container">
                <div className="mx-auto">
              <div
                id="productCarousel"
                className="carousel slide mb-4 rounded "
                data-bs-ride="carousel"
                data-bs-interval="2000"
              >
                {/* Indicators */}
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
                    ></button><button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>

                {/* Carousel items */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
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
                    </div>
                </div> 

                {/* Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              </div>
              </div>
     <div
  className="category-scroll d-flex flex-nowrap overflow-auto px-3 py-2"
  style={{ gap: '8px', WebkitOverflowScrolling: 'touch' }}
>
  {categories.map((cat) => (
    <div
      key={cat.label}
      onClick={() => handleCategoryClick(cat)}
      style={{ flex: '0 0 auto' }}
    >
      <div className="card text-center border-0"
  style={{
    height: isMobile ? '80px' : '120px',
    width: isMobile ? '70px' : '170px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    display: 'flex',          
    flexDirection: 'column',   
    alignItems: 'center',      
    justifyContent: 'center',  
    padding: '4px',            
  }}
>
  <div style={{ marginBottom: '0px' }}>{cat.icon}</div> 
  <span
  style={{
    fontSize: '9px',
    fontWeight: '600',
    lineHeight: 1,
    fontFamily: 'Poppins, sans-serif',
  }}
>
  {cat.label.toUpperCase()}
</span>
</div>
    </div>
  ))}
   {error && <div className="text-danger">{error}</div>}
</div>
 
<h4>Top Deals For You!</h4>
      <div
  className="product-scroll-wrapper"
  ref={productScrollRef}
>
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
          key={product.id}
          className="product-card"
          onClick={() => {
            const targetRef = bottomRefs.current[product.id];
            if (targetRef && targetRef.current) {
              targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              targetRef.current.classList.add('highlight');
              setTimeout(() => {
                targetRef.current.classList.remove('highlight');
              }, 2000);
            }
          }}
          style={{ cursor: 'pointer' }}   
        >
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
          <div>
            <h6 className="product-name">{product.productName.toUpperCase()}</h6>
            <div className="product-price">Rs {discountedPrice} /-</div>
          </div>
        </div>
          );
        })}
  </div>
</div>

      {/* <div className="d-flex align-items-center"> */}
{/* <button className="btn text-primary" onClick={() => scroll('left', 'product')}>
  &lt;
</button> */}

<div className="card-scroll-container" ref={productScrollRef}>
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
                  <div key={product.id} className="product-card-wrapper" ref={bottomRefs.current[product.id]}>
                    <div className="custom-card" >
                      <div className="d-flex">
                        <div style={{ flex: '0 0 55%' }}>
  {loadingStatus[product.id] ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '250px', background: '#f8f9fa' }}>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : imageUrls[product.id]?.length > 0 ? (
    <Carousel>
      {imageUrls[product.id].map((img, index) => (
        <Carousel.Item key={index}>
          <img
            src={`data:image/jpeg;base64,${img.imageData}`}
            className="card-img-top zoomable-image"
            style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
            alt={`product-image-${index}`}
            onClick={() => handleImageClick(`data:image/jpeg;base64,${img.imageData}`)}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '250px', background: '#f8f9fa' }}>
      No Image
    </div>
  )}
</div>
                        <div>
                          <h6 className="mb-1 fw-bold fs-6" style={{fontFamily: "Rubik"}}>{product.productName.toUpperCase()}</h6>
                          <div className="small text-primary fw-bold">Rs {discountedPrice} /-</div>
                          <div className="small text-muted fw-bold" style={{ textDecoration: 'line-through' }}>
                            MRP: Rs {product.rate}
                          </div>
                          <div className="blinking-row small text-danger fw-bold">Discount: {product.discount}%</div>
                          <div className="blinking-text small text-success fw-bold m-1 fs-6" style={{fontFamily: "Italianno, cursive"}}>Free Delivery & Installation</div>
                          <button
                            className="buy-now-btn" 
                            onClick={() => {
                              navigate(`/offersBuyProduct/${userType}/${userId}/${product.id}`);
                            }}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="text-end">
        <button className="btn text-primary" onClick={() => scroll('left', 'product')}>Prev</button>
        <button className="btn text-primary" onClick={() => scroll('right', 'product')}>Next</button>
      </div>


      {/* </div> */}
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
      ) : (
  <div
  className="bottom-scrollbar-container position-fixed bottom-0 start-0 end-0 bg-white border-top px-1 py-1 shadow"
  style={{
    zIndex: 1020,
    height: '80px',
  }}
>
  <div className="d-flex overflow-auto flex-nowrap scroll-area justify-content-start align-items-center">
    <a
      href={`/profilePage/${userType}/${userId}`}
      className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-dark"
      style={{ minWidth: '60px' }}
    >
      <HomeIcon sx={{ fontSize: 30 }} />
      <small style={{ fontSize: "13px", fontFamily: 'Poppins', textAlign: 'center' }}>Home</small>
    </a>

    {menuList.map((menu, index) => (
      <a
        key={index}
        href={menu.TargetUrl}
        className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-dark mx-3"
        style={{ minWidth: '60px' }}
      >
        {React.cloneElement(menu.MenuIcon, { sx: { fontSize: 28 } })}
        <small style={{ fontSize: "13px", fontFamily: 'Poppins', textAlign: 'center' }}>
          {menu.MenuTitle}
        </small>
      </a>
    ))}

    <a
      href="#myTicketsSection"
      className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-dark mx-3"
      style={{ minWidth: '60px' }}
    >
      <ConfirmationNumberIcon sx={{ fontSize: 28 }} />
      <small style={{ fontSize: "13px", fontFamily: "Poppins", textAlign: "center" }}>My Tickets</small>
    </a>
  </div>
</div>
)}

              <div id="myTicketsSection" className="ticket-container">
                <div className="ticket-header">
                <h4 className="ticket-title">My Tickets</h4>
                {/* <h4 className="ticket-title">View All</h4> */}
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
                <p><strong>Transaction Status:</strong> {ticket.transactionStatus }</p>
                <p><strong>Paid Amount:</strong> {ticket.paidAmount}</p>
                <p><strong>Paid Date: </strong> {ticket.orderDate}</p>
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
        {/* Zoom Modal */}
        <Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
                <Modal.Body className="text-center position-relative">
                  <div className="zoom-container">
                     {/* Close Button (X) */}    
            <button
              className="close-button text-end"
              onClick={() => setShowZoomModal(false)}
            >
              &times;
            </button>
                    <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
                  </div>
                </Modal.Body>
              </Modal>
         <Footer />
         <style jsx>
          {`
          .btn-warning {
          background: linear-gradient(45deg, #ff9800, #ff5722);
          border: none;
          transition: all 0.3s ease-in-out;
        }

        .btn-warning:hover {
          background: linear-gradient(45deg, #ff5722, #ff9800);
          transform: scale(1.05);
        }
`}
         </style>
        </>
  );
};



export default ProfilePage;