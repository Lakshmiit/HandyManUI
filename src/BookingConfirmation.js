import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import image from './img/technician.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const Navigate = useNavigate();
  const {userType} = useParams();
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const {raiseTicketId} = useParams();
   const [isChecked, setIsChecked] = useState('');
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
  const [option1Day, setOption1Day] = useState('');
  const [option2Day, setOption2Day] = useState('');
  const [approvedAmount, setApprovedAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [option1Time, setOption1Time] = useState('');
  const [option2Time, setOption2Time] = useState('');
  const [technicianData, setTechnicianData] = useState('');
  const [technicianFullName, setTechnicianName] = useState('');
  const [technicianAddress, setTechnicianAddress] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [technicianPhotoId, setTechnicianPhotoId] = useState('');
  const [ticketId, setTicketId] = useState('');
  
  useEffect(() => {
      console.log(loading,id, technicianData);
    }, [loading, id, technicianData]);
  

  useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const data = await response.json();
        setTicketData(data);
        // alert(JSON.stringify(data));
        setState(data.state);
        setTicketId(data.raiseTicketId);
        setDistrict(data.district);
        setZipcode(data.zipCode);
        setAddress(data.address);
        setSubject(data.subject);
        setDetails(data.details);
        setId(data.id);
        setCategory(data.category);
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setFullName(data.customerName);
        setApprovedAmount(data.approvedAmount);
        setOption1Day(data.option1Day || '');
        setOption2Day(data.option2Day || '');
        setOption1Time(data.option1Time || '');
        setOption2Time(data.option2Time || '');
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


  useEffect(() => {
    const fetchtechnicianData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Technician/GetTechnicianDetailsForInvoice?TechnicianId=${lowestBidder}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const invoiceData = await response.json();
        setTechnicianData(invoiceData);
        // alert(JSON.stringify(invoiceData));  
        setTechnicianName(invoiceData.technicianFullName);
        setAadharNumber(invoiceData.aadharNumber);
        setTechnicianAddress(invoiceData.address);
        setTechnicianPhotoId(invoiceData.technicianPhotoId);
        } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      } 
    };
    fetchtechnicianData();
  }, [lowestBidder]);

    // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveTicket = async (e) => {
    e.preventDefault();
  
    if (!isChecked) {
      alert("You must accept the terms and conditions.");
      return;
    } 
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
      Option1Day: option1Day,
      Option1Time: option1Time,
      Option2Day: option2Day,
      Option2Time: option2Time,
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
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
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
      Navigate(`/paymentConfirmation/${raiseTicketId}/${userType}`)
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
<h2 className="title">TIME SLOT BOOKING CONFIRMATION</h2>
    <div className="booking-confirmation">
      <p className='text-center'><strong className='name'>{fullName}</strong> Thank you for the service your time slot has booked at</p>

      <table className="booking-table">
        <tbody>
          <tr>
            <td><strong>Ticket Number</strong></td>
            <td>{ticketId}</td>   
          </tr>
          <tr>
            <td><strong>Description</strong></td>
            <td>{details}</td>
          </tr>
          <tr>
            <td><strong>Approved Amount</strong></td>
            <td>{approvedAmount}</td>
          </tr>
          <tr> 
            <td><strong>Time Slot Booking</strong></td>
            <td className='time-slot-booking'>
                <div className='timeslots-option d-flex flex-row'>
                <div className='slot m-2 p-2'>
                     <strong>Option 1</strong> 
                     <div><span style={{ fontWeight: "bold" }}>Date: </span>{option1Day}</div>
                     <div><span style={{ fontWeight: "bold" }}>Time: </span>{option1Time}</div>
                </div>
                <div className='slot m-2 p-2'>
                    <strong>Option 2</strong>
                    <div><span style={{ fontWeight: "bold" }}>Date: </span>{option2Day}</div>
                    <div><span style={{ fontWeight: "bold" }}>Time: </span>{option2Time}</div>
                </div>
                </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="section-title">Customer Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Customer Name:</strong></td>
            <td>{fullName}</td>
            </tr>
            <tr>
            <td><strong>Address:</strong></td>
            <td>{address}</td>
            </tr>
        </tbody>
      </table>


      <h3 className="section-title">Technician Details</h3>
      <div className="technician-details-container">
  <table className="technician-details-table">
    <tr>
      <td><strong>Technician Name:</strong></td>
      <td>{technicianFullName}</td>
    </tr>
    <tr>
      <td><strong>Aadhar Number:</strong></td>
      <td>{aadharNumber}</td>
    </tr>
    <tr>
      <td className='fw-bold'><strong>Address:</strong></td>
      <td>{technicianAddress}</td>
    </tr>
  </table>
  <div className="technician-image-wrapper" style={{ textAlign: "center", marginTop: "10px" }}>
    <img
      src={technicianPhotoId}   
      alt="Technician"
      className="technician-image"
      style={{ width: "150px", height: "auto" }}
    />
  </div>
  </div>

      <div className="note m-2">
           <label>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-1"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}/>
            Terms and conditions (T&C) are a legally binding document that outlines the rules and expectations for using a product or service.
          </label>
          <div className="button">
            <button className="btn-back">Back</button>
            <button className="btn-continue" onClick={handleSaveTicket}>Continue</button>
          </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default BookingConfirmation;