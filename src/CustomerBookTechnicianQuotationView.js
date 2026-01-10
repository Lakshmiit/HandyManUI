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
// import ForwardIcon from '@mui/icons-material/Forward';
// import { FaEye } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import './App.css';
const CustomerBookTechnicianQuotation = () => {
//   const Navigate = useNavigate(); 
const {userType} = useParams();
// const {customerId} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
 const [userId, setCustomerId] = useState(''); 
  const [zipCode,setZipCode]=useState('');
  // const [customerName, setCustomerName] = useState("");
  // const [rate, setRate] = useState('');
  // const [discount, setDiscount] = useState('');
  const [afterDiscount, setAfterDiscount] = useState('');
  // const [remarks, setRemarks] = useState('');
  // const [moreInfo, setMoreInfo] = useState('');
  const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [UTRTransactionNumber, setPaymentTransactionDetails] = useState('');
  // const [paymentType] = useState("");
  const [OrderId, setOrderId] = useState("");
    const [OrderDate, setOrderDate] = useState("");
    const [PaidAmount, setPaidAmount] = useState("");
    const [TransactionStatus, setTransactionStatus] = useState("");
    const [TransactionType, setTransactionType] = useState("");
    // const [InvoiceId, setInvoiceId] = useState("");
    // const [InvoiceURL, setInvoiceURL] = useState("");
  
  useEffect(() => {
    console.log(technicianData, afterDiscount);
  }, [technicianData, afterDiscount]);

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
        //  alert(userType);
        // setCustomerName(data.customerName);
        setState(data.state);
        setDistrict(data.district);
        setZipCode(data.zipCode);
        // setRate(data.rate);
        // setDiscount(data.discount);
        setAfterDiscount(data.afterDiscount);
        // setRemarks(data.remarks);
        // setMoreInfo(data.moreInfo);
        setTechnicianConfirmationCode(data.technicianConfirmationCode);
        setPaymentTransactionDetails(data.utrTransactionNumber);
        //(paymentTransactionDetails);
        setAssignedTo(data.assignedTo);
        setOrderId(data.orderId);
        setOrderDate(data.orderDate);
        setPaidAmount(data.paidAmount);
        setTransactionStatus(data.transactionStatus);
        setTransactionType(data.transactionType);
        // setInvoiceId(data.invoiceId);
        // setInvoiceURL(data.invoiceURL);

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
 
//   if (loading) {
//     return <div>Loading...</div>;
//   }

// const handleUpdateJobDescription = async (e) => {
//   e.preventDefault();

//   const payload2 = {
//     id: raiseTicketId,  
//     bookTechnicianId: bookTechnicianId,
//     date: new Date(),
//     customerName: customerName,
//     address: address,
//     state: state,
//     district: district,
//     zipCode: zipCode,
//     category: category,
//     jobDescription: jobDescription,
//     rate: rate,
//     discount: discount,
//     afterDiscount: afterDiscount,
//     remarks: remarks,
//     moreInfo: moreInfo,
//     status: "Assigned",
//     customerId: customerId,
//     assignedTo: "Customer Care",
//     phoneNumber: phoneNumber,
//     paymentMode: paymentMode,
//     approvedAmount: afterDiscount,
//     UTRTransactionNumber: UTRTransactionNumber,
//     technicianConfirmationCode: technicianConfirmationCode,
//   };

//   try {
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/${raiseTicketId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload2),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to forward Customer.');
//     }
//     alert("Ticket Forwarded to customer Successfully!");
//   } catch (error) {
//     console.error('Error:', error);
//     window.alert('Failed to forward Customer. Please try again later.');
//   }
// };

  return (
    <>
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
                readOnly
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

                {paymentMode === "technician" && (
                  <>
                  <div className="form-group">
                <label>Payment Transaction Details<span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="paymentTransactionDetails"
                  value={UTRTransactionNumber}
                  // onChange={handlePaymentTransactionDetailsChange}                
                  placeholder="Payment Transaction Details"
                  readOnly
                />
              </div>
              <div className='radio'>
                {/* <label className='m-1'>
                  <input className='form-check-input m-2 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Cash"
                  checked={paymentType === "Cash"}
                  onChange = {handlePaymenTypeChange}
                  required
                  />
                  Cash
                </label>
                <label className='m-1'>
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

                {/* <label className='m-1'>
                  <input className='form-check-input m-1 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Pay Online"
                  checked={paymentType === "Pay Online"}
                  // onChange = {handlePaymenTypeChange}
                  readOnly
                  />
                  Pay Online
                </label> */}
              </div>
                </>
                )}
                
                {/* Payment Transaction Details */}
                {/* <Form.Group>
                  <label>Payment Transaction Details</label>
                  <Form.Control
                    name='paymentTransactionDetails'
                    value={UTRTransactionNumber}
                    onChange={(e) => setPaymentTransactionDetails(e.target.value)}
                    rows="4"
                    placeholder="Payment Transaction Details"
                    readOnly
                  />
                </Form.Group> */}
        

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
                as="textarea"
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

        {/* Order Id */}
        <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Order Id</label>
                      <Form.Control
                        type="text"
                        name="OrderId"
                        value={OrderId}
                        onChange={handleChange}
                        placeholder="Order Id"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Order Date */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Order Date</label>
                      <Form.Control
                        type="text"
                        name="OrderDate"
                        value={OrderDate}
                        onChange={handleChange}
                        placeholder="Order Date"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Paid Amount */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Paid Amount</label>
                      <Form.Control
                        type="text"
                        name="PaidAmount"
                        value={PaidAmount}
                        onChange={handleChange}
                        placeholder="Paid Amount"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Transaction Status */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Transaction Status</label>
                      <Form.Control
                        type="text"
                        name="TransactionStatus"
                        value={TransactionStatus}
                        onChange={handleChange}
                        placeholder="Transaction Status"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Transaction Type */}
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Transaction Type</label>
                      <Form.Control
                        type="text"
                        name="TransactionType"
                        value={TransactionType}
                        onChange={handleChange}
                        placeholder="Transaction Type"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Invoice Id */}
                {/* <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Invoice Id</label>
                      <Form.Control
                        type="text"
                        name="InvoiceId"
                        value={InvoiceId}
                        onChange={handleChange}
                        placeholder="Invoice Id"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row> */}

                {/* Invoice URL*/}
                {/* <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label>Invoice URL</label>
                      <Form.Control
                        type="text"
                        name="InvoiceURL"
                        value={InvoiceURL}
                        onChange={handleChange}
                        placeholder="Invoice URL"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row> */}

        {/* Assigned To */}
        <Row>
        <Col md={12}> 
            <Form.Group>
              <label>Assigned To</label>
              <input
                name="Customer Care"
                value={assignedTo}
                className='form-control'
                // onChange={(e) => setAssignedTo(e.target.value)}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
 
      
        {/* Save Button */}
        <div className="mt-4 text-end">
          <Link to={`/bookTechnicianCustomerGrid/${userType}/${userId}`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          {/* <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link> */}
          {/* <Button onClick={handleForwardTicket} className="btn btn-warning text-white mx-2" title='Forward'
          disabled={status === "Assigned" && assignedTo === "Technical Agency"}>
            <SaveAsIcon />
          </Button> */}
          {/* <Button className="btn btn-warning text-white mx-2" onClick={handleUpdateJobDescription} title="Forward">
            <ForwardIcon />
          </Button> */}
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
    </div>
            <Footer /> 
</>
  );
};

export default CustomerBookTechnicianQuotation;
