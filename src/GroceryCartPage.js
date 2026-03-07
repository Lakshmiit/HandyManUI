import React, { useEffect, useState, useRef } from "react";
import { Divider, IconButton } from "@mui/material";
import { Modal } from "react-bootstrap";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import "./App.css";
import CartImg from "./img/Cart.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer.js";
import { useLocation } from "react-router-dom";

const GroceryCartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const { userType } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const removalTimers = useRef({});
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [grandSummary, setGrandSummary] = useState({ items: 0, total: 0 });
  const [imageBlobMap, setImageBlobMap] = useState({});
  const [limitMap, setLimitMap] = useState({});
  const [MIN_ORDER_TOTAL, setMinOrderTotal] = useState(100);

  const mobileNumber = location.state?.mobileNumber || localStorage.getItem("customerMobileNumber");

  useEffect(() => {
    const checkUserOrder = async () => {
      if (!mobileNumber) return;
      const result = await CheckFirstOrder(mobileNumber);
      if (result === null) {
        setMinOrderTotal(150);
      } else {
        setMinOrderTotal(100);
      }
    };
    checkUserOrder();
  }, [mobileNumber]);

  const CheckFirstOrder = async (mobile) => {
    if (!mobile) return null;
    const url = `https://handymanapiv4-d4baa3hhdcftgabe.centralindia-01.azurewebsites.net/api/Mart/CheckFirstOrder?CustomerPhoneNumber=${encodeURIComponent(
      mobile,
    )}`;

    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log("RAW RESPONSE:", text);
      // ✅ First order (API returns this text)
      if (text.toLowerCase().includes("firstorder can not be found")) {
        return null;
      }
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        console.warn("Could not parse CheckFirstOrder response:", err);
        return null;
      }
      if (parsed && !Array.isArray(parsed)) {
        parsed = [parsed];
      }
      return Array.isArray(parsed) ? parsed : null;
    } catch (error) {
      console.error("API ERROR:", error);
      return null;
    }
  };

  const IMAGE_DOWNLOAD =
    "https://handymanapiv4-d4baa3hhdcftgabe.centralindia-01.azurewebsites.net/api/FileUpload/download?generatedfilename=";

  const getDynamicLimit = (productName) => {
    const key = String(productName || "")
      .trim()
      .toLowerCase();
    return limitMap[key] ?? Infinity;
  };

  useEffect(() => {
    if (!cartItems.length) return;
    const uniqueNames = Array.from(
      new Set(cartItems.map((x) => x.name).filter(Boolean)),
    );
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.allSettled(
          uniqueNames.map(async (name) => {
            const res = await fetch(
              `https://handymanapiv4-d4baa3hhdcftgabe.centralindia-01.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
                name,
              )}`,
            );
            const data = await res.json();
            const arr = Array.isArray(data) ? data : [];
            const best = arr
              .slice()
              .sort(
                (a, b) => Date.parse(b?.date || 0) - Date.parse(a?.date || 0),
              )[0];
            const limitValue = Number(best?.limit);
            return {
              name,
              limit:
                Number.isFinite(limitValue) && limitValue > 0
                  ? limitValue
                  : Infinity,
            };
          }),
        );
        if (cancelled) return;
        const newMap = {};
        results.forEach((r) => {
          if (r.status === "fulfilled") {
            const k = String(r.value.name || "")
              .trim()
              .toLowerCase();
            newMap[k] = r.value.limit;
          }
        });
        setLimitMap((prev) => ({ ...prev, ...newMap }));
      } catch (e) {
        console.warn("Limit fetch failed", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cartItems]);

  const limitMapRef = useRef({});
  useEffect(() => {
    limitMapRef.current = limitMap;
  }, [limitMap]);

  function getFilenameFromValue(value) {
    if (!value) return "";
    const v = String(value);
    const i = v.indexOf("generatedfilename=");
    if (i >= 0)
      return decodeURIComponent(v.slice(i + "generatedfilename=".length));
    if (/^https?:\/\//i.test(v)) return "";
    return v.trim();
  }
  function fileToUrl(filenameOrUrl) {
    if (!filenameOrUrl) return "";
    if (/^https?:\/\//i.test(String(filenameOrUrl))) return filenameOrUrl;
    return `${IMAGE_DOWNLOAD}${encodeURIComponent(String(filenameOrUrl))}`;
  }

  useEffect(() => {
    const filenames = Array.from(
      new Set(
        cartItems
          .map((i) => i.imageFilename)
          .filter(Boolean)
          .filter((fn) => !(fn in imageBlobMap)),
      ),
    );
    if (!filenames.length) return;
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.allSettled(
          filenames.map(async (fn) => {
            const res = await fetch(
              `${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}`,
            );
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const data = await res.json();
              if (!data?.imageData) throw new Error("No imageData");
              const byte = atob(data.imageData);
              const arr = new Uint8Array(byte.length);
              for (let i = 0; i < byte.length; i++) arr[i] = byte.charCodeAt(i);
              const blob = new Blob([arr], { type: "image/*" });
              const blobUrl = URL.createObjectURL(blob);
              return { fn, url: blobUrl };
            } else {
              return { fn, url: `${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}` };
            }
          }),
        );
        if (cancelled) return;
        const mapUpdate = {};
        results.forEach((r) => {
          if (r.status === "fulfilled" && r.value?.fn && r.value?.url) {
            mapUpdate[r.value.fn] = r.value.url;
          }
        });
        if (Object.keys(mapUpdate).length) {
          setImageBlobMap((prev) => ({ ...prev, ...mapUpdate }));
        }
      } catch (e) {
        console.error("prefetch images failed", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cartItems, imageBlobMap]);

  const writeBackToStorage = (items) => {
  if (!items.length) {
    localStorage.removeItem("allCategories"); 
    return;
  }
    const grouped = items.reduce((acc, it) => {
      (acc[it.category] ||= []).push({
        productId: it.productId,
        productName: it.name,
        qty: it.qty,
        mrp: it.mrp,
        discount: it.discount,
        afterDiscountPrice: it.price,
        stockLeft: it.stockLeft,
        code: it.code,
        units: it.units,
        image: it.imageFilename || getFilenameFromValue(it.imageUrl) ||
          it.imageUrl || null,
      });
      return acc;
    }, {});
    const allCategories = Object.entries(grouped).map(
      ([categoryName, products]) => ({
        categoryName,
        products: products.filter((p) => Number(p.qty) > 0),
      }),
    );
    localStorage.setItem("allCategories", JSON.stringify(allCategories));
  };

  const handleQtyChange = (id, change) => {
  setCartItems((prev) => {
    const updated = prev.map((item) => {
      if (item.id !== id) return item;
      const limit = getDynamicLimit(item.name);
      const stock = Number(item.stockLeft || Infinity);
      const maxAllowed = Math.min(limit, stock);
      let newQty = item.qty + change;
      if (newQty > maxAllowed) newQty = maxAllowed;
      if (newQty < 0) newQty = 0;
      return { ...item, qty: newQty };
    }).filter(item => item.qty > 0); 
    if (updated.length === 0) {
      localStorage.removeItem("allCategories");
    } else {
      writeBackToStorage(updated);
    }
    setGrandSummary(computeTotals(updated));
    return updated;
  });
};

 const computeTotals = (items) => {
  let itemsCount = 0;
  let total = 0;
  items.forEach((item) => {
    itemsCount += item.qty;
    total += item.qty * item.price;
  });
  return {
    items: itemsCount,
    total: Math.round(total),
  };
};

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");

  const items = saved.flatMap((cat) =>
    (cat.products || []).map((p, idx) => ({
      id: `${cat.categoryName}-${p.productId ?? idx}`,
      name: p.productName,
      category: cat.categoryName,
      qty: Number(p.qty),
      price: Number(p.afterDiscountPrice || p.price || 0),
      mrp: Number(p.mrp || 0),
      discount: Number(p.discount || 0),
      stockLeft: Number(p.stockLeft || 0),
      units: p.units,
      code: p.code
    }))
  );

  setCartItems(items);
  setGrandSummary(computeTotals(items));
}, []);

  const handleGroceryProceed = async (event) => {
    event.preventDefault();
    const allCategories =
      JSON.parse(localStorage.getItem("allCategories")) || [];
 const firstOrderData = await CheckFirstOrder(mobileNumber);
  // If null → new user
  const isNewUser = !firstOrderData;
  // ✅ SIMPLE WALLET LOGIC
  const walletValue = isNewUser ? "50" : "0";

    const payload = {
      id: "string",
      martId: "string",
      date: "string",
      customerId: userId,
      status: "Draft",
      paymentMode: "",
      utrTransactionNumber: "",
      transactionNumber: "",
      transactionStatus: "",
      TransactionType: "",
      paidAmount: "",
      walletAmount: walletValue,
      customerName: "",
      address: "",
      state: "",
      district: "",
      zipCode: "",
      customerPhoneNumber: "",
      AssignedTo: "",
      DeliveryPartnerUserId: "",
      latitude: 0,
      longitude: 0,
      isPickUp: false,
      isDelivered: false,
      GrandTotal: roundedGrandTotal.toString(),
      TotalItemsSelected: grandSummary.items.toString(),
      categories: allCategories.map((cat) => {
        const products = (cat.products || []).map((p) => {
          const persisted = p.image ?? p.productImage ?? "";
          const filename = getFilenameFromValue(persisted);
          const safeImage =
            filename || (typeof persisted === "string" ? persisted : "");
          return {
            productName: p.productName?.trim() || p.name?.trim() || "",
            noOfQuantity: String(p.qty),
            productImage: safeImage,
            mrp: String(p.mrp || 0),
            discount: String(p.discount || 0),
            afterDiscountPrice: String(p.afterDiscountPrice || p.price || 0),
            stockLeft: String(p.stockLeft - p.qty),
            code: String(p.code),
            units: String(p.units),
          };
        });
        return {
          categoryName: cat.categoryName,
          numberOfItemsSelected: products.reduce(
            (sum, p) => sum + Number(p.noOfQuantity),
            0,
          ),
          totalAmount: Math.round(
            products.reduce(
              (sum, p) =>
                sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity),
              0,
            ),
          ),
          products,
        };
      }), 
    };
    try {
      const response = await fetch(
        `https://handymanapiv4-d4baa3hhdcftgabe.centralindia-01.azurewebsites.net/api/Mart/UploadProductDetails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (response.ok) {
        const data = await response.json();
        const extractedId = data.id;
        if (extractedId) {
          const currentCart = localStorage.getItem("allCategories") || "[]";
          localStorage.setItem(`cartSnapshot_${extractedId}`, currentCart);
          localStorage.setItem("activeOrderId", extractedId);
          localStorage.setItem(
            `cartMeta_${extractedId}`,
            JSON.stringify({
              items: grandSummary.items,
              total: roundedGrandTotal,
            }),
          );
          navigate( `/groceryPaymentMethod/${userType}/${userId}/${extractedId}`, );
        }
      } else {
        const errorText = await response.text();
        alert("Failed to upload order: " + errorText);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while uploading the order.");
    }
  };

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };

 const clearCart = () => {
  setCartItems([]);
  setGrandSummary({ items: 0, total: 0 });
  localStorage.removeItem("allCategories");
};
  const handleRestore = (id) => {
    clearTimeout(removalTimers.current[id]);
    delete removalTimers.current[id];
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: 1, removing: false } : item,
      ),
    );
  };

  const itemsTotal = Math.round(
    cartItems.reduce((s, it) => s + it.mrp * it.qty, 0),
  );
  const grandTotal = Math.round(
    cartItems.reduce((s, it) => s + it.price * it.qty, 0),
  );
  const roundedItemsTotal = Math.round(itemsTotal);
  const roundedGrandTotal = Math.round(grandTotal);

  return (
    <div
      className="cart-container d-flex flex-column"
      style={{
        maxWidth: "600px",
        margin: "5px",
        padding: "5px",
        borderRadius: "8px",
        height: "100vh",
      }}
    >
      {/* Header */}
      <div className="cart-header d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img src={CartImg} alt="Cart" className="cart-icon" />
          <h3 className="ms-1" style={{ fontSize: "18px" }}>
            My Cart
          </h3>
        </div>
        <IconButton>
          <CloseIcon
            onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              color: "tomato",
            }}
          />
        </IconButton>
      </div>
      <Divider />

      {/* Cart Items */}
      <div
        className="cart-items flex-grow-1"
        style={{
          overflowY: "auto",
          padding: "8px",
          marginTop: "48px",
        }}
      >
        {cartItems.map((item) => {
        const maxAllowed = Math.min(
          Number(item.stockLeft || Infinity),
          getDynamicLimit(item.name)
        );

        return (
          <div
            key={item.id}
            className="cart-item d-flex align-items-start justify-content-between mb-2"
            >
            {/* Product Image */}
            <img
              src={
                (item.imageFilename && imageBlobMap[item.imageFilename]) ||
                (item.imageFilename && fileToUrl(item.imageFilename)) ||
                item.imageUrl ||
                "/placeholder.png"
              }
              alt={item.name}
              onClick={() =>
                handleImageClick(
                  (item.imageFilename && imageBlobMap[item.imageFilename]) ||
                    (item.imageFilename && fileToUrl(item.imageFilename)) ||
                    item.imageUrl ||
                    "/placeholder.png",
                )
              }
              style={{
                height: 50,
                width: 30,
                cursor: "pointer",
                borderRadius: 6,
              }}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />

            {/* Product Details */}
            <div style={{ flex: 1, marginLeft: "8px" }}>
              <div
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                  marginRight: "5px",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                MRP: <s>₹{Math.round(item.mrp)}</s> &nbsp;
                <span style={{ color: "red" }}>
                  {Math.round(item.discount)}% off
                </span>
                <span style={{ color: "dark", marginLeft: "5px" }}>
                  {item.units}
                </span>
              </div>
              <div style={{ fontWeight: "600", fontSize: "12px" }}>
                ₹{Math.round(item.price)}
              </div>
            </div>

            {/* Quantity Box */}
            {item.removing ? (
              <button
                onClick={() => handleRestore(item.id)}
                style={{
                  backgroundColor: "white",
                  color: "green",
                  border: "1px solid green",
                  borderRadius: "6px",
                  fontSize: "14px",
                  padding: "8px",
                }}
              >
                Add
              </button>
            ) : (
              <div
                className="qty-box d-flex align-items-center justify-content-between"
                style={{
                  backgroundColor: "#2e7d32",
                  borderRadius: "6px",
                  color: "white",
                  minWidth: "60px",
                  height: "25px",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleQtyChange(item.id, -1)}
                  style={{ color: "white", padding: "2px" }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                  {Math.min(item.qty, getDynamicLimit(item.name))}
                </span>
                <IconButton
                  size="small"
                  onClick={() => handleQtyChange(item.id, 1)}
                  style={{
                    color: "white",
                    padding: "2px",
                    opacity: item.qty >= maxAllowed ? 0.5 : 1,
                  }}
                   disabled={item.qty >= maxAllowed}
                  // title={
                  //   Number.isFinite(item.stockLeft) &&
                  //   item.qty >= item.stockLeft
                  //     ? "No more stock"
                  //     : "Add one"
                  // }
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
        );
      })}
      </div>

      {/* Bill Details */}
      <div className="bill-details p-1">
        <p className="fs-6 fw-bold">Bill details</p>
        <div className="d-flex justify-content-between align-items-center">
          <span>📋 Items total</span>
          <span>
            <s className="text-muted">₹{roundedItemsTotal}</s> ₹
            {roundedGrandTotal}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            🚲 Delivery charge <InfoIcon fontSize="small" />
          </span>
          <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
            FREE
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            👜 Handling charge <InfoIcon fontSize="small" />
          </span>
          <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
            FREE
          </span>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between align-items-center fw-bold">
          <span>Grand total</span>
          <span>₹{roundedGrandTotal}</span>
        </div>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
      <Divider />
      {roundedGrandTotal < MIN_ORDER_TOTAL && (
        <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}>
          Minimum order is ₹{MIN_ORDER_TOTAL} and above
        </p>
      )}

      {/* Footer */}
      <div
        className="cart-footer d-flex justify-content-between align-items-center mt-2 px-3 py-2"
        style={{
          backgroundColor: "#008000",
          color: "white",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <div>
          <span style={{ fontSize: "12px" }}>{grandSummary.items} items</span>
          <div style={{ fontWeight: "500", fontSize: "15px" }}>
            ₹{roundedGrandTotal}
          </div>
        </div>

        <div
          style={{
            fontWeight: "500",
            fontSize: "15px",
            cursor:
              roundedGrandTotal < MIN_ORDER_TOTAL ? "not-allowed" : "pointer",
            opacity: roundedGrandTotal < MIN_ORDER_TOTAL ? 0.6 : 1,
          }}
          onClick={
            roundedGrandTotal >= MIN_ORDER_TOTAL
              ? handleGroceryProceed
              : undefined
          }
        >
          {roundedGrandTotal < MIN_ORDER_TOTAL ? "Add More Items" : "Proceed →"}
        </div>
      </div>

      <div className="text-start">
        <button
          className="btn btn-warning mt-1 mb-1"
          onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
        >
          Back
        </button>
      </div>
      <Footer />

      {/* Zoom Modal */}
      <Modal
        show={showZoomModal}
        onHide={() => setShowZoomModal(false)}
        centered
      >
        <button
          className="close-button text-end mt-0"
          onClick={() => setShowZoomModal(false)}
        >
          &times;
        </button>
        <Modal.Body className="text-center">
          <div className="zoom-container">
            <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GroceryCartPage;

