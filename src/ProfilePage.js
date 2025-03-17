import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from "axios";
// import Footer from './Footer.js';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RouteIcon from "@mui/icons-material/Route";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OrdersIcon from '@mui/icons-material/Assignment';
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { TextField, IconButton } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
// import Header from "./Header";
import HandyMan from './img/HandyMan.jpeg';
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logo from "./img/Hm_Logo 1.png";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const getMenuList = (userType, userId, ProductOwnedBy, category, district ) => {
  const customer = [
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon />, MenuTitle: "Book A Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` },
      { MenuIcon: <NotificationsNoneIcon />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <OrdersIcon />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}` },
      { MenuIcon: <LocalOfferIcon />, MenuTitle: "Offers", TargetUrl: "" },
      { MenuIcon: <PersonIcon />, MenuTitle: "Accounts", TargetUrl: "" }
  ];

  const builder = [
      { MenuIcon: <PersonIcon />, MenuTitle: "Add Member", TargetUrl: "" },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
      { MenuIcon: <NotificationsNoneIcon />, MenuTitle: "Notifications", TargetUrl: "" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: "/BuyProducts" },
      { MenuIcon: <PersonIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: "/TicketRaise" },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: "" }
  ];
 
  const dealer = [
      { MenuIcon: <UploadIcon />, MenuTitle: "Upload Products", TargetUrl: `/product-list/${ProductOwnedBy}` },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
      { MenuIcon: <NotificationsNoneIcon />, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${category}/${district}/${userId}` },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <PersonIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
  ];

  const trader = [
    { MenuIcon: <UploadIcon />, MenuTitle: "Upload Products", TargetUrl: `/product-list/${ProductOwnedBy}` },
    { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: "" },
    { MenuIcon: <NotificationsNoneIcon />, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${category}/${district}/${userId}` },
    { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
    { MenuIcon: <PersonIcon />, MenuTitle: "My Account", TargetUrl: "" },
    { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
    { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
    { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
];

  const technician = [
      { MenuIcon: <PersonIcon />, MenuTitle: "Add Technician", TargetUrl: "" },
      { MenuIcon: <RequestQuoteIcon />, MenuTitle: "Raise a Quote", TargetUrl: `/notificationTechnician/${userType}/${category}/${district}/${userId}` },
      { MenuIcon: <NotificationsNoneIcon />, MenuTitle: "Notifications", TargetUrl: "" },
      { MenuIcon: <TransferWithinAStationIcon />, MenuTitle: "Track Technician", TargetUrl: "" },
      { MenuIcon: <PersonIcon />, MenuTitle: "My Account", TargetUrl: "" },
      { MenuIcon: <AccountBalanceIcon />, MenuTitle: "Add Bank Account", TargetUrl: "" },
      { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon />, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
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
    const menuList = getMenuList(userType, userId);
    const [profile, setProfile] = useState({});
      // const [ticketData, setTicketData] = useState([]);
      // const [selectedFile, setSelectedFile] = useState(null);
      const [isEditing, setIsEditing] = useState(false);
      const [name, setName] = useState(profile.fullName);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [profileImage, setProfileImage] = useState(null);
      const fileInputRef = useRef(null);
      const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        const [showDropdown, setShowDropdown] = useState(false);
        const [showMenu, setShowMenu] = useState(false);
        const [showProfile, setShowProfile] = useState(false);
      // const [ticketId, setTicketId] = useState("");
      // const [subject, setSubject] = useState("");
      // const [category, setCategory] = useState("");
      // const [status, setStatus] = useState("");
      // const [assignedTo, setAssignedTo] = useState("");
      const [allTickets, setAllTickets] = useState([]);
      // const [userStatus, setUserStatus] = useState(null);
      // const [loadingStatus, setLoadingStatus] = useState(true);


        const menuRef = useRef(null);

        const scrollRef = useRef(null);
useEffect(() => {
  console.log(showMenu);
}, [showMenu]);

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
              // alert(ticketData);
      
              setAllTickets([...ticketData, ...productData, ...technicianData]);
              // alert(JSON.stringify(allTickets));
            } catch (error) {
              console.error("Error fetching ticket, product and technician data:", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchAllTickets();
        }, [userId]);
      

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
      
            if (response.data.photoAttachmentId) {
              fetchImageUrl(response.data.photoAttachmentId);
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
      
        fetchProfileData();
      }, [userType, userId]);
      

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
  
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // const updatedMenuList = getMenuList(userType, userId).map(menu => ({
  //   ...menu,
  //   url: userStatus === "Pending" ? "#" : menu.url,
  // }));
  
  return (
    <>
    <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm">
        <img className="h-100" src={Logo} alt="Handy Man Logo" style={{ height: "60px", width: "auto" }}/>
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

      <div className="user-profile">
      
      {/* {!isMobile ? (
        <div className="profile-details">
          <h2>{profile.fullName}</h2>
          <p><strong>Mobile:</strong> {profile.mobileNumber}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <div className="logout" onClick={() => console.log("Logging out...")}>
            <LogoutIcon /> Logout
          </div>
        </div>
      ) : ( )} */}
        <div>
      {/* More Icon */}
      <div className="mob-menu">
      <div className="profile-button" onClick={handleMoreIconClick} 
          style={{ cursor: "pointer" }}>
          <MoreVertIcon fontSize="large" />
        </div>
        {/* <span
          className="more-icon"
          style={{ cursor: "pointer" }}
          onClick={handleMoreIconClick}
        >
          {/* <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="MoreVertIcon"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
          </svg> 
        </span> */}
      </div>
      </div>
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
      className="container m-2"
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
          <div>
            <p className="text-warning">Welcome <strong className="text-dark">{profile.fullName}{" "}</strong></p>
            <h5 className="fw-bold">Lakshmi Sai Service Providers</h5>
            <p className="text-warning">{profile.userProfileType}</p>

          </div>
          </div>
          <div>
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
                    <p className="fw-bold">Name</p>
                    <p>
                      {profile.fullName}{" "}
                      <IconButton size="small" onClick={handleEditClick}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </p>
                    <hr />
                    {/* <p className="text-warning text-center">customer</p> */}
                    <p className="fw-bold">Mobile</p>
                    <p className="profile">{profile.mobileNumber}</p>
                    <hr />
                    <p className="fw-bold">Email</p>
                    <p className="profile">{profile.email}</p>
                    <hr />
                    <p className="fw-bold">Address</p>
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
                    <p className="logout-btn" onClick={() => window.location.href = "https://handymanserviceproviders.com/Logout"}>
                      <LogoutIcon />
                      <span>Logout</span>
                    </p>
                    
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

        <div className="col-md-9 bg-white">
          <h5 className="mb-2">Dashboard</h5>
          <div className=" row g-3">
    {menuList.map((menu, index) => (
        <div className="col-4 col-sm-4 col-md-3" key={index}>
            <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center p-2" >
                <span  className="material-symbols-outlined" style={{ fontSize: "30px" }}>
                    {menu.MenuIcon} {/* Assuming icon is provided as text, e.g., "support_agent" */}
                </span>
                <a href={menu.TargetUrl} className="menu-item-link mt-2">
                    <span style={{cursor: "pointer"}}>{menu.MenuTitle}</span>
                </a>
            </div>
        </div>
    ))}
</div>

                {/* </>
                )} */}
              <div className="ticket-container">
                <div className="ticket-header">
                <h4 className="ticket-title">My Tickets</h4>
                <h4 className="ticket-title">View All</h4>
                </div>
      <div className="ticket-scroll" ref={scrollRef}>
      {loading ? (
        <p>Loading Tickets...</p>
      ) : allTickets.length > 0 ? (
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
                {/* <p><strong>Date:</strong> {ticket.date ? ticket.date.split("T")[0] : "N/A"}</p> */}
                <p><strong>Date:</strong> {ticket.date ? new Date(ticket.date).toLocaleDateString('en-GB') : "N/A"}</p>
                <p><strong>Transaction Status:</strong> {ticket.transactionStatus }</p>
                <p><strong>Paid Amount:</strong> {ticket.paidAmount}</p>
                <p><strong>Paid Date: </strong> {ticket.orderDate}</p>
              </div>
            </div>
          ))
        ) : ( 
          <p>No tickets found for this {userType}.</p>
        )}
      </div>
    </div>
            
          {/* Tickets Section */}
          {/* <div className="mt-5">
            <div className="heading-container"> 
                <h2> My Tickets</h2>
                <div className="underline"></div>
            </div>
          <table className="table table-bordered mt-3">
          <thead className="table-white">
          <tr>
            <th>Ticket ID</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
        {tickets.length > 0 ? tickets.map((ticket, index) => (
          <tr key={index}>
            <td>{ticket.id}</td>
            <td>{ticket.subject}</td>
            <td>{ticket.category}</td>
            <td>{ticket.status}</td>
            <td>{ticket.assignedTo}</td>
          </tr>
        )) : (
          <tr><td colSpan="5">No tickets found for this customer.</td></tr>
        )}
      </tbody>
            </table>
            </div> */}
          
          <img src={HandyMan} className="w-100 m-2 d-block mx-auto" alt="Advertisement for our product"/>
          
        </div>
        </div>
        </div>
        {/* <Footer /> */}
        </>
  );
};

export default ProfilePage;
