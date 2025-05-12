import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
// import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for addresses
import {
  
  Dashboard as MoreVertIcon,
} from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Header from './Header.js';
import Footer from './Footer.js';
// import axios from 'axios';
// import RaiseTicketConfirmation from './RaiseTicketConfirmation.js';
import Sidebar from './Sidebar';
import {  useParams } from 'react-router-dom';
const ApartmentRaiseTicket = () => {
  // const Navigate = useNavigate();
   const {userType} = useParams();
   const {userId} = useParams();
  const {selectedUserType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
 const [apartmentAddress, setApartmentAddress] = useState('');
  const [apartmentName, setApartmentName] = useState('');
  const [consentPersonName, setConsentPersonName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showAlert, setShowAlert] = useState(false);
  const [ticketPhotos, setTicketPhotos] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    details: '',
    category: '',
  });
const [selectedFiles, setSelectedFiles] = useState([]);
const [numberOfFlats, setNumberOfFlats] = useState('');
const [totalAmount, setTotalAmount] = useState(0);
const [isRegisterDisabled, setIsRegisterDisabled] = useState(false);
const [response, setResponse] = useState(null);
const [ticketId, setTicketId] = useState('');
const [addresses, setAddresses] = useState([]);
const [id, setId] = useState('');
const [isEditing, setIsEditing] = useState(false);
const [addressData, setAddressData] = useState({
apartmentName  : '',
apartmentAddress: '',
mobileNumber: '',
zipCode: '',
flats: '',
total: '',
});
const [editingAddressId, setEditingAddressId] = useState(null);
const [isSubscription, setIsSubscription] = useState('');
const [subscriptionDate, setSubscriptionDate] = useState('');
const [paymentId, setPaymentId] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [shouldBlink,setShouldBlink] = useState(false);
const [apartmentMaintenanceId, setApartmentMaintenanceId] = useState('');

  useEffect(() => {
    if (isSubscription === "No" && isRegisterDisabled) {
      setShouldBlink(true);
    } else {
      setShouldBlink(false);
    }
  }, [isSubscription, isRegisterDisabled]);

//  useEffect(() => {
//     if (subscriptionDate) {
//       const subscription = new Date(subscriptionDate);
//       const today = new Date();
//       const diffInDays = Math.floor((today - subscription) / (1000 * 60 * 60 * 24));
//       setShouldBlink(diffInDays >= 30);
//     }
//   }, [subscriptionDate]);

// useEffect(() => {
//   if (!subscriptionDate) return;

//   console.log("Raw subscription date:", subscriptionDate);

//   const cleanedDateStr = subscriptionDate.split('.')[0] + 'Z'; 
//   const subDate = new Date(cleanedDateStr);
//   const now = new Date();

//   const diffInMs = now.getTime() - subDate.getTime();
//   const delay = Math.max(0, 2 * 60 * 1000 - diffInMs); 

//   console.log("Delay set for:", delay, "ms");

//   const timeout = setTimeout(() => {
//     console.log("Triggering blink");
//     setShouldBlink(true);
//   }, delay);

//   return () => clearTimeout(timeout); 
// }, [subscriptionDate]);

// useEffect(() => {
//   if (!subscriptionDate) return;

//   // Parse the subscriptionDate (assuming format "dd-MM-yyyy HH:mm:ss")
//   const [datePart, timePart] = subscriptionDate.split(' ');
//   const [day, month, year] = datePart.split('-').map(Number);
//   const [hour, minute, second] = timePart.split(':').map(Number);

//   const subDate = new Date(year, month - 1, day, hour, minute, second);
//   const now = new Date();

//   const diffMs = now.getTime() - subDate.getTime();
//   const diffMinutes = diffMs / (1000 * 60);

//   // Check if 2 minutes have passed
//   if (diffMinutes >= 2) {
//     setShouldBlink(true);
//   } else {
//     // Set a timer to trigger blinking after the remaining time
//     const timeoutMs = (2 - diffMinutes) * 60 * 1000;
//     const timeout = setTimeout(() => {
//       setShouldBlink(true);
//     }, timeoutMs);
//     return () => clearTimeout(timeout); // Cleanup
//   }
// }, [subscriptionDate]);


