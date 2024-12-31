import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import "./App.css";
import Sidebar from './Sidebar';
// import ForwardIcon from '@mui/icons-material/Forward';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useParams} from 'react-router-dom';

const RaiseQuotation = () => {
//   const Navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "" }]);
  const [requestType, setRequestType] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [technicianId, setTechnicianId] = useState(""); 
  const [serviceCharges] = useState("");
  const [gst] = useState("");
  const [fixedDiscount] = useState('');
  const [fixedOtherCharge] = useState('');
  const [fixedServiceCharge] = useState('');
  const [fixedGST] = useState('');
  const [totalQuotedAmount, setTotalQuotedAmount] = useState("");
  const [lowestBidder, setLowestBidder] = useState("");
  const [discount] = useState("");
  const [othercharges] = useState("");
  const [addremarks, setAddRemarks] = useState("");
  const [assignedTo, setAssignedTo] = useState('');
  const [uploadedFiles] = useState([]);
  const [showAlert] = useState(false);
  const [alertMessage] = useState('');
  const [isWithMaterial, setIsWithMaterial] = useState(false);
//   const [isDealerSelected , setIsDealerSelected] = useState(false);
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [traderDetails] = useState([]);
  const {traderId} = useParams();
//   setTraderDetails
    // Fetch data from API on component mount
    useEffect(() => {
      // API URL
      const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
      // Fetching the data from the API
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);

          const data = await response.json();
          // Map the data to match your technician details structure
          const mappedData = data.map(item => ({
            technicianId: item.technicianId,
            quotedAmount: parseFloat(item.enterQuoteAmount),
            discount: parseFloat(item.discount),
            fixedDiscount: parseFloat(item.fixedDiscount),

            othercharges: parseFloat(item.othercharges),
            fixedOtherCharge: parseFloat(item.fixedOtherCharge),

            serviceCharges: parseFloat(item.serviceCharges),
            fixedServiceCharge: parseFloat(item.fixedServiceCharge),

            gst: parseFloat(item.gst),
            fixedGST: parseFloat(item.fixedGST),

            totalQuotedAmount: parseFloat(item.totalAmount),
          }));
          // Update state with the fetched and mapped data
          setTechnicianDetails(mappedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Call the fetchData function
      fetchData();
    }, [raiseTicketId]); 

    // const handleRateQuotedByChange = (value) => {
    //     // setRateQuotedBy(value);
    //     setIsDealerSelected(value === "Dealer/Agency");
    //   };

  useEffect(() => {
    console.log(subject, loading, isWithMaterial);
  }, [subject, loading, isWithMaterial]);

  useEffect(() => {
        const fetchticketData = async () => {
          try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const data = await response.json();
            setTicketData(data);
            // setState(data.state);
            // setDistrict(data.district);
            // setzipCode(data.zipCode);
            // setAddress(data.address);
            setSubject(data.subject);
            setId(data.id);
            setCustomerId(data.customerId);
            setIsWithMaterial(data.isMaterialType);
            setAssignedTo(data.assignedTo);
            setStatus(data.status);
            setRequestType(data.requestType || 'Without Material');
            setSpecifications(data.materials || [{ material: "", quantity: "" }]);
            // setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
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
            return current.quotedAmount < prev.quotedAmount ? current : prev;
          });
          setTechnicianId(lowest.technicianId);
          setLowestBidder(lowest.technicianId);
          setTotalQuotedAmount(lowest.quotedAmount +discount+ fixedDiscount + othercharges + fixedOtherCharge+ serviceCharges + fixedServiceCharge+ gst + fixedGST);
        } else {
          // Optionally, handle the case where technicianDetails is empty
          setTechnicianId('');
          setLowestBidder('');
          setTotalQuotedAmount(0);
        }
      }, [technicianDetails, discount, fixedDiscount, othercharges, fixedOtherCharge, serviceCharges,fixedServiceCharge, gst, fixedGST]);
      

