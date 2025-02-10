import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import {Dashboard as MoreVertIcon,} from "@mui/icons-material";
import { FaEye } from 'react-icons/fa';
import  ArrowLeftIcon  from '@mui/icons-material/ArrowLeft';

const TicketConfirmationNotification = () => {
  const { userType } = useParams();
  const { selectedUserType } = useParams();
  const {technicianId} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
   const { district, category } = useParams();
  const rowsPerPage = 15;
useEffect(() => {
    console.log(ticketData);
  }, [ticketData]);

  useEffect(() => {
    setLoading(true);
    const url = `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByExistingTechnicianId?category=${category}&district=${district}&technicianId=${technicianId}`;
    
    axios.get(url)
      .then((response) => {
        console.log("API Response:", response.data); 

        const tickets = response.data.tickets || [];
        const filteredTickets = tickets.filter((ticket) => ticket.internalStatus === "Technician Approved");
        
        setTicketData(filteredTickets);
        setFilteredData(filteredTickets);
      })
      .catch((error) => {
        console.error("Error fetching ticket data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ category, district, technicianId]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTicket = currentPage * rowsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
  const currentRaiseTicket = filteredData.slice(indexOfFirstTicket, indexOfLastTicket);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 m-4 p-0 sde_mnu">
          <Sidebar userType={selectedUserType} />
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
              <Sidebar userType={selectedUserType} />
            </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
      <h2 className="text-center mb-4">Technician Confirmation Notifications</h2>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Ticket ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody> 
          {currentRaiseTicket.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.customerId}</td>
                <td>{ticket.raiseTicketId }</td>
                <td>{ticket.category }</td>
                <td>{ticket.subject}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedTo}</td>
                <td className="d-flex align-items-center">
                  <Link
                    to={`/ticketConfirmation/${ticket.id}/${district}/${userType}/${technicianId}`}
                    className="btn btn-info mx-2"
                    title="View"
                  >
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="mt-4 text-end">
        <Link
          to={`/notificationTechnician/technician/${category}/${district}/${technicianId}`}
          className="btn btn-warning text-white mx-2"
          title="Back"
        >
          <ArrowLeftIcon />
        </Link>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map((_, index) => (
              <li
                key={index}
                className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </div>
  );
};

export default TicketConfirmationNotification;
