import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; 
import AdminSidebar from './AdminSidebar';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import { FaEdit} from 'react-icons/fa'; // Correct icon import
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ForwardIcon from '@mui/icons-material/Forward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link, useParams } from 'react-router-dom';
import './App.css';

const RaiseActionView = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {raiseTicketId} = useParams();
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('')
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [isMaterialType, setIsWithMaterial] = useState('');
  const [ticketData, setTicketData] = useState(null); 
  const [requestType, setRequestType] = useState('Without Material');
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "" }]); 
  const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]); 
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [customerId, setCustomerId] = useState(''); 
  const [zipCode,setzipCode]=useState('');
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState('');


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
        setDistrict(data.district);
        setzipCode(data.zipCode);
        setAddress(data.address);
        setId(data.id);
        setCustomerId(data.customerId);
        setIsWithMaterial(data.isMaterialType);
        setAssignedTo(data.assignedTo);
        setStatus(data.status);
        setRequestType(data.requestType || 'Without Material');
        setAttachments(data.attachments);
        setSpecifications(data.materials || [{ material: "", quantity: "" }]);

        //setSpecifications(productData.specifications || [{ label: "", value: "" }]);
        setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}])
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


  // useEffect(() => {
  //   return () => {
  //     uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
  //   };
  // }, [uploadedFiles]);

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
    const updatedComments = [...commentsList];
    updatedComments[index][field] = value;
    setCommentsList(updatedComments);
  };
    
  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // const handleFileUpload = (event) => {
  //   const files = event.target.files; 
  //   setTicketData((prevData) => ({
  //     ...prevData,
  //     attachments: files, 
  //   }));
  // };

  // // Handle file deletion
  // const handleFileDelete = (index) => {
  //   const newUploadedFiles = [...uploadedFiles];
  //   newUploadedFiles.splice(index, 1);
  //   setUploadedFiles(newUploadedFiles);
  // };

  const handleSaveTicket = async (e) => {
    e.preventDefault();
    
    const payload = {
      RaiseTicketId: ticketData.raiseTicketId,
      date: new Date().toISOString(),
      address: address,
      subject: ticketData.subject,
      details: ticketData.details,
      category: ticketData.category,
      assignedTo,
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
          commentText: comment.commentText,
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
    } catch (error) {
      console.error('Error saving ticket data:', error);
      window.alert('Failed to save the ticket data. Please try again later.')
    }
  };


  const handleForwardTicket = async () => {
    try {
      const response = await fetch(``, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...ticketData,
          assignedTo: 'Technician',
          status: 'Assigned',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to Forward the ticket');
      }
      alert('Ticket forwared to Technician!');
    } catch (error) {
      console.error('Error forwarding the ticket:', error);
    }
  };

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
        <h1 className="text-center mb-2">Raise a Ticket Action View</h1>
        <Form>
        <Row>
            <Col md={6}>
            <Form.Group>
                <label>Ticket ID</label>
                <Form.Control
                type="text"
                name="ticketID"
                value={ticketData.raiseTicketId}
                onChange={handleChange}
                required
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
            placeholder="Details"
            required
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
                value={ticketData.customerId}
                onChange={handleChange}
                placeholder="Ticket Owner"
                required
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
                required
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Attachments */}
        <div className="form-group mt-4">
          <label className="text-danger">View/Download Attachments</label>
          <div className="d-flex flex-column">
            {imageUrls.length > 0 ? (
              imageUrls.map((image, index) => (
                <div key={index} className="d-flex flex-column align-items-center mb-3">
                  <span>{image.src}</span> 
                    <img
                      src={image.imageUrl}
                      alt={image.src}
                      className="img-fluid"
                      style={{ maxWidth: '300px' }}
                    />
                     <button
                        className="btn btn-warning text-white"
                        onClick={() => document.getElementById('fileInput').click()}
                      >
                        <FileDownloadIcon /> View/Download
                      </button>
                </div>
              ))
            ) : (
              <p className="text-muted">No attachments available.</p>
            )}
          </div>
        </div>

        
        {/* Assigned To */}
        <Row>
        <Col md={12}>
            <Form.Group>
              <label>Assigned To</label>
              <Form.Control
                as="select"
                name="assignedTo"
                value={ticketData.assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option>Select Assigned</option>
                <option>Customer Care</option>
                <option>Customer</option>
                <option>Technical Agency</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>


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
                onChange={(e) => handleMaterialChange(index,"quantity", e.target.value)}
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

     {/* Add Comments */}
  
     <div className="form-group">
          <label>Add Comment</label>
          {commentsList.map((comment, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              {/* <input
                type="date"
                className="form-control"
                value={comment.updatedDate.toISOString().split('T')[0]}
                placeholder="Enter Date"
                onChange={(e) => handleAddComment(index, "updatedDate", e.target.value)}
              /> */}
              <input
                type="text"
                className="form-control"
                placeholder="Comment Text"
                value={comment.commentText}
                onChange={(e) => handleAddComment(index,"commentText", e.target.value)}
              />
            </div>
          ))}
        </div>
        {/* <Row>
         <Col md={12} className="mt-3">
            {commentsList.map((comment, index) => (
             <p key={index}>
              <strong>{comment.updatedDate}</strong> {comment.commentText}
             </p>
            ))}
        </Col> 
      </Row> */}

        {/* Save Button */}
        <div className="mt-4 text-end">
          <Link to='/raiseTicketNotification' className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link>
          <Button onClick={handleForwardTicket} className="btn btn-warning text-white mx-2" title='Forward'>
            <ForwardIcon />
          </Button>
          <Button onClick={handleSaveTicket} type="submit" className="btn btn-warning text-white mx-2" title="Save">
            <SaveAsIcon />
          </Button>
        </div>
        </Form>

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
    </div>
  );
};

export default RaiseActionView;
