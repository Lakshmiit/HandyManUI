import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
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
import { TextField, IconButton } from "@mui/material"; 
import EditIcon from "@mui/icons-material/Edit";
import Banner1 from './img/banner-1 copy.jpg';
import Banner2 from './img/banner-2.jpg';
import Banner3 from './img/banner-4.jpg';
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logo from "./img/Hm_Logo 1.png";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
// import { Carousel } from 'react-bootstrap';

const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName) => {
  const customer = [
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Book A Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: 35 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` },
      { MenuIcon: <NotificationBell sx={{ fontSize: 35 }}/>, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <OrdersNotificationBell sx={{ fontSize: 35 }}/>, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}` },
      { MenuIcon: <LocalOfferIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}` },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Accounts"},
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}`}, 
  ];

  const builder = [
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Add Member" },
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise a Quote" },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Notifications" },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Buy Products", TargetUrl: "/BuyProducts" },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 35 }}/>, MenuTitle: "My Account" },
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise Ticket", TargetUrl: "/TicketRaise" },
      { MenuIcon: <RouteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Track Ticket Status" }
  ];
 
  const dealer = [
      { MenuIcon: <UploadIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Upload Products" },
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise a Quote" },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 35 }}/>, MenuTitle: "My Account" },
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
  ];

  const trader = [
    { MenuIcon: <UploadIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Upload Products" },
    { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise a Quote"},
    { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
    { MenuIcon: <StorefrontIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
    { MenuIcon: <PermIdentityIcon sx={{ fontSize: 35 }}/>, MenuTitle: "My Account" },
    { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Add Bank Account"},
    { MenuIcon: <SupportAgentIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
    { MenuIcon: <RouteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
];

  const technician = [
      { MenuIcon: <PersonAddAltIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Add Technician"},
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise a Quote", TargetUrl: `/notificationTechnician/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Notifications" ,TargetUrl:`/technicianDetailsNotifications/${userType}/${userId}/${category}/${ZipCode}/${technicianFullName}`},
      { MenuIcon: <TransferWithinAStationIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Track Technician" },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 35 }}/>, MenuTitle: "My Account"},
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon sx={{ fontSize: 35 }}/>, MenuTitle: "Track Ticket Status" }
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

const ProfilePage = () => {
    const {userId} = useParams();
    const {userType} = useParams();
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(profile.fullName);
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const menuRef = useRef(null);
    const scrollRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [productData, setProductData] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

useEffect(() => {
  console.log(showMenu, imageLoading, productData, imageUrls);
}, [showMenu, imageLoading, productData, imageUrls]);

        useEffect(() => {
          const fetchAllTickets = async () => {
            try { 
              // alert("test");
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
// useEffect(() => {
//     const fetchticketData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=raiseTicket`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch ticket data');
//         }
//         const data = await response.json();
//         //  alert(JSON.stringify(data));
//         setTicketData(data);

//         // setTicketId(data.raiseTicketId);
//         // setSubject(data.subject);
//         // setCategory(data.category);
//         // setStatus(data.internalStatus);
//         // setAssignedTo(data.assignedTo);
      
//         } catch (error) {
//         console.error('Error fetching ticket data:', error);
//       } finally {
//         setLoading(false); 
//       }
//     };
//     fetchticketData();
//   }, [userId]); 

//   useEffect(() => {
//     const fetchproductData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=buyProduct`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product data');
//         }
//         const data = await response.json();
//         //  alert(JSON.stringify(data));
//         setProductData(data);

//         // setTicketId(data.raiseTicketId);
//         // setSubject(data.subject);
//         // setCategory(data.category);
//         // setStatus(data.internalStatus);
//         // setAssignedTo(data.assignedTo);
      
//         } catch (error) {
//         console.error('Error fetching product data:', error);
//       } finally {
//         setLoading(false); 
//       }
//     };
//     fetchproductData();
//   }, [userId]); 

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/GetAllProductList`);
        const data = await response.json();
        setProductData(data);

        const imageRequests = data.map(async (product) => {
          if (product.productPhotos?.length) {
            const photo = product.productPhotos.map(async (photo) => {  
              const res = await fetch(
                `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
              );
              const imgData = await res.json();
              return { id: product.id, imageData: imgData.imageData, allPhotos: product.productPhotos };
            });
            const allImages = await Promise.all(photo);
            return { id: product.id, images: allImages };
          }
          return null;
        });

        const images = await Promise.all(imageRequests);
        const imageMap = {};
        images.forEach((img) => {
          if (img) imageMap[img.id] = img.images;
        });
        setImageUrls(imageMap);
        setImageLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, []);

  // const handleImageClick = (imageSrc) => {
  //   setZoomImage(imageSrc);
  //   setShowZoomModal(true);
  // };
  
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
            setMenuList(getMenuList(userType, userId, response.data.category, response.data.district, response.data.zipCode, response.data.fullName));

          } catch (error) {
            console.log("Error Fetching Data:", error)
          } finally {
            setLoading(false);
          }
        };
      
        fetchProfileData();
      }, [userType, userId]);
      

      useEffect(() => {
        if (category && district) {
          setMenuList(getMenuList(userType, userId, category, district, zipCode, fullName));
        }
      }, [category, district, userType, userId, zipCode, fullName]);
      

// useEffect(() => {
//   if (!userId || !userType) return;
//   const fetchProfileData = async () => {
//     if (userType === "customer") {
//       try {
//         const [customerResponse, technicianResponse, dealerResponse]= await Promise.all([
//           axios.get(`https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`),
//           axios.get(`https://handymanapiv2.azurewebsites.net/api/technician/technicianProfileData?profileType=${userType}&UserId=${userId}`),
//           axios.get(`https://handymanapiv2.azurewebsites.net/api/dealer/dealerProfileData?profileType=${userType}&UserId=${userId}`)
//         ]
//           // `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`,
//         );
//         const customerData = customerResponse.data;
//         const technicianData = technicianResponse.data;
//         const dealerData = dealerResponse.data;
  
//         if (userType === "Customer") {
//           setProfile(customerData);
//         } else if (userType === "Technician") {
//           setProfile(technicianData);
//         } else {
//           setProfile(dealerData);
//         }
//         // setProfile(response.data);
//         // setUserStatus(response.data.status);
//         // alert(response.data.status);
//         const photoId = customerData.photoAttachmentId || technicianData.photoAttachmentId || dealerData.photoAttachmentId;
  
//         if (photoId) {
//           fetchImageUrl(photoId);
//         }
//       } 
//     } catch (err) {
//       setError(err.message);
//     } finally { 
//       setLoading(false);
//     }
//   };

//   fetchProfileData();
// }, [userType, userId]);

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
  const handleEditClick = () => setIsEditing(true);
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

  const handleProfileClick = () => {
    fileInputRef.current.click(); 
  };

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
  
 if (loading) return 
//  <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  // const updatedMenuList = getMenuList(userType, userId).map(menu => ({
  //   ...menu,
  //   url: userStatus === "Pending" ? "#" : menu.url,
  // }));
  
  return (
    <>
    <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm">
        <img className="h-90" src={Logo} alt="Handy Man Logo" style={{ height: "60px", width: "auto", paddingLeft: "10px" }}/>
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
        <div className="profile-button"
        //  onClick={handleMoreIconClick} 
          style={{ cursor: "pointer" }}>
      <div className="profile-img-container">
  <div className="profile-img-wrapper">
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
      onClick={handleProfileClick}
    />
  </div>
  {/* <NotificationBell /> */}
</div>


          {/* <AccountCircleIcon fontSize="large" /> */}
        </div>
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

      {isMobile ? (
        <div>
      {/* More Icon */}
      <div className="mob-menu">
      {/* <NotificationBell /> */}
      <div className="profile-button" onClick={handleMoreIconClick} 
          style={{ cursor: "pointer" }}>
          <MoreVertIcon fontSize="large" />
        </div>
      </div>
      </div>
      ) : null}

    
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
        {/* Profile Section */}
        <div className="col-md-3">
        {/* {profile && ( */}
        <div>
      
      {!isMobile ? (
        // <div className="row">
        // <div className="col-md-3">
                   <div className="profile-card">
                     <div className="profile-img-container "> 
                   <div className="profile-container"> 
             <div className="profile-info">
               <div className="webprofile-section">
               <div className="text-warning cust-name">Welcome <br /> 
               <p className="text-dark">{profile.fullName}{" "}</p></div>
                   <div className="fw-bold fs-3">Lakshmi Sai Service Providers</div>
                   <div className="text-warning fs-3">{profile.userProfileType}</div>
                   <div className="webprofile-img-wrapper">
                     <img src={profileImage} alt="Profile" 
                     className="webprofile-img" onClick={handleProfileClick}/>
                     <input
                       type="file"
                       ref={fileInputRef}
                       style={{ display: "none" }}
                       accept="image/*"
                       // onChange={handleFileChange}
                     />
                    </div>
                 <div className="label fw-bold fs-5">Name</div>
                 {isEditing ? (
                   <TextField
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     variant="outlined"
                     size="small"
                   />
                 ) : (
                   <p className="value">
                     {profile.fullName}
                     <IconButton size="small" onClick={handleEditClick}>
                       <EditIcon fontSize="small" />
                     </IconButton>
                   </p>
                 )}
                  <hr />
               {/* </div>
       
               <div className="profile-section"> */}
                 <div className="label fw-bold fs-5">Mobile</div>
                 <p className="value">{profile.mobileNumber}</p>
               <hr />
                 <div className="label fw-bold fs-5">Email</div>
                 <p className="value">{profile.email}</p>
              <hr />
                 <div className="label fw-bold fs-5">Address</div>
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
          {/* Wrap profile-card and profile-info inside a parent div */}
          <div className="row">
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
              /> */}
              </div>
              <div className="profile-info">
                {isEditing ? (
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
                    {/* <div className="edit-icons d-flex">
                      <IconButton onClick={handleCancel} color="error">
                        <CancelIcon />
                      </IconButton>
                      <IconButton onClick={handleSave} color="success">
                        <CheckCircleIcon />
                      </IconButton>
                    </div> */}
                  </div>
                ) : (
                  <div className="name-section">
                    <div className="fw-bold">Name</div>
                    <p>
                      {profile.fullName}{" "}
                      <IconButton size="small" onClick={handleEditClick}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </p>
                    <hr />
                    {/* <p className="text-warning text-center">customer</p> */}
                    <div className="fw-bold">Mobile</div>
                    <p className="profile">{profile.mobileNumber}</p>
                    <hr />
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
                    <div className="logout-btn" onClick={() => window.location.href = "https://handymanserviceproviders.com/Logout"}>
                      <LogoutIcon />
                      <span>Logout</span>
                    </div>
                    
                    {/* Logout Button */}
                    {/* <p className="logout-btn" onClick={`https://handymanserviceproviders.com`}>
                      <LogoutIcon />
                      <span>Logout</span>
                    </p> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
        </div>
        </div>
         </div> 
        {/* Dashboard Section */}
        {/* {loadingStatus ? (
          <p>Loading...</p>
        ) : (
          <>
          {userStatus === "pending" && (
            <div className="alert alert-warning text-start">
              <strong></strong>
              </div>
          )} */}
          {isMobile && (
            <div>
            <div className="text-warning cust-fullname fs-5 mt-1">Welcome <br /> <strong className="text-dark">{profile.fullName}{" "}</strong></div>
            <div className="fw-bold fs-5">Lakshmi Sai Service Providers</div>
            <div className="text-warning fs-4">{profile.userProfileType}</div>
            </div>
          )}
        <div className="col-md-9 bg-white">
          <h5 className="mb-2 fs-4">Dashboard</h5>
          <div className="row g-2">
    {menuList.map((menu, index) => (
        <div className="col-4 col-sm-4 col-md-3" key={index}>
            <a href={menu.TargetUrl} className="text-decoration-none" style={{ color: "inherit" }}>
                <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined custom-icon">
                        {menu.MenuIcon} 
                    </span>
                    <span>{menu.MenuTitle}</span>
                </div>
            </a>
        </div>
    ))}
</div>
                {/* </>
                )} */}
              <div className="ticket-container">
                <div className="ticket-header">
                <h4 className="ticket-title">My Tickets</h4>
                {/* <h4 className="ticket-title">View All</h4> */}
                </div>
      <div className="ticket-scroll" ref={scrollRef}>
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

              {/* <div className="scrolling-wrapper auto-scroll py-3">
          {productData && productData.map((product) => {
            const discountedPrice = product.rate && product.discount
              ? ((product.rate - (product.rate * product.discount) / 100).toFixed(0))
              : product.rate;

            return (
              <div key={product.id} className="me-1" style={{ minWidth: "250px" }}>
                <div className="card w-100">
                  {imageLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '250px', background: '#f8f9fa' }}
                    >
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
                            className="card-img-top rounded-top zoomable-image"
                            style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
                            alt={`product-image-${index}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '250px', background: '#f8f9fa' }}
                    >
                      No Image
                    </div>
                  )}
                    <div className="card-title fw-bold">{product.productName}</div>
                    <div className="card-text fw-bold text-primary fs-5">Rs: {discountedPrice}</div>
                    <div className="card-text fw-bold text-muted fs-6" style={{ textDecoration: 'line-through' }}>MRP: Rs {product.rate}</div>
                    <div className="card-text fw-bold text-danger fs-6">Discount: {product.discount}%</div>
                    <div className="card-text fw-bold text-dark fs-5">Free Delivery and Installation</div>
                </div>
              </div>
            );
          })}
        </div> */}

        </div>
        </div> 
        </div>
         <Footer />
        </>
  );
};

export default ProfilePage;