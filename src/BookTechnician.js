import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for modal
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for addresses
import {
  Dashboard as MoreVertIcon,
} from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Sidebar from './Sidebar';
import { useParams, useNavigate} from 'react-router-dom';
const AddressManager = () => {
 const Navigate = useNavigate(); 
//  const {id} = useParams();
  const {selectedUserType} = useParams();
 const {userType} = useParams();
 const [error, setError] = useState("");
 const [isChecked, setIsChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { customerId } = useParams(); 
 const [raiseTicketId, setRaiseTicketId] = useState('');
 const [addresses, setAddresses] = useState([]);
 const [bookTechnicianId, setBookTechnicianId] = useState('');
 const [ticketId] = useState('');
const [newAddress, setNewAddress] = useState('');
const [mobileNumber, setPhoneNumber] = useState('');
  const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState("");
  const [descriptionId, setDescriptionId] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([{jobDescription: "",rate: "",discount: "",afterDiscount: "", remarks: "", moreInfo: ""}])
  const remarksRef = useRef(null);
  const moreInfoRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showSecondaryAddresses, setShowSecondaryAddresses] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [jobDescriptions, setJobDescriptions] = useState([]);
// const [response, setResponse] = useState(null);


  useEffect(() => {
    console.log(ticketId, fullName, bookTechnicianId, mobileNumber, raiseTicketId);
  }, [ticketId, fullName, bookTechnicianId,  mobileNumber, raiseTicketId]);

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
    //  alert(JSON.stringify(data));
        console.log(data);
        const addresses = Array.isArray(data) ? data : [data];
        
        // Format addresses if necessary
        const formattedAddresses = addresses.map((addr) => ({
          id: addr.addressId, // Use addressId
          type: addr.isPrimaryAddress ? 'primary' : 'secondary',
          address: addr.address,
          state: addr.state,
          district: addr.district,
          zipCode: addr.zipCode, 
          mobileNumber : addr.mobileNumber,
        }));

        setAddresses(formattedAddresses);
        // alert(JSON.stringify(formattedAddresses));
        const customerName = Array.isArray(data) ? data[0]?.fullName || '' : data.fullName || '';
        setFullName(customerName);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomerData();
  }, [customerId]);

  
  useEffect(() => {
    if (remarksRef.current) {
      remarksRef.current.style.height = "auto";
      remarksRef.current.style.height = `${remarksRef.current.scrollHeight}px`;
    }
    if (moreInfoRef.current) {
      moreInfoRef.current.style.height = "auto";
      moreInfoRef.current.style.height = `${moreInfoRef.current.scrollHeight}px`;
    }
  }, [selectedJobs]);
  
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
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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
      // name,
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
    setPhoneNumber('');
  };

  useEffect(() => {
    if (category) {
      fetchJobsByCategory(category);
    }
  }, [category]);

  const fetchJobsByCategory = async (selectedCategory) => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/UploadJobDescriptionBookTechnician/GetSelctedJobsByCategory?Category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log("Fetched Jobs:", data);
      const extractedJobs = data.flatMap((item) => item.selectedJobs);
      setJobDescriptions(extractedJobs);
      //  alert(JSON.stringify(extractedJobs));
      setDescriptionId(data[0].id);
      // setRemarks(data[0].remarks);
      // setMoreInfo(data[0].moreInfo);
      if (data.length > 0) {
        setSelectedJobs(data[0].selectedJobs || []);
      } else {
        setSelectedJobs([]);
      } 
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };



  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...selectedJobs];
  
    if (field === "jobDescription") {
      const selectedJob = jobDescriptions.find((job) => job.jobDescription === value);
  
      if (selectedJob) {
        updatedJobs[index] = {
          ...selectedJob,
          jobDescription: value,
          rate: selectedJob.rate,
          discount: selectedJob.discount || "",
          afterDiscount: selectedJob.afterDiscount || "",
          remarks: selectedJob.remarks || "",         
          moreInfo: selectedJob.moreInfo || ""       
        };
      }
    } else {
      updatedJobs[index][field] = value;
    }
  
    setSelectedJobs(updatedJobs);
  };
  
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory) {
      setError("");
    }
  };


  const phoneNumber = '7989328864';  // Phone number
  // Generate ticket ID in the format VSKPAKP002
  const ticketIdPrefix = "VSKPAPREFV";
  const ticketIdSuffix = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  const ticketIds = `${ticketIdPrefix}${ticketIdSuffix}`;

  // Generate WhatsApp link with the ticket ID
  const generateWhatsAppLink = (ticketId, phoneNumber) => {
    const message = `Hello, I'd like to continue uploading my video for ticket: ${ticketId}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };
  const handleWhatsAppClick = () => {
    // handleSaveWhatsapp();
    const link = generateWhatsAppLink(ticketIds, phoneNumber);
    window.open(link, '_blank');
  };

const handleUpdateJobDescription = async (e) => {
  e.preventDefault();

  const primaryAddress = addresses.find((addr) => addr.type === "primary");
  const state = primaryAddress?.state || "";
  const district = primaryAddress?.district || "";
  const pincode = primaryAddress?.zipCode || primaryAddress?.pincode || "";
  const mobileNumber = primaryAddress?.mobileNumber || primaryAddress?.mobileNumber || "";


  if (!category) {
    setError("Must select a category");
    return;     
}
  setError(""); 

  if (!isChecked) {
      alert("You must accept the terms and conditions before submitting.");
      return;
    }

  const payload1 = {
    id: descriptionId,
    bookTechnicianId: "string",
    date: new Date(),
    customerName: fullName,
    address: addresses.find((addr) => addr.type === 'primary')?.address || '',
    category: category,
    status: "Open",
    assignedTo: "",
    customerId: customerId,
    state: state,
    district: district,
    zipCode: pincode,
    phoneNumber: mobileNumber,
    remarks: selectedJobs[0].remarks,
    discount: selectedJobs[0].discount,
    moreInfo: selectedJobs[0].moreInfo,
    afterDiscount: selectedJobs[0].afterDiscount,
    jobDescription: selectedJobs[0].jobDescription,
    rate: selectedJobs[0].rate,
    paymentMode: "",
    approvedAmount: "",
    utrTransactionNumber: "",
    technicianConfirmationCode: "",
  };

  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BookTechnician/CreateBookTechnician`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload1),
    });

    if (!response.ok) {
      throw new Error('Failed to Book Technician.');
    }
    const data = await response.json(); 
    setBookTechnicianId(data.bookTechnicianId); 
    setRaiseTicketId(data.raiseTicketId);
    // Show alert message with the correct ticketId
    window.alert(`Ticket has been submitted successfully! Your reference number is ${data.bookTechnicianId}. Technician will contact you shortly.`);
        Navigate(`/bookTechnicianPaymentPage/${data.raiseTicketId}/${userType}`)
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to Book Technician. Please try again later.');
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
      setFullName(addressToEdit.technicianFullName);
      setShowModal(true);
      handleAddressDelete(id); 
    }
  };



