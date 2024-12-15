import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import {  Button } from 'react-bootstrap'; // Import Bootstrap components for modal
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AdminSiderBar from './AdminSidebar';

const ProductAdmin = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {selectedUserType} = useParams();
  const [productData, setProductData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [productType, setProductType] = useState("Approved");
  const [comments, setComments] = useState("");
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { productownedby } = useParams(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/${id}`);
        const data = await response.json();
        setProductData(data);

        const imageRequests =
          data.productPhotos?.map((photo) =>
            fetch(
              `https://handymanapiservices.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
            )
              .then((res) => res.json())
              .then((data) => ({
                src: photo,
                imageData: data.imageData,
              }))
          ) || [];
        const images = await Promise.all(imageRequests);
        setImageUrls(images);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  const handleSubmit = async () => {
    if (!productData) {
      console.error("No product data to submit.");
      return;
    }

    const payload = {
      ...productData,
      productStatus: productType,
      comments,
    };

    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Product status updated successfully.");
      } else {
        const errorData = await response.json();
        console.error("Error updating product:", errorData);
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting product data:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  if (!productData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const {
    productName,
    category,
    catalogue,
    productSize,
    color,
    rate,
    discount,
    specifications,
    warranty,
    additionalInformation,
  } = productData;

  const afterDiscountPrice = rate - (rate * discount) / 100;

  return (
    <div className="wrapper bg-light">
      <div className="container-fluid mt-4 h-100 d-flex flex-column">
        <div className="d-flex flex-row justify-content-start align-items-start">
          {/* Sidebar */}
          {!isMobile && (
          <div className=" ml-0 m-4 p-0 sde_mnu">
          <AdminSiderBar />
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
                <AdminSiderBar  />
              </div>
          )}
        </div>
      )}

          {/* Main Content */}
          <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
          <div className=" col-md-9">
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="mb-4 text-primary">Product Details</h3>

              {/* Carousel */}
              <div
                id="productCarousel"
                className="carousel slide mb-4 rounded"
                data-bs-ride="carousel"
              >
                {/* Indicators */}
                <div className="carousel-indicators">
                  {imageUrls.map((_, index) => (
                    <button
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                      aria-current={index === 0 ? 'true' : 'false'}
                      aria-label={`Slide ${index + 1}`}
                      key={index}
                    ></button>
                  ))}
                </div>

                {/* Carousel items */}
                <div className="carousel-inner">
                  {imageUrls.map((img, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? 'active' : ''}`}
                      key={img.src}
                    >
                      <img
                        src={`data:image/jpeg;base64,${img.imageData}`}
                        className="d-block w-100 rounded"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              {/* Product Details */}
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Category:</strong> {category}</p>
                  <p><strong>Name:</strong> {productName}</p>
                  <p><strong>Catalogue:</strong> {catalogue}</p>
                  <p><strong>Size:</strong> {productSize}</p>
                  <p><strong>Color:</strong> {color}</p>
                  <p><strong>Rate:</strong> ${rate}</p>
                  <p><strong>Discount:</strong> {discount}%</p>
                  <p><strong>Price After Discount:</strong> ${afterDiscountPrice.toFixed(2)}</p>
                </div>
                <div className="col-md-6">
                  <h5>Specifications</h5>
                  <ul>
                    {specifications?.map((spec, index) => (
                      <li key={index}>
                        {spec.label}: {spec.value}
                      </li>
                    ))}
                  </ul>
                  <h5>Warranty</h5>
                  <p>{warranty} months</p>
                  <h5>Additional Information</h5>
                  <p>{additionalInformation}</p>
                </div>
              </div>
               {/* Approval Section */}
               <div className="mt-4">
                  <h5>Approval</h5>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="productStatus"
                      id="approve"
                      value="Approved"
                      checked={productType === 'Approved'}
                      onChange={() => setProductType('Approved')}
                    />
                    <label className="form-check-label" htmlFor="approve">Approve</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="productStatus"
                      id="reject"
                      value="Reject"
                      checked={productType === 'Reject'}
                      onChange={() => setProductType('Reject')}
                    />
                    <label className="form-check-label" htmlFor="reject">Reject</label>
                  </div>
                  <textarea
                    className="form-control mt-3"
                    placeholder="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
  
                {/* Submit Button */}
                <div className="mt-3">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>

           
              {/* Submit Button */}
              <div className="mt-3">
                {/* View Single Product Button */}
      <button
        type="button"
        className='btn btn-warning text-white'
       
          onClick={() => navigate(`/product-list/${productownedby}`)}
      >
      
        <span>Back</span>
      </button>
              </div>
            </div>
          </div>
        </div>
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

export default ProductAdmin;
