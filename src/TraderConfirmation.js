import React, { useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
// import image from './img/technician.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams } from "react-router-dom";

const TraderConfirmation = () => {
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
  const [selectedStatus, setSelectedStatus] = useState('');
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
  

 useEffect(() => {
      console.log(loading, dealer, id,technicianData, technicianFullName,deliveryData, dealerStatus,paymentData,showAlert, technicianAddress, technicianPhotoId, selectedSlot);
    }, [loading, dealer, id,technicianData, technicianFullName, deliveryData,dealerStatus,paymentData,showAlert, technicianAddress, technicianPhotoId, selectedSlot]);

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
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api
/DeliveryNote/GetRaiseTicketForDealer?RaiseTicketId=${ticketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch delivery data');
        }
        const data = await response.json();
        // alert(JSON.stringify(data));
        setDeliveryData(data);
        setId(data.id);
        setDeliveryNoteId(data.deliveryNoteId);
        setOption1Day(data.option1Day);
        setOption2Day(data.option2Day);
        setOption1Time(data.option1Time);
        setOption2Time(data.option2Time);
        setTechnicianStatus(data.technicianStatus);
        setTechnicianAcceptance(data.technicianAcceptance || [{ type: "", technicianRemarks: "" }]);
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


  useEffect(() => {
    const fetchtechnicianData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api

/Technician/GetTechnicianDetailsForInvoice?TechnicianId=${lowestBidder}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const invoiceData = await response.json();
        setTechnicianData(invoiceData);
        setTechnicianName(invoiceData.technicianFullName);
        setAadharNumber(invoiceData.aadharNumber);
        setTechnicianAddress(invoiceData.address);
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
      Address: address,
      Subject: subject,
      Details: details,
      Category: category,
      AssignedTo: "Technical Agency",
      id: raiseTicketId,
      status: status,
      internalStatus: "Technician Approved L1",
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
    // const selectedSpecifications = specifications.filter((spec) => spec.isSelected);
  
  const payload1 = {

    id: id,
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

const handleUploadInvoice = async (e) => {
  e.preventDefault();

const payload2 = {

  id: id,
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
    body: JSON.stringify(payload2),
  });
  if (!response.ok) {
    throw new Error('Failed to create a Uploaded Invoice.');
  }
  alert('Uploaded Invoice saved Successfully!');
} catch (error) {
  console.error('Error:', error);
  window.alert('Failed to create the Uploaded Invoice. Please try again later.');
}
};

const handleBothActions =  (e) => {
  e.preventDefault();
  handleSaveTicket(e);
  handleUpdateTicket(e);
};

const handleStatusChange = (event) => {
  setSelectedStatus(event.target.value);
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
<h2 className="title">TICKET CONFIRMATION SHEET(Trader)</h2>
    <div className="booking-confirmation">
      <p className='text-center fs-5'><strong className='name'>{dealerName}</strong> Your Lowest Quotation Accepted By Customer</p>

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
          {/* <tr> 
            <td><strong>Customer Time Slots </strong></td>
            <td className='time-slot-booking'>
                <div className='timeslots-option d-flex flex-row'>
                <div className='slot m-2 p-2'>
                     <strong><input type='radio' className='form-check-input m-1 border-dark'
                     name='timeslot' value='option1' onClick={() => handleSlotSelection('option1')} />
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

<h3 className="section-title">Invoice Details</h3>
      <table className="customer-details-table">
        <tbody>
            <tr>
            <td><strong>Invoice Number</strong></td>
            <td><input type='text' name='invoiceNumber' 
            className="form-control text-end"
            placeholder='Enter Invoice Number'
            onChange={(e) => SetInvoiceNumber(e.target.value)}/></td>
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
                <div className="alert alert-danger  mt-2">
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
              <button className='btn btn-warning m-1' onClick={handleUploadInvoice}>Save</button>
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
                        <td>{address}</td>
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
          <h3 className='section-title'>Ticket Closing Status</h3>
          <div className='d-flex flex-column m-1'>
        <label className='fs-5'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2"
            value='Material Delivered'
            checked={selectedStatus === 'Material Delivered'}
            onChange={handleStatusChange}
             />
            Material Delivered
            </label>
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
          </div>
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
          <div className='d-flex flex-row align-items-center gap-5'> 
          <button className='btn btn-warning fs-5' title='save' onClick={handleBothActions}>Save</button>
          {/* <button className='btn btn-warning fs-5'title='forward' >Forward</button> */}
          </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default TraderConfirmation; 