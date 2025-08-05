import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import Header from './Header.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import { Button, Carousel, Modal } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';

const OffersProductCard = () => {
  const navigate = useNavigate();
   const location = useLocation();
   const encodedCategory = location.state?.encodedCategory || localStorage.getItem('encodedCategory');
   const {userType} = useParams();
  const {userId} = useParams(); 
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { selectedUserType } = useParams();
  const [productData, setProductData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
 const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  const fetchProductsAndAllImages = async () => {
    try {
      // const start = performance.now();

      const productRes = await fetch('https://handymanapiv2.azurewebsites.net/api/Product/GetAllProductList');
      const productList = await productRes.json();
      setProductData(productList);

      const allImagePromises = productList.flatMap(product => 
        product.productPhotos?.map(photo => 
          fetch(`https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`)
            .then(res => res.json())
            .then(data => {
              const byteCharacters = atob(data.imageData);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'image/jpeg' });
              const imageUrl = URL.createObjectURL(blob);
              return { productId: product.id, imageUrl };
            })
            .catch(() => null)
        ) || []
      );

      const imageResults = await Promise.allSettled(allImagePromises);
      const imageMap = {};
      imageResults.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          const { productId, imageUrl } = result.value;
          if (!imageMap[productId]) {
            imageMap[productId] = [];
          }
          imageMap[productId].push(imageUrl);
        }
      });

      setImageUrls(imageMap);
      setImageLoading(false);

      // const duration = performance.now() - start;
      // console.log(`All images loaded in ${duration.toFixed(1)} ms`);
    } catch (error) {
      console.error("Error loading all images fast:", error);
    }
  };

  fetchProductsAndAllImages();
}, []);

  
  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };
  
