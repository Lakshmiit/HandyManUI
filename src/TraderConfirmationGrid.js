import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from './Header.js';
import Footer from './Footer.js';

import { Link, useParams } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import {
  Dashboard as MoreVertIcon,
  Forward as ForwardIcon,
} from "@mui/icons-material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./App.css";

const RaiseTicketNotification = () => {
  const { userType } = useParams();
  const { selectedUserType } = useParams();
  const {userId} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [states, setStates] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [pinCodes, setPinCodes] = useState([]);
  // const [assigned, setAssigned] = useState([]);
   const { district} = useParams();
   const {category } = useParams();
    const [ category1, setCategory1]= useState("");
     const [ district1, setDistrict1]= useState("");
  const rowsPerPage = 15;
useEffect(() => {
    console.log(ticketData);
  }, [ticketData]);

  useEffect(() => {
    if (!userId || !userType) return;
    const fetchProfileData = async () => {
      try {
        let apiUrl = "";
     
          apiUrl = `https://handymanapiv2.azurewebsites.net/api/dealer/dealerProfileData?profileType=${userType}&UserId=${userId}`;
        
        if (!apiUrl) return;
        const response = await axios.get(apiUrl);
        //setProfile(response.data); 
        // alert(response.data.district);
        setCategory1(response.data.category);
     
        setDistrict1(response.data.district);
        // alert(response.data.district);
        
      } catch (err) {
        console.error("Error fetching ticket data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, [userType, userId]);
  
  

  useEffect(() => {
    setLoading(true);
    const url = `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetNotificationsByExistingDealerId?category=${category1}&district=${district1}&dealerId=${userId}`;
    // alert(category);
    // alert(district);
    // alert(userId);
    axios
      .get(url)
      .then((response) => {
        const tickets = response.data.tickets || [];
        const filteredTickets = tickets.filter((ticket) => (ticket.internalStatus === "Customer Approved" || ticket.internalStatus === "Closed") && ticket.lowestBidderDealerId === userId);

        setTicketData(filteredTickets);
        setFilteredData(filteredTickets); 
      })
      .catch((error) => {
        console.error("Error fetching ticket data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category1, district1,userId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (ticketId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${ticketId}`)
        .then(() => {
          setTicketData((prevData) =>
            prevData.filter((ticket) => ticket.id !== ticketId)
          );
          setFilteredData((prevData) =>
            prevData.filter((ticket) => ticket.id !== ticketId)
          );
        })
        .catch((error) => {
          console.error("Error deleting ticket:", error);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get paginated data
  const indexOfLastTicket = currentPage * rowsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
  const currentRaiseTicket = filteredData.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is fetching
  }

  return (
    <div>
  {isMobile && <Header />}
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
        <h2 className="text-center mb-4">Dealer Confirmation Notifications</h2>
        <>
        {!isMobile ? (
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
                <td>{ticket.raiseTicketId}</td>
                <td>{ticket.category}</td>
                <td>{ticket.details}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedTo}</td>
                <td className="d-flex align-items-center">
                  <Link
                    to={`/traderConfirmation/${userType}/${userId}/${category}/${district}/${ticket.id}`}
                    className="btn btn-info mx-2"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    onClick={() => handleDelete(ticket.id)}
                    className="btn btn-danger mx-2"
                  >
                    <FaTrash />
                  </Link>
                  <Link to="#" className="btn btn-success mx-2">
                    <ForwardIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div className="mobile-ticket-grid">
  {currentRaiseTicket.map((ticket, index) => (
    <div key={index} className="ticket-card">
      <div className="ticket-header">
      <strong>Customer ID:</strong> {ticket.customerId} <br />
      <strong>Ticket ID:</strong> {ticket.raiseTicketId}
      </div>
      <div className="ticket-body">
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Description:</strong> {ticket.details}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
      </div>
      <div className="ticket-actions">
      <Link
        to={`/traderConfirmation/${userType}/${userId}/${category}/${district}/${ticket.id}`}
        className="btn btn-info mx-2"
      >
        <FaEye />
      </Link>
      <Link
        onClick={() => handleDelete(ticket.id)}
        className="btn btn-danger mx-2"
      >
        <FaTrash />
      </Link>
      <Link to="#" className="btn btn-success mx-2">
        <ForwardIcon />
      </Link>
      </div>
    </div>
  ))}
</div>

        )}
      </>
        <div className="mt-4 text-end">
          <Link to={`/dealerNotifications/${userType}/${userId}/${category}/${district}`} className="btn btn-warning text-white mx-2" title='Back'>
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
        .floating-menu {
          position: fixed;
          top: 80px;
          left: 20px;
          z-index: 1000;
        }
        .menu-popup {
          position: absolute;
          top: 50px;
          left: 0;
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

export default RaiseTicketNotification;
