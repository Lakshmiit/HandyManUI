import React, { useState, useEffect} from "react";
import "./App.css";
// import { v4 as uuidv4 } from 'uuid'; 
import AdminSidebar from './AdminSidebar';
// import Header from './Header.js';
import Footer from './Footer.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowBack, Dashboard as MoreVertIcon} from '@mui/icons-material';
// import ForwardIcon from '@mui/icons-material/Forward';
import { Button } from 'react-bootstrap'; 
// import axios from 'axios';

const AdminBuyProductOrdersView = () => {
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
const [emailAddress, setEmailAddress] = useState("");

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
  console.log( productData,addressType, id, customerId, date, emailAddress);
}, [productData,addressType, id, customerId, date, emailAddress]);

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
       setEmailAddress(data.customerEmail); 
        } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [buyProductId]);

  // const validRate = Number(rate) || 0;
  // const validDiscount = Number(discount) || 0;
  // const afterDiscountPrice = parseFloat((validRate - (validRate * validDiscount) / 100).toFixed(2));
  // const totalAmount = parseFloat((requiredQuantity * afterDiscountPrice).toFixed(2));

  
  // // Generate ticket ID in the format VSKPAKP002
  // const ticketIdPrefix = "VSKPAKP";
  // const ticketIdSuffix = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  // const ticketId = `${ticketIdPrefix}${ticketIdSuffix}`;

  // const handleGetQuotation = async (e) => {
  //   e.preventDefault();
   
  //   // const primaryAddress = addresses.find((addr) => addr.type === "primary");
  //   // const state = primaryAddress?.state || "";
  //   // const district = primaryAddress?.district || "";
  //   // const pincode = primaryAddress?.zipCode || "";
  //   // const mobileNumber = primaryAddress?.mobileNumber || "";
  
  //   const payload = {
  //     BuyProductId: buyProductTicketId,
  //     id: id,
  //     date: date,
  //     Address: address,
  //     CustomerPhoneNumber: mobileNumber,
  //     category: category,
  //     status: "Closed",
  //     productName: productName,
  //     ProductCatalogue: productCatalogue,
  //     productSize: productSize,
  //     rate: rate.toString(),
  //     discount: discount.toString(),
  //     afterDiscountPrice: afterDiscount.toString(),
  //     color: color,
  //     selectedColors: selectedColors,
  //     requiredQuantity: requiredQuantity.toString(),
  //     totalAmount: totalAmount.toString(),
  //     AssignedTo: "Customer",
  //     DeliveryCharges: deliveryCharges,
  //     ServiceCharges: serviceCharges,
  //     TotalPaymentAmount: totalPaymentAmount,
  //     AddressType: addressType,
  //     State: state,
  //     District: district,
  //     ZipCode: pincode,
  //     CustomerId: customerId,
  //     CustomerName: customerName,
  //     RequestedBy: customerName,
  //     PaymentMode: paymentMode,
  //     UTRTransactionNumber: transactionDetails,
  //     TechnicianConfirmationCode: technicianConfirmationCode,
  //     DeliveryDate: deliveryDate,
  //     TechnicianDetils: technicianDetails,
  //     ProductView: "Assigned",
  //     InvoiceDetails: invoiceDetails,
  //     UploadInvoice: uploadedFiles.map((file) => file.src),
  //     CustomerEmail: emailAddress,
  //     OrderId: "",
  //     OrderDate: "",
  //     PaidAmount: "",
  //     TransactionStatus: "",
  //     TransactionType: "",
  //     InvoiceId: "",
  //     InvoiceURL: "",
  //   };
   
  //   try {
  //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/${buyProductId}`,{
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     if (!response.ok) {
  //      throw new Error("Failed to update Buy Product Invoice Details.");
  //     }
  //     alert('Product Order Forwarded to Customer Successfully!');
  //     navigate("/adminNotifications");
  //   } catch (error) {
  //     console.error("Error update Buy Product Invoice Details:", error);
  //     window.alert('Failed to update Buy Product Invoice Details. Please try again later.');    }
  // };
  
  // Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

   const handleSubmit = (e) => {
     e.preventDefault();
   };

    // Handle file upload
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length + productInvoice.length > 1) {
        alert("You can upload up to 1 file.");
        return;
      }
      setProdctInvoice([...productInvoice, ...files]);
      setShowAlert(true);
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
<>
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
                <strong className="m-2">Order Number:<span>{buyProductTicketId}</span></strong>
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
                as="textarea"
                type="text"
                className="form-control"
                value={`${address}, ${district}, ${state}, ${pincode} ${mobileNumber}`}
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
            <div className="row">
              <div className="row ticket-info" >
              <div className="col-md-6">
              <p><strong className="me-2"> Choose Color (Optional):</strong>{color}</p>
              <p><strong className="me-2"> Select Required Color:</strong>{selectedColors}</p>
              <p><strong className="me-2"> Required Quantity:</strong>{requiredQuantity}</p>
              <p><strong className="me-2"> Total Amount:</strong>{`Rs ${totalAmount}/-`}</p>
              </div>
              <div className="col-md-6">
              <p><strong className="me-2"> Delivery Charges:</strong>{deliveryCharges}</p>
              <p><strong className="me-2"> Service Charges:</strong>{serviceCharges}</p>
              <p><strong className="me-2"> Delivery Date:</strong>{deliveryDate}</p>
              <p><strong className="me-2"> Total Payment Amount:</strong>{`Rs ${totalPaymentAmount}/-`}</p>
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
              <label>Payment Transaction Details <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control "
                value={transactionDetails}
                onChange={(e) => setTransactionDetails(e.target.value)}
                placeholder="Payment Transaction Details"
                readOnly
              />
            </div>
    {/* <div className="form-group">
              <label>Delivery Date <span className="req_star">*</span></label>
              <input
                // type="date"
                className="form-control "
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="dd-mm-yyyy"
                required
              />
            </div>  */}
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
            </div>
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
<div className="form-group">
          <label className="section-title fs-5 m-1">Upload Invoice</label>
          <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                required
              />
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
            </div>
            <div className="mt-4 text-end">
            <Button className="btn btn-warning text-white mx-2" onClick={() => navigate(`/buyProductNotificationGrid`)} title="Back">
                <ArrowBack />
                </Button>
                {/* <Button type="submit" className="btn btn-warning text-white mx-2" onClick={handleGetQuotation} title="Forward">
                <ForwardIcon />
                </Button> */}
            </div>
            </div>
          </form>
        </div>
      </div>
      {/* Styles for floating menu */}
<style jsx>{`
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
    <Footer /> 
</>
  );
};

export default AdminBuyProductOrdersView;