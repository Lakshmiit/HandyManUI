import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import image from './img/technician.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const CustomerTicketTrack = () => {
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
  const [rating, setRating] = useState('');
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
  const [selectedStatus] = useState('');
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
  const [technicianId, setTechnicianId] = useState('');
  const [dealerId, setDealerId] = useState('');


  useEffect(() => {
        console.log(technicianFullName,dealerData, loading,id,technicianData, deliveryData, dealerStatus, technicianAddress, selectedSlot, paymentData);
      }, [technicianFullName,dealerData, loading,id,technicianData, deliveryData, dealerStatus, technicianAddress, selectedSlot, paymentData]);
  

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
        setTicketId(data.raiseTicketId);  // Setting ticketId here
        setDistrict(data.district);
        setZipcode(data.zipCode);
        setAddress(data.address);
        setSubject(data.subject);
        setDetails(data.details);
        setId(data.id);
        setTechnicianId(data.technicianList);
        setDealerId(data.dealerList);
        setCategory(data.category);
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setFullName(data.customerName);
        setApprovedAmount(data.approvedAmount);
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
        setOption1Day(data.option1Day || '');
        setOption2Day(data.option2Day || '');
        setOption1Time(data.option1Time || '');
        setOption2Time(data.option2Time || '');
        setTechnicianStatus(data.technicianStatus);
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
        setSpecifications(data.materialCollection || [{ material: "", quantity: "", receivedQuantity: "", remainingQuantity: "" }]);
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryData();
}, [ticketId]);  


const isTechnicianChecked = technicianStatus === "Job Completed";
const isDealerChecked = dealerStatus === "Material Delivered";
const atLeastOneChecked = isTechnicianChecked || isDealerChecked;
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
      internalStatus: "Pending",
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
      // Navigate(`/paymentConfirmation/${raiseTicketId}/${userType}`)
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
    //  const selectedSpecifications = specifications.filter((spec) => spec.isSelected);
  
  const payload1 = {

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
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/DeliveryNote/${id}`, {
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
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to create the delivery. Please try again later.');
  }
};

const handleBothActions =  (e) => {
  e.preventDefault();
  handleSaveTicket(e);
  handleUpdateTicket(e);
};

  // const handleStatusChange = (event) => {
  //   setSelectedStatus(event.target.value);
  // }; 

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
<h2 className="title mb-4">RAISE A TICKET(Customer)</h2>
    <div className="booking-confirmation p-4">
      <p className='text-center fs-5'><strong className='name'>Track Ticket Status</strong></p>

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
    </td>
</tr>

        </tbody>
      </table>
    
        <div className="form-group m-2">
          <label className='section-title'>Required Materials Details</label>
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

{/* <h3 className="section-title">Invoice Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Invoice Number</strong></td>
            <td></td>
            </tr>
            <tr>
            <td><strong>Invoice Date</strong></td>
            <td></td>
            </tr>
        </tbody>
      </table>
      <button className='btn btn-warning fs-5 m-2'>Upload Invoice</button>
      <button className='btn btn-warning m-2 fs-5' title='save'>Save</button> */}
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
            className="form-control text-end w-50"
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
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td><strong>Aadhar Number</strong></td>
                        <td>{aadharNumber}</td>
                    </tr>
                </tbody>
            </table>
        </div> 
        
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
        
          <h3 className='section-title mt-2'>Ticket Closing Status</h3>
          <div className='d-flex flex-column m-1'>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value="Material Delivered"
          checked={isDealerChecked || !atLeastOneChecked} 
          readOnly          />
          Material Delivered
          </label>
          <label className="fs-5">
          <input type="checkbox" 
          className="form-check-input m-2 border-dark"
          value='Technician Work Completed'
          checked={isTechnicianChecked || !atLeastOneChecked} 
          readOnly           />
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
          </label> */}
        </div>
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
          <div className='d-flex flex-row align-items-center gap-5'> 
          <button className='btn btn-warning me-2 fs-5' title='save' onClick={handleBothActions}>Save</button>
          </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CustomerTicketTrack;