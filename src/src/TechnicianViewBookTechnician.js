import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';

import {  Dashboard as MoreVertIcon } from '@mui/icons-material';
// import { FaEdit} from 'react-icons/fa'; // Correct icon import
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import ForwardIcon from '@mui/icons-material/Forward';
// import { FaEye } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
const TechnicianViewBookTechnician = () => {
  const navigate = useNavigate(); 
const {userType} = useParams();
const {userId} = useParams();
const {technicianName} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // const [error, setError] = useState("");

  const [jobDescription, setJobDescription] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [technicianData, setTechnicianData] = useState('');
  const [bookTechnicianId, setBookTechnicianId] = useState('');
 const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const {raiseTicketId} = useParams();
 const [loading, setLoading] = useState(true);
 const [paymentMode, setPaymentMode] = useState('');
 const [totalAmount, setTotalAmount] = useState('');
 const [state, setState] = useState('');
 const [district, setDistrict] = useState('')
 const [customerId, setCustomerId] = useState(''); 
  const [zipCode,setZipCode]=useState('');
  const [customerName, setCustomerName] = useState("");
  const [rate, setRate] = useState('');
  const [discount, setDiscount] = useState('');
  const [afterDiscount, setAfterDiscount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
  const [paymentTransactionDetails, setPaymentTransactionDetails] = useState('');
  // const [paymentType, setPaymentType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [technicianPincode, setTechnicianPincode] = useState("");
  const [technicianFullName, setTechnicianName] = useState([]);
  const [isForwardDisabled, setIsForwardDisabled] = useState(false);
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  
 
  useEffect(() => {
    console.log(technicianData);
  }, [technicianData]);

  useEffect(() => {
    const fetchtechnicianData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnician/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch technician data');
        }
        const data = await response.json();
        //  alert(JSON.stringify(data));
        setTechnicianData(data);
        setJobDescription(data.jobDescription);
        setCategory(data.category);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setBookTechnicianId(data.bookTechnicianId);
        setTotalAmount(data.afterDiscount);
        setPaymentMode(data.paymentMode);
        setCustomerId(data.customerId);
        setCustomerName(data.customerName);
        setEmailAddress(data.customerEmail);
        setState(data.state);
        setDistrict(data.district);
        setZipCode(data.zipCode);
        setRate(data.rate);
        setDiscount(data.discount);
        setAfterDiscount(data.afterDiscount);
        setRemarks(data.remarks);
        setMoreInfo(data.moreInfo);
         setStatus(data.status);
         setAssignedTo (data.assignedTo);
        setTechnicianConfirmationCode(data.technicianConfirmationCode);
        setPaymentTransactionDetails(data.utrTransactionNumber);
      } catch (error) {
        console.error('Error fetching technician data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchtechnicianData();
  }, [raiseTicketId]); 

useEffect(() => {
            if (!userId || !userType) return;
            const fetchProfileData = async () => {
              try {
                let apiUrl = "";
             
                  apiUrl = `https://handymanapiv2.azurewebsites.net/api/technician/technicianProfileData?profileType=${userType}&UserId=${userId}`;
                
                if (!apiUrl) return;
                const response = await axios.get(apiUrl);
                //setProfile(response.data); 
                setTechnicianPincode(response.data.zipCode);
                setTechnicianName(response.data.fullName);                
                  
              } catch (error) {
                console.log("Failed to fetch the data: ", error);
              } finally {
                setLoading(false);
              }
            };
          
            fetchProfileData();
          }, [userType, userId]);
          


  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechnicianData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleAssignedToChange = (e) => {
  //   const selectedAssignedTo = e.target.value;
  //   setAssignedTo(selectedAssignedTo);

    
  //   if (selectedAssignedTo) {
  //     setError("");
  //   }
  // };

  // const handlePaymentTransactionDetailsChange = (e) => {
  //   const value = e.target.value;
  //   setPaymentTransactionDetails(value);
  //   setPaymentType("");
  //   setError("");
  // };

//   const handlePaymenTypeChange = (e) => {
//     const selectedPayment = e.target.value;
//     setPaymentType(selectedPayment);
//     // setPaymentTransactionDetails("");
//     setError("");
// };

 
  if (loading) {
    return <div>Loading...</div>;
  }

const handleUpdateJobDescription = async (e) => {
  e.preventDefault();
  setIsForwardDisabled(true);
// if (paymentMode === "technician") {
//   if (!paymentType) {
//     setError("Please select atleast one.");
//     return;
//   }
//   // }
//   // alert(`Payment method selected: ${paymentType || "Transaction Details entered"}`);
//   // return;
// }

 
  const payload2 = {
    id: raiseTicketId,  
    bookTechnicianId: bookTechnicianId,
    date: new Date(),
    customerName: customerName,
    address: address,
    state: state,
    district: district,
    zipCode: zipCode,
    category: category,
    jobDescription: jobDescription,
    rate: rate,
    discount: discount,
    afterDiscount: afterDiscount,
    remarks: remarks,
    moreInfo: moreInfo,
    status: "Assigned",
    customerId: customerId,
    CustomerEmail: emailAddress,
    assignedTo: "Customer",
    phoneNumber: phoneNumber,
    paymentMode: paymentMode,
    approvedAmount: afterDiscount,
    UTRTransactionNumber: paymentTransactionDetails || "",
    // paymentType === "Pay Online" ? "online" : paymentType === "Cash" ? "cash" : paymentTransactionDetails || "",
    technicianConfirmationCode: technicianConfirmationCode,
    OrderId: "",
    OrderDate: "",
    PaidAmount: "",
    TransactionStatus: "", 
    TransactionType: "",
    InvoiceId: "",
    InvoiceURL: "",
    TechnicianPincode: zipCode,
    TechnicianName: [technicianFullName],
    TechnicianFullName: technicianName,
  };

  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/${raiseTicketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload2),
    });

    if (!response.ok) {
      throw new Error('Failed to forward Customer.');
    }
  //   if ((paymentMode === "technician" && paymentType === "Cash") || 
  //   (paymentMode === "technician" && paymentType === "Pay Online")) {
  //     if (paymentType === "Pay Online") {
  //     alert(`We are redirecting to Payment Page!`);
  //     window.location.href = `https://handymanserviceproviders.com/PaymentPage/${raiseTicketId}`;
  //   }  
  //   else {
  //     alert("Ticket Forwarded to Customer Care Successfully!");
  //     navigate(`/bookTechnicianCustomerGrid/${userType}/${userId}`);
  //   }
  // }
  //   if (paymentMode === "online") {
  //     alert("Ticket Forwarded to Customer Care Successfully!");
  //     navigate(`/technicianGridDetails/${userType}/${userId}/${category}/${zipCode}/${technicianName}`);
  //     return;
  //   }
     alert("Ticket Forwarded to Customer Successfully!");
     navigate(`/technicianGridDetails/${userType}/${userId}/${category}/${zipCode}/${technicianName}`);

    //  navigate(`/profilePage/${userType}/${userId}`);
  // window.location.href = `https://handymanapiv2.azurewebsites.net/CustomerProfilePage?ReactToken=${customerId}$${userType}`;
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to forward Customer. Please try again later.');
  }
};

  // const handleForwardTicket = async () => {
  //   try {
  //     const updatedTicket = {
  //       ...ticketData,
  //       status: "Assigned",
  //       assignedTo: "",
  //     };
  //     setTicketData(updatedTicket);
  //     alert("Ticket Forwarded successfully to Technician");
  //   } catch (error) {
  //     console.error("Error Forwarding ticket:", error);
  //     alert("Failed to forward the ticket. Please try again.")
  //   }
  // }; 

  return (
    <div>
  {isMobile && <Header />}
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className=" ml-0 p-0 sde_mnu">
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

      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
        <h1 className="text-center mb-2">Technician Action View Book a Technician</h1>
        <Form>
        <Row>
            <Col md={6}>
            <Form.Group>
                <label>Ticket ID</label>
                <Form.Control
                type="text"
                name="bookTechnicianId"
                value={bookTechnicianId}
                onChange={handleChange}
                placeholder='Ticket Number'
                required
                />
            </Form.Group>
            </Col>
            </Row>
      
        {/* Status
                  <Col md={6}>
                    <Form.Group>
                      <label>Status</label>
                      <Form.Control
                        as="select"
                        name="status"
                        value={ticketData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option>Open Tickets</option>
                        <option>Assigned</option>
                        <option>Pending Tickets</option>
                        <option>Closed Tickets</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row> */}


                {/* Category */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Category</label>
              <Form.Control
                type="text"
                name="category"
                value={category}
                onChange={handleChange}
                placeholder="Category"
                readOnly
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Job Description */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Job Description</label>
              <Form.Control
                type="text"
                name="jobDescription"
                value={jobDescription}
                onChange={handleChange}
                placeholder="Job Description"
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Total Amount */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Total Amount</label>
              <Form.Control
                type="text"
                name="totalAmount"
                value={totalAmount}
                onChange={handleChange}
                placeholder="Total Amount"
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Technician Confirmation Code */}
                <Form.Group>
                  <label>Technician Confirmation Code</label>
                  <Form.Control
                    name="technicianConfirmationCode"
                    value={technicianConfirmationCode}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Technician Confirmation Code"
                    readOnly
                  />
                </Form.Group>
        
                {/* Payment Mode */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Payment Mode</label>
                      <Form.Control
                        type="text"
                        name="paymentMode"
                        value={paymentMode}
                        onChange={handleChange}
                        placeholder="Payment Mode"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* {paymentMode === "technician" && (
                  <>
                  {/* <div className="form-group">
                <label>Payment Transaction Details<span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="paymentTransactionDetails"
                  value={paymentTransactionDetails}
                  onChange={handlePaymentTransactionDetailsChange}                
                  placeholder="Payment Transaction Details"
                  disabled={paymentType === "Pay Online"}
                   required
                />
              {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>} 
              </div> */}
              {/* <div className='radio'>
                 <label className='m-1'>
                  <input className='form-check-input m-1 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Cash"
                  checked={paymentType === "Cash"}
                  onChange = {handlePaymenTypeChange}
                  // disabled={paymentType === "Pay Online"}
                  required
                  /> 
                  Cash
                </label> */}
                {/* <label className='m-1'>
                  <input className='form-check-input m-2 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Transaction Details"
                  checked={paymentType === "Transaction Details"}
                  onChange = {handlePaymenTypeChange}
                  required
                  />
                  Transaction Details
                </label> 

                <label className='m-1'>
                  <input className='form-check-input m-1 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Pay Online"
                  checked={paymentType === "Pay Online"}
                  onChange = {handlePaymenTypeChange}
                  // disabled={paymentType === "Cash"}
                  required
                  />
                  Pay Online
                </label>
              </div>
              {error && (
                  <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
                )}
                </>
                )} */}
                
                
                

              
        {/* Phone Number
        <Form.Group>
          <label>Phone Number</label>
          <Form.Control
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            rows="4"
            placeholder="Phone Number"
            readOnly
          />
        </Form.Group> */}

        {/* Customer Address*/}
        <Row>
          <Col md={12}>
            <Form.Group> 
              <label>Customer Address</label>
              <Form.Control
                as = "textarea"
                type="text"
                name="address"
                // value={`${address}, ${district}, ${state}, ${zipCode}, ${phoneNumber}`}
                value={[address, district, state, zipCode, phoneNumber]
                  .filter(Boolean) 
                  .join(", ")} 
                onChange={handleChange}
                placeholder="Customer Address"
                readOnly
              />
              {/* <Form.Control
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            rows="4"
            placeholder="Phone Number"
            readOnly
          /> */}
            </Form.Group>
          </Col>
        </Row>
                {/* Technician Pincode */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Technician Pincode</label>
                      <Form.Control
                        type="text"
                        name="technicianPincode"
                        value={technicianPincode}
                        onChange={handleChange}
                        placeholder="Technician Pincode"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Technician Name */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Technician Name</label>
                      <Form.Control
                        type="text"
                        name="technician Name"
                        value={technicianName}
                        onChange={handleChange}
                        placeholder="Technician Name"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
        
        {/* Assigned To */}
        <Row>
        <Col md={12}> 
            <Form.Group>
              <label>Assigned To</label>
              <Form.Control
                name={assignedTo}
                value="Customer"
                readOnly
              >
              </Form.Control>
              {/* {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>} */}
            </Form.Group>
          </Col>
        </Row>

      
        {/* Save Button */}
        <div className="mt-4 text-end">
        <Link to={`/technicianDetailsNotifications/${userType}/${userId}/${category}/${technicianPincode}/${technicianName}`}
         className="btn btn-warning text-white mx-2" title="Back">
          <ArrowLeftIcon />
        </Link>

          {/* <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link> */}
          {/* <Button onClick={handleForwardTicket} className="btn btn-warning text-white mx-2" title='Forward'
          disabled={status === "Assigned" && assignedTo === "Technical Agency"}>
            <SaveAsIcon />
          </Button> */}
          <Button className="btn btn-warning text-white mx-2" onClick={handleUpdateJobDescription} 
          title="Forward" disabled = {isForwardDisabled || (status === "Assigned" && assignedTo === "Customer") || (status === "Closed" && assignedTo === "Customer Care") }>
            <ForwardIcon />
          </Button>

        </div>
        </Form>
        <Footer /> 

        </div>
        {/* Styles for floating menu */}
<style jsx>{`
        .floating-menu {
          position: fixed;
          top: 80px; /* Increased from 20px to avoid overlapping with the logo */
          left: 20px; /* Adjusted for placement on the left side */
          z-index: 1000;
        }
        .menu-popup {
          position: absolute;
          top: 50px; /* Keeps the popup aligned below the floating menu */
          left: 0; /* Aligns the popup to the left */
          background: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 200px;
        }
      `}</style>
      </div>
    </div>
  );
};

export default TechnicianViewBookTechnician;
