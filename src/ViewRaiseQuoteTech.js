import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';

const RaiseQuote = () => {
  const [selectedUserType] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const { raiseAQuoteId} = useParams();
  const {technicianId} = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [quoteData, setQuoteData] = useState(null);
  const [otherCharge, setOtherCharge] = useState('');
  const [fixedOtherCharge, setFixedOtherCharge] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [fixedServiceCharge, setFixedServiceCharge] = useState('');
  const [gst, setGST] = useState('');
  const [fixedGST, setFixedGST] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [enterQuoteAmount, setQuote] = useState('');
  const [fixedQuote, setFixedQuote] = useState('');
  const [discount, setDiscount] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [isMaterialType, setIsWithMaterial] = useState('');
  const [zipCode, setzipCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "" }]); 
  const [commentsList] = useState([{updatedDate: new Date(), CommentText: ""}]);
  const [addrRmarks, setAddrRmarks] = useState([{requestedDate: new Date(), remarks: ""}]); 
  const [requestType, setRequestType] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [status, setStatus] = useState('');

  //alksdfjdkfj
  const [subject, setSubject] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    console.log(subject, imageUrls);
  }, [subject, imageUrls]);
  useEffect(() => {
      const fetchticketData = async () => {
        try {
          setLoading(true);
          const [ticketResponse, quoteResponse] = await Promise.all([
            fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`),
            fetch(`${raiseAQuoteId}`)
          ]);
          if (!ticketResponse.ok) {
            throw new Error('Failed to fetch ticket data');
          }
          const data = await ticketResponse.json();
          setTicketData(data);
          setState(data.state);
          setDistrict(data.district);
          setzipCode(data.zipCode);
          setAddress(data.address);
          setSubject(data.subject);
          setId(data.id);
          setCustomerId(data.customerId);
          setIsWithMaterial(data.isMaterialType);
          setAssignedTo(data.assignedTo);
          setStatus(data.status);
          setRequestType(data.requestType || 'Without Material');
          setAttachments(data.attachments);
          setSpecifications(data.materials || [{ material: "", quantity: "" }]);
          //setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
          const imageRequests =
          data.attachments?.map(async (photo) => {
              const Image = await fetch(
                `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
              );
              if (!Image.ok) throw new Error('Failed to fetch image');
              const blob = await Image.blob();
              const imageUrl = URL.createObjectURL(blob);
              return {
                src: photo,
                imageUrl,
              };
            }) || [];
          const images = await Promise.all(imageRequests);
          setImageUrls(images);

          if (!quoteResponse.ok) {
            throw new Error('Filed to fetch quote data');
          }
          const Data = await quoteResponse.json(); 
          setQuoteData(data);
          setQuote(data.enterQuoteAmount);
          setDiscount(data.discount);
          setOtherCharge(data.otherCharge);
          setServiceCharge(data.serviceCharge);
          setGST(data.gst);
          setTotalAmount(data.totalAmount);
        } catch (error) {
          console.error('Error fetching data:', error);
          // window.alert('Failed to load ticket data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchticketData();
    }, [raiseTicketId, raiseAQuoteId]);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [uploadedFiles]);

  const calculateTotalPrice = (quote, discountPercentage, otherCharges, serviceChargePercentage, gstPercentage) => {
    const discountAmount = quote * (discountPercentage / 100); 
    const priceAfterDiscount = quote - discountAmount; 
    const priceAfterOtherCharges = priceAfterDiscount + otherCharges; 
    const serviceCharge = priceAfterOtherCharges * (serviceChargePercentage / 100); 
    const priceAfterServiceCharge = priceAfterOtherCharges + serviceCharge;
    const gst = priceAfterServiceCharge * (gstPercentage / 100);
    const total = priceAfterServiceCharge + gst; 
    return { total, discountAmount, serviceCharge, gst }; 
  };

  const handleFixedChange = (setter, fixedSetter) => (e) => {
    const value = parseFloat(e.target.value) || 0; 
    setter(value); 
    let updatedQuote = enterQuoteAmount;
    let updatedDiscount = discount;
    let updatedOtherCharge = otherCharge;
    let updatedServiceCharge = serviceCharge;
    let updatedGST = gst;

    if (setter === setQuote) {
      updatedQuote = value;
      fixedSetter(value);  
    }

    if (setter === setDiscount) {
      updatedDiscount = value;
    }
    if (setter === setOtherCharge) {
      updatedOtherCharge = value;
    }
    if (setter === setServiceCharge) {
      updatedServiceCharge = value;
    }
    if (setter === setGST) {
      updatedGST = value;
    }

    const { total, discountAmount, serviceCharge: calculatedServiceCharge, gst: calculatedGST } = calculateTotalPrice(
      updatedQuote, 
      updatedDiscount, 
      updatedOtherCharge, 
      updatedServiceCharge, 
      updatedGST
    );
    
    if (setter === setDiscount) {
      fixedSetter(discountAmount); 
    } else if (setter === setOtherCharge) {
      fixedSetter(updatedOtherCharge); 
    } else if (setter === setServiceCharge) {
      fixedSetter(calculatedServiceCharge); 
    } else if (setter === setGST) {
      fixedSetter(calculatedGST); 
    }
    setTotalAmount(total);
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
  const handleAddComment = (index, field, value) => {
    const updatedComments = [...addrRmarks];
    updatedComments[index][field] = value;
    setAddrRmarks(updatedComments);
  };
 // Handle form data changes
 const handleChange = (e) => {
  const { name, value } = e.target;
  setTicketData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

if (loading) {
  return <div>Loading...</div>;
}

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Handle file deletion
  const handleFileDelete = (index) => {
    const newUploadedFiles = [...uploadedFiles];
    newUploadedFiles.splice(index, 1);
    setUploadedFiles(newUploadedFiles);
  };

  // Handle preview and confirmation on ticket submission
  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: ticketData.category,
      assignedTo: ticketData.assignedTo,
      id : id,
      status: status,
      InternalStatus: "Assigned",
      TicketOwner: ticketData.customerId,
      CustomerId: customerId,
      state: state,
      isMaterialType: isMaterialType,
      district: district,
      ZipCode: zipCode,
      RequestType: requestType,
      attachments:attachments || [],
      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
      })),
      comments: commentsList.map((comment) => ({
          updatedDate: comment.updatedDate,
          CommentText: comment.CommentText,
      })),
    };
    const quotePayload = {
      raiseAQuoteId: raiseAQuoteId,
      enterQuoteAmount: quoteData.enterQuoteAmount,
      discount: quoteData.discount,
      otherCharge: quoteData.otherCharge,
      serviceCharge: quoteData.serviceCharge,
      gst: quoteData.gst,
      totalAmount: quoteData.totalAmount,
    };
    try {
      
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        
        {
        throw new Error('Failed to save ticket data');
      }
      alert('Ticket saved Successfully!');

      const quoteResponse = await fetch(`${raiseAQuoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotePayload),
      });
      if (!quoteResponse.ok) {
        throw new Error('Failed to Save quote data');
      }
      alert('Quote saved Successfully!');
      alert('Ticket and Quote Updated Successfully!');
    } catch (error) {
      console.error('Error saving  data:', error);
      window.alert('Failed to save the data. Please try again later.')
    }
  };


  const handleSaveTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      id :"string",
      quotedDate: new Date().toISOString(), 
      raiseAQuoteId: "string",
      CustomerId: customerId,
      ticketId: ticketData.raiseTicketId,
      TechnicianId: technicianId,
      enterQuoteAmount: enterQuoteAmount.toString(),
      discount: discount.toString(),
      othercharges: otherCharge.toString(),
      serviceCharges: serviceCharge.toString(),
      gst: gst.toString(),
      totalAmount: totalAmount.toString(),
      addrRmarks: addrRmarks.map((comment) => ({
        requestedDate: comment.requestedDate,
        remarks: comment.remarks,
    })),
    }; 
    try {
      //imageUrls="";
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseAQuote/CreateRaiseAQuote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to save Technician ticket data');
      }
      alert('Ticket  Technician  saved Successfully!');
    } catch (error) {
      console.error('Error saving Technician ticket data:', error);
      window.alert('Failed to save the Technician ticket data. Please try again later.')
    }
  };
  // useEffect(() => {
  //   const fetchAmountData = async () => {
  //     try {
  //       const response = await fetch(``);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch Data');
  //       }
  //       const data = await response.json();
  //       setQuoteData(data);
  //       setQuote(data.enterQuoteAmount);
  //       setDiscount(data.discount);
  //       setOtherCharge(data.otherCharge);
  //       setServiceCharge(data.serviceCharge);
  //       setGST(data.gst);
  //       setTotalAmount(data.totalAmount);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAmountData();
  // },[raiseAQuoteId]);
  const handleBothActions = (e) => {
    e.preventDefault();
    handleUpdateTicket(e);
    handleSaveTicket(e);
  }

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
       {/* Sidebar menu for Larger Screens */}
       {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu">
          <Sidebar userType={selectedUserType}/>
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
                <Sidebar userType={selectedUserType}/>
              </div>
          )}
        </div>
      )}

    <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
      <h1 className="text-center mb-2">View Raise a Quote</h1>

      {/* Ticket Form */}
      <Form onSubmit={handleUpdateTicket}>
        <Row>
            <Col md={12}>
            <Form.Group>
          <label>Customer Ticket ID</label>
          <Form.Control
          type="text"
          name="TicketID"
          value={ticketData.raiseTicketId}
          onChange={handleChange}
          placeholder="Ticket Number"
          required/>
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
                placeholder="Enter subject"
                required
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
            placeholder="Enter details"
            required
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
                value={ticketData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option>Plumbing & Sanitary</option>
                <option>Electrical</option>
                <option>Painting</option>
                <option>Interior</option>
                <option>Carpentry</option>
                <option>Pest Control</option>
                <option>Electronics Appliance Repairs</option>
                <option>Tiles Repairs</option>
                <option>Civil Works</option>
                <option>Water Proofing Works</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/* Assigned To */}
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
              >
                <option value="">Select</option>
                <option value="Customer Care">Customer Care</option>
              </Form.Control>
            </Form.Group> 
          </Col>
        </Row>

        {/* File Upload */}
        <div className="form-group mt-4">
          <label className="text-danger">View Query Photos or Videos</label>
          <div className="d-flex flex-column align-items-center">
            <button
              className="btn btn-warning text-dark"
              onClick={() => document.getElementById('fileInput').click()}
            >
              View
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="d-none"
            />
          </div>
        </div>

        {/* File Preview */}
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
                    {/* Preview the file (image or video) */}
                    {file.type.startsWith('image') && (
                      <img
                        src={fileUrl}
                        alt={file.name}
                        value={attachments}
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

          {/* Radio Buttons */}
          <div className="radio">
      <label className="m-1">
        <input
          className="form-check-input"
          type="radio"
          name="RequestType"
          value="With Material"
          checked={requestType === "With Material"}
          onChange={(e) => setRequestType(e.target.value)}
          required
        />
        With Material
      </label>

      <label className="m-1">
        <input
          className="form-check-input"
          type="radio"
          name="RequestType"
          value="Without Material"
          checked={requestType === "Without Material"}
          onChange={(e) => setRequestType(e.target.value)}
        />
        Without Material
      </label>

          {/* Material Input Fields */}
      {requestType === "With Material" && (
        <div className="form-group">
          <label>Required (Optional)</label>
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
                className="form-control"
                placeholder="Enter Quantity"
                value={spec.quantity}
                onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
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
          <button type="button" className="btn btn-primary" onClick={handleAddMaterial}>
            Add Material
          </button>
        </div>
      )}
    </div>
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
            className="form-control"
            value={enterQuoteAmount}
            onChange={handleFixedChange(setQuote, setFixedQuote)}
            placeholder="Enter Quote Amount"
        />
      </td>
        <td colSpan="2">
        <input
          type="number"
          className="form-control"
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
          className="form-control"
          value={discount}
          onChange={handleFixedChange(setDiscount, setFixedDiscount)}
          placeholder="Enter Discount"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedDiscount}
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
          className="form-control"
          value={otherCharge}
          onChange={handleFixedChange(setOtherCharge, setFixedOtherCharge)}
          placeholder="Enter Other Charges"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedOtherCharge}
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
          className="form-control"
          value={serviceCharge}
          onChange={handleFixedChange(setServiceCharge, setFixedServiceCharge)}
          placeholder="Enter Service Charges"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedServiceCharge}
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
          className="form-control"
          value={gst}
          onChange={handleFixedChange(setGST, setFixedGST)}
          placeholder="Enter GST"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedGST}
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
            value={totalAmount}
            readOnly
            placeholder="Total Amount"
            />
        </td>
        </tr>
        </tbody>
        </table>

       {/* Add Remarks */}
       <div className="form-group">
            <label>Add Remarks</label>
            {addrRmarks.map((comment, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
            <input 
            type="text"
            className="form-control"
            value={comment.remarks}
            placeholder="Comment Text"
            onChange={(e) => handleAddComment(index, "remarks", e.target.value)}
            />
            </div>
          ))}
        </div>
        {/* Send Quote Button */}
        <div className="mt-4">
          <Button onClick={handleBothActions} variant="success" type="submit">
            Send Quote
          </Button>
        </div>
      </Form>
    </div>
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

export default RaiseQuote;
