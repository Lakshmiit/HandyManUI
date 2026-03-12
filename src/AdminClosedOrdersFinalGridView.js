// import React, { useState, useEffect} from "react";
// import "./App.css";
// import AdminSidebar from './AdminSidebar';
// import Footer from './Footer.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { ArrowBack, Dashboard as MoreVertIcon} from '@mui/icons-material';
// import { Button} from 'react-bootstrap'; 
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// const AdminClosedBuyProductOrders = () => {
//   const navigate = useNavigate();
//   const {buyProductId} = useParams();
//   const [buyProductTicketId, setBuyProductTicketId] = useState('');
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [productData, setProductData] = useState("");
//   const [category, setCategory] = useState("");
//   const [productSize, setProductSize] = useState("");
//   const [productCatalogue, setProductCatalogue] = useState("");
//   const [color, setColor] = useState("");
//   const [selectedColors, setSelectedColors] = useState("");
//   const [totalAmount, setTotalAmount] = useState('');
//   const [requiredQuantity, setRequiredQuantity] = useState("");
//   const [rate, setRate] = useState("");
//   const [discount, setDiscount] = useState("");
//  const [afterDiscount, setAfterDiscount] = useState("");
//   const [productName, setProductName] = useState("");
// const [addressType, setAddressType] = useState('');
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [address, setAddress] = useState('');
//   const [id, setId] = useState("");
//   const [deliveryCharges, setDeliveryCharges] = useState(0);
// const [serviceCharges, setServiceCharges] = useState(0);
// const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
// const [deliveryDate, setDeliveryDate] = useState('');
// const [technicianDetails, setTechnicianDetails] = useState('');
// const [invoiceDetails, setInvoiceDetails] = useState('');
// const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
// const [loading, setLoading] = useState(true);
// const [paymentMode, setPaymentMode] = useState('');
// const [transactionDetails, setTransactionDetails] = useState('');
// const [customerId, setCustomerId] = useState('');
// const [mobileNumber, setMobileNumber] = useState('');
// const [customerName, setCustomerName] = useState('');
// const [date, setDate] = useState('');
// const [uploadInvoice, setUploadInvoice] = useState([]);
// const [status, setStatus] = useState('');
// const [warrantyPeriod, setWarrantyPeriod] = useState('');

//   const location = useLocation();
//  useEffect(() => {
//   if (location.state) {
//     const {
//       productName,
//       catalogue,
//       productSize,
//       color,
//       rate,
//       discount, 
//      afterDiscount,
//       requiredQuantity,
//       id,
//     } = location.state;
//     setProductName(productName);
//     setProductCatalogue(catalogue);
//     setProductSize(productSize);
//     setColor(color);
//     setRate(rate);
//     setDiscount(discount);
//     setAfterDiscount(afterDiscount);
//     setRequiredQuantity(requiredQuantity);
//     setId(id);
//   }
// }, [location.state]);

// useEffect(() => {
//   console.log( id, productData, loading, status, addressType, state, district, pincode, customerId, mobileNumber,date);
// }, [id, productData, loading, status, addressType, state, district, pincode, customerId, mobileNumber,date]);

// useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv6-g7dfa4fgcrd7f3h2.centralindia-01.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsById/${buyProductId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product data');
//         }
//         const data = await response.json();
//         setProductData(data);
//         setDate(data.date);
//          setId(data.id);
//         setBuyProductTicketId(data.buyProductId);
//         setAddress(data.address);
//         setCategory(data.category);
//         setProductName(data.productName);
//         setProductCatalogue(data.productCatalogue);
//         setProductSize(data.productSize);
//         setRate(data.rate);
//         setDiscount(data.discount);
//         setAfterDiscount(data.afterDiscountPrice);
//         setSelectedColors(data.selectedColors);
//         setTotalAmount(data.totalAmount);
//         setStatus(data.status);
//         setRequiredQuantity(data.requiredQuantity);
//         setAddressType(data.addressType);
//         setCustomerId(data.customerId);
//         setState(data.state);
//         setDistrict(data.district);
//         setPincode(data.zipCode);
//         setMobileNumber(data.customerPhoneNumber);
//         setColor(data.color);
//        setCustomerName(data.customerName);
//        setDeliveryCharges(data.deliveryCharges);
//        setServiceCharges(data.serviceCharges);
//        setTotalPaymentAmount(data.totalPaymentAmount);
//        setTechnicianConfirmationCode(data.technicianConfirmationCode);
//        setPaymentMode(data.paymentMode);
//        setDeliveryDate(data.deliveryDate);
//        setTechnicianDetails(data.technicianDetils);
//        setInvoiceDetails(data.invoiceDetails);
//        setTransactionDetails(data.utrTransactionNumber);
//        setWarrantyPeriod(data.warrentyPeriod); 
//        const imageRequests =
//         data.uploadInvoice?.map((photo) => fetch(
//             `https://handymanapiv6-g7dfa4fgcrd7f3h2.centralindia-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
//           )
//           .then((res) => res.json())
//             .then((data) => ({
            
//               src: photo,
//               imageData: data.imageData,
//             }))
//         ) || [];
//         const images = await Promise.all(imageRequests);
//         setUploadInvoice(images);
//         } catch (error) {
//         console.error('Error fetching product data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductData();
//   }, [buyProductId]);

//   const handleDownloadAllAttachments = async () => {
//     if (uploadInvoice.length === 0) {
//       alert("No files to download");
//       return;
//     }
//     const zip = new JSZip();
//     const folder = zip.folder("Download Invoice"); 
//     for (const invoice of uploadInvoice) {
//       try {
//         const response = await fetch(`data:image/jpeg;base64,${invoice.imageData}`);
//         const blob = await response.blob();
//         folder.file(invoice.src.split("/").pop(), blob); 
//       } catch (error) {
//         console.error("Error fetching Invoice:", error);
//       }
//     }
//     try {
//       const content = await zip.generateAsync({ type: "blob" });
//       saveAs(content, "Download Invoice.zip");
//     } catch (error) {
//       console.error("Error generating ZIP:", error);
//       alert("Failed to download Invoice. Please try again.");
//     }
//   };

//   // Detect screen size for responsiveness
// useEffect(() => {
//   const handleResize = () => setIsMobile(window.innerWidth <= 768);
//   handleResize(); 
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

//    const handleSubmit = (e) => {
//      e.preventDefault();
//    };

//   return (
//     <>
//     <div className="d-flex flex-row justify-content-start align-items-start">
//       {/* Sidebar menu for Larger Screens */}
//       {!isMobile && (
//         <div className=" ml-0 p-0 adm_mnu h-90">
//           <AdminSidebar />
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
//               <AdminSidebar />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Main Content */}
//       <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
//       <h3 className="mb-4 text-center">Buy Products Orders</h3>
//         <div className="bg-white rounded-3 p-4 bx_sdw w-100">
//           <form className="form" onSubmit={handleSubmit}>
//                 <div className="text-center">
//                 <strong className="mt-2">Order Number:<span>{buyProductTicketId}</span></strong>
//                 </div>
//                 <div className="form-group">
//               <label>
//                 Customer Name <span className="req_star">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerName}
//                 onChange={(e) => setCustomerName(e.target.value)}
//                 placeholder="Customer Name"
//                 readOnly
//               />
//             </div>
//               <div className="form-group">
//                 <label>Customer Address <span className="req_star">*</span></label>
//                 <input
//                 as="textarea"
//                 type="text"
//                 className="form-control"
//                 value={`${address}, ${district}, ${state}, ${pincode} ${mobileNumber}`}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Customer Address"
//                 readOnly
//               />
//               </div>

