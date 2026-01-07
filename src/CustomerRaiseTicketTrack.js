import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const CustomerTicketTrack = () => {
  const Navigate = useNavigate();
  const {userType} = useParams();
  const {userId} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [error, setError] = useState("");
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
  const [rating, setRating] = useState("");
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
  const [ticketId, setTicketId] = useState('');
  const [selectedSlot] = useState('');
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  // const [selectedStatus, setSelectedStatus] = useState('');
  const [technicianAcceptance, setTechnicianAcceptance] = useState([{type: "", technicianRemarks: ""}]); 
  const [technicianStatus, setTechnicianStatus] = useState('');
  const [deliveryData, setDeliveryData] = useState('');
  const [dealerStatus, setDealerStatus] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [customerCode, setCustomerCode] = useState('');
 const [deliveryNoteId, setDeliveryNoteId]=useState('');
  const [dealerAcceptance, setDealerAcceptance] = useState([{type: "", dealerRemarks: ""}]); 
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(''); 
  const [uploadInvoice, setUploadInvoice] = useState([]);
  const [dealerAddress, setDealerAddress] = useState('');
  const [dealerData, setDealerData] = useState('');
  const [dealerName,setDealerName] = useState('');
  const [rateQuotedBy, setRateQuotedBy] = useState(''); 
  const [paymentMode, setPaymentMode] = useState(''); 
  const [technicianId, setTechnicianId] = useState([]);
  const [dealerId, setDealerId] = useState([]);
  const [isFinalized, setIsFinalized] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  // const [paymentDataTime, setPaymentDateTime]=useState('');
  // const [paymentId, setPaymentId] = useState('');
  // const [technicianAmount, setTechnicianAmount] = useState('');
  // const [dealerAmont, setDealerAmount] = useState('');
  const [transactionDetails, setTransactionDetails] = useState("");
  const [orderId, setOrderId] = useState('');
const [orderDate, setOrderDate] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [transactionType, setTransactionType] = useState('');
const [transactionStatus, setTransactionStatus] = useState('');
const [utrTransactionNumber, setUTRTransactionNumber] = useState('');
  
  // const [isDealerChecked, setIsDealerChecked] = useState(false);
  // const [isTechnicianChecked, setIsTechnicianChecked] = useState(false);

  useEffect(() => {
        console.log(technicianFullName, isWithMaterial,category, assignedTo,address,zipCode,district,state,status,customerId,requestType,commentsList,attachments, subject, ticketData,fullName,technicianStatus,dealerData, loading,id,technicianData, deliveryData, dealerStatus, technicianAddress, selectedSlot, paymentData);
      }, [technicianFullName,isWithMaterial,category, assignedTo,address,zipCode,district,state,status,customerId,requestType,commentsList,attachments, subject, ticketData, fullName,technicianStatus,dealerData, loading,id,technicianData, deliveryData, dealerStatus, technicianAddress, selectedSlot, paymentData]);
  

//   useEffect(() => {
//     const fetchticketData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch ticket data');
//         }
//         const data = await response.json();
//         setTicketData(data);
//         // alert(JSON.stringify(data));
//         setState(data.state);
//         setTicketId(data.raiseTicketId);
//         setDistrict(data.district);
//         setZipcode(data.zipCode);
//         setAddress(data.address);
//         setSubject(data.subject);
//         setDetails(data.details);
//         setId(data.id);
//         setCategory(data.category);
//         setCustomerId(data.customerId);
//         setIsWithMaterial(data.isMaterialType);
//         setAssignedTo(data.assignedTo);
//         setStatus(data.status);
//         setFullName(data.customerName);
//         setApprovedAmount(data.approvedAmount);
//         setOption1Day(data.option1Day || '');
//         setOption2Day(data.option2Day || '');
//         setOption1Time(data.option1Time || '');
//         setOption2Time(data.option2Time || '');
//         setLowestBidder(data.lowestBidderTechnicainId);
//         setLowestDealerBidder(data.lowestBidderDealerId)
//         setRequestType(data.requestType || 'Without Material');
//         setAttachments(data.attachments);
//         setSpecifications(data.materials || [{material: "", quantity: "", price: "", total: ""}]);
//         setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
//       } catch (error) {
//         console.error('Error fetching ticket data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchticketData();
//   }, [raiseTicketId]);

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
        setRateQuotedBy(data.rateQuotedBy);
        setFullName(data.customerName);
        setCustomerEmail(data.emailAddress);   
        setCustomerPhoneNumber(data.customerPhoneNumber);
        setApprovedAmount(data.approvedAmount);
        setLowestBidder(data.lowestBidderTechnicainId);
        setLowestDealerBidder(data.lowestBidderDealerId);
        setRequestType(data.requestType || 'Without Material');
        setAttachments(data.attachments);
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: "" }]);
        setOrderId(data.orderId);
        setOrderDate(data.orderDate);
        setPaidAmount(data.paidAmount);
        setTransactionStatus(data.transactionStatus);
        setTransactionType(data.transactionType);
        setUTRTransactionNumber(data.utrTransactionNumber);
        setOption1Day(data.option1Day || '');
        setOption2Day(data.option2Day || '');
        setOption1Time(data.option1Time || '');
        setOption2Time(data.option2Time || '');
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
        const data = await response.json();
        setDeliveryData(data);
        setId(data.id);
        setDeliveryNoteId(data.deliveryNoteId);
        // setOption1Day(data.option1Day || '');
        // setOption2Day(data.option2Day || '');
        // setOption1Time(data.option1Time || '');
        // setOption2Time(data.option2Time || '');
        const imageRequests =
        data.uploadInvoice?.map((photo) => fetch(
            `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
          )
          .then((res) => res.json())
            .then((data) => ({
            
              src: photo,
              imageData: data.imageData,
            }))
        ) || [];
        const images = await Promise.all(imageRequests);
        setUploadInvoice(images);
        setInvoiceNumber(data.invoiceNumber);
        setInvoiceDate(data.invoiceDate);
        setTechnicianStatus(data.technicianStatus);
        setTechnicianAcceptance(data.technicianAcceptance || [{ type: "", technicianRemarks: "" }]);
        setDealerAcceptance(data.dealerAcceptance || [{ type: "", dealerRemarks: "" }]);
        setDealerStatus(data.dealerStatus);
        // setIsDealerChecked(data.dealerStatus === "Material Delivered");
        // setIsTechnicianChecked(data.technicianStatus === "Job Completed");
        setSpecifications(data.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeliveryData();
}, [ticketId]);  


// const atLeastOneChecked = isTechnicianChecked || isDealerChecked;
  useEffect(() => {
    const fetchtechnicianData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Technician/GetTechnicianDetailsForInvoice?TechnicianId=${lowestBidder}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const invoiceData = await response.json();
        setTechnicianData(invoiceData);
        // alert(JSON.stringify(invoiceData));  
        setTechnicianName(invoiceData.technicianFullName);
        setAadharNumber(invoiceData.aadharNumber);
        setTechnicianAddress(invoiceData.address);
        } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      } 
    };
    fetchtechnicianData();
  }, [lowestBidder]);

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
        setDealerAddress(dealerData.address);
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
  const apiUrl = `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const quotedata = await response.json();
      setTechnicianDetails(quotedata);
      setTotalAmount(quotedata.totalAmount);
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
          // setSpecifications(lowest.materials);          
        } else {
          setTotalAmount('');
        }
      }, [technicianDetails,totalAmount]);


        useEffect(() => {
        const fetchPaymentData = async () => {
          try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/GetPaymentDetailsByRaiseTicketId?RaiseTicketId=${ticketId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const paymentData = await response.json();
            setPaymentData(paymentData); 
            setPaymentMode(paymentData.paymentMode);
            setCustomerCode(paymentData.technicianConfirmationCode);
            // setPaymentId(paymentData.id);
            // setApprovedAmount(paymentData.approvedAmount);
            // setTechnicianAmount(paymentData.technicianAmount);
            // setDealerAmount(paymentData.dealerAmont);
            // setPaymentDateTime(paymentData.paymentDataTime);
            setTransactionDetails(paymentData.utrTransactionNumber);
            } catch (error) {
            console.error('Error fetching payment data:', error);
          } finally {
            setLoading(false);
          } 
        };
        fetchPaymentData();
      }, [ticketId]);


      const handlePaymenTypeChange = (e) => {
        const selectedPayment = e.target.value;
        setPaymentType(selectedPayment);
        // setPaymentTransactionDetails("");
        setError("");
    };
    

      const handleDownloadAllAttachments = async () => {
        if (uploadInvoice.length === 0) {
          alert("No files to download");
          return;
        }
      
        const zip = new JSZip();
        const folder = zip.folder("Download Invoice"); // Optional folder name inside ZIP
      
        // Add files to ZIP
        for (const invoice of uploadInvoice) {
          try {
            const response = await fetch(`data:image/jpeg;base64,${invoice.imageData}`);
            const blob = await response.blob();
            folder.file(invoice.src.split("/").pop(), blob); // Add file to the ZIP folder
          } catch (error) {
            console.error("Error fetching Invoice:", error);
          }
        }
      
        // Generate ZIP and download
        try {
          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, "Download Invoice.zip");
        } catch (error) {
          console.error("Error generating ZIP:", error);
          alert("Failed to download Invoice. Please try again.");
        }
      };
              
    // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveTicket = async (e) => {
    e.preventDefault();
  
    const payload1 = {
      RaiseTicketId: ticketData.raiseTicketId,
      Date: new Date(),
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: assignedTo,
      id: raiseTicketId,
      status: status,
      internalStatus: "Closed",
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
        price: spec.price,
        Total: spec.total,
      })),
      comments: commentsList.map((Comment) => ({
        updatedDate: Comment.updatedDate,
        commentText: Comment.commentText,
      })),
      TechnicianList: technicianId,
      DealerList: dealerId,
      Rating: rating.toString(),
      RateQuotedBy: rateQuotedBy,
      CustomerPhoneNumber: customerPhoneNumber,
      CustomerEmail: customerEmail || "",
      utrTransactionNumber: paymentType === "Pay Online" ? "online" : paymentType === "Cash" ? "cash" : transactionDetails || "",
      OrderId: orderId,
      OrderDate: orderDate,
      PaidAmount: paidAmount,
      TransactionStatus: transactionStatus,
      TransactionType: transactionType,
      InvoiceId: "",
      InvoiceURL: "",
      PaymentMode: paymentMode,
      UTRTransactionNumber:paymentType === "Pay Online" ? "online" : paymentType === "Cash" ? "cash" : utrTransactionNumber || "",
    };
  
  const payload = {
    ...payload1, 
    status: paymentType === "Pay Online" ? "Draft" : "Closed",
  };

  try {
    let response
    if (paymentMode === "technician" && (paymentType === "Cash" || paymentType === "Pay Online")) {
        response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error('Failed to forward Customer Care.');
        }
        if (paymentType === "Pay Online") {
          window.alert(`We are Redirecting to the Payment Page! Your reference number is ${ticketData.raiseTicketId}. Technician will contact you shortly.`);
          window.location.href=`https://handymanserviceproviders.com/RaiseTicketPayments/${raiseTicketId}`;
        }  else {
          alert("Ticket Forwarded to Customer Care Successfully!");
          Navigate(`/profilePage/${userType}/${customerId}`);
        } 
      } else if (paymentMode === "online") {
          response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
  
      if (!response.ok) {
        throw new Error('Failed to forward Customer Care.');
      }
      window.alert("Ticket Forwarded to Customer Care Successfully!");
      Navigate(`/profilePage/${userType}/${customerId}`);
      return;
    } 
    else {
      alert("Ticket Forwarded to Customer Care Successfully!");
      Navigate(`/profilePage/${userType}/${customerId}`);
    }
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to forward Customer Care. Please try again later.');
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
    //  const selectedSpecifications = specifications.filter((spec) => spec.isSelected);
  
  const payload2 = {

    id: id,
    ticketId: ticketId,
    deliveryNoteId: deliveryNoteId,
    option1Day: selectedSlot === "option1" ? option1Day : "",
    option1Time: selectedSlot === "option1" ? option1Time : "",
    option2Day: selectedSlot === "option2" ? option2Day : "",
    option2Time: selectedSlot === "option2" ? option2Time : "",
    deliveryTime: new Date().toISOString(),
    UploadInvoice: uploadInvoice.map((file) => file.src),
    InvoiceNumber: invoiceNumber,
    InvoiceDate: invoiceDate,
    deliveryInvoiceId: "string",
    internalStatus: status,
    technicianStatus: "",
    dealerStatus: "",
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
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload2),
    });
    if (!response.ok) {
      throw new Error('Failed to create a ticket.');
    }
    alert('Delivery saved Successfully!');
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the delivery. Please try again later.');
  }
};

