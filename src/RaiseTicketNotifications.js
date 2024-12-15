import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEye } from "react-icons/fa";
import {
  Dashboard as MoreVertIcon,
  FileDownload as FileDownloadIcon,
  Forward as ForwardIcon,
} from "@mui/icons-material";
import "./App.css";

const RaiseTicketNotification = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Open Tickets");
  const [assignedTo, setAssignedTo] = useState("Technical Agency");
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [raiseTicket, setRaiseTicket] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pinCode, setPincode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const currentRaiseTicketData = [
    {
      customerId: "C00123",
      ticketId: "T00123",
      category: "Technical",
      description: "Issue with login",
      attachments: [
        { fileUrl: "/path/to/file1.pdf", fileName: "file1.pdf" },
      ],
    },
    {
      customerId: "C00456",
      ticketId: "T00456",
      category: "Billing",
      description: "Incorrect Pin",
      attachments: [
        { fileUrl: "/path/to/file2.pdf", fileName: "file2.pdf" },
      ],
    },
  ];

  useEffect(() => {
    let filtered = raiseTicket;

    if (state) {
      filtered = filtered.filter((ticket) => ticket.state === state);
    }

    if (district) {
      filtered = filtered.filter((ticket) => ticket.district === district);
    }

    if (pinCode) {
      filtered = filtered.filter((ticket) => ticket.pinCode === pinCode);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [state, district, pinCode, raiseTicket]);

  const handleViewClick = (ticketId) => {
    navigate(`/raiseTicketActionView/${ticketId}`);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemoveTicket = (index) => {
    setRaiseTicket((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className="ml-0 m-4 p-0 adm_mnu">
          <AdminSidebar />
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
                <AdminSidebar />
              </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
        <h2 className="text-center mb-4">Raise a Ticket Notifications</h2>
        <h4 className="text-center mb-4">District Wise Ticket Summary</h4>
        <div className="d-flex align-items-center justify-content-between">
          <div className="form-group text-start col-md-2 ml-2 m-5 mb-2">
            <label>State</label>
            <select
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
            </select>
          </div>
          <div className="form-group col-md-2 m-5 mb-2">
            <label>District</label>
            <select
              className="form-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Vijayawada">Vijayawada</option>
            </select>
          </div>
          {/* Pin Code */}
          <div className="form-group col-md-2 m-5 mb-2">
            <label>Pin Code</label>
            <select
              className="form-control"
              value={pinCode}
              onChange={(e) => setPincode(e.target.value)}
            >
              <option value="">Select Pincode</option>
            {[...new Set(filteredData.map(ticket => ticket.pinCode))].map((pinCodeOption, index) => (
              <option key={index} value={pinCodeOption}>
                {pinCodeOption}
              </option>
            ))}
            </select>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Ticket ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>View/Download Attachment</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRaiseTicketData.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.customerId}</td>
                <td>{ticket.ticketId}</td>
                <td>{ticket.category}</td>
                <td>{ticket.description}</td>
                <td>
                  {ticket.attachments && ticket.attachments.length > 0 ? (
                    ticket.attachments.map((attachment, i) => (
                      <div key={i} className="d-flex align-items-center">
                        <FileDownloadIcon className="me-2" />
                        <a
                          href={attachment.fileUrl}
                          download={attachment.fileName}
                          className="text-decoration-none"
                        >
                          {attachment.fileName}
                        </a>
                      </div>
                    ))
                  ) : (
                    <span>No Attachments</span>
                  )}
                </td>
                <td>
                  <select
                    className="form-select color-dropdown"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Open Tickets">Open Tickets</option>
                    <option value="Not Assigned">Not Assigned</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-select color-dropdown"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    <option value="Technical Agency">Technical Agency</option>
                  </select>
                </td>
                <td className="d-flex align-items-center">
                  <button
                    onClick={() => handleViewClick(ticket.ticketId)}
                    className="btn btn-info mx-2"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleRemoveTicket(index)}
                    className="btn btn-danger mx-2"
                  >
                    <FaTrash />
                  </button>
                  <Link to="#" className="btn btn-success mx-2">
                    <ForwardIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
};

export default RaiseTicketNotification;
