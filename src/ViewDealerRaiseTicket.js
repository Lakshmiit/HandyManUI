import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import "./App.css";
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';

import ForwardIcon from '@mui/icons-material/Forward';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {Link, useParams, useNavigate} from 'react-router-dom';

const RaiseQuotation = () => {
  // const [error, setError] = useState(''); 
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
  const [fullName, setFullName] = useState(''); 
  const [rateQuotedBy, setRateQuotedBy] = useState(''); 
  // const [gst, setGST] = useState("");
  // const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [raiseAQuoteId]=useState('');
  // const [fixedGST, setFixedGSTs] = useState('');
  const [lowestBidder] = useState("");
  // const [othercharges, setOtherCharge] = useState("");
  const [addrRmarks, setAddRemarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  // const [assignedTo, setAssignedTo] = useState('');
  const [isWithMaterial, setIsWithMaterial] = useState(false);
  // const [newPhotoCount , setPhotoCount] = useState(0);
    // Initial state for technician details
    // const [technicianDetails, setTechnicianDetails] = useState([]);
    // const [fixedServiceCharge, setFixedServiceCharge] = useState('');
    // const [discount, setDiscount] = useState("");
    // const [fixedDiscount, setFixedDiscount] = useState('');
    // const [totalAmount, setTotalAmount] = useState(''); 
    // const [serviceCharges, setServiceCharge] = useState('');
    //const [internalRaiseQuoteid,setInternalRaiseQuoteid]=useState('');
    // const [enterQuoteAmount, setQuote] = useState('');
    // const [fixedQuote, setFixedQuote] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('')
    const [zipCode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    // const [rateQuotedBy, setRateQuotedBy] = useState("Customer Care");
    // const [isDealerSelected, setIsDealerSelected] = useState(false);
    const [material, setMaterialQuotation] = useState([{discount: "", fixedDiscount: "", deliverycharges: '', fixedDeliveryChargs: "", servicecharges: '', fixedServicecharges: "", gst: '', fixedGST: "", grandtotal: ""}])
    const {category} = useParams();
    const [dealerData, setDealerData] = useState({});
    const {userType} = useParams();
    // const [dealerId, setDealerId] = useState('');
 const {userId} = useParams();
 const [technicianId, setTechnicianId] = useState('');
 const [fixedDeliveryCharge] = useState('100'); 
 const [fixedServiceCharges] = useState('10');
 const [gsts] = useState('18');
 const [CalculateTotal, setCalculatedGrandTotal] = useState('');
 const [calculatedServiceCharge, setCalculatedServiceCharge] = useState('0');
 const [calculatedGSTS, setCalculatedGSTS] = useState('0');
 const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
 const [customerEmail, setCustomerEmail] = useState('');


    useEffect(() => {
      console.log(subject, loading, isWithMaterial, id, raiseAQuoteId, dealerData, customerId);
    }, [subject, loading, isWithMaterial, id, raiseAQuoteId, dealerData, customerId]);
 
    // // Fetch data from API on component mount
    // useEffect(() => {
    //   // API URL 
    //   const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
    //   // Fetching the data from the API
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch(apiUrl);
    //       const quotedata = await response.json();
    //       // Map the data to match your technician details structure 
    //       // const mappedData = data.map(item => ({
    //       //   id: item.id,
    //       //   technicianId: item.technicianId,
    //       //   quotedAmount: parseFloat(item.enterQuoteAmount),
    //       //   discount: parseFloat(item.discount),
    //       //   fixedDiscount: parseFloat(item.fixedDiscount),

    //       //   othercharges: parseFloat(item.othercharges),
    //       //   fixedOtherCharge: parseFloat(item.fixedOtherCharge),

    //       //   serviceCharges: parseFloat(item.serviceCharges),
    //       //   fixedServiceCharge: parseFloat(item.fixedServiceCharge),

    //       //   gst: parseFloat(item.gst),
    //       //   fixedGST: parseFloat(item.fixedGST),

    //       //   totalQuotedAmount: parseFloat(item.totalAmount),
    //       //   addrRmarks:item.addrRmarks,
    //       //   materials: item.materials,
    //       // }));
    //       setTechnicianDetails(quotedata);
    //       //alert(JSON.stringify(technicianDetails));
    //       setRaiseAQuoteId(quotedata.raiseAQuoteId);
    //       setQuote(quotedata.enterQuoteAmount);
  
    //       setFixedQuote(quotedata.fixedQuote);
    //       setDiscount(quotedata.discount);
    //       setFixedDiscount(quotedata.fixedDiscount);
    //       setId(quotedata.id);
          
    //       setGST(quotedata.gst);
    //       setFixedGSTs(quotedata.fixedGST);
    //       // setTotalAmount(quotedata.totalAmount);
    //       //  alert(quotedata.totalAmount);
    //       setOtherCharge(quotedata.othercharges);
    //       // alert(otherCharge);
    //       setServiceCharge(quotedata.serviceCharges);
    //       setFixedServiceCharge(quotedata.fixedServiceCharge);
    //       setFixedOtherCharge(quotedata.fixedOtherCharge);
    //     //  setSpecifications(quotedata.materials);         
    //       // setAddRemarks(quotedata.addrRmarks);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   // Call the fetchData function
    //   fetchData();
    // }, [raiseTicketId]); 

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


    // const handleMaterialChange = (index, key, value) => {
    //   setSpecifications((prev) => {
    //     const updated = [...prev];
    //     updated[index][key] = value;
    //     return updated;
    //   });
    // };
  

    // const handleRateQuotedByChange = (value) => {
    //   setRateQuotedBy(value);
    //   // setIsDealerSelected(value === "Dealer/Trader");
    // };  
  
    const TotalAmount = () => specifications.reduce((sum, spec) => sum + Number(spec.total), 0);

const calculateTotalPrice = () => {
  
  setMaterialQuotation((prev) => {
    const updated = [...prev];
    const discount = updated[0]?.discount;
    const deliveryCharges = updated[0]?.deliverycharges;
    const serviceCharges = updated[0]?.servicecharges; 
    const gst = updated[0]?.gst;
    const baseAmount = TotalAmount();
  
    const fixedDiscount = baseAmount * (discount / 100); // Percentage discount
    const fixedDeliveryChargs = deliveryCharges;
    const fixedServicecharges = (deliveryCharges * serviceCharges) / 100;;
    const fixedGST = ((serviceCharges) * gst) / 100;
    //const fixedGST = ((baseAmount - fixedDiscount + deliveryCharges + serviceCharges) * gst) / 100;
  
    const grandtotal =
      baseAmount - fixedDiscount + fixedDeliveryChargs + fixedServicecharges + fixedGST;
   
    updated[0] = {
      ...updated[0],
      fixedDiscount,
      fixedDeliveryChargs,
      fixedServicecharges,
      fixedGST,
      grandtotal,
    };
    return updated;
  });
  
};

useEffect(() => {
  calculateTotalPrice();
});
 


// const handleQuotationChange = (key, value) => {
//   setMaterialQuotation((prev) => {
//     const updated = [...prev];
//     updated[0][key] = value;
//     return updated;
//   });
// };

  useEffect(() => {
        const fetchticketData = async () => {
          try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
            // alert(raiseTicketId); 
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const data = await response.json();
            // setTicketData(data);
            const normalizedDealerList = Array.isArray(data.dealerList) ? 
            data.dealerList.flatMap(item => item.includes(",") ? 
            item.split(",").map(id => id.trim()) : item) : [];
            setTicketData({
              ...data, dealerList: normalizedDealerList,
            });
            setState(data.state);
            setDistrict(data.district);
            setZipcode(data.zipCode);
            setAddress(data.address);
            setSubject(data.subject);
            setId(data.id);
            setRateQuotedBy(data.rateQuotedBy);
            setCustomerId(data.customerId);
            setIsWithMaterial(data.isMaterialType);
            setTechnicianId(data.technicianList || []);
            setStatus(data.status);
            setFullName(data.customerName);
            setCustomerPhoneNumber(data.customerPhoneNumber);
            setCustomerEmail(data.emailAddress);
            setRequestType(data.requestType || 'Without Material');
            setAttachments(data.attachments);
            setSpecifications(data.materials || [{ material: "", quantity: "", price: "", total: ""}]);
            
            setMaterialQuotation(data.materialQuotation || [{ discounts: "", fixedDiscounts: "", deliveryCharges: "", fixedDeliveryCharges: "", serviceCharges: "", fixedServiceCharges: "", gsts: "", fixedGSTS: "", grandtotal: ""}])
            setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
            const imageRequests =
              data.attachments?.map((photo) => 
               fetch(
                  `https://handymanapiv2.azurewebsites.net/api
/FileUpload/download?generatedfilename=${photo}`
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
          //   // window.alert('Failed to load ticket data. Please try again later.');
          } finally {
            setLoading(false);
          }
        };
        fetchticketData();
      }, [raiseTicketId]);

      useEffect(() => {
        const fetchDealerData = async () => {
          try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuoteByDealer/GetRaiseAQuoteDealerDetailsByid?raiseTicketId=${raiseTicketId}&dealerId=${userId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const dataDealer = await  response.json();
            // alert(JSON.stringify(dataDealer));
            setDealerData(dataDealer[0]);
            setId(dataDealer.id);
            // alert(dataDealer.dealerId);
            setCustomerId(dataDealer.customerId);
            setAddRemarks(dataDealer[0].addRemarks || []);
            setSpecifications(dataDealer[0].materials || []);
            setMaterialQuotation(dataDealer[0].materialQuotation || []);
          } catch (error) {
            console.error('Error fetching dealer data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchDealerData();
      }, [raiseTicketId, userId]);
      
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRemarksChange = (index, key, value) => {
    setAddRemarks((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const handleSaveTicket = async (e) => {
    e.preventDefault();

    try {
      const existingDealerList = ticketData.dealerList || [];

      const newDealers = userId ? userId.split(",").map(id => id.trim()) : [];
      const updatedDealerList = Array.from(new Set([...existingDealerList, ...newDealers]));
    
    const payload = {
      ...ticketData,
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: category,
      assignedTo: "Dealer/Trader",
      id : raiseTicketId,
      status: status,
      InternalStatus: "Pending",
      TicketOwner: ticketData.customerId,
      CustomerId: ticketData.customerId,
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
     DealerList: updatedDealerList,
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
    
      // alert(JSON.stringify(payload));
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


const handleUpdateTicket = async (e) => {
  e.preventDefault();
  // alert(material);
  const payload1 = {
    id :"string",
    ticketId: ticketData.raiseTicketId,
    CustomerId: ticketData.customerId,
    DealerId: userId,
    TotalAmount: TotalAmount().toString(),
    raiseTicketId: raiseTicketId,
    raiseAQuoteDate: new Date(), 
    raiseAQuoteByDealerId: "string",
    addrRmarks: addrRmarks.map((comment) => ({
      requestedDate: comment.requestedDate,
      remarks: comment.remarks,
  })),
//   materials: specifications.map((spec) => ({
//     material: spec.material,
//     quantity: spec.quantity,
//     price: spec.price.toString(),
//     total: spec.total.toString(),
// })),
// materialQuotation: material.map((mat) => ({
//   discount: mat.discount.toString(),
//   fixedDiscount: mat.fixedDiscount.toString(),
//   deliveryCharges: mat.deliverycharges,
//   fixedDeliveryChargs: mat.fixedDeliveryChargs.toString(),
//   serviceCharge: mat.servicecharges,
//   fixedServicecharges: mat.fixedServicecharges.toString(),
//   gst: mat.gst,
//   fixedGST: mat.fixedGST.toString(),
//   grandtotal: mat.grandtotal.toString(),


materials: specifications.map((spec) => ({
  material: spec.material || "",
  quantity: spec.quantity || 0,
  price: spec.price ? spec.price.toString() : "0",
  total: spec.total ? spec.total.toString() : "0",
})),

materialQuotation: material.map((mat) => ({
  
  discount: mat.discount ? mat.discount.toString() : "0",
  fixedDiscount: mat.fixedDiscount ? mat.fixedDiscount.toString() : "0",
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
   
    alert('Ticket  Dealer saved Successfully!');
  } catch (error) {
    console.error('Error saving Dealer ticket data:', error);
    window.alert('Failed to save the Dealer ticket data. Please try again later.')
  }
};

  const handleBothActions =  (e) => {
    e.preventDefault();
    // if (!category) {
    //   setError("Must select a category");
    //   return; 
    // }
  
    // setError("");
    handleSaveTicket(e);
   handleUpdateTicket(e);
    Navigate(`/dealerNotifications/${userType}/${userId}/${category}/${district}`);
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
    <div>
    {isMobile && <Header />}   
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu h-90">
          <Sidebar />
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
              <Sidebar />
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

        {/* Category
        <Row>
        <Col md={6}>
            <Form.Group>
              <label>Category</label>
              <Form.Control
                as="select"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              {error && <div style={{color: "red", marginTop: "5px"}}>{error}</div>}
            </Form.Group>
          </Col>
        </Row> */}
        {/* Assigned To */}
        {/* <Row>
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
                <option value="Customer Care">Dealer/Trader</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row> */}
          {/* Radio Buttons */}
          <div className="radio">
                  {/* <div className="form-group">
              <label>Rate Quoted By<span className="req_star">*</span></label>
              <div className="radio">
                <label className="m-1">
                  <input
                  className="form-check-input m-2"
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
            </div>  */}

          {/* Material Input Fields */}
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
    </div>

    <table className="table table-bordered m-1">
    <tbody>
  {/* Material Total */}
  <tr>
    <td>
      <label className="mb-0 fw-bold">Total</label>
    </td>
    <td colSpan="4">
      <input
        type="number"
        className="form-control text-end"
        value={TotalAmount()}
        disabled
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
      value={material[0]?.discount}
      onChange={(e) =>
        setMaterialQuotation((prev) => {
          const updated = [...prev];
          updated[0].discount = parseFloat(e.target.value);
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
      value={Number(material[0]?.fixedDiscount).toFixed(2)}
      readOnly
      placeholder="Fixed Discount"
      disabled
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
      //   setFixedDeliveryCharge((prev) => {
      //     const updated = [...prev];
      //     updated[0].deliverycharges = parseFloat(e.target.value);
          
      //     // Ensure fixedDeliveryChargs is updated when deliverycharges change
         
          
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
        //     updated[0].servicecharges = parseFloat(e.target.value);
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
        // placeholder="Fixed Service Charges"
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
        value={gsts}
        // onChange={(e) =>
        //   setMaterialQuotation((prev) => {
        //     const updated = [...prev];
        //     updated[0].gst = parseFloat(e.target.value);
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
        // placeholder="Fixed GST"
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
        // placeholder="Grand Total"
        // onChange={(e) => calculatedGrandTotal(e)}
        disabled
      />
    </td>
  </tr>
</tbody>
 </table>


       {/* Dealer Remarks */}
      <div className="form-group">
        <label>Dealer Remarks</label>
        {addrRmarks.map((remark, index) => (
          <div key={index} className="d-flex gap-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Remarks"
              value={remark.remarks}
              onChange={(e) =>
                handleRemarksChange(index, "remarks", e.target.value)
              }
            />
          </div>
        ))}
        </div>   

        {/* Send Quote Button */}
        <div className="mt-4 text-end">
          <Link to={`/dealerNotifications/${userType}/${userId}/${category}/${district}`} className="btn btn-warning text-white mx-2" title='Back'>
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
      `}</style>
  </div>
  );
};

export default RaiseQuotation;