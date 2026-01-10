import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';

import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import image from './img/technician.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, useNavigate } from "react-router-dom";
 
const TraderConfirmation = () => {
  const Navigate = useNavigate();
  const {userType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  // const [id, setId] = useState(''); 
  const [updateRaiseTicketId, setUpdateRaiseTicketId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: ""}]);
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
  const [approvedAmount, setApprovedAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [option1Time, setOption1Time] = useState('');
  const [option2Time, setOption2Time] = useState('');
  const [technicianData, setTechnicianData] = useState('');
  const [technicianFullName, setTechnicianName] = useState('');
  const [technicianAddress, setTechnicianAddress] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [technicianPhotoId, setTechnicianPhotoId] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [selectedSlot] = useState('');
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [enterQuoteAmount, setQuote] = useState('');
  const [technicianAcceptance, setTechnicianAcceptance] = useState([{type: "", technicianRemarks: ""}]); 
  const [dealerAcceptance] = useState([{type: "", dealerRemarks: ""}]); 
  const [selectedStatus] = useState('');
  const [deliveryData, setDeliveryData] = useState('');
   const [dealerStatus, setDealerStatus] = useState('');
   const [technicianStatus, setTechnicianStatus] = useState('');
  const [dealerInvoice, setDealerInvoice] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [customerCode, setCustomerCode] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [deliveryNoteId, setDeliveryNoteId]=useState('');
  const [invoiceNumber, SetInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');  
  const [dealer, setDealerData] = useState('');
  const [dealerName,setDealerName] = useState('');
  const [technicianId, setTechnicianId] = useState([]);
  const [userId, setDealerId] = useState([]);
  const [deliveryId, setDeliveryId] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [dealerDetails, setDealerDetails] = useState('');
  const [materialTotal, setMaterialTotal] = useState('');
  const [materialQuotation, setMaterialQuotation] = useState([]);
  const [rateQuotedBy, setRateQuotedBy] = useState(''); 
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
const [customerEmail, setCustomerEmail] = useState('');
const [orderId, setOrderId] = useState('');
const [orderDate, setOrderDate] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [transactionType, setTransactionType] = useState('');
const [transactionStatus, setTransactionStatus] = useState('');
const [paymentMode, setPaymentMode] = useState('');
const [utrTransactionNumber, setUTRTransactionNumber] = useState('');

  // const [paymentType, setPaymentType] = useState("");

 useEffect(() => {
      console.log(loading, dealerDetails, dealer, technicianStatus,technicianData, technicianFullName,deliveryData, dealerStatus,paymentData,showAlert, technicianAddress, technicianPhotoId, selectedSlot);
    }, [loading, dealerDetails, dealer,technicianData,technicianStatus, technicianFullName, deliveryData,dealerStatus,paymentData,showAlert, technicianAddress, technicianPhotoId, selectedSlot]);

    useEffect(() => {
      const fetchdealerData = async () => {
        try {
          const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Dealer/GetDealerDetailsForInvoice?DealerId=${lowestDealerBidder}`);
          if (!response.ok) {
            throw new Error('Failed to fetch ticket data');
          }
          const dealerData = await response.json();
          setDealerData(dealerData);
          // alert(JSON.stringify(dealerData));  
          setDealerName(dealerData.dealerFirmName);
          } catch (error) {
          console.error('Error fetching ticket data:', error);
        } finally {
          setLoading(false);
        } 
      };
      fetchdealerData();
    }, [lowestDealerBidder]);
  
  
  useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const raiseTicketData = await response.json();
        setTicketData(raiseTicketData);
        setState(raiseTicketData.state);
        setTicketId(raiseTicketData.raiseTicketId); 
        setDistrict(raiseTicketData.district);
        setZipcode(raiseTicketData.zipCode);
        setAddress(raiseTicketData.address);
        setSubject(raiseTicketData.subject);
        setDetails(raiseTicketData.details);
        setRateQuotedBy(raiseTicketData.rateQuotedBy);
        setUpdateRaiseTicketId(raiseTicketData.id);
        setTechnicianId(raiseTicketData.technicianList || []);
        setDealerId(raiseTicketData.dealerList || []);
        setCategory(raiseTicketData.category);
        setCustomerId(raiseTicketData.customerId);
        setCustomerEmail(raiseTicketData.customerEmail);   
        setCustomerPhoneNumber(raiseTicketData.customerPhoneNumber);
        setIsWithMaterial(raiseTicketData.isMaterialType);
        setAssignedTo(raiseTicketData.assignedTo);
        setStatus(raiseTicketData.status);
        setFullName(raiseTicketData.customerName);
        setApprovedAmount(raiseTicketData.approvedAmount); 
        setLowestBidder(raiseTicketData.lowestBidderTechnicainId);
        setLowestDealerBidder(raiseTicketData.lowestBidderDealerId);
        setRequestType(raiseTicketData.requestType || 'Without Material');
        setAttachments(raiseTicketData.attachments);
        setCommentsList(raiseTicketData.comments || [{ updatedDate: new Date(), commentText: "" }]);
        setOrderId(raiseTicketData.orderId);
        setOrderDate(raiseTicketData.orderDate);
        setPaidAmount(raiseTicketData.paidAmount);
        setTransactionStatus(raiseTicketData.transactionStatus);
        setTransactionType(raiseTicketData.transactionType);
        setPaymentMode(raiseTicketData.paymentMode);
        setUTRTransactionNumber(raiseTicketData.utrTransactionNumber);
        setOption1Day(raiseTicketData.option1Day);
        setOption2Day(raiseTicketData.option2Day);
        setOption1Time(raiseTicketData.option1Time);
        setOption2Time(raiseTicketData.option2Time);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchticketData();
}, [raiseTicketId]);  

useEffect(() => {
    if (!ticketId) return;  

    const fetchDeliveryData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/GetRaiseTicketForDealer?RaiseTicketId=${ticketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch delivery data');
        }
        const deliveryNoteData = await response.json();
      //  alert(JSON.stringify(data));
        setDeliveryData(deliveryNoteData);
        setDeliveryId(deliveryNoteData.id);
        // alert(deliveryId);
        setDeliveryNoteId(deliveryNoteData.deliveryNoteId);
        // setOption1Day(deliveryNoteData.option1Day);
        // setOption2Day(deliveryNoteData.option2Day);
        // setOption1Time(deliveryNoteData.option1Time);
        
        // setOption2Time(deliveryNoteData.option2Time);
        setTechnicianStatus(deliveryNoteData.technicianStatus);
        // alert(technicianStatus);
        setInvoiceDate(deliveryNoteData.invoiceDate);
        SetInvoiceNumber(deliveryNoteData.invoiceNumber);
        setTechnicianAcceptance(deliveryNoteData.technicianAcceptance || [{ type: "", technicianRemarks: "" }]);
        setDealerStatus(deliveryNoteData.dealerStatus);
        setSpecifications(deliveryNoteData.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryData();
}, [ticketId]);   


  useEffect(() => {
    const fetchtechnicianData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Technician/GetTechnicianDetailsForInvoice?TechnicianId=${lowestBidder}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        // alert(lowestBidder);
        const invoiceData = await response.json();
        setTechnicianData(invoiceData);
        setTechnicianName(invoiceData.technicianFullName);
        setAadharNumber(invoiceData.aadharNumber);
        setTechnicianAddress(invoiceData.address);
        // alert(technicianAddress);
        setTechnicianPhotoId(invoiceData.technicianPhotoId);
        } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      } 
    };
    fetchtechnicianData();
  }, [lowestBidder]);

        useEffect(() => {
          // API URL
          const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
          const fetchData = async () => {
            try {
              const response = await fetch(apiUrl);
              const quotedata = await response.json();
              setTechnicianDetails(quotedata);
              setQuote(quotedata.enterQuoteAmount);
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
                  setQuote(lowest.enterQuoteAmount);
                } else {
                  setQuote('');
                }
              }, [technicianDetails,enterQuoteAmount]);

              useEffect(() => {
                const fetchPaymentData = async () => {
                  try {
                    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/GetPaymentDetailsByRaiseTicketId?RaiseTicketId=${ticketId}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch ticket data');
                    }
                    const paymentData = await response.json();
                    setPaymentData(paymentData); 
                    // SetPaymentMode(paymentData.paymentMode);
                    setCustomerCode(paymentData.technicianConfirmationCode)
                    } catch (error) {
                    console.error('Error fetching payment data:', error);
                  } finally {
                    setLoading(false);
                  } 
                };
                fetchPaymentData();
              }, [ticketId]);

              useEffect(() => {
                const fetchDealerData = async () => {
                  try {
                    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuoteByDealer/GetRaiseAQuoteLowestDealerByid?raiseAQuotetDealerId=${raiseTicketId}`);
                    if (!response.ok) {
                      throw new Error('Failed to fetch ticket data');
                    }
                    const dataDealer = await  response.json();
                    
                    // alert(JSON.stringify(dataDealer));
                    // console.log(JSON.stringify(dataDealer));
                    setDealerDetails(dataDealer);
                    setMaterialTotal(dataDealer[0].totalAmount);
                    // alert(dataDealer[0].totalAmount);
                    setMaterialQuotation(dataDealer[0]?.materialQuotation || []);
                    //  setSpecifications(dataDealer[0].materials || []);
                  } catch (error) {
                    console.error('Error fetching dealer data:', error);
                  } finally {
                    setLoading(false);
                  }
                };
                fetchDealerData();
              }, [raiseTicketId]);
        
            
              
              // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + dealerInvoice.length > 1) {
      alert("You can upload up to 1 file.");
      return;
    }
    setDealerInvoice([...dealerInvoice, ...files]);
    setShowAlert(true);
  };

              const handleUploadFiles = async () => {
                setLoading(true);
                setShowAlert(false);
                
                const uploadedFilesList=[];
                for (let i = 0; i < dealerInvoice.length; i++) {
                  const file = dealerInvoice[i];
                  const fileName = file.name;
                  const mimetype = file.type;
                  const byteArray = await getFileByteArray(file);
                  const response = await uploadFile(byteArray, fileName, mimetype, file);
                  if (response) {
                    uploadedFilesList.push({
                      src: response,
                      alt: fileName
                    });
                  } else {
                    alert("Failed Upload Invoice");
                  }
                }
                setUploadedFiles(uploadedFilesList);
                setLoading(false);
              };
            
              // Convert the file to a byte array
              const getFileByteArray = (file) => {
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const byteArray = new Uint8Array(reader.result);
                    resolve(byteArray);
                  };
                  reader.readAsArrayBuffer(file);
                });
              };
            
              const uploadFile = async (byteArray, fileName, mimeType, file) => {
                try {
                  const formData = new FormData();
                  formData.append('file', new Blob([byteArray], { type: mimeType }), fileName);
                  formData.append('fileName', fileName);
            
                  const response = await fetch('https://handymanapiv2.azurewebsites.net/api/FileUpload/upload?filename=' + fileName, {
                    method: 'POST',
                    headers: {
                      'Accept': 'text/plain',
                    },
                    body: formData,
                  });
            
                  const responseData = await response.text();
                  return responseData || ''; 
                } catch (error) {
                  console.error('Error uploading file:', error);
                  return '';
                }
              };
            
              useEffect(() => {
                return () => {
                  uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
                };
              }, [uploadedFiles]);
    // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const handleTypeChange = (newType) => {
  //   setDealerAcceptance([
  //     { ...dealerAcceptance[0], type: newType },
  //   ]);
  // };
  
  // const handleRemarksChange = (newRemarks) => {
  //   setDealerAcceptance([
  //     { ...dealerAcceptance[0], dealerRemarks: newRemarks },
  //   ]);
  // };
  

  const handleSaveTicket = async (e) => {
    e.preventDefault();
  
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      Date: new Date(),
      ApprovedAmount: approvedAmount,
      customerName: fullName, 
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: "Technical Agency",
      id: updateRaiseTicketId,
      status: status,
      internalStatus: "Customer Approved",
      CustomerId: customerId,
      State: state,
      TechnicianList: technicianId,
      DealerList: userId,
      LowestBidderTechnicainId: lowestBidder,
      LowestBidderDealerId: lowestDealerBidder,
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
      Option1Day: option1Day,
      Option1Time: option1Time,
      Option2Day: option2Day,
      Option2Time: option2Time,
      Rating: "", 
      RateQuotedBy: rateQuotedBy,
      CustomerPhoneNumber: customerPhoneNumber,
    CustomerEmail: customerEmail,
    utrTransactionNumber: utrTransactionNumber || "",
    OrderId: orderId,
    OrderDate: orderDate,
    PaidAmount: paidAmount,
    TransactionStatus: transactionStatus,
    TransactionType: transactionType,
    InvoiceId: "",
    InvoiceURL: "",
    PaymentMode: paymentMode,
    UTRTransactionNumber: utrTransactionNumber || "",
    };
  
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${updateRaiseTicketId}`, {
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
      window.alert('Failed to save the ticket data. Please try again later.');
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();

    // if (!selectedSlot) {
    //   alert("Please select a time slot.");
    //   return;
    // }
  
    // if (!selectedStatus) {
    //   alert("Please select a ticket status.");
    //   return;
    // }
    // const selectedSpecifications = specifications.filter((spec) => spec.isSelected);
  
  const payload1 = {

    id: deliveryId,
    ticketId: ticketId,
    deliveryNoteId: deliveryNoteId,
    option1Day: option1Day,
    option1Time: option1Time,
    option2Day: option2Day,
    option2Time: option2Time,
    deliveryTime: new Date().toISOString(),
    UploadInvoice: uploadedFiles.map((file) => file.src),
    InvoiceNumber: invoiceNumber,
    InvoiceDate: invoiceDate,
    deliveryInvoiceId: "string",
    internalStatus: status,
    technicianStatus: deliveryData.technicianStatus,
    dealerStatus: selectedStatus,
    technicianAcceptance: technicianAcceptance.map((remarks) => ({
      type: remarks.type,
      technicianRemarks: remarks.technicianRemarks,
    })),
    dealerAcceptance: dealerAcceptance.map((remarks) => ({
      type: remarks.type,
      dealerRemarks: remarks.dealerRemarks,
    })),
    assignedTo: assignedTo,
    materialCollection: specifications.map((collection) => ({
      material: collection.material,
      quantity: collection.quantity,
      receivedQuantity: collection.receivedQuantity,
      remainingQuantity: collection.remainingQuantity,
    }))
  };

  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${deliveryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload1),
    });
    if (!response.ok) {
      throw new Error('Failed to create a ticket.');
    }
    alert('Delivery saved Successfully!');
    window.location.href = `/profilePage/${userType}/${userId}`;
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the delivery. Please try again later.');
  }
};

const handleUploadInvoice = async (e) => {
  e.preventDefault();

const payload2 = {

  id: deliveryId,
  ticketId: ticketId,
  deliveryNoteId: deliveryNoteId,
  option1Day: option1Day,
  option1Time: option1Time,
  option2Day: option2Day,
  option2Time: option2Time,
  deliveryTime: new Date().toISOString(),
  UploadInvoice: uploadedFiles.map((file) => file.src),
  InvoiceNumber: invoiceNumber,
  InvoiceDate: invoiceDate,
  deliveryInvoiceId: "string",
  internalStatus: status,
  technicianStatus: deliveryData.technicianStatus,
  dealerStatus: selectedStatus,
  technicianAcceptance: technicianAcceptance.map((remarks) => ({
    type: remarks.type,
    technicianRemarks: remarks.technicianRemarks,
  })),
  dealerAcceptance: dealerAcceptance.map((remarks) => ({
    type: remarks.type,
    dealerRemarks: remarks.dealerRemarks,
  })),
  assignedTo: assignedTo,
  materialCollection: specifications.map((collection) => ({
    material: collection.material,
    quantity: collection.quantity,
    receivedQuantity: collection.receivedQuantity,
    remainingQuantity: collection.remainingQuantity,
  }))
};

try {
  const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${deliveryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload2),
  });
  if (!response.ok) {
    throw new Error('Failed to create a Uploaded Invoice.');
  }
  alert('Uploaded Invoice saved Successfully!');
  setIsSaved(true);
} catch (error) {
  console.error('Error:', error);
  window.alert('Failed to create the Uploaded Invoice. Please try again later.');
}
};


const handleBothActions =  (e) => {
  e.preventDefault();
  handleSaveTicket(e);
  handleUpdateTicket(e);
  setIsSaved(true);
};

// const handleStatusChange = (event) => {
//   setSelectedStatus(event.target.value);
// };

  return (
    <div>
  {isMobile && <Header />}
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
<h2 className="title">TICKET CONFIRMATION SHEET(Trader)</h2>
    <div className="booking-confirmation">
      <p className='text-center fs-5'><strong className='name'>{dealerName}</strong> Your Lowest Quotation Accepted By Customer</p>

      <table className="booking-table w-100">
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
            <td><strong>Bid Amount</strong></td>
            <td>{(materialTotal - (materialQuotation?.[0]?.fixedDiscount || 0)).toFixed(2)}</td>
            </tr>
          

<tr> 
    <td><strong>Customer Time Slots </strong></td>
    <td className='time-slot-booking'>
    {isMobile ? (
      <div className='timeslots-option d-flex flex-column'>
        {/* Option 1 */}
        <div className='slot mb-3 p-2 border rounded'>
          <strong>
            <input 
              type='radio' 
              className='form-check-input m-1 border-dark' 
              name='timeslot' 
              value='option1' 
              checked={option1Day && option1Time ? true : false} 
              readOnly  
            />
            Option 1
          </strong>
          <div><span style={{ fontWeight: "bold" }}>Date:</span> {option1Day || 'N/A'}</div>
          <div><span style={{ fontWeight: "bold" }}>Time:</span> {option1Time || 'N/A'}</div>
        </div>

        {/* Option 2 */}
        <div className='slot p-2 border rounded'>
          <strong>
            <input 
              type='radio' 
              className='form-check-input m-1 border-dark' 
              name='timeslot' 
              value='option2' 
              checked={option2Day && option2Time ? true : false} 
              readOnly  
            />
            Option 2
          </strong>
          <div><span style={{ fontWeight: "bold" }}>Date:</span> {option2Day || 'N/A'}</div>
          <div><span style={{ fontWeight: "bold" }}>Time:</span> {option2Time || 'N/A'}</div>
        </div>
      </div>
    ) : (
        <div className='timeslots-option d-flex flex-row'>
            {/* Option 1 */}
            <div className='slot m-2 p-2'>
                <strong>
                    <input 
                        type='radio' 
                        className='form-check-input m-1 border-dark'
                        name='timeslot' 
                        value='option1' 
                        checked={option1Day && option1Time ? true : false}  
                        readOnly  
                    />
                    Option 1
                </strong> 
                <div><span style={{ fontWeight: "bold" }}>Date: </span>{option1Day || 'N/A'}</div>
                <div><span style={{ fontWeight: "bold" }}>Time: </span>{option1Time || 'N/A'}</div>
            </div>

            {/* Option 2 */}
            <div className='slot m-2 p-2'>
                <strong>
                    <input 
                        type='radio' 
                        className='form-check-input m-1 border-dark' 
                        name='timeslot' 
                        value='option2' 
                        checked={option2Day && option2Time ? true : false}  
                        readOnly  
                    />
                    Option 2
                </strong>
                <div><span style={{ fontWeight: "bold" }}>Date: </span>{option2Day || 'N/A'}</div>
                <div><span style={{ fontWeight: "bold" }}>Time: </span>{option2Time || 'N/A'}</div>
            </div>
        </div>
    )}
    </td>
</tr>
        </tbody>
      </table>
     
        {/* <div className="form-group m-2"> </div>*/}
          {/* <label className='fs-5'>Required Materials Details</label> */}
          {/* {specifications.map((spec, index) => (
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
                placeholder="Received Quantity"
                value={spec.receivedQuantity}
                onChange={(e) => handleMaterialChange(index, "receivedQuantity", e.target.value)}
                readOnly
              />
              <input
                type="text"
                className="form-control text-end"
                placeholder="Remaining Quantity"
                value={spec.remainingQuantity}
                onChange={(e) => handleMaterialChange(index, "remainingQuantity", e.target.value)}
                readOnly
              />
              <input
              type='radio'
              className='form-check-input m-2 border-dark'
              checked={selectedMaterialIndex === index}
              onChange={() => handleRadioChange(index)}
              required
              />
            </div> 
             ))}*/} 



<div className="form-group m-2">
  <label className='section-title'>Required Materials Details</label>
  {!isMobile ? (
  <div className='mt-3'>
  <div className='d-flex gap-3 text-center'>
    <div style={{ flex: 4}}>
      <label className="fw-bold">Material</label>
    </div>
    <div style={{ flex: 4}}>
      <label className="fw-bold">Quantity</label>
    </div>
    <div style={{ flex: 4 }}>
      <label className="fw-bold">Received Quantity</label>
    </div>
    <div style={{ flex: 4 }}>
      <label className="fw-bold">Remaining Quantity</label>
    </div>
  </div>
  {specifications.map((spec, index) => (
    <div className="d-flex gap-3 mb-2" key={index}>
      <input
        type="text"
        className="form-control"
        value={spec.material}
        placeholder="Enter Material"
        readOnly
      />
      <input
        type="text"
        className="form-control text-center"
        placeholder="Enter Quantity"
        value={spec.quantity}
        readOnly
      />
      <input
        type="text"
        className="form-control text-end"
        placeholder="Received Quantity"
        value={spec.receivedQuantity}
        readOnly
      />
      <input
        type="text"
        className="form-control text-end"
        placeholder="Remaining Quantity"
        value={spec.remainingQuantity}
        readOnly
      />
    </div>
  ))}
</div>
) : (
  <div>
      {specifications.map((spec, index) => (
        <div key={index} className="card mb-3 shadow-sm" style={{ maxWidth: "300px" }}>
          <div className="card-body">
            <p className="mb-1"><strong>Material:</strong> {spec.material}</p>
            <p className="mb-1"><strong>Quantity:</strong> {spec.quantity}</p>
            <p className="mb-1"><strong>Received Quantity:</strong> {spec.receivedQuantity}</p>
            <p className="mb-1"><strong>Remaining Quantity:</strong> {spec.remainingQuantity}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

<h3 className="section-title">Invoice Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Invoice Number</strong></td>
            <td><input type='text' name='invoiceNumber' 
            className="form-control text-end"
            placeholder='Enter Invoice Number'
            value={invoiceNumber}
            onChange={(e) => SetInvoiceNumber(e.target.value)}/></td>
            </tr>
            <tr>
            <td><strong>Invoice Date</strong></td>
            <td ><input type='date' name="invoiceDate"
            className="form-control text-end w-50"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}/></td>
            </tr>
        </tbody>
      </table>
        

        <div className="form-group">
          <label className="section-title fs-5 m-1">Upload Invoice</label>
          <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                required
              />
              {showAlert && (
                <div className="alert alert-danger  mt-2">
                  <strong>Note:</strong> Invoice will be uploaded only once; if uploaded, it cannot be changed.  
                  <br />
                  Please click the <strong>Upload Invoice</strong> button to upload the selected Invoice.
                </div>
              )}
              <div className="mt-1">
                {dealerInvoice.map((file, index) => (
                <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-1"
                onClick={handleUploadFiles}
                disabled={loading || dealerInvoice.length === 0}
              >
                {loading ? 'Uploading...' : 'Upload Invoice'}
              </button>

              <button className='btn btn-warning m-1' onClick={handleUploadInvoice}
              disabled={isSaved}
              >Save</button>
          </div>
          
        <div className='payment'>
            <label className='section-title'>Technician Details</label>
            <div className='text-center'>
            <h3 className="text-center section-title">Technician Confirmation Code</h3>
          <strong className='fs-5 m-2 p-1'>{customerCode}</strong>
          </div>
          <table className="customer-details-table">
                <tbody>
                    <tr>
                        <td><strong>Technician Address</strong></td>
                        <td>{technicianAddress}</td>
                    </tr>
                    <tr>
                        <td><strong>Aadhar Number</strong></td>
                        <td>{aadharNumber}</td>
                    </tr>
                </tbody>
            </table>
            {/* <label className='fs-5'>
            <input
            type='checkbox'
            className='form-check-input border-dark m-2' />
            Material Collected to Technician
            </label>
            <button className='btn btn-warning m-1 fs-5' title='save'>Save</button> */}
        </div>

      <h3 className="section-title">Customer Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Customer Name</strong></td>
            <td>{fullName}</td>
            </tr>
            <tr>
            <td><strong>Address</strong></td>
            <td>{address}</td>
            </tr>
        </tbody>
      </table>
      
      {/* <div className="radio">
          <h3 className='section-title m-1'>Dealer Acceptance</h3>
         <label className='fs-6'>
            <input 
            type='radio'
            className='form-check-input m-2 border-dark'
            name="Type"
            value="Reject" 
            checked={dealerAcceptance[0].type === "Reject" }
            onChange={(e) => handleTypeChange(e.target.value)}
            /> 
            Reject
            </label>
            <label className='fs-6'>
            <input 
            type='radio'
            className='form-check-input m-2 border-dark'
            name="Type"
            value="Accept"
            checked={dealerAcceptance[0].type === "Accept" }
            onChange={(e) => handleTypeChange(e.target.value)}
            /> 
            Accept
            </label>
            {dealerAcceptance[0].type === "Reject" && (
            <div className="form-group">
            <label className='fs-5'> Remarks
              <input
              type='text'
              className='form-control m-2' 
              value={dealerAcceptance[0].dealerRemarks}
              Placeholder='Enter Remarks'
              onChange={(e) => handleRemarksChange(e.target.value)}/>
            </label>
            </div>
            )}
            </div> */}
  
      <div className='payment m-0'>
          {/* <h3 className='section-title'>Ticket Closing Status</h3> */}
          {/* <div className='d-flex flex-column m-1'>
        <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2"
            value='Material Delivered'
            checked={selectedStatus === 'Material Delivered'}
            onChange={handleStatusChange}
            readOnly
             />
            Material Delivered
            </label> */}
          {/* <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2"
            value='Pending Technician Issues'
            checked={selectedStatus === 'Pending Technician Issues'}
            onChange={handleStatusChange}
            />
            Pending Ticket Araised Technician Issues
          </label>
          <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2"
            value='Pending Customer Issues'
            checked={selectedStatus === 'Pending Customer Issues'}
            onChange={handleStatusChange}
            />
            Pending Ticket Araised Customer Issues
          </label> */}
          {/* </div> */}
          {/* <div>
          <h4 className="mt-2 fs-5 section-title">Assigned To</h4>
        <select className="form-control w-50 mb-3 fs-5"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required>
          <option>Select Assigned</option>
          <option>Closed Ticket</option>
        </select>
          </div> */}
          <div className='d-flex justify-content-between gap-5'> 
          <button className='btn btn-warning fs-5 m-2' title='save' 
          onClick={handleBothActions} 
          // disabled={isSaved}
          >Save</button>
          <button className='btn btn-warning fs-5 m-2' title='save' 
          onClick={() => Navigate(`/traderConfirmationGrid/${userType}/${userId}/${category}/${district}`)} 
          // disabled={isSaved}
          >Back</button>
          {/* <button className='btn btn-warning fs-5'title='forward' >Forward</button> */}
          </div>
      </div>
    </div>
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

export default TraderConfirmation; 