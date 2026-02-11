import React from "react";
import "./App.css";
import RoyalUpmaImg from "./img/RoyalUpmaMix.jpeg";
import Header from "./Header";
import Footer from "./Footer";

const RoyalUpmaMix250g = () => {
  return (
    <>
      <Header />
      <div style={{marginTop: "45px"}}>
      <div className="app-container">
      <div className="page-center">
        <div className="product-card">
          <div className="image-wrapper">
            <img
              src={RoyalUpmaImg}
              alt="Lakshmi Mart Royal Pesara Upma Mix"
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h1 className="product-name">
              Lakshmi Mart Royal Pesara Upma Mix
            </h1>
            <p className="description">
              <strong>Description:</strong> Premium ready-to-cook South Indian breakfast mix made with
              green gram (pesara), rice rava, selected spices, almonds (badam)
              and cashew nuts (jiddu pappu). Manufactured & packed as per
              FSSAI & GST norms.
            </p>
            <div className="packs">
              <strong>Available Packs:</strong> 250g, 500g, 1Kg
            </div>
            <div className="order-btn-wrapper">
            <a
              href="https://www.handymanserviceproviders.com/"
              className="order-btn"
              rel="noopener noreferrer"
            >
              Order Now
            </a>
            </div>
            </div>
        </div>
      </div>
      <Footer />
      </div>
      </div>
    </>
  );
};

export default RoyalUpmaMix250g;