// useEffect(() => {
//   if (!subscriptionDate || isSubscription === "Yes") return;

//   const [datePart, timePart] = subscriptionDate.split(' ');
//   const [day, month, year] = datePart.split('-').map(Number);
//   const [hour, minute, second] = timePart.split(':').map(Number);

//   const subDate = new Date(year, month - 1, day, hour, minute, second);
//   const now = new Date();
//   const diffMs = now - subDate;
//   const diffMinutes = diffMs / (1000 * 60);

//   const expired = isSubscriptionExpired();

//   let timeout;

//   if (expired && diffMinutes >= 2) {
//     setShouldBlink(true);
//   } else if (expired) {
//     const timeoutMs = (2 - diffMinutes) * 60 * 1000;
//     timeout = setTimeout(() => {
//       setShouldBlink(true);
//     }, timeoutMs);
//   } else {
//     setShouldBlink(false);
//   }

//   return () => {
//     if (timeout) clearTimeout(timeout);
//   };
// }, [subscriptionDate, isSubscription]);

// const isSubscriptionExpired = () => {
//   if (!subscriptionDate) return true;

//   const [datePart, timePart] = subscriptionDate.split(' ');
//   const [day, month, year] = datePart.split('-').map(Number);
//   const [hour, minute, second] = timePart.split(':').map(Number);

//   const subDate = new Date(year, month - 1, day, hour, minute, second);
  
//   // Let's say subscription is valid for 1 year
//   const expiryDate = new Date(subDate);
//   expiryDate.setFullYear(expiryDate.getFullYear() + 1);

//   return new Date() > expiryDate;
// };

useEffect(() => {
  console.log(selectedFiles, ticketId, response, editingAddressId, addressData, subscriptionDate);
}, [selectedFiles, ticketId, response, editingAddressId, addressData, subscriptionDate]);
  
// useEffect(() => {
//   axios.get(`https://handymanapiv2.azurewebsites.net/api/ApartmentMaintenance/GetAddressMaintenanceDataByMobileNo?mobileNo=${mobileNumber}`)
//     .then((response) => {
//       setAddresses(data);

//       if (response.data === null) {
//         setIsRegisterDisabled(false); 
//       } else if (Array.isArray(response.data) && response.data.length > 0) {
//         setIsRegisterDisabled(true); 
//       } else {
//         setIsRegisterDisabled(false); 
//       }
//     })
//     .catch((error) => {
//       console.error("API call failed:", error);
//       setIsRegisterDisabled(false); 
//     });
// }, []);

// const [requestType, setRequestType] = useState(''); 
//  const [addresses, setAddresses] = useState([]);
  // const [addressType, setAddressType] = useState('');
  // const [state, setState] = useState('');
  // const [district, setDistrict] = useState('');
  // const [pincode, setPincode] = useState('');
//   const [specifications] = useState([{ material : "", Quantity : "" }]);
  // const [showSecondaryAddresses, setShowSecondaryAddresses] = useState(false);
//   const [commentsList] = useState([{updatedDate: new Date(), commentText: ""}]);
  // const [confirmationModal, setConfirmationModal] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  // const [firstName, setFirstName] = useState('');
//   const [guestCustomerId, setGuestCustomerId] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingAddressId, setEditingAddressId] = useState(null);
// const [addressData, setAddressData] = useState({
// apartmentName  : '',
// mobileNumber: '', {/* <Button disabled={isRegisterDisabled}>Register</Button> */}
// address: '',
// zipCode: '',
// });

