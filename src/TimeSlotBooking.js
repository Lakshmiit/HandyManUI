import React, {useEffect, useState} from "react";
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import './App.css';
import { useParams, useNavigate } from "react-router-dom";

const TimeSlotBooking = () => {
  const Navigate = useNavigate();
  const {userType} = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activeTab, setActiveTab] = useState("Option 1");
    const [fullName, setFullName] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const timeSlots = [
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM",
        "5:00 PM - 6:00 PM",
        "6:00 PM - 7:00 PM",
      ];
    const months = ["January", "February", "March", "April", "May", 
      "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "", total: "" }]);
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]); 
  const [requestType, setRequestType] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [zipCode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [isWithMaterial, setIsWithMaterial] = useState(false);
  const [category, setCategory] = useState('');
  const [lowestDealerBidder, setLowestDealerBidder] = useState('');
  const [lowestBidder, setLowestBidder] = useState('');
  // const [customerTimeSlot, setCustomerTimeSlot] = useState([{day: "", time: ""}]);
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const [option1Selection, setOption1Selection] = useState({day:"", time: ""});
  const [option2Selection, setOption2Selection] = useState({day:"", time: ""});
  const [approvedAmount, setApprovedAmount] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  // const [option1Day, setOption1Day] = useState('');
  // const [option1Time, setOption1Time] = useState('');
  // const [option2Day, setOption2Day] = useState('');
  // const [option2Time, setOption2Time] = useState('');

  
  useEffect(() => {
    console.log(loading, id);
  }, [loading, id]);

      const handlePrevMonth = () => {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      };
    
      const handleNextMonth = () => {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      };

      const totalDays = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysArray = [
    ...Array(firstDayIndex).fill(null),  
    ...Array.from({ length: totalDays }, (_, i) => i + 1)
  ];

  const calendarCells = daysArray.map((day, index) => {
    if (!day) {
      return { id: index, day: null, isPastDate: false, isSelected: false };
    }
  
    const cellDate = new Date(currentYear, currentMonth, day);
    cellDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const tomorrow = new Date(todayDate);
  tomorrow.setDate(todayDate.getDate() + 1);

  const isPastDate = cellDate < today;
  const isTomorrowDate = cellDate.getDate() === tomorrow.getDate() && cellDate.getMonth() === tomorrow.getMonth();
  
    return {
      id: index,
      day: day,
      isSelected:
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear,
      isPastDate: isPastDate,
      isTomorrowDate: isTomorrowDate,
    };
  });

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return { day: "", date: "", month: "", year: "" };  
    }
    
    return {
        day: daysOfWeek[date.getDay()],     
        date: date.getDate(),           
        month: months[date.getMonth()],   
        year: date.getFullYear(),         
    };
};

const formattedDate = selectedDate ? formatDate(selectedDate) : null;
    
      const handleDateClick = (day) => {
        const selectedDateObj = new Date(currentYear, currentMonth, day);
        selectedDateObj.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
      
        if (selectedDateObj < tomorrow) {
          alert("You cannot select today or past dates.");
          return;
        }
      
        if (activeTab === "Option 1") {
          setOption1Selection((prev) => ({ ...prev, date: formatDate(selectedDateObj) }));
        } else if (activeTab === "Option 2") {
          setOption2Selection((prev) => ({ ...prev, date: formatDate(selectedDateObj) }));
        }
        setSelectedDate(selectedDateObj);
      };            

      useEffect(() => {
        if (activeTab === "Option 1" && selectedTimeSlot) {
          setOption1Selection((prev) => ({ ...prev, time: selectedTimeSlot }));
        } else if (activeTab === "Option 2" && selectedTimeSlot) {
          setOption2Selection((prev) => ({ ...prev, time: selectedTimeSlot }));
        }
      }, [activeTab, selectedTimeSlot]);

      // useEffect(() => {
      //   if (activeTab === "Option 2" && selectedTimeSlot) {
      //     setOption2Selection((prev) => ({ ...prev, time: selectedTimeSlot }));
      //   }
      // }, [activeTab, selectedTimeSlot]); 
      
      const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
        if (activeTab === "Option 1") {
          setOption1Selection({ ...option1Selection, time: slot });
        } else if (activeTab === "Option 2") {
          if (slot === option1Selection.time) {
            alert("You cannot select the same time slot as Option 1. Please choose a different slot.");
          } else {
            setOption2Selection({ ...option2Selection, time: slot });
          }
        }
      };
 
  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api

