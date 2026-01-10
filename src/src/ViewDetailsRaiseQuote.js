import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';

import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link, useParams } from 'react-router-dom';
import './App.css';
import JSZip from "jszip";
import { saveAs } from "file-saver";
const RaiseQuoteTechnicianDetails = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {userId} = useParams();
  const {raiseTicketId} = useParams();
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [id, setId] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [isMaterialType, setIsWithMaterial] = useState('');
  const [ticketData, setTicketData] = useState(''); 
  const [technicianData, setTechnicianData] = useState(null);
  const [requestType, setRequestType] = useState('Without Material');
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "", total: ""}]); 
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]);
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [customerId, setCustomerId] = useState(''); 
  const [zipCode,setzipCode]=useState('');
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState('');
  const [newPhotoCount , setPhotoCount] = useState(0);
  const [othercharges, setOtherCharge] = useState('');
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [serviceCharges, setServiceCharge] = useState('');
  const [fixedServiceCharge, setFixedServiceCharge] = useState('');
  const [gst, setGST] = useState('');
  const [fixedGST, setFixedGST] = useState('');
  const [totalAmount, setTotalAmount] = useState();
  const [enterQuoteAmount, setQuote] = useState('');
  const [fixedQuote, setFixedQuote] = useState('');
  const [discount, setDiscount] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [addrRmarks, setAddrRmarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [userType] = useState('technician');
  const { selectedUserType} = useParams();
  const {category} = useParams();
  const [fullName, setFullName] = useState('');
  // const [internalStatus, setInternalStatus] = useState('');
  const [ticketId, setTicketId] = useState('');
  
  useEffect(() => {
    console.log(ticketData, status, technicianData, ticketId);
  }, [ticketData, status, technicianData, ticketId]); 

  useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const data = await response.json();
        setTicketData(data);
        setTicketId(data.raiseTicketId);
        setState(data.state);
        setDistrict(data.district);
        setzipCode(data.zipCode);
        setAddress(data.address);
        setDetails(data.details);
        setSubject(data.subject);
        setId(data.id);
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setFullName(data.customerName);
        setRequestType(data.requestType || 'Without Material');
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
        const imageRequests =
          data.attachments?.map((photo) => fetch(
              `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
            )
            .then((res) => res.json())
              .then((data) => ({
              
                src: photo,
                imageData: data.imageData,
              }))
          ) || [];
        const images = await Promise.all(imageRequests);
        setAttachments(images);
        setPhotoCount(images.length);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
        window.alert('Failed to load ticket data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchticketData();
  }, [raiseTicketId]); 

  const handleDownloadAllAttachments = async () => {
    if (attachments.length === 0) {
      alert("No files to download");
      return;
    }
  
    const zip = new JSZip();
    const folder = zip.folder("TicketAttachments"); // Optional folder name inside ZIP
  
    // Add files to ZIP
    for (const attachment of attachments) {
      try {
        const response = await fetch(`data:image/jpeg;base64,${attachment.imageData}`);
        const blob = await response.blob();
        folder.file(attachment.src.split("/").pop(), blob); // Add file to the ZIP folder
      } catch (error) {
        console.error("Error fetching attachment:", error);
      }
    }
  
    // Generate ZIP and download
    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "TicketAttachments.zip");
    } catch (error) {
      console.error("Error generating ZIP:", error);
      alert("Failed to download attachments. Please try again.");
    }
  };
  
  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      id: id,
      RaiseTicketId: ticketId,
      date: new Date(),
      address: address,
      subject: subject,
      details: details,
      status: status,
      category: ticketData.category,
      assignedTo:"Technical Agency",
      InternalStatus: "Pending",
      TicketOwner: customerId,
      CustomerId: customerId,
      state: state,
      isMaterialType: isMaterialType,
      district: district,
      ZipCode: zipCode,
      RequestType: requestType,
      attachments:attachments.map((file) => file.src),
      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
          price: "",
          total: "",
      })),
      comments: commentsList.map((comment) => ({
          updatedDate: comment.updatedDate,
          commentText: comment.commentText,
      })),
      LowestBidderTechnicainId: "",
      LowestBidderDealerId: "",
      ApprovedAmount: "",
      customerName: fullName,
      Option1Day: "", 
      Option1Time: "",
      Option2Day: "",
      Option2Time: "",
      TechnicianList: userId,
      DealerList: [],
      Rating: "",
      RateQuotedBy: "",
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
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.')
    }
  }; 

//   const handleSaveTicket = async (e) => {
//     e.preventDefault();
//    // alert(technicianId);
//     const payload1 = {
//       id :"string",
//       quotedDate: new Date(), 
//       raiseAQuoteId: "string",
//       CustomerId: ticketData.customerId,
//       ticketId: ticketId,
//       technicianId: technicianId,
//       enterQuoteAmount: enterQuoteAmount.toString(),
//       fixedQuote: fixedQuote.toString(),
//       discount: discount.toString(),
//       fixedDiscount: fixedDiscount.toString(),
//       othercharges: othercharges.toString(),
//       fixedOtherCharge: fixedOtherCharge.toString(),
//       serviceCharges: serviceCharges.toString(),
//       fixedServiceCharge: fixedServiceCharge.toString(),
//       gst: gst.toString(),
//       fixedGST: fixedGST.toString(),
//       totalAmount: totalAmount.toString(),
//       raiseTicketId: raiseTicketId,
//       addrRmarks: addrRmarks.map((comment) => ({
//         requestedDate: comment.requestedDate,
//         remarks: comment.remarks,
//     })),
//     materials: specifications.map((spec) => ({
//       material: spec.material,
//       quantity: spec.quantity,
//       price: "",
//       total: "",
//   })),
//   materialQuotation: materialQuotation.map((mat) => ({
//     discount: "",
//     fixedDiscount: "",
//     deliveryCharges: "",
//     fixedDeliveryChargs: "",
//     serviceCharge: "",
//     fixedServicecharges: "",
//     gst: "",
//     fixedGST: "",
//     grandtotal: "",
//   })),
//     }; 
//     try {
//       //imageUrls="";
//       const response = await fetch(`https://handymanapiv2.azurewebsites.net/api
// /RaiseAQuote/CreateRaiseAQuote`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload1),
//       });
    
//       if (!response.ok) {
//         throw new Error('Failed to save Technician ticket data');
//       }
     
//       alert('Ticket  Technician  saved Successfully!');
//     } catch (error) {
//       console.error('Error saving Technician ticket data:', error);
//       window.alert('Failed to save the Technician ticket data. Please try again later.')
//     }
//   };

  useEffect(() => {
    if (raiseTicketId && userId) {
      const fetchtechnicianData = async () => {
        try {
          const technicianResponse = await fetch(
            `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByTechnicianId?raiseTicketId=${raiseTicketId}&TechnicianId=${userId}`
          );
          if (!technicianResponse.ok) {
            throw new Error('Failed to fetch technician data');
          }
          const techData = await technicianResponse.json();
          setTechnicianData(techData); 
          // alert(JSON.stringify(techData));
          setQuote(techData.enterQuoteAmount);
          setSpecifications(techData.materials || [{ material: "", quantity: ""}])
          setQuote(techData.enterQuoteAmount);
          setFixedQuote(techData.fixedQuote);
          setDiscount(techData.discount);
          setFixedDiscount(techData.fixedDiscount);
          setOtherCharge(techData.othercharges);
          setFixedOtherCharge(techData.fixedOtherCharge);
          setServiceCharge(techData.serviceCharges);
          setFixedServiceCharge(techData.fixedServiceCharge);
          setGST(techData.gst);
          setFixedGST(techData.fixedGST);
          setTotalAmount(techData.totalAmount);
          setAddrRmarks(techData.addRemarks || [{ requestedDate: new Date(), remarks: "" }]);
        } catch (error) {
          console.error('Error fetching technician data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchtechnicianData();
    }
  }, [raiseTicketId, userId]);


// const handleTechnicianTicket = async (e) => {
//   e.preventDefault();
//   const payload3 = {
//     id :"string",
//     quotedDate: new Date().toISOString(), 
//     raiseAQuoteId: "string",
//     customerId: customerId,
//     ticketId: technicianData.raiseTicketId, 
//     technicianId: technicianData.technicianId,
//     enterQuoteAmount: technicianData.enterQuoteAmount,
//     discount: technicianData.discount,
//     otherCharges: technicianData.otherCharge,
//     serviceCharges: technicianData.serviceCharge,
//     gst: technicianData.gst,
//     totalAmount: technicianData.totalAmount,
//     addrRmarks: addrRmarks.map((comment) => ({
//       requestedDate: comment.requestedDate,
//       remarks: comment.remarks,
//   })), 
//   };
//   try {
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload3),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to save technician data');
//     }
//     alert('Technician saved Successfully!');
//   } catch (error) {
//     console.error('Error saving technician data:', error);
//     window.alert('Failed to save the technician data. Please try again later.');
//   }
// };

//   const handleBothActions = (e) => {
//     e.preventDefault();
//     handleUpdateTicket(e);
//     handleSaveTicket(e);
//     navigate(`/notificationTechnician/${userType}/${category}/${district}/${technicianId}`);
//     //handleTechnicianTicket(e);
//   }

//   // Handle material input change
//   const handleMaterialChange = (index, field, value) => {
//     const updatedMaterials = [...specifications];
//     updatedMaterials[index][field] = value;
//     setSpecifications(updatedMaterials);
//   };
   // Handle form data changes
  //  const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setTicketData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
  {isMobile && <Header />}
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu h-90">
          <Sidebar userType={selectedUserType}/>
        </div>
      )}

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
              <Sidebar userType={selectedUserType}/>
            </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
        <h1 className="text-center mb-2">View Raise a Quote</h1>
        <Form onSubmit={handleUpdateTicket}>
        <Row>
            <Col md={6}>
            <Form.Group>
                <label>Ticket ID</label>
                <Form.Control
                type="text"
                name="ticketID"
                value={ticketId}
                readOnly
                />
            </Form.Group>
            </Col>
      
        {/* Status */}
                  <Col md={6}>
                    <Form.Group>
                      <label>Status</label>
                      <Form.Control
                        as="select"
                        name="status"
                        value={status}
                        readOnly
                      >
                        <option value="">Select Status</option>
                        <option>Open Tickets</option>
                        <option>Assigned</option>
                        <option>Pending Tickets</option>
                        <option>Closed Tickets</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
        {/* Subject */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Subject</label>
              <Form.Control
                type="text"
                name="subject"
                value={subject}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Details */}
        <Form.Group>
          <label>Details</label>
          <Form.Control
            as="textarea"
            name="details"
            value={details}
            rows="4"
            readOnly
          />
        </Form.Group>

        {/* Ticket Owner */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Ticket Owner</label>
              <Form.Control
                type="text"
                name="ticketOwner"
                value={customerId}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Category */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Category</label>
              <Form.Control
                type="text"
                name="category"
                value={ticketData.category}
                readOnly
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/*Attachments*/}
        
        <div className="form-group mt-4">
  <label>Customer Uploaded Photos  {" "}
    {newPhotoCount >0 && (<span className="badge bg-danger" style={{ fontSize: "18px" }}>{newPhotoCount}</span>)}
  </label>

  <Button
    className="btn btn-primary m-3"
    onClick={handleDownloadAllAttachments}
  >
     Download All Attachments
  </Button>

  <div
    id="ticketCarousel"
    className="carousel slide mb-4 rounded"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      {attachments.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#ticketCarousel"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-current={index === 0 ? "true" : "false"}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>

    <div className="carousel-inner">
      {attachments.map((img, index) => (
        <div
          className={`carousel-item ${index === 0 ? "active" : ""}`}
          key={img.src}
        >
          <img
            src={`data:image/jpeg;base64,${img.imageData}`}
            className="d-block w-50 rounded"
            style={{ maxHeight: "200px", objectFit: "cover" }}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>

    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#ticketCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#ticketCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>
        
        {/* Assigned To */}
        <Row>
        <Col md={12}>
            <Form.Group>
              <label>Assigned To</label>
              <Form.Control
                as="select"
                name="assignedTo"
                value={assignedTo}
                readOnly
              >
                <option>Select Assigned</option>
                <option>Customer Care</option>
                <option>Customer</option>
                <option>Technical Agency</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

      <div className="radio">
      <label className="m-1">
        <input
          className="form-check-input m-2 border-dark "
          type="radio"
          name="RequestType"
          value="With Material"
          checked={requestType === "With Material"}
        />
        With Material
      </label>

      <label className="m-1">
        <input
          className="form-check-input m-2 border-dark"
          type="radio"
          name="RequestType"
          value="Without Material"
          checked={requestType === "Without Material"}
        />
        Without Material
      </label>

      {/* Material Input Fields */}
      {requestType === "With Material" && (
        <div className="form-group">
          <label>Required Material(Optional)</label>
          <div className='d-flex gap-3 mb-2 text-center'>
      <div style={{ flex: 4 }}>
        <label className="fw-bold">Material</label>
      </div>
      <div style={{ flex: 4 }}>
        <label className="fw-bold">Quantity</label>
      </div>
      </div>
          {specifications.map((spec, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={spec.material}
                readOnly
              />
              <input
                type="text"
                className="form-control text-center"
                value={spec.quantity}
                placeholder="Enter Quantity"
                readOnly
              />
              
            </div>
          ))}
          
        </div>
      )}
    </div>
    <table className="table table-bordered">
  <tbody>
    {/* Quote Amount */}
    <tr>
      <td>
        <label htmlFor="quoteAmount">Enter Quote Amount</label>
      </td>
      <td colSpan="2">
        <input
            type="number"
            className="form-control text-end"
            value={enterQuoteAmount}
        />
      </td>
        <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={fixedQuote}
          disabled
        />
      </td>
    </tr>

    {/* Discount */}
    <tr>
      <td>
        <label>Discount</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={discount}
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedDiscount).toFixed(2)}
          disabled
        />
      </td>
    </tr>

    {/* Any Other Charges */}
    <tr>
      <td>
        <label>Any Other Charges</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={othercharges}
          disabled
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedOtherCharge).toFixed(2)}
          disabled   
        />
      </td>
    </tr>

    {/* Service Charges */}
    <tr>
      <td>
        <label>Service Charges</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={serviceCharges}
          disabled
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedServiceCharge).toFixed(2)}
          disabled
        />
      </td>
    </tr>

    {/* GST */}
    <tr>
      <td>
        <label>GST</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={gst}
          disabled
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedGST).toFixed(2)}
          disabled
        />
      </td>
    </tr>

    {/* Total Amount */}
        <tr>
        <td>
            <label>Total Amount</label>
        </td>
        <td colspan="4">
            <input
            type="number"
            className="form-control text-end"
            value={Number(totalAmount).toFixed(2)}
            disabled
            />
        </td>
        </tr>
        </tbody>
        </table>

     {/* Add Comments */}
  
     <div className="form-group">
          <label>Add Comment</label>
          {commentsList.map((comment, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={comment.commentText}
                 readOnly
              />
            </div>
          ))}
        </div>

        {/* Add Remarks */}
        <div className="form-group">
            <label>Add Remarks</label>
            {addrRmarks.map((comment, index) => (
              <div className="d-flex gap-3 mb-2" key={index}>
            <input 
            type="text"
            className="form-control"
            value={comment.remarks}
            readOnly
            />
            </div>
          ))} 
        </div> 
      
        {/* Save Button */}
        <div className="mt-4 text-end">
          <Link to={`/technicianQuoteNotification/${userType}/${userId}/${category}/${district}`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          {/* <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link> */}
          {/* <Button onClick={handleBothActions} className="btn btn-warning text-white mx-2" title='Forward'
          >
            <ForwardIcon />
          </Button> */}
          {/* <Button onClick={handleUpdateTicket} type="submit" className="btn btn-warning text-white mx-2" title="Save" 
          disabled={status === "Assigned" && assignedTo === "Technical Agency"}
          >
            <SaveAsIcon />
          </Button> */}
        </div>
        </Form>

        </div>
      </div>
      <Footer /> 
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

export default RaiseQuoteTechnicianDetails;
