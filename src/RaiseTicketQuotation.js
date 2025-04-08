import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import "./App.css";
import AdminSidebar from './AdminSidebar';
import Footer from './Footer.js';

import ForwardIcon from '@mui/icons-material/Forward';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {Link, useNavigate, useParams} from 'react-router-dom';
import JSZip from "jszip";
import { saveAs } from "file-saver";

const RaiseTicketQuotation = () => {
  const Navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "", total: "" }]);
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]); 
  const [requestType, setRequestType] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [technicianId, setTechnicianId] = useState(""); 
  const [gst, setGST] = useState("");
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [raiseAQuoteId,setRaiseAQuoteId]=useState('');
  const [fixedGST, setFixedGSTs] = useState('');
  const [lowestBidder, setLowestBidder] = useState("");
  const [othercharges, setOtherCharge] = useState("");
   const [addrRmarks, setAddRemarks] = useState([{requestedDate: new Date(), remarks: ""}]);
   const [addRemarks, setCustomerRemarks] = useState([{ requestedDate: new Date(), remarks: "" }]);  
   const [assignedTo, setAssignedTo] = useState('');
  const [uploadedFiles] = useState([]);
  const [isWithMaterial, setIsWithMaterial] = useState(false);
  const [newPhotoCount , setPhotoCount] = useState(0);
    // Initial state for technician details  
    const [technicianDetails, setTechnicianDetails] = useState([]);
    const [fixedServiceCharge, setFixedServiceCharge] = useState('');
    const [discount, setDiscount] = useState("");
    const [fixedDiscount, setFixedDiscount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [serviceCharges, setServiceCharge] = useState('');
    //const [internalRaiseQuoteid,setInternalRaiseQuoteid]=useState('');
    const [enterQuoteAmount, setQuote] = useState('');
    const [fixedQuote, setFixedQuote] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('')
    const [zipCode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [rateQuotedBy, setRateQuotedBy] = useState("Customer Care");
    // const [isDealerSelected, setIsDealerSelected] = useState(false);
    const [material, setMaterialQuotation] = useState([{discounts: "", fixedDiscounts: "", deliveryCharges: "", fixedDeliveryCharges: "", serviceCharges: "", fixedServiceCharges: "", gsts: "", fixedGSTS: "", grandtotal: ""}])
    const [technicianList, setTechnicianList] = useState([]);
    const [fixedDeliveryCharge] = useState('100'); 
 const [fixedServiceCharges] = useState('10');
 const [gsts] = useState('18');
 const [CalculateTotal, setCalculatedGrandTotal] = useState('');
 const [calculatedServiceCharge, setCalculatedServiceCharge] = useState('0');
 const [calculatedGSTS, setCalculatedGSTS] = useState('0');
 const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
 const [customerEmail, setCustomerEmail] = useState('');
//  const [dealerId] = useState('');

 useEffect(() => {
  console.log(subject, loading, isWithMaterial, fixedQuote, enterQuoteAmount,addrRmarks,raiseAQuoteId,id);
}, [subject, loading, isWithMaterial, fixedQuote, enterQuoteAmount,addrRmarks,raiseAQuoteId,id]);
 
    // Fetch data from API on component mount
    useEffect(() => {
      // API URL
      const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
      // Fetching the data from the API
      const fetchData = async () => {
        try { 
          const response = await fetch(apiUrl);
          const quotedata = await response.json();
           setTechnicianDetails(quotedata);
          //alert(JSON.stringify(technicianDetails));
          setRaiseAQuoteId(quotedata.raiseAQuoteId);
          setQuote(quotedata.enterQuoteAmount);
  
          setFixedQuote(quotedata.fixedQuote);
          setDiscount(quotedata.discount);
          setFixedDiscount(quotedata.fixedDiscount);
          setId(quotedata.id);
          
          setGST(quotedata.gst);
          setFixedGSTs(quotedata.fixedGST);
          setTotalAmount(quotedata.totalAmount);
          //  alert(quotedata.totalAmount);
          setOtherCharge(quotedata.othercharges);
          // alert(otherCharge);
          setServiceCharge(quotedata.serviceCharges);
          setFixedServiceCharge(quotedata.fixedServiceCharge);
          setFixedOtherCharge(quotedata.fixedOtherCharge);
          setSpecifications(quotedata.materials || [{material: "", quantity: "", price: "", total: ""}]);         
          setAddRemarks(Array.isArray(quotedata.addRemarks) ? quotedata.addRemarks : []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Call the fetchData function
      fetchData();
    }, [raiseTicketId]); 

    const handleMaterialChange = (index, field, value) => {
      const updatedSpecifications = [...specifications];
      updatedSpecifications[index][field] = field === "quantity" || field === "price" ? parseFloat(value) : value;
    
      if (field === "quantity" || field === "price") {
        const quantity = parseFloat(updatedSpecifications[index].quantity);
        const price = parseFloat(updatedSpecifications[index].price);
        updatedSpecifications[index].total = quantity * price;
      }
    
      setSpecifications(updatedSpecifications);
    };

    const handleRateQuotedByChange = (value) => {
      setRateQuotedBy(value);
      // setIsDealerSelected(value === "Dealer/Trader");
    };  
  
    // const materialAmount = () => specifications.reduce((sum, spec) => sum + Number(spec.total), 0);

const TotalAmount = () => specifications.reduce((sum, spec) => sum + Number(spec.total), 0);

const calculateTotalPrice = () => {
  
  setMaterialQuotation((prev) => {
    const updated = [...prev];
    const discount = updated[0]?.discounts;
    const deliveryCharges = updated[0]?.deliveryCharges;
    const serviceCharges = updated[0]?.serviceCharges; 
    const gst = updated[0]?.gsts;
    const baseAmount = TotalAmount();
  
    const fixedDiscounts = baseAmount * (discount / 100); // Percentage discount
    const fixedDeliveryCharges = deliveryCharges;
    const fixedServiceCharges = (deliveryCharges * serviceCharges) / 100;;
    const fixedGSTS = ((serviceCharges) * gst) / 100;
    //const fixedGST = ((baseAmount - fixedDiscount + deliveryCharges + serviceCharges) * gst) / 100;
  
    const grandtotal =
      baseAmount - fixedDiscounts + fixedDeliveryCharges + fixedServiceCharges + fixedGSTS;
   
    updated[0] = {
      ...updated[0],
      fixedDiscounts,
      fixedDeliveryCharges,
      fixedServiceCharges,
      fixedGSTS,
      grandtotal,
    };
    return updated;
  });
  
};

useEffect(() => {
  calculateTotalPrice();
});
  

  useEffect(() => {
        const fetchticketData = async () => {
          try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const data = await response.json();
            setTicketData(data);
            setState(data.state);
            setDistrict(data.district);
            setZipcode(data.zipCode);
            setAddress(data.address);
            setSubject(data.subject);
            setId(data.id);
            setCustomerId(data.customerId);
            setIsWithMaterial(data.isMaterialType);
            setAssignedTo(data.assignedTo);
            setStatus(data.status);
            setFullName(data.customerName);
            setCustomerPhoneNumber(data.customerPhoneNumber);
            setCustomerEmail(data.customerEmail);
            setTechnicianList(data.technicianList || []);
            setRequestType(data.requestType || 'Without Material');
            setAttachments(data.attachments);
            // setSpecifications(data.materials || [{ material: "", quantity: "", price: "", total: "" }]);
            setMaterialQuotation(data.materialQuotation || [{ discounts: "", fixedDiscounts: "", deliveryCharges: "", fixedDeliveryCharges: "", serviceCharges: "", fixedServiceCharges: "", gsts: "", fixedGSTS: "", grandtotal: ""}])
            setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
            const imageRequests =
              data.attachments?.map((photo) => 
               fetch(
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

      useEffect(() => {
        if (technicianDetails.length > 0) {
          const lowest = technicianDetails.reduce((prev, current) => {
            const prevAmount = parseFloat(prev.totalAmount);
            const currentAmount = parseFloat(current.totalAmount);
            return currentAmount < prevAmount ? current : prev;
          });
          setTotalAmount(lowest.totalAmount);
          // alert(lowest.totalAmount);
          setTechnicianId(lowest.technicianId);
          setQuote(lowest.enterQuoteAmount);
          setRaiseAQuoteId(lowest.raiseAQuoteId);
          setId(lowest.id);
          setFixedQuote(lowest.fixedQuote);
          setDiscount(lowest.discount);
          setFixedDiscount(lowest.fixedDiscount);
          setGST(lowest.gst);
          setFixedGSTs(lowest.fixedGST);
          setOtherCharge(lowest.othercharges);
          setFixedOtherCharge(lowest.fixedOtherCharge);
          setServiceCharge(lowest.serviceCharges);
          setFixedServiceCharge(lowest.fixedServiceCharge);
          setLowestBidder(lowest.technicianId);
          setSpecifications(lowest.materials);
          setMaterialQuotation(lowest.materialQuotation);
          if (Array.isArray(lowest.addRemarks) && lowest.addRemarks.length > 0) {
            setAddRemarks(lowest.addRemarks); 
          } else {
            setAddRemarks([]);
          }
          
        } else {
          setTechnicianId('');
          setLowestBidder('');
          setTotalAmount('');
          setQuote('');
          setFixedQuote('');
          setDiscount('');
          setFixedDiscount('');
          setServiceCharge('');
          setOtherCharge('')
          setFixedOtherCharge('');
          setFixedServiceCharge('');
          setGST('');
          setFixedGSTs('');
          setAddRemarks("");
        }
      }, [technicianDetails, discount, fixedDiscount, othercharges, fixedOtherCharge, serviceCharges,fixedServiceCharge, gst, fixedGST]);
      

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRemarks = (index, key, value) => {
    setCustomerRemarks((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

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

  const handleSaveTicket = async (e) => {
    e.preventDefault();
    
   
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date(),
      address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: ticketData.category,
      assignedTo: "Customer",
      id : raiseTicketId,
      status: status,
      InternalStatus: "Pending",
      TicketOwner: ticketData.customerId,
      CustomerId: customerId,
      state: state,
      // isMaterialType: isMaterialType,
      district: district,
      ZipCode: zipCode,
      RequestType: requestType,
      attachments:attachments.map((file) => file.src),
      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
          price: spec.price,
          Total: spec.total,
      })),
      comments: commentsList.map((comment) => ({
          updatedDate: comment.updatedDate,
          CommentText: comment.commentText,
      })),
      LowestBidderTechnicainId: lowestBidder,
      LowestBidderDealerId: "",
      ApprovedAmount: "",
      customerName: fullName,
      Option1Day: "",
      Option1Time: "",
      Option2Day: "",
      Option2Time: "",
      TechnicianList: technicianList,
      DealerList: [],
      Rating: "",
      RateQuotedBy: rateQuotedBy,
      CustomerPhoneNumber: customerPhoneNumber,
      CustomerEmail: customerEmail,
      OrderId: "",
      OrderDate: "",
      PaidAmount: "",
      TransactionStatus: "",
      TransactionType: "",
      InvoiceId: "",
      InvoiceURL: "",
      PaymentMode: "",
      UTRTransactionNumber: "",
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

//   const handleValuesTicket = async (e) => {
//     e.preventDefault();
//     // var techData = technicianDetails[0];
//     // alert(techData);
//     // var techData = JSON.stringify(technicianDetails);
//     // alert(techData);
//     //alert(enterQuoteAmount);
//     // console.log(techData);
    
//     const payload3 = {
//       id: id,
//       quotedDate: new Date().toISOString(),
//       RaiseAQuoteId:raiseAQuoteId ,
//       //raiseAQuote: ticketData.raiseAQuote,
//       RaiseTicketId: raiseTicketId,
//       CustomerId: customerId,
//       TicketId: ticketData.raiseTicketId,
//       TechnicianId: "Customer Care",
//       enterQuoteAmount: enterQuoteAmount,
//       Discount: discount, 
//       othercharges: othercharges,
//       serviceCharges: serviceCharges,
//       GST: gst,
//       totalAmount: totalAmount,
//       fixedQuote: fixedQuote,
//       fixedDiscount:fixedDiscount,
//       fixedOtherCharge:fixedOtherCharge,
//       fixedServiceCharge: fixedServiceCharge,
//       fixedGST: fixedGST,
//       AddRemarks:addrRmarks.map((comment) => ({
//           requestedDate: comment.requestedDate,
//           remarks: comment.remarks ,
//       })),
//     materials: specifications.map((spec) => ({
//       material: spec.material,
//       quantity: spec.quantity,
//       price: spec.price.toString(),
//       Total: spec.total.toString(),
//     })),
//     materialQuotation: material.map((quote) => ({
//       discount: quote.discounts.toString(),
//       deliverycharges: fixedDeliveryCharge,
//       servicecharges: fixedServiceCharges,
//       gst: gsts,
//       grandtotal: CalculateTotal.toString(), 
      
//       fixedDiscount: quote.fixedDiscounts.toString(),
//       fixedDeliveryChargs: fixedDeliveryCharge,
//       fixedServicecharges: calculatedServiceCharge.toString(),
//       fixedGST: calculatedGSTS,
//     })),
//   };
//   try {
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/CreateRaiseAQuote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload3),
//     });
     
//     if (!response.ok) {
//       throw new Error('Failed to Update RaiseAQuote data');
//     }

//     alert('RaiseAQuote Updated Successfully!');
//   } catch (error) {
//     console.error('Error Update RaiseAQuote ticket data:', error);
//     window.alert('Failed to Update the RaiseAQuote ticket data. Please try again later.');
//   }
// };

const handleSaveCustomerCareMaterials = async (e) => {
  e.preventDefault();
  // alert(material);
  const payload1 = {
    id :"string",
    ticketId: ticketData.raiseTicketId,
    CustomerId: ticketData.customerId,
    DealerId: "customerCare",
    TotalAmount: TotalAmount().toString(),
    raiseTicketId: raiseTicketId,
    raiseAQuoteDate: new Date(), 
    raiseAQuoteByDealerId: "string",
    addrRmarks: addRemarks.map((comment) => ({
      requestedDate: comment.requestedDate,
      remarks: comment.remarks,
  })),

materials: specifications.map((spec) => ({
  material: spec.material ? spec.material.toString() : "0",
  quantity: spec.quantity ? spec.quantity.toString() : "0",
  price: spec.price ? spec.price.toString() : "0",
  total: spec.total ? spec.total.toString() : "0",
})),

materialQuotation: material.map((mat) => ({
  
  discount: mat.discounts ? mat.discounts.toString() : "0",
  fixedDiscount: mat.fixedDiscounts ? mat.fixedDiscounts.toString() : "0",
  deliveryCharges:fixedDeliveryCharge,
  fixedDeliveryChargs:fixedDeliveryCharge,
  serviceCharge: fixedServiceCharges,
  fixedServiceCharges: calculatedServiceCharge.toString(),
  gsts: gsts,
  fixedGST: calculatedGSTS,
  grandtotal:CalculateTotal.toString(),
})),
 
  };  
  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuoteByDealer/CreateRaiseAQuoteByDealer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload1),
    });
  
    if (!response.ok) {
      throw new Error('Failed to save Dealer ticket data');
    }
    
    alert('Ticket Dealer saved Successfully!');
  } catch (error) {
    console.error('Error saving Dealer ticket data:', error);
    window.alert('Failed to save the Dealer ticket data. Please try again later.')
  }
};


  const handleBothActions =  (e) => {
    e.preventDefault();
    handleSaveTicket(e);
    handleSaveCustomerCareMaterials(e);
    Navigate(`/adminNotifications`);
  }

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // Add new material and quantity fields
  const handleAddMaterial = () => {
    setSpecifications([...specifications, { material: "", quantity: "" }]);
  };

  // Remove a material and its corresponding quantity
  const handleRemoveMaterial = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [uploadedFiles]);

  const handleGetQuoteClick = (raiseTicketId) => {
    Navigate(`/raiseTicketBuyProducts/${raiseTicketId}`);
  };

  return (
    <>
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 adm_mnu h-90">
          <AdminSidebar />
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
              <AdminSidebar />
            </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
      <h1 className="text-center mb-2">Raise a Ticket Quotations</h1>

      {/* Ticket Form */}
      <Form onSubmit={handleSaveTicket}>
        <Row>
            <Col md={12}>
            <Form.Group>
          <label>Customer Ticket ID</label>
          <Form.Control
          type="text"
          name="customerId"
          value={ticketData.raiseTicketId}
          onChange={handleChange}
          placeholder="Ticket Number"
          required/>
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
                placeholder="Enter subject"
                required
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
            placeholder="Enter details"
            required
            readOnly
          />
        </Form.Group>

        {/* Category */}
        <Row>
          <Col md={6}>
            <Form.Group>
              <label>Category</label>
              <Form.Control
                type="text"
                name="category"
                value={ticketData.category}
                onChange={handleChange}
                placeholder='Category'
                required
                readOnly
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/* Assigned To */}
        <Row>
        <Col md={6}>
            <Form.Group>
              <label>Assigned To</label>
              <Form.Control
                as="select"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Customer Care">Customer Care</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* File Upload */}
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

          {/* Radio Buttons */}
          <div className="radio">
      <label className="m-1">
        <input
          className="form-check-input m-2 border-dark"
          type="radio"
          name="RequestType"
          value="With Material"
          checked={requestType === "With Material"}
          // onChange={(e) => setRequestType(e.target.value)}
          required
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
          // onChange={(e) => setRequestType(e.target.value)}
        />
        Without Material
      </label>

      {requestType === "With Material" && (
            <div className="form-group">
              <strong>Rate Quoted By<span className="req_star">*</span></strong>
              <div className="radio">
                <label className="m-1">
                  <input className="form-check-input m-2 border-dark"
                  type="radio"
                  name="rateQuotedBy"
                  value="Customer Care"
                  checked={rateQuotedBy === "Customer Care"}
                  onChange={(e) => handleRateQuotedByChange(e.target.value)}
                  required
                />
                Customer Care
                </label>
                <label className="m-1">
                  <input
                  className="form-check-input m-2 border-dark"
                  type="radio"
                  name="rateQuotedBy"
                  value="Dealer/Trader"
                  checked={rateQuotedBy === "Dealer/Trader"}
                  onChange={(e) => handleRateQuotedByChange(e.target.value)}
                  required
                  />
                  Dealer/Trader
                </label>
              </div>
            </div> 
          )}

          {/* Material Input Fields */}
          {requestType === "With Material" && (
  <div className="form-group">
    <strong>Required Material(Optional)</strong>
    {!isMobile ? (
      <div className="mt-3">
        <div className="d-flex gap-3 mb-2">
          <div style={{ flex: 4 }}>
            <label className="fw-bold">Material</label>
          </div>
          <div style={{ flex: 4 }}>
            <label className="fw-bold">Quantity</label>
          </div>
          <div style={{ flex: 4 }}>
            <label className="fw-bold">Price</label>
          </div>
          <div style={{ flex: 4 }}>
            <label className="fw-bold">Total</label>
          </div>
        </div>
        {specifications.map((spec, index) => (
          <div className="d-flex gap-3 mb-2" key={index}>
            <input
              type="text"
              className="form-control"
              value={spec.material}
              placeholder="Enter Material"
              onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
              readOnly
            />
            <input
              type="text"
              className="form-control text-center"
              placeholder="Enter Quantity"
              value={spec.quantity}
              onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
              readOnly
            />
            <input
              type="text"
              className="form-control text-end"
              placeholder="Enter Price"
              value={spec.price}
              onChange={(e) => handleMaterialChange(index, "price", e.target.value)}
            />
            <input
              type="text"
              className="form-control text-end"
              placeholder="Total"
              value={spec.total}
              onChange={(e) => handleMaterialChange(index, "total", e.target.value)}
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
        <button type="button" className="btn btn-primary m-1" onClick={handleAddMaterial}>
          Add Material
        </button>
        {rateQuotedBy === "Dealer/Trader" && (
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={() => handleGetQuoteClick(raiseTicketId)}
          >
            Get Quotation
          </button>
        )}
      </div>
    ) : (
      <>
        {specifications.map((spec, index) => (
          <div key={index} className="card w-100 mb-3 shadow-sm">
            <div className="card-body">
              <p className="d-flex align-items-center gap-2 mb-2">
                <strong>Material:</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Material"
                  value={spec.material}
                  onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
                  readOnly
                />
              </p>
              <p className="d-flex align-items-center gap-2 mb-2">
                <strong>Quantity:</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Quantity"
                  value={spec.quantity}
                  onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                  readOnly
                />
              </p>

              <p className="d-flex align-items-center gap-2 mb-2">
                <label className="fw-bold">Price:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Price"
                  value={spec.price}
                  onChange={(e) => handleMaterialChange(index, "price", e.target.value)}
                  readOnly
                />
              </p>

              <p className="d-flex align-items-center gap-2 mb-2">
              <label className="fw-bold">Total:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Total"
                  value={spec.total}
                  onChange={(e) => handleMaterialChange(index, "total", e.target.value)}
                  readOnly
                />
              </p>

              <div className="d-flex flex-column align-items-center gap-2"> 
                <button className="btn btn-danger text-center w-30" onClick={() => handleRemoveMaterial(index)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="btn btn-primary text-white w-30 m-1" onClick={handleAddMaterial}>
          Add Material
        </button>
        {rateQuotedBy === "Dealer/Trader" && (
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={() => handleGetQuoteClick(raiseTicketId)}
          >
            Get Quotation
          </button>
        )}
      </>
    )}
  </div>
)}
      
    {requestType === "With Material" && (
    <table className="table table-bordered m-1">
    <tbody>
  {/* Material Amount */}
  <tr>
    <td>
      <label className="mb-0 fw-bold">Total</label>
    </td>
    <td colSpan="4">
      <input
        type="number"
        className="form-control text-end"
        value={TotalAmount()}
        readOnly
      />
    </td>
  </tr>
  <tr>
    <td>
      <label>Discount</label>
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={material[0]?.discounts}
        onChange={(e) =>
          setMaterialQuotation((prev) => {
            const updated = [...prev];
            updated[0].discounts = parseFloat(e.target.value);
             const calculateserviceCharge = ((TotalAmount() - e.target.value) * fixedServiceCharges)/100;           
             setCalculatedServiceCharge(calculateserviceCharge);
             setCalculatedGSTS(((calculateserviceCharge * gsts) / 100).toFixed(2));
             var CalculateTotal = (TotalAmount() - e.target.value) + Number(fixedDeliveryCharge) + Number(calculateserviceCharge) + Number(calculatedGSTS);
            // alert(CalculateTotal);
             setCalculatedGrandTotal(Number(CalculateTotal).toFixed(2));
            return updated;
          }) 
        }
        placeholder="Enter Discount"
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={Number(material[0]?.fixedDiscounts).toFixed(2)}
        readOnly
        placeholder="Fixed Discount"
      />
    </td>
  </tr>

  {/* Delivery Charges */}
  <tr>
    <td>
      <label htmlFor="deliveryCharges">Delivery Charges</label>
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={fixedDeliveryCharge}
        // onChange={(e) =>
        //   setMaterialQuotation((prev) => {
        //     const updated = [...prev];
        //     updated[0].deliveryCharges = parseFloat(e.target.value) || 0;
        //     return updated;
        //   })
        // }
        // placeholder="Enter Delivery Charges"
        disabled
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={fixedDeliveryCharge}
        readOnly
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
        value={fixedServiceCharges}
        // onChange={(e) =>
        //   setMaterialQuotation((prev) => {
        //     const updated = [...prev];
        //     updated[0].serviceCharges = parseFloat(e.target.value) || 0;
        //     return updated;
        //   })
        // }
        // placeholder="Enter Service Charges"
        disabled
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={calculatedServiceCharge}
        readOnly
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
        value={gsts }
        // onChange={(e) =>
        //   setMaterialQuotation((prev) => {
        //     const updated = [...prev];
        //     updated[0].gsts = parseFloat(e.target.value) || 0;
        //     return updated;
        //   })
        // }
        // placeholder="Enter GST"
        disabled
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={calculatedGSTS}
        readOnly
        disabled
      />
    </td>
  </tr>

  {/* Grand Total */}
  <tr>
    <td>
      <label>Grand Total</label>
    </td>
    <td colSpan="4">
      <input
        type="number"
        className="form-control text-end"
        value={CalculateTotal}
        readOnly
        disabled
      />
    </td>
  </tr>
</tbody>
 </table>
  )}

 <div>
  <p><strong>Technician Quotation</strong></p>
  <>
  {!isMobile ? (
<table className="table table-bordered">
  <thead>
    <tr>
      {['Technician ID', 'Quoted Amount', 'Discount', 'Other Charges', 'Service Charges', 'GST', 'Total Quoted Amount', 'Lowest Bidder'].map((header, idx) => (
        <th key={idx}>{header}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {technicianDetails.map((technician, index) => (
      <tr key={index} className='text-end'>
        {[technician.technicianId, technician.enterQuoteAmount, technician.fixedDiscount
    ? Number(technician.fixedDiscount).toFixed(2)
    : '0.00', technician.fixedOtherCharge
    ? Number(technician.fixedOtherCharge).toFixed(2)
    : '0.00', technician.fixedServiceCharge
    ? Number(technician.fixedServiceCharge).toFixed(2)
    : '0.00', technician.fixedGST
    ? Number(technician.fixedGST).toFixed(2)
    : '0.00', technician.totalAmount
    ? Number(technician.totalAmount).toFixed(2)
    : '0.00', technician.technicianId === lowestBidder ? 'Yes' : 'No'].map((value, i) => (
      <td key={i}>{value}</td>
    ))}
    </tr>
  ))} 
  <tr>
        <td colSpan="3">
            <input
            type="text"
            className='form-control text-end'
            value={technicianId}
            readOnly
            placeholder='Lowest Bidder Technician ID'
            /> 
        </td>
        <td>Lowest Bidder Amount</td>
        
        <td colspan="4">
            <input
            type="number"
            className="form-control text-end"
            value={Number(totalAmount || 0).toFixed(2)}
            readOnly
            placeholder="Lowest Bidder Amount"
            />
        </td>
        </tr> 
  </tbody>
  </table>
  ) : ( 
    <div className="mobile-view">
      {technicianDetails.map((technician, index) => (
        <div key={index} className="card w-100 border p-2 mb-3">
          {[ 
            ['Technician ID', technician.technicianId],
            ['Quoted Amount', technician.enterQuoteAmount],
            ['Discount', technician.fixedDiscount ? Number(technician.fixedDiscount).toFixed(2) : '0.00'],
            ['Other Charges', technician.fixedOtherCharge ? Number(technician.fixedOtherCharge).toFixed(2) : '0.00'],
            ['Service Charges',technician.fixedServiceCharge ? Number(technician.fixedServiceCharge).toFixed(2) : '0.00'],
            ['GST', technician.fixedGST ? Number(technician.fixedGST).toFixed(2) : '0.00'],
            ['Total Quoted Amount', technician.totalAmount ? Number(technician.totalAmount).toFixed(2) : '0.00'],
            ['Lowest Bidder', technician.technicianId === lowestBidder ? 'Yes' : 'No']
          ].map(([label, value], i) => (
            <p key={i}><strong>{label}:</strong> {value}</p>
          ))}
        </div>
      ))}
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#198754' }}>Lowest Bidder Amount: {Number(totalAmount || 0).toFixed(2)}</p>
    </div>
  )}
</>
</div>
    

       {/* Add Remarks */}
       <div className="form-group col-md-6">
      <label>Customer Care Remarks</label>
      {Array.isArray(addRemarks) &&
        addRemarks.map((remark, index) => (
          <div key={index} className="d-flex gap-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Remarks"
              value={remark.remarks || ""}
              onChange={(e) =>
                handleAddRemarks(index, "remarks", e.target.value)
              }
            />
          </div>
        ))}
    </div>

        {/* Send Quote Button */}
        <div className="mt-4 text-end">
          <Link to='/quoteNotification' className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          {/* <Link className="btn btn-warning text-white mx-2"  type="submit" title="Save">
            <SaveAsIcon />
          </Link> */}
          <Link onClick={handleBothActions} className="btn btn-warning text-white mx-2" title='Forward'>
            <ForwardIcon />
          </Link>
        </div>
        </div>
      </Form>
    </div>

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
      <Footer /> 
</>
  );
};

export default RaiseTicketQuotation;