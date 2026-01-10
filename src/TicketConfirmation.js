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

const BookingConfirmation = () => {
  const Navigate = useNavigate();
   const {userType} = useParams();
   const {userId} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [specifications] = useState([{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "", isSelected: false}]);
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]); 
  const [technicianAcceptance] = useState([{type: "", technicianRemarks: ""}]); 
  const [dealerAcceptance] = useState([{type: "", dealerRemarks: ""}]); 
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
  const [ticketId, setTicketId] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [enterQuoteAmount, setQuote] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState("");
  const [othercharges, setOtherCharge] = useState("");
  const [selectedStatus] = useState('');
  const [transactionDetails, setTransactionDetails] = useState("");
  const [dealerAddress, setDealerAddress] = useState('');
  const [dealerData, setDealerData] = useState('');
   const [deliveryData, setDeliveryData] = useState('');
  const [dealerStatus] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [paymentMode, SetPaymentMode] = useState('');
  const [customerCode, setCustomerCode] = useState('');
 const [paymentDataTime, setPaymentDateTime]=useState('');
  //  const [deliveryNoteId, setDeliveryNoteId]=useState('');
  const [deliveryNoteId, setDeliveryId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [technicianAmount, setTechnicianAmount] = useState('');
  const [dealerAmont, setDealerAmount] = useState('');
  const [internalStatus, setInternalStatus] = useState('');
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isTimeSlotSaved, setIsTimeSlotSaved] = useState(false);
  // const [deliveryAssigned, setDeliveryAssigned] = useState('');
  // const [deliveryInternalStatus, setDeliveryInternalStatus] = useState('');
  const [technicianId, setTechnicianId] = useState([]);
  const [dealerId, setDealerId] = useState([]);
  const [isMaterialCollected, setIsMaterialCollected] = useState(false);
