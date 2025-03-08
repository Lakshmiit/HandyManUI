import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from 'react-bootstrap'; // Import Bootstrap components for modal

const BuyProdcutView = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {selectedUserType} = useParams();
  const {userType} = useParams();
  const [productData, setProductData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [otherThanProduct] = useState("");
    const [requiredQuality] = useState("");
    const [units] = useState("");
    //const [catalogue, setProductCatalogue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate
    const { userId } = useParams(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/${id}`);
        const data = await response.json();
        setProductData(data);

        const imageRequests =
          data.productPhotos?.map((photo) =>
            fetch(
              `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
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

  // const handleSubmit = async () => {
  //   if (!productData) {
  //     console.error("No product data to submit.");
  //     return;
  //   }

  //   const payload = {
  //     ...productData,
  //     productStatus: productType,
  //     comments,
  //   };

  //   try {
  //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       alert("Product status updated successfully.");
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Error updating product:", errorData);
  //       alert("Failed to update product. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting product data:", error);
  //     alert("An error occurred. Please try again later.");
  //   }
  // };

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
    <div className="wrapper bg-light d-flex">
      {/* Sidebar menu for Larger Screens */}
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu">
          <Sidebar  userType={selectedUserType}/>
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
                <Sidebar userType={selectedUserType}/>
              </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
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
                        style={{ height: '300px', objectFit: 'cover' }}
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
                  <p><strong>Rate:</strong> Rs {rate}</p>
                  <p><strong>Discount:</strong> {discount}%</p>
                  <p><strong>Price After Discount:</strong> Rs {afterDiscountPrice.toFixed(2)}</p>
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
                  <p>{warranty}</p>
                  <h5>Additional Information</h5>
                  <p>{additionalInformation}</p>
                </div>
              </div>

           
              {/* Submit Button */}
              <div className="mt-3">
                {/* View Single Product Button */}
    
     
     <button
  type="button"
  className="btn btn-warning text-white w-50 mt-2"
  onClick={() =>
    navigate(`/buyProducts/${userId}/${userType}`, {
      state: {
        productName,
        catalogue,
        productSize,
        color, 
        otherThanProduct,
        requiredQuality,
        units,
        rate,
        discount,
        afterDiscountPrice,
      },
    })
  }
>
  <span>Back</span>
      </button>
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
      `}</style>
      </div>
  );
};

export default BuyProdcutView;
