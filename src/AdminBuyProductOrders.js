import React, { useState, useEffect} from "react";
import "./App.css";
// import { v4 as uuidv4 } from 'uuid'; 
import AdminSidebar from './AdminSidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dashboard as MoreVertIcon} from '@mui/icons-material';
import ForwardIcon from '@mui/icons-material/Forward';
import { Button } from 'react-bootstrap'; // Import Bootstrap components for modal
// import axios from 'axios';

const AdminBuyProductOrders = () => {
  const navigate = useNavigate();
  // const {userType} = useParams();
  const {buyProductId} = useParams();
  const [buyProductTicketId, setBuyProductTicketId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // const { selectedUserType } = useParams();
  const [productData, setProductData] = useState("");
  const [category, setCategory] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productCatalogue, setProductCatalogue] = useState("");
  const [color, setColor] = useState("");
  const [selectedColors, setSelectedColors] = useState("");
  const [totalAmount, setTotalAmount] = useState('');
  // const [otherThanProduct, setOtherThanProduct] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState("");
  // const [units, setUnits] = useState("");
  const [rate, setRate] = useState("");
  const [discount, setDiscount] = useState("");
 const [afterDiscount, setAfterDiscount] = useState("");
  const [productName, setProductName] = useState("");
  // const [showSecondaryAddresses, setShowSecondaryAddresses] = useState(false);
  // const [newAddress, setNewAddress] = useState('');
  // const [addresses, setAddresses] = useState([]);
const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  // const [showModal, setShowModal] = useState(false);
  // const [productSuggestions, setProductSuggestions] = useState([]);
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  const [id, setId] = useState("");
  // const { userId } = useParams(); 
  const [deliveryCharges, setDeliveryCharges] = useState(0);
const [serviceCharges, setServiceCharges] = useState(0);
const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
const [deliveryDate, setDeliveryDate] = useState('');
const [technicianDetails, setTechnicianDetails] = useState('');
const [invoiceDetails, setInvoiceDetails] = useState('');
const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
const [assignedTo, setAssignedTo] = useState('');
const [loading, setLoading] = useState(true);
const [productInvoice, setProdctInvoice] = useState([]);
const [uploadedFiles, setUploadedFiles] = useState([]);
const [showAlert, setShowAlert] = useState(false);
const [paymentMode, setPaymentMode] = useState('');
const [transactionDetails, setTransactionDetails] = useState('');
const [customerId, setCustomerId] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [customerName, setCustomerName] = useState('');
const [date, setDate] = useState('');
const [warrantyPeriod, setWarrantyPeriod] = useState('');
const [error, setError] = useState('');


  const location = useLocation();
 // Check if there's state passed from ViewProduct page
 useEffect(() => {
  if (location.state) {
    const {
      productName,
      catalogue,
      productSize,
      color,
      rate,
      discount, 
     afterDiscount,
      requiredQuantity,
      id,
    } = location.state;
    setProductName(productName);
    setProductCatalogue(catalogue);
    setProductSize(productSize);
    setColor(color);
    setRate(rate);
    setDiscount(discount);
    setAfterDiscount(afterDiscount);
    setRequiredQuantity(requiredQuantity);
    setId(id);
  }
}, [location.state]);

useEffect(() => {
  console.log( productData);
}, [productData]);

  // // Fetch customer profile data
  // useEffect(() => {
  //   const fetchProfileType = async () => {
  //     try {
  //       const API_URL = "https://handymanapiv2.azurewebsites.net/api/Address/GetAddressById/";
  //       const response = await fetch(`${API_URL}${userId}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch customer profile data");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       const addresses = Array.isArray(data) ? data : [data];
  //       const formattedAddresses = addresses.map((addr) => ({
  //         id: addr.addressId,
  //         type: addr.isPrimaryAddress ? "primary" : "secondary",
  //         address: addr.address,
  //         state: addr.state,
  //         district: addr.district,
  //         zipCode: addr.zipCode,
  //         mobileNumber: addr.mobileNumber,
  //         customerName: addr.customerName,
  //       }));
  //       setAddresses(formattedAddresses);
  //       const customerName = Array.isArray(data) ? data[0]?.fullName || '' : data.fullName || '';
  //       setFullName(customerName);
  //     } catch (error) {
  //       console.error("Error fetching customer data:", error);
  //     }
  //   };

  //   if (userId) {
  //     fetchProfileType();
  //   }
  // }, [userId]);

useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsById/${buyProductId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProductData(data);
    //  alert(JSON.stringify(data));
        setDate(data.date);

         setId(data.id);
        setBuyProductTicketId(data.buyProductId);
        // alert(buyProductTicketId);
        setAddress(data.address);
        setCategory(data.category);
        setProductName(data.productName);
        setProductCatalogue(data.productCatalogue);
        setProductSize(data.productSize);
        setRate(data.rate);
        setDiscount(data.discount);
        setAfterDiscount(data.afterDiscountPrice);
        setSelectedColors(data.selectedColors);
        setTotalAmount(data.totalAmount);
        setRequiredQuantity(data.requiredQuantity);
        setAddressType(data.addressType);
        setCustomerId(data.customerId);
        setState(data.state);
        setDistrict(data.district);
        setPincode(data.zipCode);
        setMobileNumber(data.customerPhoneNumber);
        setColor(data.color);
       setCustomerName(data.customerName);
       setDeliveryCharges(data.deliveryCharges);
       setServiceCharges(data.serviceCharges);
       setTotalPaymentAmount(data.totalPaymentAmount);
       setTechnicianConfirmationCode(data.technicianConfirmationCode);
       setPaymentMode(data.paymentMode);
       setTransactionDetails(data.utrTransactionNumber);
       setTechnicianDetails(data.technicianDetils);
       setInvoiceDetails(data.invoiceDetails);
       setDeliveryDate(data.deliveryDate);

        } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [buyProductId]);

  const validateForm = () => {
    let newErrors = {};

    if (!deliveryDate) newErrors.deliveryDate = "Delivery Date is required.";
    if (!technicianDetails) newErrors.technicianDetails = "Technician Details are required.";
    if (!invoiceDetails) newErrors.invoiceDetails = "Invoice Details are required.";
    if (!warrantyPeriod) newErrors.warrantyPeriod = "Warranty Period is required.";
    if (!assignedTo) newErrors.assignedTo = "Please select an assignee.";
    if (productInvoice.length === 0) newErrors.productInvoice = "Please upload an invoice.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetQuotation = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    } 
  
    // const primaryAddress = addresses.find((addr) => addr.type === "primary");
    // const state = primaryAddress?.state || "";
    // const district = primaryAddress?.district || "";
    // const pincode = primaryAddress?.zipCode || "";
    // const mobileNumber = primaryAddress?.mobileNumber || "";
  
    const payload = {
      BuyProductId: buyProductTicketId,
      id: id,
      date: date,
      Address: address,
      CustomerPhoneNumber: mobileNumber,
      category: category,
      status: "Assigned",
      productName: productName,
      ProductCatalogue: productCatalogue,
      productSize: productSize,
      rate: rate.toString(),
      discount: discount.toString(),
      afterDiscountPrice: afterDiscount.toString(),
      color: color,
      selectedColors: selectedColors,
      requiredQuantity: requiredQuantity.toString(),
      totalAmount: totalAmount.toString(),
      AssignedTo: "Customer",
      DeliveryCharges: deliveryCharges,
      ServiceCharges: serviceCharges,
      TotalPaymentAmount: totalPaymentAmount,
      AddressType: addressType,
      State: state,
      District: district,
      ZipCode: pincode,
      CustomerId: customerId,
      CustomerName: customerName,
      RequestedBy: customerName,
      PaymentMode: paymentMode,
      UTRTransactionNumber: transactionDetails,
      TechnicianConfirmationCode: technicianConfirmationCode,
      DeliveryDate: deliveryDate,
      TechnicianDetils: technicianDetails,
      ProductView: "Assigned",
      InvoiceDetails: invoiceDetails,
      UploadInvoice: uploadedFiles.map((file) => file.src),
      WarrantyPeriod: warrantyPeriod,
    };
  
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/${buyProductId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
       throw new Error("Failed to update Buy Product Invoice Details.");
      }
      alert('Product Order Forwarded to Customer Successfully!');
      navigate("/adminNotifications");
    } catch (error) {
      console.error("Error update Buy Product Invoice Details:", error);
      window.alert('Failed to update Buy Product Invoice Details. Please try again later.');    }
  };
  
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
  //     zipCode: pincode, // Corrected field name for consistency
  //   };
  
  //   console.log('New Address:', newAddr); // Debugging
  
  //   setAddresses((prevAddresses) => [...prevAddresses, newAddr]);
  //   resetAddressForm();
  //   setShowModal(false);
  // };
  

  // // Reset address form fields
  // const resetAddressForm = () => {
  //   setNewAddress('');
  //   setAddressType('');
  //   setState('');
  //   setDistrict('');
  //   setPincode('');
  // };

  // // Handle secondary address selection
  // const handleSecondaryAddressSelect = (id) => {
  //   const updatedAddresses = addresses.map((address) =>
  //     address.id === id
  //       ? { ...address, type: 'primary' }
  //       : address.type === 'primary'
  //       ? { ...address, type: 'secondary' }
  //       : address
  //   );
  //   setAddresses(updatedAddresses);
  //   setShowSecondaryAddresses(false); // Collapse secondary addresses view
  // };

  // // Handle address editing
  // const handleAddressEdit = (id) => {
  //   const addressToEdit = addresses.find((address) => address.id === id);
  //   if (addressToEdit) {
  //     setNewAddress(addressToEdit.address);
  //     setAddressType(addressToEdit.type);
  //     setState(addressToEdit.state);
  //     setDistrict(addressToEdit.district);
  //     setPincode(addressToEdit.pincode);
  //     setShowModal(true);
  //     handleAddressDelete(id); // Remove the address to re-add it after edit
  //   }
  // };

  // // Handle address deletion
  // const handleAddressDelete = (id) => {
  //   const updatedAddresses = addresses.filter((address) => address.id !== id);
  //   setAddresses(updatedAddresses);
  // };

  // useEffect(() => {
  //   const fetchProducts = async () => {
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
  //     setFilteredSuggestions(
  //       productSuggestions.filter((name) =>
  //         name.toLowerCase().startsWith(productName.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setFilteredSuggestions([]);
  //   }
  // }, [productName, productSuggestions]);
  
    // Handle file upload
    const handleFileChange = (e) => {
      
      const files = Array.from(e.target.files);
      if (files.length + productInvoice.length > 1) {
        alert("You can upload up to 1 file.");
        return;
      }
      setProdctInvoice([...productInvoice, ...files]);
      setShowAlert(true);
      setError((prev) => ({ ...prev, productInvoice: "" }));
    };
  
    const handleUploadFiles = async () => {
      setLoading(true);
      setShowAlert(false);
      
      const uploadedFilesList=[];
      for (let i = 0; i < productInvoice.length; i++) {
        const file = productInvoice[i];
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


  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {/* Sidebar menu for Larger Screens */}
      {!isMobile && (
        <div className=" ml-0 p-0 adm_mnu h-90">
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

      {/* Main Content */}
      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
      <h3 className="mb-4 text-center">Buy Products Orders</h3>
        <div className="bg-white rounded-3 p-4 bx_sdw w-100">
          <form className="form" onSubmit={handleSubmit}>
                <div className="text-center">
                <strong className="m-2 fs-5">Order Number:<span>{buyProductTicketId}</span></strong>
                </div>

                <div className="form-group">
              <label>
                Customer Name <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                readOnly
              />
            </div>

              <div className="form-group">
                <label>Customer Address <span className="req_star">*</span></label>
                <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Customer Address"
                readOnly
              />
              </div>

            <div className="form-group">
              <label>Category <span className="req_star">*</span></label>
              <input
              type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Product Name <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
                readOnly
              />
              {/* {filteredSuggestions.length > 0 && (
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
              )} */}
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
                placeholder="Product Catalogue"
                readOnly
              />
            </div>

            <div className="row">
            <div className="col-md-6">
              <label>Product Size <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
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
                  onChange={rate}
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
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label>Price After Discount <span className="req_star">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={afterDiscount}
                  // onChange={(e) => setAfterDiscount(e.target.value)}
                  placeholder="After Discount"
                  readOnly
                />
              </div>
              </div>

            {/* <button
              type="button"
              className="btn btn-warning text-white w-50 mt-2"
              onClick={() =>
                navigate(`/buyproduct-view/${id}/${userId}/${userType}`, {
                  state: {
                    productName,
                    productCatalogue,
                    productSize,
                    color,
                    rate,
                    discount,
                    // afterDiscount,
                    requiredQuantity,
                  },
                })
              }
            >
              View Product
            </button> */}

            <div className="row">
              <div className="row ticket-info" >
              <div className="col-md-6">
              <p><strong className="me-2"> Choose Color (Optional):</strong>{color}</p>
              <p><strong className="me-2"> Select Required Color:</strong>{selectedColors}</p>
              <p><strong className="me-2"> Required Quantity:</strong>{requiredQuantity}</p>
              <p><strong className="me-2"> Total Amount:</strong>{totalAmount}</p>
              </div>

              <div className="col-md-6">
              <p><strong className="me-2"> Delivery Charges:</strong>{deliveryCharges}</p>
              <p><strong className="me-2"> Service Charges:</strong>{serviceCharges}</p>
              <p><strong className="me-2"> Total Payment Amount:</strong>{totalPaymentAmount}</p>
              </div>
              </div>
        <div className='payment m-2'>
        <label className='bg-warning fw-bold fs-5 w-100 p-2'>Payment Mode</label>
        <label className='fs-5 m-1'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2 border-dark"
            checked={paymentMode === 'online'}
            readOnly
             />
            Pay Through Online
          </label>
          <label className='fs-5 m-1'>
            <input 
            type="checkbox" 
            className="form-check-input border-secondary m-2 border-dark"
            checked={paymentMode === 'technician'}
            readOnly
            />
            Pay On In Presence of Technician
          </label>
    </div>
    <div className="form-group">
              <label>Payment Transaction Details </label>
              <input
                type="text"
                className="form-control "
                value={transactionDetails}
                onChange={(e) => setTransactionDetails(e.target.value)}
                placeholder="Payment Transaction Details"
                readOnly
              />
            </div>
          <div className="form-group">
              <label>Delivery Date <span className="req_star">*</span></label>
              <input
                type="date"
                className="form-control "
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="dd-mm-yyyy"
                required
              />
              {error.deliveryDate && <p className="text-danger">{error.deliveryDate}</p>}
            </div> 

            <div className="form-group">
              <label>Technician Details <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={technicianDetails}
                onChange={(e) => setTechnicianDetails(e.target.value)}
                placeholder="Enter Technician Details"
                required
              />
            {error.technicianDetails && <p className="text-danger">{error.technicianDetails}</p>}            </div>

            <div className="form-group">
              <label>Invoice Details <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={invoiceDetails}
                onChange={(e) => setInvoiceDetails(e.target.value)}
                placeholder="Enter Invoice Details"
                required
              />
            {error.invoiceDetails && <p className="text-danger">{error.invoiceDetails}</p>}
          <div className="form-group">
              <label className="fs-5">Warranty Period <span className="req_star">*</span></label>
              <input
                type="date"
                className="form-control"
                value={warrantyPeriod}
                onChange={(e) => setWarrantyPeriod(e.target.value)}
                placeholder="DD-MM-YYYY"
                required
              />
              {error.warrantyPeriod && <p className="text-danger">{error.warrantyPeriod}</p>}
            </div>
<div className="form-group">
          <label className="section-title fs-5 m-1">Upload Invoice</label>
          <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                required
              />
              {error.productInvoice && <p className="text-danger">{error.productInvoice}</p>}
              {showAlert && (
                <div className="alert alert-danger  mt-2">
                  <strong>Note:</strong> Invoice will be uploaded only once; if uploaded, it cannot be changed.  
                  <br />
                  Please click the <strong>Upload Invoice</strong> button to upload the selected Invoice.
                </div>
              )}
              <div className="mt-1">
                {productInvoice.map((file, index) => (
                <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-1"
                onClick={handleUploadFiles}
                disabled={loading || productInvoice.length === 0}
              >
                {loading ? 'Uploading...' : 'Upload Invoice'}
              </button>
              {/* <button className='btn btn-warning m-1' onClick={handleUploadInvoice}
              >Save</button> */}
          </div>
          </div> 

            <div className="col-md-6">
              <label>Order Confirmation Code <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={technicianConfirmationCode}
                // onChange={(e) => setChooseColors(e.target.value)}
                placeholder="Order Confirmation Code"
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label>Assigned To <span className="req_star">*</span></label>
              <select
                type="text"
                className="form-control"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select AssignedTo</option>
                <option>Customer</option>

              </select>
              {error.assignedTo && <p className="text-danger">{error.assignedTo}</p>}
            </div>

            <div className="mt-4 text-end">
                <Button type="submit" className="btn btn-warning text-white mx-2"onClick={handleGetQuotation} title="Forward">
                <ForwardIcon />
                </Button>
    
            </div>
            
              
              {/* <div className="col-md-6">
                <label>
                  Required Quantity <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={requiredQuantity}
                  onChange={(e) => setRequiredQuantity(e.target.value)}
                  placeholder="Enter Required Quantity"
                />
              </div> */}

              {/* <div className="col-md-6">
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

              <div className="col-md-6">
                <label>
                  Delivery Charges <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={deliveryCharges}
                  onChange={(e) => setDeliveryCharges(e.target.value)}
                  placeholder="Delivery Charges"
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label>
                  Service Charges <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceCharges}
                  onChange={(e) => setServiceCharges(e.target.value)}
                  placeholder="Service Charges"
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label>
                  Total Payment Amount <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={totalPaymentAmount}
                  onChange={(e) => setTotalPaymentAmount(e.target.value)}
                  placeholder="Total Payment Amount"
                  readOnly
                />
              </div> */}

              
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

            {/* <div className="d-flex gap-5 mt-3">
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
                Buy Product
              </button>
            </div> */}
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
      `}</style>    
    </div>
  );
};

export default AdminBuyProductOrders;