import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./App.css"; // Add this for the required CSS.
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateIcon from '@mui/icons-material/Update';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';

const AdminUpdate = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { selectedUserType } = useParams(); 
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [catalogue, setCatalogue] = useState("");
  const [productSize, setProductSize] = useState("");
  const [units, setUnits] = useState("");
  const [productPhotos, setProductPhotos] = useState([]); // For storing multiple product photos
  const [rate, setRate] = useState("");
  const [discount, setDiscount] = useState("");
  const [specifications, setSpecifications] = useState([{ label: "", value: "" }]); // Initial specification with empty fields
  const [warranty, setWarranty] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for file upload
  const [uploadedFiles, setUploadedFiles] = useState([]); // To store the uploaded files (URLs or file names)
  const [color, setColor] = useState("");
  const [specificationDesc, setSpecificationDesc] = useState("");

  // Handle file input change (multiple files)
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + productPhotos.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }
    setProductPhotos([...productPhotos, ...selectedFiles]);
  };

// Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

  // Handle file upload
  const handleUploadFiles = async () => {
    setLoading(true);
    const uploadedFilesList = [];

    // Loop through selected files and upload each one
    for (let i = 0; i < productPhotos.length; i++) {
      const file = productPhotos[i];
      const fileName = file.name;
      const mimeType = file.type;

      // Convert the file to a byte array (use FileReader)
      const byteArray = await getFileByteArray(file);

      // Upload the file and get the response (filename or URL)
      const response = await uploadFile(byteArray, fileName, mimeType, file);
      if (response) {
        uploadedFilesList.push({
          src: response, // Assuming the response contains the file URL or filename
          alt: fileName  // Using the file name as the alt text
        });
        alert("Image Updated Sucessfully"); 
      }
      else {
        alert("Failed Upload Image");
      }
    }

    // Once all files are uploaded, update the state with the uploaded files
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

  // Upload the file using the backend API
  const uploadFile = async (byteArray, fileName, mimeType, file) => {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([byteArray], { type: mimeType }), fileName);
      formData.append('fileName', fileName);

      const response = await fetch('https://handymanapiservices.azurewebsites.net/api/FileUpload/upload?filename=' + fileName, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
        },
        body: formData,
      });

      const responseData = await response.text();
      return responseData || ''; // Assuming the response contains the file URL or filename
    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      id: "unique-id", // Replace with unique ID logic if necessary
      productName: productName,
      images: uploadedFiles.map(file => ({
        src: file.src, // URL or file path
        alt: file.alt   // File name as alt text
      })),
      catalog: catalogue,
      colors: color, // Assuming hardcoded colors, replace as needed
      rate: parseFloat(rate),
      discount: parseFloat(discount),
      afterDiscountPrice: parseFloat(rate) - parseFloat(discount),
      specifications: specifications.map(spec => ({
        label: spec.label,
        value: spec.value,
      })),
      specificationDesc: specificationDesc,
      warranty: warranty,
      additionalInfo: moreInfo
    };

    try {
      const response = await fetch("https://handymanapiservices.azurewebsites.net/api/product/productupload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Product updated successfully!");
        // Reset the form or perform other actions as needed
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      alert("An error occurred while updating the product.");
    }
  };

  // Handle change of specification field (label or value)
  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
  };

  const handleSpecificationDescChange = (value) => {
    setSpecificationDesc(value);
  }

  // Handle removal of a specification
  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
  };

  // Handle adding a new specification
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { label: "", value: "" }]);
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
        <h3 className="mb-3 text-center">Update Products</h3>
        <div className="bg-white rounded-3 p-3 bx_sdw w-60 m-auto">
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="form-group">
              <label>Product Name <span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
              />
            </div>
            {/* Category */}
            <div className="form-group">
              <label>Category</label>
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

            {/* Catalogue */}
            <div className="form-group">
              <label>Catalogue<span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={catalogue}
                onChange={(e) => setCatalogue(e.target.value)}
                placeholder="Enter Catalogue"
              />
            </div>

            {/* Product Size */}
            <div className="form-group">
              <label>Size<span className="req_star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                placeholder="Enter Product Size"
              />
            </div>

            {/* Color */}
            <div className="form-group">
              <label>Color(Optional)</label>
              <input
                type="text"
                className="form-control"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter Color"
              />
            </div>

            {/* Units */}
            <div className="form-group">
              <label>Units <span className="req_star">*</span></label>
              <input type="text"
              className="form-control"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="Enter Units" />
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
              <div className="mt-2">
                {productPhotos.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleUploadFiles}
                disabled={loading || productPhotos.length === 0}
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


            {/* Product Specifications */}
            <div className="form-group">
              <label>Product Specifications <span className="req_star">*</span></label>
              {specifications.map((spec, index) => (
                <div key={index} className="d-flex gap-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Specification Name"
                    value={spec.label}
                    onChange={(e) => handleSpecificationChange(index, "label", e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Specification Value"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveSpecification(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <textarea
                  type="text"
                  className="form-control mt-2"
                  placeholder="Optional"  
                  value={specificationDesc}
                  onChange={(e) => handleSpecificationDescChange(e.target.value)}           
              />
              <button type="button" className="btn btn-primary" onClick={handleAddSpecification}>
                Add Specification
              </button>
            </div>

            {/* Warranty and Additional Info */}
            <div className="form-group">
              <label>Warranty</label>
              <input
                type="text"
                className="form-control"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="Enter Warranty Period"
              />
            </div>

            <div className="form-group">
              <label>More Info</label>
              <input
                type="text"
                className="form-control"
                value={moreInfo}
                onChange={(e) => setMoreInfo(e.target.value)}
                placeholder="Additional Information"
              />
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-between gap-3 mt-3">
      {/* Update Product Button */}
      <button
        type="submit"
        className="btn btn-success w-100 d-flex justify-content-center align-items-center p-3 shadow-lg"
      >
        <UpdateIcon className="me-2" />
        <span>Update Product</span>
      </button>

      {/* View Single Product Button */}
      <button
        type="button"
        className="btn btn-primary w-100 d-flex justify-content-center align-items-center p-3 shadow-lg"
      >
        <VisibilityIcon className="me-2" />
        <span>View Product</span>
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

export default AdminUpdate;
