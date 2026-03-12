// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import axios from 'axios';
// import Sidebar from "./Sidebar";
// import Header from './Header.js';
// import Footer from './Footer.js';

// import { Link, useParams } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import {
//   Dashboard as MoreVertIcon,
// } from "@mui/icons-material";
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import "./App.css";
 
// const CustomerBuyProductNotificationGrid = () => {
//  const {userId} = useParams();
//   const {userType} = useParams();
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [productData, setProductData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredData, setFilteredData] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const rowsPerPage = 15;

//   useEffect(() => {
//     console.log(productData); 
//   }, [productData])
//   useEffect(() => {
//     setLoading(true);
//     const url = `https://handymanapiv6-g7dfa4fgcrd7f3h2.centralindia-01.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsForUserList?UserID=${userId}`
//     axios.get(url)
//       .then(response => {
//         const products = response.data.map((product) => ({
//           ...product,
//         }));
//         const buyProducts = products.filter((product) =>  (product.assignedTo !== "Customer Care" && product.status === "Closed" && product.assignedTo === "Admin")||(product.transactionStatus === "Success" && product.assignedTo === "Admin"));
//         setFilteredData(buyProducts);
//         setProductData(buyProducts);
//       })
//       .catch(error => {
//         console.error("Error fetching product data:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [userId]); 
 
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//  // Get paginated data
//  const indexOfLastTicket = currentPage * rowsPerPage;
//  const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
//  const currentBuyProduct = filteredData.slice(indexOfFirstTicket, indexOfLastTicket);

//  if (loading) {
//    return <div>Loading...</div>; 
//  }

//   return (
//     <div>
//   {isMobile && <Header />}
//     <div className="d-flex flex-row justify-content-start align-items-start">
//       {!isMobile && (
//         <div className="ml-0 p-0 sde_mnu">
//           <Sidebar />
//         </div>
//       )}

//       {/* Floating menu for mobile */}
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
//               <div className="sidebar-container">
//                 <Sidebar />
//               </div>
//           )}
//         </div>
//       )}

//       <div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
//         <h2 className="text-center mb-4">Buy Product Orders Notifications</h2>
//         <>
//         {currentBuyProduct.length > 0 ? (
//         !isMobile ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Customer ID</th>
//               <th>Buy Product ID</th>
//               <th>Category</th>
//               <th>Product Name</th>
//               <th>Assigned To</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentBuyProduct.map((product, index) => (
//               <tr key={index}>
//                 <td>{product.customerId}</td>
//                 <td>{product.buyProductId}</td>
//                 <td>{product.category}</td>
//                 <td>{product.productName}</td>
//                 <td>{product.assignedTo}</td>
//                 <td className="d-flex align-items-center">
//                   <Link
//                     to={`/viewCustomerBuyProductOrdersGrid/${userType}/${userId}/${product.id}`}
//                     className="btn btn-info mx-2"
//                   >
//                     <FaEye />   
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         ) : (
//           <div className="mobile-ticket-grid">
//   {currentBuyProduct.map((product, index) => (
//     <div key={index} className="ticket-card">
//       <strong>Customer ID:</strong>{product.customerId} <br />
//       <strong>Buy Product ID:</strong> {product.buyProductId}
//       <div className="ticket-body">
//         <p><strong>Category:</strong> {product.category}</p>
//         <p><strong>Product Name:</strong> {product.productName}</p>
//         <p><strong>Assigned To:</strong> {product.assignedTo}</p>
//       </div>
//       <div className="ticket-actions">
//       <Link
//                     to={`/viewCustomerBuyProductOrdersGrid/${userType}/${userId}/${product.id}`}
//                     className="btn btn-info mx-2"
//                   >
//                     <FaEye />   
//                   </Link>
//       </div>
//     </div>
//   ))}
// </div>
//         )
//       ) : (
//         <p className="text-center text-muted">No Tickets Data Found</p>

//         )}
//       </>
//         <div className="mt-4 text-end">
//           <Link to={`/customerOrders/${userType}/${userId}`} className="btn btn-warning text-white mx-2" title='Back'>
//             <ArrowLeftIcon />
//           </Link>
//         </div>
//         {/* Pagination */}
//         <div className="d-flex justify-content-center mt-3">
//           <nav aria-label="Page navigation">
//             <ul className="pagination">
//               {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map(
//                 (_, index) => (
//                   <li
//                     key={index} 
//                     className={`page-item ${
//                       index + 1 === currentPage ? "active" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => handlePageChange(index + 1)}
//                     >
//                       {index + 1}
//                     </button>
//                   </li>
//                 )
//               )}
//             </ul>
//           </nav>
//         </div>
//       </div>
//       </div>
//       <Footer /> 

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
//   );
// };

// export default CustomerBuyProductNotificationGrid;
