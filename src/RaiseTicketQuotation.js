import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import "./App.css";
import AdminSidebar from './AdminSidebar';
import ForwardIcon from '@mui/icons-material/Forward';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {Link, useNavigate, useParams} from 'react-router-dom';

const RaiseQuotation = () => {
  const Navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [id, setId] = useState('');
  const [ticketData, setTicketData] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "" }]);
  const [requestType, setRequestType] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [technicianId, setTechnicianId] = useState(""); 
  const [serviceCharges] = useState("");
  const [gst] = useState("");
  const [totalQuotedAmount, setTotalQuotedAmount] = useState("");
  const [lowestBidder, setLowestBidder] = useState("");
  const [technicianDetails] = useState([
    { technicianId: 'Tech-1', quotedAmount: 12000, serviceCharges: 500, gst: 20, totalQuotedAmount: 110000 },
    { technicianId: 'Tech-2', quotedAmount: 4000, serviceCharges: 200, gst: 425, totalQuotedAmount: 785200 },
    { technicianId: 'Tech-3', quotedAmount: 10000, serviceCharges: 20, gst: 89, totalQuotedAmount: 3581200 },
    { technicianId: 'Tech-4', quotedAmount: 250000, serviceCharges: 1000, gst: 18, totalQuotedAmount: 420148 },
    { technicianId: 'Tech-5', quotedAmount: 3000, serviceCharges: 750, gst: 44, totalQuotedAmount: 953300 },
    { technicianId: 'Tech-6', quotedAmount: 15000, serviceCharges: 1156, gst: 56, totalQuotedAmount: 458230 },
  ]);
  const [addremarks, setAddRemarks] = useState("");
  const [assignedTo, setAssignedTo] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showAlert] = useState(false);
  const [alertMessage] = useState('');
  const [isWithMaterial, setIsWithMaterial] = useState(false);


  useEffect(() => {
    console.log(subject, imageUrls, loading, isWithMaterial);
  }, [subject, imageUrls, loading, isWithMaterial]);

  useEffect(() => {
        const fetchticketData = async () => {
          try {
            const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch ticket data');
            }
            const data = await response.json();
            setTicketData(data);
            // setState(data.state);
            // setDistrict(data.district);
            // setzipCode(data.zipCode);
            // setAddress(data.address);
            setSubject(data.subject);
            setId(data.id);
            setCustomerId(data.customerId);
            setIsWithMaterial(data.isMaterialType);
            setAssignedTo(data.assignedTo);
            setStatus(data.status);
            setRequestType(data.requestType || 'Without Material');
            setAttachments(data.attachments);
            setSpecifications(data.materials || [{ material: "", quantity: "" }]);
            // setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
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
          } catch (error) {
            console.error('Error fetching ticket data:', error);
            // window.alert('Failed to load ticket data. Please try again later.');
          } finally {
            setLoading(false);
          }
        };
        fetchticketData();
      }, [raiseTicketId]);

  useEffect(() => {
    const lowest = technicianDetails.reduce((prev, current) => {
      return current.quotedAmount < prev.quotedAmount ? current : prev;
    });
    setTechnicianId(lowest.technicianId);
    setLowestBidder(lowest.technicianId);
    setTotalQuotedAmount(lowest.quotedAmount + serviceCharges + gst);
  }, [technicianDetails, serviceCharges, gst]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      // address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: ticketData.category,
      assignedTo: ticketData.assignedTo,
      id : id,
      status: status,
      InternalStatus: "Assigned",
      TicketOwner: ticketData.customerId,
      CustomerId: customerId,
      // state: state,
      // isMaterialType: isMaterialType,
      // district: district,
      // ZipCode: zipCode,
      RequestType: requestType,
      attachments:attachments || [],
      materials: specifications.map((spec) => ({
          material: spec.material,
          quantity: spec.quantity,
      })),
      // comments: commentsList.map((comment) => ({
      //     updatedDate: comment.updatedDate,
      //     CommentText: comment.CommentText,
      // })),
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
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.')
    }
  };

  const handleQuotation = () => {
    const quotationData = {
      ticketId: ticketData.raiseTicketId,
      subject: ticketData.subject,
      materials: ticketData.specifications,
    };
    Navigate("/raiseTicketBuyProducts", { state: quotationData });
  };
  
  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [uploadedFiles]);


  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 adm_mnu h-90">
          <AdminSidebar />
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
              <AdminSidebar />
            </div>
          )}
        </div>
      )}

      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
      <h1 className="text-center mb-2">Raise a Ticket Quotations</h1>

      {/* Ticket Form */}
      <Form onSubmit={handleSaveTicket}>
        <Row>
            <Col md={12}>
            <Form.Group>
          <label>Customer Ticket ID</label>
          <Form.Control
          type="text"
          name="customerId"
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
                type="text"
                name="category"
                value={ticketData.category}
                onChange={handleChange}
                placeholder='Category'
                required
              >
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
          <button type="button" className="btn btn-primary m-1"
          onClick={handleQuotation}
          >
            Get Quotation
          </button>
        </div>
      )}
    </div>
    </div>

<table className="table table-bordered">
  <thead>
    <tr colSpan="2">
      <td>Technician ID</td>
      <td>Quoted Amount</td>
      <td>Service Charges</td>
      <td>GST</td>
      <td>Total Quoted Amount</td>
      <td>Lowest Bidder</td>
    </tr>
  </thead>

  <tbody>
    {technicianDetails.map((tech) => (
      <tr key={tech.technicianId}>
        <td>{tech.technicianId}</td>
        <td>{tech.quotedAmount}</td>
        <td>{tech.serviceCharges}</td>
        <td>{tech.gst}</td>
        <td>{tech.totalQuotedAmount}</td>
        <td>{tech.technicianId === lowestBidder ? 'Yes' : 'No'}</td>
      </tr>
    ))}  
  </tbody>

    {/* Technician ID and Total Amount */}
    <tbody>
        <tr>
        <td>Technician ID</td>
        <td colSpan="2">
            <input
            type="text"
            className='form-control text-end'
            value={technicianId}
            readOnly
            placeholder='Technician ID'
            />
        </td>
        <td>Total Amount</td>
        
        <td colspan="3">
            <input
            type="number"
            className="form-control text-end"
            value={totalQuotedAmount}
            readOnly
            placeholder="Total Amount"
            />
        </td>
        </tr>
        </tbody>
        </table>

       {/* Add Remarks */}
       <div className="form-group col-md-6">
            <label>Add Remarks</label>
            <input 
            type="text"
            className="form-control"
            value={addremarks}
            placeholder="Enter Remarks"
            onChange={(e) => setAddRemarks(e.target.value)}
            />
        </div>

        {/* Send Quote Button */}
        <div className="mt-4 text-end">
          <Link to='/quoteNotification' className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          <Link className="btn btn-warning text-white mx-2"  type="submit" title="Save">
            <SaveAsIcon />
          </Link>
          <Link className="btn btn-warning text-white mx-2" title='Forward'>
            <ForwardIcon />
          </Link>
        </div>
      </Form>

      {/* Success Alert */}
      {showAlert && (
        <div className="mt-4 alert alert-info" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  </div>
  );
};

export default RaiseQuotation;