/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const data = await response.json();
        // alert(data);
        setTicketData(data);
        setState(data.state);
        setDistrict(data.district);
        setZipcode(data.zipCode);
        setAddress(data.address);
        setSubject(data.subject);
        setDetails(data.details);
        setId(data.id);
        setCategory(data.category);;;
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setFullName(data.customerName);
        // setOption1Day(data.option1Day);
        // setOption1Time(data.option1Time);
        // setOption2Day(data.option2Day);
        // setOption2Time(data.option2Time);
        setOption1Selection({ day: data?.option1Day || "", time: data?.option1Time || "" });
        setOption2Selection({ day: data?.option2Day || "", time: data?.option2Time || "" });
        setApprovedAmount(data.approvedAmount);
        setLowestBidder(data.lowestBidderTechnicainId);
        setLowestDealerBidder(data.lowestBidderDealerId)
        setRequestType(data.requestType || 'Without Material');
        setAttachments(data.attachments);
        setSpecifications(data.materials || [{material: "", quantity: "", price: "", total: ""}]);
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchticketData();
  }, [raiseTicketId]);

  const handleContinue = () => {
  if (activeTab === "Option 1") {
    if (selectedDate && selectedTimeSlot) {
      setOption1Selection({
        date: formatDate(selectedDate),
        time: selectedTimeSlot,
      });
      setActiveTab("Option 2");  
    } else {
      //alert("Please select date and time for Option 1.");
    }
  } else if (activeTab === "Option 2") {
    if (selectedDate && selectedTimeSlot) {
      setOption2Selection({
        date: formatDate(selectedDate),
        time: selectedTimeSlot,
      });
    }

      if (option1Selection.date && option2Selection.date) {
        handleSaveTicket();
      } 
      // else {
      //   alert("Please complete Option 1 selection before submitting.");
      // }
    // } else {
    //   alert("Please select date and time for Option 2.");
    // }
  }
};

  
  const handleSaveTicket = async (e) => {
    if (e) e.preventDefault();
  
    if (!option1Selection || !option2Selection) {
      alert("Please select both time slots before submitting.");
      return;
    }

    if (!isChecked) {
      alert("You must accept the terms and conditions.");
      return;
    } 
  
    const customerTimeSlot = [
      {
        Date1: `${option1Selection.date.day}, ${option1Selection.date.date} ${option1Selection.date.month} ${option1Selection.date.year}`,
        Time1: option1Selection.time,
      },
      {
        Date2: `${option2Selection.date.day}, ${option2Selection.date.date} ${option2Selection.date.month} ${option2Selection.date.year}`,
        Time2: option2Selection.time,
      }
    ];  
  
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      Date: new Date(),
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: assignedTo,
      id: raiseTicketId,
      status: status,
      internalStatus: "Pending",
      CustomerId: customerId,
      State: state, 
      LowestBidderTechnicainId: lowestBidder,
      LowestBidderDealerId: lowestDealerBidder,
      ApprovedAmount: approvedAmount,
      customerName: fullName,
      Option1Day: customerTimeSlot[0].Date1,
      Option1Time: customerTimeSlot[0].Time1,
      Option2Day: customerTimeSlot[1].Date2,
      Option2Time: customerTimeSlot[1].Time2,           
      IsMaterialType: isWithMaterial,
      District: district,
      ZipCode: zipCode,
      RequestType: requestType,
      Attachments: attachments,
      Materials: specifications.map((spec) => ({
        material: spec.material,
        Quantity: spec.quantity,
      })),
      comments: commentsList.map((Comment) => ({
        updatedDate: Comment.updatedDate,
        commentText: Comment.commentText,
      })),
    };
  
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api