const [isMaterialSaved, setIsMaterialSaved] = useState(false);
const [isSaved, setIsSaved] = useState(false);
const [rateQuotedBy, setRateQuotedBy] = useState(''); 
const [noteId, setNoteId] = useState('');
const [technicianMaterial, setTechnicianMaterial] = useState([{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "", isSelected: false}]);
const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
const [customerEmail, setCustomerEmail] = useState('');
const [utrTransactionNumber, setUTRTransactionNumber] = useState('');
const [orderId, setOrderId] = useState('');
const [orderDate, setOrderDate] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [transactionType, setTransactionType] = useState('');
const [transactionStatus, setTransactionStatus] = useState('');


  useEffect(() => {
  console.log(ticketData, deliveryData, isTimeSlotSaved, internalStatus,loading,id,technicianData, selectedSlot, dealerStatus, paymentData, dealerData);
    }, [ticketData, deliveryData, isTimeSlotSaved,internalStatus, loading,id,technicianData, selectedSlot,dealerStatus, paymentData, dealerData]);

  // useEffect(() => {
  //   const fetchticketData = async () => {
  //     try {
  //       const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch ticket data');
  //       }
  //       const data = await response.json();
  //       setTicketData(data);
  //       // alert(JSON.stringify(data));
  //       setState(data.state);
  //       setTicketId(data.raiseTicketId);
  //       setDistrict(data.district);
  //       setZipcode(data.zipCode);
  //       setAddress(data.address);
  //       setSubject(data.subject);
  //       setDetails(data.details);
  //       setId(data.id);
  //       setCategory(data.category);
  //       setCustomerId(data.customerId);
  //       setIsWithMaterial(data.isMaterialType);
  //       setAssignedTo(data.assignedTo);
  //       setStatus(data.status);
  //       setFullName(data.customerName);
  //       setApprovedAmount(data.approvedAmount);
  //       setOption1Day(data.option1Day || '');
  //       setOption2Day(data.option2Day || '');
  //       setOption1Time(data.option1Time || '');
  //       setOption2Time(data.option2Time || '');
  //       setLowestBidder(data.lowestBidderTechnicainId);
  //       setLowestDealerBidder(data.lowestBidderDealerId)
  //       setRequestType(data.requestType || 'Without Material');
  //       setAttachments(data.attachments);
  //       // setSpecifications(data.materials || [{material: "", quantity: "", price: "", total: ""}]);
  //       setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
  //     } catch (error) {
  //       console.error('Error fetching ticket data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchticketData();
  // }, [raiseTicketId]);

  useEffect(() => {
    if (!ticketId) return;  
    const fetchDeliveryData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/GetRaiseTicketForDealer?RaiseTicketId=${ticketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch delivery data');
        }
        const data = await response.json();
        //  alert(JSON.stringify(data));
        setDeliveryData(data);
        setNoteId(data.id);
        // setOption1Day(data.option1Day || '');
        // setOption2Day(data.option2Day || '');
        // setOption1Time(data.option1Time || '');
        // setOption2Time(data.option2Time || '');
        setDeliveryId(data.deliveryNoteId);
        
        // setTechnicianStatus(data.technicianStatus);
        // setTechnicianAcceptance(data.technicianAcceptance || [{ type: "", technicianRemarks: "" }]);
        // setDealerStatus(data.dealerStatus);
        setTechnicianMaterial(data.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryData();
}, [ticketId]);   

  
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
          setTicketId(data.raiseTicketId);  
          setDistrict(data.district);
          setZipcode(data.zipCode);
          setAddress(data.address);
          setSubject(data.subject);
          setDetails(data.details);
          setId(data.id);
          setRateQuotedBy(data.rateQuotedBy);
          setTechnicianId(data.technicianList || []);
          setDealerId(data.dealerList || []);
          setInternalStatus(data.internalStatus);
          setCategory(data.category);
          setCustomerId(data.customerId);
          setIsWithMaterial(data.isMaterialType);
          setAssignedTo(data.assignedTo);
          setStatus(data.status);
          setFullName(data.customerName);
          setCustomerEmail(data.customerEmail);    
          setCustomerPhoneNumber(data.customerPhoneNumber);
          setApprovedAmount(data.approvedAmount);
          setOption1Day(data.option1Day);
          setOption2Day(data.option2Day);
          setOption1Time(data.option1Time);
          setOption2Time(data.option2Time);
          setLowestBidder(data.lowestBidderTechnicainId);
          setLowestDealerBidder(data.lowestBidderDealerId);
          setRequestType(data.requestType || 'Without Material');
          setAttachments(data.attachments);
          setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: "" }]);
          setUTRTransactionNumber(data.utrTransactionNumber);
          setOrderId(data.orderId);
          setOrderDate(data.orderDate);
          setPaidAmount(data.paidAmount);
          setTransactionStatus(data.transactionStatus);
          setTransactionType(data.transactionType);
        } catch (error) {
          console.error('Error fetching ticket data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchticketData();
  }, [raiseTicketId]);   
  
 
  
  // useEffect(() => { 
  //   if (!ticketId) return; // Ensure ticketId is available before fetching
  
  //   const fetchDeliveryData = async () => {
  //     setLoading(true); // Set loading to true before fetching
  //     try {
  //       const response = await fetch(
  //         `https://handymanapiv2.azurewebsites.net/api/DeliveryNote/GetRaiseTicketForDealer?RaiseTicketId=${ticketId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch delivery data");
  //       }
  //       const deliveryData = await response.json();
  //       setDeliveryData(deliveryData);
  //        alert(JSON.stringify(deliveryData));
  //       setDeliveryId(deliveryData.id); 
  //       // alert(deliveryId);
  //       setDeliveryNoteId(deliveryData.deliveryNoteId);
  //       // alert(deliveryNoteId);
  //       // // setOption1Day(deliveryData.option1Day || '');
  //       // setOption2Day(deliveryData.option2Day || '');
  //       // setOption1Time(deliveryData.option1Time || '');
  //       // setOption2Time(deliveryData.option2Time || '');
  //       // setDeliveryAssigned(deliveryData.assignedTo);
  //       // setDeliveryInternalStatus(deliveryData.internalStatus);
  //       setSpecifications(deliveryData.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
  //     } catch (error) {
  //       console.error("Error fetching delivery data:", error);
  //     } finally {
  //       setLoading(false); 
  //     }
  //   };
  //   fetchDeliveryData();
  // }, [ticketId]); 
  


  useEffect(() => {
    const fetchtechnicianData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Technician/GetTechnicianDetailsForInvoice?TechnicianId=${lowestBidder}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const invoiceData = await response.json();
        setTechnicianData(invoiceData);
        setTechnicianName(invoiceData.technicianFullName);
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
        // setAadharNumber(invoiceData.aadharNumber);
        // setTechnicianAddress(invoiceData.address);
        // setTechnicianPhotoId(invoiceData.technicianPhotoId);
        } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      } 
    };
    fetchdealerData();
  }, [lowestDealerBidder]);

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
            // alert(JSON.stringify(technicianDetails));
            // setRaiseAQuoteId(quotedata.raiseAQuoteId);
            setQuote(quotedata.enterQuoteAmount);
            // setFixedQuote(quotedata.fixedQuote);
            // setDiscount(quotedata.discount);
            setFixedDiscount(quotedata.fixedDiscount);
            // setId(quotedata.id);
            // setGST(quotedata.gst);
            // setFixedGSTs(quotedata.fixedGST);
            // setTotalAmount(quotedata.totalAmount);
            setOtherCharge(quotedata.othercharges);
            // setServiceCharge(quotedata.serviceCharges);
            // setFixedServiceCharge(quotedata.fixedServiceCharge);
            // setFixedOtherCharge(quotedata.fixedOtherCharge);
            // setTechnicianMaterial(quotedata.materials || [{material: "", quantity: ""}]);         
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
                setQuote(lowest.enterQuoteAmount);
                setFixedDiscount(lowest.fixedDiscount);
                setOtherCharge(lowest.othercharges);
                setTechnicianMaterial(lowest.materials);          
              } else {
                setQuote('');
                setOtherCharge('')
              }
            }, [technicianDetails,enterQuoteAmount,fixedDiscount, othercharges]);
            
            useEffect(() => {
              const fetchPaymentData = async () => {
                try {
                  const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/GetPaymentDetailsByRaiseTicketId?RaiseTicketId=${ticketId}`);
                  if (!response.ok) {
                    throw new Error('Failed to fetch ticket data');
                  }
                  const paymentData = await response.json();
                  setPaymentData(paymentData);
                  // alert(JSON.stringify(paymentData));  
                  SetPaymentMode(paymentData.paymentMode);
                  setCustomerCode(paymentData.technicianConfirmationCode);
                  setPaymentId(paymentData.id);
                  setApprovedAmount(paymentData.approvedAmount);
                  setTechnicianAmount(paymentData.technicianAmount);
                  setDealerAmount(paymentData.dealerAmont);
                  setPaymentDateTime(paymentData.paymentDataTime);
                  setTransactionDetails(paymentData.utrTransactionNumber);
                  } catch (error) {
                  console.error('Error fetching payment data:', error);
                } finally {
                  setLoading(false);
                } 
              };
              fetchPaymentData();
            }, [ticketId]);
          


    // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setIsTimeSlotSaved(false);
}; 

const handleSlotSave = () => {
  if (selectedSlot) {
    setIsTimeSlotSaved(true);
  }
};

// const handleTypeChange = (newType) => {
//   setTechnicianAcceptance([
//     { ...technicianAcceptance[0], type: newType },
//   ]);
// };

// const handleRemarksChange = (newRemarks) => {
//   setTechnicianAcceptance([
//     { ...technicianAcceptance[0], technicianRemarks: newRemarks },
//   ]);
// };

  // const handleSaveTicket = async (e) => {
  //   e.preventDefault();
  
  //   const payload = {
  //     RaiseTicketId: ticketData.raiseTicketId,
  //     Date: new Date(),
  //     Address: address,
  //     Subject: subject,
  //     Details: details,
  //     Category: category,
  //     AssignedTo: "Dealer/Trader",
  //     id: raiseTicketId, 
  //     status: status,
  //     internalStatus: "Technician Approved",
  //     CustomerId: customerId,
  //     State: state,
  //     LowestBidderTechnicainId: lowestBidder,
  //     LowestBidderDealerId: lowestDealerBidder,
  //     ApprovedAmount: approvedAmount,
  //     customerName: fullName,
  //     Option1Day: option1Day,
  //     Option1Time: option1Time,
  //     Option2Day: option2Day,
  //     Option2Time: option2Time,
  //     IsMaterialType: isWithMaterial,
  //     District: district,
  //     ZipCode: zipCode,
  //     RequestType: requestType,
  //     Attachments: attachments,
  //     Materials: specifications.map((spec) => ({
  //       material: spec.material,
  //       Quantity: spec.quantity,
  //     })),
  //     comments: commentsList.map((Comment) => ({
  //       updatedDate: Comment.updatedDate,
  //       commentText: Comment.commentText,
  //     })),
  //   TechnicianList: technicianId,
  //   };
  
  //   try {
  //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to save ticket data');
  //     }
  //     alert('Ticket saved Successfully!');
  //     // Navigate(``)
  //   } catch (error) {
  //     console.error('Error saving ticket data:', error);
  //     window.alert('Failed to save the ticket data. Please try again later.');
  //   }
  // };

  const handleRaiseTicket = async (e) => {
    e.preventDefault();
  
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      Date: new Date(),
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: "Customer Care",
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
      Rating: "",
      RateQuotedBy: rateQuotedBy,
      CustomerPhoneNumber: customerPhoneNumber,
    CustomerEmail: customerEmail,
    utrTransactionNumber: transactionDetails || "",
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
      // Navigate(``)
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.');
    }
  };

  // const handleMaterialUpdateRaiseTicket = async (e) => {
  //   e.preventDefault();
  
  //   const payload4 = {
  //     RaiseTicketId: ticketData.raiseTicketId,
  //     Date: new Date(),
  //     Address: address,
  //     Subject: subject,
  //     Details: details,
  //     Category: category,
  //     AssignedTo: "Dealer/Trader",
  //     id: raiseTicketId, 
  //     status: status,
  //     internalStatus: "Customer Approved",
  //     CustomerId: customerId,
  //     State: state,
  //     LowestBidderTechnicainId: lowestBidder,
  //     LowestBidderDealerId: lowestDealerBidder,
  //     ApprovedAmount: approvedAmount,
  //     customerName: fullName,
  //     Option1Day: option1Day,
  //     Option1Time: option1Time,
  //     Option2Day: option2Day,
  //     Option2Time: option2Time,
  //     IsMaterialType: isWithMaterial,
  //     District: district,
  //     ZipCode: zipCode,
  //     RequestType: requestType,
  //     Attachments: attachments,
  //     Materials: specifications.map((spec) => ({
  //       material: spec.material,
  //       Quantity: spec.quantity,
  //     })),
  //     comments: commentsList.map((Comment) => ({
  //       updatedDate: Comment.updatedDate,
  //       commentText: Comment.commentText,
  //     })),
  //     TechnicianList: technicianId,
  //     DealerList: dealerId,
  //   };
  
  //   try {
  //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload4),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to save ticket data');
  //     }
  //     alert('Ticket saved Successfully!');
  //     // Navigate(``)
  //   } catch (error) {
  //     console.error('Error saving ticket data:', error);
  //     window.alert('Failed to save the ticket data. Please try again later.');
  //   }
  // };


  const handleBothMaterialActions = (e) => {
    e.preventDefault();
    // handleMaterialUpdateRaiseTicket(e);
    handleMaterialUpdate(e);
    handleMaterialSave(e);
    setIsMaterialSaved(true);
  };

  const DeliveryDataTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).replace(",", "");
  
  const handleTimeSlotSave = async (e) => {
    e.preventDefault();

    // const selectedSpecifications = technicianMaterial.filter((spec) => spec.isSelected);
  
  const payload1 = {

    id: "string",
    ticketId: ticketId,
    deliveryNoteId: "string",
    option1Day: selectedSlot === "option1" ? option1Day : "",
    option1Time: selectedSlot === "option1" ? option1Time : "",
    option2Day: selectedSlot === "option2" ? option2Day : "",
    option2Time: selectedSlot === "option2" ? option2Time : "",
    deliveryTime: DeliveryDataTime,
    UploadInvoice: [],
    InvoiceNumber: "",
    InvoiceDate: "",
    deliveryInvoiceId: "string",
    internalStatus: "string",
    technicianStatus: selectedStatus,
    dealerStatus: "string",
    technicianAcceptance: technicianAcceptance.map((remarks) => ({
      type: remarks.type,
      technicianRemarks: remarks.technicianRemarks,
    })),
    dealerAcceptance: dealerAcceptance.map((remarks) => ({
      type: remarks.type,
      dealerRemarks: remarks.dealerRemarks,
    })),
    assignedTo: assignedTo,
    materialCollection: technicianMaterial.map((collection) => ({
      material: collection.material,
      quantity: collection.quantity,
      receivedQuantity: "",
      remainingQuantity: "",
    })),
  };

  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/CreateDeliveryNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload1),
    });
    if (!response.ok) {
      throw new Error('Failed to create a Technician TimeSlot.');
    }
    // const postData = await response.json();
    //     console.log("POST Response:", postData);
    //     // const deliveryId = postData.deliveryNoteId;
    //     setDeliveryId(postData.deliveryNoteId);
    //    alert(postData.deliveryNoteId);
    alert('Technician TimeSlot saved Successfully!');
    // alert(lowestBidder);
    //alert(userType);
    // Redirect to CustomerProfilePage
    window.location.href = `/profilePage/${userType}/${userId}`;
    
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the Technician TimeSlot. Please try again later.');
  }
};




const handleMaterialUpdate = async (e) => {
  e.preventDefault();

  // if (!selectedSlot) {
  //   alert("Please select a time slot.");
  //   return;
  // }

  // if (!selectedStatus) {
  //   alert("Please select a ticket status.");
  //   return;
  // }

  const selectedSpecifications = technicianMaterial.filter((spec) => spec.isSelected);

// if (selectedSpecifications.length === 0) {
//   alert("Please select at least one or more than one material.");
//   return;
// }

const payload2 = {

  id: noteId,
  ticketId: ticketId,
  deliveryNoteId: deliveryNoteId,
  option1Day:  option1Day,
  option1Time: option1Time,
  option2Day: option2Day,
  option2Time: option2Time,
  deliveryTime: DeliveryDataTime,
  UploadInvoice: [],
  InvoiceNumber: "",
  InvoiceDate: "",
  deliveryInvoiceId: "string",
  internalStatus: "string",
  technicianStatus: selectedStatus,
  dealerStatus: "string",
  technicianAcceptance: [],
  dealerAcceptance: [],
  assignedTo: assignedTo,
  materialCollection: selectedSpecifications.map((collection) => ({
    material: collection.material,
    quantity: collection.quantity,
    receivedQuantity: collection.receivedQuantity,
    remainingQuantity: collection.remainingQuantity,
  })),
}; 
// alert(payload2);
try {
  const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${noteId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload2),
  });
  if (!response.ok) {
    throw new Error('Failed to create a Material.');
  }
  alert('Material saved Successfully!');
window.location.href = `/profilePage/${userType}/${userId}`;
} catch (error) {
  console.error('Error:', error);
  window.alert('Failed to create the Material. Please try again later.');
}
};




// const handleDeliveryNoteUpdate = async (e) => {
//   e.preventDefault();

//   if (!selectedStatus) {
//     alert("Please select a ticket status.");
//     return;
//   }
//   // const selectedSpecifications = specifications.filter((spec) => spec.isSelected);

// const payload3 = {

//   id: id,
//   ticketId: ticketId,
//   deliveryNoteId: deliveryNoteId,
//   option1Day: selectedSlot === "option1" ? option1Day : "",
//   option1Time: selectedSlot === "option1" ? option1Time : "",
//   option2Day: selectedSlot === "option2" ? option2Day : "",
//   option2Time: selectedSlot === "option2" ? option2Time : "",
//   deliveryTime: DeliveryDataTime,
//   UploadInvoice: [],
//   deliveryInvoiceId: "string",

//   internalStatus: status,
//   technicianStatus: selectedStatus, 
//   dealerStatus: "string",
//   technicianAcceptance: technicianAcceptance.map((remarks) => ({
//     type: remarks.type,
//     technicianRemarks: remarks.technicianRemarks,
//   })),
//   dealerAcceptance: dealerAcceptance.map((remarks) => ({
//     type: remarks.type,
//     dealerRemarks: remarks.dealerRemarks,
//   })),
//   assignedTo: assignedTo,
//   materialCollection: specifications.map((collection) => ({
//     material: collection.material,
//     quantity: collection.quantity,
//     receivedQuantity: collection.receivedQuantity,
//     remainingQuantity: collection.remainingQuantity,
//   }))
// };

// try {
//   const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${deliveryId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload3),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create a Technician Note.');
//   }
//   alert('Technician Note saved Successfully!');
// } catch (error) {
//   console.error('Error:', error);
//   window.alert('Failed to create the Technician Note. Please try again later.');
// }
// };


const handlePaymentTicket = async (e) => {
  e.preventDefault();

  const payload4 = {
    id: paymentId,
    RaiseTicketId: ticketData.raiseTicketId,
    paymentId: "string",
    paymentMode: paymentMode,
    approvedAmount: approvedAmount,
    paidAmount: "string",
    balancedAmount: "string",
    paymentDataTime: paymentDataTime,
    technicianAmount: technicianAmount,
    dealerAmont: dealerAmont,
    customerCareAmount: "string",
    utrTransactionNumber: transactionDetails,
    technicianConfirmationCode: customerCode,
  };
  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/${paymentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload4),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment.');
    }
    alert('Payment Details Saved successfully!');
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the payment details saved. Please try again later.');
  }
};

const handleStatusAction = (e) => {
  e.preventDefault();
  handleSlotSave(e)
  // handleSaveTicket(e);
  handleTimeSlotSave(e);
  setIsSaved(true);
}

const handleBothActions =  (e) => {
  e.preventDefault();
  handleRaiseTicket(e);
  handlePaymentTicket(e);
  setIsSaved(true);
  window.location.href = `/profilePage/${userType}/${userId}`;
};

// const handleCheckboxChange = (mode) => {
//     SetPaymentMode(mode);
//   };

  // Handle material input change
  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...technicianMaterial];
    updatedMaterials[index][field] = value;
  
    if (field === "quantity" || field === "receivedQuantity") {
      const quantity = parseFloat(updatedMaterials[index].quantity) || 0;
      const receivedQuantity = parseFloat(updatedMaterials[index].receivedQuantity || 0);
      updatedMaterials[index].remainingQuantity = Math.max(0, quantity - receivedQuantity).toString();
     
      if (receivedQuantity > quantity) {
        alert("Received quantity cannot be greater than the total quantity");
        return;
      }
    }
    setTechnicianMaterial(updatedMaterials);
    };

  
    // const handleRadioChange = (index) => {
    //   const updatedSpecifications = [...specifications];
    //   updatedSpecifications[index].isSelected = !updatedSpecifications[index].isSelected;
    //   setSpecifications(updatedSpecifications);
    // };

    const handleRadioChange = (index) => {
      const updatedSpecifications = technicianMaterial.map((spec, i) => ({
        ...spec,
        isSelected: i === index ? !spec.isSelected : spec.isSelected, 
      }));
    
      setTechnicianMaterial(updatedSpecifications);
    };
  // const handleStatusChange = (event) => {
  //   setSelectedStatus(event.target.value);
  // };
  const handleMaterialCollectedChange = () => {
    setIsMaterialCollected((prev) => !prev);
  };

const handleMaterialSave = () => {
    if (isMaterialCollected) {
        setIsMaterialSaved(true);
    }
};

const total = Number(enterQuoteAmount- fixedDiscount) + Number(othercharges);

  return (
    <>
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

<div className={`container ${isMobile ? "w-100" : "w-75"}`}>
<h2 className="title">TICKET CONFIRMATION SHEET(Technician)</h2>
    <div className="booking-confirmation">
      <p className='text-center fs-5'><strong className='name'>{technicianFullName}</strong> Your Lowest Quotation Accepted By Customer</p>

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
            <td><strong>Quoted Amount</strong></td>
            <td>{enterQuoteAmount- fixedDiscount}</td>
          </tr>
          <tr>
            <td><strong>Delivery Charges</strong></td>
            <td>{othercharges}</td>
          </tr>
          <tr>
            <td><strong>Total Amount</strong></td>
            <td>{total}</td>
          </tr>
          <tr> 
            <td><strong>Customer Time Slots </strong></td>
            <td className='time-slot-booking'>
            {isMobile ? (
              <div className='timeslots-option d-flex flex-column'>
              {/* Option 1 */}
              <div className='slot mb-3 p-2 border rounded'>
              <strong><input type='radio' className='form-check-input m-1 border-dark' 
                     name='timeslot' value='option1'
                      onClick={() => handleSlotSelection('option1')}/>
                     Option 1</strong>
                <div><span style={{ fontWeight: "bold" }}>Date:</span> {option1Day || 'N/A'}</div>
                <div><span style={{ fontWeight: "bold" }}>Time:</span> {option1Time || 'N/A'}</div>
              </div>
      
              {/* Option 2 */}
              <div className='slot p-2 border rounded'>
              <strong><input type='radio' className='form-check-input m-1 border-dark' 
                    name='timeslot' value='option2' onClick={() => handleSlotSelection('option2')}/>Option 2</strong>
                <div><span style={{ fontWeight: "bold" }}>Date:</span> {option2Day || 'N/A'}</div>
                <div><span style={{ fontWeight: "bold" }}>Time:</span> {option2Time || 'N/A'}</div>
              </div>
            </div>
            ) : (
                <div className='timeslots-option d-flex flex-row'>
                <div className='slot m-2 p-2'>
                     <strong><input type='radio' className='form-check-input m-1 border-dark' 
                     name='timeslot' value='option1'
                      onClick={() => handleSlotSelection('option1')}/>
                     Option 1</strong> 
                     <div><span style={{ fontWeight: "bold" }}>Date: </span>{option1Day}</div>
                     <div><span style={{ fontWeight: "bold" }}>Time: </span>{option1Time}</div>
                </div>
                <div className='slot m-2 p-2'>
                    <strong><input type='radio' className='form-check-input m-1 border-dark' 
                    name='timeslot' value='option2' onClick={() => handleSlotSelection('option2')}/>Option 2</strong>
                    <div><span style={{ fontWeight: "bold" }}>Date: </span>{option2Day}</div>
                    <div><span style={{ fontWeight: "bold" }}>Time: </span>{option2Time}</div>
                </div>
                </div>
            )}
                <div className='text-center'>
                <button className='btn btn-warning fs-5' onClick={handleStatusAction} disabled={!selectedSlot || isSaved}
                //  disabled={internalStatus !== "Customer Approved" && assignedTo === "Technical Agency"}
                // disabled={deliveryInternalStatus === "Technician Approved L1"}
                >Save</button>
                </div>
            </td>
          </tr>
        </tbody>
      </table> 
    
     
  <div className="form-group m-2">
    {requestType === "With Material" && (
      <div>
    {!isMobile ? (
      <div className="mt-3">
         <label className="section-title">Required Materials Details</label>
        <div className='d-flex gap-3 text-start'>
          <div style={{ flex: 4, textAlign: 'center'}}>
            <label className="fw-bold">Material</label>
          </div>
          <div style={{ flex: 4, textAlign: 'center' }}>
            <label className="fw-bold">Quantity</label>
          </div>
          <div style={{ flex: 4 }}>
            <label className="fw-bold">Received Quantity</label>
          </div>
          <div style={{ flex: 4 }}>
            <label className="fw-bold">Remaining Quantity</label>
          </div>
        </div>
      {technicianMaterial.map((spec, index) => (
        <div className="d-flex gap-3 mb-2" key={index}>
          <input
            type="text"
            className="form-control"
            value={spec.material}
            // placeholder="Enter Material"
            // onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
          />
          <input
            type="text"
            className="form-control text-center"
            // placeholder="Enter Quantity"
            value={spec.quantity}
            // onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={spec.receivedQuantity}
            placeholder="Received Quantity"
            onChange={(e) => handleMaterialChange(index, "receivedQuantity", e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={spec.remainingQuantity}
             placeholder="Remaining Quantity"
            onChange={(e) => handleMaterialChange(index, "remainingQuantity", e.target.value)}
            readOnly
          />
          <input
            type="checkbox"
            className="form-check-input m-2 border-dark"
            checked={spec.isSelected}
            onChange={() => handleRadioChange(index)}
          />
        </div>
    ))}
    </div>    
    ) : (
    <div>
       <label className="section-title">Required Materials Details</label>
      {technicianMaterial.map((spec, index) => (
        <div key={index} className="card w-100 mb-3 shadow-sm" style={{ maxWidth: "300px" }}>
          <div className="card-body">
            <p className="mb-1"><strong>Material:</strong> {spec.material}</p>
            <p className="mb-1"><strong>Quantity:</strong> {spec.quantity}</p>
              <p className="d-flex align-items-center gap-2 mb-2">
              <label className="fw-bold">Received Quantity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Received Quantity"
                value={spec.receivedQuantity}
                onChange={(e) => handleMaterialChange(index, "receivedQuantity", e.target.value)}
              />
            </p>
            <p className="d-flex align-items-center gap-2 mb-2">
              <label className="fw-bold">Remaining Quantity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remaining Quantity"
                value={spec.remainingQuantity}
                onChange={(e) => handleMaterialChange(index, "remainingQuantity", e.target.value)}
                readOnly
              />
            <input
            type="checkbox"
            className="form-check-input m-3 border-dark"
            checked={spec.isSelected}
            onChange={() => handleRadioChange(index)}
          />
          </p>
          </div>
        </div>
      ))}
    </div>
  )}
      {/* Material Collection Point */}
        <div className='payment m-1'>
            <label className='section-title'>Material Collection Point</label>
            <table className="customer-details-table">
                <tbody>
                    <tr>
                        <td><strong>Trader or Customer Care Address</strong></td>
                        <td>{dealerAddress}</td>
                    </tr>
                </tbody>
            </table>
            <label className='fs-5'>
            <input
            type='checkbox'
            className='form-check-input m-2 border-dark'
            checked={isMaterialCollected}
            onChange={handleMaterialCollectedChange} />
            Material Collected to Trader/Customer Care
            </label>
            <button className='btn btn-warning m-1 fs-5' title='save' 
            onClick={handleBothMaterialActions} disabled={!isMaterialCollected || isMaterialSaved}
             >Save</button> 
        </div>
        </div>
        )}

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

      <h3 className="section-title">Customer Confirmation Code</h3>
      <strong className='p-1 m-2 fs-5'>{customerCode}</strong> 
      <h3 className="section-title">Customer Payment Particulars</h3>
      <div className='payment'>
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
          
          {/* <div className='d-flex align-items-center'>
          <h3 className='section-title m-2'>Payment Transaction Details</h3>
          <input
          type='text'
          className='form-control m-1'
          placeholder='Enter Payment Transaction Details'
          value={transactionDetails}
          onChange={(e) => setTransactionDetails(e.target.value)}
          />
          </div> */}
{/*           
          <h3 className='section-title'>Ticket Completion Status</h3>
          <div className='d-flex flex-column m-1'>
        <label className='fs-5'>
            <input  
            type="checkbox" 
            className="form-check-input border-secondary m-2 border-dark"
            value='Job Completed'
            checked={selectedStatus === 'Job Completed'}
            onChange={handleStatusChange}
            readOnly
             />
            Job Completed
            </label>
          
          </div> */}
          <div className='d-flex justify-content-between gap-5'> 
          <button className='btn btn-warning fs-5' title='save' onClick={handleBothActions}
          // disabled={!transactionDetails.trim()} 
          >Save</button>
          <button className='btn btn-warning fs-5' title='back' onClick={() => Navigate(`/ticketConfirmationGrid/${userType}/${userId}/${category}/${district}`)} 
          >Back</button>

          {/* <button className='btn btn-warning fs-5'title='forward' >Forward</button> */}
          </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default BookingConfirmation; 