//   const handleJobChange = (index, field, value) => {
//     const updatedJobs = [...selectedJobs];
//     updatedJobs[index][field] = field === "rate" || field === "discount" ? parseFloat(value) || 0 : value;

//     if (field === "rate" || field === "discount") {
//         const rate = parseFloat(updatedJobs[index].rate) || 0;
//         const discount = parseFloat(updatedJobs[index].discount) || 0;
//         updatedJobs[index].afterDiscount = (rate - (rate * discount) / 100).toFixed(2);
//     }

//     setSelectedJobs(updatedJobs);
// };

//   useEffect(() => {
//     return () => {
//       uploadedFiles.forEach((file) => URL.revokeObjectURL(file));
//     };
//   }, [uploadedFiles]);

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
      <h1 className="text-center mb-2">Book A Technician</h1>
      {/* Ticket Form */}
      {/* <Form  > */}
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
        {/* <Row>
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
        </Row> */}

        {/* Details */}
        {/* <Form.Group>
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
        </Form.Group> */}

        {/* Category */}
        <Row>
          <Col md={6}>
            <Form.Group>
              <label>Category<span className="req_star">*</span></label>
              <Form.Control
                as="select"
                name="category"
                value={category}
                onChange={handleCategoryChange}               
                required
              >
                <option value="">Select Category</option>
                <option>Plumbing and Sanitary</option>
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
              {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
            </Form.Group>
          </Col>
        </Row>

        {selectedJobs.length > 0 ? (
        <div>
            {selectedJobs.map((job, index) => (
            <div key={index}>
            {/* Job Description */}
            <div className="form-group">
              <label>Job Description<span className="req_star">*</span></label>
              <select
            className="form-control"
            value={job.jobDescription}
            onChange={(e) => handleJobChange(index, "jobDescription", e.target.value)}
            required
          >
            <option value="Select Job">Select Job</option>
            {jobDescriptions.map((jobOption, i) => (
              <option key={i} value={jobOption.jobDescription}>{jobOption.jobDescription}</option>
            ))}
          </select>
              {/* <input
                type="text"
                className="form-control"
                value={job.jobDescription}
                onChange={(e) => handleJobChange(index, "jobDescription", e.target.value)}
                placeholder="Job Description"
                required
              /> */}
            </div>

            {/* Rate */}
            <div className="form-group">
              <label>Rate<span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={job.rate}
                onChange={(e) => handleJobChange(index, "rate", e.target.value)}
                placeholder="Rate"
                readOnly
              />
            </div>

            {/* Discount */}
            <div className="form-group">
              <label>Discount<span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={job.discount}
                onChange={(e) => handleJobChange(index, "discount", e.target.value)}
                placeholder="Discount"
                readOnly
              />
            </div>

            {/* After Discount */}
            <div className="form-group">
              <label>After Discount<span className="req_star">*</span></label>
              <input type="text"
              className="form-control"
              value={job.afterDiscount}
              onChange={(e) => handleJobChange(index, "afterDiscount", e.target.value)}
              placeholder="After Discount" 
              readOnly
              />
            </div>
        {/* Detailed Job Description */}
         <Form.Group>
          <label>Detailed Job Description</label>
          <textarea
            ref={remarksRef}
            name="remarks"
            className="form-control"
            value={job.remarks}            
            onChange={(e) => handleJobChange(index, "remarks", e.target.value)}
            placeholder="Detailed Job Description"
            style={{
              resize: "none",
              overflow: "auto",
              minHeight: "30px",
              maxHeight: "120px",
            }} 
            readOnly
          />
        </Form.Group>

        {/* Additional Info */}
        <div className="form-group">
              <label>More Info</label>
              <textarea
                ref={moreInfoRef}
                name='moreInfo'
                className="form-control"
                value={job.moreInfo}
                onChange={(e) => handleJobChange(index, "moreInfo", e.target.value)}
                placeholder="Additional Information"
                style={{
                  resize: "none",
                  overflow: "auto",
                  minHeight: "30px",
                  maxHeight: "120px",
                }}
                readOnly
              />
            </div>

            </div>
             ))}
             </div>
        ) : (
          <p>No jobs available for this category.</p>
        )}
        

         <label>
            <input 
            type="checkbox" 
            className="form-check-input border-dark m-2"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            />
            Terms and conditions (T&C).
          </label> 

   
        {/*  Book a Technician */}
        <div>
          <Button variant="success" className="m-2" type="submit" onClick={handleUpdateJobDescription}>
            Book A Technician
          </Button>
          <Button variant='success' className="m-2" onClick={handleWhatsAppClick}><WhatsAppIcon /> WhatsApp</Button>
        </div>
      {/* </Form> */}

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
          <Button variant="primary" 
        //   onClick={handleSaveTicket}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
</div>
  );
};

export default AddressManager;