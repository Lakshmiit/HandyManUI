import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';

const PaymentSelection = () => {
  const { raiseTicketId } = useParams();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpay = async () => { 
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    
    if (selectedPayment === 'online') {
      if (!razorpayLoaded) {
        alert("Razorpay SDK is still loading. Please try again.");
        return;
      }
      
      const options = {
        key: "Pw28RrsKVRh7zfCysTYh2xPv", // Replace with your Razorpay Key
        amount: 1, // Example amount in paisa
        currency: "INR",
        name: "HandyMan Services",
        description: "Technician Booking Payment",
        handler: (response) => {
          alert("Payment Successful! Reference ID: " + response.razorpay_payment_id);
          navigate(`/payment-confirmation/${raiseTicketId}`);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: { color: "#F37254" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Payment will be made in presence of the technician.");
    }
  };

  return (
    <div className="container text-center">
      <h2>Select Payment Method</h2>
      <div className="payment-options">
        <label className="me-3"> 
          <input 
            type="radio" 
            value="online" 
            checked={selectedPayment === 'online'}
            onChange={() => setSelectedPayment('online')} 
          /> Pay Online
        </label>
        <label>
          <input 
            type="radio" 
            value="technician" 
            checked={selectedPayment === 'technician'}
            onChange={() => setSelectedPayment('technician')} 
          /> Pay in Presence of Technician
        </label>
      </div>
      <div className="mt-3">
        <Button variant="primary" onClick={handlePayment}>Proceed</Button>
      </div>
    </div>
  );
};

export default PaymentSelection;