useEffect(() => {
  setLoading(true);
  const fetchApartmentData = async () => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ApartmentMaintenance/GetAddressMaintenanceDataByMobileNo?mobileNo=${mobileNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Apartment data');
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      const addressArray = Array.isArray(data) ? data : [data];
      setAddresses(addressArray);
      if (addressArray.length > 0) {
        const address = addressArray[0];
        setId(address.id);
        setApartmentName(address.apartmentName || '');
        setApartmentAddress(address.apartmentAddress || '');
        setPinCode(address.pinCode || '');
        setConsentPersonName(address.consentPersonName || '');
        setMobileNumber(address.mobileNumber || '');
        setNumberOfFlats(address.numberOfFlats || '');
        setTotalAmount(address.totalAmount || 0);
        setIsSubscription(address.isSubscription);
        setPaymentId(address.paymentId);
        setSubscriptionDate(address.subscriptionDate);
        setPaidAmount(address.paidAmount);
        setApartmentMaintenanceId(address.apartmentMaintenanceId);
        setIsRegisterDisabled(true);
      } else {
        setIsRegisterDisabled(false);
      }
    } catch (error) {
      console.error('Error fetching Apartment data:', error);
      setIsRegisterDisabled(false);
    } finally {
      setLoading(false);
    }
  };
  fetchApartmentData();
}, [mobileNumber]);

// Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); 
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

  // const states = ['Andhra Pradesh', 'Telangana'];
  // const districts = {
  //   'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
  //   'Telangana': ['Hyderabad', 'Warangal', 'Khammam'],
  // };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFlatTotal = (e) => {
    const value = e.target.value;
  
    // Allow only digits
    if (/^\d*$/.test(value)) {
      const numFlats = parseInt(value, 10);
      setNumberOfFlats(value);
  
      if (!isNaN(numFlats)) {
        setTotalAmount(numFlats * 1);
      } else {
        setTotalAmount("");
      }
    }
  };
  
  
  const handleFileChange = (e) => {

    const files = Array.from(e.target.files);
    const validFiles = [];
    for (const file of files) {
      // const fileSizeMB = file.size / (1024 * 1024);
      const isValidType = file.type === "image/jpeg" || file.type === "image/png";
      // const isValidSize = fileSizeMB <= 100; 
  
      if (!isValidType) {
        alert(`Only JPG and PNG formats are allowed: ${file.name}`);
        continue;
      }
  
      validFiles.push(file);
    }
  
    if (validFiles.length + ticketPhotos.length > 5) {
      alert("You can upload up to 5 files.");
      return;
    }
  
    setTicketPhotos([...ticketPhotos, ...validFiles]);
    setShowAlert(validFiles.length > 0);
    setSelectedFiles(Array.from(e.target.files));
  };
  
  const handleUploadFiles = async () => {
    setLoading(true);
    setShowAlert(false);
    
    const uploadedFilesList=[];
    for (let i = 0; i < ticketPhotos.length; i++) {
      const file = ticketPhotos[i];
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
        alert("Failed Upload Image");
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
  const phoneNumber = '7989328864';  // Phone number
  // Generate ticket ID in the format VSKPAKP002
  // const ticketIdPrefix = "VSKPAPREFV";
  // const ticketIdSuffix = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  // const ticketIds = `${ticketIdPrefix}${ticketIdSuffix}`;

  // Generate WhatsApp link with the ticket ID
//   const generateWhatsAppLink = (ticketId, phoneNumber) => {
//     const message = `Hello, I'd like to continue uploading my video for ticket: ${ticketId}`;
//  var url =`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     // alert(url);
//     //console.log(url);

//     return url;
//   };

  // const handleWhatsAppClick = () => {
  //   // handleSaveWhatsapp();
  //   const link = generateWhatsAppLink(ticketIds, phoneNumber);
  //   window.open(link, '_blank');
  // };
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

  const handleApartmentTicket = async (e) => {
    e.preventDefault();
  
    // Ensure all fields are filled before submitting
    if (
      !formData.subject ||
      !formData.details ||
      !formData.category ||
      !assignedTo || 
      !selectedFiles.length
    ) {
      window.alert('Please fill in all mandatory fields.');
      return;
    }
  
    if (isSubmitting) return;
    setIsSubmitting(true);

    // const primaryAddress = addresses.find((addr) => addr.type === "primary");
    // // const state = primaryAddress?.state || "";
    // // const district = primaryAddress?.district || "";
    // const pincode = primaryAddress?.zipCode || primaryAddress?.pincode || "";
    // // const emailAddress = primaryAddress?.emailAddress || primaryAddress?.emailAddress || "";
    // const mobileNumber = primaryAddress?.mobileNumber || primaryAddress?.mobileNumber || "";

    const payload = {
      id:"string",
      userId: userId,
      apartmentRaiseTicketId: "string",
      date: new Date(),
      Status: "Open",
      subject: formData.subject,
      details: formData.details,
      category: formData.category,
      assignedTo: assignedTo,
      state:"Andhra Pradesh",
      district:"Visakhapatnam",
      apartmentName: apartmentName,
      phoneNumber: mobileNumber,
      numberOfFlats: numberOfFlats,
      totalAmount: totalAmount.toString(),
      consentPersonName: consentPersonName,
      apartmentAddress: apartmentAddress,
      pincode: pinCode,
      attachments: uploadedFiles.map((file) => file.src), 
      paymentId: paymentId,
      paidAmount: paidAmount,
      IsSubscription: isSubscription,
      // address: addressData.address || addresses.find((addr) => addr.type === 'primary')?.address || '',
    };

  try {
    const response = await fetch('https://handymanapiv2.azurewebsites.net/api/ApartmentRaiseTicket/CreateApartmentRaiseTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create a ticket.');
    } 


    const data = await response.json(); 
    setTicketId(data.apartmentRaiseTicketId); 
    // Show alert message with the correct ticketId
    window.alert(`Ticket has been submitted successfully! Your reference number is ${data.apartmentRaiseTicketId}. Get Quote will contact you shortly.`);
    const whatsappapiurl = `https://app-server.wati.io/api/v1/sendSessionMessage/918498892222?messageText=Dear Customer Care a New Ticket Requested by Customer ${data.apartmentRaiseTicketId}`;
        const headers = {
          'accept': '/',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYjI0Y2E3Yi03MjA5LTQ4Y2QtYjY0Yi04NzkyMmY0ZmI4N2EiLCJ1bmlxdWVfbmFtZSI6ImxzY29tcHV0ZXJjb2FjaGluZ2NlbnRlckBnbWFpbC5jb20iLCJuYW1laWQiOiJsc2NvbXB1dGVyY29hY2hpbmdjZW50ZXJAZ21haWwuY29tIiwiZW1haWwiOiJsc2NvbXB1dGVyY29hY2hpbmdjZW50ZXJAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDMvMjYvMjAyNSAwNjoxODowNiIsInRlbmFudF9pZCI6IjQyMjg5NCIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.KmlDJ4K30RfxiEfMGJFmGj6w0iRtzariun0oD04JWlY',
        };
        try {
          const res = await fetch(whatsappapiurl, {
            method: 'POST',
            headers: headers,
          });
          const data = await res.json();
          // alert(data);
          setResponse(data);
        } catch (error) { 
          // alert(error);
          console.error('Error sending message:', error);
        }
        // Navigate(`/raiseTicketConfirmation/${userType}/${userId}`);
    // Redirect to CustomerProfilePage
     window.location.href = `/profilePage/${userType}/${userId}`;
  
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the ticket. Please try again later.');
    setIsSubmitting(false);
  }
  };

  // const handleBothActions =  (e) => {
  //   e.preventDefault();
  //   handleSaveAddress();
  //   // handleGuestAddress(e);
  //   handleUserUpload(e);
  // };
  
  // const handleSaveWhatsapp = async (e) => {
  //   e.preventDefault();
  
  //   const payload = {
  //     RaiseTicketId:"string",
  //     raiseTicketIdVideoRef: "string",
  //     date: new Date(),
  //     address: addresses.find((addr) => addr.type === 'primary')?.address || '',
  //     subject: formData.subject,
  //     details: formData.details,
  //     category: formData.category,
  //     assignedTo: assignedTo,
  //     state:state,
  //     district:district,
  //     zipcode:pincode,
  //     requestType: requestType,
  //     status:'open',
  //     internalStatus:'Open',
  //     id: uuidv4(),// Unique identifier for the API call
  //     customerId: customerId, // Replace with actual customer ID logic
  //     attachments: uploadedFiles.map((file) => file.src), 
  //     comments: commentsList.map((comment) => ({
  //       UpdatedDate : comment.updatedDate,
  //       CommentText: comment.commentText,
  //   })),
  //     Materials:specifications.map(spec => ({
  //       material : spec.material,
  //       Quantity : spec.Quantity ,
  //     })),
  //     LowestBidderTechnicainId: "",
  //     LowestBidderDealerId: "",
  //     ApprovedAmount: "",
  //     CustomerName: fullName, 
  //     Option1Day: "",
  //     Option1Time: "",
  //     Option2Day: "",
  //     Option2Time: "",
  //     TechnicianList: [],
  //     DealerList: [],
  //     Rating: "",
  //     isMaterialType: 0,
  //   };

  // try {
  //   const response = await fetch('https://handymanapiv2.azurewebsites.net/api/RaiseTicketExtention/CreateRaiseTicketExtension', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload),
  //   });
  
  //   if (!response.ok) {
  //     throw new Error('Failed to create a ticket.');
  //   }
  //   // const videoData = await response.json();
  //   // setVideoRefId(videoData.videoRefId);
  //   // alert(videoRefId);

  // } catch (error) {
  //   console.error('Error:', error);
  //   window.alert('Failed to create the ticket. Please try again later.');
  // }
  // };
  // Handle secondary address selection
  // const handleSecondaryAddressSelect = (id) => {
  //   const updatedAddresses = addresses.map((address) =>
  //     address.id === id
  //       ? { ...address, type: 'primary' }
  //       : address.type === 'primary'
  //       ? { ...address, type: 'secondary' }
  //       : address
  //   );
  //   setAddresses(updatedAddresses);
  //   setShowSecondaryAddresses(false); // Collapse secondary addresses view
  // };

  // // Handle address deletion
  // const handleAddressDelete = (id) => {
  //   const updatedAddresses = addresses.filter((address) => address.id !== id);
  //   setAddresses(updatedAddresses);
  // };

// const handleSaveAddress = () => {
//     if (
//       !apartmentName?.trim() ||
//       !newAddress?.trim() ||
//       !newAddress?.trim() ||
//       !mobileNumber?.trim() ||
//       !newAddress?.trim() ||
//       !zipCode?.trim()
//     ) {
//       alert('Please fill in all the fields.');
//       return;
//     }

//   setAddressData({
//     fullName  ,
//   mobileNumber,
//   address: newAddress,
//   zipCode,
// });

//     if (isEditing) {
//       setNewAddress(newAddress);
//       setFullName(fullName);
//       setMobileNumber(mobileNumber);
//       setZipCode(zipCode);
//       setIsEditing(null); 
//       setShowModal(false); 
//       resetAddressForm(); 
//     }
//      else {
//         if (addresses.length >= 1) {
//           alert('You can only add up to 1 address.');
//           return;
//         }
   
//       const newAddr = {
//         id: uuidv4(),
//         fullName,
//         mobileNumber,
//         address: newAddress,
//         zipCode, 
//       };
    
//       setAddresses(prev => [...prev, newAddr]);
//   }    
//       resetAddressForm();
//       setIsEditing(false);
//       setShowModal(false);
//     };

  const resetAddressForm = () => {
    setApartmentName('');
    setApartmentAddress(''); 
    setMobileNumber('');
    setPinCode('');
    setConsentPersonName('');
    setNumberOfFlats('');
    setTotalAmount('');
  };
  
  const handleAddressRegister = async () => {

  if (!apartmentName || !apartmentAddress || !pinCode || !mobileNumber || !consentPersonName || !numberOfFlats) {
    alert("Please fill in all required fields.");
    return; 
  }
  // if (personName.trim().toLowerCase() === 'guest') {
  //   alert("Please Change Your Full Name.");
  //   return;
  // }  

  if (!/^\d{6}$/.test(pinCode)) {
    alert("Pincode must be exactly 6 digits.");
    return;
  }
  
    const payload3 = {
      id: "string",
      userId: userId,
      apartmentMaintenanceId: "string",
      date: new Date(),
      Status: "Open",
      apartmentName: apartmentName,
      apartmentAddress: apartmentAddress,
      state: "Andhra Pradesh",
      district: "Visakhapatnam",
      pinCode: pinCode,
      consentPersonName: consentPersonName,
      mobileNumber: mobileNumber,
      numberOfFlats: numberOfFlats,
      totalAmount: totalAmount.toString(),
      paymentId: "",
      IsSubscription: "No",
      paidAmount: "",
      SubscriptionDate: "",
    };
  
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ApartmentMaintenance/CreateApartmentMaintence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload3),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error("Failed to Register address.");
      }
      alert("Apartment Registration Done Successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error Register address:", error);
      alert("Failed to Register address. Please try again later.");
    }
  };

  const handleAddressEdit = async () => {  
    if (!/^\d{6}$/.test(pinCode)) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }
  
      const updatedAddress = {
        id: id,
        address: apartmentAddress,
        apartmentName,
        consentPersonName,
        mobileNumber,
        pinCode,
        numberOfFlats,
      };
    
      const payload3 = {
        id: id,
        Date: "string",
        UserId: userId,
        Status: "Open",
        ApartmentMaintenanceId: apartmentMaintenanceId,
        apartmentName: apartmentName,
        apartmentAddress: apartmentAddress,
        state: "Andhra Pradesh",
        district: "Visakhapatnam",
        pinCode: pinCode,
        consentPersonName: consentPersonName,
        mobileNumber: mobileNumber,
        numberOfFlats: numberOfFlats,
        totalAmount: totalAmount.toString(),
        paymentId: "",
        isSubscription: "",
        paidAmount: "",
        SubscriptionDate: "",
      };
    
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ApartmentMaintenance/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload3),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error("Failed to edit address.");
        }
    
        setAddresses(prev =>
          prev.map(addr => addr.id === id ? updatedAddress : addr)
        );
    
        setAddressData(updatedAddress);
        alert("Address Updated Successfully!");
        setShowModal(false);
        resetAddressForm();
        setIsEditing(false);
        setEditingAddressId(null);
      } catch (error) {
        console.error("Error editing address:", error);
        alert("Failed to edit address. Please try again later.");
      }
    };
    

