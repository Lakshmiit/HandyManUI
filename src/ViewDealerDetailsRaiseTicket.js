import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import "./App.css";
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {Link, useParams} from 'react-router-dom';

const RaiseQuotationDealerDetails = () => {
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
  const [raiseAQuoteId]=useState('');
  const [lowestBidder] = useState("");
  const [addrRmarks, setAddRemarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [isWithMaterial, setIsWithMaterial] = useState(false);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [zipCode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [materialQuotation, setMaterialQuotation] = useState([
    {
      discount: "",
      fixedDiscount: "",
      deliverycharges: "",
      fixedDeliveryChargs: "",
      servicecharges: "",
      fixedServicecharges: "",
      gst: "",
      fixedGST: "",
      grandtotal: "",
    },
  ]);    
const {category} = useParams();
const [dealerData, setDealerData] = useState('');
const {userType} = useParams();
const {userId} = useParams();
const [technicianId, setTechnicianId] = useState('');
const [rateQuotedBy, setRateQuotedBy] = useState('');

// const [fixedDeliveryCharge] = useState('100'); 
// const [fixedServiceCharges] = useState('10');
// const [gsts] = useState('18');

    useEffect(() => {
      console.log(subject, loading, isWithMaterial, id, raiseAQuoteId, dealerData, customerId);
    }, [subject, loading, isWithMaterial, id, raiseAQuoteId, dealerData, customerId]);
    
    // const handleMaterialChange = (index, field, value) => {
    //   const updatedSpecifications = [...specifications];
    //   updatedSpecifications[index][field] = field === "quantity" || field === "price" ? parseFloat(value) : value;
    
    //   if (field === "quantity" || field === "price") {
    //     const quantity = parseFloat(updatedSpecifications[index].quantity);
    //     const price = parseFloat(updatedSpecifications[index].price);
    //     updatedSpecifications[index].total = quantity * price;
    //   }
    
    //   setSpecifications(updatedSpecifications);
    // };

    // const handleRateQuotedByChange = (value) => {
    //   setRateQuotedBy(value);
    //   // setIsDealerSelected(value === "Dealer/Trader");
    // };  
  
    const materialAmount = () => specifications.reduce((sum, spec) => sum + Number(spec.total), 0);


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
            setRateQuotedBy(data.rateQuotedBy);
            setTechnicianId(data.technicianList);
            setCustomerId(data.customerId);
            setIsWithMaterial(data.isMaterialType);
            setStatus(data.status);
            setFullName(data.customerName);
            setRequestType(data.requestType || 'Without Material');
            setAttachments(data.attachments);
            setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
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
            setCustomerId(dataDealer.customerId);
            setAddRemarks(dataDealer[0].addrRmarks || []);
            setSpecifications(dataDealer[0].materials || []);
            setMaterialQuotation(dataDealer[0].materialQuotation || []);
            console.log("API Response:", dataDealer); 
          } catch (error) {
            console.error('Error fetching dealer data:', error);
          } finally {
            setLoading(false);  
          }
        };
        fetchDealerData();
      }, [raiseTicketId, userId]);

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
      InternalStatus: "Pending",
      TicketOwner: ticketData.customerId,
      CustomerId: ticketData.customerId,
      state: state,
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
      DealerList: userId,
      Rating: "",
      RateQuotedBy: rateQuotedBy,
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

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []); 


  if (loading) {
    return <p>Loading...</p>; 
  }
  
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
          readOnly/>
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
            rows="4"
            readOnly
          />
        </Form.Group>

        
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
          <label>Required (Optional)</label>
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
                readOnly
              />
              <input
                type="text"
                className="form-control text-center"
                value={spec.quantity}
                readOnly
              />
              <input
                type="text"
                className="form-control text-end"
                value={spec.price}
                readOnly
              />
              <input
                type="text"
                className="form-control text-end"
                value={spec.total}
                readOnly
              />
            </div>
          ))}
        </div>
          ) : (
            <>
        {specifications.map((spec, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p className="d-flex align-items-center gap-2 mb-2">
                <strong>Material:</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Material"
                  value={spec.material}
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
                  readOnly
                />
              </p>
              <p className='d-flex align-items-center gap-2 mb-2'>
              <strong>Price:</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Price"
                  value={spec.price}
                  readOnly
                />
              </p>
              <p className='d-flex align-items-center gap-2 mb-2'>
              <strong>Total:</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Total"
                  value={spec.total}
                  readOnly
                />
              </p>
            </div>
          </div>
        ))}
            </>
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
        value={materialAmount()}
        disabled
      />
    </td>
  </tr>
  {/* Discount */}
<tr>
  <td><label>Discount</label></td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={materialQuotation[0]?.discount}
      readOnly
    />
  </td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.fixedDiscount || 0).toFixed(2)}
      disabled
    />
  </td>
</tr>

{/* Delivery Charges */}
<tr>
  <td><label>Delivery Charges</label></td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.deliverycharges || 0).toFixed(2)}
      disabled
    />
  </td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.fixedDeliveryChargs || 0).toFixed(2)}
      disabled
    />
  </td>
</tr>

{/* Service Charges */}
<tr>
  <td><label>Service Charges</label></td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.servicecharges || 0).toFixed(2)}
      disabled
    />
  </td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.fixedServicecharges).toFixed(2)}
      disabled
    />
  </td>
</tr>

{/* GST */}
<tr>
  <td><label>GST</label></td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.gst || 0).toFixed(2)}
      disabled
    />
  </td>
  <td colSpan="2">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.fixedGST).toFixed(2)}
      disabled
    />
  </td>
</tr>

{/* Grand Total */}
<tr>
  <td><label>Grand Total</label></td>
  <td colSpan="4">
    <input
      type="number"
      className="form-control text-end"
      value={Number(materialQuotation[0]?.grandtotal).toFixed(2)}
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
              value={remark.remarks}
              readOnly
            />
          </div>
        ))}
        </div>   

        {/* Send Quote Button */}
        <div className="mt-4 text-end">
          <Link to={`/dealerNotificationsGrid/${userType}/${userId}/${category}/${district}`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
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

export default RaiseQuotationDealerDetails;