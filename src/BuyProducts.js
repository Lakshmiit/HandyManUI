import React, { useState, useEffect} from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid'; 
import Sidebar from './Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import { Button, Form, Modal } from 'react-bootstrap'; // Import Bootstrap components for modal
import axios from 'axios';

const BuyProduct = () => {
  const navigate = useNavigate();
  const {userType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { productId, selectedUserType } = useParams(); 
  const [category, setCategory] = useState("Electrical items");
  const [productSize, setProductSize] = useState("");
  const [productCatalogue, setProductCatalogue] = useState("");
  const [color, setChooseColor] = useState("");
  const [otherThanProduct, setOtherThanProduct] = useState("");
  const [requiredQuality, setRequiredQuality] = useState("");
  const [units, setUnits] = useState("");
  const [productName, setProductName] = useState("");
  const [showSecondaryAddresses, setShowSecondaryAddresses] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [id, setId] = useState("");
  const { userId } = useParams(); 
  const location = useLocation();
 // Check if there's state passed from ViewProduct page
 useEffect(() => {
  if (location.state) {
    const {
      productName,
      catalogue,
      productSize,
      color,
      otherThanProduct,
      requiredQuality,
      units,
      id,
    } = location.state;
    setProductName(productName);
    setProductCatalogue(catalogue);
    setProductSize(productSize);
    setChooseColor(color);
    setOtherThanProduct(otherThanProduct);
    setRequiredQuality(requiredQuality);
    setUnits(units);
    setId(id);
  }
}, [location.state]);
  // Fetch customer profile data
  useEffect(() => {
    const fetchProfileType = async () => {
      try {
        const API_URL = "https://handymanapiv2.azurewebsites.net/api/Address/GetAddressById/";
        const response = await fetch(`${API_URL}${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer profile data");
        }
        const data = await response.json();
        console.log(data);
        const addresses = Array.isArray(data) ? data : [data];
        const formattedAddresses = addresses.map((addr) => ({
          id: addr.addressId,
          type: addr.isPrimaryAddress ? "primary" : "secondary",
          address: addr.address,
          state: addr.state,
          district: addr.district,
          zipCode: addr.zipCode,
        }));
        setAddresses(formattedAddresses);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (userId) {
      fetchProfileType();
    }
  }, [userId]);

  // Generate ticket ID in the format VSKPAKP002
  const ticketIdPrefix = "VSKPAKP";
  const ticketIdSuffix = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  const ticketId = `${ticketIdPrefix}${ticketIdSuffix}`;

  const handleGetQuotation = async () => {
   
    const primaryAddress = addresses.find((addr) => addr.type === "primary");
    const state = primaryAddress?.state || "";
    const district = primaryAddress?.district || "";
    const pincode = primaryAddress?.zipCode || "";
  
    const payload = {
      BuyProductId: ticketId,
      id: "string",
      Address: primaryAddress?.address || "",
      category,
      status: "Open",
      productName,
      ProductCatalogue: productCatalogue,
      productSize,
      color: color,
      otherThanProduct,
      requiredQuantity: requiredQuality,
      units,
      AddressType: primaryAddress ? "primary" : "secondary",
      State: state,
      District: district,
      ZipCode: pincode,
      CustomerId: "123456789",
      RequestedBy: userId,
    };
  
    try {
      const response = await axios.post(
        "https://handymanapiv2.azurewebsites.net/api/BuyProduct/BuyProductUpload",
        payload
      );
      if (response.status === 200) {
        window.alert(`Quotation submitted successfully! Your reference number is ${ticketId}. Get Quote will contact you shortly.`);
      } else {
        alert("Failed to submit quotation. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quotation:", error);
      alert("An error occurred while submitting the quotation.");
    }
  };
  
  // Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);


  const handleAddToCart = () => {
    alert("Item added to cart!");
  };

   const handleSubmit = (e) => {
     e.preventDefault();
   };

  const states = ['Andhra Pradesh', 'Telangana'];
  const districts = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Telangana': ['Hyderabad', 'Warangal', 'Khammam'],
  };


  // // Handle adding a new address
  // const handleAddAddress = () => {
  //   if (
  //     newAddress.trim() === '' ||
  //     addressType.trim() === '' ||
  //     state.trim() === '' ||
  //     district.trim() === '' ||
  //     pincode.trim() === ''
  //   ) {
  //     alert('Please fill in all the fields.');
  //     return;
  //   }

  //   if (addresses.length >= 4) {
  //     alert('You can only add up to 4 addresses.');
  //     return;
  //   }

  //   const newAddr = {
  //     id: uuidv4(),
  //     type: addressType,
  //     address: newAddress,
  //     state,
  //     district,
  //     pincode,
  //   };

  //   setAddresses((prevAddresses) => [...prevAddresses, newAddr]);
  //   resetAddressForm();
  //   setShowModal(false);
  // };


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
      zipCode: pincode, // Corrected field name for consistency
    };
  
    console.log('New Address:', newAddr); // Debugging
  
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

  // Handle address deletion
  const handleAddressDelete = (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://handymanapiv2.azurewebsites.net/api/Product/GetProductsByCategory?category=${category}`
        );
        setAllProducts(response.data);
        setProductSuggestions(response.data.map((product) => product.productName));
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };
    fetchProducts();
  }, [category]);
  
  useEffect(() => {
    if (productName) {
      setFilteredSuggestions(
        productSuggestions.filter((name) =>
          name.toLowerCase().startsWith(productName.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [productName, productSuggestions]);
  
  const handleProductSelect = (selectedProductName) => {
    setProductName(selectedProductName); // Update the input field to reflect the selected name
    const selectedProduct = allProducts.find(
      (product) => product.productName === selectedProductName
    );
    if (selectedProduct) {
      setProductCatalogue(selectedProduct.catalogue);
      setProductSize(selectedProduct.productSize);
      setChooseColor(selectedProduct.color);
      setId(selectedProduct.id);
    }
    
    setFilteredSuggestions([]);
  };

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {/* Sidebar menu for Larger Screens */}
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
      <h3 className="mb-4">Buy Products</h3>
        <div className="bg-white rounded-3 p-4 bx_sdw w-75">
          <form className="form" onSubmit={handleSubmit}>
            <div className="m-1">
              <div className="d-flex justify-content-between align-items-center">
                <label>Address</label>
                <button
                  type="button"
                  className="btn btn-link ml-2"
                  onClick={() =>  setShowSecondaryAddresses(true)}
                >
                  Change Address
                </button>
              </div>

              

<div className="p-3 border rounded bg-light">
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
              </div>
            </div>

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

  
            <div className="form-group">
              <label>
                Category <span className="req_star">*</span>
              </label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electrical items</option>
                <option>Plumbing Materials</option>
                <option>Sanitary items</option>
                <option>Electronics appliances</option>
                <option>Paints</option>
                <option>Hardware items</option>
                <option>Civil & Waterproofing Materials</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Product Name <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
              />
              {filteredSuggestions.length > 0 && (
                <ul className="list-group mt-2">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleProductSelect(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group">
              <label>
                Product Catalogue <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productCatalogue}
                onChange={(e) => setProductCatalogue(e.target.value)}
                placeholder="Select Product Catalogue"
              />
            </div>

            <div className="form-group">
              <label>
                Product Size <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                placeholder="Select Product Size"
              />
            </div>

            <div className="form-group">
              <label>Color (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={color}
                onChange={(e) => setChooseColor(e.target.value)}
                placeholder="Enter Color"
              />
            </div>

            <button
              type="button"
              className="btn btn-warning text-white w-50 mt-2"
              onClick={() =>
                navigate(`/buyproduct-view/${id}/${userId}/${userType}`, {
                  state: {
                    productName,
                    productCatalogue,
                    productSize,
                    color,
                    otherThanProduct,
                    requiredQuality,
                    units,
                  },
                })
              }
            >
              View Product
            </button>


            <div className="form-group mb-3">
              <label>Other Than Product</label>
              <input
                type="text"
                className="form-control"
                value={otherThanProduct}
                onChange={(e) => setOtherThanProduct(e.target.value)}
                placeholder="Enter Product Name"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>
                  Required Quality <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={requiredQuality}
                  onChange={(e) => setRequiredQuality(e.target.value)}
                  placeholder="Enter Required Quality"
                />
              </div>
              <div className="col-md-6">
                <label>
                  Units <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="Enter Units"
                />
              </div>
            </div>

            <div className="d-flex gap-5 mt-3">
              <button
                type="button"
                className="text-white btn btn-warning w-50"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="text-white btn btn-warning w-50"
                onClick={handleGetQuotation}
              >
                Get Quotation
              </button>
            </div>
          </form>
        </div>
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

export default BuyProduct;
