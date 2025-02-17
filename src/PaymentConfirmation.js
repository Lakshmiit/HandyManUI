import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import image from './img/technician.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams } from "react-router-dom";

const PaymentConfirmation = () => {
  // const Navigate = useNavigate();
  // const {userType} = useParams();
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
  const [option1Time, setOption1Time] = useState('');
  const [option2Time, setOption2Time] = useState('');

  const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
const [showConfirmation, setShowConfirmation] = useState(false);

  const [approvedAmount, setApprovedAmount] = useState('');
  const [fullName, setFullName] = useState('');
  // const [option1Time, setOption1Time] = useState('');
  // const [option2Time, setOption2Time] = useState('');
  // const [technicianData, setTechnicianData] = useState('');
  // const [technicianFullName, setTechnicianName] = useState('');
  // const [technicianAddress, setTechnicianAddress] = useState('');
  // const [aadharNumber, setAadharNumber] = useState('');
  // const [technicianPhotoId, setTechnicianPhotoId] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  //const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [technicianDetails, setTechnicianDetails] = useState([]);
  //const [technicianConfirmationCode] = useState('');
  const [materialQuotation, setMaterialQuotation] = useState([{discount: "", fixedDiscount: "", deliverycharges: "", fixedDeliveryChargs: "", servicecharges: "", fixedServicecharges: "", gst: "", fixedGST: "", grandtotal: ""}])
  const [dealerDetails, setDealerDetails] = useState([]);
  const [lowestGrandTotal, setLowestGrandTotal] = useState('');
  const [technicianId, setTechnicianId] = useState([]);
  const [dealerId, setDealerId] = useState([]);


  const paymentDataTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).replace(",", "");
  useEffect(() => {
      console.log(loading, id, materialQuotation);
    }, [loading, id, materialQuotation]);
  
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
        setTechnicianId(data.technicianList || []);
        setDealerId(data.dealerList || []);
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


  // useEffect(() => {
  //   const fetchtechnicianData = async () => {
  //     try {
  //       const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Technician/GetTechnicianDetailsForInvoice?TechnicianId=${lowestBidder}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch ticket data');
  //       }
  //       const invoiceData = await response.json();
  //       setTechnicianData(invoiceData);
  //       // alert(JSON.stringify(invoiceData));  
  //       setTechnicianName(invoiceData.technicianFullName);
  //       setAadharNumber(invoiceData.aadharNumber);
  //       setTechnicianAddress(invoiceData.address);
  //       setTechnicianPhotoId(invoiceData.technicianPhotoId);
  //       } catch (error) {
  //       console.error('Error fetching ticket data:', error);
  //     } finally {
  //       setLoading(false);
  //     } 
  //   };
  //   fetchtechnicianData();
  // }, [lowestBidder]);

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
              // setRaiseAQuoteId(quotedata.raiseAQuoteId);
              // setQuote(quotedata.enterQuoteAmount);
              // setFixedQuote(quotedata.fixedQuote);
              // setDiscount(quotedata.discount);
              // setFixedDiscount(quotedata.fixedDiscount);
              // setId(quotedata.id);
              // setGST(quotedata.gst);
              // setFixedGSTs(quotedata.fixedGST);
              setTotalAmount(quotedata.totalAmount);
              // setOtherCharge(quotedata.othercharges);
              // setServiceCharge(quotedata.serviceCharges);
              // setFixedServiceCharge(quotedata.fixedServiceCharge);
              // setFixedOtherCharge(quotedata.fixedOtherCharge);
              // setSpecifications(quotedata.materials || [{material: "", quantity: "", price: "", total: ""}]);         
              // setAddRemarks(quotedata.addrRmarks);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData(); 
        }, [raiseTicketId]); 
  
        useEffect(() => {
                if (technicianDetails.length > 0) {
                  const lowest = technicianDetails.reduce((prev, current) => {
                    const prevAmount = parseFloat(prev.totalAmount);
                    const currentAmount = parseFloat(current.totalAmount);
                    return currentAmount < prevAmount ? current : prev;
                  });
                  setTotalAmount(lowest.totalAmount);
                  // setOtherCharge(lowest.othercharges);
                  // setSpecifications(lowest.materials);          
                } else {
                  // setQuote('');
                  // setOtherCharge('')
                }
              }, [technicianDetails,totalAmount]);
              
      useEffect(() => {
              const fetchDealerData = async () => {
                try {
                  const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuoteByDealer/GetRaiseAQuoteLowestDealerByid?raiseAQuotetDealerId=${raiseTicketId}`);
                  if (!response.ok) {
                    throw new Error('Failed to fetch ticket data');
                  }
                  const dataDealer = await  response.json();
                  setDealerDetails(dataDealer);
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
                setLowestGrandTotal(lowest.materialQuotation[0].grandtotal);
              } else {
                setLowestGrandTotal('');
              }
            }, [dealerDetails]); 

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
      Date: new Date().toISOString(),
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: assignedTo,
      id: raiseTicketId,
      status: status,
      internalStatus: "Customer Approved",
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
      TechnicianList: technicianId,
      DealerList: dealerId,
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
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.');
    }
  };
  

//   const handlePaymentTicket =  async(e) => {
//     e.preventDefault();

//     const payload1 = {
//       id: "string",
//       RaiseTicketId: ticketData.raiseTicketId,
//       paymentId: "string",
//       paymentMode: selectedPayment,
//       approvedAmount: approvedAmount,
//       paidAmount: "string",
//       balancedAmount: "string",
//       paymentDataTime: new Date(),
//       technicianAmount: Number(totalAmount).toFixed(2),
//       dealerAmont: lowestGrandTotal,
//       customerCareAmount: "string",
//       utrTransactionNumber: "string",
//       technicianConfirmationCode: "",
//     };
// // console.log(new Date());
//     try {
//       const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/CreatePayment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload1),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to create payment.');
//       }
//       const data = await response.json();
//       // const technicianConfirmationCode = data.technicianConfirmationCode;
  
//         payload1.technicianConfirmationCode = data.technicianConfirmationCode;
      
//       alert('Payment Done successfully!');
//     } catch (error) {
//       console.error('Error:', error);
//       window.alert('Failed to create the payment. Please try again later.');
//     }
//   };


const handlePaymentTicket = async (e) => {
  e.preventDefault();

  const payload1 = {
    id: "string",
    RaiseTicketId: ticketData.raiseTicketId,
    paymentId: "string",
    paymentMode: selectedPayment,
    approvedAmount: approvedAmount,
    paidAmount: "string",
    balancedAmount: "string",
    paymentDataTime: paymentDataTime,
    technicianAmount: Number(totalAmount).toFixed(2),
    dealerAmont: lowestGrandTotal,
    customerCareAmount: "string",
    utrTransactionNumber: "string",
    technicianConfirmationCode: "",
  };

  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/CreatePayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload1),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment.');
    }

    const data = await response.json();

    // Store confirmation code in state
    setTechnicianConfirmationCode(data.technicianConfirmationCode);
    setShowConfirmation(true); // Show the confirmation UI
    
    alert('Payment Done successfully!');
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the payment. Please try again later.');
  }
};

  const handleCheckboxChange = (value) => {
    setSelectedPayment(selectedPayment === value ? null : value);
  };

  const handleBothActions =  (e) => {
    e.preventDefault();
    handleSaveTicket(e);
    handlePaymentTicket(e);
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
<h2 className="title">PAYMENT CONFIRMATION</h2>
    <div className="booking-confirmation w-100">
      <p className='text-center fs-4'><strong className='name'>{fullName}</strong> Thank you for Choosing the HandyMan Services</p>

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
        </tbody>
      </table>
      
      <div className='payment m-2'>
        <label className='bg-warning fw-bold w-100 p-2'>Payment Mode</label>
        <div className='d-flex flex-column m-4'>
        {isMobile ? (
        <div className='mobile-view d-flex flex-column gap-3 p-2'>
        <label >
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-3"
            checked={selectedPayment === 'online'}
            onChange={() => handleCheckboxChange('online')}/>
            Pay Through Online
          </label>
          <label >
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-3"
            checked={selectedPayment === 'technician'}
            onChange={() => handleCheckboxChange('technician')}/>
            Pay On In Presence of Technician
          </label>
          </div>
        ) : (
          <div className="desktop-view d-flex flex-column">
      <label className="me-4">
        <input 
          type="checkbox" 
          className="form-check-input border-secondary me-2"
          checked={selectedPayment === 'online'}
          onChange={() => handleCheckboxChange('online')}
        />
        Pay Through Online
      </label>
      <label>
        <input 
          type="checkbox" 
          className="form-check-input border-secondary me-2"
          checked={selectedPayment === 'technician'}
          onChange={() => handleCheckboxChange('technician')}
        />
        Pay On In Presence of Technician
      </label>
    </div>
  )}
</div>
</div>

      <div className="note m-2">
           <label>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2 fs-4"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}/>
            Terms and conditions (T&C) are a legally binding document that outlines the rules and expectations for using a product or service.
          </label> 
          {/* <div className="button">
            <button className="btn-back m-2">Back</button>
            <button className="btn-continue m-2" onClick={handleBothActions}>Save</button>
          </div>
          {showConfirmation && (
          <div className='text-center m-2'>
            <label className='blinking-text fw-bold fs-2 text-success'>Technician Arrived as per your time slot</label>
            <label className=' fs-2 bg-warning fw-bold w-100 p-2'>Technician Confirmation Code</label>
            <label className='fw-bold w-100 p-2'>{technicianConfirmationCode}</label>
          </div> */}

<div className="button">
    <button className="btn-back m-2">Back</button>
    <button className="btn-continue m-2" onClick={handleBothActions}>Save</button>
</div>

{/* Show this block only if confirmation code is received */}
{showConfirmation && (
    <div className='text-center m-2'>
        <label className='blinking-text fw-bold fs-2 text-success'>
            Technician Arrived as per your time slot
        </label>
        <label className='fs-2 bg-warning fw-bold w-100 p-2'>
            Technician Confirmation Code is: {technicianConfirmationCode}
        </label>
    </div> 
)} 
    </div>
    </div>
    </div>
    </div>
  );
};

export default PaymentConfirmation;