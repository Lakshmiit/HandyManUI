import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for addresses
import {
  Dashboard as MoreVertIcon,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
const AddressManager = () => {
  const {selectedUserType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { customerId } = useParams(); 
  
 const [addresses, setAddresses] = useState([]);
    
 // {
  //  "fullName": "K R V Satyanarayn ",
  //  "email": "satyanarayana.krv26@gmail.com",
  //  "mobileNumber": "9885803193",
   // "address": "trt",
   // "photoAttachmentId": "e3290014-78c0-4336-b7a3-c0fc8690b1af_technician.png",
   // "userId": "b9c63b8b-9db8-4af2-966c-059448ecafdc",
  //  "userProfileType": "customer"
  //}
//https://otpauthservices20240928024709.azurewebsites.net/api/Customer/customerProfileData?profileType=customer&UserId=b9c63b8b-9db8-4af2-966c-059448ecafdc
  const [newAddress, setNewAddress] = useState('');
  const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [requestType, setRequestType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSecondaryAddresses, setShowSecondaryAddresses] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    details: '',
    category: '',
  });
 // const [showAlert, setShowAlert] = useState(false);
 // const [alertMessage, setAlertMessage] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);

  const API_URL = 'https://handymanapiv2.azurewebsites.net/api/Address/GetAddressById/';

  // Fetch customer profile data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`${API_URL}${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer profile data');
        }
        const data = await response.json();
        console.log(data);
        // Assuming data contains an array of addresses, wrap the data in an array if it's not an array
        const addresses = Array.isArray(data) ? data : [data];
        
        // Format addresses if necessary
        const formattedAddresses = addresses.map((addr) => ({
          id: addr.addressId, // Use addressId
          type: addr.isPrimaryAddress ? 'primary' : 'secondary',
          address: addr.address,
          state: addr.state,
          district: addr.district,
          zipCode: addr.zipCode, // Correct key from pinCode
        }));
  
        // Set the addresses state
        setAddresses(formattedAddresses);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
  
    fetchCustomerData();
  }, [customerId]);
  
    
// Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

  const states = ['Andhra Pradesh', 'Telangana'];
  const districts = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Telangana': ['Hyderabad', 'Warangal', 'Khammam'],
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new address
  const handleAddAddress = () => {
    if (
      newAddress.trim() === '' ||
      addressType.trim() === '' ||
      state.trim() === '' ||
      district.trim() === '' ||
      pincode.trim() === ''
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    if (addresses.length >= 4) {
      alert('You can only add up to 4 addresses.');
      return;
    }

    const newAddr = {
      id: uuidv4(),
      type: addressType,
      address: newAddress,
      state,
      district,
      pincode,
    };

    setAddresses((prevAddresses) => [...prevAddresses, newAddr]);
    resetAddressForm();
    setShowModal(false);
  };

  // Reset address form fields
  const resetAddressForm = () => {
    setNewAddress('');
    setAddressType('');
    setState('');
    setDistrict('');
    setPincode('');
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

  const handleSaveTicket = async (e) => {
    e.preventDefault();
  
    // Ensure all fields are filled before submitting
    if (
      !formData.subject ||
      !formData.details ||
      !formData.category ||
      !assignedTo
    ) {
      window.alert('Please fill in all mandatory fields.');
      return;
    }
  
    // Generate ticket ID in the format VSKPAKP002
    const ticketIdPrefix = "VSKPAKP";
    const ticketIdSuffix = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
    const ticketId = `${ticketIdPrefix}${ticketIdSuffix}`;
  
    const payload = {
      ticketId,
      date: new Date().toISOString(),

      address: addresses.find((addr) => addr.type === 'primary')?.address || '',
      subject: formData.subject,
      details: formData.details,
      category: formData.category,
      assignedTo: assignedTo,
      state:state,
      district:district,
      zipcode:pincode,
      requestType: requestType,
      status:'open',
      SupportTicketId: uuidv4(),
      id: uuidv4(),// Unique identifier for the API call
      customerId: customerId, // Replace with actual customer ID logic
      attachments: uploadedFiles.map((file) => file.name), // Attachments by name (or actual file handling logic)
    };
  
    try {
      const response = await fetch('https://handymanapiv2.azurewebsites.net/api/RaiseTicket/CreateSupportTicket', {
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
      console.log('Ticket created:', data);
  
      // Show alert message and navigate to CustomerProfilePage
      window.alert(`Ticket has been submitted successfully! Your reference number is ${ticketId}. Get Quote will contact you shortly.`);
      window.location.href = 'https://handymanserviceproviders.com/CustomerProfilePage';
    } catch (error) {
      console.error('Error:', error);
      window.alert('Failed to create the ticket. Please try again later.');
    }
  };

  // Handle secondary address selection
  const handleSecondaryAddressSelect = (id) => {
    const updatedAddresses = addresses.map((address) =>
      address.id === id
        ? { ...address, type: 'primary' }
        : address.type === 'primary'
        ? { ...address, type: 'secondary' }
        : address
    );
    setAddresses(updatedAddresses);
    setShowSecondaryAddresses(false); // Collapse secondary addresses view
  };

  // Handle address deletion
  const handleAddressDelete = (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
  };

  // Handle address editing
  const handleAddressEdit = (id) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    if (addressToEdit) {
      setNewAddress(addressToEdit.address);
      setAddressType(addressToEdit.type);
      setState(addressToEdit.state);
      setDistrict(addressToEdit.district);
      setPincode(addressToEdit.pincode);
      setShowModal(true);
      handleAddressDelete(id); // Remove the address to re-add it after edit
    }
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [uploadedFiles]);

  return (
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
      <h1 className="text-center mb-2">Raise a Ticket</h1>

      {/* Ticket Form */}
      <Form onSubmit={handleSaveTicket}>
        {/* Display primary address with "Change Address" link */}
        <Form.Group>
          <label>Address</label>
          <button
          type="button"
            className="btn btn-link ml-2"
            onClick={() => setShowSecondaryAddresses(true)}
          >
            Change Address
          </button>
        </Form.Group>

        {/* Show primary address */}
        {addresses
          .filter((addr) => addr.type === 'primary')
          .map((address) => (
            <div
              key={address.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-white text-dark"
            >
              <div>
                <span className="ml-2">{address.address}</span>
                <br />
                <span className="ml-2">{address.state}</span>
                <br />
                <span className="ml-2">{address.district}</span>
                <br />
                <span className="ml-2">{address.zipCode}</span>
                <br />
                <small className="text-muted">Primary Address</small>
              </div>
            </div>
          ))}

        {/* Show secondary addresses when "Change Address" is clicked */}
        {showSecondaryAddresses && (
          <>
            <div className="list-group">
              {addresses
                .filter((addr) => addr.type === 'secondary')
                .map((address) => (
                  <div
                    key={address.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <input
                        type="radio"
                        name="address"
                        checked={address.type === 'primary'}
                        onChange={() => handleSecondaryAddressSelect(address.id)}
                      />
                      <span className="ml-2">{address.address}</span>
                      <br />
                      <small className="text-muted">Secondary Address</small>
                    </div>
                    <div>
                      <button
                      
                        className="btn btn-warning btn-sm mx-1"
                        onClick={() => handleAddressEdit(address.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleAddressDelete(address.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-3">
              <button
                className="btn btn-success"
                onClick={() => setShowModal(true)}
              >
                Add Address
              </button>
            </div>
          </>
        )}

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
              />
            </Form.Group>
          </Col>
          {/* Assigned To */}

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
          <label className="text-danger">Upload your Query Photos or Videos</label>
          <div className="d-flex flex-column align-items-center">
            <button
            type="button"
              className="btn btn-warning text-dark"
              onClick={() => document.getElementById('fileInput').click()}
            >
              Upload
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
        </div>

        <div className="radio">
      <label className="m-1">
        <input
          className="m-1"
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
          className="m-1"
          type="radio"
          name="RequestType"
          value="Without Material" // Unique value
          checked={requestType === "Without Material"} // Binding state
          onChange={(e) => setRequestType(e.target.value)} // Update state
        />
        Without Material
      </label>
    </div>

        {/* Get Quote Button */}
        <div className="mt-4">
          <Button variant="success" type="submit">
            Get Quote
          </Button>
        </div>
      </Form>

      {/* Address Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newAddress ? 'Edit Address' : 'Add Address'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter address"
            />
          </Form.Group>

          <Form.Group controlId="addressType">
            <Form.Label>Address Type</Form.Label>
            <Form.Control
              as="select"
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
            >
              <option value="">Select Address Type</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control
              as="select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts[state]?.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter pincode"
            />
          </Form.Group>

          <Button type="button" variant="primary" onClick={handleAddAddress}>
            {newAddress ? 'Save Address' : 'Add Address'}
          </Button>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={confirmationModal} onHide={() => setConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Ticket Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to save this ticket?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmationModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleSaveTicket}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

     
    </div>
     {/* Styles for floating menu */}
{/* Styles for floating menu */}
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

export default AddressManager;
