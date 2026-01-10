import React, { useState, useEffect} from "react";
import "./App.css";
// import { v4 as uuidv4 } from 'uuid'; 
import AdminSidebar from './AdminSidebar';
// import Header from './Header.js';
import Footer from './Footer.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import ForwardIcon from '@mui/icons-material/Forward';
import { Button} from 'react-bootstrap'; // Import Bootstrap components for modal
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ArrowBack, Dashboard as MoreVertIcon} from '@mui/icons-material';

const AdminClosedBuyProductOrders = () => {
const Navigate = useNavigate();
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
// const [assignedTo, setAssignedTo] = useState('');
const [loading, setLoading] = useState(true);
// const [productInvoice, setProdctInvoice] = useState([]);
// const [uploadedFiles, setUploadedFiles] = useState([]);
// const [showAlert, setShowAlert] = useState(false);
const [paymentMode, setPaymentMode] = useState('');
const [transactionDetails, setTransactionDetails] = useState('');
const [customerId, setCustomerId] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [customerName, setCustomerName] = useState('');
const [date, setDate] = useState('');
const [uploadInvoice, setUploadInvoice] = useState([]);
// const [isClicked, setIsClicked] = useState(false);
const [status, setStatus] = useState('');
const [warrantyPeriod, setWarrantyPeriod] = useState('');
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
  console.log( productData, loading, status, addressType, id, customerId, date, emailAddress);
}, [productData, loading, status, addressType, id, customerId, date, emailAddress] );
 
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
        setStatus(data.status);
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
       setDeliveryDate(data.deliveryDate);
       setTechnicianDetails(data.technicianDetils);
       setInvoiceDetails(data.invoiceDetails);
       setTransactionDetails(data.utrTransactionNumber);
       setWarrantyPeriod(data.warrentyPeriod);
       setEmailAddress(data.customerEmail);
       const imageRequests =
        data.uploadInvoice?.map((photo) => fetch(
            `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
          )
          .then((res) => res.json()) 
            .then((data) => ({
            
              src: photo,
              imageData: data.imageData,
            }))
        ) || [];
        const images = await Promise.all(imageRequests);
        setUploadInvoice(images);
        } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [buyProductId]);

  const handleDownloadAllAttachments = async () => {
    if (uploadInvoice.length === 0) {
      alert("No files to download");
      return;
    }
  
    const zip = new JSZip();
    const folder = zip.folder("Download Invoice"); // Optional folder name inside ZIP
    // Add files to ZIP
    for (const invoice of uploadInvoice) {
      try {
        const response = await fetch(`data:image/jpeg;base64,${invoice.imageData}`);
        const blob = await response.blob();
        folder.file(invoice.src.split("/").pop(), blob); // Add file to the ZIP folder
      } catch (error) {
        console.error("Error fetching Invoice:", error);
      }
    }
    // Generate ZIP and download
    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "Download Invoice.zip");
    } catch (error) {
      console.error("Error generating ZIP:", error);
      alert("Failed to download Invoice. Please try again.");
    }
  };

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
                <strong className="mt-2">Order Number:<span>{buyProductTicketId}</span></strong>
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
            </button>
 */}
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
    {paymentMode === "technician" && (
    <div className="form-group">
              <label>Payment Transaction Details <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-group "
                value={transactionDetails}
                onChange={(e) => setTransactionDetails(e.target.value)}
                placeholder="Enter Payment Transaction Details"
                readOnly
              />
            </div>
    )}
    {/* <div className="form-group">
              <label>Delivery Date <span className="req_star">*</span></label>
              <input
                // type="date"
                className="form-control "
                value={deliveryDate}
                // onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="dd-mm-yyyy"
                readOnly
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
                readOnly
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
                readOnly
              />
{/* <div className="form-group">
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
              >Save</button>
          </div> */}
          <button className='btn btn-warning fs-5 m-2' onClick={handleDownloadAllAttachments}>Download Invoice</button>
          </div> 
          <div className="form-group">
              <label>Warranty Period<span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={warrantyPeriod} 
                onChange={(e) => setWarrantyPeriod(e.target.value)}
                placeholder="dd-mm-yyyy"
                readOnly
              />
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
            <div className="mt-2 text-end">
                <Button className="btn btn-warning text-white" 
                  onClick={() => Navigate(`/adminNotifications`)}
                   title="Back">
                  <ArrowBack /> 
                </Button>
            </div> 
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
      `}</style>    
    </div>
    <Footer /> 
    </>
  );
};

export default AdminClosedBuyProductOrders;