import React, { useState, useEffect } from 'react';
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
const CustomerBookTechnicianQuotation = () => {
  const navigate = useNavigate(); 
const {userType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState("");
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
  const [assignedTo] = useState('');
  const [paymentTransactionDetails, setPaymentTransactionDetails] = useState('');
  const [paymentType, setPaymentType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [technicianFullName, setTechnicianFullName] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [technicianPincode, setTechnicianPincode] = useState("");

 
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
        setTechnicianConfirmationCode(data.technicianConfirmationCode);
        setTechnicianFullName(data.technicianFullName);
        setTechnicianPincode(data.technicianPincode);
        setTechnicianName(data.technicianName);
        setPaymentTransactionDetails(data.utrTransactionNumber);
      } catch (error) {
        console.error('Error fetching technician data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchtechnicianData();
  }, [raiseTicketId]); 


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

  const handlePaymenTypeChange = (e) => {
    const selectedPayment = e.target.value;
    setPaymentType(selectedPayment);
    // setPaymentTransactionDetails("");
    setError("");
};

 
  if (loading) {
    return <div>Loading...</div>;
  }

const handleUpdateJobDescription = async (e) => {
  e.preventDefault();
if (paymentMode === "technician") {
  if (!paymentType) {
    setError("Please select atleast one.");
    return;
  }
}

 
  const payload = {
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
    assignedTo: "Customer Care",
    phoneNumber: phoneNumber,
    paymentMode: paymentMode,
    approvedAmount: afterDiscount,
    UTRTransactionNumber: paymentType === "Pay Online" ? "online" : paymentType === "Cash" ? "cash" : paymentTransactionDetails || "",
    technicianConfirmationCode: technicianConfirmationCode,
    OrderId: "",
    OrderDate: "",
    PaidAmount: "",
    TransactionStatus: "", 
    TransactionType: "",
    InvoiceId: "",
    InvoiceURL: "",
    TechnicianPincode: technicianPincode,
    TechnicianName: technicianName,
    TechnicianFullName: technicianFullName,
  }; 

  const payload1 = {
    ...payload, 
    status: paymentType === "Pay Online" ? "Draft" : "Closed",
  };

  try {
    let response
    if (paymentMode === "technician" && (paymentType === "Cash" || paymentType === "Pay Online")) {
        response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/${raiseTicketId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload1),
        });
    
        if (!response.ok) {
          throw new Error('Failed to forward Customer Care.');
        }
        if (paymentType === "Pay Online") {
        window.alert(`We are redirecting to Payment Page!`);
      window.location.href = `https://handymanserviceproviders.com/PaymentPage/${raiseTicketId}`;
    }  else {
      alert("Ticket Forwarded to Customer Care Successfully!");
      navigate(`/bookTechnicianCustomerGrid/${userType}/${customerId}`);
    } 
  } else if (paymentMode === "online") {
      response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/${raiseTicketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload1),
      });
  
      if (!response.ok) {
        throw new Error('Failed to forward Customer Care.');
      }
      window.alert("Ticket Forwarded to Customer Care Successfully!");
      navigate(`/bookTechnicianCustomerGrid/${userType}/${customerId}`);
      return;
    } 
    else {
      alert("Ticket Forwarded to Customer Care Successfully!");
      navigate(`/bookTechnicianCustomerGrid/${userType}/${customerId}`);
    }
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to forward Customer Care. Please try again later.');
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
        <h1 className="text-center mb-2">Book a Technician Action View</h1>
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

                <Form.Group>
                  <label>Technician Name</label>
                  <Form.Control
                    name="technicianFullName"
                    value={technicianFullName}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Technician Name"
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

                 <div className="form-group">
                <label>Payment Transaction Details<span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="paymentTransactionDetails"
                  value={paymentTransactionDetails}
                  // onChange={handlePaymentTransactionDetailsChange}                
                  placeholder="Payment Transaction Details"
                  // disabled={paymentType === "Pay Online"}
                   readOnly
                />
              </div>

                {paymentMode === "technician" && (
                  <>
              <div className='radio'>
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
                </label>
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
                </label> */}

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
                )}
                
                
                

              
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
                value={`${address}, ${district}, ${state}, ${zipCode}, ${phoneNumber}`}
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

        
        
        {/* Assigned To */}
        <Row>
        <Col md={12}> 
            <Form.Group>
              <label>Assigned To</label>
              <Form.Control
                name={assignedTo}
                value="Customer Care"
                readOnly
              >
              </Form.Control>
              {/* {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>} */}
            </Form.Group>
          </Col>
        </Row>

      
        {/* Save Button */}
        <div className="mt-4 text-end">
        <Link to={`/customerNotification/${userType}/${customerId}`} className="btn btn-warning text-white mx-2" title="Back">
          <ArrowLeftIcon />
        </Link>

          {/* <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link> */}
          {/* <Button onClick={handleForwardTicket} className="btn btn-warning text-white mx-2" title='Forward'
          disabled={status === "Assigned" && assignedTo === "Technical Agency"}>
            <SaveAsIcon />
          </Button> */}
          <Button className="btn btn-warning text-white mx-2" onClick={handleUpdateJobDescription} title="Forward">
            <ForwardIcon />
          </Button>

        </div>
        </Form>
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

      <Footer /> 
    </div>
  );
};

export default CustomerBookTechnicianQuotation;
