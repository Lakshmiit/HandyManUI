import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from "axios";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RouteIcon from "@mui/icons-material/Route";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OrdersIcon from '@mui/icons-material/Assignment';
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';

import Ads from './img/ads.png';
const Dashboard = () => {
    const [profile, setProfile] = useState({
        fullName: "Lakshmi Sai Service Providers",
        mobileNumber: "",
        email: "",
        address: "",
        userProfileType: "",
        status: "",
        isActive: false,
        menuDetails: [],
        photoUrl: "",
      });
      const [tickets, setTickets] = useState([]);
      const [selectedFile, setSelectedFile] = useState(null);


    //   useEffect(() => {
    //     fetchProfile();
    //     // fetchTickets();
    //   }, []); 


  
//     const fetchProfile = async () => {
//     const data = {
//       fullName: "Lakshmi Sai Service Providers",
//       mobileNumber: "1234567890",
//       email: "user@example.com",
//       address: "123, Street Name, City",
//       userProfileType: "Provider",
//       status: "Approved",
//       isActive: true,
//     //   menuDetails: [
//     //     { menuTitle: "Dashboard", menuIcon: "dashboard", targetUrl: "#" },
//     //   ],
//       photoUrl: "https://via.placeholder.com/100",
//     };
//     setProfile(data);
//   };


  const fetchUserDetails = async () => {
    const userId = sessionStorage.getItem("UserId");
    const userType = sessionStorage.getItem("UserProfileType");
    if (!userId || !userType) {
    //   window.location.href = "/logout";
      return;
    }
    try {
      const response = await axios.get(
        `https://handymanapiv2.azurewebsites.net/api/${userType}/${userType}ProfileData?profileType=${userType}&UserId=${userId}`
      );
      if (response.status === 200) {
        setProfile(response.data);
        alert(JSON.stringify(profile)); 
        fetchImageUrl(response.data.PhotoAttachmentId);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    //   window.location.href = "/logout";
    }
  }; 

  const fetchImageUrl = async (photoId) => {
    try {
      const response = await axios.get(
        `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photoId}`
      );
      if (response.status === 200) {
        setProfile((prev) => ({ ...prev, PhotoAttachmentUrl: response.data.imageData }));
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };



  const uploadFile = async () => {
    if (!profile.photoUrl) return;
    const formData = new FormData();
    formData.append("file", profile.photoUrl);
    try {
      const response = await axios.post(
        "https://handymanapiv2.azurewebsites.net/api/FileUpload/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async () => {
    if (!profile) return;
    const fileId = profile.photoUrl ? await uploadFile() : profile.PhotoAttachmentId;
    try {
      await axios.post(
        `https://handymanapiv2.azurewebsites.net/api/${profile.UserProfileType}/Edit`,
        {
          UserId: profile.UserId,
          FullName: profile.fullName,
          PhotoDocumentId: fileId,
        }
      );
      fetchUserDetails();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div
      className="container mt-4"
      style={{
        padding: "10px",
        borderRadius: "8px",
        minHeight: "100vh", 
      }}
    >
      <div className="row">
        {/* Profile Section */}
        <div className="col-md-3">
        {profile && (
          <div className="profile-section bg-light p-4 rounded-3 shadow-sm">
            <div className="text-center">
              <img
                src={profile.PhotoAttachmentUrl}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h4 className="fw-bold">{profile.FullName}</h4>
              {/* <button className="btn btn-warning m-2">Edit Profile</button> */}
            </div>
            <p className="fw-bold m-1">Mobile:</p>
            <p className="profile">{profile.phoneNumber}</p>
            <hr />
            <p className="fw-bold m-1">Email:</p>
            <p className="profile">{profile.email}</p>
            <hr />
            <p className="fw-bold m-1">Address:</p>
            <p className="profile">
            {profile.address}
            </p>
            <hr />

            <div className="text-center">
            <button 
            // onClick={handleChatClick} 
            className="text-dark no-border btn btn-warning m-3"><SupportAgentIcon /> chat with us</button>
            <button
            //   onClick={handleSupportCall}
              className="btn btn-white text-warning text-decoration-underline m-1"
            >
              Call our support
            </button>
            </div>
          </div>
          )}
        </div>

        {/* Dashboard Section */}
        <div className="col-md-9">
          <h2 className="mb-4">Dashboard</h2>
          <div className="row g-3">
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <SupportAgentIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Raise Ticket</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <PersonOutlineIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Book A Technician</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <RouteIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">
                  Track Ticket Status
                </h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <NotificationsNoneIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Notifications</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <StorefrontIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Buy Products</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <OrdersIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Orders</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <ShoppingBagIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Cart</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "#f1f7c3",
                  height: "200px", width: "200px",
                }}
              >
                <PersonIcon fontSize="large" />
                <h6 className="mt-3 text-decoration-underline">Accounts</h6>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="mt-5">
            <div className="heading-container"> 
                <h2>Tickets</h2>
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
        <tr>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                </tr>
              </tbody>
            </table>
          <img src={Ads} className="w-50 d-block mx-auto" alt="Advertisement for our product"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
