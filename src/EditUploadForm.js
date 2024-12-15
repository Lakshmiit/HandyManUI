import React, { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; // Add this for the required CSS.
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';


const ProductUpload = () => {
    const { id } = useParams(); // Retrieve the dynamic id from URL
    const [selectedUserType] = useState("customer");
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productPhotos, setProductPhotos] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const [productName, setProductName] = useState("");
    const [catalogue, setCatalogue] = useState("");
    const [productSize, setProductSize] = useState("");
    const [units, setUnits] = useState("");
    const [rate, setRate] = useState("");
    const [discount, setDiscount] = useState("");
    const [specifications, setSpecifications] = useState([{ label: "", value: "" }]);
    const [specificationDesc, setSpecificationDesc] = useState("");
    const [warranty, setWarranty] = useState("");
    const [moreInfo, setMoreInfo] = useState("");
    const [color, setColor] = useState("");
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const productResponse = await fetch(`https://handymanapiservices.azurewebsites.net/api/Product/${id}`);
                if (!productResponse.ok) {
                    throw new Error('Product not found');
                }
                const productData = await productResponse.json();
                console.log("productData:", productData);
                setProduct(productData);
                setProductName(productData.productName);
                setCatalogue(productData.catalog);
                setColor(productData.colors);
                setProductSize(productData.Size);
                setUnits(productData.unit);
                setRate(productData.rate);
                setDiscount(productData.discount);
                setSpecifications(productData.specifications || [{ label: "", value: "" }]);
                setSpecificationDesc(productData.specificationDesc);
                setWarranty(productData.warranty);
                setMoreInfo(productData.additionalInfo);
                setUploadedFiles(productData.images || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
        }
    }, [id]);


    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length + uploadedFiles.length > 5) {
            alert("You can only upload up to 5 files.");
            return;
        }
        setProductPhotos([...productPhotos, ...selectedFiles]);
        setAlertMessage("Please click on the Upload Files button to upload the Images.");
        setShowAlert(true);
    };

    const handleRemoveFile = (index) => {
        const updatedUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedUploadedFiles);
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
            alert("Image Uploaded Sucessfully"); 
          }
          else {
            alert("Failed Upload Image");
          }
        }
    
        // Once all files are uploaded, update the state with the uploaded files
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

            const response = await fetch('https://handymanapiservices.azurewebsites.net/api/FileUpload/upload?filename=' + fileName, {
                method: 'POST',
                headers: { 'Accept': 'text/plain' },
                body: formData
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
            id,
            productName,
            images: uploadedFiles.map(file => ({
                src: file.src,
                alt: file.alt
            })),
            catalog: catalogue,
            Size: productSize,
            colors: color,
            unit: units,
            rate: parseFloat(rate),
            discount: parseFloat(discount),
            afterDiscountPrice: parseFloat(rate) - parseFloat(discount),
            specifications: specifications.map(spec => ({
                label: spec.label,
                value: spec.value
            })),
            specificationDesc: specificationDesc,
            warranty,
            additionalInfo: moreInfo
        };

        try {
            const response = await fetch(`https://handymanapiservices.azurewebsites.net/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Product updated successfully!");
                navigate(`/product-list`);
            } else {
                alert("Please fill in all mandatory fields.");
                alert("Failed to update product.");
            }
        } catch (error) {
            alert("An error occurred while updating the product.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No data available for the selected product.</div>;
    }

    return (
        <div className="d-flex flex-row justify-content-start align-items-start">
            <div className="sidebar-container">
        <Sidebar userType={selectedUserType} />
      </div>

            <div className="m-3">
                <h3 className="mb-3 text-center">Update Product</h3>
                <div className="bg-white rounded-3 p-3 bx_sdw w-60 m-auto">
                    <form onSubmit={handleSubmit}>
                        {/* Product Name */}
                        <div className="form-group">
                            <label>Product Name <span className="req_star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={product.productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Enter Product Name"
                            />
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
                            placeholder="Enter Size"
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
                            <input 
                            type="text"
                            className="form-control"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            placeholder="Enter Units" 
                            />
                        </div>

                        {/* Product Images */}
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
                                        <div key={index} className="d-flex align-items-center gap-2 mb-2">
                                            <p>{file.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="btn btn-danger btn-sm px-2 py-1 gap-5"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                                {/* Other inputs */}
                                <div>
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="d-flex align-items-center gap-2 mb-2">
                                            <img src={file.src} alt={file.alt} width="100" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="btn btn-danger btn-sm px-2 py-1 gap-5"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                    {showAlert && 
                                    <div className="m-2 alert alert-info text-danger" role="alert">
                                        {alertMessage}
                                    </div>}
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
                            <label>Rate<span className="req_star">*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                placeholder="Enter Rate"
                            />
                        </div>
                        {/* Discount */}
                        <div className="form-group">
                            <label>Discount</label>
                            <input
                                type="number"
                                className="form-control"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                placeholder="Enter Discount"
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
                                onChange={(e) => handleSpecificationChange(index, "value", e.target.value)} />
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
                            onChange ={(e) => handleSpecificationDescChange(e.target.value)}
                        />

                        <button type="button" className="btn btn-primary" onClick={handleAddSpecification}>
                            Add Specification
                        </button>
                        </div>

                        {/* Warranty */}
                        <div className="form-group">
                            <label>Warranty</label>
                            <input
                                type="text"
                                className="form-control"
                                value={warranty}
                                onChange={(e) => setWarranty(e.target.value)}
                                placeholder="Enter Warranty"
                            />
                        </div>
                        {/* More Info */}
                        <div className="form-group">
                            <label>More Info</label>
                            <textarea
                                className="form-control"
                                value={moreInfo}
                                onChange={(e) => setMoreInfo(e.target.value)}
                                placeholder="Enter Additional Information"
                            />
                        </div>

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
                                onClick={() => navigate('/product-list')}
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

export default ProductUpload;
