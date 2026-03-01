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
import {Link, useParams, useNavigate} from 'react-router-dom';


const RaiseQuotation = () => {
  const [error, setError] = useState("");
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
  const [gst, setGST] = useState("");
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [raiseAQuoteId,setRaiseAQuoteId]=useState('');
  const [fixedGST, setFixedGSTs] = useState('');
  const [lowestBidder, setLowestBidder] = useState("");
  const [othercharges, setOtherCharge] = useState("");
  const [fullName, setFullName] = useState('');
  const [addrRmarks, setAddRemarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [assignedTo, setAssignedTo] = useState('');
  const [isWithMaterial, setIsWithMaterial] = useState(false);
  // const [newPhotoCount , setPhotoCount] = useState(0);
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
    const [rateQuotedBy, setRateQuotedBy] = useState("Dealer/Trader");
    // const [isDealerSelected, setIsDealerSelected] = useState(false);
    const [material, setMaterialQuotation] = useState([{discounts: "", fixedDiscounts: "", deliveryCharges: "", fixedDeliveryCharges: "", serviceCharges: "", fixedServiceCharges: "", gsts: "", fixedGSTS: "", grandtotal: ""}])
    const [category, setCategory] = useState('');
    const [technicianId, setTechnicianId] = useState([]);
    // const {userType} = useParams();
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

    useEffect(() => {
      console.log(subject, loading, isWithMaterial, id, raiseAQuoteId, totalAmount, enterQuoteAmount, fixedQuote);
    }, [subject, loading, isWithMaterial, id, raiseAQuoteId, totalAmount, enterQuoteAmount, fixedQuote]);
 
    // Fetch data from API on component mount
    useEffect(() => {
      // API URL 
      const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
      // Fetching the data from the API
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const quotedata = await response.json();
          // Map the data to match your technician details structure 
          // const mappedData = data.map(item => ({
          //   id: item.id,
          //   technicianId: item.technicianId,
          //   quotedAmount: parseFloat(item.enterQuoteAmount),
          //   discount: parseFloat(item.discount),
          //   fixedDiscount: parseFloat(item.fixedDiscount),

          //   othercharges: parseFloat(item.othercharges),
          //   fixedOtherCharge: parseFloat(item.fixedOtherCharge),

          //   serviceCharges: parseFloat(item.serviceCharges),
          //   fixedServiceCharge: parseFloat(item.fixedServiceCharge),

          //   gst: parseFloat(item.gst),
          //   fixedGST: parseFloat(item.fixedGST),

          //   totalQuotedAmount: parseFloat(item.totalAmount),
          //   addrRmarks:item.addrRmarks,
          //   materials: item.materials,
          // }));
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
          // setTotalAmount(quotedata.totalAmount);
          //  alert(quotedata.totalAmount);
          setOtherCharge(quotedata.othercharges);
          // alert(otherCharge);
          setServiceCharge(quotedata.serviceCharges);
          setFixedServiceCharge(quotedata.fixedServiceCharge);
          setFixedOtherCharge(quotedata.fixedOtherCharge);
          setSpecifications(quotedata.materials || [{material: "", quantity: ""}]);         
          // setAddRemarks(quotedata.addrRmarks);
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
    const fixedServiceCharges = ((baseAmount - fixedDiscounts + deliveryCharges) * serviceCharges) / 100;;
    const fixedGSTS = ((baseAmount - fixedDiscounts + deliveryCharges + serviceCharges) * gst) / 100;
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
            //alert(JSON.stringify(data));
            setTicketData(data);
            setState(data.state);
            setDistrict(data.district);
            setZipcode(data.zipCode);
            setAddress(data.address);
            setSubject(data.subject);
            setId(data.id);
            setTechnicianId(data.technicianList || []);
            // alert(data.technicianList);
            setCustomerId(data.customerId);
            setCustomerEmail(data.customerEmail);
            setCustomerPhoneNumber(data.customerPhoneNumber);
            setIsWithMaterial(data.isMaterialType);
            setAssignedTo(data.assignedTo);
            setStatus(data.status);
            setFullName(data.customerName);
            setRequestType(data.requestType || 'Without Material');
            setAttachments(data.attachments);
            // setSpecifications(data.materials || [{ material: "", quantity: ""}]);
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
          // setTechnicianId(lowest.technicianId);
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
          setSpecifications(lowest.materials || [{material: "", quantity: ""}]);
          setMaterialQuotation(lowest.materialQuotation);
          // if (lowest.addrRmarks?.length > 0) {
          //   setAddRemarks(lowest.addrRmarks[0].remarks);
          // } else {
          //   setAddRemarks("");
          // }
          
        } else {
          // setTechnicianId('');
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
          // setAddRemarks("");
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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      setError('');
    }
  };

  const handleAddRemarks = (index, field, value) => {
    const updatedRemarks = [...addrRmarks];
    updatedRemarks[index][field] = value;
    setAddRemarks(updatedRemarks);
  };
  

  const handleSaveTicket = async (e) => {
    e.preventDefault();
   
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: category,
      assignedTo: "Dealer/Trader",
      id : raiseTicketId,
      status: status,
      InternalStatus: "Assigned",
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
          price: "",
          Total: "",
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
      TechnicianList: technicianId,
      DealerList: [],
      Rating: "",
      RateQuotedBy: rateQuotedBy,
      CustomerEmail: customerEmail,
    OrderId: "",
    OrderDate: "",
    PaidAmount: "",
    TransactionStatus: "",
    TransactionType: "",
    InvoiceId: "",
    InvoiceURL: "",
    CustomerPhoneNumber: customerPhoneNumber,
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
//       TechnicianId: technicianId,
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
//       addrRmarks: Array.isArray(addrRmarks)
//       ? addrRmarks.map((comment) => ({
//           requestedDate: comment.requestedDate,
//           remarks: comment.remarks ,
//         }))
//       : [],
//     materials: specifications.map((spec) => ({
//       material: spec.material,
//       quantity: spec.quantity,
//       price: spec.price.toString(),
//       Total: spec.total.toString(),
//     })),
//     materialQuotation: material.map((quote) => ({
//       discount: quote.discounts.toString(),
//       deliverycharges: quote.deliveryCharges.toString(),
//       servicecharges: quote.serviceCharges.toString(),
//       gst: quote.gsts.toString(),
//       grandtotal: quote.grandtotal.toString(), 
      
//       fixedDiscount: quote.fixedDiscounts.toString(),
//       fixedDeliveryChargs: quote.fixedDeliveryCharges.toString(),
//       fixedServicecharges: quote.fixedServiceCharges.toString(),
//       fixedGST: quote.fixedGSTS.toString(),
//     })),
//     // LowestBidderTechnicianId: lowestBidder,
//   };
//   // var techData = JSON.stringify(payload3);
//     //alert(JSON.stringify(payload3));
//     //console.log(JSON.stringify(payload3));
//   try {
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/id?id=${id}`, {
//       method: 'PUT',
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

// const handleUpdateTicket = async (e) => {
//   e.preventDefault();
//   const payload1 = {
//     id :"string",
//     ticketId: ticketData.raiseTicketId,
//     CustomerId: ticketData.customerId,
//     dealerId: "Customer Care",
//     raiseTicketId: raiseTicketId,
//     raiseAQuoteDate: new Date().toISOString(), 
//     raiseAQuoteByDealerId: "string",
//     addrRmarks: addrRmarks.map((comment) => ({
//       requestedDate: comment.requestedDate,
//       remarks: comment.remarks,
//   })),
//   materials: specifications.map((spec) => ({
//     material: spec.material,
//     quantity: spec.quantity,
//     price: spec.price.toString()|| "",
//     total: spec.total.toString() || "",
// })),
// materialQuotation: material.map((mat) => ({
//   discount: mat.discounts.toString() || "",
//   fixedDiscount: mat.fixedDiscounts.toString() || "",
//   deliveryCharges: mat.deliveryCharges.toString() || "",
//   fixedDeliveryChargs: mat.fixedDeliveryCharges.toString() || "",
//   serviceCharge: mat.serviceCharges.toString(),
//   fixedServicecharges: mat.fixedServiceCharges.toString() || "",
//   gst: mat.gsts.toString()|| "",
//   fixedGST: mat.fixedGSTS.toString() || "",
//   grandtotal: mat.grandtotal.toString() || "",
// })),
//   }; 
//   try {
  
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuoteByDealer/CreateRaiseAQuoteByDealer`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       }, 
//       body: JSON.stringify(payload1),
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to save Dealer ticket data');
//     }
   
//     alert('Ticket  Dealer saved Successfully!');
//   } catch (error) {
//     console.error('Error saving Dealer ticket data:', error);
//     window.alert('Failed to save the Dealer ticket data. Please try again later.')
//   }
// };

const handleUpdateTicket = async (e) => {
  e.preventDefault();
  const payload1 = {
    id: "string",
    ticketId: ticketData.raiseTicketId,
    CustomerId: ticketData.customerId,
    dealerId: "Customer Care",
    raiseTicketId: raiseTicketId,
    raiseAQuoteDate: new Date(),
    raiseAQuoteByDealerId: "string",
    addrRmarks: addrRmarks.map((comment) => ({
      requestedDate: comment.requestedDate,
      remarks: comment.remarks,
    })),
    materials: specifications.map((spec) => ({
      material: spec.material || "",
      quantity: spec.quantity || "",
      price: spec.price !== undefined && spec.total !== null ? String(spec.total) : "",
      total: spec.total !== undefined && spec.total !== null ? String(spec.total) : "",
    })),
    materialQuotation: material.map((mat) => ({
      discount: mat.discounts !== undefined && mat.discounts !== null ? String(mat.discounts) : "",
      fixedDiscount: mat.fixedDiscounts !== undefined && mat.fixedDiscounts !== null ? String(mat.fixedDiscounts) : "",
      deliveryCharges: mat.deliveryCharges !== undefined && mat.deliveryCharges !== null ? String(mat.deliveryCharges) : "",
      fixedDeliveryChargs: mat.fixedDeliveryCharges !== undefined && mat.fixedDeliveryCharges !== null ? String(mat.fixedDeliveryCharges) : "",
      serviceCharge: mat.serviceCharges !== undefined && mat.serviceCharges !== null ? String(mat.serviceCharges) : "",
      fixedServicecharges: mat.fixedServiceCharges !== undefined && mat.fixedServiceCharges !== null ? String(mat.fixedServiceCharges) : "",
      gst: mat.gsts !== undefined && mat.gsts !== null ? String(mat.gsts) : "",
      fixedGST: mat.fixedGSTS !== undefined && mat.fixedGSTS !== null ? String(mat.fixedGSTS) : "",
      grandtotal: mat.grandtotal !== undefined && mat.grandtotal !== null ? String(mat.grandtotal) : "",
    })),
    TotalAmount: TotalAmount().toString(),
  };

  try {
    const response = await fetch(
      `https://handymanapiv2.azurewebsites.net/api

/RaiseAQuoteByDealer/CreateRaiseAQuoteByDealer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload1),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save Dealer ticket data");
    }

    alert("Ticket Dealer saved Successfully!");
  } catch (error) {
    console.error("Error saving Dealer ticket data:", error);
    window.alert(
      "Failed to save the Dealer ticket data. Please try again later."
    );
  }
};


  // const handleBothActions =  (e) => {
  //   e.preventDefault();
  //   handleSaveTicket(e);
  //  handleUpdateTicket(e);
  //  if (!category) {
  //   setError("Must select a category");
  // } else {
  //   setError(""); // Clear error
  //   console.log("Category selected:", category);
  // }
  //   // Navigate(`/adminNotifications`);
  // }

  const handleBothActions = (e) => {
    e.preventDefault();
  
    if (!category) {
      setError("Must select a category");
      return; 
    }
  
    setError(""); 
  
    // Perform both actions
    handleSaveTicket(e);
    handleUpdateTicket(e);
  
    // Navigate or perform further actions
    console.log("Category selected:", category);
     Navigate(`/adminNotifications`);
  };

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // // Add new material and quantity fields
  // const handleAddMaterial = () => {
  //   setSpecifications([...specifications, { material: "", quantity: "" }]);
  // };

  // // Remove a material and its corresponding quantity
  // const handleRemoveMaterial = (index) => {
  //   setSpecifications(specifications.filter((_, i) => i !== index));
  // };


  // const handleGetQuoteClick = (raiseTicketId) => {
  //   Navigate(`/raiseTicketBuyProducts/${raiseTicketId}`);
  // };

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
      <h1 className="text-center mb-2">Raise a Ticket Dealer</h1>

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
                // onChange={handleChange}
                placeholder="Enter subject"
                required

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
            // onChange={handleChange}
            rows="4"
            placeholder="Enter details"
            required
          />
        </Form.Group>

        {/* Category */}
  <Row>
    <Col md={6}>
      <Form.Group>
        <label>Category <span className="req_star">*</span></label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleCategoryChange}
          required
        > 
          <option value="">Select</option>
          <option value="Electrical items">Electrical items</option>
          <option value="Plumbing Materials">Plumbing Materials</option>
          <option value="Sanitary items">Sanitary items</option>
          <option value="Electronics appliances">Electronics appliances</option>
          <option value="Paints">Paints</option>
          <option value="Hardware items">Hardware items</option>
          <option value="Civil Waterproofing Materials">Civil Waterproofing Materials</option>
        </Form.Control>
        {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
      </Form.Group> 
    </Col>
  </Row>
        {/* Assigned To */}
        <Row>
        <Col md={6}>
            <Form.Group>
              <label>Assigned To <span className="req_star">*</span></label>
              <Form.Control
                as="select"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Customer Care">Dealer/Trader</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
          {/* Radio Buttons */}
          <div className="radio">
            <div className="form-group">
              <strong>Rate Quoted By <span className="req_star">*</span></strong>
              <div className="radio">
                <label className="m-1">
                  <input
                  className="form-check-input m-2 border-dark"
                  type="radio"
                  name="RateQuotedBy"
                  value="Dealer/Trader"
                  checked={rateQuotedBy === "Dealer/Trader"}
                  onChange={(e) => handleRateQuotedByChange(e.target.value)}
                  required
                  />
                  Dealer/Trader
                </label>
              </div>
            </div> 

          {/* Material Input Fields */}
      {requestType === "With Material" && (
        <div className="form-group">
        <strong>Required Material(Optional)</strong>
        {!isMobile ? (
      <div className="mt-3">
          <div className='d-flex gap-3 mb-2 text-center'>
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
                readOnly
              />
              <input
                type="text"
                className="form-control text-end"
                placeholder="Total"
                value={spec.total}
                onChange={(e) => handleMaterialChange(index, "total", e.target.value)}
                readOnly
              />
            </div> 
          ))}
        </div> 
        ) : (
          <div>
            {specifications.map((spec, index) => (
              <div key={index} className="card w-100 mb-3 shadow-sm" style={{ maxWidth: "300px" }}>
                <div className="card-body">
                  <p className="mb-1"><strong>Material:</strong> {spec.material}</p>
                  <p className="mb-1"><strong>Quantity:</strong> {spec.quantity}</p>
                    <p className="d-flex align-items-center gap-2 mb-2">
                    <label className="fw-bold">Price: </label>
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
                    <label className="fw-bold">Total: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Total"
                      value={spec.total}
                      onChange={(e) => handleMaterialChange(index, "total", e.target.value)}
                      readOnly
                    />
                </p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      )}
    </div>


    <table className="table table-bordered m-1">
    <tbody>
  {/* Quote Amount */}
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
            updated[0].discounts = parseFloat(e.target.value) || 0;
            return updated;
          })
        }
        placeholder="Discount"
        readOnly
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={Number(material[0]?.fixedDiscounts).toFixed(2)}
        placeholder="Fixed Discount"
        readOnly
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
        value={material[0]?.deliveryCharges}
        onChange={(e) =>
          setMaterialQuotation((prev) => {
            const updated = [...prev];
            updated[0].deliveryCharges = parseFloat(e.target.value) || 0;
            return updated;
          })
        }
        placeholder="Delivery Charges"
        readOnly
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={material[0]?.fixedDeliveryCharges}
        placeholder="Fixed Delivery Amount"
        readOnly
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
        value={material[0]?.serviceCharges}
        onChange={(e) =>
          setMaterialQuotation((prev) => {
            const updated = [...prev];
            updated[0].serviceCharges = parseFloat(e.target.value) ;
            return updated;
          })
        }
        placeholder="Service Charges"
        readOnly
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={Number(material[0]?.fixedServiceCharges).toFixed(2)}
        readOnly
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
        className="form-control text-end"
        value={material[0]?.gsts }
        onChange={(e) =>
          setMaterialQuotation((prev) => {
            const updated = [...prev];
            updated[0].gsts = parseFloat(e.target.value) || 0;
            return updated;
          })
        }
        placeholder="GST"
        readOnly
      />
    </td>
    <td colSpan="2">
      <input
        type="number"
        className="form-control text-end"
        value={Number(material[0]?.fixedGSTS).toFixed(2)}
        placeholder="Fixed GST"
        readOnly
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
        value={Number(material[0]?.grandtotal).toFixed(2)}
        readOnly
        placeholder="Grand Total"
      />
    </td>
  </tr>
</tbody>
 </table>


       {/* Dealer Remarks */}
       <div className="form-group col-md-6">
          <label>Dealer Remarks</label>
          {addrRmarks.map((remarks, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder="Remarks"
                value={remarks.remarks}
                onChange={(e) => handleAddRemarks(index,"remarks", e.target.value)}
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Send Quote Button */}
        <div className="mt-4 text-end">
          <Link to={`/adminNotifications`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          {/* <Link className="btn btn-warning text-white mx-2"  type="submit" title="Save">
            <SaveAsIcon />
          </Link> */}
          <Link onClick={handleBothActions} className="btn btn-warning text-white mx-2" title='Forward'>
            <ForwardIcon />
          </Link>
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
       `}</style>
  </div>
      <Footer /> 
</>
  );
};

export default RaiseQuotation;