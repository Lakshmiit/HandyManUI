import React, { useEffect, useState, useRef} from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Banner1 from './img/BannerModal.jpg';
const IMAGE_API =
  "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=";

const OffersBannerModal = () => {
  const [showOffersModal, setShowOffersModal] = useState(false);
  const [offersData, setOffersData] = useState([]);
const [offerImages, setOfferImages] = useState({});
  const [currentTime] = useState(new Date());
  const hasClosedRef = useRef(false);
  const [imagesLoading, setImagesLoading] = useState(true);
  useEffect(() => {       
    setShowOffersModal(true);    
  }, []);

  // 🔹 Fetch banners
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UpLoadBannners/GetBanners"
        );
        setOffersData(res.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

 useEffect(() => {
  if (!offersData.length) return;
  const fetchImages = async () => {
    try {
      setImagesLoading(true);
      const imagesMap = {};
      await Promise.all(
        offersData.map(async (offer) => {
          const imgs = await Promise.all(
            (offer.image || []).map(async (imgObj) => {
              try {
                const response = await axios.get(
                  `${IMAGE_API}${encodeURIComponent(imgObj.images)}`
                );
                if (response.data?.imageData) {
                  return `data:image/jpeg;base64,${response.data.imageData}`;
                }
                return null;
              } catch (err) {
                console.error("Image fetch failed:", err);
                return null;
              }
            })
          );
          imagesMap[String(offer.id)] = imgs.filter(Boolean);
        })
      );
      setOfferImages(imagesMap);
    } catch (err) {
      console.error("Error loading images:", err);
    } finally {
      setImagesLoading(false);
    }
  };
  fetchImages();
}, [offersData]);

  // 🔹 Active offers filter
 const activeOffers = offersData.filter((offer) => {
  const start = new Date(offer.startDate);
  const end = new Date(offer.endDate);
  return currentTime >= start && currentTime <= end;
});

  const handleClose = () => {
  hasClosedRef.current = true;    
  setShowOffersModal(false);
};

  // 🔹 Control modal visibility
  useEffect(() => {
  if (offersData.length > 0 && !hasClosedRef.current) {
    const hasActive = offersData.some((offer) => {
      const start = new Date(offer.startDate);
      const end = new Date(offer.endDate);
      return currentTime >= start && currentTime <= end;
    });
    setShowOffersModal(hasActive);
  }
}, [offersData, currentTime]);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      show={showOffersModal}
      onHide={handleClose}
      centered
      size="lg"
      scrollable
      dialogClassName="offers-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "15px", fontWeight: "bold" }}>
          🎉  {activeOffers[0]?.title || "Special Offers"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {imagesLoading ? (
        <div
          style={{
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          <div className="spinner-wrapper">
          <img
            src={Banner1} 
            alt="Loading Logo"
            className="spinner-inner-img"
            // style={{
            //   width: "250px",
            //   height: "250px",
            //   objectFit: "contain",
            // }}
          />
          </div>
          </div>
        ) : activeOffers.length === 0 ? (
          <div
            style={{
              height: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Offer has expired ⏳
          </div>
        ) : (
          (() => {
            const allImages = activeOffers.flatMap(
              (offer) => offerImages[String(offer.id)] || []
            );

            return (
              <>
                {/* Slider */}
                <Carousel
                  interval={2000}
                  indicators={false}
                  controls={true}
                  pause={false}
                  touch={true}
                >
                  {allImages.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={img}
                        alt={`offer-${index}`}
                        style={{
                          width: "100%",
                          height: window.innerWidth <= 768 ? "400px" : "500px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          background: "#fff",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>

                <p
                  className="blinking-text"
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "400",
                    marginTop: "10px",
                  }}
                >
                  Offer valid till:{" "}
                  {formatDateTime(activeOffers[0]?.endDate)}
                </p>

                <p
                  style={{
                    textAlign: "start",
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  {activeOffers[0]?.description}
                </p>
              </>
            );
          })()
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Shop Now 🛒
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OffersBannerModal;