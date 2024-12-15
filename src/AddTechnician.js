import React, {useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RouteIcon from '@mui/icons-material/Route';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';


const AddTechnician = ({onClose, onSubmit}) => {
    const [ name, setName ] = useState(""); 
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ address, setAddress] = useState("")
    const [ state, setState] = useState("");
    const [ district, setDistrict] = useState("");
    const [ pincode, setPincode ] = useState("");
    const [landmark, setLandmark ] = useState("");
    const [ aadhaarNumber, setAadhaarNumber ] = useState("");
    const [ category, setCategory ] = useState("category 1");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTechnician = {
            name, 
            emailAddress,
            phoneNumber,
            address:"",
            state,
            district,
            pincode,
            landmark,
            aadhaarNumber,
            category,
        };
        onSubmit(newTechnician);
    };

    return (

    <div className="d-flex flex-row justify-content-start align-items-start m-2">
        <div className="sde_mnu">
          {/* Sidebar Menu */}
          <div className="_mnu_dv"><span><DashboardIcon /> Dashboard</span></div>
          <div className="_mnu_dv"><span><SupportAgentIcon /> Raise Ticket</span></div>
          <div className="_mnu_dv"><span><PersonAddIcon /> Add Member</span></div>
          <div className="_mnu_dv"><span><RouteIcon /> Track Ticket Status</span></div>
          <div className="_mnu_dv"><span><NotificationsIcon /> Notifications</span></div>
          <div className="_mnu_dv"><span><PaymentsIcon /> Buy Products</span></div>
          <div className="_mnu_dv"><span><InventoryIcon /> Orders</span></div>
          <div className="_mnu_dv"><span><ShoppingCartIcon /> Cart</span></div>
          <div className="_mnu_dv"><span><AccountCircle /> My Accounts</span></div>
        </div>

            <div className="bg-white rounded-3 bx_sdw w-50 m-4">
                <div className="bg-warning d-flex justify-content-between align-items-center py-2 px-3 rounded-top">
                    <h4 className="m-0">Add Technician</h4>
                    <span className="text-secondary fs-2"
                    onClick={onClose}
                    style={{ cursor: "pointer"}}
                    >
                        &times;
                    </span>
                </div>

                <div className="bg-white p-1 rounded-bottom">
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-3">
                            <label>Name<span className="req_star">*</span></label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* Email Address */}
                        <div className="mb-3">
                            <label>Email Address<span className="req_star">*</span></label>
                            <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </div>
                        {/* Phone Number */}
                        <div className="mb-3">
                            <label>Phone Number<span className="req_star">*</span></label>
                            <input
                            type="number"
                            className="form-control"
                            placeholder="Enter your phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {/* Address */}
                        <div className="form-control">
                            <label>Address<span className="req_star">*</span></label>
                            <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            /> 
                        </div>

                        {/* State */}
                        <div className="form-control">
                            <label>State<span className="req_star">*</span></label>
                            <select
                            type="text"
                            className="form-select"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            >
                                <option>State 1</option>
                                <option>State 2</option>
                            </select>
                        </div>

                        {/* District */}
                        <div className="form-control">
                            <label>District<span className="req_star">*</span></label>
                            <select
                            type="text"
                            className="form-control"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            >
                                <option>District 1</option>
                                <option>District 2</option>
                            </select>
                        </div>

                        {/* Pincode */}
                        <div className="form-control">
                            <label>Pincode<span className="req_star">*</span></label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>


                        {/* Landmark */}
                        <div className="form-control">
                            <label>Landmark<span className="req_star">*</span></label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Landmark"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            />
                        </div>

                        {/* Aadhaar Number */}
                        <div className="mb-3">
                            <label>Aadhaar Number<span className="req_star">*</span></label>
                            <input 
                                type="number"
                                className="form-control"
                                placeholder="Enter your Aadhaar Number"
                                value={aadhaarNumber}
                                onChange={(e) => setAadhaarNumber(e.target.value)}
                            />
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label>Category<span className="req_star">*</span></label>
                            <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                                <option>Category 4</option>
                                <option>Category 5</option>
                            </select>
                        </div>

                        {/* Close and Submit Button */}
                        <div className="d-flex gap-2">
                            <button type="button"
                            className="text-dark btn btn-light w-50"
                            onClick={onClose}
                            >
                                Close
                            </button>
                            <button 
                            type="submit"
                            className="text-dark btn btn-warning w-50">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTechnician;
