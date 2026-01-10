import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; // Add this for the required CSS.
// import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import {  Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const AdminRegistrationNumbers = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const { selectedUserType} = useParams();
  const [errorMessage, setErrorMessage] = useState('');
//   const [date, setDate] = useState('');
  const [userData, setUserData] = useState(null);
//   const [firstName, setFirstName] = useState();

 useEffect(() => {
    console.log(loading);
 }, [loading]);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); 
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

 const handleSubmit = async () => {
  if (!mobileNumber || mobileNumber.length !== 10) {
    setErrorMessage("Please enter a valid 10-digit phone number.");
    setUserData(null); 
    return;
  }

  setErrorMessage('');
  setLoading(true);

  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Customer/GuestUserExistingVerification/${mobileNumber}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const result = await response.json();
    if (result && result.length > 0) {
      const user = result[0]; 
      setUserData(user);
    } else {
      setErrorMessage("User not found.");
      setUserData(null);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    setErrorMessage("An error occurred while fetching data.");
    setUserData(null);
  } finally {
    setLoading(false);
  }
};


  return (
      <div className="d-flex flex-row justify-content-start align-items-start">
          {/* Sidebar */}
          {!isMobile && (
          <div className="ml-0 m-4 p-0 adm_mnu">
          <AdminSidebar userType={selectedUserType}/>
         </div>
          )}
          
          {/* Floating menu for mobile */}
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
                <AdminSidebar userType={selectedUserType} />
              </div>
          )}
        </div>
      )}

       {/* <div className={`container m-3 ${isMobile ? 'w-100' : 'w-70'}`}> */}
       <div className="m-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-3 text-center">Search For Registered Users</h3>
        <div className="bg-white rounded-3 p-3 bx_sdw">
          <form>
          {/* onSubmit={handleSubmit} */}
            {/* Phone Number */}
            <div className="form-group">
              <label>Phone Number <span className="req_star mb-2">*</span></label>
               <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control w-50"
                  value={mobileNumber}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                        setMobileNumber(value);
                        setUserData(null); 
                    }
                    }}
                  placeholder="Enter 10-digit Phone Number"
                />
               <button type="button" className="btn btn-primary mx-5" onClick={handleSubmit}>
                Submit
              </button>
              </div>
             {userData && !loading && (
                <>
                <h5 className="mt-2">User Details:</h5>
            <div className="bg-light p-3 rounded">
                <p className="fw-bold">First Name: <small>{userData.firstName}</small></p>
                <p className="fw-bold">Mobile Number: <small>{userData.mobileNumber}</small> </p>
                <p className="fw-bold">Date: <small>{new Date(userData.date).toLocaleDateString()}</small></p>
            </div>
            </>
            )}

              {errorMessage && (
        <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>
      )}
            </div>

            {/* Submit Button */}
            {/* <div className="d-flex justify-content-between gap-3 mt-3">
      <button
        type="submit"
        className="btn btn-success w-100 d-flex justify-content-center align-items-center p-3 shadow-lg"
      >
      </button>
    </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};
   
export default AdminRegistrationNumbers;