//             <div className="form-group">
//               <label>Category <span className="req_star">*</span></label>
//               <input
//               type="text"
//                 className="form-control"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 placeholder="Category"
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label>Product Name <span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 placeholder="Product Name"
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 Product Catalogue <span className="req_star">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={productCatalogue}
//                 onChange={(e) => setProductCatalogue(e.target.value)}
//                 placeholder="Product Catalogue"
//                 readOnly
//               />
//             </div>
//             <div className="row">
//             <div className="col-md-6">
//               <label>Product Size <span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={productSize}
//                 onChange={(e) => setProductSize(e.target.value)}
//                 placeholder="Product Size"
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//                 <label>Rate <span className="req_star">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={rate}
//                   onChange={rate}
//                   placeholder="Rate"
//                   readOnly
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label>Discount <span className="req_star">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={discount}
//                   onChange={(e) => setDiscount(e.target.value)}
//                   placeholder="Discount"
//                   readOnly
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label>Price After Discount <span className="req_star">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={afterDiscount}
//                   placeholder="After Discount"
//                   readOnly
//                 />
//               </div>
//               </div>
           
//             <div className="row">
//               <div className="row ticket-info" >
//               <div className="col-md-6">
//               <p><strong className="me-2"> Choose Color (Optional):</strong>{color}</p>
//               <p><strong className="me-2"> Select Required Color:</strong>{selectedColors}</p>
//               <p><strong className="me-2"> Required Quantity:</strong>{requiredQuantity}</p>
//               <p><strong className="me-2"> Total Amount:</strong>{`Rs ${totalAmount}/-`}</p>
//               </div>
//               <div className="col-md-6">
//               <p><strong className="me-2"> Delivery Charges:</strong>{deliveryCharges}</p>
//               <p><strong className="me-2"> Service Charges:</strong>{serviceCharges}</p>
//               <p><strong className="me-2"> Delivery Date:</strong>{deliveryDate}</p>
//               <p><strong className="me-2"> Total Payment Amount:</strong>{`Rs ${totalPaymentAmount}/-`}</p>
//               </div>
//               </div>
//         <div className='payment m-2'>
//         <label className='bg-warning fw-bold fs-5 w-100 p-2'>Payment Mode</label>
//         <label className='fs-5 m-1'>
//             <input 
//             type="checkbox" 
//             className="form-check-input border-secondary m-2 border-dark"
//             checked={paymentMode === 'online'}
//             readOnly
//              />
//             Pay Through Online
//           </label>
//           <label className='fs-5 m-1'>
//             <input 
//             type="checkbox" 
//             className="form-check-input border-secondary m-2 border-dark"
//             checked={paymentMode === 'technician'}
//             readOnly
//             />
//             Pay On In Presence of Technician
//           </label>
//     </div>
//     <div className="form-group">
//               <label>Payment Transaction Details <span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-group "
//                 value={transactionDetails}
//                 onChange={(e) => setTransactionDetails(e.target.value)}
//                 placeholder="Enter Payment Transaction Details"
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label>Technician Details <span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={technicianDetails}
//                 onChange={(e) => setTechnicianDetails(e.target.value)}
//                 placeholder="Enter Technician Details"
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label>Invoice Details <span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={invoiceDetails}
//                 onChange={(e) => setInvoiceDetails(e.target.value)}
//                 placeholder="Enter Invoice Details"
//                 readOnly
//               />

//           <button className='btn btn-warning fs-5 m-2' onClick={handleDownloadAllAttachments}>Download Invoice</button>
//           </div> 
//           <div className="form-group">
//               <label>Warranty Period<span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={warrantyPeriod} 
//                 onChange={(e) => setWarrantyPeriod(e.target.value)}
//                 placeholder="dd-mm-yyyy"
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label>Order Confirmation Code <span className="req_star">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={technicianConfirmationCode}
//                 placeholder="Order Confirmation Code"
//                 readOnly
//               />
//             </div>
//             <div className="mt-4 text-end">
//                 <Button type="submit" 
//                 onClick={() => navigate(`/buyProductClosedOrdersGrid`)} className="btn btn-warning text-white mx-2" 
//                   title="Back">
//                   <ArrowBack /> 
//                 </Button>
//             </div> 
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* Styles for floating menu */}
// <style jsx>{`
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
//     </div>
//     <Footer /> 
// </>
//   );
// };

// export default AdminClosedBuyProductOrders;