// const handlePaymentTicket = async (e) => {
//   e.preventDefault();

//   const payload3 = {
//     id: paymentId,
//     RaiseTicketId: ticketData.raiseTicketId,
//     paymentId: "string",
//     paymentMode: paymentMode,
//     approvedAmount: approvedAmount,
//     paidAmount: "string",
//     balancedAmount: "string",
//     paymentDataTime: paymentDataTime,
//     technicianAmount: technicianAmount,
//     dealerAmont: dealerAmont,
//     customerCareAmount: "string",
//     utrTransactionNumber: paymentType === "Pay Online" ? "online" : paymentType === "Cash" ? "cash" : transactionDetails || "",
//     technicianConfirmationCode: customerCode,
//   };

//   const payload4 = {
//     ...payload3, 
//     status: paymentType === "Pay Online" ? "Draft" : "Closed",
//   };

//   try {
//     let response
//     if (paymentMode === "technician" && (paymentType === "Cash" || paymentType === "Pay Online")) {
//         response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/${paymentId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload4),
//         });
    
//         if (!response.ok) {
//           throw new Error('Failed to forward Customer Care.');
//         }
//         if (paymentType === "Pay Online") {
//           window.alert(`We are Redirecting to the Payment Page! Your reference number is ${ticketData.raiseTicketId}. Technician will contact you shortly.`);
//           window.location.href=`https://handymanserviceproviders.com/RaiseTicketPayments/${id}`;
//         }  else {
//           alert("Ticket Forwarded to Customer Care Successfully!");
//           Navigate(`/profilePage/${userType}/${customerId}`);
//         } 
//       } else if (paymentMode === "online") {
//           response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/${paymentId}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload4),
//           });
  