//   // Handle form data changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTicketData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
  
  const handleSaveTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      // address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: ticketData.category,
      assignedTo: ticketData.assignedTo,
      id : id,
      status: status,
      InternalStatus: "Assigned",
      TicketOwner: ticketData.customerId,
      CustomerId: customerId,
      // state: state,
      // isMaterialType: isMaterialType,
      // district: district,
      // ZipCode: zipCode,
      RequestType: requestType,

      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
      })),
      // comments: commentsList.map((comment) => ({
      //     updatedDate: comment.updatedDate,
      //     CommentText: comment.CommentText,
      // })),
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

//   const handleQuotation = () => {
//     const quotationData = {
//       ticketId: ticketData.raiseTicketId,
//       subject: ticketData.subject,
//       materials: ticketData.specifications,
//     };
//     Navigate("/raiseTicketBuyProducts", { state: quotationData });
//   };
  
  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle material input change
  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...specifications];
    updatedMaterials[index][field] = value;
    setSpecifications(updatedMaterials);
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [uploadedFiles]);


  return (
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
      <h1 className="text-center mb-2">Raise a Ticket Quotation(Customer)</h1>

      {/* Ticket Form */}
      <Form onSubmit={handleSaveTicket}>
      <div className="ticket-info">
        <p><strong>Ticket Id: </strong> {ticketData.raiseTicketId}</p>
        <p><strong>Subject: </strong> {ticketData.subject}</p>
        <p><strong>Category: </strong> {ticketData.category}</p>
      </div>
          {/* Material Input Fields */}
        <div className="form-group">
          <label>Required Material</label>
          {specifications.map((spec, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              {/* {isDealerSelected && (
                <div className="form-check">
                  <input 
                  type="radio"
                  className="form-check-input mt-3"
                  name={`materialRadio${index}`}
                  id={`materialRadio${index}`}
                  value={spec.material}
                  />
                  </div>
              )} */}
              <input
                type="text"
                className="form-control"
                value={spec.material}
                placeholder=" Material"
                onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
                
              />
              <input
                type="text"
                className="form-control"
                placeholder=" Quantity"
                value={spec.quantity}
               onChange={(e) => handleMaterialChange(index,"quantity", e.target.value)}
                
              />
              <input
                type="number"
                className="form-control"
                placeholder=" Rate"
                value={spec.rate}
                onChange={(e) => handleMaterialChange(index,"rate", e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Total"
                value={spec.total}
                readOnly
              />
              {/* <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveMaterial(index)}
              >
                Remove
              </button> */}
            </div>
          ))}
    </div>

  <table className="table table-bordered">
  <thead>
    <tr>
    <td>Trader ID</td>
    <td>Total</td>
    <td>Discount</td>
    {/* <td>Fixed Discount</td> */}
    <td>Delivery Charges</td>
    {/* <td>Fixed Delivery Charges</td> */}
    <td>Service Charges</td>
    {/* <td>Fixed Service Charges</td> */}
    <td>GST</td>
    {/* <td>Fixed GST</td> */}
    <td>Grand Total</td>
    </tr>
    <tr>
    <td colSpan="3">
            <input
            type="text"
            className='form-control text-end'
            value={traderId}
            readOnly
            placeholder='Lowest Bidder Trader ID'
            /> 
        </td>
        <td>Lowest Bid Amount</td>
        
        <td colspan="4">
            <input
            type="number"
            className="form-control text-end"
            value={totalQuotedAmount}
            readOnly
            placeholder="Lowest Bidder Total Amount"
            />
        </td>
        
    </tr>
    </thead>
    <tbody>
        {traderDetails.map((trader, index) => (
        <tr key={index}>
            <td>{trader.traderId}</td>
            <td>{trader.total}</td>
            <td>{trader.discount}</td>
            <td>{trader.fixedDiscount}</td>
            <td>{trader.deliveryCharges}</td>
            <td>{trader.fixedDeliveryCharges}</td>
            <td>{trader.serviceCharges}</td>
            <td>{trader.fixedServiceCharges}</td>
            <td>{trader.gst}</td>
            <td>{trader.fixedGST}</td>
        </tr>
        ))}
    </tbody>
    </table>
   
<div>
<table className="table table-bordered">
  <thead>
    <tr>
      <td>Technician ID</td>
      <td>Quoted Amount</td>
      <td>Discount</td>
      {/* <td>Enter Discount</td> */}
      <td>Any Other Charges</td>
      {/* <td>Enter Any Other Charges</td> */}
      <td>Service Charges</td>
      {/* <td>Enter Service Charges</td> */}
      <td>GST</td>
      {/* <td>Enter GST</td> */}
      <td>Total Quoted Amount</td>
      <td>Lowest Bidder</td>
    </tr>
    <tr>
      <td>Technician ID</td>
      <td>Quoted Amount</td>
      <td>Discount</td>
      {/* <td>Enter Discount</td> */}
      <td>Any Other Charges</td>
      {/* <td>Enter Any Other Charges</td> */}
      <td>Service Charges</td>
      {/* <td>Enter Service Charges</td> */}
      <td>GST</td>
      {/* <td>Enter GST</td> */}
      <td>Total Quoted Amount</td>
      <td>Lowest Bidder</td>
    </tr>
  </thead>

  <tbody>
    {technicianDetails.map((technician, index) => (
      <tr key={index}>
        <td>{technician.technicianId}</td>
        <td>{technician.quotedAmount}</td>
        {/* <td>{technician.discount}</td> */}
        <td>{technician.fixedDiscount}</td>
        {/* <td>{technician.othercharges}</td> */}
        <td>{technician.fixedOtherCharge}</td>
        {/* <td>{technician.serviceCharges}</td> */}
        <td>{technician.fixedServiceCharge}</td>
        {/* <td>{technician.gst}</td> */}
        <td>{technician.fixedGST}</td>
        <td>{technician.totalQuotedAmount}</td>
        <td>{technician.technicianId === lowestBidder ? 'Yes' : 'No'}</td>
      </tr>
    ))}  
  </tbody>
    {/* Technician ID and Total Amount */}

    <tbody>
        <tr>
        {/* <td>Technician ID</td> */}
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
            value={totalQuotedAmount}
            readOnly
            placeholder="Lowest Bidder Amount"
            />
        </td>
        </tr>
        </tbody>
        </table>
        </div>

        <table className="table table-bordered">
        <thead>
          <tr>
            <th>Job Description</th>
            <th>Lowest Bidder Details</th>
            <th>Lowest Amount With Charges and Taxes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Job Required Material Total Amount</td>
            <td></td>
            <td></td>
            <td>
              <input type="radio" name="materialApproval" className="form-check-input" value="approved" /> Approved
            </td>
          </tr>
          <tr>
            <td>Technical Agency Charges Total Amount</td>
            <td></td>
            <td></td>
            <td>
              <input type="radio" name="agencyApproval" className="form-check-input" value="approved" /> Approved
            </td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Approved Acceptance Total Amount</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    
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
       {/* Add Remarks */}
       <div className="form-group col-md-6">
            <label>Add Remarks</label>
            <input 
            type="text"
            className="form-control"
            value={addremarks}
            placeholder="Enter Remarks"
            onChange={(e) => setAddRemarks(e.target.value)}
            />
        </div>
        <div className='mt-4'>
            <label>
                <input
                type='checkbox'
                name='terms'
                value="accepted"
                className="form-check-input"
            /> 
            Terms and Conditions Apply
            </label>
        </div>

        {/* Send Quote Button */}
        <div className="mt-4 ">
          <Button className="btn btn-warning text-white mx-2" title='submit'>
            Send Quote
          </Button>
        </div>
      </Form>

      {/* Success Alert */}
      {showAlert && (
        <div className="mt-4 alert alert-info" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  </div>
  );
};

export default RaiseQuotation;
