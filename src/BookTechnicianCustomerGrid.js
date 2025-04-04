import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import {  FaEye } from "react-icons/fa";
import {
  Dashboard as MoreVertIcon,
} from "@mui/icons-material"; 

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./App.css";

const CustomerBookTechnicianGrid = () => {
  const { userType } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMenu, setShowMenu] = useState(false);
  const [technicianData, setTechncianData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 15;
  const { userId } = useParams();
 
  useEffect(() => {
    console.log(technicianData); 
  }, [technicianData]);
  useEffect(() => {
    setLoading(true);
    const url = `https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianDetailsForUserList?userId=${userId}`

    axios.get(url)
      .then(response => {
        const technicians = response.data.map((technician) => ({
          ...technician,
        }));
        const filteredTechnicians = technicians.filter((technician) => (technician.status === "Assigned" && technician.assignedTo === "Customer") || (technician.status === "Closed" && technician.assignedTo === "Customer Care") || (technician.transactionStatus === "Success" && technician.assignedTo !== ""));
        // const filteredTechnicians = technicians.filter((technician) => (technician.status === "Closed" && technician.assignedTo === "Customer Care") || (technician.transactionStatus === "Success" && technician.assignedTo !== ""));
        // technician.status === "Closed" && technician.assignedTo === "Customer");
        setTechncianData(filteredTechnicians);
        setFilteredData(filteredTechnicians);
      })
      .catch(error => {
        console.error("Error fetching ticket data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // const handleDelete = (technicianId) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
  //   if (confirmDelete) {
  //     axios.delete(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${technicianId}`)
  //       .then(() => {
  //         setTechncianData(prevData => prevData.filter(technician => technician.id !== technicianId));
  //         setFilteredData(prevData => prevData.filter(technician => technician.id !== technicianId));
  //       })
  //       .catch(error => {
  //         console.error("Error deleting technician:", error);
  //       });
  //   }
  // };

    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 // Get paginated data
 const indexOfLastTicket = currentPage * rowsPerPage;
 const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
 const currentBookTechnician = filteredData.slice(indexOfFirstTicket, indexOfLastTicket);

 if (loading) {
   return <div>Loading...</div>; // Show loading message while data is fetching
 }

  return ( 
<div>
  {isMobile && <Header />}
<div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 p-0 sde_mnu">
          <Sidebar />
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
                <Sidebar />
              </div>
          )}
        </div> 
      )}

      <div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
        <h2 className="text-center m-4">Book Technician Customer Notifications</h2>
        <>
        {currentBookTechnician.length > 0 ? (
        !isMobile ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Category</th>
              <th>Job Description</th>
              {/* <th>Status</th> */}
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookTechnician.map((technician, index) => (
              <tr key={index}>
                <td>{technician.bookTechnicianId}</td>
                <td>{technician.category}</td>
                <td>{technician.jobDescription}</td>
                {/* <td>{technician.status}</td> */}
                <td>{technician.assignedTo}</td>
                <td className="d-flex align-items-center">
                  <Link
                    to={`/customerBookTechnicianQuotationView/${userType}/${userId}/${technician.id}`}
                    className="btn btn-info mx-2"
                  > 
                    <FaEye />   
                  </Link>
                  {/* <Link
                    onClick={() => handleDelete(technician.id)}
                    className="btn btn-danger mx-2"
                  >   
                     <FaTrash />
                  </Link> */}
                  {/* <Link to="#" className="btn btn-success mx-2">
                    <ForwardIcon />
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : ( 
          <div className="mobile-ticket-grid">
  {currentBookTechnician.map((technician, index) => (
    <div key={index} className="ticket-card">
      {/* <div className="ticket-header"> */}
        <strong>Ticket ID:</strong> {technician.bookTechnicianId}
      {/* </div> */}
      <div className="ticket-body">
        <p><strong>Category:</strong> {technician.category}</p>
        <p><strong>Description:</strong> {technician.jobDescription}</p>
        {/* <p><strong>Status:</strong> {technician.status}</p> */}
        <p><strong>Assigned To:</strong> {technician.assignedTo}</p>
      </div>
      <div className="ticket-actions">
        <Link to={`/customerBookTechnicianQuotationView/${userType}/${userId}/${technician.id}`} className="btn btn-info mx-2">
          <FaEye />
        </Link>
        {/* <Button onClick={() => handleDelete(technician.id)} className="btn btn-danger mx-2">
          <FaTrash />
        </Button> */}
      </div>
    </div>
  ))}
</div>
        ) 
      ) : (
        <p className="text-center text-muted">No Tickets Data Found</p>
        )}
      </>
        <div className="mt-4 text-end">
          <Link to={`/customerNotification/${userType}/${userId}`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
        </div> 
        
        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map(
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <Footer /> 

      {/* Styles for floating menu */}
<style jsx>{`
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
  );
};

export default CustomerBookTechnicianGrid;
