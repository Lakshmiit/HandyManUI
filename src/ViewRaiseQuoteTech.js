import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Sidebar';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import { FaEdit} from 'react-icons/fa'; // Correct icon import
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import ForwardIcon from '@mui/icons-material/Forward';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import JSZip from "jszip";
import { saveAs } from "file-saver";
const RaiseActionView = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [isMaterialType, setIsWithMaterial] = useState('');
  const [ticketData, setTicketData] = useState(null); 
  const [technicianData, setTechnicianData] = useState(null);
  const [requestType, setRequestType] = useState('Without Material');
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "" }]); 
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]);
  // const [requiredMaterials, setRequiredMaterials] = useState([{material: "", quantity: "", price: ""}]); 
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [customerId, setCustomerId] = useState(''); 
  const [zipCode,setzipCode]=useState('');
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState('');
  const [newPhotoCount , setPhotoCount] = useState(0);
  const [otherCharge, setOtherCharge] = useState('');
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [fixedServiceCharge, setFixedServiceCharge] = useState('');
  const [gst, setGST] = useState('');
  const [fixedGST, setFixedGST] = useState('');
  const [totalAmount, setTotalAmount] = useState();
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const [enterQuoteAmount, setQuote] = useState('');
  const [isAmountPosted, setIsAmountPosted] = useState(false);
  const [fixedQuote, setFixedQuote] = useState('');
  const [discount, setDiscount] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [addrRmarks, setAddrRmarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [userType] = useState('technician');
  const { selectedUserType} = useParams();
  const {category} = useParams();
  const {technicianId} = useParams();
  // const [internalStatus, setInternalStatus] = useState('');
  const [ticketId, setTicketId] = useState('');
      const [materialQuotation] = useState([{discount: "", fixedDiscount: "", deliveryCharges: "", fixedDeliveryChargs: "", servicecharges: "", fixedServicecharges: "", gst: "", fixedGST: "", gradntotal: ""}])
  
  useEffect(() => {
    console.log(ticketData, status, id, technicianData, customerId, ticketId);
  }, [ticketData, status, id, technicianData, customerId, ticketId]); 

  useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const data = await response.json();
        // console.log("Testing ticket code data");
       // alert(data);

        setTicketId(data.ticketId);
       // alert(ticketId);
        setTicketData(data);
        setState(data.state);
        setDistrict(data.district);
        setzipCode(data.zipCode);
        setAddress(data.address);
        setId(data.id);
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setRequestType(data.requestType || 'Without Material');
        
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
        
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
        // window.alert('Failed to load ticket data. Please try again later.');
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
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      status: ticketData.status,
      category: ticketData.category,
      assignedTo:"Technical Agency",
      InternalStatus: "Pending",
      TicketOwner: ticketData.customerId,
      CustomerId: ticketData.customerId,
      state: state,
      isMaterialType: isMaterialType,
      district: district,
      ZipCode: zipCode,
      RequestType: requestType,
      attachments:attachments.map((file) => file.src),
      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
      })),
      comments: commentsList.map((comment) => ({
          updatedDate: comment.updatedDate,
          commentText: comment.commentText,
      })),
      LowestBidderTechnicainId: "",
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

  const handleSaveTicket = async (e) => {
    e.preventDefault();
   // alert(technicianId);
    const payload1 = {
      id :"string",
      quotedDate: new Date().toISOString(), 
      raiseAQuoteId: "string",
      CustomerId: ticketData.customerId,
      ticketId: ticketData.raiseTicketId,
      technicianId: technicianId,
      enterQuoteAmount: enterQuoteAmount.toString(),
      fixedQuote: fixedQuote.toString(),
      discount: discount.toString(),
      fixedDiscount: fixedDiscount.toString(),
      othercharges: otherCharge.toString(),
      fixedOtherCharge: fixedOtherCharge.toString(),
      serviceCharges: serviceCharge.toString(),
      fixedServiceCharge: fixedServiceCharge.toString(),
      gst: gst.toString(),
      fixedGST: fixedGST.toString(),
      totalAmount: totalAmount.toString(),
      raiseTicketId: raiseTicketId,
      addrRmarks: addrRmarks.map((comment) => ({
        requestedDate: comment.requestedDate,
        remarks: comment.remarks,
    })),
    materials: specifications.map((spec) => ({
      material: spec.material,
      quantity: spec.quantity,
      price: "",
      total: "",
  })),
  materialQuotation: materialQuotation.map((mat) => ({
    discount: "",
    fixedDiscount: "",
    deliveryCharges: "",
    fixedDeliveryChargs: "",
    serviceCharge: "",
    fixedServicecharges: "",
    gst: "",
    fixedGST: "",
    grandtotal: "",
  })),
    }; 
    try {
      //imageUrls="";
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/CreateRaiseAQuote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload1),
      });
    
      if (!response.ok) {
        throw new Error('Failed to save Technician ticket data');
      }
     
      alert('Ticket  Technician  saved Successfully!');
    } catch (error) {
      console.error('Error saving Technician ticket data:', error);
      window.alert('Failed to save the Technician ticket data. Please try again later.')
    }
  };

  useEffect(() => {
    if (raiseTicketId && technicianId) {
      const fetchtechnicianData = async () => {
        try {
          const technicianResponse = await fetch(
            `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByTechnicianId?raiseAQuotetId=${raiseTicketId}&TechnicianId=${technicianId}`
          );
          if (!technicianResponse.ok) {
            throw new Error('Failed to fetch technician data');
          }
          const techData = await technicianResponse.json();
          const techDataItem = techData[0];
          //  alert(techDataItem.id);
          // const techdetails = JSON.stringify(techData);
         // alert(techData);
        //   console.log("testing ticket code data");
        //   alert(JSON.stringify(techData));
        // console.log(JSON.stringify(techData));
          setTechnicianData(JSON.stringify(techData));
          setId(techDataItem.id);
          setCustomerId(techDataItem.customerId);
          setQuote(techDataItem.enterQuoteAmount);
       
          setSpecifications(techDataItem.materials || [{ material: "", quantity: "", price: ""}])
          setIsAmountPosted(true);
          setDiscount(techDataItem.discount);
          
          setOtherCharge(techDataItem.othercharges);
          setServiceCharge(techDataItem.serviceCharges);
          setGST(techDataItem.gst);
          setTotalAmount(techDataItem.totalAmount);
          setAddrRmarks(techDataItem.addrRmarks || [{ requestedDate: new Date(), remarks: "" }]);
        } catch (error) {
          console.error('Error fetching technician data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchtechnicianData();
    }
  }, [raiseTicketId, technicianId]);


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

  const handleBothActions = (e) => {
    e.preventDefault();
    handleUpdateTicket(e);
    handleSaveTicket(e);
    navigate(`/notificationTechnician/${userType}/${category}/${district}/${technicianId}`);
    //handleTechnicianTicket(e);
  }

  // const handleForwardTicket = async () => {
  //   try {
  //     const updatedTicket = {
  //       ...ticketData,
  //       status: "Assigned",
  //       assignedTo: "Technical Agency",
  //     };
  //     setTicketData(updatedTicket);
  //     alert("Ticket Forwarded successfully to Technician");
  //   } catch (error) {
  //     console.error("Error Forwarding ticket:", error);
  //     alert("Failed to forward the ticket. Please try again.")
  //   }
  // }

  // Handle material input change
  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...specifications];
    updatedMaterials[index][field] = value;
    setSpecifications(updatedMaterials);
  };

  // Add new material and quantity fields
  const handleAddMaterial = () => {
    setSpecifications([...specifications, { material: "", quantity: "" }]);
  };

  // Remove a material and its corresponding quantity
  const handleRemoveMaterial = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = (quote, discountPercentage, otherCharges, serviceChargePercentage, gstPercentage) => {
    const discountAmount = quote * (discountPercentage / 100); 
    const priceAfterDiscount = quote - discountAmount; 
    const priceAfterOtherCharges = priceAfterDiscount + otherCharges; 
    const serviceCharge = priceAfterOtherCharges * (serviceChargePercentage / 100); 
    const priceAfterServiceCharge = priceAfterOtherCharges + serviceCharge;
    const gst = priceAfterServiceCharge * (gstPercentage / 100);
    const total = priceAfterServiceCharge + gst; 
    return { total, discountAmount, serviceCharge, gst }; 
  };

  const handleFixedChange = (setter, fixedSetter) => (e) => {
    const value = parseFloat(e.target.value) || 0; 
    setter(value); 
    

    const { total, discountAmount, serviceCharge: calculatedServiceCharge, gst: calculatedGST } = calculateTotalPrice(
      enterQuoteAmount, 
      discount, 
      otherCharge, 
      serviceCharge, 
      gst
    );
    
    if (setter === setDiscount) fixedSetter(discountAmount); 
    if (setter === setOtherCharge) fixedSetter(otherCharge); 
    if (setter === setServiceCharge) fixedSetter(calculatedServiceCharge); 
    if (setter === setGST) fixedSetter(calculatedGST); 
   
    setTotalAmount(total);
  };

  useEffect(() => {
    const { total, discountAmount, serviceCharge: calculatedServiceCharge, gst:calculatedGST} = calculateTotalPrice(
      enterQuoteAmount,
      discount,
      otherCharge,
      serviceCharge,
      gst
    );
    setFixedQuote(enterQuoteAmount);
    setFixedDiscount(discountAmount);
    setFixedOtherCharge(otherCharge);
    setFixedServiceCharge(calculatedServiceCharge);
    setFixedGST(calculatedGST);
    setTotalAmount(total);
  }, [enterQuoteAmount, discount, otherCharge, serviceCharge, gst]);

  const handleAddComment = (index, field, value) => {
    const updatedComments = [...commentsList];
    updatedComments[index][field] = value;
    setCommentsList(updatedComments);
  }; 
   // Handle form data changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleAddRemarks = (index, field, value) => {
    const updatedComments = [...addrRmarks];
    updatedComments[index][field] = value;
    setAddrRmarks(updatedComments);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
                value={ticketData.raiseTicketId}
                onChange={handleChange}
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
                        value={ticketData.status}
                        onChange={handleChange}
                        required
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
                value={ticketData.subject}
                onChange={handleChange}
                placeholder="Subject"
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
            value={ticketData.details}
            onChange={handleChange}
            rows="4"
            placeholder="Details"
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
                value={ticketData.customerId}
                onChange={handleChange}
                placeholder="Ticket Owner"
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
                onChange={handleChange}
                placeholder="Category"
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
                onChange={(e) => setAssignedTo(e.target.value)}
                required
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
          className="form-check-input"
          type="radio"
          name="RequestType"
          value="With Material"
          checked={requestType === "With Material"}
          onChange={(e) => setRequestType(e.target.value)}
          required
        />
        With Material
      </label>

      <label className="m-1">
        <input
          className="form-check-input"
          type="radio"
          name="RequestType"
          value="Without Material"
          checked={requestType === "Without Material"}
          onChange={(e) => setRequestType(e.target.value)}
        />
        Without Material
      </label>

      {/* Material Input Fields */}
      {requestType === "With Material" && (
        <div className="form-group">
          <label>Required (Optional)</label>
          {specifications.map((spec, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={spec.material}
                placeholder="Enter Material"
                onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Quantity"
                value={spec.quantity}
                onChange={(e) => handleMaterialChange(index,"quantity", e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveMaterial(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleAddMaterial}>
            Add Material
          </button>
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
            className="form-control"
            value={enterQuoteAmount}
            // onBlur={calculateTotal}
            onChange={handleFixedChange(setQuote, setFixedQuote)}
            placeholder="Enter Quote Amount"
        />
      </td>
        <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedQuote}
          disabled
          placeholder="Fixed Quote Amount"
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
          className="form-control"
          value={discount}
          // onBlur={calculateTotal}
          onChange={handleFixedChange(setDiscount, setFixedDiscount)}
          placeholder="Enter Discount"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedDiscount}
          disabled
          placeholder="Fixed Discount"
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
          className="form-control"
          value={otherCharge}
          // onBlur={calculateTotal}
          onChange={handleFixedChange(setOtherCharge, setFixedOtherCharge)}
          placeholder="Enter Other Charges"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedOtherCharge}
          disabled
          placeholder="Fixed Other Charges"
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
          className="form-control"
          value={serviceCharge}
          // onBlur={calculateTotal}
          onChange={handleFixedChange(setServiceCharge, setFixedServiceCharge)}
          placeholder="Enter Service Charges"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedServiceCharge}
          disabled
          placeholder="Fixed Service Charges"
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
          className="form-control"
          value={gst}
          // onBlur={calculateTotal}
          onChange={handleFixedChange(setGST, setFixedGST)}
          placeholder="Enter GST"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedGST}
          disabled
          placeholder="Fixed GST"
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
            value={totalAmount}
            readOnly
            placeholder="Total Amount"
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
                placeholder="Comment Text"
                value={comment.commentText}
                 onChange={(e) => handleAddComment(index,"commentText", e.target.value)}
                // readOnly
              />
            </div>
          ))}
        </div>

        {/* Add Remarks */}
        <div className="form-group">
            <label>Add Remarks</label>
            {addrRmarks.map((comment, index) => (
              <div className="d-flex gap-3 mb-2" key={index}>
              {/* <input
                type="date"
                className="form-control"
                value={comment.requestedDate || ''} 
                // placeholder='dd-mm-yyyy hh:mm'
                onChange={(e) => handleAddRemarks(index, "requestedDate", e.target.value)} 
              /> */}
            <input 
            type="text"
            className="form-control"
            value={comment.remarks}
            placeholder="Remarks Text"
            onChange={(e) => handleAddRemarks(index, "remarks", e.target.value)}
            />
            </div>
          ))}
        </div>
      
        {/* Save Button */}
        <div className="mt-4 text-end">
          <Link to={`/technicianQuoteNotification/${userType}/${category}/${district}/${technicianId}`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          {/* <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link> */}
          <Button onClick={handleBothActions} disabled={isAmountPosted === true } className="btn btn-warning text-white mx-2" title='Forward'>
            <ForwardIcon />
          </Button>
          {/* <Button onClick={handleUpdateTicket} type="submit" className="btn btn-warning text-white mx-2" title="Save" 
          disabled={status === "Assigned" && assignedTo === "Technical Agency"}
          >
            <SaveAsIcon />
          </Button> */}
        </div>
        </Form>

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
    </div>
  );
};

export default RaiseActionView;
