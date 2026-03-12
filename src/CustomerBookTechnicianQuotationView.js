// import React, { useState, useEffect } from 'react';
// import { Button, Form, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Sidebar from './Sidebar';
// import Header from './Header.js';
// import Footer from './Footer.js';

// import {  Dashboard as MoreVertIcon } from '@mui/icons-material';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import { Link, useParams } from 'react-router-dom';
// import './App.css';
// const CustomerBookTechnicianQuotation = () => {
// const {userType} = useParams();
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [jobDescription, setJobDescription] = useState(''); 
//   const [phoneNumber, setPhoneNumber] = useState(''); 
//   const [technicianData, setTechnicianData] = useState('');
//   const [bookTechnicianId, setBookTechnicianId] = useState('');
//  const [address, setAddress] = useState('');
//   const [category, setCategory] = useState('');
//   const {raiseTicketId} = useParams();
//  const [loading, setLoading] = useState(true);
//  const [paymentMode, setPaymentMode] = useState('');
//  const [totalAmount, setTotalAmount] = useState('');
//  const [state, setState] = useState('');
//  const [district, setDistrict] = useState('')
//  const [userId, setCustomerId] = useState(''); 
//   const [zipCode,setZipCode]=useState('');
//   const [afterDiscount, setAfterDiscount] = useState('');
//   const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [UTRTransactionNumber, setPaymentTransactionDetails] = useState('');
//   const [OrderId, setOrderId] = useState("");
//     const [OrderDate, setOrderDate] = useState("");
//     const [PaidAmount, setPaidAmount] = useState("");
//     const [TransactionStatus, setTransactionStatus] = useState("");
//     const [TransactionType, setTransactionType] = useState("");
  
//   useEffect(() => {
//     console.log(technicianData, afterDiscount);
//   }, [technicianData, afterDiscount]);

//   useEffect(() => {
//     const fetchtechnicianData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv6-g7dfa4fgcrd7f3h2.centralindia-01.azurewebsites.net/api/BookTechnician/GetBookTechnician/${raiseTicketId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch technician data');
//         }
//         const data = await response.json();
//         setTechnicianData(data);
//         setJobDescription(data.jobDescription);
//         setCategory(data.category);
//         setPhoneNumber(data.phoneNumber);
//         setAddress(data.address);
//         setBookTechnicianId(data.bookTechnicianId);
//         setTotalAmount(data.afterDiscount);
//         setPaymentMode(data.paymentMode);
//         setCustomerId(data.customerId);
//         setState(data.state);
//         setDistrict(data.district);
//         setZipCode(data.zipCode);
//         setAfterDiscount(data.afterDiscount);
//         setTechnicianConfirmationCode(data.technicianConfirmationCode);
//         setPaymentTransactionDetails(data.utrTransactionNumber);
//         setAssignedTo(data.assignedTo);
//         setOrderId(data.orderId);
//         setOrderDate(data.orderDate);
//         setPaidAmount(data.paidAmount);
//         setTransactionStatus(data.transactionStatus);
//         setTransactionType(data.transactionType);
//       } catch (error) {
//         console.error('Error fetching technician data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchtechnicianData();
//   }, [raiseTicketId]); 

//   // Detect screen size for responsiveness
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize(); 
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Handle form data changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTechnicianData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
 
//   return (
//     <>
//     <div>
//   {isMobile && <Header />}
//     <div className="d-flex flex-row justify-content-start align-items-start">
//       {!isMobile && (
//         <div className=" ml-0 p-0 sde_mnu">
//           <Sidebar />
//         </div>
//       )}

//       {isMobile && (
//         <div className="floating-menu">
//           <Button
//             variant="primary"
//             className="rounded-circle shadow"
//             onClick={() => setShowMenu(!showMenu)}
//           >
//             <MoreVertIcon />
//           </Button>

//           {showMenu && (
//             <div className="sidebar-container">
//               <Sidebar />
//             </div>
//           )}
//         </div>
//       )}

//       <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
//         <h1 className="text-center mb-2">Book a Technician Action View</h1>
//         <Form>
//         <Row>
//             <Col md={6}>
//             <Form.Group>
//                 <label>Ticket ID</label>
//                 <Form.Control
//                 type="text"
//                 name="bookTechnicianId"
//                 value={bookTechnicianId}
//                 onChange={handleChange}
//                 placeholder='Ticket Number'
//                 readOnly
//                 />
//             </Form.Group>
//             </Col>
//             </Row>
      
