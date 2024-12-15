import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; 
import AdminSidebar from './AdminSidebar';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import { FaEdit} from 'react-icons/fa'; // Correct icon import
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ForwardIcon from '@mui/icons-material/Forward';
import { Link } from 'react-router-dom';
import './App.css';


const RaiseActionView = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [formData, setFormData] = useState({
    ticketNumber: '',
    subject: '',
    details: '',
    ticketOwner: '',
    category: '',
    attachments: '',
    comments: '',
  });
  const [commentsList, setCommentsList] = useState([]);
  const [isWithMaterial, setIsWithMaterial] = useState("Without Material"); 

  // Handle material input change
  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = value;
    setMaterials(updatedMaterials);
  };

  // Handle quantity input change
  const handleInputChange = (index, value) => {
    const updatedQuantities = [...quantity];
    updatedQuantities[index] = value;
    setQuantity(updatedQuantities);
  };

  // Add new material and quantity fields
  const handleAddMaterial = () => {
    setMaterials([...materials, ""]);
    setQuantity([...quantity, ""]);
  };

  // Remove a material and its corresponding quantity
  const handleRemoveMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    const updatedQuantities = quantity.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
    setQuantity(updatedQuantities);
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveTicket = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled before submitting
    if (
      !formData.ticketNumber ||
      !status || 
      !formData.subject ||
      !formData.details ||
      !formData.ticketOwner ||
      !formData.category ||
      !formData.attachments ||
      !assignedTo
    ) {
      window.alert('Please fill in all mandatory fields.');
      return;
    }
  };

  const handleAddComment = () => {
    if (formData.comments.trim() !== "") {
      setCommentsList([...commentsList, formData.comments]);
      setFormData({ comments: "" }); 
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
        <Form onSubmit={handleSaveTicket}>
        <Row>
            <Col md={6}>
            <Form.Group>
                <label>Ticket No</label>
                <Form.Control
                type="text"
                name="ticketNumber"
                value={formData.ticketNumber}
                onChange={handleChange}
                placeholder="Ticket Number"
                required
                />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group>
              <label>Status</label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option>Open Tickets</option>
                <option>Not Assignes</option>
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
                value={formData.subject}
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
            value={formData.details}
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
                value={formData.ticketOwner}
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
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Attachments */}
        <Row>
          <Col md={12}>
            <Form.Group>
              <label>Attachments</label>
              <Form.Control
                type="text"
                name="attachments"
                value={formData.attachments}
                onChange={handleChange}
                placeholder="Attachments"
                required
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        
        {/* Assigned To */}
        <Row>
        <Col md={12}>
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
                <option value="Technical Agency">Technical Agency</option>
                <option value="Technicians">Technicians</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>


      <div className="radio">
      <label className="m-1">
        <input
          className="form-check-input"
          type="radio"
          name="IsWithMaterial"
          value="With Material"
          checked={isWithMaterial === "With Material"}
          onChange={(e) => setIsWithMaterial(e.target.value)}
          required
        />
        With Material
      </label>

      <label className="m-1">
        <input
          className="form-check-input"
          type="radio"
          name="IsWithMaterial"
          value="Without Material"
          checked={isWithMaterial === "Without Material"}
          onChange={(e) => setIsWithMaterial(e.target.value)}
        />
        Without Material
      </label>

      {/* Material Input Fields */}
      {isWithMaterial === "With Material" && (
        <div className="form-group">
          <label>Required (Optional)</label>
          {materials.map((material, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={material}
                placeholder="Enter Material"
                onChange={(e) => handleMaterialChange(index, e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Quantity"
                value={quantity[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
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
     <Row>
          <Col md={12}>
          <label>Add Comment</label>
            <Form.Group className="d-flex align-items-center">
              <Form.Control
                type="text"
                name="comments"
                className='me-2'
                value={formData.comments}
                onChange={handleChange}
                placeholder="Comments"
                required
              >
              </Form.Control>
              <Button variant='warning text-white' 
              onClick={handleAddComment}
              >
                Enter
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col md={12} className="mt-3">
          <ul>
            {commentsList.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </Col>
      </Row>

        {/* Save Button */}
        <div className="mt-4 text-end">
          <Link to='/raiseTicketNotification' className="btn btn-warning text-white mx-2" title='Back'>
            <ArrowLeftIcon />
          </Link>
          <Link to='/raiseTicketActionView/{ticketId}' className="btn btn-warning text-white mx-2" title='Edit'> 
          <FaEdit />
          </Link>
          <Link className="btn btn-warning text-white mx-2" title='Forward'>
            <ForwardIcon />
          </Link>
          <Link className="btn btn-warning text-white mx-2"  type="submit" title="Save">
            <SaveAsIcon />
          </Link>
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
