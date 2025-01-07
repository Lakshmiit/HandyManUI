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
  const { raiseTicketId } = useParams();
  const [ticketData, setTicketData] = useState([]);
  const [subject, setSubject] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [zipCode, setZipcode]=useState('');
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [isMaterialType, setIsWithMaterial] = useState('');
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]);
  const [loading, setLoading] = useState(true);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "", total: "" }]);
  const [requestType, setRequestType] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [details, setDetails] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [technicianId, setTechnicianId] = useState(""); 
  const [serviceCharges, setServiceCharge] = useState("");
  const [gst, setGST] = useState(""); 
  const [fixedQuote, setFixedQuote] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [fixedServiceCharge, setFixedServiceCharge] = useState('');
  const [fixedGST, setFixedGST] = useState('');
  const [totalQuotedAmount, setTotalQuotedAmount] = useState("");
  const [lowestBidder, setLowestBidder] = useState("");
  const [TotalAmount] = useState('');
  const [othercharges, setOtherCharge] = useState("");
  const [assignedTo, setAssignedTo] = useState('');
  const [showAlert] = useState(false);
  const [alertMessage] = useState('');
  const [category, setCategory] = useState("");
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [addrRmarks, setAddrRmarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [traderDetails] = useState([]);
  
  const [raiseAQuoteId, setRaiseAQuoteId] = useState('');
  const [enterQuoteAmount, setQuote] = useState('');
  const [discount, setDiscount] = useState('');
  const [material] = useState([{discounts: "", fixedDiscounts: "", deliveryCharges: "", fixedDeliveryCharges: "", serviceCharges: "", fixedServiceCharges: "", gsts: "", fixedGSTS: "", grandtotal: ""}])
  

  useEffect(() => {
    console.log(category, loading, subject,status, id);
  }, [category, loading, subject,status, id]);

  
  useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const data = await response.json();
        // alert(JSON.stringify(data));
        // console.log(JSON.stringify(data));
        setTicketData(data);
        // alert(JSON.stringify(data));
        setId(data.id);
        setStatus(data.status);
        setDetails(data.Details);
        setCustomerId(data.CustomerId);
        setState(data.State);
        setAddress(data.Address);
        setDistrict(data.District);
        setZipcode(data.ZipCode);
        setSubject(data.subject);
        setCategory(data.category);
        setAssignedTo(data.assignedTo);
        setIsWithMaterial(data.isMaterialType);
        setRequestType(data.requestType || 'Without Material');
        // setSpecifications(data.materials || [{ material: "", quantity: "", price: "", total: ""}]);
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);

      } catch (error) {
        console.error('Error fetching ticket data:', error);
        // window.alert('Failed to load ticket data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchticketData();
  }, [raiseTicketId]);

    // Fetch data from API on component mount
    useEffect(() => {
      const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
      // Fetching the data from the API
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          // Map the data to match your technician details structure
          // alert(JSON.stringify(data));
          // const mappedData = data.map(item => ({
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

          //   totalQuotedAmount: parseFloat(item.totalQuotedAmount),
          //   addrRmarks:item.addrRmarks,
          //   materials: item.materials,
          // }));
          // Update state with the fetched and mapped data
          // setTechnicianDetails(mappedData);
          setTechnicianDetails(data);
          // alert(JSON.stringify(technicianDetails));
          setRaiseAQuoteId(data.raiseAQuoteId);
          setQuote(data.enterQuoteAmount);
  
          setFixedQuote(data.fixedQuote);
          setDiscount(data.discount);
          setFixedDiscount(data.fixedDiscount);
          setId(data.id);
          
          setGST(data.gst);
          setFixedGST(data.fixedGST);
          setTotalQuotedAmount(data.totalAmount);
          // alert(data.totalAmount);
          setOtherCharge(data.Othercharges);
          // alert(otherCharge);
          setServiceCharge(data.ServiceCharges);
          setFixedServiceCharge(data.fixedServiceCharge);
          setFixedOtherCharge(data.fixedOtherCharge);         
          setAddrRmarks(data.addrRmarks);
          setSpecifications(data.materials || [{material: "", quantity: "", price: "", total: ""}]);
          // alert(JSON.stringify(technicianDetails));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [raiseTicketId]); 

  // useEffect(() => {
  //   if (traderDetails.length > 0) {
  //     const lowest = traderDetails.reduce((prev, current) => {
  //       return current.totalAmount < prev.totalAmount ? current : prev;
  //     });
      
  //     setLowestBidder(lowest.totalAmount);
  //     setTotalAmount(lowest.totalAmount);
  //     // if (lowest.addrRmarks?.length > 0) {
  //     //   setAddrRmarks(lowest.addrRmarks[0].remarks);
  //     // } else {
  //     //   setAddrRmarks("");
  //     // }
  //   } else {
  //     // Optionally, handle the case where technicianDetails is empty
  //     setTechnicianId('');
  //     setLowestBidder('');
  //     setTotalQuotedAmount(0);
  //   }
  // }, [traderDetails]);
  

      useEffect(() => {
        if (technicianDetails.length > 0) {
          const lowest = technicianDetails.reduce((prev, current) => {
            return current.totalQuotedAmount < prev.totalQuotedAmount ? current : prev;
          });
          setTechnicianId(lowest.technicianId);
          setLowestBidder(lowest.technicianId);
          setTotalQuotedAmount(lowest.totalQuotedAmount);
          if (lowest.addrRmarks?.length > 0) {
            setAddrRmarks(lowest.addrRmarks[0].remarks);
          } else {
            setAddrRmarks("");
          }
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

const handleAddRemarks = (index, value) => {
  setAddrRmarks((prev) =>
    prev.map((item, i) => (i === index ? { ...item, addrRmarks: value } : item))
  );
};
  
  const handleSaveTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      Subject: ticketData.subject,
      Details: details,
      Category: ticketData.category,
      AssignedTo: ticketData.assignedTo,
      id : ticketData.id,
      status: ticketData.status,
      internalStatus: "Assigned",
      TicketOwner: ticketData.customerId,
      CustomerId: customerId,
      Address: address,
      State: state,
      isMaterialType: isMaterialType,
      District: district,
      ZipCode: zipCode,
      RequestType: requestType,
      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
          // price: spec.price,
          // total: spec.total,
      })),
      comments: commentsList.map((comment) => ({
          updatedDate: comment.updatedDate,
          CommentText: comment.commentText,
      })),
      addrRmarks: Array.isArray(addrRmarks)
      ? addrRmarks.map((comment) => ({
          requestedDate: "2025-01-07T08:57:22.484Z",
          remarks: "remarks",
        }))
      : [],
      LowestBidderTechnicainId: lowestBidder,
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

  const handleValuesTicket = async (e) => {
    e.preventDefault();
    
    const payload3 = {
      id: "03dd6bbc-36ba-4795-b39c-b40d58991d87",
      quotedDate: new Date().toISOString(),
      RaiseAQuoteId:raiseAQuoteId ,
      //raiseAQuote: ticketData.raiseAQuote,
      RaiseTicketId: raiseTicketId,
      CustomerId: customerId,
      TicketId: ticketData.raiseTicketId,
      TechnicianId: technicianId,
      enterQuoteAmount: enterQuoteAmount,
      Discount: discount, 
      Othercharges: othercharges,
      ServiceCharges: serviceCharges,
      GST: gst,
      TotalAmount: TotalAmount,
      fixedQuote: fixedQuote,
      fixedDiscount:fixedDiscount,
      fixedOtherCharge:fixedOtherCharge,
      fixedServiceCharge: fixedServiceCharge,
      fixedGST: fixedDiscount, 
      addrRmarks: Array.isArray(addrRmarks)
      ? addrRmarks.map((comment) => ({
          requestedDate: "2025-01-07T08:57:22.484Z",
          remarks: "remarks",
        }))
      : [],
    materials: specifications.map((spec) => ({
      material: spec.material,
      quantity: spec.quantity,
      price: spec.price.toString(),
      total: spec.total.toString(),
    })),
    materialQuotation: material.map((quote) => ({
      discount: quote.discounts.toString(),
      deliverycharges: quote.deliveryCharges.toString(),
      servicecharges: quote.serviceCharges.toString(),
      gst: quote.gsts.toString(),
      grandtotal: quote.grandtotal.toString(), 
      fixedDiscount: quote.fixedDiscounts.toString(),
      fixedDeliveryChargs: quote.fixedDeliveryCharges.toString(),
      fixedServicecharges: quote.fixedServiceCharges.toString(),
      fixedGST: quote.fixedGSTS.toString(),
    })),
    // LowestBidderTechnicianId: lowestBidder,
  };
  // var techData = JSON.stringify(payload3);
    //alert(JSON.stringify(payload3));
    //console.log(JSON.stringify(payload3));
  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/id?id=03dd6bbc-36ba-4795-b39c-b40d58991d87`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload3),
    });
     
    if (!response.ok) {
      throw new Error('Failed to Update RaiseAQuote data');
    }

    alert('RaiseAQuote Updated Successfully!');
  } catch (error) {
    console.error('Error Update RaiseAQuote ticket data:', error);
    window.alert('Failed to Update the RaiseAQuote ticket data. Please try again later.');
  }
};


  const handleBothActions =  (e) => {
    e.preventDefault();
    handleSaveTicket(e);
    handleValuesTicket(e);
  }
  
  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // const calculateGrandTotal = () => specifications.reduce((sum, spec) => sum + spec.total, 0);
 
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
        <p><strong>Ticket ID: </strong> {ticketData.raiseTicketId}</p>
        <p><strong>Subject: </strong> {ticketData.subject}</p>
        <p><strong>Category: </strong> {ticketData.category}</p>
      </div>

      <div className="radio m-1">
        <label className="m-1">
          <input 
          className='form-check-input m-1'
          type='radio'
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
          className='form-check-input m-1'
          type='radio'
          name="RequestType"
          value="Without Material"
          checked={requestType === "Without Material"}
          onChange={(e) => setRequestType(e.target.value)}
          required
          />
          Without Material
          </label>

        {/* Material Input Fields */}
        {requestType === "With Material" && (
        <>
        <div className="form-group">
          <p><strong>Required Material Quotation</strong></p>
          {specifications.map((spec, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={spec.material}
                placeholder="Material"
                onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
                
              />
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
                value={spec.quantity}
               onChange={(e) => handleMaterialChange(index,"quantity", e.target.value)}
                
              />
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={spec.price}
                onChange={(e) => handleMaterialChange(index,"price", e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Total"
                value={spec.total}
                readOnly
              />
            </div>
          ))}
    </div>

  <table className="table table-bordered">
  <thead>
    <tr>
    <td>Trader ID</td>

    <td>Discount</td>
    {/* <td>Fixed Discount</td> */}
    <td>Delivery Charges</td>
    {/* <td>Fixed Delivery Charges</td> */}
    <td>Service Charges</td>
    {/* <td>Fixed Service Charges</td> */}
    <td>GST</td>
    {/* <td>Fixed GST</td> */}
    <td>Grand Total</td>
    <td>Lowest Bidder</td>
    </tr>
    </thead>
    <tbody>
        {traderDetails.map((trader, index) => (
        <tr key={index}>
            <td>Customer Care</td>
            {/* <td>{trader.quotedAmount}</td> */}
            <td>{trader.discount}</td>
            {/* <td>{trader.fixedDiscount}</td> */}
            <td>{trader.othercharges}</td>
            {/* <td>{trader.fixedDeliveryCharges}</td> */}
            <td>{trader.serviceCharges}</td>
            {/* <td>{trader.fixedServiceCharges}</td> */}
            <td>{trader.gst}</td>
            <td>{trader.totalQuotedAmount}</td>
            {/* <td>{trader.fixedGST}</td> */}
            <td>{trader.traderId === lowestBidder ? 'Yes' : 'No'}</td>
        </tr>
        ))}
    </tbody>
    <tbody>
    <tr>
    <td colSpan="3">
            <input
            type="text"
            className='form-control text-end'
            value= "Customer Care"
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
    </tbody>
    </table>
    </>
    )}
  </div>
   
<div>
  <p><strong>Technician Quotation</strong></p>
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
  </thead>

  <tbody>
    {technicianDetails.map((technician, index) => (
      <tr key={index}>
        <td>{technician.technicianId}</td>
        <td>{technician.quotedAmount}</td>
        <td>{technician.discount}</td>
        {/* <td>{technician.fixedDiscount}</td> */}
        <td>{technician.othercharges}</td>
        {/* <td>{technician.fixedOtherCharge}</td> */}
        <td>{technician.serviceCharges}</td>
        {/* <td>{technician.fixedServiceCharge}</td> */}
        <td>{technician.gst}</td>
        {/* <td>{technician.fixedGST}</td> */}
        <td>{technician.totalQuotedAmount}</td>
        <td>{technician.technicianId === lowestBidder ? 'Yes' : 'No'}</td>
      </tr>
    ))}  
  </tbody>
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

        <p><strong>ABSTRACT</strong></p>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Lowest Bidder ID</th>
            <th><span>Lowest Amount Including<br /> Charges and Taxes</span>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Required Material Quotation Bid Amount</td>
            <td></td>
            <td></td>
            <td>
              <input type="radio" name="materialApproval" className="form-check-input" value="approved" checked /> Approved
            </td>
          </tr>
          <tr>
            <td>Technical Agency Quotation Bid Amount</td>
            <td>{technicianId}</td>
            <td>{totalQuotedAmount}</td>
            <td>
              <input type="radio" name="agencyApproval" className="form-check-input" value="approved" checked/> Approved
            </td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="blinking-row">
            <td className='fs-5'>Approved Acceptance Total Amount</td>
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
            value={addrRmarks}
            placeholder="Enter Remarks"
            onChange={(e) => handleAddRemarks(e.target.value)}
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
          <Button onClick={handleBothActions} className="btn btn-warning text-white mx-2" title='submit'>
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