//                 {/* Category */}
//         <Row>
//           <Col md={12}>
//             <Form.Group>
//               <label>Category</label>
//               <Form.Control
//                 type="text"
//                 name="category"
//                 value={category}
//                 onChange={handleChange}
//                 placeholder="Category"
//                 readOnly
//               >
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Job Description */}
//         <Row>
//           <Col md={12}>
//             <Form.Group>
//               <label>Job Description</label>
//               <Form.Control
//                 type="text"
//                 name="jobDescription"
//                 value={jobDescription}
//                 onChange={handleChange}
//                 placeholder="Job Description"
//                 readOnly
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Total Amount */}
//         <Row>
//           <Col md={12}>
//             <Form.Group>
//               <label>Total Amount</label>
//               <Form.Control
//                 type="text"
//                 name="totalAmount"
//                 value={totalAmount}
//                 onChange={handleChange}
//                 placeholder="Total Amount"
//                 readOnly
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Technician Confirmation Code */}
//                 <Form.Group>
//                   <label>Technician Confirmation Code</label>
//                   <Form.Control
//                     name="technicianConfirmationCode"
//                     value={technicianConfirmationCode}
//                     onChange={handleChange}
//                     rows="4"
//                     placeholder="Technician Confirmation Code"
//                     readOnly
//                   />
//                 </Form.Group>
        
//                 {/* Payment Mode */}
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Payment Mode</label>
//                       <Form.Control
//                         type="text"
//                         name="paymentMode"
//                         value={paymentMode}
//                         onChange={handleChange}
//                         placeholder="Payment Mode"
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {paymentMode === "technician" && (
//                   <>
//                   <div className="form-group">
//                 <label>Payment Transaction Details<span className="req_star">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="paymentTransactionDetails"
//                   value={UTRTransactionNumber}
//                   placeholder="Payment Transaction Details"
//                   readOnly
//                 />
//               </div>
//               <div className='radio'>
//               </div>
//                 </>
//                 )}
//         {/* Customer Address*/}
//         <Row>
//           <Col md={12}>
//             <Form.Group>
//               <label>Customer Address</label>
//               <Form.Control
//                 as="textarea"
//                 type="text"
//                 name="address"
//                 value={`${address}, ${district}, ${state}, ${zipCode}, ${phoneNumber}`}
//                 onChange={handleChange}
//                 placeholder="Customer Address"
//                 readOnly
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Order Id */}
//         <Row>
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Order Id</label>
//                       <Form.Control
//                         type="text"
//                         name="OrderId"
//                         value={OrderId}
//                         onChange={handleChange}
//                         placeholder="Order Id"
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Order Date */}
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Order Date</label>
//                       <Form.Control
//                         type="text"
//                         name="OrderDate"
//                         value={OrderDate}
//                         onChange={handleChange}
//                         placeholder="Order Date"
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Paid Amount */}
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Paid Amount</label>
//                       <Form.Control
//                         type="text"
//                         name="PaidAmount"
//                         value={PaidAmount}
//                         onChange={handleChange}
//                         placeholder="Paid Amount"
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Transaction Status */}
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Transaction Status</label>
//                       <Form.Control
//                         type="text"
//                         name="TransactionStatus"
//                         value={TransactionStatus}
//                         onChange={handleChange}
//                         placeholder="Transaction Status"
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Transaction Type */}
//                 <Row>
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Transaction Type</label>
//                       <Form.Control
//                         type="text"
//                         name="TransactionType"
//                         value={TransactionType}
//                         onChange={handleChange}
//                         placeholder="Transaction Type"
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//         {/* Assigned To */}
//         <Row>
//         <Col md={12}> 
//             <Form.Group>
//               <label>Assigned To</label>
//               <input
//                 name="Customer Care"
//                 value={assignedTo}
//                 className='form-control'
//                 readOnly
//               />
//             </Form.Group>
//           </Col>
//         </Row>
 
      
//         {/* Save Button */}
//         <div className="mt-4 text-end">
//           <Link to={`/bookTechnicianCustomerGrid/${userType}/${userId}`} className="btn btn-warning text-white mx-2" title='Back'>
//             <ArrowLeftIcon />
//           </Link>
//         </div>
//         </Form>

//         </div>
//         {/* Styles for floating menu */}
// <style jsx>{`
//         .floating-menu {
//           position: fixed;
//           top: 80px; /* Increased from 20px to avoid overlapping with the logo */
//           left: 20px; /* Adjusted for placement on the left side */
//           z-index: 1000;
//         }
//         .menu-popup {
//           position: absolute;
//           top: 50px; /* Keeps the popup aligned below the floating menu */
//           left: 0; /* Aligns the popup to the left */
//           background: white;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           width: 200px;
//         }
//       `}</style>
//       </div> 
//     </div>
//             <Footer /> 
// </>
//   );
// };

// export default CustomerBookTechnicianQuotation;
