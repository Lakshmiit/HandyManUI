import React, {useState} from "react";
import AdminSidebar from './AdminSidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

const TimeSlotBooking = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const {selectedUserType} = useParams();
    const [activeTab, setActiveTab] = useState("");

    const timeSlots = [
        "8:30 AM - 9:30 AM",
        "9:30 AM - 10:30 AM",
        "10:30 AM - 11:30 AM",
        "11:30 AM - 12:30 PM",
        "12:30 PM - 1:30 PM",
        "1:30 PM - 2:30 PM",
        "2:30 PM - 3:30 PM",
        "3:30 PM - 4:30 PM",
        "4:30 PM - 5:30 PM",
        "5:30 PM - 6:30 PM",
        "6:30 PM - 7:30 PM",
        "7:30 PM - 8:30 PM",
      ];


const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
};

const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
  };
 return (

    <div className="d-flex">
        {!isMobile && (
        <div className="ml-0 p-0 adm_mnu">
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
<h2>Date and Time Slot Booking</h2>
<div className="tabs">
  <button
    className={`tab-item ${activeTab === "Option 1" ? "active" : ""}`}
    onClick={() => setActiveTab("Option 1")}
  >
    Option 1
  </button>
  <button
    className={`tab-item ${activeTab === "Option 2" ? "active" : ""}`}
    onClick={() => setActiveTab("Option 2")}
  >
    Option 2
  </button>
</div>
<div className="calender-section">
    <label htmlFor="date-picker">Select a Date: </label>
    <input
    type="date"
    id="date-picker"
    value={selectedDate}
    onChange={handleDateChange}
    className="date-picker"
    />
</div>
<div className="time-slot-section">
    <div className="d-flex justify-content-center align-items-center m-2">
        <div className="date-container p-2">
        <h3 className="date-display">
            <span className="day">MONDAY</span>
            <span className="date"> 2 DEC </span>
            <span className="year">2025</span>
        </h3>
        </div>
    </div>
        <h3 className="text-center">Select Your Time Slot</h3>
        <div className="time-slots">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`time-slot-button ${
                selectedTimeSlot === slot ? "selected" : ""
              }`}
              onClick={() => handleTimeSlotClick(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
    </div>
  </div>  
</div>
 );
};

export default TimeSlotBooking;