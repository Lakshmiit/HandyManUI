import React, { useEffect, useState, useCallback} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, useNavigate } from "react-router-dom";
// import { Dashboard as MoreVertIcon } from "@mui/icons-material";
// import Sidebar from './Sidebar';
import axios from 'axios';
import { Modal, Button, Form} from 'react-bootstrap';

const GroceryPaymentmethod = () => {
  const navigate = useNavigate();
 const {userType} = useParams();
  const {userId} = useParams();
  const {groceryItemId} = useParams();
   const [isMobile, setIsMobile] = useState(false);
    // const [showMenu, setShowMenu] = useState(false);
   const [isChecked, setIsChecked] = useState('');
const [selectedPayment, setSelectedPayment] = useState(null);
const [error, setError] = useState("");
  const [martId, setMartId] = useState('');
  const [totalItemsSelected, setTotalItemsSelected] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [cartData, setCartData] = useState(null);
const [addressData, setAddressData] = useState({
fullName  : '',
mobileNumber: '',
address: '',
state: '',
district: '',
zipCode: '',
});
const [serviceUnavailable, setServiceUnavailable] = useState(false);
 const [addresses, setAddresses] = useState([]);
const [newAddress, setNewAddress] = useState('');
const [state, setState] = useState('');
   const [districtList, setDistrictList] = useState([]);  
 const [stateList, setStateList] = useState([]);
   const [district, setDistrict] = useState('');  
   const [districtId, setDistrictId] = useState('');    
   const [stateId, setStateId] = useState(null);  
  const [fullName, setFullName] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [showModals, setShowModals] = useState(false);
const [mobileNumber, setMobileNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [guestCustomerId, setGuestCustomerId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [shouldBlink,setShouldBlink] = useState(false);
//  const [location, setLocation] = useState({latitude: '', longitude: ''});
//   const [locationError, setLocationError] = useState(null);

useEffect(() => {
  console.log( isChecked, editingAddressId );
}, [isChecked, editingAddressId]);

// const getLocation = () => {
//     return new Promise((resolve) => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const coords = {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             };
//             setLocation(coords);
//             resolve(coords);
//           },
//           (err) => {
//             setLocationError(err.message);
//             resolve({ latitude: null, longitude: null });
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//         );
//       } else {
//         setLocationError("Geolocation not supported in this browser.");
//         resolve({ latitude: null, longitude: null });
//       }
//     });
//   };

  useEffect(() => {
  const fetchCart = async () => {
    try {
      if (!groceryItemId) return;
      const existingSnap = localStorage.getItem(`cartSnapshot_${groceryItemId}`);
      if (existingSnap) {
        if (!localStorage.getItem("allCategories")) {
          localStorage.setItem("allCategories", existingSnap);
        }
      }
      const response = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${groceryItemId}`
      );
      if (!response.ok) throw new Error("Failed to fetch product details");
      const data = await response.json();
      setCartData(data);
      setMartId(data.martId);
      setGrandTotal(data.grandTotal);
      setTotalItemsSelected(data.totalItemsSelected);
      setCustomerName(data.customerName);
      if (!existingSnap && Array.isArray(data.categories)) {
        const allCategories = data.categories.map(cat => ({
          categoryName: cat.categoryName,
          products: (cat.products || []).map(p => ({
            productId: p.productId || p.id,
            productName: p.productName || p.name || "",
            qty: Number(p.noOfQuantity || p.qty || 0),
            mrp: Number(p.mrp || 0),
            discount: Number(p.discount || 0),
            afterDiscountPrice: Number(p.afterDiscountPrice || p.price || 0),
            stockLeft: Number(p.stockLeft || 0),
            image: p.productImage || p.image || p.productImageFilename || "",
          })),
        }));

        const json = JSON.stringify(allCategories);
        localStorage.setItem(`cartSnapshot_${groceryItemId}`, json);
        if (!localStorage.getItem("allCategories")) {
          localStorage.setItem("allCategories", json);
        }
        localStorage.setItem("activeOrderId", groceryItemId);
        localStorage.setItem(
          `cartMeta_${groceryItemId}`,
          JSON.stringify({
            items: data.totalItemsSelected,
            total: data.grandTotal
          })
        );
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  fetchCart();
  // getLocation();
}, [groceryItemId]);

//  useEffect(() => {
//   const fetchCart = async () => {
//     try {
//       if (!groceryItemId) {
//         console.error("No id found in localStorage or location state");
//         return;
//       }
//       const response = await fetch(
//         `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${groceryItemId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch product details");
//       }
//       const data = await response.json();
//       setCartData(data); 
//       setMartId(data.martId);
//       setGrandTotal(data.grandTotal);
//       setTotalItemsSelected(data.totalItemsSelected);
//       setCustomerName(data.customerName);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };
//   fetchCart();
//   getLocation(); 
// }, [groceryItemId]);

 const fetchCustomerData = useCallback(async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Address/GetAddressById/${userId}`);
        if (!response.ok) {

          throw new Error('Failed to fetch customer profile data');
        }
        const data = await response.json();
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
          emailAddress: addr.emailAddress,
          mobileNumber: addr.mobileNumber,
          fullName: addr.fullName,
        }));
        setAddresses(formattedAddresses);
        const customerName = Array.isArray(data) ? data[0]?.fullName || '' : data.fullName || '';
        setFullName(customerName);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
  }, [userId]);

  useEffect(() => {
  const primary = addresses.find(addr => addr.type === "primary");
  const district = primary?.district?.toLowerCase();

  if (district && district !== "visakhapatnam") {
    setServiceUnavailable(true);  
  } else {
    setServiceUnavailable(false);
  }
}, [addresses]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  useEffect(() => {
    axios.get('https://handymanapiv2.azurewebsites.net/api/MasterData/getStates')
      .then(response => {
        const data = response.data;
        console.log("States API Response:", data); 
        setStateList(data);
        setStateId('');
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);
  
   useEffect(() => {
    if (stateId) {
      axios.get(`https://handymanapiv2.azurewebsites.net/api/MasterData/getDistricts/${stateId}`)
        .then(response => {
          setDistrictList(response.data);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    } else {
      setDistrictList([]);
    }
  }, [stateId]);

   // Reset address form fields
  const resetAddressForm = () => {
    setFullName('');
    setMobileNumber('');
    setNewAddress(''); 
    setState('');
    setDistrict('');
    setZipCode('');
  };

  // Handle address editing
  const handleAddressEdit = async () => {

    if (!newAddress || !zipCode || !mobileNumber || !state || !district) {
      alert("Please fill in all required fields.");
      return; 
    }
    if (fullName.trim().toLowerCase() === 'guest') {
      alert("Please Change Your Full Name.");
      return;
    }  
    if (!/^\d{6}$/.test(zipCode)) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }
  
      const updatedAddress = {
        id: guestCustomerId,
        fullName,
        mobileNumber,
        address: newAddress,
        state,
        district,
        zipCode,
      };
    
      const payload3 = {
        id: guestCustomerId,
        profileType: "profileType",
        addressId: guestCustomerId,
        isPrimaryAddress: true,
        address: newAddress,
        state: state,
        district: district,
        StateId: stateId,
        DistrictId: districtId,
        zipCode: zipCode,
        mobileNumber: mobileNumber,
        emailAddress: "emailAddress",
        userId: userId,
        firstName: fullName,
        lastName: "lastName",
        fullName: fullName,
      };
    
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Customer/CustomerAddressEdit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload3),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error("Failed to edit address.");
        }
        setAddresses(prev =>
          prev.map(addr => addr.id === guestCustomerId ? updatedAddress : addr)
        );
        setAddressData(updatedAddress);
        await fetchCustomerData();
        alert("Address Updated Successfully!");
        setShowModal(false);
        resetAddressForm();
        setIsEditing(false);
        setEditingAddressId(null);
      } catch (error) {
        console.error("Error editing address:", error);
        alert("Failed to edit address. Please try again later.");
      }
    };

    const primaryAddress = addresses.find(addr => addr.type === 'primary');
    const isAddressInvalid = !primaryAddress || !primaryAddress.address || !primaryAddress.zipCode;
    
    useEffect(() => {
        if (isAddressInvalid) {
          setShouldBlink(true);
        } else {
          setShouldBlink(false);
        }
      }, [isAddressInvalid]);
    


  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);


const handleUpdatePaymentMethod = async () => {
  // e.preventDefault();
  if (!selectedPayment) {
    setError("Please select at least one payment method.");
    return;
  }
  if (!isChecked) {
      alert("You must accept the terms and conditions.");
      return; 
    }  

    try {
      // const {latitude, longitude} = await getLocation();
      const primaryAddress = addresses.find((addr) => addr.type === "primary");
    const state = primaryAddress?.state;
    const district = primaryAddress?.district || "";
    const pincode = primaryAddress?.zipCode || primaryAddress?.pincode;
    const mobileNumber = primaryAddress?.mobileNumber || primaryAddress?.mobileNumber; 
    
  const payload = {
    ...cartData,
    customerName: addressData.fullName || fullName,
    address: addressData.address || primaryAddress?.address, 
    state: addressData.state || state,
    district: addressData.district || district,
    zipCode: addressData.zipCode || pincode,
    customerPhoneNumber: addressData.mobileNumber || mobileNumber,
    id: groceryItemId,
    userId: userId, 
    martId: martId,
    date: new Date(),
    grandTotal: grandTotal,
    totalItemsSelected: totalItemsSelected,
    status: "Open",
    // status: selectedPayment === "online" ? "Draft" : "Open",
    paymentMode: selectedPayment,
    utrTransactionNumber: "",
    transactionNumber: "",
    transactionStatus: "",
    paidAmount: "",
    AssignedTo: "",
    DeliveryPartnerUserId: "",
    latitude: 0,
    longitude: 0,
    // latitude: latitude !== null ? Number(latitude) : null,
    // longitude: longitude !== null ? Number(longitude) : null,
    isPickUp: false,
    isDelivered: false,
  };

    let response;
    if (selectedPayment === 'online') {
     response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to Update Technician.');
    }
    // const data = await response.json();
localStorage.removeItem(`cartSnapshot_${groceryItemId}`);
  localStorage.removeItem("activeOrderId");
  localStorage.removeItem("allCategories");
  localStorage.removeItem(`cartMeta_${groceryItemId}`);

    // Store confirmation code in state
    window.alert(`We are Redirecting to the Payment Page! Your reference number is ${martId}.`);
    window.location.href = `/groceryOnlinePayment/${groceryItemId}`;
  } else if (selectedPayment === 'cash') {
    response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
    }
    // const data = await response.json();
    localStorage.removeItem(`cartSnapshot_${groceryItemId}`);
  localStorage.removeItem("activeOrderId");
  localStorage.removeItem("allCategories");
  localStorage.removeItem(`cartMeta_${groceryItemId}`);
    window.alert(`Thank You for choosing the Lakshmi Mart Services! Your reference order number is ${martId}. Delivery in 45 minutes`);
   window.location.href = `/profilePage/${userType}/${userId}`;
   }
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to Update Technician. Please try again later.');
  }
};     

// const handleLocationMethod = async () => {
//   if (!navigator.geolocation) {
//     setLocationError("Geolocation not supported in this browser.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       setLocation({ latitude, longitude }); 
//       const payload = {
//         id: "string",
//         date: new Date().toISOString(), 
//         latitude,
//         longitude,
//       };
//       try {
//         const response = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/Location/UploadLocation`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//           }
//         );
//         if (!response.ok) throw new Error("Failed to update location details");
//         const result = await response.json();
//         console.log("Update success:", result);
//         // alert("Location updated successfully!");
//       } catch (error) {
//         console.error("Error updating location:", error);
//         alert("Update failed!");
//       }
//     },
//     (err) => {
//       setLocationError(err.message);
//       alert("Failed to get location: " + err.message);
//     },
//     { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//   );
// };
  
//   const BothHandlePaymentandLocation = async (e) => {
//       e.preventDefault();
//       try {
//         // await handleLocationMethod();
//         await handleUpdatePaymentMethod();
//       } catch (error) {
//         console.log("error:", error);
//       }
//     };

const handleCheckboxChange = (value) => {
  const newValue = selectedPayment === value ? null : value;
  setSelectedPayment(newValue);
  setError("");

  if (newValue) {
    setIsChecked(true);
  } else {
    setIsChecked(false);
  }
};

  return (
    <div>
    <div className="d-flex mt-80">
<div>
          <h1
            style={{
              background: "#008000",
              color: "white",
              fontFamily: "'Baloo 2'",
              fontSize: "25px",
              padding: "12px",
              fontWeight: "bold",
              textAlign: "center", 
              width: "100%",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              letterSpacing: "1px",
              marginBottom: "3px",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            Lakshmi Mart
          </h1>
        </div>

<div className={`container ${isMobile ? "w-100" : "w-75"}`}>
<div className="d-flex align-items-center">
  <span 
    className="me-2 text-success" 
    role="button" 
    style={{ cursor: "pointer" }}
    onClick={() => navigate(`/groceryCart/${userType}/${userId}`)}
  >
    <ArrowBackIcon />
  </span>
  <h2 className="title text-success mb-0">PAYMENT CONFIRMATION</h2>
</div>

<div className="d-flex justify-content-between align-items-center">
                                <label className='mt-2 fs-6'>Address <span className="req_star">*</span></label>
                      {/* Modal */}
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton style={{ backgroundColor: isEditing ? "#008000" : "#008000",color: "white"}}>
                            <Modal.Title className='w-100'>{isEditing ? 'Edit Address' : 'Add Address'}</Modal.Title>
                          </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Full Name <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter Full name"
                                required
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Mobile Number <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                name="MobileNumber"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                maxLength="10"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                              />
                              </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="hidden"
                                name="UserId"
                                className="form-control"
                                placeholder="UserId"
                                value={guestCustomerId}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Address <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder="Enter address"
                                required
                              />
                            </Form.Group>
                           <Form.Group className="mb-3">
                              <Form.Label>State <span className="req_star">*</span></Form.Label>
                              <Form.Select
                                value={stateId || ''}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  setStateId(selectedId);
                                  const selectedState = stateList.find(
                                    (s) => s?.StateId?.toString() === selectedId
                                  );
                                  if (selectedState) {
                                    setState(selectedState.StateName);
                                  }
                                }}
                                required
                              >
                                <option value="">Select State</option>
                                {Array.isArray(stateList) &&
                                  stateList
                                    .filter((s) => s && s.StateId && s.StateName)
                                    .map((s) => (
                                      <option key={s.StateId} value={s.StateId.toString()}>
                                        {s.StateName}
                                      </option>
                                    ))}
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>District <span className="req_star">*</span></Form.Label>
                            <Form.Select
                                value={districtId || ''}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  setDistrictId(selectedId);
                                  const selectedDistrict = districtList.find(d => d.districtId.toString() === selectedId);
                                  if (selectedDistrict) {
                                    setDistrict(selectedDistrict.districtName);
                                  }
                                }}
                                required
                              >
                                <option value="">Select District</option>
                                {districtList.map((d) => (
                                  <option key={d.districtId} value={d.districtId.toString()}>
                                    {d.districtName}
                                  </option>
                                ))}
                              </Form.Select>
                              </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Pincode <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={zipCode}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/\D/g, ""); 
                                  if (numericValue.length <= 6) {
                                    setZipCode(numericValue);
                                  }
                                }}              
                                 placeholder="Enter pincode"
                                 required
                              />
                            </Form.Group>
                            <Button type="button" style={{
                                            backgroundColor: isAddressInvalid ? "#008000" : "#008000",
                                            borderColor: isAddressInvalid ? "#008000" : "#008000",
                                            color: "white"
                                        }} onClick={handleAddressEdit}>
                              {isEditing ? 'Edit Address' : 'Add Address'}
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                      </div>
                
                          <div className="p-3 border rounded bg-light">
                            {addresses
                                .map((address) => (
                                  <div 
                                    key={address.id}
                                    className="list-group-item d-flex justify-content-between align-items-center bg-white text-dark"
                                  >
                                    <div>
                                      {/* <span className="m1-2">{address.id}</span>
                                      <br /> */}
                                      <span className="ml-2">{address.fullName}</span>
                                      <br />
                                      <span className="ml-2">{address.mobileNumber}</span>
                                      <br />
                                      <span className="ml-2">{address.address}</span>
                                      <br />
                                      <span className="ml-2">{address.state}</span> 
                                      <br />
                                      <span className="ml-2">{address.district}</span> 
                                      <br />
                                      <span className="ml-2">{address.zipCode}</span> 
                                      <br />
                                      {/* <hr /> */}
                                    </div>
                                    <div className="text-end">
                                    {/* {addresses.map((address) => ( */}
                                      <Button
                                        key={address.id}
                                        style={{
                                            backgroundColor: isAddressInvalid ? "#008000" : "#008000",
                                            borderColor: isAddressInvalid ? "#008000" : "#008000",
                                            color: "white"
                                        }}
                                        className={`text-white mx-1 ${
                                          shouldBlink ? "blinking-button" : ""
                                        }`}
                                        onClick={() => {
                                          setGuestCustomerId(address.id);
                                          setFullName(address.fullName);
                                          setMobileNumber(address.mobileNumber);
                                          setNewAddress(address.address);
                                          setState(address.state);
                                          setDistrict(address.district);
                                          setZipCode(address.zipCode);
                                          setIsEditing(true);
                                          setShowModal(true);
                                        }}
                                      >
                                        {address.address === "" ? "Add Address" : "Edit Address"}
                                      </Button>
                                    {/* ))} */}
                                </div> 
                                  </div>
                                ))}   
                                </div>

                            {fullName.trim().toLowerCase() === "guest" && (
                              <p className="text-danger">
                                Note: Please enter your address to Order Grocery
                              </p>
                            )}      

                      {serviceUnavailable && (
                        <div className="alert alert-danger">
                          <strong>Note:</strong> Currently, the options to raise a ticket, book technician or lakshmi mart services are unavailable in your district.
                            You can still purchase products through the "Buy Product" section.
                            For further assistance, please contact our customer support at 6281198953.
                        </div>
                      )}   
    
    <div className="grocery-confirmation">
   <p className='text-center fs-6'>{customerName}<strong className='name'></strong> Thank you for Choosing the Lakshmi Mart</p> 
      <table className="grocery-table m-3">
          <tbody>
            <tr>
              <td style={{ width: "40%", fontSize: "14px" }}>Order Id</td>
              <td style={{ width: "40%" }}>{martId}</td>
            </tr>
            <tr>
              <td style={{ width: "40%", fontSize: "14px" }}>Number of Items selected</td>
              <td style={{ width: "40%" }}>{totalItemsSelected}</td>
            </tr>
            <tr>
              <td style={{ width: "40%", fontSize: "14px" }}>Grand Total</td>
              <td style={{ width: "40%" }}>Rs {grandTotal} /-</td>
            </tr>
          </tbody>
        </table>

      <div className='payment m-2'>
        <label className='text-white w-100 p-2' style={{background: "#008000",borderRadius: "15px", fontSize: "15px"}}>Select Payment Mode</label>
        <div className='d-flex flex-column m-1'>
        {isMobile ? (
        <div className='d-flex flex-column'>
        <label className='fs-6'>
            <input 
            type="radio" 
            className="form-check-input border-dark m-1"
            checked={selectedPayment === 'online'}
            onChange={() => handleCheckboxChange('online')}/>
            Pay Through Online
          </label>
          <label className='fs-6'>
            <input 
            type="radio" 
            className="form-check-input border-dark m-1"
            checked={selectedPayment === 'cash'}
            onChange={() => handleCheckboxChange('cash')}/>
            Cash On Delivery
          </label>
      {error && <p className="text-danger" style={{fontSize: "10px"}}>{error}</p>}
          </div>
        ) : (
          <div className="desktop-view d-flex flex-column ">
      <label className="me-4">
        <input 
        type="radio" 
        className="form-check-input border-dark me-2"
        checked={selectedPayment === 'online'}
        onChange={() => handleCheckboxChange('online')}
        />
        Pay Through Online
      </label>
      <label>
        <input 
          type="radio" 
          className="form-check-input border-dark me-2"
          checked={selectedPayment === 'cash'}
          onChange={() => handleCheckboxChange('cash')}
        />
        Cash On Delivery (COD)
      </label>
      {error && <p className="text-danger">{error}</p>}
    </div>
  )}
