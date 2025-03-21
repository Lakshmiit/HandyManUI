import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import Header from './Header.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Carousel, Modal } from 'react-bootstrap';

const OffersProductCard = () => {
  const navigate = useNavigate();
  const {userType} = useParams();
  const {userId} = useParams(); 
  // const {id} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { selectedUserType } = useParams();
  const [productData, setProductData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
 const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Product/GetAllProductList`);
        const data = await response.json();
        setProductData(data);

        const imageRequests = data.map(async (product) => {
          if (product.productPhotos?.length) {
            const photo = product.productPhotos.map(async (photo) => {  
              const res = await fetch(
                `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`
              );
              const imgData = await res.json();
              return { id: product.id, imageData: imgData.imageData, allPhotos: product.productPhotos };
            });
            const allImages = await Promise.all(photo);
            return { id: product.id, images: allImages };
          }
          return null;
        });

        const images = await Promise.all(imageRequests);
        const imageMap = {};
        images.forEach((img) => {
          if (img) imageMap[img.id] = img.images;
        });
        setImageUrls(imageMap);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };

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
      <div className="offer-banner text-center text-white py-3">
        🎉 <b>Exclusive Deals!</b> Save up to <b>50%</b> on select items. Limited time only! 🛒
      </div>

      {isMobile && <Header />}
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
          <div className="row g-4">
            {productData.map((product) => (
              <div key={product.id} className="col-md-4">
                <div className="card w-100 h-100 shadow-lg border-light rounded-4">
                  {imageUrls[product.id] && imageUrls[product.id].length > 0 ? (
                    <Carousel>
                      {imageUrls[product.id].map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={`data:image/jpeg;base64,${img.imageData}`}
                            className="card-img-top rounded-top zoomable-image"
                            style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
                            alt={`product-image-${index}`}
                            onClick={() => handleImageClick(`data:image/jpeg;base64,${img.imageData}`)}
                          />
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

                  <div className="card-body">
                    <h5 className="card-title fs-5">{product.productName}</h5>
                    <p className="card-text fw-bold fs-5 text-muted">Rate: Rs {product.rate}</p>
                    <p className="card-text  fw-bold fs-5 text-danger">Discount: {product.discount}%</p>
                  </div>
                  <Button className="btn btn-warning w-50 fw-bold mt-2"
                   onClick={() => navigate(`/offersBuyProduct/${userType}/${userId}/${product.id}`)}
                  >Buy Now</Button>
                </div>
              </div>
            ))}
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

        .floating-menu {
          position: fixed;
          top: 80px;
          left: 20px;
          z-index: 1000;
          transition: transform 0.3s ease-in-out;
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
