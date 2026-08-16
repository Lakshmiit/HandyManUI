import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE =
  "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api";

const DeliveryPartnerDashboard = () => {
  // const navigate = useNavigate();
  const { userId } = useParams();
  const { userType } = useParams();

  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [deliveryProfile, setDeliveryProfile] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [partnerStatus, setPartnerStatus] = useState("");        

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    delivered: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateStats = (ordersList) => {
    const total = ordersList.length;

    const inProgress = ordersList.filter(
      (x) => String(x.status).toLowerCase() === "in progress"
    ).length;

    const delivered = ordersList.filter(
      (x) => String(x.status).toLowerCase() === "delivered"
    ).length;

    setStats({
      total,
      inProgress,
      delivered,
    });
  };

  const fetchAssignedOrders = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/Mart/GetMartTicketsByUserId?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      const tickets = Array.isArray(data)
        ? data
        : data && typeof data === "object"
        ? [data]
        : [];

      const filteredOrders = tickets.filter((item) => {
        const status = String(item?.status || "").toLowerCase();

        return status === "in progress" || status === "delivered";
      });

      setOrders(filteredOrders);

      calculateStats(filteredOrders);
    } catch (error) {
      console.error(error);
      setOrders([]);
      calculateStats([]);
    }
  };

  // const fetchDeliveryProfile = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.get(
  //       `${API_BASE}/DeliveryPartner/GetDeliveryPartnerDetailsByUserId?userId=${userId}`
  //     );

  //     const raw = res?.data ?? null;

  //     const profile = Array.isArray(raw)
  //       ? raw.length > 0
  //         ? raw[0]
  //         : null
  //       : raw && typeof raw === "object" && Object.keys(raw).length > 0
  //       ? raw
  //       : null;

  //     setDeliveryProfile(profile);

  //     const reg = profile?.isRegistered === true;
  //     const status = (profile?.status || "").toLowerCase();

  //     setIsRegistered(reg);
  //     setPartnerStatus(status);

  //     if (reg && status === "open") {
  //       await fetchAssignedOrders();
  //     } else {
  //       setOrders([]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setDeliveryProfile(null);
  //     setIsRegistered(false);
  //     setPartnerStatus("");
  //     setOrders([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchDeliveryProfile();
  }, [userId]);