useEffect(() => {
  const storedMobileNumber = localStorage.getItem('mobileNumber');
  if (storedMobileNumber) {
    setMobileNumber(storedMobileNumber);
  }
}, []);

const total = Number(numberOfFlats) * 1;
const isFormDisabled = isSubscription !== "Yes";

  useEffect(() => {
    return () => {  
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [uploadedFiles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
    <div className="d-flex flex-row justify-content-start align-items-start">
       {/* Sidebar for larger screens */}
       {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu">
          <Sidebar userType={selectedUserType} />
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
                <Sidebar userType={selectedUserType} />
              </div>
          )}
        </div>
      )} 

      {/* Main Content */}
      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
      <h1 className="text-center mb-2">Apartment Common Area Maintenance</h1>
      {/* Ticket Form */}
      {/* <Form > */}
        {/* Display primary address with "Change Address" link */}
         <div className="d-flex justify-content-between align-items-center">
                        <label>Address <span className="req_star">*</span></label>
                        <div className='d-flex justify-content-between'>                        
                          <Button variant="success m-1 text-white" onClick={() => setShowModal(true)} disabled={isRegisterDisabled}>
                          Register
                        </Button>
                        {/* <Button
                          variant={isSubscription === "No" && isRegisterDisabled ? "danger" : "primary"}
                          className={`m-1 text-white ${
                            isSubscription === "No" && isRegisterDisabled && shouldBlink ? "blinking-button" : ""
                          }`}
                          onClick={() => window.location.href = `https://localhost:7155/ApartmentSubscription/${id}`}
                          disabled={!isRegisterDisabled || isSubscription === "Yes"}
                        >
                          Subscription
                        </Button> */}
                          
                        <Button
                          variant={isSubscription === "No" && isRegisterDisabled ? "danger" : "primary"}
                          className={`m-1 text-white ${
                            shouldBlink ? "blinking-button" : ""
                          }`}
                          onClick={() => window.location.href = `https://handymanserviceproviders.com/ApartmentSubscription/${id}`}
                          disabled={!isRegisterDisabled || isSubscription === "Yes"}
                        >
                          Subscription
                        </Button>

                        </div>
              {/* Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Address' : 'Register'}</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Apartment Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={apartmentName}
                        onChange={(e) => setApartmentName(e.target.value)}
                        placeholder="Enter Apartment Name"
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Apartment Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={apartmentAddress}
                        onChange={(e) => setApartmentAddress(e.target.value)}
                        placeholder="Enter Apartment Address"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        value={pinCode}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/\D/g, ""); 
                          if (numericValue.length <= 6) {
                            setPinCode(numericValue);
                          }
                        }}              
                         placeholder="Enter pincode"
                         required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Consent Person Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={consentPersonName}
                        onChange={(e) => setConsentPersonName(e.target.value)}
                        placeholder="Enter Consent Person Name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        name="MobileNumber"
                        placeholder="Enter Mobile Number"
                        maxLength="10"
                        value={mobileNumber}
                        // onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      </Form.Group>

                      <Form.Group className="mb-3">
                      <Form.Label>No Of Flats</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Number Of Flats"
                        value={numberOfFlats}
                        onChange={handleFlatTotal}
                      />
                      </Form.Group>

                      <Form.Group className="mb-3">
                      <Form.Label>Total</Form.Label>
                      <Form.Control
                        // type="number"
                        placeholder="Total"
                        value={total}
                        readonly
                      />
                      </Form.Group>

                      {/* <Form.Group className="mb-3">
                      <Form.Label>Rate</Form.Label>
                      <Form.Control
                        className="form-control"
                        placeholder="rate"
                        value={flats}
                        readOnly
                        // onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                      <Form.Control
                        type="hidden"
                        name="UserId"
                        className="form-control"
                        placeholder="UserId"
                        value={guestCustomerId}
                      />
                    </Form.Group> */} 
                       <Button 
                          type="button" 
                          variant="primary" 
                          onClick={isEditing ? handleAddressEdit : handleAddressRegister}
                        >
                          {isEditing ? 'Edit Address' : 'Register'}
                        </Button>

                  </Form>
                </Modal.Body>
              </Modal>
                      </div>
        
                  <div className="p-3 border rounded bg-light">
                  {Array.isArray(addresses) &&
                    addresses.map((address) => (
                      <div key={address.id}
                          className="list-group-item d-flex justify-content-between align-items-center bg-white text-dark"
                        >
                          <div>
                            {/* <span className="m1-2">{address.id}</span>
                            <br /> */}
                            <span className="ml-2">{address.apartmentName}</span>
                            <br />
                            <span className="ml-2">{address.apartmentAddress}</span>
                            <br />
                            <span className="ml-2">{address.pinCode}</span>
                            <br />
                            <span className="ml-2">{address.consentPersonName}</span> 
                            <br />
                            <span className="ml-2">{address.mobileNumber}</span> 
                            <br />
                            {/* <span className="ml-2">{address.numberOfFlats}</span> 
                            <br />
                            <span className="ml-2">{address.totalAmount}</span>  */}

                          </div>
                          <div className="text-end">
                          {addresses.map((address) => (
                            <button
                              key={address.id}
                              className="btn btn-warning text-white btn-sm mx-1"
                              onClick={() => {
                                setId(address.id);
                                setApartmentName(address.apartmentName);
                                setApartmentAddress(address.apartmentAddress);

                                setConsentPersonName(address.consentPersonName);
                                setMobileNumber(address.mobileNumber);
                                setPinCode(address.pinCode);
                                setNumberOfFlats(address.numberOfFlats);
                                setTotalAmount(address.totalAmount);
                                setIsEditing(true);
                                setShowModal(true);
                              }}
                            >
                              {address.apartmentAddress === "" ? "" : "Edit Address"}
                            </button>
                          ))}
                      </div> 
                        </div>
                      ))}       
                      </div>

        {/* Subject */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Subject</label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
                disabled={isFormDisabled}
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
            value={formData.details}
            onChange={handleChange}
            rows="4"
            placeholder="Enter details"
            required
            disabled={isFormDisabled}
          />
        </Form.Group>

        {/* Category */}
        <Row>
          <Col md={6}>
            <Form.Group>
              <label>Category</label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isFormDisabled}
              >
                <option value="">Select Category</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
                {/* <option>Painting</option>
                <option>Interior</option>
                <option>Pest Control</option>
                <option>Electronics Appliance Repairs</option>
                <option>Tiles Repairs</option>
                <option>Civil Works</option>
                <option>Water Proofing Works</option> */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

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
                disabled={isFormDisabled}
              >
                <option value="">Select</option>
                <option value="Customer Care">Customer Care</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* File Upload */}
        <div className="form-group">
          <label className="text-danger m-2">Upload your Query Photos<span className="req_star">*</span></label>
          <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                required
                disabled={isFormDisabled}
              />
              {showAlert && (
                <div className="alert alert-danger  mt-2">
                  Please click the <strong>Upload Files</strong> button to upload the selected images.
                </div>
              )}
          
    <label className="text-danger m-2 fs-5">
      If any Videos Forward to Whatsapp Number
      <br />
      <span className="text-success" 
      // onClick={handleWhatsAppClick} 
      style={{ cursor: 'pointer' }}>
        <WhatsAppIcon />
        <strong className="m-2" style={{textDecoration: 'underline'}}>{phoneNumber}</strong>
      </span>
    </label>
  
              <div className="mt-2">
                {ticketPhotos.map((file, index) => (
                <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleUploadFiles}
                disabled={loading || ticketPhotos.length === 0}
              >
                {loading ? 'Uploading...' : 'Upload Files'}
              </button>
          </div>

        {/* File Preview
        <div className="preview-container mt-3">
          {uploadedFiles.length > 0 &&
            uploadedFiles.map((file, index) => {
              const fileUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="file-preview">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleFileDelete(index)}
                  >
                    Delete
                  </button>
                  <div className="mt-2">
                     Preview the file (image or video) 
                    {file.type.startsWith('image') && (
                      <img
                        src={fileUrl}
                        alt={file.name}
                        className="img-fluid"
                        style={{ maxWidth: '200px' }}
                      />
                    )}
                    {file.type.startsWith('video') && (
                      <video
                        controls
                        src={fileUrl}
                        className="img-fluid"
                        style={{ maxWidth: '200px' }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div> */}
{/* 
        <div className="radio">
      <label className="m-1">
        <input
          className="form-check-input m-2 border-dark"
          type="radio"
          name="RequestType"
          value="With Material" // Unique value
          checked={requestType === "With Material"} // Binding state
          onChange={(e) => setRequestType(e.target.value)} // Update state
          required
        />
        With Material
      </label>

      <label className="m-1">
        <input
          className="form-check-input m-2 border-dark"
          type="radio"
          name="RequestType"
          value="Without Material" // Unique value
          checked={requestType === "Without Material"} // Binding state
          onChange={(e) => setRequestType(e.target.value)} // Update state
        />
        Without Material
      </label>
    </div> */}

        {/* Get Quote Button */}
        <div className="mt-4">
          <Button variant="success" type="submit" 
          onClick={handleApartmentTicket}
          disabled = {isSubmitting}>
 {isSubmitting ? 'Submitting...' : 'Get Quote'}          </Button>
        </div>
      </div>

    </div>
    <Footer /> 

{/* Styles for floating menu */}
<style jsx>{`
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
        .menu-item {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .menu-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default ApartmentRaiseTicket;