/RaiseTicket/${raiseTicketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to save ticket data');
      }
      alert('Ticket saved Successfully!');
      Navigate(`/bookingConfirmation/${raiseTicketId}/${userType}`)
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.');
    }
  };
  

 return (
    <div className="d-flex">
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
<h2>Date and Time Slot Booking</h2>
<div className="tabs">
  <button
    className={`tab-item ${activeTab === "Option 1" ? "active-yellow" : "active-white"}`}
    onClick={() => setActiveTab("Option 1")}
  >
    Option 1
  </button>
  <button
    className={`tab-item ${activeTab === "Option 2" ? "active-yellow" : "active-white"}`}
    onClick={() => setActiveTab("Option 2")}
  >
    Option 2  
  </button>
</div>

<div className="calendar-section">
    <div className="calendar-header">
      <span>{months[currentMonth]} {currentYear}</span>
      <div className="m-2">
      <button className="nav-btn" onClick={handlePrevMonth}>&#60;</button>
       <button className="nav-btn" onClick={handleNextMonth}>&#62;</button> 
       </div>
    </div>
    <div className="calendar-grid">
       {daysOfWeek.map((day) => (
        <div key={day} className="day-header">{day}</div>
       ))}
       {calendarCells.map((cell) => (
          <div
            key={cell.id}
            className={`day-cell ${cell.isSelected  ? "selected" : ""} ${cell.isPastDate ? "disabled" : ""}`}
            onClick={() => cell.day && handleDateClick(cell.day)}
          >
            {cell.day || ""}
          </div>
        ))}
    </div>
</div>

<div className="time-slot-section">
    <div className="d-flex justify-content-center align-items-center m-2">
        <div className="date-container p-2">
        <h3 className="date-display">
          {formattedDate ? ( 
            <>
            <span className="day">{formattedDate.day}</span>
            <span className="date">{" "}<strong>{formattedDate.date}</strong>{" "} </span>
            <span className="date"> {formattedDate.month} </span>
            <span className="year">{formattedDate.year}</span>
            </>
          ) : (
            <span>Invalid Date</span>
          )}
        </h3>
        </div>
    </div>
        <h5 className="time-slot-title">Select Your Time Slot</h5>
        <div className="time-slots">
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              className={`time-slot-button ${
                selectedTimeSlot === slot ? "selected" : ""
              }`}
              onClick={() => handleTimeSlotClick(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>

    <div className="selected-details d-flex flex-row">
    <p className="m-1">
      <strong><span style={{ color: "black" }}>Date:</span></strong> {formattedDate ? `${formattedDate.date} ${formattedDate.month} ${formattedDate.year}` : "Not selected"}
    </p>
    <p className="m-1">
      <strong><span style={{ color: "black" }}>Time Slot:</span></strong> {selectedTimeSlot || "Not selected"}
    </p>
  </div>

        <div className="note m-2">
          {activeTab === "Option 2" && (
            <>
           <label>
            <input 
            type="checkbox" 
            className="form-check-input border-dark m-2"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            />
            Terms and conditions (T&C) are a legally binding document that outlines the rules and expectations for using a product or service.
          </label>
          {/* <div className="button">
          <button className="btn-back">Back</button>
          <button className="btn-continue" onClick={handleSaveTicket}>Continue</button>
        </div> */}
        </>
          )} 
          <div className="button">
            <button className="btn-back">Back</button>
            <button className="btn-continue" onClick={handleContinue}>{activeTab === "Option 1" ? "Continue" : "Submit"}</button>
          </div>
        </div>
    </div>
  </div>   
</div>
 );
};

export default TimeSlotBooking;