useEffect(() => {
  const handleCategoryClick = async () => {
    try {
      setSelectedCategory(encodedCategory);
      setProducts([]); 
      const url = `https://handymanapiv2.azurewebsites.net/api/Product/GetProductsByCategory?Category=${encodedCategory}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); 
    }
  };
  handleCategoryClick();
}, [encodedCategory]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!productData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      <div className="wrapper bg-light d-flex">
        {!isMobile && (
          <div className="ml-0 m-4 p-0 sde_mnu">
            <Sidebar userType={selectedUserType} />
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
                <Sidebar userType={selectedUserType} />
              </div>
            )}
          </div>
        )}

        <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
          <div className='d-flex justify-content-center mt-3'>
        <div className="position-relative flex-grow-1 ms-4">
          <input
            type="text"
            className="form-control w-60 m-2 ps-5"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trimStart())}
            />
            <SearchIcon
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              style={{ pointerEvents: 'none' }}
            />
          </div>
        {selectedCategory && (
          <div className="m-1 d-flex align-items-center position-relative" style={{ gap: '10px' }}>
          
          <Button
            variant="warning"
            size="sm"
            className="ms-2"
            onClick={() => setSelectedCategory(null)}
          >
            Show All Products
          </Button>
        </div>
        )}
</div>
            <div className="row g-4">
            {(selectedCategory ? products : productData)
  ?.filter(product => {
    const productName = product.productName?.toLowerCase().trim();
    const query = searchQuery.toLowerCase().trim();

    const normalize = str => str.endsWith('s') ? str.slice(0, -1) : str;

    return (
      productName.includes(query) ||
      normalize(productName).includes(normalize(query))
    );
  })
  .slice()
  .reverse()
  .map((product) => {
              const discountedPrice = product.rate && product.discount 
                ? ((product.rate - (product.rate * product.discount) / 100).toFixed(0)) 
                : product.rate;
              return (
                <div key={product.id} className="col-md-4">
                  {!isMobile ? (
                  <div className="card w-100 border-light rounded-4">
                  {imageLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '250px', background: '#f8f9fa' }}
                    >
                      <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : imageUrls[product.id]?.length > 0 ? (
                        <Carousel>
                        {imageUrls[product.id]?.map((img, index) => (
                          <Carousel.Item key={index}>
                            <img
                              loading="eager"
                              src={img}
                              className="card-img-top rounded-top zoomable-image"
                              style={{ height: "250px", width: 'auto', objectFit: "cover", cursor: "pointer" }}
                              alt={`product-image-${index}`}
                              onClick={() => handleImageClick(img)}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                  ) : (
                    <div 
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '250px', background: '#f8f9fa' }}
                    >
                      Loading
                    </div>
                  )}  
                      <div className="card-body p-1 m-1">
                        <h5 className="card-title">{product.productName}</h5>
                        <div className="card-text fw-bold text-primary fs-5 no-break"> After Discount Price: Rs {discountedPrice}</div>
                            <div className="card-text fw-bold text-muted fs-6" style={{ textDecoration: 'line-through' }}>MRP: Rs {product.rate}</div>
                            <div className="card-text fw-bold text-danger fs-6">Discount: {product.discount}%</div>
                            <div className="card-text fw-bold text-success fs-5">Free Delivery and Installation</div>
                      <Button
                        className="btn btn-warning w-50 fw-bold mt-2"
                        onClick={() => {
                          if (userId === "guest") {
                            window.location.href = "https://handymanserviceproviders.com/";
                          } else {
                            navigate(`/offersBuyProduct/${userType}/${userId}/${product.id}`);
                          }
                        }}
                      >
                        Buy Now
                      </Button>
                      </div>
                    </div>
                    ) : (
                      <div className="card w-100 border-light rounded-4 d-md-none">
                      <div className="d-flex">
                        <div style={{ flex: '0 0 55%' }}>
                        {imageLoading ? (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: '250px', background: '#f8f9fa' }}
                        >
                          <div className="spinner-border text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : imageUrls[product.id]?.length > 0 ? (
                        <Carousel>
                          {imageUrls[product.id].map((img, index) => (
                            <Carousel.Item key={index}>
                              <img
                                loading="eager"
                                src={img}
                                className="card-img-top rounded-top zoomable-image"
                                style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
                                alt={`product-image-${index}`}
                                onClick={() => handleImageClick(img)}/>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      ) : (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: '250px', background: '#f8f9fa' }}
                        >
                          No Image
                        </div>
                      )}
                        </div>
                        <div >
                          <h6 className="mb-1">{product.productName}</h6>
                          <div className="small text-primary fw-bold">Rs {discountedPrice}</div>
                          <div className="small text-muted fw-bold" style={{ textDecoration: 'line-through' }}>MRP: Rs {product.rate}</div>
                          <div className="small text-danger fw-bold">Discount: {product.discount}%</div>
                          <div className="small text-success fw-bold">Free Delivery and Installation</div>
                          <button
                            className="btn btn-warning btn-sm fw-bold mt-1"
                            onClick={() => {
                              navigate(`/offersBuyProduct/${userType}/${userId}/${product.id}`);
                            }}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                     )}
      </div>
    );
  })}
</div>
</div>
</div>

{/* Zoom Modal */}
<Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
        <Modal.Body className="text-center position-relative">
          <div className="zoom-container">
             {/* Close Button (X) */}    
    <button
      className="close-button text-end"
      onClick={() => setShowZoomModal(false)}
    >
      &times;
    </button>
            <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
          </div>
        </Modal.Body>
      </Modal>

      <div className="text-start">
  <button 
    className="btn btn-warning m-2" 
    onClick={() => navigate(`/offersIcons/${userType}/${userId}`)}
  >
    Back
  </button>
</div>
      <style jsx>{`
       .zoomable-image {
          transition: transform 0.3s ease-in-out;
        }
        .zoomable-image:hover {
          transform: scale(1.1);
        }
        .zoom-container {
          position: relative;
          display: inline-block;
        }
    .close-button {
      position: absolute;
      top: 8px;  
      right: 10px;  
      background: red;
      border: none;
      font-size: 24px;
      color: white;
      padding: 5px 10px;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.3s;
    }
    .close-button:hover {
      background: darkred;
    }
         .zoom-image {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
        }
        .offer-banner {
          background: linear-gradient(90deg, #ff9800, #ff5722);
          font-size: 1.3rem;
          font-weight: bold;
          animation: pulse 1.5s infinite alternate;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease-in-out;
        }
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }
        .btn-warning {
          background: linear-gradient(45deg, #ff9800, #ff5722);
          border: none;
          transition: all 0.3s ease-in-out;
        }
        .btn-warning:hover {
          background: linear-gradient(45deg, #ff5722, #ff9800);
          transform: scale(1.05);
        }
      `}</style>
      <Footer />
    </>
  );
};

export default OffersProductCard;