</div>
</div>

       <div className="note m-1">
           <input 
    type="checkbox" 
    className="form-check-input border-dark me-2"
    checked={isChecked}
    required
    onChange={(e) => setIsChecked(e.target.checked)}
  />
  <button
    onClick={(e) => {
      e.preventDefault();
      setShowModals(true);
    }}
    className="p-0"
    style={{ 
      background: "none", 
      border: "none", 
      textDecoration: "underline", 
      cursor: "pointer",
      whiteSpace: "nowrap",
      fontSize: "13px",
      color: "#0000FF",
    }}
  >
    Terms & Conditions & Cancellation Policy
  </button>

      {/* Modal for Terms and Conditions */}
      {showModals && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
      onClick={() => setShowModals(false)}
      style={{
        color: "red",
        position: "absolute",
        top: "10px",
        right: "15px",
        background: "none",
        border: "none",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      ✕
    </button>
            <h3>Terms & Conditions</h3>
            <div className="text-justify">
                    <div className="mt-10">
                        <h5>I. General</h5>
                        <p>
                          These Terms & Conditions apply to all grocery and daily-need purchases made through Lakshmi Mart (via APP or website).
                          By placing an order, you agree to abide by these T&C.
                          Lakshmi Sai Service Provider reserves the right to update policies without prior notice.                        
                        </p>
                    </div> 
                    <div className="mt-10">
                        <h5>II. Orders</h5>
                        <p>Orders are accepted subject to stock availability.In case of unavailability, Lakshmi Mart may cancel the product and issue a refund/replacement.
                            Customers must provide accurate delivery address and contact information. Incorrect details may lead to order cancellation.                       
                        </p>
                    </div>
                    <div className="mt-10">    
                        <h5>III. Pricing & Payment</h5>
                        <p>All prices are inclusive of GST, unless otherwise specified.Prices are subject to change depending on market conditions and supplier updates.
                          Payment options: UPI, credit/debit cards, net banking, and Cash on Delivery (COD, where available).                      
                        </p>
                    </div>
                    <div className="mt-10">
                        <h5>IV. Delivery</h5>
                        <p>Groceries are delivered within the estimated time shown at checkout.
                          Free delivery is available on eligible orders (e.g., above a specified order value).
                          Delivery times may vary due to traffic, weather, or supply chain issues.                        
                        </p>
                    </div>
                    <div className="mt-10">
                        <h5>V. Returns & Refunds</h5>
                        <p>
                          Perishable items (milk, vegetables, fruits, bakery, etc.) are non-returnable once delivered.
                          Non-perishable grocery items (packed pulses, rice, oil, flour, etc.) can be returned only if:
                        <br />
                        <h5>Wrong item delivered</h5>
                        Damaged or defective packaging at the time of delivery
                        Returns must be initiated within 24 hours of delivery by contacting customer support.
                        Refunds (if applicable) will be processed within 7–10 working days to the original payment method.
                        </p>
                    </div>
                     <h3>Cancellation Policy</h3>
                    <div className="mt-10">
                        <h5>I. Order Cancellations</h5>
                        <p>Orders can be cancelled before packing/dispatched at no extra cost.
                          Once the order is packed or out for delivery, cancellation is not allowed.
                          In case of COD orders, repeated cancellations may lead to blocking of the COD option for that customer.
                        </p>
                        <div className="mt-10">
                        <h4>II. Refund Timelines</h4>
                        <p>For prepaid orders cancelled before dispatch, a full refund will be processed.
                            Refunds take 7–10 working days to reflect in the original payment method.                        
                        </p>
                        </div>
                        <div className="mt-10">
                        <h5>III. Special Notes</h5>
                        <p>Bulk or wholesale orders may have separate cancellation/return terms.
                          Festival/offers/discounted items are not eligible for return or cancellation once dispatched.                        
                        </p>
                        </div>
                </div>
            </div>
            <div className = "text-center">
            <button className="btn btn-danger w-20" title="close" onClick={() => setShowModals(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>

<div className="button">
  {/* <button onClick={getLocation}>Get Location</button>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {locationError && <p style={{ color: "red" }}>{locationError}</p>} */}
    {/* <button className="btn-back m-2">Back</button> */}
    <button className="btn-grocery" onClick={handleUpdatePaymentMethod} >Order Now</button> 
    {/* onClick={handleUpdateJobDescription} */}
</div>
    </div>
    </div>
    </div>

    {/* Styles for floating menu */}
<style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0; 
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default GroceryPaymentmethod;