//       if (!response.ok) {
//         throw new Error('Failed to forward Customer Care.');
//       }
//       window.alert("Ticket Forwarded to Customer Care Successfully!");
//       Navigate(`/profilePage/${userType}/${customerId}`);
//       return;
//     } 
//     else {
//       alert("Ticket Forwarded to Customer Care Successfully!");
//       Navigate(`/profilePage/${userType}/${customerId}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     window.alert('Failed to forward Customer Care. Please try again later.');
//   }
// };

const handleBothActions =  (e) => {
  e.preventDefault();
  handleSaveTicket(e);
  handleUpdateTicket(e);
  setIsFinalized(true);
};

// const handleStatusChange = (event) => {
//   const { value } = event.target;
//   setSelectedStatus((prev) =>
//     prev.includes(value) ? prev.filter((status) => status !== value) : [...prev, value]
//   );
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
<h2 className="title mb-4">RAISE A TICKET(Customer)</h2>
    <div className="booking-confirmation p-4">
      <p className='text-center fs-5'><strong className='name'>Track Ticket Status</strong></p>

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
            <td>{approvedAmount}</td>
          </tr>
          {/* <tr> 
          <td><strong>Customer Time Slots </strong></td>
            <td className='time-slot-booking'>
                <div className='timeslots-option d-flex flex-row'>
                <div className='slot m-2 p-2'>
                     <strong><input type='radio' className='form-check-input border-dark m-1'
                     name='timeslot' onClick={() => handleSlotSelection('option1')} />
                     Option 1</strong> 
                     <div><span style={{ fontWeight: "bold" }}>Date: </span>{option1Day}</div>
                     <div><span style={{ fontWeight: "bold" }}>Time: </span>{option1Time}</div>
                </div>
                <div className='slot m-2 p-2'>
                    <strong><input type='radio' className='form-check-input border-dark m-1'
                    name='timeslot' onClick={() => handleSlotSelection('option2')} />Option 2</strong>
                    <div><span style={{ fontWeight: "bold" }}>Date: </span>{option2Day}</div>
                    <div><span style={{ fontWeight: "bold" }}>Time: </span>{option2Time}</div>
                </div>
                </div>
            </td>
          </tr> */}


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
    
        <div className="form-group m-2">
          {requestType === "With Material" && (
          !isMobile ? (
          <div className='mt-3'>
            <label className='section-title'>Required Materials Details</label>
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
            <div className="d-flex gap-3" key={index}>
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
                value={spec.quantity}
                placeholder="Enter Quantity"
                readOnly
              />
              <input
                type="text"
                className="form-control text-end"
                value={spec.receivedQuantity}
                placeholder="Received Quantity"
                readOnly
              />
              <input
                type="text"
                className="form-control text-end"
                value={spec.remainingQuantity}
                placeholder="Remaining Quantity"
                readOnly
              />
            </div>
          ))}
          </div>
          ) : (
            <div>
              <label className='section-title'>Required Materials Details</label>
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
  ))}
