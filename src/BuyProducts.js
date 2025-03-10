import React, { useState, useEffect} from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid'; 
import Sidebar from './Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import { Button, Form, Modal } from 'react-bootstrap'; // Import Bootstrap components for modal
// import axios from 'axios';

const BuyProduct = () => { 
  const navigate = useNavigate();
  const {userType} = useParams();
  const [buyProductId, setBuyProductId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { selectedUserType } = useParams(); 
  const [category, setCategory] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productCatalogue, setProductCatalogue] = useState("");
  const [color, setChooseColor] = useState([]);
  const [colors, setChooseColors] = useState("");
  const [requiredQuality, setRequiredQuality] = useState("");
  const [rate, setRate] = useState("");
  const [discount, setDiscount] = useState("");
  const [productName, setProductName] = useState("");
  const [showSecondaryAddresses, setShowSecondaryAddresses] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [fullName, setFullName] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [productSuggestions, setProductSuggestions] = useState([]);
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [allProducts, setAllProducts] = useState([]);
  const [quantityError, setQuantityError] = useState("");
  const [colorError, setColorError] = useState("");
  // const [error, setError] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [id, setId] = useState("");
  const { userId } = useParams(); 
  const location = useLocation();
 // Check if there's state passed from ViewProduct page
 useEffect(() => {
  const storedState = sessionStorage.getItem("buyProductState");
  if (location.state) {
    const {
      category,
      productName,
      catalogue, 
      productSize,
      color,
      rate,
      discount, 
      // afterDiscount,
      requiredQuality,
      id,
    } = location.state;
    setCategory(category);
    setProductName(productName);
    setProductCatalogue(catalogue);
    setProductSize(productSize);
    setChooseColor(color);
    setRate(rate);
    setDiscount(discount);
    // setAfterDiscount(afterDiscount);
    setRequiredQuality(requiredQuality);
    setId(id);

    sessionStorage.setItem("buyProductState", JSON.stringify(location.state));
  } else if (storedState) {
    const parsedState = JSON.parse(storedState);
    setCategory(parsedState.category);
    setProductName(parsedState.productName);
    setProductCatalogue(parsedState.catalogue);
    setProductSize(parsedState.productSize);
    setChooseColor(parsedState.color);
    setRate(parsedState.rate);
    setDiscount(parsedState.discount);
    // setAfterDiscount(afterDiscount);
    setRequiredQuality(parsedState.requiredQuality);
    setId(parsedState.id);
  }
}, [location.state]);

// const handleViewProduct = () => {
//   const hasViewed = sessionStorage.getItem("hasViewedProduct");

//   if (!productName.trim()) {
//     setError("Please select a product name!");
//     return;
//   }

//   setError("");
//   sessionStorage.setItem("hasViewedProduct", "true");

//   navigate(`/buyproduct-view/${id}/${userId}/${userType}`, {
//     state: {
//       category,
//       productName,
//       productCatalogue,
//       productSize,
//       color,
//       rate,
//       discount,
//       requiredQuality,
//     },
//   });
// };


useEffect(() => {
  console.log(buyProductId);
}, [buyProductId]);
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
          mobileNumber: addr.mobileNumber,
          customerName: addr.customerName,
        }));
        setAddresses(formattedAddresses);
        const customerName = Array.isArray(data) ? data[0]?.fullName || '' : data.fullName || '';
        setFullName(customerName);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (userId) {
      fetchProfileType();
    }
  }, [userId]);

  const validRate = Number(rate) || 0;
  const validDiscount = Number(discount) || 0;
  const afterDiscountPrice = parseFloat((validRate - (validRate * validDiscount) / 100).toFixed(2));
  const totalAmount = parseFloat((requiredQuality * afterDiscountPrice).toFixed(2));

  const handleGetQuotation = async (e) => {
    e.preventDefault();

    if (!colors) {
        setColorError("Please Enter SelectColor Field!");
        return;
      }

    if (!requiredQuality) {
      setQuantityError("Please Enter Quantity Field!");
      return;
    }
  
    const primaryAddress = addresses.find((addr) => addr.type === "primary");
    const state = primaryAddress?.state || "";
    const district = primaryAddress?.district || "";
    const pincode = primaryAddress?.zipCode || "";
    const mobileNumber = primaryAddress?.mobileNumber || "";
  
    const payload = {
      BuyProductId:"string",
      id: "string",
      date: new Date(),
      Address: primaryAddress?.address || "",
      CustomerPhoneNumber: mobileNumber,
      category:category,
      status: "Open",
      productName,
      ProductCatalogue: productCatalogue,
      productSize,
      rate: rate.toString(),
      discount: discount.toString(),
      afterDiscountPrice: afterDiscountPrice.toString(),
      color: color,
      selectedColors: colors,
      requiredQuantity: requiredQuality.toString(),
      totalAmount: totalAmount.toString(),
      AssignedTo: "Customer Care",
      DeliveryCharges: "",
      ServiceCharges: "",
      TotalPaymentAmount: "",
      AddressType: primaryAddress ? "primary" : "secondary",
      State: state,
      District: district,
      ZipCode: pincode,
      CustomerId: userId,
      CustomerName: fullName,
      RequestedBy: userId,
      PaymentMode:"",
      UTRTransactionNumber:"",
      TechnicianConfirmationCode:"",
      DeliveryDate:"",
      TechnicianDetils:"",
      ProductView: "Draft",
      InvoiceDetails:"",
      UploadInvoice: [],
      WarrantyPeriod: "",
    };
  
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/BuyProductUpload`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
       throw new Error("Failed to submit quotation.");
      }
      const buyProductData = await response.json();
      setBuyProductId(buyProductData.buyProductId);
       navigate(`/buyProductPaymentPage/${buyProductData.buyProductId}/${userType}`);
    } catch (error) {
      console.error("Error submitting quotation:", error);
      window.alert('Failed to submitting quotation. Please try again later.');    }
  };

  // const handleColorChange = (e) => {
  //   if (!Array.isArray(colors)) {
  //     console.error("colors is not an array:", colors);
  //     return; 
  //   }
  
  //   const inputColors = e.target.value
  //     .split(",")
  //     .map(c => c.trim().toLowerCase())  
  //     .filter(c => c !== ""); 
  
  //   const colorSet = colors.map(c => c.toLowerCase()); 
  
  //   const isValid = inputColors.every(c => colorSet.includes(c));
  
  //   if (isValid) {
  //     setChooseColors(inputColors);
  //   } else {
  //     alert("Please enter a color from the given options!");
  //   }
  // };
  
//   const handleColorChange = (e) => {
//     const inputColors = e.target.value
//       .split(",")
//       .map(c => c.trim())
//       .filter(c => c !== ""); // Clean the input

//     const sortedInput = [...inputColors].sort().join(",").toLowerCase();
//     const sortedColor = [...color].sort().join(",").toLowerCase();
//     setChooseColors(e.target.value);

//     if (sortedInput === sortedColor) {
//       // setChooseColors(e.target.value);
//       setColorError("");
//     } else {
//       setColorError(`Please match the exact colors`);
//     }
// };
  

  const handleColorChange = (e) => {
    const inputColor = e.target.value;
    if (color.includes(inputColor)) {
      setChooseColors(inputColor); 
    } else {
      alert("Please choose a color from the given options!");
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      setRequiredQuality("");
      setQuantityError("Quantity is required.");
      return;
    }

    if (/^[1-9]\d*$/.test(value)) {
      setRequiredQuality(value);
      setQuantityError(""); 
    } else {
      setQuantityError("Please enter a minimum one Number Of Quantity.");
    }
  };


  // const handleAddToCart = async (e) => {
  //   e.preventDefault();
   
  //   const primaryAddress = addresses.find((addr) => addr.type === "primary");
  //   const state = primaryAddress?.state || "";
  //   const district = primaryAddress?.district || "";
  //   const pincode = primaryAddress?.zipCode || "";
  //   const mobileNumber = primaryAddress?.mobileNumber || "";
  
  //   const payload = {
  //     BuyProductId:"string",
  //     id: "string",
  //     date: new Date(),
  //     Address: primaryAddress?.address || "",
  //     CustomerPhoneNumber: mobileNumber,
  //     category,
  //     status: "Draft",
  //     productName,
  //     ProductCatalogue: productCatalogue,
  //     productSize,
  //     rate: rate.toString(),
  //     discount: discount.toString(),
  //     afterDiscountPrice: afterDiscountPrice.toString(),
  //     color: color,
  //     selectedColors: colors,
  //     requiredQuantity: requiredQuality.toString(),
  //     totalAmount: totalAmount.toString(),
  //     AssignedTo: "Customer Care",
  //     DeliveryCharges: "",
  //     ServiceCharges: "",
  //     TotalPaymentAmount: "",
  //     AddressType: primaryAddress ? "primary" : "secondary",
  //     State: state,
  //     District: district,
  //     ZipCode: pincode,
  //     CustomerId: userId,
  //     CustomerName: fullName,
  //     RequestedBy: userId,
  //     PaymentMode:"",
  //     UTRTransactionNumber:"",
  //     TechnicianConfirmationCode:"",
  //     DeliveryDate:"",
  //     TechnicianDetils:"",
  //     ProductView: "Draft",
  //     InvoiceDetails:"",
  //     UploadInvoice: [],
  //     WarrantyPeriod: "",
  //   };
  
  //   try {
  //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/BuyProductUpload`,{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     if (!response.ok) {
  //      throw new Error("Failed to submit quotation.");
  //     }
  //     const buyProductData = await response.json();
  //     setBuyProductId(buyProductData.buyProductId);
  //     alert(`Add to Cart Successfully`);
  //     // navigate(`/buyProductPaymentPage/${buyProductData.buyProductId}/${userType}`);
  //   } catch (error) {
  //     console.error("Error submitting quotation:", error);
  //     window.alert('Failed to submitting quotation. Please try again later.');    }
  // };
  
  // Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);


  // const handleAddToCart = () => {
  //   alert("Item added to cart!");
  // };

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

//   // Fetch products when category changes
// useEffect(() => {
//   if (category) {
//     fetchProductsByCategory(category);
//   }
// }, [category]);

const fetchProductsByCategory = async (selectedCategory) => {
  try {
    const response = await fetch(
      `https://handymanapiv2.azurewebsites.net/api/Product/GetProductsByCategory?Category=${selectedCategory}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("Fetched Products:", data);
    // alert(JSON.stringify(productOptions));
      setProductOptions(data);
      setProductName("");
      setProductCatalogue("");
      setProductSize("");
      setChooseColor([]);
      setRate("");
      setDiscount("");
      setId("");

  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
useEffect(() => {
  if (category) {
    fetchProductsByCategory(category);
  }
}, [category]);


const handleCategoryChange = (e) => {
  setCategory(e.target.value);
  setProductName(""); 
};

const handleProductChange = (e) => {
  const selectedProduct = productOptions.find(prod => prod.productName === e.target.value);
  
  if (selectedProduct) {
    setProductName(selectedProduct.productName);
    setProductCatalogue(selectedProduct.catalogue || "");
    setProductSize(selectedProduct.productSize || "");
    setChooseColor(selectedProduct.color || []);
    setRate(selectedProduct.rate || "");
    setDiscount(selectedProduct.discount || "");
    setId(selectedProduct.id || "");
  }
};

useEffect(() => {
  if (!selectedProduct.category && category) {
    fetchProductsByCategory(category);
  }
}, [category, selectedProduct]);


  // useEffect(() => {
  //   // if (!category || category === "Choose Category") {
  //   //   setProductSuggestions([]);
  //   //   setFilteredSuggestions([]);
  //   //   return;
  //   // }

  //   const fetchProducts = async () => {
  //     if (!category) return;
  //     try {
  //       const response = await axios.get(
  //         `https://handymanapiv2.azurewebsites.net/api/Product/GetProductsByCategory?category=${category}`
  //       );
  //       setAllProducts(response.data);
  //       // alert(JSON.stringify(allProducts));
  //       setProductSuggestions(response.data.map((product) => product.productName));
  //     } catch (error) {
  //       console.error("Error fetching products by category:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, [category]);
  
  // useEffect(() => {
  //   if (productName) {
  //     const filtered = productSuggestions.filter((product) =>
  //       // name.toLowerCase().startsWith(productName.toLowerCase())
  //     product.toLowerCase().includes(productName.toLowerCase())
  //     );
  //     setFilteredSuggestions(filtered);
  //     setShowDropdown(filtered.length > 0);
  //   } else {
  //     setFilteredSuggestions([]);
  //     setShowDropdown(false);
  //   }
  // }, [productName, productSuggestions]);

  
  // const handleProductSelect = (selectedProductName) => {
  //   setProductName(selectedProductName); // Update the input field to reflect the selected name
  //   setShowDropdown(false);

  //   const selectedProduct = allProducts.find(
  //     (product) => product.productName === selectedProductName
  //   );
  //   if (selectedProduct) {
  //     setProductCatalogue(selectedProduct.catalogue);
  //     setProductSize(selectedProduct.productSize);
  //     setChooseColor(selectedProduct.color);
  //     setRate(selectedProduct.rate);
  //     setDiscount(selectedProduct.discount);
  //     // setAfterDiscount(selectedProduct.afterDiscount);
  //     setId(selectedProduct.id);
  //   }
    
  //   setFilteredSuggestions([]);
  // };

  // // Handle product selection
  // const handleProductSelect = (selectedProduct) => {
  //   setProductName(selectedProduct);
  //   setShowDropdown(false);
  // };


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
      <h3 className="mb-2 text-center">Buy Products</h3>
        <div className="bg-white rounded-3 p-4 bx_sdw w-100">
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
                onChange={handleCategoryChange}
                required
              >
                <option value="">Choose Category</option>
                <option>Electrical items</option>
                <option>Plumbing Materials</option>
                <option>Sanitary items</option>
                <option>Electronics appliances</option>
                <option>Paints</option>
                <option>Hardware items</option>
                <option>Civil & Waterproofing Materials</option>
              </select>
            </div>

      <div className="form-group position-relative">
      <label>
        Product Name <span className="req_star">*</span>
      </label>
      <select
        className="form-control"
        value={productName}
        onChange={handleProductChange}
        placeholder="Choose Product Ceiling Fan, Air Conditioner"
        >
         <option value="">Select Product</option>
            {productOptions.map((productOption, i) => (
              <option key={i} value={productOption.productName}>{productOption.productName}</option>
            ))}
        </select>
        </div>
        {/* // onFocus={() => 
        //     setShowDropdown(true)
        //   } 
        //   onBlur={(e) => {
        //     if (!e.relatedTarget || !e.relatedTarget.classList.contains("dropdown-item")) {
        //       setShowDropdown(false);
        //     }
        //   }} */}
      
      {/* {error && <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{error}</p>}

      {showDropdown && filteredSuggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow bg-white"
          style={{ zIndex: 1000 }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onMouseDown={() => handleProductSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )} */}
    

            <div className="form-group">
              <label>
                Product Catalogue <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productCatalogue}
                 onChange={(e) => setProductCatalogue(e.target.value)}
                placeholder="Product Catalogue"
                readOnly
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
                // onChange={(e) => setProductSize(e.target.value)}
                placeholder="Product Size"
                readOnly
              />
            </div>

            <div className="col-md-6">
                <label>Rate <span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={rate}
                  // onChange={rate}
                  placeholder="Rate"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label>Discount <span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={discount}
                  // onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label>Price After Discount <span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={afterDiscountPrice}
                  // onChange={(e) => setAfterDiscount(e.target.value)}
                  placeholder="After Discount"
                  readOnly
                />
              </div>

            {/* <div className="form-group">
              <label>Color (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={color}
                onChange={(e) => setChooseColor(e.target.value)}
                placeholder="Enter Color"
              />
            </div> */}

            <button
              type="button"
              className="btn btn-warning text-white w-50 mt-2"
              onClick={() => {
                setSelectedProduct({
                  category,
                  productName,
                  productCatalogue,
                  productSize,
                  color,
                  rate,
                  discount,
                  requiredQuality,
                });
                navigate(`/buyproduct-view/${id}/${userId}/${userType}`);
              }}
              // onClick={() =>
              //   navigate(`/buyproduct-view/${id}/${userId}/${userType}`, {
              //     state: {
              //       category,
              //       productName,
              //       productCatalogue,
              //       productSize,
              //       color,
              //       rate,
              //       discount,
              //       // afterDiscount,
              //       requiredQuality,
              //     },
              //   })
              // }
            >
              View Product
            </button>


            {/* <div className="form-group mb-3">
              <label>Other Than Product</label>
              <input
                type="text"
                className="form-control"
                value={otherThanProduct}
                onChange={(e) => setOtherThanProduct(e.target.value)}
                placeholder="Enter Product Name"
              />
            </div> */}

            <div className="row">
            {/* <div className="col-md-6">
                <label>Rate <span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="Enter Rate"
                />
              </div> */}
              <div className="form-group">
              <label> Choose Color (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={color}
                // onChange={(e) => setChooseColor(e.target.value)}
                placeholder="Color"
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Select Required Color</label>
              <input
                type="text"
                className="form-control"
                value={colors}
                onChange={handleColorChange}
                placeholder="Select Required Color"
                required
              />
             {colorError && <p style={{ color: "red" }}>{colorError}</p>}

            </div>
              
              <div className="col-md-6">
                <label>
                  Required Quantity <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={requiredQuality}
                  onChange={handleQuantityChange}
                  placeholder="Enter Required Quantity"
                  required
                />
                {quantityError && <p style={{ color: "red" }}>{quantityError}</p>}
              </div>

              <div className="col-md-6">
                <label>
                  Total Amount<span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={totalAmount}
                  // onChange={(e) => setTotalAmounts(e.target.value)}
                  // placeholder="Enter Total Amount"
                  readOnly
                />
              </div>
              {/* <div className="col-md-6">
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
              </div> */}
            </div>

            <div className="d-flex gap-5 mt-3">
              {/* <button
                type="button"
                className="text-white btn btn-warning w-50"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button> */}
              <button
                type="button"
                className="text-white btn btn-warning w-50"
                onClick={handleGetQuotation}
              >
                Buy Product
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