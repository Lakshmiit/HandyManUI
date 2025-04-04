import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from './Header.js';
import Footer from './Footer.js';
import {Dashboard as MoreVertIcon,} from "@mui/icons-material";
import { FaEye } from 'react-icons/fa';
import  ArrowLeftIcon  from '@mui/icons-material/ArrowLeft';

const BookTechnicianDetailsGrid = () => {
  const { userType } = useParams();
  const { selectedUserType } = useParams();
  // const [enableForward] = useState('Disable');
  const {userId} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
//    const { district} = useParams();
   const {category } = useParams();
  const {pincode } = useParams();
  const {technicianName } = useParams();
   const [pincode1, setZipCode] = useState('');
    const [technicianName1, setFullName] = useState('');
   const [ category1, setCategory1]= useState("");
     const [ district1, setDistrict1]= useState("");
  const rowsPerPage = 15;
useEffect(() => {
    console.log(ticketData, category1, district1, pincode1,technicianName1 );
  }, [ticketData, category1, district1, pincode1,technicianName1 ]);

useEffect(() => {
            if (!userId || !userType) return;
            const fetchProfileData = async () => {
              try {
                let apiUrl = "";
             
                  apiUrl = `https://handymanapiv2.azurewebsites.net/api/technician/technicianProfileData?profileType=${userType}&UserId=${userId}`;
                
                if (!apiUrl) return;
                const response = await axios.get(apiUrl);
                //setProfile(response.data); 
                setCategory1(response.data.category);
                setDistrict1(response.data.district);
                setZipCode(response.data.zipCode);
                setFullName(response.data.fullName);                
                  
              } catch (error) {
                console.log("Failed to fetch the data: ", error);
              } finally {
                setLoading(false);
              }
            };
          
            fetchProfileData();
          }, [userType, userId]);
          
    
  useEffect(() => {
    setLoading(true);
    const url = `https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianNotifications?category=${category}&pincode=${pincode}&technicianName=${technicianName}`;
    
    axios.get(url)
      .then((response) => {
        console.log("API Response:", response.data); 

        const tickets = response.data.map((ticket) => ({
            ...ticket,
          }));
          const assignedTickets = tickets.filter((ticket) =>  (ticket.status === "Assigned" && ticket.assignedTo === "Customer") || (ticket.status === "Closed" && ticket.assignedTo === "Customer Care") || (ticket.transactionStatus === "Success" && ticket.assignedTo !== ""));
            // technician.status === "Assigned" && technician.assignedTo === "Customer Care");
          setFilteredData(assignedTickets);
          setTicketData(assignedTickets);
  })
    //     const tickets = response.data.tickets || []; 
    //     setTicketData(tickets);
        
    //     // const filteredTickets = tickets.filter(ticket => 
    //     //     (ticket.status === "Assigned" && ticket.assignedTo === "Customer") || (ticket.status === "Closed" && ticket.assignedTo === "Customer Care") || (ticket.transactionStatus === "Success" && ticket.assignedTo !== ""));
    //     setFilteredData(tickets);
    //   })
      .catch((error) => {
        console.error("Error fetching ticket data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ category, pincode, technicianName]);

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
    <>
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
      <h2 className="text-center mb-4">Book Technician Notifications</h2>
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
                <td>{ticket.bookTechnicianId }</td>
                <td>{ticket.category }</td>
                <td>{ticket.jobDescription}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedTo}</td>
                <td className="d-flex align-items-center">
                  <Link
                    to={`/technicianViewBookTechnician/${userType}/${userId}/${technicianName}/${ticket.id}`}
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
      ) : (
        <div className="mobile-ticket-grid"> 
  {currentRaiseTicket.map((ticket, index) => (
    <div key={index} className="ticket-card">
      {/* <div className="ticket-header"> */}
      <strong>Customer ID:</strong> {ticket.customerId} <br />
      <strong>Ticket ID:</strong> {ticket.bookTechnicianId}
      {/* </div> */}
      <div className="ticket-body">
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Description:</strong> {ticket.jobDescription}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
      </div>
      <div className="ticket-actions">
      <Link
        to={`/technicianViewBookTechnician/${userType}/${userId}/${technicianName}/${ticket.id}`}
        className="btn btn-info mx-2"
        title="View"
      >
        <FaEye />
      </Link> 
      </div> 
    </div>
  ))}
</div>
        )}
      </>

      <div className="mt-4 text-end">
        <Link
          to={`/technicianDetailsNotifications/${userType}/${userId}/${category}/${pincode}/${technicianName}`}
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

  </div>
    <Footer /> 
</>
  );
};

export default BookTechnicianDetailsGrid;