</div>

       {requestType === "With Material" && (
        <div className='payment'>
            <label className='section-title'>Material Collection Point</label>
            <table className='customer-details-table'>
                <tbody>
                    <tr>
                        <td><strong>Trader Firm Name</strong></td>
                        <td>{dealerName}</td>
                    </tr>
                    <tr>
                        <td><strong>Trader Address</strong></td>
                        <td>{dealerAddress}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
        )}
        <h3 className="section-title">Invoice Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Invoice Number</strong></td>
            <td><input type='text' name='invoiceNumber' 
            className="form-control text-end" value={invoiceNumber}/></td>
            </tr>
            <tr>
            <td><strong>Invoice Date</strong></td>
            <td ><input type='date' name="invoiceDate"
            className="form-control text-end w-75"
            value={invoiceDate}/></td>
            </tr>
        </tbody>
      </table>
      <button className='btn btn-warning fs-5 m-2' onClick={handleDownloadAllAttachments}>Download Invoice</button>

        <div className='payment'>
            <label className='section-title'>Technician Details</label>
            <div className='text-center'>
            <h3 className="section-title">Technician Confirmation Code</h3>
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
        </div> 

        <label className='section-title text-dark bg-warning fw-bold w-100 p-1'>Payment Mode</label>
        <div className='d-flex flex-column m-1'>
        <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2 border-dark"
            checked={paymentMode === 'online'}
            readOnly
             />
            Pay Through Online
          </label>
          <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2 border-dark"
            checked={paymentMode === 'technician'}
            readOnly
            />
            Pay On In Presence of Technician
          </label>
          </div>

