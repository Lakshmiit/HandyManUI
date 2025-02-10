import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, } from "react-router-dom";

const BookingConfirmation = () => {
  // const Navigate = useNavigate();
  // const {userType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "", isSelected: false}]);
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
  const [othercharges, setOtherCharge] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [transactionDetails, setTransactionDetails] = useState("");
  const [dealerAddress, setDealerAddress] = useState('');
  const [dealerData, setDealerData] = useState('');
  const [deliveryData, setDeliveryData] = useState('');
  const [dealerStatus] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [paymentMode, SetPaymentMode] = useState('');
  const [customerCode, setCustomerCode] = useState('');
 const [paymentDataTime, setPaymentDateTime]=useState('');
  const [deliveryNoteId, setDeliveryNoteId]=useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [technicianAmount, setTechnicianAmount] = useState('');
  const [dealerAmont, setDealerAmount] = useState('');
  const [internalStatus, setInternalStatus] = useState('');
  const [deliveryAssigned, setDeliveryAssigned] = useState('');
  const [deliveryInternalStatus, setDeliveryInternalStatus] = useState('');
   
  useEffect(() => {
  console.log(ticketData,deliveryAssigned,deliveryNoteId,loading,id,technicianData, selectedSlot, deliveryData, dealerStatus, paymentData, dealerData);
    }, [ticketData, deliveryAssigned, deliveryNoteId, loading,id,technicianData, selectedSlot, deliveryData,dealerStatus, paymentData, dealerData]);

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
      const fetchticketData = async () => {
        try {
          const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch ticket data');
          }
          const data = await response.json();
          // alert(JSON.stringify(data));
          setTicketData(data);
          setState(data.state);
          setTicketId(data.raiseTicketId);  
          setDistrict(data.district);
          setZipcode(data.zipCode);
          setAddress(data.address);
          setSubject(data.subject);
          setDetails(data.details);
          setId(data.id);
          setInternalStatus(data.internalStatus);
          setCategory(data.category);
          setCustomerId(data.customerId);
          setIsWithMaterial(data.isMaterialType);
          setAssignedTo(data.assignedTo);
          setStatus(data.status);
          setFullName(data.customerName);
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
        } catch (error) {
          console.error('Error fetching ticket data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchticketData();
  }, [raiseTicketId]);   
  
  // useEffect(() => {
  //     if (!ticketId) return;  
  //     const fetchDeliveryData = async () => {
  //       try {
  //         const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/GetRaiseTicketForDealer?RaiseTicketId=${ticketId}`);
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch delivery data');
  //         }
  //         const data = await response.json();
  //         setDeliveryData(data);
  //         setId(data.id);
  //         setOption1Day(data.option1Day || '');
  //         setOption2Day(data.option2Day || '');
  //         setOption1Time(data.option1Time || '');
  //         setOption2Time(data.option2Time || '');
  //         setTechnicianStatus(data.technicianStatus);
  //         setTechnicianAcceptance(data.technicianAcceptance || [{ type: "", technicianRemarks: "" }]);
  //         setDealerStatus(data.dealerStatus);
  //         setSpecifications(data.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
  //       } catch (error) {
  //         console.error('Error fetching delivery data:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchDeliveryData();
  // }, [ticketId]);   
  
  
  useEffect(() => { 
    if (!ticketId) return; // Ensure ticketId is available before fetching
  
    const fetchDeliveryData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/DeliveryNote/GetRaiseTicketForDealer?RaiseTicketId=${ticketId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch delivery data");
        }
        const deliveryData = await response.json();
        setDeliveryData(deliveryData);
        // alert(JSON.stringify(deliveryData));
        setDeliveryId(deliveryData.id); 
        setDeliveryNoteId(deliveryData.deliveryNoteId);
        setOption1Day(deliveryData.option1Day || '');
        setOption2Day(deliveryData.option2Day || '');
        setOption1Time(deliveryData.option1Time || '');
        setOption2Time(deliveryData.option2Time || '');
        setDeliveryAssigned(deliveryData.assignedTo);
        setDeliveryInternalStatus(deliveryData.internalStatus);
        setSpecifications(deliveryData.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
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
            //alert(JSON.stringify(technicianDetails));
            // setRaiseAQuoteId(quotedata.raiseAQuoteId);
            setQuote(quotedata.enterQuoteAmount);
            // setFixedQuote(quotedata.fixedQuote);
            // setDiscount(quotedata.discount);
            // setFixedDiscount(quotedata.fixedDiscount);
            // setId(quotedata.id);
            // setGST(quotedata.gst);
            // setFixedGSTs(quotedata.fixedGST);
            // setTotalAmount(quotedata.totalAmount);
            setOtherCharge(quotedata.othercharges);
            // setServiceCharge(quotedata.serviceCharges);
            // setFixedServiceCharge(quotedata.fixedServiceCharge);
            // setFixedOtherCharge(quotedata.fixedOtherCharge);
            setSpecifications(quotedata.materials || [{material: "", quantity: ""}]);         
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
                setOtherCharge(lowest.othercharges);
                setSpecifications(lowest.materials);          
              } else {
                setQuote('');
                setOtherCharge('')
              }
            }, [technicianDetails,enterQuoteAmount, othercharges]);
            
            useEffect(() => {
              const fetchPaymentData = async () => {
                try {
                  const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Payment/GetPaymentDetailsByRaiseTicketId?RaiseTicketId=${ticketId}`);
                  if (!response.ok) {
                    throw new Error('Failed to fetch ticket data');
                  }
                  const paymentData = await response.json();
                  setPaymentData(paymentData);
                  // alert(JSON.stringify(invoiceData));  
                  SetPaymentMode(paymentData.paymentMode);
                  setCustomerCode(paymentData.technicianConfirmationCode);
                  setPaymentId(paymentData.id);
                  setApprovedAmount(paymentData.approvedAmount);
                  setTechnicianAmount(paymentData.technicianAmount);
                  setDealerAmount(paymentData.dealerAmont);
                  setPaymentDateTime(paymentData.paymentDataTime);
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

  const handleSaveTicket = async (e) => {
    e.preventDefault();
  
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      Date: new Date(),
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: "Dealer/Trader",
      id: raiseTicketId, 
      status: status,
      internalStatus: "Technician Approved",
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
      internalStatus: "Technician Approved",
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

  const handleMaterialUpdateRaiseTicket = async (e) => {
    e.preventDefault();
  
    const payload4 = {
      RaiseTicketId: ticketData.raiseTicketId,
      Date: new Date(),
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: "Dealer/Trader",
      id: raiseTicketId, 
      status: status,
      internalStatus: "Technician Approved",
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
    };
  
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload4),
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


  const handleBothMaterialActions = (e) => {
    e.preventDefault();
    handleMaterialUpdateRaiseTicket(e);
    handleMaterialUpdate(e);
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

    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
  
    // if (!selectedStatus) {
    //   alert("Please select a ticket status.");
    //   return;
    // }
    const selectedSpecifications = specifications.filter((spec) => spec.isSelected);
  
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
    technicianStatus: "",
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
    materialCollection: selectedSpecifications.map((collection) => ({
      material: collection.material,
      quantity: collection.quantity,
      receivedQuantity: collection.receivedQuantity,
      remainingQuantity: collection.remainingQuantity,
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
    alert('Technician TimeSlot saved Successfully!');
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the Technician TimeSlot. Please try again later.');
  }
};



const handleMaterialUpdate = async (e) => {
  e.preventDefault();

  if (!selectedSlot) {
    alert("Please select a time slot.");
    return;
  }

  // if (!selectedStatus) {
  //   alert("Please select a ticket status.");
  //   return;
  // }
  // const selectedSpecifications = specifications.filter((spec) => spec.isSelected);

  const selectedSpecifications = specifications.filter((spec) => spec.isSelected);

if (selectedSpecifications.length === 0) {
  alert("Please select at least one or more than one material.");
  return;
}

const payload2 = {

  id: deliveryId,
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
  const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${deliveryId}`, {
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
  handleSaveTicket(e);
  handleTimeSlotSave(e);
}

const handleBothActions =  (e) => {
  e.preventDefault();
  handleRaiseTicket(e);
  // handleDeliveryNoteUpdate(e)
  handleMaterialUpdate(e);

  //handleTimeSlotSave(e)
  handlePaymentTicket(e);
};

// const handleCheckboxChange = (mode) => {
//     SetPaymentMode(mode);
//   };

  // Handle material input change
  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...specifications];
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
    setSpecifications(updatedMaterials);
    };

  
    // const handleRadioChange = (index) => {
    //   const updatedSpecifications = [...specifications];
    //   updatedSpecifications[index].isSelected = !updatedSpecifications[index].isSelected;
    //   setSpecifications(updatedSpecifications);
    // };

    const handleRadioChange = (index) => {
      const updatedSpecifications = specifications.map((spec, i) => ({
        ...spec,
        isSelected: i === index ? !spec.isSelected : spec.isSelected, 
      }));
    
      setSpecifications(updatedSpecifications);
    };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // const handleAssignedChange = (e) => {
  //   const value = e.target.value;
  //   setAssignedTo(value);

  //   if (value === "Customer Care") {
  //     setStatus("Draft");
  //   } else if (value === "Closed Ticket") {
  //     setStatus("Reviewed");
  //   } else {
  //     setStatus(""); 
  //   }
  // };


const total = Number(enterQuoteAmount) + Number(othercharges);

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

<div className={`container ${isMobile ? "w-100" : "w-75"}`}>
<h2 className="title">TICKET CONFIRMATION SHEET(Technician)</h2>
    <div className="booking-confirmation">
      <p className='text-center fs-5'><strong className='name'>{technicianFullName}</strong> Your Lowest Quotation Accepted By Customer</p>

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
            <td><strong>Quoted Amount</strong></td>
            <td>{enterQuoteAmount}</td>
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
                <div className='text-center'>
                <button className='btn btn-warning fs-5' onClick={handleStatusAction} 
                // disabled={internalStatus !== "Customer Approved" && assignedTo === "Technical Agency"}
                disabled={deliveryInternalStatus === "Technician Approved L1"}
                >Save</button>
                </div>
            </td>
          </tr>
        </tbody>
      </table> 
    
        {/* <div className="form-group m-2">
          <label className='fs-5'>Required Materials Details</label>
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
                className="form-control"
                value={spec.receivedQuantity}
                placeholder="Recieved Quantity"
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
              type='radio'
              className='form-check-input m-2 border-dark'
              checked={spec.isSelected}
              onChange={() => handleRadioChange(index)}
              required
              />
            </div>
          ))}
        </div> */}

{loading ? (
  <p>Loading materials...</p>
) : (
  <div className="form-group m-2">
    <label className="section-title">Required Materials Details</label>
    {specifications.length > 0 ? (
      specifications.map((spec, index) => (
        <div className="d-flex gap-3 mb-2" key={index}>
          <input
            type="text"
            className="form-control"
            value={spec.material}
            placeholder="Enter Material"
            // onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
          />
          <input
            type="text"
            className="form-control text-center"
            placeholder="Enter Quantity"
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
      ))
    ) : (
      <p>No materials found</p>
    )}
  </div>
)}

      
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
            className='form-check-input m-2 border-dark' />
            Material Collected to Trader/Customer Care
            </label>
            <button className='btn btn-warning m-1 fs-5' title='save' onClick={handleBothMaterialActions}
            disabled={!(internalStatus === "Dealer Approved" && assignedTo === "Technical Agency") &&
              (internalStatus === "Technician Approved" && assignedTo === "Dealer/Trader")}
             >Save</button> 
        </div>
        {/* <div className="radio">
          <h3 className='section-title mb-0'>Technician Acceptance</h3>
         <label className='fs-6 m-1'>
            <input 
            type='radio'
            className='form-check-input m-1 border-dark'
            name="RequestType"
            value="Reject" 
            checked={technicianAcceptance[0].type === "Reject" }
            onChange={(e) => handleTypeChange(e.target.value)}
            /> 
            Reject
            </label>
            <label className='fs-6 m-1'>
            <input 
            type='radio'
            className='form-check-input m-1 border-dark'
            name="RequestType"
            value="Accept"
            checked={technicianAcceptance[0].type === "Accept" }
            onChange={(e) => handleTypeChange(e.target.value)}
            /> 
            Accept
            </label>
            {technicianAcceptance[0].type === "Reject" && (
            <div className="form-group">
            <label className='fs-5 m-2'> Remarks
              <input
              type='text'
              className='form-control m-2' 
              value={technicianAcceptance[0].technicianRemarks}
              Placeholder='Enter Remarks'
              onChange={(e) => handleRemarksChange(e.target.value)}/>
            </label>
            </div>
            )}
            </div> */}

            {/* <div className="form-group">
          <label className="section-title fs-5 m-1">Upload Invoice</label>
          <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                required
              /> */}
              {/* {showAlert && (
                <div className="alert alert-danger  mt-2">
                  Please click the <strong>Upload Files</strong> button to upload the selected images.
                </div>
              )} */}
              {/* <div className="mt-1">
                {technicianPhotos.map((file, index) => (
                <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-1"
                onClick={handleUploadFiles}
                disabled={loading || technicianPhotos.length === 0}
              >
                {loading ? 'Uploading...' : 'Upload Invoice'}
              </button>
              <button className='btn btn-warning m-1'>Save</button>
          </div> */}


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
          <div className='d-flex align-items-center'>
          <h3 className='section-title m-2'>Payment Transaction Details</h3>
          <input
          type='text'
          className='form-control m-1'
          placeholder='Enter Payment Transaction Details'
          value={transactionDetails}
          onChange={(e) => setTransactionDetails(e.target.value)}
          />
          </div>
          {/* <div className='d-flex flex-row align-items-center gap-5'>
            <div className='d-flex align-items-center'>
            <strong className='fs-5 m-1'>Date</strong>
                <input
                type='text'
                className='form-control m-1'
                Placeholder='DD/MM/YY'
            value={paymentDataTime}
                readOnly
                />
            
            {/* <strong className='fs-5 m-1'>Time</strong> 
                <input
                type='text'
                className='form-control m-1'
                placeholder='Enter Time'
                // value={}
                readOnly
                /> 
            </div>
          </div> */}
                  
          {/* <div className="form-group">
          <label className="section-title fs-5 m-1">Upload Invoice</label>
          <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                required
              />
              {/* {showAlert && (
                <div className="alert alert-danger  mt-2">
                  Please click the <strong>Upload Files</strong> button to upload the selected images.
                </div>
              )} 
              <div className="mt-1">
                {technicianPhotos.map((file, index) => (
                <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-1"
                onClick={handleUploadFiles}
                disabled={loading || technicianPhotos.length === 0}
              >
                {loading ? 'Browsing...' : 'Browse Files'}
              </button>
          </div> */}
          
          <h3 className='section-title'>Ticket Completion Status</h3>
          <div className='d-flex flex-column m-1'>
        <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2 border-dark"
            value='Job Completed'
            checked={selectedStatus === 'Job Completed'}
            onChange={handleStatusChange}
             />
            Job Completed
            </label>
          {/* <label  className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary  m-2 border-dark"
            value="Pending Technician Issues"
            checked={selectedStatus === 'Pending Technician Issues'}
            onChange={handleStatusChange}
            />
            Pending Ticket Araised Technician Issues
          </label>
          <label  className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary  m-2 border-dark"
            value='Pending Customer Issues'
            checked={selectedStatus === 'Pending Customer Issues'}
            onChange={handleStatusChange}
            />
            Pending Ticket Araised Customer Issues
          </label>
          <div>
          <label className="fs-5 section-title">Assigned To</label>
        <select className="form-control w-50 mb-3 fs-5"
        value={assignedTo}
        onChange={handleAssignedChange}
        required>
          <option>Select Assigned</option>
          <option>Closed Ticket</option>
          <option>Customer Care</option>
        </select>
          </div> */}
          </div>
          <div className='d-flex flex-row align-items-center gap-5'> 
          <button className='btn btn-warning fs-5' title='save' onClick={handleBothActions} 
          // disabled={internalStatus !== "Technician Approved L1"}
          >Save</button>
          {/* <button className='btn btn-warning fs-5'title='forward' >Forward</button> */}
          </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default BookingConfirmation; 
