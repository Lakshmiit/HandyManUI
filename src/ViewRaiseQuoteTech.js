import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Sidebar';
import Header from './Header.js';
import Footer from './Footer.js';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import { FaEdit} from 'react-icons/fa'; // Correct icon import
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import ForwardIcon from '@mui/icons-material/Forward';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import JSZip from "jszip";
import { saveAs } from "file-saver";
const RaiseQuoteTechnician = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  // const [isDisabled, setIsDisabled] = useState(false);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [isMaterialType, setIsWithMaterial] = useState('');
  const [ticketData, setTicketData] = useState(''); 
  const [technicianData, setTechnicianData] = useState(null);
  const [requestType, setRequestType] = useState('Without Material');
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "", total: ""}]); 
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]);
  // const [requiredMaterials, setRequiredMaterials] = useState([{material: "", quantity: "", price: ""}]); 
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [customerId, setCustomerId] = useState(''); 
  const [zipCode,setzipCode]=useState('');
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState('');
  const [validated, setValidated] = useState(false);
  const [newPhotoCount , setPhotoCount] = useState(0);
  const [othercharges, setOtherCharge] = useState('');
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [serviceCharges, setServiceCharge] = useState('');
  const [fixedServiceCharge, setFixedServiceCharge] = useState('');
  const [gst, setGST] = useState('');
  const [fixedGST, setFixedGST] = useState('');
  const [totalAmount, setTotalAmount] = useState();
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const [enterQuoteAmount, setQuote] = useState('');
  // const [isAmountPosted, setIsAmountPosted] = useState(false);
  const [fixedQuote, setFixedQuote] = useState('');
  const [discount, setDiscount] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [addrRmarks, setAddrRmarks] = useState([{requestedDate: new Date(), remarks: ""}]);
  const [userType] = useState('technician');
  const { selectedUserType} = useParams();
  const {category} = useParams();
  const {userId} = useParams();
  const [fullName, setFullName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  // const [internalStatus, setInternalStatus] = useState('');
  // const [ticketId, setTicketId] = useState('');
  const [materialQuotation] = useState([{discount: "", fixedDiscount: "", deliveryCharges: "", fixedDeliveryChargs: "", servicecharges: "", fixedServicecharges: "", gst: "", fixedGST: "", gradntotal: ""}]);  
  // const [errors, setErrors] = useState([]);
  // const [anyOtherCharge, setAnyOtherCharges] = useState('100');
  // const [serviceCharge, setServiceCharges] = useState('10');
  // const [gstCharge, setGSTCharge] = useState('18');
  useEffect(() => {
    console.log(ticketData, status, id, technicianData, userId, assignedTo);
  }, [ticketData, status, id, technicianData, userId, assignedTo]); 


  useEffect(() => {
    const fetchticketData = async () => {
        try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch ticket data');
            }
            const data = await response.json();
            const normalizedTechnicianList = Array.isArray(data.technicianList)
                ? data.technicianList.flatMap(item => item.includes(",") ? item.split(",").map(id => id.trim()) : item)
                : [];

            setTicketData({
                ...data,
                technicianList: normalizedTechnicianList,
            });
            setOtherCharge('100');
            setServiceCharge('10');
            setGST('18');  
            // setDiscount('0');  
            setState(data.state);
            setDistrict(data.district);
            setzipCode(data.zipCode);
            setAddress(data.address);
            setId(data.id);
            setCustomerId(data.customerId);
            setIsWithMaterial(data.isMaterialType);
            setAssignedTo(data.assignedTo);
            setStatus(data.status);
            setFullName(data.customerName);
            setCustomerPhoneNumber(data.customerPhoneNumber);
        setRequestType(data.requestType || 'Without Material');
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
        const imageRequests =
          data.attachments?.map((photo) => fetch(
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
        setPhotoCount(images.length);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchticketData(); 
  }, [raiseTicketId]); 

  const handleDownloadAllAttachments = async () => {
    if (attachments.length === 0) {
      alert("No files to download");
      return;
    }
  
    const zip = new JSZip();
    const folder = zip.folder("TicketAttachments"); 
  
    for (const attachment of attachments) {
      try {
        const response = await fetch(`data:image/jpeg;base64,${attachment.imageData}`);
        const blob = await response.blob();
        folder.file(attachment.src.split("/").pop(), blob); // Add file to the ZIP folder
      } catch (error) {
        console.error("Error fetching attachment:", error);
      }
    }
  
    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "TicketAttachments.zip");
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


  // const handleUpdateTicket = async (e) => {
  //   e.preventDefault();
    
  //   const payload = {
  //     id: id,
  //     RaiseTicketId: ticketData.raiseTicketId,
  //     date: new Date(),
  //     address: address,
  //     subject: ticketData.subject,
  //     details: ticketData.details,
  //     status: ticketData.status,
  //     category: ticketData.category,
  //     assignedTo:"Technical Agency",
  //     InternalStatus: "Pending",
  //     TicketOwner: ticketData.customerId,
  //     CustomerId: ticketData.customerId,
  //     state: state,
  //     isMaterialType: isMaterialType,
  //     district: district,
  //     ZipCode: zipCode,
  //     RequestType: requestType,
  //     attachments:attachments.map((file) => file.src),
  //     materials: specifications.map((spec) => ({
  //         material: spec.material,
  //         quantity: spec.quantity,
  //         price: "",
  //         total: "",
  //     })),
  //     comments: commentsList.map((comment) => ({
  //         updatedDate: comment.updatedDate,
  //         commentText: comment.commentText,
  //     })),
  //     LowestBidderTechnicainId: "",
  //     LowestBidderDealerId: "",
  //     ApprovedAmount: "",
  //     customerName: fullName,
  //     Option1Day: "", 
  //     Option1Time: "",
  //     Option2Day: "",
  //     Option2Time: "",
  //     TechnicianList: technicianList,
  //     DealerList: [],
  //   };
  //   try {
  //     const existingTechnicianList = ticketData.TechnicianList || [];
  //     const newTechnicians = technicianId ? technicianId.split(",") : [];
  //     const updatedTechnicianList = Array.from(new Set([...existingTechnicianList, ...newTechnicians]));
  //     const updatedPayload = {
  //       ...ticketData, 
  //       TechnicianList: updatedTechnicianList,
  //   };
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
  //   } catch (error) {
  //     console.error('Error saving ticket data:', error);
  //     window.alert('Failed to save the ticket data. Please try again later.')
  //   }
  // }; 



//   const handleUpdateTicket = async (e) => {
//     e.preventDefault();
 
//     try {
//         // Step 1: Get existing technician list
//         const existingTechnicianList = ticketData.TechnicianList || [];

//         // Step 2: Convert technicianId param to an array (if multiple IDs are passed)
//         const newTechnicians = technicianId ? technicianId.split(",") : [];

//         // Step 3: Merge both lists while ensuring uniqueness
//         const updatedTechnicianList = Array.from(new Set([...existingTechnicianList, ...newTechnicians]));

//         // Step 4: Create updated payload
//         const updatedPayload = {
//             ...ticketData,  // Retain all existing fields
//             TechnicianList: updatedTechnicianList, 
//             id: id,
//             RaiseTicketId: ticketData.raiseTicketId,
//             date: new Date(),
//             address: address,
//             subject: ticketData.subject,
//             details: ticketData.details,
//             status: ticketData.status,
//             category: ticketData.category,
//             assignedTo: "Technical Agency",
//             InternalStatus: "Pending",
//             TicketOwner: ticketData.customerId,
//             CustomerId: ticketData.customerId,
//             state: state,
//             isMaterialType: isMaterialType,
//             district: district,
//             ZipCode: zipCode,
//             RequestType: requestType,
//             attachments: attachments.map((file) => file.src),
//             materials: specifications.map((spec) => ({
//                 material: spec.material,
//                 quantity: spec.quantity,
//                 price: "",
//                 total: "",
//             })),
//             comments: commentsList.map((comment) => ({
//                 updatedDate: comment.updatedDate,
//                 commentText: comment.commentText,
//             })),
//             LowestBidderTechnicainId: "",
//             LowestBidderDealerId: "",
//             ApprovedAmount: "",
//             customerName: fullName,
//             Option1Day: "",
//             Option1Time: "",
//             Option2Day: "",
//             Option2Time: "",
//             DealerList: [],
//         };

//         // Step 5: Send the PUT request
//         const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedPayload), // Use updated payload
//         });

//         if (!response.ok) {
//             throw new Error("Failed to save ticket data");
//         }

//         alert("Ticket saved successfully!");
//     } catch (error) {
//         console.error("Error saving ticket data:", error);
//         window.alert("Failed to save the ticket data. Please try again later.");
//     }
// };

const handleUpdateTicket = async (e) => {
  e.preventDefault();
  
  if (!assignedTo) {
    setValidated(true);
  } else {
    setValidated(false);
    console.log("Assigned To:", assignedTo);
  }  

  try {
      
      const existingTechnicianList = ticketData.technicianList || [];

      
      const newTechnicians = userId ? userId.split(",").map(id => id.trim()) : [];

      
      const updatedTechnicianList = Array.from(new Set([...existingTechnicianList, ...newTechnicians]));
      
      // alert("Existing Technician List: " + JSON.stringify(existingTechnicianList));
      // alert("New Technician IDs: " + JSON.stringify(newTechnicians));
      // alert("Updated Technician List: " + JSON.stringify(updatedTechnicianList));

      const updatedPayload = {
          ...ticketData,  
          technicianList: updatedTechnicianList,  
          id: id,  
          raiseTicketId: ticketData.raiseTicketId, 
          date: new Date(), 
          address: address,
          subject: ticketData.subject,  
          details: ticketData.details, 
          status: ticketData.status,
          category: ticketData.category,  
          assignedTo: "Technical Agency",
          internalStatus: "Pending", 
          ticketOwner: customerId,  
          customerId: customerId, 
          state: state,  
          isMaterialType: isMaterialType, 
          district: district, 
          zipCode: zipCode, 
          requestType: requestType, 
          attachments: attachments.map((file) => file.src), 
          materials: specifications.map((spec) => ({
              material: spec.material,
              quantity: spec.quantity,
              price: "",
              total: "",
          })),  
          comments: commentsList.map((comment) => ({
              updatedDate: comment.updatedDate,
              commentText: comment.commentText,
          })), 
          lowestBidderTechnicianId: "", 
          lowestBidderDealerId: "", 
          approvedAmount: "",
          customerName: fullName,
          option1Day: "", 
          option1Time: "", 
          option2Day: "", 
          option2Time: "", 
          dealerList: [], 
          Rating: "",
          RateQuotedBy: "",
          CustomerPhoneNumber: customerPhoneNumber, 
          PaymentMode: "",
          UTRTransactionNumber: "",
      };

      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPayload),  
      });

      
      if (!response.ok) {
          throw new Error("Failed to save ticket data");
      }

      alert("Ticket saved successfully!");

  } catch (error) {
      console.error("Error saving ticket data:", error);
      window.alert("Failed to save the ticket data. Please try again later.");
  }
};


  const handleSaveTicket = async (e) => {
    e.preventDefault();
   // alert(technicianId);
    const payload1 = {
      id :"string",
      quotedDate: new Date(), 
      raiseAQuoteId: "string",
      CustomerId:customerId,
      ticketId: customerId,
      technicianId: userId,
  //     enterQuoteAmount: enterQuoteAmount.toString(),
  //     fixedQuote: fixedQuote.toString(),
  //     discount: discount.toString(),
  //     fixedDiscount: fixedDiscount.toString(),
  //     othercharges: othercharges.toString(),
  //     fixedOtherCharge: fixedOtherCharge.toString(),
  //     serviceCharges: serviceCharges.toString(),
  //     fixedServiceCharge: fixedServiceCharge.toString(),
  //     gst: gst.toString(),
  //     fixedGST: fixedGST.toString(),
  //     totalAmount: totalAmount.toString(),
  //     raiseTicketId: raiseTicketId,
  //     AddRemarks: addrRmarks.map((comment) => ({
  //       requestedDate: comment.requestedDate,
  //       remarks: comment.remarks,
  //   })),
  //   materials: specifications.map((spec) => ({
  //     material: spec.material,
  //     quantity: spec.quantity,
  //     price: "",
  //     total: "",
  // })),
  // materialQuotation: materialQuotation.map((mat) => ({
  //   discount: "",
  //   fixedDiscount: "",
  //   deliveryCharges: "",
  //   fixedDeliveryChargs: "",
  //   serviceCharge: "",
  //   fixedServicecharges: "",
  //   gst: "",
  //   fixedGST: "",
  //   grandtotal: "",
  // })),


  enterQuoteAmount: String(enterQuoteAmount || ""),
  fixedQuote: String(fixedQuote || ""),
  discount: String(discount || ""),
  fixedDiscount: String(fixedDiscount || ""),
  othercharges: String(othercharges || ""),
  fixedOtherCharge: String(fixedOtherCharge || ""),
  serviceCharges: String(serviceCharges || ""),
  fixedServiceCharge: String(fixedServiceCharge || ""),
  gst: String(gst || ""),
  fixedGST: String(fixedGST || ""),
  totalAmount: String(totalAmount || ""),
  raiseTicketId: raiseTicketId || "", 
  AddRemarks: addrRmarks.map((comment) => ({
    requestedDate: comment.requestedDate || "",
    remarks: comment.remarks || "",
  })),
  materials: specifications.map((spec) => ({
    material: spec.material || "",
    quantity: spec.quantity || "",
    price: "",
    total: "",
  })),
  materialQuotation: materialQuotation.map((mat) => ({
    discount: "",
    fixedDiscount: "",
    deliveryCharges: "",
    fixedDeliveryChargs: "",
    serviceCharge: "",
    fixedServicecharges: "",
    gst: "",
    fixedGST: "",
    grandtotal: "",
  })),
    }; 
    try {
      //imageUrls="";
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/CreateRaiseAQuote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload1),
      });
    
      if (!response.ok) {
        throw new Error('Failed to save Technician ticket data');
      }
     
      alert('Ticket Technician saved Successfully!');
      // window.location.href = `https://handymanapiv2.azurewebsites.net/CustomerProfilePage?ReactToken=${technicianId}$${userType}`;
    } catch (error) {
      console.error('Error saving Technician ticket data:', error);
      window.alert('Failed to save the Technician ticket data. Please try again later.')
    }
  };

  useEffect(() => {
    if (raiseTicketId && userId) {
      const fetchtechnicianData = async () => {
        try {
          const technicianResponse = await fetch(
            `https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByTechnicianId?raiseAQuotetId=${raiseTicketId}&TechnicianId=${userId}`
          );
          if (!technicianResponse.ok) {
            throw new Error('Failed to fetch technician data');
          }
          const techData = await technicianResponse.json();
          const techDataItem = techData[0];
          //  alert(techDataItem.id);
          // const techdetails = JSON.stringify(techData);
         // alert(techData);
        //   console.log("testing ticket code data");
        //   alert(JSON.stringify(techData));
        // console.log(JSON.stringify(techData));
          setTechnicianData(JSON.stringify(techData));
          setId(techDataItem.id);
          setCustomerId(techDataItem.customerId);
          setQuote(techDataItem.enterQuoteAmount);
       
          setSpecifications(techDataItem.materials || [{ material: "", quantity: "", price: "", total: ""}])
          // setIsAmountPosted(true);
          setQuote(techDataItem.enterQuoteAmount);
          setFixedQuote(techDataItem.fixedQuote);
          setDiscount(techDataItem.discount);
          setFixedDiscount(techDataItem.fixedDiscount);
          setOtherCharge(techDataItem.othercharges);
          setFixedOtherCharge(techDataItem.fixedOtherCharge);
          setServiceCharge(techDataItem.serviceCharges);
          setFixedServiceCharge(techDataItem.fixedServiceCharge);
          setGST(techDataItem.gst);
          setFixedGST(techDataItem.fixedGST);
          // setTotalAmount(techDataItem.totalAmount);
          setAddrRmarks(techDataItem.addrRmarks || [{ requestedDate: new Date(), remarks: "" }]);
          alert("Hello");
          alert(JSON.stringify(techDataItem));
          console.log(JSON.stringify(techDataItem.addrRmarks));
        } catch (error) {
          console.error('Error fetching technician data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchtechnicianData();
    }
  }, [raiseTicketId, userId]);


// const handleTechnicianTicket = async (e) => {
//   e.preventDefault();
//   const payload3 = {
//     id :"string",
//     quotedDate: new Date().toISOString(), 
//     raiseAQuoteId: "string",
//     customerId: customerId,
//     ticketId: technicianData.raiseTicketId, 
//     technicianId: technicianData.technicianId,
//     enterQuoteAmount: technicianData.enterQuoteAmount,
//     discount: technicianData.discount,
//     otherCharges: technicianData.otherCharge,
//     serviceCharges: technicianData.serviceCharge,
//     gst: technicianData.gst,
//     totalAmount: technicianData.totalAmount,
//     addrRmarks: addrRmarks.map((comment) => ({
//       requestedDate: comment.requestedDate,
//       remarks: comment.remarks,
//   })), 
//   };
//   try {
//     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload3),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to save technician data');
//     }
//     alert('Technician saved Successfully!');
//   } catch (error) {
//     console.error('Error saving technician data:', error);
//     window.alert('Failed to save the technician data. Please try again later.');
//   }
// };

  const handleBothActions = (e) => {
    e.preventDefault();
    handleUpdateTicket(e);
    handleSaveTicket(e);
    navigate(`/notificationTechnician/${userType}/${userId}/${category}/${district}`);
  };


  // Handle material input change
  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...specifications];
    updatedMaterials[index][field] = value;
    setSpecifications(updatedMaterials);
  };

  // Add new material and quantity fields
  const handleAddMaterial = () => {
    setSpecifications([...specifications, { material: "", quantity: "" }]);
  };

  // Remove a material and its corresponding quantity
  const handleRemoveMaterial = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = (quote, discountPercentage, otherCharges, serviceChargePercentage, gstPercentage) => {
    const discountAmount = (quote * (discountPercentage / 100)); 
    const priceAfterDiscount = quote - (discountAmount); 
    const priceAfterOtherCharges = priceAfterDiscount + otherCharges; 
    const serviceCharge = (quote - discountAmount + priceAfterOtherCharges ) * (serviceChargePercentage / 100); 
    const priceAfterServiceCharge = priceAfterOtherCharges + serviceCharge;
    const gst = priceAfterServiceCharge * (gstPercentage / 100);
    const total = priceAfterServiceCharge + gst; 
    return { total, discountAmount, serviceCharge, gst }; 
  };

  const handleFixedChange = (setter, fixedSetter) => (e) => {
    const value = parseFloat(e.target.value); 
    setter(value); 
    

    const { discountAmount, serviceCharge: calculatedServiceCharge, gst: calculatedGST } = calculateTotalPrice(
      enterQuoteAmount, 
      discount, 
      othercharges, 
      serviceCharges, 
      gst
    );
    
    if (setter === setDiscount) fixedSetter(discountAmount); 
    if (setter === setOtherCharge) fixedSetter(othercharges); 
    if (setter === setServiceCharge) fixedSetter(calculatedServiceCharge); 
    if (setter === setGST) fixedSetter(calculatedGST); 
   
    // setTotalAmount(total);
  };

  useEffect(() => {
    const { discountAmount} = calculateTotalPrice(
      enterQuoteAmount,
      discount,
      othercharges,
      serviceCharges,
      gst
    );
    setFixedQuote(enterQuoteAmount);
    setFixedDiscount(discountAmount);
    setFixedOtherCharge(othercharges);
    // setFixedServiceCharge();
    // setFixedGST(calculatedGST);
    // setTotalAmount(total);
  }, [enterQuoteAmount, discount, othercharges, serviceCharges, gst]);


  const handleDiscountCharges = (setter) => (e) => {
    const value = parseFloat(e.target.value); 
    setter(value); 
    

    // const { total, discountAmount, serviceCharge: calculatedServiceCharge, gst: calculatedGST } = calculateTotalPrice(
    //   enterQuoteAmount, 
    //   discount, 
    //   othercharges, 
    //   serviceCharges, 
    //   gst
    // );
    // alert(enterQuoteAmount);
    // alert(value);
    // alert(othercharges);
    // alert(serviceCharges);
var CalculatedDiscount = enterQuoteAmount * (value / 100); 
var calculatedServiceCharges = ((enterQuoteAmount - CalculatedDiscount) * (serviceCharges / 100));
var calculateGST = (calculatedServiceCharges * gst) / 100;
var GrandTotal = enterQuoteAmount - CalculatedDiscount + Number(othercharges) + calculatedServiceCharges + calculateGST;
var roundedGrandTotal = Math.round(GrandTotal * 100) / 100;  
setFixedServiceCharge(calculatedServiceCharges);
setFixedGST(calculateGST);
setTotalAmount(roundedGrandTotal);

    // if (setter === setDiscount) fixedSetter(discountAmount); 
    // if (setter === setOtherCharge) fixedSetter(othercharges); 
    // if (setter === setServiceCharge) fixedSetter(calculatedServiceCharge); 
    // if (setter === setGST) fixedSetter(calculatedGST); 
   
    // setTotalAmount(total);
  };
  const handleAddComment = (index, field, value) => {
    const updatedComments = [...commentsList];
    updatedComments[index][field] = value;
    setCommentsList(updatedComments);
  }; 
   // Handle form data changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleAddRemarks = (index, field, value) => {
    const updatedComments = [...addrRmarks];
    updatedComments[index][field] = value;
    setAddrRmarks(updatedComments);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
  {isMobile && <Header />}
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu h-90">
          <Sidebar userType={selectedUserType}/>
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
              <Sidebar userType={selectedUserType}/>
            </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
        <h1 className="text-center mb-2">View Raise a Quote</h1>
        <Form noValidate onSubmit={handleUpdateTicket}>
        <Row>
            <Col md={6}>
            <Form.Group>
                <label>Ticket ID</label>
                <Form.Control
                type="text"
                name="ticketID"
                value={ticketData.raiseTicketId}
                onChange={handleChange}
                readOnly
                />
            </Form.Group>
            </Col>
      
        {/* Status */}
                  <Col md={6}>
                    <Form.Group>
                      <label>Status</label>
                      <Form.Control
                        as="select"
                        name="status"
                        value={ticketData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option>Open Tickets</option>
                        <option>Assigned</option>
                        <option>Pending Tickets</option>
                        <option>Closed Tickets</option>
                      </Form.Control>
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
                placeholder="Subject"
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
            onChange={handleChange}
            rows="4"
            placeholder="Details"
            readOnly
          />
        </Form.Group>

        {/* Ticket Owner */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Ticket Owner</label>
              <Form.Control
                type="text"
                name="ticketOwner"
                value={customerId}
                onChange={handleChange}
                placeholder="Ticket Owner"
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Category */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Category</label>
              <Form.Control
                type="text"
                name="category"
                value={ticketData.category}
                onChange={handleChange}
                placeholder="Category"
                readOnly
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/*Attachments*/}
        
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
        
        {/* Assigned To */}
        <Row>
        <Col md={12}>
            <Form.Group controlId="assignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Select
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                isInvalid={validated && !assignedTo}
              >
                <option>Select Assigned</option>
                <option>Customer Care</option>
                <option>Customer</option>
                <option>Technical Agency</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
              Please select an Assigned To.
            </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

      <div className="radio">
      <label className="m-1">
        <input
          className="form-check-input m-2 border-dark"
          type="radio"
          name="RequestType"
          value="With Material"
          checked={requestType === "With Material"}
          // onChange={(e) => setRequestType(e.target.value)}
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
          // onChange={(e) => setRequestType(e.target.value)}
        />
        Without Material
      </label>

      {/* Material Input Fields */}
      {requestType === "With Material" && (
        <div className="form-group">
        <strong>Required Material(Optional)</strong>
        {!isMobile ? (
          <div className="mt-3">
            <div className="d-flex gap-3 mb-2">
              <div style={{ flex: 4 }}>
                <label className="fw-bold">Material</label>
              </div>
              <div style={{ flex: 4 }}>
                <label className="fw-bold">Quantity</label>
              </div>
            </div>
            {specifications.map((spec, index) => (
              <div className="d-flex gap-3 mb-2" key={index}>
                <input
                  type="text"
                  className="form-control"
                  value={spec.material}
                  placeholder="Enter Material"
                  onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control text-center"
                  placeholder="Enter Quantity"
                  value={spec.quantity}
                  onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveMaterial(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-primary m-1" onClick={handleAddMaterial}>
              Add Material
            </button>
              </div>
        ) : (
          <>
            {specifications.map((spec, index) => (
              <div key={index} className="card w-100 mb-2 shadow-sm">
                <div className="card-body">
                  <p className="d-flex align-items-center gap-2 mb-2">
                    <strong>Material:</strong>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Material"
                      value={spec.material}
                      onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
                      required
                    />
                  </p>
                  <p className="d-flex align-items-center gap-2 mb-2">
                    <strong>Quantity:</strong>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Quantity"
                      value={spec.quantity}
                      onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                      required
                    />
                  </p>
    
                <div className='text-end'>
                  <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveMaterial(index)}
                >
                  Remove
                </button>
                </div>
                </div>
              </div>
            ))}
    
            <button type="button" className="btn btn-primary m-1" onClick={handleAddMaterial}>
              Add Material
            </button>
                </>
        )}
      </div>
      )}
    </div>
    <table className="table table-bordered">
  <tbody>
    {/* Quote Amount */}
    <tr>
      <td>
        <label htmlFor="quoteAmount">Enter Quote Amount</label>
      </td>
      <td colSpan="2">
        <input
            type="number"
            className="form-control text-end"
            value={enterQuoteAmount}
            // onBlur={calculateTotal}
            onChange={handleFixedChange(setQuote, setFixedQuote)}
            placeholder="Enter Quote Amount"
            required
        />
      </td>
        <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={fixedQuote}
          disabled
          placeholder="Fixed Quote Amount"
        />
      </td>
    </tr>

    {/* Discount */}
    <tr>
      <td>
        <label>Discount</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={discount}
          onChange={handleDiscountCharges(setDiscount, setFixedDiscount)}
          placeholder="Enter Discount"
          required
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedDiscount).toFixed(2)}
          disabled
          placeholder="Fixed Discount"
        />
      </td>
    </tr>

    {/* Any Other Charges */}
    <tr>
      <td>
        <label>Any Other Charges</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={othercharges}
          disabled
          // onChange={handleFixedChange(setOtherCharge, setFixedOtherCharge)}
          placeholder="Enter Other Charges"
          
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedOtherCharge).toFixed(2)}
          disabled
          placeholder="Fixed Other Charges"    
        />
      </td>
    </tr>

    {/* Service Charges */}
    <tr>
      <td>
        <label>Service Charges</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={serviceCharges}
          disabled
          // onChange={handleFixedChange(setServiceCharge, setFixedServiceCharge)}
          placeholder="Enter Service Charges"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedServiceCharge).toFixed(2)}
          disabled
          placeholder="Fixed Service Charges"
        />
      </td>
    </tr>

    {/* GST */}
    <tr>
      <td>
        <label>GST</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={gst}
          disabled
          // onChange={handleFixedChange(setGST, setFixedGST)}
          placeholder="Enter GST"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control text-end"
          value={Number(fixedGST).toFixed(2)}
          disabled
          placeholder="Fixed GST"
        />
      </td>
    </tr>

    {/* Total Amount */}
        <tr>
        <td>
            <label>Total Amount</label>
        </td>
        <td colspan="4">
            <input
            type="number"
            className="form-control text-end"
            value={Number(totalAmount).toFixed(2)}
            disabled
            
            placeholder="Total Amount"
            />
        </td>
        </tr>
        </tbody>
        </table>

     {/* Add Comments */}
  
     <div className="form-group">
          <label>Add Comment</label>
          {commentsList.map((comment, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder="Comment Text"
                value={comment.commentText}
                 onChange={(e) => handleAddComment(index,"commentText", e.target.value)}
                 readOnly
              />
            </div>
          ))}
        </div>

        {/* Add Remarks */}
        <div className="form-group">
            <label>Add Remarks</label>
            {addrRmarks.map((comment, index) => (
              <div className="d-flex gap-3 mb-2" key={index}>
            <input 
            type="text"
            className="form-control"
            value={comment.remarks} 
            placeholder="Remarks Text"
            onChange={(e) => handleAddRemarks(index, "remarks", e.target.value)}
            required
            />
            </div>
          ))}
        </div>
      
        {/* Save Button */}
        <div className="mt-4 text-end">
          <Link to={`/technicianQuoteNotification/${userType}/${userId}/${category}/${district}`} className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          {/* <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link> */}
          <Button onClick={handleBothActions} className="btn btn-warning text-white mx-2" title='Forward'
          >
            <ForwardIcon />
          </Button>
          {/* <Button onClick={handleUpdateTicket} type="submit" className="btn btn-warning text-white mx-2" title="Save" 
          disabled={status === "Assigned" && assignedTo === "Technical Agency"}
          >
            <SaveAsIcon />
          </Button> */}
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
        .menu-popup {
          position: absolute;
          top: 50px; /* Keeps the popup aligned below the floating menu */
          left: 0; /* Aligns the popup to the left */
          background: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 200px;
        }
      `}</style>
    </div>
  );
};

export default RaiseQuoteTechnician;