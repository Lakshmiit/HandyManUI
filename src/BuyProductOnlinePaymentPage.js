import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HandymanLogo from './img/Hm_Logo 1.png'; 

const BuyProductPaymentPage = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();
  const [orderBooking, setOrderBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    console.log(userId);
  }, [userId]);    

  // ✅ Step 1: Fetch booking details from your API
  useEffect(() => {
    fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderBooking(data);
        setUserId(data.customerId);
        localStorage.setItem("userId", data.customerId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading booking:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Step 2: Handle Pay Now
  const handlePayment = () => {
    if (!orderBooking) return;

    const options = {
      key: "rzp_live_RQiggcAf80YY99",                         // your Razorpay key
      amount: (orderBooking.totalPaymentAmount || 1) * 100,  // convert ₹ → paise
      currency: "INR",
      name: "HandyMan Service Providers",
      description: orderBooking.productName,
      handler: function (response) {
        console.log("✅ Payment Success:", response);
        // alert(JSON.stringify(response));

        // ✅ Step 3: Redirect after payment
            navigate(
      `/BuyProductPaymentSuccess?paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}&amount=${orderBooking.totalPaymentAmount}&id=${orderBooking.id}&address=${orderBooking.address}&buyProductId=${orderBooking.buyProductId}&productName=${orderBooking.productName}`
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
    <div className="h-100 d-flex align-items-center py-2 flex-column">
      <div className="login_section rounded-3 p-4">
        <div className="rgt_cnt text-center">
          <img
            src={HandymanLogo}
            alt="Handy Man Logo"
            className="d-block mx-auto"
            style={{ maxWidth: "150px" }}
          />
          <h4>Handyman Service Providers Payment</h4>

          <p>
            <strong>Customer Name:</strong> {orderBooking.customerName}
          </p>
          <p>
            <strong>Phone Number:</strong> {orderBooking.customerPhoneNumber}
          </p>
          <p>
            <strong>Product name:</strong> {orderBooking.productName}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{orderBooking.totalAmount}
          </p>

          <button onClick={handlePayment} 
            className="btn btn-primary bg-blue-500 text-dark text-bold px-4 py-2 rounded text-lg w-full sm:w-auto">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyProductPaymentPage;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import HandymanLogo from './img/Hm_Logo 1.png';
// const BuyProductPaymentPage = () => {
//   const { id } = useParams(); // ticketId from route
//   const navigate = useNavigate();
//   const [orderBooking, setOrderBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch booking details from API
//   useEffect(() => {
//     if (!id) return;

//     fetch(`https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsById/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Booking not found");
//         return res.json();
//       })
//       .then((data) => {
//         setOrderBooking(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Error loading booking:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   // ✅ Payment handler
//   const handlePayment = async () => {
//     if (!orderBooking) return;

//     try {
//       // Step 1: Create Order
//       const orderResponse = await fetch(`/BuyProductPaymentPage?handler=CreateOrder`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ticketId: orderBooking.id }),
//       });

//       const order = await orderResponse.json();
//       console.log("✅ Order Created:", order);

//       // Step 2: Open Razorpay
//       const options = {
//         key: "rzp_live_RQiggcAf80YY99",
//         amount: order.amount,
//         currency: order.currency,
//         name: "HandyMan Service Providers",
//         order_id: order.id,
//         handler: async function (response) {
//           console.log("✅ Payment Success:", response);

//           try {
//             // Step 3: Create Invoice
//             const invoiceResponse = await fetch(`/BuyProductPaymentPage?handler=CreateInvoice`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 orderId: order.id,
//                 customerName: orderBooking.customerName,
//                 customerEmail: "satyanarayanakrv111@gmail.com",
//                 customerPhone: orderBooking.customerPhoneNumber,
//                 serviceName: "HandyMan Service",
//                 amount: order.amount,
//               }),
//             });

//             const invoice = await invoiceResponse.json();
//             console.log("✅ Invoice Created:", invoice);
//             // Step 4: Redirect to success page
//             navigate(
//               `/PaymentSuccess?paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}&amount=${order.amount}&id=${orderBooking.id}&address=${orderBooking.address}&buyProductId=${orderBooking.buyProductId}&productName=${orderBooking.productName}`
//             );
//           } catch (error) {
//             alert("Invoice generation failed.");
//           }
//         },
//         prefill: {
//           name: orderBooking.customerName,
//           email: "satyanarayanakrv111@gmail.com",
//           contact: orderBooking.customerPhoneNumber,
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       alert("Error processing payment: " + error.message);
//     }
//   };

//   if (loading) {
//     return <p>Loading booking details...</p>;
//   }

//   if (!orderBooking) {
//     return <p style={{ color: "red" }}>Error loading booking details. Please try again later.</p>;
//   }

//   return (
//     <div className="h-100 d-flex align-items-center py-2 mt-100 flex-column">
//       <div className="login_section rounded-3 p-4">
//         <div className="rgt_cnt text-center">
//           <img
//             src={HandymanLogo}
//             alt="Handy Man Logo"
//             className="d-block mx-auto"
//             style={{ maxWidth: "150px" }}
//           />
//           <h4>Handyman Service Providers Payment</h4>

//           <div className="mt-3">
//             <p>
//               <strong>Customer Name:</strong> {orderBooking.customerName}
//             </p>
//             <p>
//               <strong>Phone Number:</strong> {orderBooking.customerPhoneNumber}
//             </p>
//             <p>
//               <strong>Total Amount:</strong> Rs {orderBooking.totalPaymentAmount} /-
//             </p>

//             <button id="rzp-button1" onClick={handlePayment} className="btn btn-primary">
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyProductPaymentPage;
