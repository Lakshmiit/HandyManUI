import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "./Footer";

const ShareLocation = () => {
  const { fullName, martId, userType, userId, groceryItemId } = useParams();
  const navigate = useNavigate();

  // Back to Profile Page
//   const goBackToProfile = () => {
//     navigate(-1); // or navigate(`/profilePage/customer/123`)
//   };

  const shareLocationOnWhatsApp = () => {
    if (!window.isSecureContext) {
      alert("Please open this page using HTTPS.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const message = `Hi, this is ${fullName}.
My Grocery Order ID is ${martId}.
Please deliver my order to the location below:

https://www.google.com/maps?q=${latitude},${longitude}`;

        const whatsappUrl =
          "https://wa.me/7989328864?text=" + encodeURIComponent(message);

        window.open(whatsappUrl, "_blank");

        // After sharing → go back to profile
        setTimeout(() => {
          navigate(`/profilePage/customer/${userId}`); // replace with dynamic route
        }, 1000);
      },
      () => {
        alert("Please enable location access.");
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <>

      {/* Header */}
      <div className="d-flex align-items-center p-20">
        <span
          className="me-20 text-success"
          role="button"
          style={{ cursor: "pointer" }}
          onClick={navigate(`/groceryPaymentMethod/${userType}/${userId}/${groceryItemId}`)}
        >
          <ArrowBackIcon />
        </span>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>📍 Share Delivery Location</h2>
        <p>Please share your location to complete the order.</p>

        <button
          onClick={shareLocationOnWhatsApp}
          style={{
                backgroundColor: "#25D366",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          Share Location on WhatsApp
        </button>
      </div>

      <Footer />
    </>
  );
};

export default ShareLocation;