//   const handleJoinNow = () => {
//     navigate(`/deliveryPartner/${userType}/${userId}`);
//   };

  const handleViewDetails = async (order) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/Mart/GetProductDetails?id=${order.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }

      const data = await response.json();

      setSelectedOrder({
        ...data,
        paymentType: data.paymentType || "",
        receivedAmount: "",
        cashAmount: "",
        onlineAmount: "",
      });

      setShowDetails(false);
      setShowOrderModal(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleCashChange = (value) => {
    const cash = Number(value || 0);
    const online = Number(selectedOrder?.onlineAmount || 0);

    setSelectedOrder((prev) => ({
      ...prev,
      cashAmount: cash,
      receivedAmount: cash + online,
    }));
  };

  const handleOnlineChange = (value) => {
    const online = Number(value || 0);
    const cash = Number(selectedOrder?.cashAmount || 0);

    setSelectedOrder((prev) => ({
      ...prev,
      onlineAmount: online,
      receivedAmount: cash + online,
    }));
  };

    const handleDeclineOrder = async (ticket) => {
    try {
      const detailsResponse = await fetch(
        `${API_BASE}/Mart/GetProductDetails?id=${ticket.id}`
      );

      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch order details");
      }

      const currentOrderData = await detailsResponse.json();

      const payload = {
        ...currentOrderData,
        id: ticket.id,
        userId: userId,
        martId: ticket.martId,
        date: ticket.date,
        status: "Open",
        PaymentMode: "",
        utrTransactionNumber:
          currentOrderData.utrTransactionNumber || "",
        transactionNumber:
          currentOrderData.transactionNumber || "",
        transactionStatus:
          currentOrderData.transactionStatus || "",
        PaidAmount: "",
        AssignedTo: "",
        DeliveryPartnerUserId: "",
        deliveryAssignedTime: "",
        deliverySubmitTime: new Date().toISOString(),
        latitude: currentOrderData.latitude,
        longitude: currentOrderData.longitude,
        isDelivered: true,
      };

      const response = await fetch(
        `${API_BASE}/Mart/UpdateProductDetails/${ticket.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Decline failed");
      }

      alert("Order declined successfully");

      setShowOrderModal(false);

      await fetchAssignedOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to decline order");
    }
  };

  const handleSubmitDelivery = async (ticket) => {
    try {
      const detailsResponse = await fetch(
        `${API_BASE}/Mart/GetProductDetails?id=${ticket.id}`
      );

      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch order details");
      }

      const currentOrderData = await detailsResponse.json();

      const payload = {
        ...currentOrderData,
        id: ticket.id,
        userId: userId,
        martId: ticket.martId,
        date: ticket.date,
        status: "Delivered",
        utrTransactionNumber:
          currentOrderData.utrTransactionNumber || "",
        transactionNumber:
          currentOrderData.transactionNumber || "",
        transactionStatus:
          currentOrderData.transactionStatus || "",
        PaymentMode: ticket.paymentType,
        PaidAmount:
          ticket.paymentType?.toLowerCase() === "cash&online"
            ? `cash=${ticket.cashAmount || 0}, online=${ticket.onlineAmount || 0}`
            : String(ticket.receivedAmount || 0),
        AssignedTo: currentOrderData.assignedTo,
        DeliveryPartnerUserId:
          currentOrderData.deliveryPartnerUserId,
        deliveryAssignedTime:
          currentOrderData.deliveryAssignedTime,
        deliverySubmitTime: new Date().toISOString(),
        latitude: currentOrderData.latitude,
        longitude: currentOrderData.longitude,
        isDelivered: true,
      };

      const response = await fetch(
        `${API_BASE}/Mart/UpdateProductDetails/${ticket.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Delivery update failed");
      }

      alert("Order delivered successfully");

      setShowOrderModal(false);

      await fetchAssignedOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to submit delivery");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-success mb-3"
            role="status"
          />
          <h5>Loading Delivery Dashboard...</h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="container-fluid py-3"
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          paddingLeft: isMobile ? "12px" : "30px",
          paddingRight: isMobile ? "12px" : "30px",
        }}
      >
        {/* HEADER */}
        <div
          className="shadow rounded p-4 mb-4"
          style={{
            background:
              "linear-gradient(135deg, #198754, #0d6efd)",
            color: "#fff",
          }}
        >
          <h2 style={{  fontSize: isMobile ? "20px" : "34px",  fontWeight: "600",}}>
            🚚 Delivery Partner Dashboard
          </h2>

          <h5  style={{    fontSize: isMobile ? "15px" : "20px",  }}>
            Welcome,{" "}
            {deliveryProfile?.deliveryPartnerName ||
              deliveryProfile?.deliveryPartnerName ||
              "Delivery Partner"}
          </h5>

          <span
            className={`badge mt-1 ${
              partnerStatus === "open"
                ? "bg-light text-success"
                : "bg-warning text-dark"
            }`}
            style={{
              fontSize: isMobile ? "10px" : "15px",
              padding: "8px",
            }}
          >
            Status:{" "}
            {partnerStatus === "open"
              ? "Approved"
              : isRegistered
              ? "Pending Approval"
              : "Not Registered"}
          </span>
        </div>

        {/* PENDING APPROVAL */}
        {isRegistered && partnerStatus !== "open" && (
          <div
            className="card shadow border-0 text-center mx-auto"
            style={{
              maxWidth: "700px",
              borderRadius: "20px",
              padding: isMobile ? "30px 20px" : "50px",
            }}
          >
            <div style={{ fontSize: isMobile ? "50px" : "70px" }}>
              ⏳
            </div>

            <h3
              className="text-warning"
              style={{
                fontWeight: "700",
                fontSize: isMobile ? "22px" : "32px",
              }}
            >
              Your registration is pending admin approval.
            </h3>
          </div>
        )}

        {/* APPROVED DASHBOARD */}
        {isRegistered && partnerStatus === "open" && (
          <>
            {/* STATS */}
                <div
                className="row mb-4"
                style={{ 
                    marginLeft: "0",
                    marginRight: "0",
                }}
                >
                <div className="col-4 px-1">
                    <div
                    className="card shadow border-0 text-center d-flex justify-content-center"
                    style={{
                        borderRadius: "14px",
                        minHeight: isMobile ? "90px" : "150px",
                        padding: isMobile ? "10px 4px" : "30px",
                    }}
                    >
                    <h6
                        style={{
                        fontWeight: "600",
                        fontSize: isMobile ? "10px" : "20px",
                        marginBottom: "6px",
                        lineHeight: "1.2",
                        }}
                    >
                        Total
                    </h6>

                    <h3
                        className="text-primary"
                        style={{
                        fontWeight: "700",
                        fontSize: isMobile ? "20px" : "38px",
                        margin: 0,
                        }}
                    >
                        {stats.total}
                    </h3>
                    </div>
                </div>

                <div className="col-4 px-1">
                    <div
                    className="card shadow border-0 text-center d-flex justify-content-center"
                    style={{
                        borderRadius: "14px",
                        minHeight: isMobile ? "90px" : "150px",
                        padding: isMobile ? "10px 4px" : "30px",
                    }}
                    >
                    <h6
                        style={{
                        fontWeight: "600",
                        fontSize: isMobile ? "10px" : "20px",
                        marginBottom: "6px",
                        lineHeight: "1.2",
                        }}
                    >
                        Progress
                    </h6>

                    <h3
                        className="text-warning"
                        style={{
                        fontWeight: "700",
                        fontSize: isMobile ? "20px" : "38px",
                        margin: 0,
                        }}
                    >
                        {stats.inProgress}
                    </h3>
                    </div>
                </div>

                <div className="col-4 px-1">
                    <div
                    className="card shadow border-0 text-center d-flex justify-content-center"
                    style={{
                        borderRadius: "14px",
                        minHeight: isMobile ? "90px" : "150px",
                        padding: isMobile ? "10px 4px" : "30px",
                    }}
                    >
                    <h6
                        style={{
                        fontWeight: "600",
                        fontSize: isMobile ? "10px" : "20px",
                        marginBottom: "6px",
                        lineHeight: "1.2",
                        }}
                    >
                        Delivered
                    </h6>

                    <h3
                        className="text-success"
                        style={{
                        fontWeight: "700",
                        fontSize: isMobile ? "20px" : "38px",
                        margin: 0,
                        }}
                    >
                        {stats.delivered}
                    </h3>
                    </div>
                </div>
                </div>

            {/* ASSIGNED ORDERS */}
            <div
              className="card shadow border-0"
              style={{
                borderRadius: "20px",
                padding: isMobile ? "20px" : "35px",
              }}
            >
              <h4
                style={{
                  fontWeight: "700",
                  marginBottom: "25px",
                }}
              >
                Assigned Orders
              </h4>

              {orders.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No assigned orders found.</h5>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="shadow-sm border bg-white mb-3"
                    style={{
                      borderRadius: "16px",
                      padding: isMobile ? "18px" : "24px",
                    }}
                  >
                    <div className="row align-items-center">
                      <div className="col-12 col-md-9">
                        <p>
                          <strong>Order ID:</strong>{" "}
                          {order.martId}
                        </p>

                        <p>
                          <strong>Customer:</strong>{" "}
                          {order.customerName}
                        </p>

                        <p>
                          <strong>Address:</strong>{" "}
                          {[
                            order.address,
                            order.district,
                            order.state,
                            order.zipCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          <span
                            className={`badge ${
                              String(order.status).toLowerCase() ===
                              "delivered"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                      </div>

                      <div className="col-12 col-md-3 mt-3 mt-md-0">
                        <button
                          className="btn btn-primary w-100"
                          style={{
                            borderRadius: "12px",
                            padding: "12px",
                            fontWeight: "600",
                          }}
                          onClick={() =>
                            handleViewDetails(order)
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
            {/* ORDER DETAILS MODAL */}
      {showOrderModal && selectedOrder && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            overflowY: "auto",
          }}
        >
          <div
            className={`modal-dialog ${
              isMobile
                ? "modal-fullscreen"
                : "modal-xl modal-dialog-centered"
            }`}
          >
            <div
              className="modal-content border-0"
              style={{
                borderRadius: isMobile ? "0px" : "20px",
              }}
            >
              {/* MODAL HEADER */}
              <div
                className="modal-header text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #198754, #0d6efd)",
                }}
              >
                <h5
                  className="modal-title"
                  style={{
                    fontWeight: "700",
                  }}
                >
                  Order Details
                </h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() =>
                    setShowOrderModal(false)
                  }
                />
              </div>

              {/* MODAL BODY */}
              <div
                className="modal-body"
                style={{
                  padding: isMobile ? "18px" : "30px",
                }}
              >
                {/* CUSTOMER INFO */}
                <div className="mb-4">
                  <h5 className="mb-3">
                    Customer Information
                  </h5>

                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedOrder.customerName}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedOrder.customerPhoneNumber}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {[
                      selectedOrder.address,
                      selectedOrder.district,
                      selectedOrder.state,
                      selectedOrder.zipCode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>

                {/* VIEW ITEMS */}
                <button
                  className="btn btn-outline-primary mb-3"
                  onClick={() =>
                    setShowDetails(!showDetails)
                  }
                >
                  {showDetails
                    ? "Hide Order Items"
                    : "View Order Items"}
                </button>

                {/* PRODUCT TABLE */}
                {showDetails && (
                  <div className="table-responsive">
                    <table className="table table-bordered text-center">
                      <thead className="table-success">
                        <tr>
                          <th>S.No</th>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedOrder.categories
                          ?.flatMap(
                            (cat) => cat.products
                          )
                          ?.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>

                              <td>
                                {item.productName}
                              </td>

                              <td>
                                {item.noOfQuantity}
                              </td>

                              <td>
                                ₹
                                {Number(
                                  item.afterDiscountPrice
                                ).toFixed(0)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* TOTALS */}
                <div className="text-center mt-4">
                  <h5>
                    Total Amount : ₹
                    {selectedOrder.categories?.reduce(
                      (sum, cat) =>
                        sum +
                        Number(
                          cat.totalAmount || 0
                        ),
                      0
                    )}
                  </h5>

                  <h3 className="text-danger fw-bold">
                    Grand Total : ₹
                    {selectedOrder.grandTotal}
                  </h3>
                </div>

                {/* PAYMENT SECTION */}
                {String(
                  selectedOrder.status
                ).toLowerCase() !==
                  "delivered" && (
                  <div className="mt-5">
                    <h5 className="mb-3">
                      Select Payment Mode
                    </h5>

                    {/* PAYMENT RADIOS */}
                    <div
                      className={`d-flex ${
                        isMobile
                          ? "flex-column"
                          : "flex-row"
                      } gap-3 mb-4`}
                    >
                      <label>
                        <input
                          type="radio"
                          checked={
                            selectedOrder.paymentType ===
                            "cash"
                          }
                          onChange={() =>
                            setSelectedOrder(
                              (prev) => ({
                                ...prev,
                                paymentType: "cash",
                                receivedAmount: "",
                                cashAmount: "",
                                onlineAmount: "",
                              })
                            )
                          }
                        />{" "}
                        Cash
                      </label>

                      <label>
                        <input
                          type="radio"
                          checked={
                            selectedOrder.paymentType ===
                            "online"
                          }
                          onChange={() =>
                            setSelectedOrder(
                              (prev) => ({
                                ...prev,
                                paymentType:
                                  "online",
                                receivedAmount: "",
                                cashAmount: "",
                                onlineAmount: "",
                              })
                            )
                          }
                        />{" "}
                        Online
                      </label>

                      <label>
                        <input
                          type="radio"
                          checked={
                            selectedOrder.paymentType ===
                            "Cash&Online"
                          }
                          onChange={() =>
                            setSelectedOrder(
                              (prev) => ({
                                ...prev,
                                paymentType:
                                  "Cash&Online",
                                receivedAmount: "",
                                cashAmount: "",
                                onlineAmount: "",
                              })
                            )
                          }
                        />{" "}
                        Cash + Online
                      </label>
                    </div>

                    {/* CASH + ONLINE */}
                    {selectedOrder.paymentType ===
                    "Cash&Online" ? (
                      <div className="row g-3">
                        <div className="col-12 col-md-4">
                          <label>
                            Cash Amount
                          </label>

                          <input
                            type="number"
                            className="form-control"
                            value={
                              selectedOrder.cashAmount
                            }
                            onChange={(e) =>
                              handleCashChange(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="col-12 col-md-4">
                          <label>
                            Online Amount
                          </label>

                          <input
                            type="number"
                            className="form-control"
                            value={
                              selectedOrder.onlineAmount
                            }
                            onChange={(e) =>
                              handleOnlineChange(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="col-12 col-md-4">
                          <label>Total</label>

                          <input
                            className="form-control"
                            readOnly
                            value={
                              selectedOrder.receivedAmount
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      selectedOrder.paymentType && (
                        <div className="mt-3">
                          <label>
                            Enter Amount
                          </label>

                          <input
                            type="number"
                            className="form-control"
                            value={
                              selectedOrder.receivedAmount
                            }
                            onChange={(e) =>
                              setSelectedOrder(
                                (prev) => ({
                                  ...prev,
                                  receivedAmount:
                                    e.target.value,
                                })
                              )
                            }
                          />
                        </div>
                      )
                    )}

                    {/* ACTION BUTTONS */}
                    <div
                      className={`d-flex ${
                        isMobile
                          ? "flex-column"
                          : "flex-row"
                      } gap-3 mt-4`}
                    >
                      <button
                        className="btn btn-success w-100"
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          handleSubmitDelivery(
                            selectedOrder
                          )
                        }
                      >
                        Submit Delivery
                      </button>

                      <button
                        className="btn btn-danger w-100"
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          handleDeclineOrder(
                            selectedOrder
                          )
                        }
                      >
                        Decline Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryPartnerDashboard;                                 




