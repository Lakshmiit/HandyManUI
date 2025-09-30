import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';
import Footer from './Footer.js';
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { FaTrash, FaEye } from "react-icons/fa";
import {
  Dashboard as MoreVertIcon,
  Forward as ForwardIcon,
} from "@mui/icons-material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./App.css";
 
const AdminGroceryItemNotificationGrid = () => {
  // const navigate = useNavigate();
  //const [status, setStatus] = useState("");
//   const {raiseTicketId} = useParams();
  // const [assignedTo, setAssignedTo] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [groceryData, setGroceryData] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState(""); 
  const [zipCode, setZipcode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]); const [districts, setDistricts] = useState([]); 
  const [pinCodes, setPinCodes] = useState([]);
  // const [assigned, setAssigned] = useState([]);
  const rowsPerPage = 15;
 
  // useEffect(() => {
  //   console.log(setAssignedTo);
  // }, [setAssignedTo]);
  
  // useEffect(() => {
  //   setLoading(true);
  //   const url = `https://handymanapiv2.azurewebsites.net/api/Mart/GetAllMartItems`
  //   axios.get(url)
  //     .then(response => {
  //       const groceries = response.data.map((grocery) => ({
  //         ...grocery,
  //       }));
  //       // const groceryitems = groceries.filter((grocery) =>( grocery.status === "Closed" || grocery.status === "Assigned") && (grocery.assignedTo === "Customer Care" || grocery.assignedTo==="Customer"));
  //        const groceryitems = groceries.filter((grocery) =>( grocery.status === "Closed"));
  //       setFilteredData(groceryitems);
  //       setGroceryData(groceryitems);

  //       const uniqueStates = [...new Set(groceryitems.map(grocery => grocery.state))];
  //       const uniqueDistricts = [...new Set(groceryitems.map(grocery => grocery.district))];
  //       const uniquePinCode = [...new Set(groceryitems.map(grocery => grocery.zipCode))];
  //       const uniqueAssigned = [...new Set(groceryitems.map(grocery => grocery.assignedTo))]
  //       setStates(uniqueStates);
  //       setDistricts(uniqueDistricts);
  //       setPinCodes(uniquePinCode);
  //       setAssigned(uniqueAssigned);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching grocery data:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
  setLoading(true);
  const url = `https://handymanapiv2.azurewebsites.net/api/Mart/GetAllMartItems`;

  axios.get(url)
    .then(response => {
      // Get all groceries
      const groceries = response.data.map(grocery => ({ ...grocery }));

      // ✅ Only Closed (case insensitive match)
      const closedTickets = groceries.filter(
        grocery => grocery.status?.toLowerCase() === "closed"
      );

      setGroceryData(closedTickets);
      setFilteredData(closedTickets);

      // ✅ Extract unique values for dropdowns
      const uniqueStates = [...new Set(closedTickets.map(g => g.state))];
      const uniqueDistricts = [...new Set(closedTickets.map(g => g.district))];
      const uniquePinCodes = [...new Set(closedTickets.map(g => g.zipCode))];

      setStates(uniqueStates);
      setDistricts(uniqueDistricts);
      setPinCodes(uniquePinCodes);
    })
    .catch(error => {
      console.error("Error fetching grocery data:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  const handleDelete = (groceryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      axios.delete(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${groceryId}`)
        .then(() => {
          setGroceryData(prevData => prevData.filter(grocery => grocery.id !== groceryId));
          setFilteredData(prevData => prevData.filter(grocery => grocery.id !== groceryId));
        })
        .catch(error => {
          console.error("Error deleting product:", error);
        });
    } 
  };    

  // useEffect(() => {
  //   let filtered = groceryData;

  //   if (state) {
  //     filtered = filtered.filter((grocery) => grocery.state === state);
  //   }

  //   if (district) {
  //     filtered = filtered.filter((grocery) => grocery.district === district);
  //   }

  //   if (zipCode) {
  //     filtered = filtered.filter((grocery) => grocery.zipCode === zipCode);
  //   }
  //   if (assignedTo) {
  //     filtered = filtered.filter((grocery) =>grocery.assignedTo === assignedTo);
  //   }
  //   setFilteredData(filtered);
  //   setCurrentPage(1);
  // }, [state, district, zipCode, assignedTo, groceryData]);

  useEffect(() => {
  let filtered = groceryData;

  if (state) {
    filtered = filtered.filter(g => g.state === state);
  }
  if (district) {
    filtered = filtered.filter(g => g.district === district);
  }
  if (zipCode) {
    filtered = filtered.filter(g => g.zipCode === zipCode);
  }

  setFilteredData(filtered);
  setCurrentPage(1);
}, [state, district, zipCode, groceryData]);

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
 const currentProduct = filteredData.slice(indexOfFirstTicket, indexOfLastTicket);

 if (loading) {
   return <div>Loading...</div>;
 }

  return (
    <>
    <div className="d-flex flex-row justify-content-start align-items-start mt-mob-50">
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

      <div className={`container ${isMobile ? "w-100" : "w-75"}`}>
        <h2 className="text-center">Grocery Item Notifications</h2>
        <div className={`d-flex ${isMobile ? "flex-column" : "flex-wrap"} align-items-center justify-content-between`}>
          <div className={`form-group ${isMobile ? "col-12" : "col-12 col-md-2"} m-2`}>
            <label>State</label>
            <select
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">All States</option>
              {states.map((stateOption, index) => (
                <option key={index} value={stateOption}>{stateOption}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-12 col-md-2 m-2">
            <label>District</label>
            <select
              className="form-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">All Districts</option>
              {districts.map((districtOption, index) => (
                <option key={index} value={districtOption}>{districtOption}</option>
              ))}
            </select>
          </div>
          {/* Pin Code */}
          <div className="form-group col-12 col-md-2 m-2">
            <label>Pin Code</label>
            <select
              className="form-control"
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
            >
              <option value="">Select Pincode</option>
              {pinCodes.map((pinCodeOption, index) => (
                <option key={index} value={pinCodeOption}>{pinCodeOption}</option>
              ))}
            </select>
          </div>

          {/* Assigned To */}
          {/* <div className="form-group col-12 col-md-2 m-2">
            <label>Assigned To</label>
            <select
              className="form-control"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Assigned To</option>
              {assigned.map((assignedOption, index) => (
                <option key={index} value={assignedOption}>{assignedOption}</option>
              ))} 
            </select>
          </div> */}
        </div>
        
        <>
        {currentProduct.length > 0 ? (
        !isMobile ? (
        <table className="table table-bordered equal-table">
  <thead>
    <tr>
      <th style={{ width: "15%" }}>Customer ID</th>
      <th style={{ width: "15%" }}>Grocery ID</th>
      <th style={{ width: "15%" }}>Category</th>
      <th style={{ width: "30%" }}>Product Name</th>
      <th style={{ width: "15%" }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentProduct.map((grocery, index) => (
      <tr key={index}>
        <td>{grocery.customerId}</td>
        <td>{grocery.martId}</td>
        <td>
          {grocery.categories &&
            grocery.categories.map((cat, i) => (
              <div key={i}>{cat.categoryName}</div>
            ))}
        </td>
       <td>
          {grocery.categories && (
            <ol style={{ paddingLeft: "20px", margin: 0 }}>
              {grocery.categories.flatMap((cat) =>
                cat.products.map((p, j) => (
                  <li key={j}>{p.productName}</li>
                ))
              )}
            </ol>
          )}
        </td>
        <td className="d-flex align-items-center">
          <Link
            to={`/adminGroceryOrderPage/${grocery.id}`}
            className="btn btn-info mx-2"
          >
            <FaEye />
          </Link>
          <Link
            onClick={() => handleDelete(grocery.id)}
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
          {currentProduct.map((grocery, index) => (
            <div key={index} className="ticket-card">
              <div className="ticket-body">
                <p className="mb-1">
                  <strong>Customer ID:</strong> {grocery.customerId}
                </p>
                <p className="mb-2">
                  <strong>Grocery ID:</strong> {grocery.martId}
                </p>

                <div className="mb-2">
                  <strong>Category:</strong>
                  <div className="mt-1">
                    {grocery.categories && grocery.categories.length > 0 ? (
                      grocery.categories.map((cat, i) => (
                        <div key={i}>{cat.categoryName}</div>
                      ))
                    ) : (
                      <span className="text-muted"> — </span>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <strong>Product Name:</strong>
                  <div className="mt-1">
                    {grocery.categories && grocery.categories.length > 0 ? (
                      <ol style={{ paddingLeft: "20px", margin: 0 }}>
                        {grocery.categories.flatMap((cat) =>
                          (cat.products || []).map((p, j) => (
                            <li key={`${cat.categoryName}-${j}`}>{p.productName}</li>
                          ))
                        )}
                      </ol>
                    ) : (
                      <span className="text-muted"> — </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="ticket-actions d-flex">
                <Link
                  to={`/adminGroceryOrderPage/${grocery.id}`}
                  className="btn btn-info mx-2"
                >
                  <FaEye />
                </Link>
                <Link
                  onClick={() => handleDelete(grocery.id)}
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
        )
      ) : (
        <p className="text-center text-muted">No Tickets Data Found</p>
        )}
      </>

        <div className="mt-4 text-end">
          <Link to='/adminNotifications' className="btn btn-warning text-white mx-2" title='Back'>
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
  <Footer /> 
</>
  );
};

export default AdminGroceryItemNotificationGrid;
