import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HandymanLogo from './img/Hm_Logo 1.png'; 

const GroceryOnlinePayment = () => {
  const { groceryItemId } = useParams(); 
  const navigate = useNavigate();
  const [orderBooking, setOrderBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [grandTotal,setGrandTotal] =useState('');
  const [martId,setMartId] =useState('');
   
  useEffect(() => {
    console.log(userId);     
  }, [userId]);    

  // ✅ Step 1: Fetch booking details from your API
  useEffect(() => {
    fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${groceryItemId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderBooking(data);
        setUserId(data.customerId);
         setGrandTotal(data.grandTotal);
         setMartId(data.martId);
        // setBookTechnicianId(data.bookTechnicianId);
        localStorage.setItem("userId", data.customerId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading booking:", err);
        setLoading(false);
      });
  }, [groceryItemId]);

  // ✅ Step 2: Handle Pay Now
  const handlePayment = () => {
    if (!orderBooking) return;

    const options = {
      key: "rzp_live_RQiggcAf80YY99",                         // your Razorpay key
      amount: (orderBooking.grandTotal || 1) * 100,  // convert ₹ → paise
      currency: "INR",
      name: "HandyMan Service Providers",
    //   description: orderBooking.productName,
      handler: function (response) {
        console.log("✅ Payment Success:", response);
        // alert(JSON.stringify(response));

        // ✅ Step 3: Redirect after payment
            navigate(
      `/groceryPaymentSuccess?paymentId=${response.razorpay_payment_id}&amount=${grandTotal}&id=${orderBooking.id}&address=${orderBooking.address}&BookingId=${martId}`
    );
      },
      prefill: {
        name: orderBooking.customerName,
        email: orderBooking.customerEmail,
        contact: orderBooking.customerPhoneNumber,
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  if (loading) return <p>Loading booking details...</p>;
  if (!orderBooking) return <p style={{ color: "red" }}>Error loading booking details.</p>;

  return (
    <div className="mt-5 h-100 d-flex align-items-center py-2 flex-column">
      <div className="login_section rounded-3 p-4">
        <div className="rgt_cnt text-center">
          <img
            src={HandymanLogo}
            alt="Handy Man Logo"
            className="d-block mx-auto"
            style={{ maxWidth: "150px" }}
          />
          <h4>Handyman Service Providers Payment</h4>
          <h6>Lakshmi mart</h6>
          <p>
            <strong>Customer Name:</strong> {orderBooking.customerName}
          </p>
          <p>
            <strong>Phone Number:</strong> {orderBooking.customerPhoneNumber}
          </p>
          {/* <p>
            <strong>Job Description:</strong> {orderBooking.jobDescription}
          </p> */}
          <p>
            <strong>Total Amount:</strong> ₹{orderBooking.grandTotal} /-
          </p>
        <div className="text-center">
            <button onClick={handlePayment} 
            className="text-white" style={{background: "green", width: "50%", borderRadius: "20px"}}>
            Pay Now
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryOnlinePayment;
