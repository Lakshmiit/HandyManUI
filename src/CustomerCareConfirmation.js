import React, { useEffect, useState} from 'react';
import AdminSidebar from './AdminSidebar';
import Footer from './Footer.js';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import image from './img/technician.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, useNavigate} from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const CustomerCareConfirmation = () => {
 const Navigate = useNavigate();
  // const {userType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [dealerStatus, setDealerStatus] = useState('');
  const [technicianStatus, setTechnicianStatus] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "", isSelected: false}]);
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]); 
  const [requestType, setRequestType] = useState('');
  const [technicianAcceptance] = useState([{type: "", technicianRemarks: ""}]); 
  const [deliveryData, setDeliveryData] = useState('');
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
  const [ticketId, setTicketId] = useState('');
  // const [selectedSlot] = useState('');
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [enterQuoteAmount, setQuote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [customerCode, setCustomerCode] = useState('');
  const [deliveryNoteId, setDeliveryNoteId]=useState('');
 const [dealerAcceptance] = useState([{type: "", dealerRemarks: ""}]); 
 const [dealerInvoice, setDealerInvoice] = useState([]);
   const [showAlert, setShowAlert] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(''); 
  const [uploadInvoice, setUploadInvoice] = useState([]);
  const [deliveryId, setDeliveryId] = useState('');
  const [transactionDetails, setTransactionDetails] = useState("");
  const [paymentMode, SetPaymentMode] = useState('');
  const [dealerAddress, setDealerAddress] = useState('');
  const [dealerData, setDealerData] = useState('');
  const [dealerName,setDealerName] = useState('');
  const [technicianId, setTechnicianId] = useState([]);
  const [dealerId, setDealerId] = useState([]);
  const [rating, setRating] = useState('');
  const [isFinalized, setIsFinalized]= useState(false);
  const [rateQuotedBy, setRateQuotedBy] = useState(''); 
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [OrderId, setOrderId] = useState("");
    const [OrderDate, setOrderDate] = useState("");
    const [PaidAmount, setPaidAmount] = useState("");
    const [TransactionStatus, setTransactionStatus] = useState("");
    const [TransactionType, setTransactionType] = useState("");
    const [InvoiceId, setInvoiceId] = useState("");
    const [InvoiceURL, setInvoiceURL] = useState("");
  
  // const [isDealerChecked, setIsDealerChecked] = useState(false);
  // const [isTechnicianChecked, setIsTechnicianChecked] = useState(false);

  
  useEffect(() => {
        console.log(technicianFullName,InvoiceId,InvoiceURL, dealerData,deliveryId,id,technicianData, deliveryData, technicianAddress, paymentData,technicianStatus, dealerStatus);
      }, [technicianFullName, InvoiceId,InvoiceURL,dealerData, deliveryId,id,technicianData, deliveryData, technicianAddress, paymentData,technicianStatus, dealerStatus]);
  

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
        setCategory(data.category);
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setRating(data.rating);
        // alert(data.rating);
        setFullName(data.customerName);
        setCustomerEmail(data.customerEmail);    
        setCustomerPhoneNumber(data.customerPhoneNumber);
        setApprovedAmount(data.approvedAmount);
        setLowestBidder(data.lowestBidderTechnicainId);
        setLowestDealerBidder(data.lowestBidderDealerId);
        setRequestType(data.requestType || 'Without Material');
        setAttachments(data.attachments);
        setTransactionDetails(data.utrTransactionNumber);
        setOrderId(data.orderId);
        setOrderDate(data.orderDate);
        setPaidAmount(data.paidAmount);
        setTransactionStatus(data.transactionStatus);
        setTransactionType(data.transactionType);
        setInvoiceId(data.invoiceId);
        setInvoiceURL(data.invoiceURL);
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: "" }]);
        setOption1Day(data.option1Day);
        setOption2Day(data.option2Day);
        setOption1Time(data.option1Time);
        setOption2Time(data.option2Time);
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
        // alert(JSON.stringify(data));
        setDeliveryId(data.id);
        setDeliveryNoteId(data.deliveryNoteId);
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
        // setOption1Day(data.option1Day || '');
        // setOption2Day(data.option2Day || '');
        // setOption1Time(data.option1Time || '');
        // setOption2Time(data.option2Time || '');
        setTechnicianStatus(data.technicianStatus);
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
    setQuote(quotedata.enterQuoteAmount);
    // setSpecifications(quotedata.materials || [{material: "", quantity: "", price: "", total: ""}]);         
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
    // setSpecifications(lowest.materials);          
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
              SetPaymentMode(paymentData.paymentMode);
              // setPaymentDateTime(paymentData.paymentDataTime);
              setCustomerCode(paymentData.technicianConfirmationCode);
              // setTransactionDetails(paymentData.utrTransactionNumber)
              } catch (error) {
              console.error('Error fetching payment data:', error);
            } finally {
              setLoading(false);
            } 
          };
          fetchPaymentData();
        }, [ticketId]);

        useEffect(() => {
          const fetchdealerData = async () => {
            try {
              const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Dealer/GetDealerDetailsForInvoice?DealerId=${lowestDealerBidder}`);
              if (!response.ok) {
                throw new Error('Failed to fetch ticket data');
              }
              const dealerData = await response.json();
              setDealerData(dealerData);
            //  alert(JSON.stringify(dealerData));  
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
        setUploadInvoice(uploadedFilesList);
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
          uploadInvoice.forEach((file) => URL.revokeObjectURL(file));
        };
      }, [uploadInvoice]);


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
            console.error("Error fetching attachment:", error);
          }
        }
      
        // Generate ZIP and download
        try {
          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, "Download Invoice.zip");
        } catch (error) {
          console.error("Error generating ZIP:", error);
          alert("Failed to download attachments. Please try again.");
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
  
    const payload = {
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
    CustomerEmail: customerEmail,
    utrTransactionNumber: transactionDetails || "",    
    OrderId: OrderId,
    OrderDate: OrderDate,
    PaidAmount: PaidAmount,
    TransactionStatus: TransactionStatus,
    TransactionType: TransactionType,
    InvoiceId: "",
    InvoiceURL: "",
    PaymentMode: paymentMode,
UTRTransactionNumber: transactionDetails || "",
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
      Navigate(`/adminNotifications`);
      setIsFinalized(true);
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.');
    }
  };

//   const handleUpdateTicket = async (e) => {
//     e.preventDefault();

//     // if (!selectedSlot) {
//     //   alert("Please select a time slot.");
//     //   return;
//     // }
  
//     // if (!selectedStatus) {
//     //   alert("Please select a ticket status.");
//     //   return;

//     // }
//     // const selectedSpecifications = specifications.filter((spec) => spec.isSelected);
  
//   const payload1 = {

//     id: id,
//     ticketId: ticketId,
//     deliveryNoteId: deliveryNoteId,
//     option1Day: option1Day,
//     option1Time: option1Time,
//     option2Day: option2Day,
//     option2Time:  option2Time,
//     deliveryTime: new Date().toISOString(),
//     UploadInvoice: uploadInvoice.map((file) => file.src),
//     InvoiceNumber: invoiceNumber,
//     InvoiceDate: invoiceDate,
//     deliveryInvoiceId: "string", 
//     internalStatus: status,
//     technicianStatus: technicianStatus,
//     dealerStatus: dealerStatus,
//     technicianAcceptance: technicianAcceptance.map((remarks) => ({
//       type: remarks.type,
//       technicianRemarks: remarks.technicianRemarks,
//     })),
//     dealerAcceptance: dealerAcceptance.map((remarks) => ({
//       type: remarks.type,
//       dealerRemarks: remarks.dealerRemarks,
//     })),
//     assignedTo: assignedTo,
//     materialCollection: specifications.map((collection) => ({
//       material: collection.material,
//       quantity: collection.quantity,
//       receivedQuantity: collection.receivedQuantity,
//       remainingQuantity: collection.remainingQuantity,
//     }))
//   };

//   try {
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload1),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to create a ticket.');
//     }
//     alert('Delivery saved Successfully!');
//   } catch (error) {
//     console.error('Error:', error);
//     window.alert('Failed to create the delivery. Please try again later.');
//   }
// };

const handleUploadInvoice = async (e) => {
  e.preventDefault();


const payload2 = {

  id: deliveryId,
  ticketId: ticketId,
  deliveryNoteId: deliveryNoteId,
  option1Day: option1Day,
  option1Time: option1Time,
  option2Day: option2Day,
  option2Time:  option2Time,
  deliveryTime: new Date().toISOString(),
  UploadInvoice: uploadInvoice.map((file) => file.src),
  InvoiceNumber: invoiceNumber,
  InvoiceDate: invoiceDate,
  deliveryInvoiceId: "string", 
  internalStatus: status,
  technicianStatus: technicianStatus,
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
    throw new Error('Failed to create a Invoice.');
  }
  alert('Uploaded Invoice saved Successfully!');
  Navigate(`/adminNotifications`);
  setIsFinalized(true);
} catch (error) {
  console.error('Error:', error);
  window.alert('Failed to create the Invoice. Please try again later.');
}
};


// const handleBothActions =  (e) => {
//   e.preventDefault();
//   handleSaveTicket(e);
//   // handleUpdateTicket(e);
// };

const handleStatusChange = (event) => {
  const { value } = event.target;
  setSelectedStatus((prev) =>
    prev.includes(value) ? prev.filter((status) => status !== value) : [...prev, value]
  );
};

  // const handleMaterialChange = (index, field, value) => {
  //   const updatedMaterials = [...specifications];
  //   updatedMaterials[index][field] = value;
  
  //   if (field === "quantity" || field === "receivedQuantity") {
  //     const quantity = parseFloat(updatedMaterials[index].quantity) || 0;
  //     const receivedQuantity = parseFloat(updatedMaterials[index].receivedQuantity || 0);
  //     updatedMaterials[index].remainingQuantity = Math.max(0, quantity - receivedQuantity).toString();
     
  //     if (receivedQuantity > quantity) {
  //       alert("Received quantity cannot be greater than the total quantity");
  //       return;
  //     }
  //   }
  //   setSpecifications(updatedMaterials);
  //   }; 

  // const isTechnicianChecked = technicianStatus === "Job Completed";
  // const isDealerChecked = dealerStatus === "Material Delivered";
//  const isCloseDisabled = !(isDealerChecked && isTechnicianChecked);


  return (
    <>
    <div className="d-flex">
        {!isMobile && (
        <div className="ml-0 p-0 adm_mnu h-90">
          <AdminSidebar />
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
                <AdminSidebar />
              </div>
          )}
        </div>
      )}

<div className={`container m-1 ${isMobile ? "w-100" : "w-75"}`}>
<h2 className="title mb-4">TICKET CONFIRMATION SHEET(Customer Care)</h2>
    <div className="booking-confirmation p-4">
      <p className='text-center fs-5'><strong className='name'>Lakshmi Sai Services Providers</strong> Bid Accepted By Customer</p>

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
            <td><strong>Approved Amount</strong></td>
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
                        checked={option1Day && option1Time ? true : false}  // Select if data exists
                        readOnly  // Make it read-only
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
                        checked={option2Day && option2Time ? true : false}  // Select if data exists
                        readOnly  // Make it read-only
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
                readonly
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

{rateQuotedBy === "Customer Care" && (
  <>
<h3 className="section-title">Invoice Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Invoice Number</strong></td>
            <td><input type='text' name='invoiceNumber' 
            className="form-control text-end"
            placeholder='Enter Invoice Number'
            onChange={(e) => setInvoiceNumber(e.target.value)}/></td>
            </tr>
            <tr>
            <td><strong>Invoice Date</strong></td>
            <td ><input type='date' name="invoiceDate"
            className="form-control text-end w-50"
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
                <div className="alert alert-danger  mt-2 fs-5">
                  <strong>Note:</strong> Invoice will be uploaded only once; if uploaded, it cannot be changed.  
                  <br />
                  Please click the <strong>Upload Files</strong> button to upload the selected images.
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
              <button className='btn btn-warning m-1'
              disabled={isFinalized} 
              onClick={handleUploadInvoice}
              >Save</button>
          </div>
          </>
        )} 
        </div>
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
                    {/* <tr>
                        <td><strong>Address</strong></td>
                        <td>{address}</td>
                    </tr> */}
                </tbody>
            </table>
            {/* <label className='fs-5'>
            <input
            type='checkbox'
            className='form-check-input m-1 border-dark' />
            Material Collected to Technician
            </label> */}
            {/* <button className='btn btn-warning m-2 fs-5'>Save</button> */}
        </div>
        {rateQuotedBy === "Dealer/Trader" && (
          <>
        <h3 className="section-title">Invoice Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Invoice Number</strong></td>
            <td><input type="text" name="invoiceNumber" value={invoiceNumber}
            className="form-control text-end" placeholder="Enter Invoice Number" 
            // onChange={(e) => setInvoiceNumber(e.target.value)}
            /></td>
            </tr>
            <tr>
            <td><strong>Invoice Date</strong></td>
            <td><input type="date" name="invoiceDate" value={invoiceDate}
            className="form-control text-end"
            // onChange={(e) => setInvoiceDate(e.target.value)} 
            /></td>
            </tr>
        </tbody>
      </table>
      <button className='btn btn-warning fs-5 m-2' onClick={handleDownloadAllAttachments}>Download Invoice</button>
      </>
        )}

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

      {/* <div className='payment'> */}
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
          // onChange={(e) => setTransactionDetails(e.target.value)}
          />
          </div>

          
                    {/* OrderId */}
                      {transactionDetails !== "cash" && (
                          <Row>
                            <Col md={12}>
                              <Form.Group>
                                <label>Order Id</label>
                                <Form.Control
                                  type="text"
                                  name="OrderId"
                                  value={OrderId}
                                  // onChange={handleChange}
                                  placeholder="Order Id"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
          
                          {/* Order Date */}
                            <Col md={12}>
                              <Form.Group>
                                <label>Order Date</label>
                                <Form.Control
                                  type="text"
                                  name="OrderDate"
                                  value={OrderDate}
                                  // onChange={handleChange}
                                  placeholder="Order Date"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
          
                          {/* Paid Amount */}
                            <Col md={12}>
                              <Form.Group>
                                <label>Paid Amount</label>
                                <Form.Control
                                  type="text"
                                  name="PaidAmount"
                                  value={PaidAmount}
                                  // onChange={handleChange}
                                  placeholder="Paid Amount"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
          
                          {/* Transaction Status */}
                            <Col md={12}>
                              <Form.Group>
                                <label>Transaction Status</label>
                                <Form.Control
                                  type="text"
                                  name="TransactionStatus"
                                  value={TransactionStatus}
                                  // onChange={handleChange}
                                  placeholder="Transaction Status"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
          
                          {/* Transaction Type */}
                            <Col md={12}>
                              <Form.Group>
                                <label>Transaction Type</label>
                                <Form.Control
                                  type="text"
                                  name="TransactionType"
                                  value={TransactionType}
                                  // onChange={handleChange}
                                  placeholder="Transaction Type"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                      )}
{/*           
                          Invoice Id
                          <Row>
                            <Col md={12}>
                              <Form.Group>
                                <label>Invoice Id</label>
                                <Form.Control
                                  type="text"
                                  name="InvoiceId"
                                  value={InvoiceId}
                                  // onChange={handleChange}
                                  placeholder="Invoice Id"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
                          </Row> */}
          
                          {/* Invoice URL*/}
                          {/* <Row>
                            <Col md={12}>
                              <Form.Group>
                                <label>Invoice URL</label>
                                <Form.Control
                                  type="text"
                                  name="InvoiceURL"
                                  value={InvoiceURL}
                                  // onChange={handleChange}
                                  placeholder="Invoice URL"
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
                          </Row> */}
         
      <div className='payment'>
          <h3 className='section-title mt-2'>Ticket Closing Status</h3>
          <div className='d-flex flex-column m-1'>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value="Material Delivered"
          checked={selectedStatus.includes('Material Delivered')}
          onChange={handleStatusChange}
          readOnly
          />
          Material Delivered
          </label>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value="Technician Work Completed"
          checked={selectedStatus.includes('Technician Work Completed')}
          onChange={handleStatusChange}
          readOnly
           />
          Technician Work Completed
          </label>
        </div>
        <label className="section-title fs-5 m-0">Rating</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            // onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
          <div className='d-flex justify-content-between'>
          <button className='btn btn-warning me-2 fs-5' title='back'
          onClick={() => Navigate(`/adminNotifications`)} 
          >Back</button> 
          <button className='btn btn-warning me-2 fs-5' title='close' 
          onClick={handleSaveTicket} 
          disabled={isFinalized}
          >Close</button> 
          </div>
      </div>
    </div> 
    </div>
    </div>
        <Footer /> 
</>
  );
};
 
export default CustomerCareConfirmation;