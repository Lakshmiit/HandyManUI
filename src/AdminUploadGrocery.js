import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; 
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadIcon from '@mui/icons-material/Upload';
import AdminSidebar from './AdminSidebar';
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import {  Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const AdminUploadGrocery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [groceryName, setGroceryName] = useState("");
  const [category, setCategory] = useState("");
  const [groceryPhotos, setGroceryPhotos] = useState([]); 
  const [rate, setRate] = useState("");
  const [discount, setDiscount] = useState("");
  const [deliveryInDays,setDeliveryInDays] =useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); 
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 
  const { selectedUserType} = useParams();
  const [stockLeft, setStockLeft] = useState('');
  const [code, setCode] = useState('');
  const [units, setUnits] = useState('');
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + groceryPhotos.length > 1) {
      alert("You can only upload up to 1 files.");
      return;
    }
    setGroceryPhotos([...groceryPhotos, ...selectedFiles]);
    setShowAlert(true);
  };

  // Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); 
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const handleUploadFiles = async () => {
    setLoading(true);
    setShowAlert(false);
    const uploadedFilesList = [];

    for (let i = 0; i < groceryPhotos.length; i++) {
      const file = groceryPhotos[i];
      const fileName = file.name;
      const mimeType = file.type;
      const byteArray = await getFileByteArray(file);
      const response = await uploadFile(byteArray, fileName, mimeType, file);
      if (response) {
        uploadedFilesList.push({
          src: response, 
          alt: fileName  
        });
        alert("Image Uploaded Sucessfully"); 
      }
      else {
        alert("Failed Upload Image");
      }
    }
    setUploadedFiles(uploadedFilesList);
    setLoading(false);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const payload = {
      id: "unique-id",   
      date: "string",
      GroceryItemId: "string",
      name: groceryName,
      category: category,
      images: uploadedFiles.map(file => file.src),
      mrp: parseFloat(rate).toString(),
      discount: parseFloat(discount).toString(),
      afterDiscount: (parseFloat(rate) - (parseFloat(rate) * parseFloat(discount) / 100)).toString(),
      stockLeft: stockLeft,
      deliveryIn: deliveryInDays,
      status: "Pending Approval",
      requestedBy: "Admin",
      Code: code,
      Units: units,
    };

    try {
      const response = await fetch("https://handymanapiv2.azurewebsites.net/api/UploadGrocery/UploadGrocery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)   
      });

      if (response.ok) {
        alert("Grocery Uploaded Successfully!");
        navigate(`/adminGroceryList/Admin`);
      } else {
        alert("Please fill in all mandatory fields.");
        alert("Failed to upload grocery.");
      }
    } catch (error) {
      alert("An error occurred while uploading the grocery.");
    }
  };

  return (
      <div className="d-flex flex-row justify-content-start align-items-start mt-mob-50">
          {/* Sidebar */}
          {!isMobile && (
          <div className="ml-0 m-4 p-0 adm_mnu">
          <AdminSidebar userType={selectedUserType}/>
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
                <AdminSidebar userType={selectedUserType} />
              </div>
          )}
        </div>
      )}

       <div className={`container m-3 ${isMobile ? 'w-100' : 'w-75'}`}>
        <h3 className="mb-3 text-center">Upload Grocery</h3>
        <div className="bg-white rounded-3 p-3 bx_sdw w-60 m-auto">
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="form-group">
              <label>Product Name <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={groceryName}
                onChange={(e) => setGroceryName(e.target.value)}
                placeholder="Enter Product Name"
              />
            </div>
            {/* Category */}
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option>Choose Category</option>
                <option>Offers</option>
                <option>Vegetables & Fruits Offers</option> 
                <option>Grocery Offers</option> 
                <option>Baby Products</option>
                <option>Dry Fruits & Bakery</option>
                <option>Biscuits & Chocolates</option>
                <option>Dairy, Bread & Eggs</option>
                <option>Oils, Ghee & Dals</option>
                <option>Home Needs</option>
                <option>Instant Food, Chips & Namkeen</option>
                <option>Masala, Spices, Sugar & Salt</option>
                <option>Personal Care</option>
                <option>Puja Essentials</option>
                <option>Rice, Ravva & Flours</option>
                <option>Snacks & Branded Foods</option>
                <option>Stationary</option>
                <option>Tea, Coffee & Sweets</option>
                <option>Vegetables & Fruits</option>
                {/* <option>Family Pack </option> */}
                {/* <option>Staples & Grains</option> */}
              </select>
            </div> 

            {/* Units */}
            <div className="form-group">
              <label>Units</label>
              <input
                type="text"
                className="form-control"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="Enter Units"
              />
            </div>

            {/* Code */}
            <div className="form-group">
              <label>Code</label>
              <input
                type="text"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Code"
              />
            </div>

            {/* Product Photos */}
            <div className="form-group">
              <label>Product Photos <span className="req_star">*</span></label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
              />
              {showAlert && (
                <div className="alert alert-danger  mt-2">
                  Please click the <strong>Upload Files</strong> button to upload the selected images.
                </div>
              )}
              <div className="mt-2">
                {groceryPhotos.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleUploadFiles}
                disabled={loading || groceryPhotos.length === 0}
              >
                {loading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>

            {/* Rate */}
            <div className="form-group">
              <label>Rate</label>
              <input
                type="text"
                className="form-control"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter Product Rate"
              />
            </div>

            {/* Discount */}
            <div className="form-group">
              <label>Discount</label>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="If any Discount Enter Percentage"
              />
            </div>

             {/* GST */}
            {/* <div className="form-group">
              <label>GST</label>
              <input
                type="text"
                className="form-control"
                value={gst}
                onChange={(e) => setGST(e.target.value)}
                placeholder="Enter GST Percentage"
              />
            </div> */}

             {/* After Discount Price */}
            <div className="form-group">
              <label>After Discount Price</label>
              <input
                type="text"
                className="form-control"
                value={`${Math.round(Number(rate || 0) * (1 - (Number((discount || "0").toString().replace("%", "")) / 100)))} /-`}
                />
            </div>
 
            {/* Delivery In Days */}
            <div className="form-group">
              <label>Delivery In Minutes <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={deliveryInDays}
                onChange={(e) => setDeliveryInDays(e.target.value)}
                placeholder="Delivery In Minutes"
              />
            </div>

             {/* Stock Left */}
            <div className="form-group">
              <label>Stock Left <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={stockLeft}
                onChange={(e) => setStockLeft(e.target.value)}
                placeholder="Stock Left"
              />
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-between gap-3 mt-3">
      {/* Upload Product Button */}
      <button
        type="submit"
        className="btn btn-success w-100 d-flex justify-content-center align-items-center p-3 shadow-lg"
      >
        <UploadIcon className="me-2" />
        <span>Upload Grocery</span>
      </button>

      {/* View Single Product Button */}
      <button
        type="button"
        className="btn btn-primary w-100 d-flex justify-content-center align-items-center p-3 shadow-lg"
       
          onClick={() => navigate(`/adminGroceryList/Admin`)}
      >
        <VisibilityIcon className="me-2" />
        <span>View Product</span>
      </button>
    </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadGrocery;