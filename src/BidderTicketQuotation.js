import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import "./App.css";
import AdminSidebar from './AdminSidebar';
import ForwardIcon from '@mui/icons-material/Forward';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {Link, useNavigate, useParams} from 'react-router-dom';
import JSZip from "jszip";
import { saveAs } from "file-saver";

const BidderTicketQuotation = () => {
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
  const [techRemarks, setRemarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [assignedTo, setAssignedTo] = useState('');
  // const [uploadedFiles] = useState([]);
  const [isWithMaterial, setIsWithMaterial] = useState(false);
  const [newPhotoCount , setPhotoCount] = useState(0);
    // Initial state for technician details  
    const [technicianDetails, setTechnicianDetails] = useState([]);
    const [dealerDetails, setDealerDetails] = useState([]);
  const [lowestDealerBidder, setLowestDealerBidder] = useState("");
  const [dealerId, setDealerId] = useState(""); 
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
   const [lowestGrandTotal, setLowestGrandTotal] = useState('');
   const [details, setDetails] = useState('');
    const [materialQuotation, setMaterialQuotation] = useState([{discount: "", fixedDiscount: "", deliverycharges: "", fixedDeliveryChargs: "", servicecharges: "", fixedServicecharges: "", gst: "", fixedGST: "", grandtotal: ""}])
  
    useEffect(() => {
        console.log(subject, loading, isWithMaterial, enterQuoteAmount, fixedQuote, materialQuotation, raiseAQuoteId, id);
      }, [subject, loading, isWithMaterial, enterQuoteAmount, fixedQuote, materialQuotation, raiseAQuoteId, id]);
    
    // Fetch data from API on component mount 
    useEffect(() => {
      // API URL
      const apiUrl = `https://localhost:7091/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const quotedata = await response.json()
          setTechnicianDetails(quotedata);
          setRaiseAQuoteId(quotedata.raiseAQuoteId);
          setQuote(quotedata.enterQuoteAmount);
          setFixedQuote(quotedata.fixedQuote);
          setDiscount(quotedata.discount);
          setFixedDiscount(quotedata.fixedDiscount);
          setId(quotedata.id);
          setGST(quotedata.gst);
          setFixedGSTs(quotedata.fixedGST);
          setTotalAmount(quotedata.totalAmount);
          setOtherCharge(quotedata.othercharges);
          setServiceCharge(quotedata.serviceCharges);
          setFixedServiceCharge(quotedata.fixedServiceCharge);
          setFixedOtherCharge(quotedata.fixedOtherCharge);
          setRemarks(quotedata.addrRmarks || [{ requestedDate: new Date(), remarks: ""}]);
          // setSpecifications(quotedata.materials || [{material: "", quantity: "", price: "", total: ""}]);         
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

//     const calculateTotalPrice = () => {
  
//       setMaterialQuotation((prev) => {
//         const updated = [...prev];
//         const discount = updated[0]?.discount;
//         const deliveryCharges = updated[0]?.deliverycharges;
//         const serviceCharges = updated[0]?.servicecharges; 
//         const gst = updated[0]?.gst;
//         const baseAmount = materialAmount();
      
//         const fixedDiscount = baseAmount * (discount / 100); // Percentage discount
//         const fixedDeliveryChargs = deliveryCharges;
//         const fixedServicecharges = ((baseAmount - fixedDiscount + deliveryCharges) * serviceCharges) / 100;;
//         const fixedGST = ((baseAmount - fixedDiscount + deliveryCharges + serviceCharges) * gst) / 100;
//         const grandtotal =
//           baseAmount - fixedDiscount + fixedDeliveryChargs + fixedServicecharges + fixedGST;
      
//         updated[0] = {
//           ...updated[0],
//           fixedDiscount,
//           fixedDeliveryChargs,
//           fixedServicecharges,
//           fixedGST,
//           grandtotal,
//         };
//         return updated;
//       });
      
//     };

// useEffect(() => {
//   calculateTotalPrice();
// }
// );
 
  useEffect(() => {
        const fetchticketData = async () => {
          try {
            const response = await fetch(`https://localhost:7091/api/RaiseTicket/GetTicket/${raiseTicketId}`);
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
            setDetails(data.details);
            setFullName(data.customerName);
            setRequestType(data.requestType || 'Without Material');
            setAttachments(data.attachments);
            // setSpecifications(data.materials || [{ material: "", quantity: "", price: "", total: "" }]);
            // setMaterialQuotation(data.materialQuotation || [{ discount: "", fixedDiscount: "", deliverycharges: "", fixedDeliveryChargs: "", servicecharges: "", fixedServicecharges: "", gst: "", fixedGST: "", grandtotal: ""}])
            setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
            const imageRequests =
              data.attachments?.map((photo) => 
               fetch(
                  `https://localhost:7091/api/FileUpload/download?generatedfilename=${photo}`
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
        const fetchDealerData = async () => {
          try {
            const response = await fetch(`https://localhost:7091/api/RaiseAQuoteByDealer/GetRaiseAQuoteLowestDealerByid?raiseAQuotetDealerId=${raiseTicketId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const dataDealer = await  response.json();
            setDealerDetails(dataDealer);
            setAddRemarks(dataDealer[0].addrRmarks || []);
             setSpecifications(dataDealer[0].materials || []);
           setMaterialQuotation(dataDealer[0]?.materialQuotation || []);
          } catch (error) {
            console.error('Error fetching dealer data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchDealerData();
      }, [raiseTicketId]);

      useEffect(() => {
        if (dealerDetails.length > 0) {
          const lowest = dealerDetails.reduce((prev, current) => {
            const prevAmount = parseFloat(prev.materialQuotation[0].grandtotal);
            const currentAmount = parseFloat(current.materialQuotation[0].grandtotal);
            return currentAmount < prevAmount ? current : prev;
          });

          // alert(lowest.dealerId);

          //  setLowestDealerBidder(lowest);
          //  alert(JSON.stringify(lowest));
          setLowestDealerBidder(lowest.dealerId);
          
          setDealerId(lowest.dealerId);
          setLowestGrandTotal(lowest.materialQuotation[0].grandtotal);

          setId(lowest.id);
          setDealerId(lowest.dealerId);
          // alert(lowest.dealerId);
          
           
           if (lowest.addrRmarks?.length > 0) {
            setAddRemarks(lowest.addrRmarks[0].remarks);
          } else {
            setAddRemarks("");
          }
        } else {
          setId('');
          setDealerId('');
          setLowestDealerBidder('');
          // setSpecifications('');
          setMaterialQuotation('');
          setAddRemarks('');
        }
      }, [dealerDetails]);  

  const materialCharge = parseFloat(lowestGrandTotal);
  const technicalAmount = parseFloat(Number(totalAmount || 0).toFixed(2));
  const total = materialCharge + technicalAmount;

  // const approvedAcceptanceTotal = (() => {
  //   if (isMaterialApproved && isAgencyApproved) {
      
  //     return total;
  //   } else if (isAgencyApproved) {
      
  //     return technicalAmount;
  //   } else if (isMaterialApproved) {
      
  //     return materialCharge;
  //   } else {
     
  //     return 0;
  //   }
  // })();
      
      
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
            // setSpecifications(lowest.materials);
            // setMaterialQuotation(lowest.materialQuotation);
            if (lowest.addrRmarks?.length > 0) {
              setRemarks(lowest.addrRmarks[0].remarks);
            } else {
              setRemarks("");
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
            setRemarks("");
          }
        }, [technicianDetails, discount, fixedDiscount, othercharges, fixedOtherCharge, serviceCharges,fixedServiceCharge, gst, fixedGST]);
        
        const handleDealerRemarks = (index, value) => {
          setAddRemarks((prev) =>
            prev.map((item, i) => (i === index ? { ...item, addrRmarks: value } : item))
          );
        };

        const handleAddRemarks = (index, value) => {
          setRemarks((prev) =>
            prev.map((item, i) => (i === index ? { ...item, addrRmarks: value } : item))
          );
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
      details: details,
      category: ticketData.category,
      assignedTo: "Customer",
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
          price: spec.price,
          Total: spec.total,
      })),
      comments: commentsList.map((comment) => ({
          updatedDate: comment.updatedDate,
          CommentText: comment.commentText,
      })),
      LowestBidderTechnicainId: lowestBidder,
      LowestBidderDealerId: dealerId,
      ApprovedAmount: "",
      customerName: fullName,
      Option1Day: "",
      Option1Time: "",
      Option2Day: "",
      Option2Time: "",
      TechnicianList: [technicianId],
      DealerList: [dealerId],
    };
    try {
      
      const response = await fetch(`https://localhost:7091/api/RaiseTicket/${raiseTicketId}`, {
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
//     materialQuotation: materialQuotation.map((quote) => ({
//       discount: quote.discount.toString(),
//       deliverycharges: quote.deliverycharges.toString(),
//       servicecharges: quote.servicecharges.toString(),
//       gst: quote.gst.toString(),
//       grandtotal: quote.grandtotal.toString(), 
      
//       fixedDiscount: quote.fixedDiscount.toString(),
//       fixedDeliveryChargs: quote.fixedDeliveryChargs.toString(),
//       fixedServicecharges: quote.fixedServicecharges.toString(),
//       fixedGST: quote.fixedGST.toString(),
//     })),
//     // LowestBidderTechnicianId: lowestBidder,
//   };
//   // var techData = JSON.stringify(payload3);
//     //alert(JSON.stringify(payload3));
//     //console.log(JSON.stringify(payload3));
//   try {
//     const response = await fetch(`https://localhost:7091/api/RaiseAQuote/id?id=${id}`, {
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


  const handleBothActions =  (e) => {
    e.preventDefault();
    handleSaveTicket(e);
    // handleValuesTicket(e);
    Navigate(`/adminNotifications`);
  }

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []); 


  return (
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
      <h1 className="text-center mb-2">Bidder Ticket Quotations</h1>

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
                <option value="Customer Care">Customer</option>
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
          onChange={(e) => setRequestType(e.target.value)}
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
          onChange={(e) => setRequestType(e.target.value)}
        />
        Without Material
      </label>

      {requestType === "With Material" && (
            <div className="form-group">
              <label>Rate Quoted By<span className="req_star">*</span></label>
              <div className="radio">
                <label className="m-1">
                  <input className="form-check-input m-2 border-dark"
                  type="radio"
                  name="RateQuotedBy"
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
          )}

          {/* Material Input Fields */}
      {/* {requestType === "With Material" && ( */}
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
                className="form-control text-center"
                placeholder="Enter Quantity"
                value={spec.quantity}
                onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
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
            </div>
          ))}
        </div>
      {/* )} */}
    </div>

    <div>
    <label className='fw-bold m-2'>Dealer Quotation</label>
    <table className="table table-bordered">
    <thead>
    <tr>
        <td>Dealer ID</td>
        <td>Discount </td>
        <td>Delivery Charges</td>
        <td>Service Charges</td>
        <td> GST</td>
        <td>Total Quoted Amount</td>
        <td>Lowest Bidder</td>
    </tr>
    </thead>

    <tbody>
    {dealerDetails.map((dealer, index) => (
        <tr key={index} className='text-end'>
        <td>{dealer.dealerId}</td>
        <td>{Number(dealer.materialQuotation[0].fixedDiscount).toFixed(2)}</td>
        <td>{Number(dealer.materialQuotation[0].fixedDeliveryChargs).toFixed(2)}</td>
        <td>{Number(dealer.materialQuotation[0].fixedServicecharges).toFixed(2)}</td>
        <td>{Number(dealer.materialQuotation[0].fixedGST).toFixed(2)}</td>
        <td>{Number(dealer.materialQuotation[0].grandtotal).toFixed(2)}</td>
        <td>{dealer.dealerId === lowestDealerBidder ? 'Yes' : 'No'}</td>
        </tr>
    ))}  
    </tbody>
    {/* Dealer ID and Total Amount */}

    <tbody>
        <tr>
        <td>Dealer ID</td>
        <td colSpan="3">
            <input
            type="text"
            className='form-control text-end'
            value={dealerId}
            readOnly
            placeholder='Dealer ID'
            /> 
        </td>
        <td>Total Amount</td>
        
        <td colspan="3">
            <input
            type="number"
            className="form-control text-end"
            value={Number(lowestGrandTotal).toFixed(2)} 
            readOnly
            placeholder="Total Amount"
            />
        </td>
        </tr>
        </tbody>
        </table>
        </div>

         {/* Dealer Remarks */}
       <div className="form-group col-md-6">
          <label>Dealer Remarks</label>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  className="form-control"
                  value={addrRmarks} 
                  onChange={(e) => handleDealerRemarks(e.target.value)}
                  readOnly
                />
              </div>
        </div>

<div>
    <label className='fw-bold m-2'>Technician Quotation</label>
<table className="table table-bordered">
  <thead>
    <tr>
      <td>Technician ID</td>
      <td>Quoted Amount</td>
      <td>Discount</td>
      <td>Other Charges</td>
      <td>Service Charges</td>
      <td>GST</td>
      <td>Total Quoted Amount</td>
      <td>Lowest Bidder</td>
    </tr>
  </thead>

  <tbody>
    {technicianDetails.map((technician, index) => (
      <tr key={index} className='text-end'>
        <td>{technician.technicianId}</td>
        <td>{Number(technician.enterQuoteAmount).toFixed(2)}</td>
        <td>{Number(technician.fixedDiscount).toFixed(2)}</td>
        <td>{Number(technician.fixedOtherCharge).toFixed(2)}</td>
        <td>{Number(technician.fixedServiceCharge).toFixed(2)}</td>
        <td>{Number(technician.fixedGST).toFixed(2)}</td>
        <td>{Number(technician.totalAmount).toFixed(2)}</td>
        <td>{technician.technicianId === lowestBidder ? 'Yes' : 'No'}</td>
      </tr>
    ))}  
  </tbody>
    {/* Technician ID and Total Amount */}

    <tbody>
        <tr>
        <td>Technician ID</td>
        <td colSpan="3">
            <input
            type="text"
            className='form-control text-end'
            value={technicianId}
            readOnly
            placeholder='Technician ID'
            /> 
        </td>
        <td>Total Amount</td>
        
        <td colspan="3">
            <input
            type="number"
            className="form-control text-end"
            value={Number(totalAmount).toFixed(2)}
            readOnly
            placeholder="Total Amount"
            />
        </td>
        </tr>
        </tbody>
        </table>
        </div>

       {/* Technician Remarks */}
       <div className="form-group col-md-6">
          <label>Technician Remarks</label>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  className="form-control m-1"
                  value={techRemarks} 
                  onChange={(e) => handleAddRemarks(e.target.value)}
                  readOnly
                />
              </div>
        </div>
        <p><strong>ABSTRACT</strong></p>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Lowest Bidder ID</th>
            <th><span>Lowest Amount Including<br /> Charges and Taxes</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Required Material Quotation Bid Amount</td>
            <td className='text-center'>{dealerId}</td>
            <td className='text-end'>{lowestGrandTotal
              ? Number(lowestGrandTotal).toFixed(2)
              : '0.00'}</td>
          </tr>
          <tr>
            <td>Technical Agency Quotation Bid Amount</td>
            <td className='text-center'>{technicianId}</td>
            <td className='text-end'>{Number(totalAmount || 0).toFixed(2)}</td> 
          </tr>
          <tr>
            <td>Total Amount</td>
            <td></td>
            <td className='text-end'>{Number(total || 0).toFixed(2)}</td> 
            
          </tr>
          {/* <tr className="blinking-row">
            <td className='fs-5'>Approved Acceptance Total Amount</td>
            <td></td>
            <td className='text-end'></td>
          </tr> */}
        </tbody>
      </table>

        {/* Send Quote Button */}
        <div className="mt-4 text-end">
          <Link to='/dealerGrid' className="btn btn-warning text-white mx-2" title='Back'>
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
  );
};

export default BidderTicketQuotation;