{paymentMode === "technician" && (
                  <>
              <div className='radio'>
                 <label className='m-1'>
                  <input className='form-check-input m-1 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Cash"
                  checked={paymentType === "Cash"}
                  onChange = {handlePaymenTypeChange}
                  required
                  /> 
                  Cash
                </label>

                <label className='m-1'>
                  <input className='form-check-input m-1 border-dark'
                  type='radio'
                  name="paymentType"
                  value="Pay Online"
                  checked={paymentType === "Pay Online"}
                  onChange = {handlePaymenTypeChange}
                  required
                  />
                  Pay Online
                </label>
              </div>
              {error && (
                  <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
                )}
                </>
                )} 
        
      {/* <h3 className="section-title">Customer Details</h3>
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
      </table> */}
 
      <div className='payment'>
        
          {/* <h3 className='section-title mt-2'>Ticket Closing Status</h3>
          <div className='d-flex flex-column m-1'>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value="Material Delivered"
          checked={selectedStatus.includes('Material Delivered')}
          onChange={handleStatusChange}          
          />
          Material Delivered
          </label>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value='Technician Work Completed'
          checked={selectedStatus.includes('Technician Work Completed')}
          onChange={handleStatusChange}         
           />
          Technician Work Completed
          </label>
          {/* <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value='Pending Technician Issues'
          checked={selectedStatus === 'Pending Technician Issues'}
          onChange={handleStatusChange} 
          />
          Pending Ticket Araised Technician Issues
          </label>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value='Pending Customer Issues'
          checked={selectedStatus === 'Pending Customer Issues'}
          onChange={handleStatusChange}
          />
          Pending Ticket Araised Customer Issues
          </label> 
        </div> */}
        <div>
      <label className="section-title fs-5 m-0">Rating</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
           <div className='d-flex justify-content-between gap-5'>
           <button className='btn btn-warning me-2 fs-5' title='save' 
          onClick={handleBothActions} disabled={isFinalized}>Proceed</button> 
           <button className='btn btn-warning me-2 fs-5' title='back' 
           onClick={() => Navigate(`/trackStatusNotifications/${userType}/${userId}`)} >Back</button>
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

export default CustomerTicketTrack;