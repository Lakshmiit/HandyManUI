import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import HandymanLogo from './img/Hm_Logo 1.png';
const GroceryPaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId"); 
//    const orderId = queryParams.get("orderId");
  const amount = queryParams.get("amount");
  const id = queryParams.get("id");
  const address = queryParams.get("address");
//   const bookTechnicianId = queryParams.get("bookTechnicianId");
//   const jobDescription = queryParams.get("jobDescription");
 const [orderBooking, setOrderBooking] = useState('');
  const [loading, setLoading] = useState(true);
 const [customerId, setUserId] = useState("");
 const [totalAmount,setTotalAmount] =useState("");
 const [statusMessage, setStatusMessage] = useState("Updating payment status...");

useEffect(() => {     
  console.log(loading, orderBooking);
}, [loading, orderBooking]);

useEffect(() => {
    fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderBooking(data);
        setTotalAmount(data.grandTotal)
        setUserId(data.customerId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading booking:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const updatePayment = async () => {
      try {
        const payload = {
        id: id,
        utrTransactionNumber: paymentId,
        transactionNumber: "string",
        transactionStatus: "Success",
        transactionType : "payment",
        paidAmount: totalAmount,
        status : "Open",
        };
        const response = await fetch(
          "https://handymanapiv2.azurewebsites.net/api/Mart/GroceryItemsEdit",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          setStatusMessage("✅ Payment updated successfully.");
        } else {
          // const error = await response.text();
          // setStatusMessage("❌ Failed to update payment: " + error);
        }
      } catch (error) {
        setStatusMessage("❌ Error: " + error.message);
      }
    };

    updatePayment();
  }, [paymentId, totalAmount, id]);

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

          <div className="thank-you">Order Details</div>
          <div className="payment-msg">
            Thank you for your payment. Your transaction was successful.
          </div>
          <p>{statusMessage}</p>

          <table className="table mt-3 text-start">
            <tbody>
              <tr>
                <th>Payment ID</th>
                <td>{paymentId}</td>
              </tr>
              <tr>
                <th>Ticket ID</th>
                <td>{orderBooking.martId}</td>
              </tr>
              <tr> 
                <th>Paid Amount</th>
                <td>₹ {amount}</td>
              </tr>    
              <tr>
                <th>Address</th>
                <td>{address}</td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <Link to={`/profilePage/customer/${customerId}`} className="btn btn-primary">
                    Back
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroceryPaymentSuccess;
