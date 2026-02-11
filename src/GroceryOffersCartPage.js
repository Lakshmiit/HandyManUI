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

const IMAGE_DOWNLOAD =
  "https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=";

const norm = (s) =>
  String(s || "").toLowerCase().replace(/\s+/g, " ").replace("500ml", "500 ml").replace("1l", "1 l").trim();

const getLimit = (item) => {
  const limit = Number(item?.limit);
  if (Number.isFinite(limit) && limit > 0) return limit;
  return Infinity;
};

    const clampQty = (item, qty) => {
  const stockMax = Number.isFinite(item.stockLeft)
    ? item.stockLeft
    : Infinity;
  const limit = getLimit(item);
  const maxAllowed = Math.min(stockMax, limit);
  return Math.max(0, Math.min(qty, maxAllowed));
};

const getFilenameFromValue = (value) => {
  if (!value) return "";
  const v = String(value);
  const i = v.indexOf("generatedfilename=");
  if (i >= 0)
    return decodeURIComponent(v.slice(i + "generatedfilename=".length));
  if (/^https?:\/\//i.test(v)) return "";
  return v.trim();
};

const fileToUrl = (filenameOrUrl) => {
  if (!filenameOrUrl) return "";
  if (/^https?:\/\//i.test(String(filenameOrUrl))) return filenameOrUrl;
  return `${IMAGE_DOWNLOAD}${encodeURIComponent(String(filenameOrUrl))}`;
};

// const MIN_ORDER_TOTAL = 100;
const isValidCartItem = (it) => {
  const hasName = Boolean(String(it.name || "").trim());
  const hasQty = Number(it.qty) > 0;
  const hasPrice = Number(it.price) > 0 || Number(it.mrp) > 0;
  return hasName && hasQty && hasPrice;
};

const mapSavedToItems = (saved) => {
  return saved.flatMap((cat) =>
    (cat.products || []).map((p, idx) => {
      const persisted = p.image ?? p.productImage ?? "";
      const imageFilename = getFilenameFromValue(persisted);
      const imageUrl = imageFilename
        ? fileToUrl(imageFilename)
        : typeof persisted === "string"
        ? persisted
        : "";

      const qty = Number(p.qty || p.noOfQuantity || 0);
      const mrp = Number(p.mrp || 0);
      const discount = Number(p.discount || 0);
      const price = Number(
        p.afterDiscountPrice || p.afterDiscount || p.price || 0
      );
      const stockLeft = Number(p.stockLeft || 0);
      const item = {
        id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
        productId: p.productId ?? p.id ?? idx,
        name: p.productName ?? p.name ?? "",
        category: cat.categoryName,
        qty,
        mrp,
        discount,
        price,
        stockLeft,
        code: p.code,
        units: p.units,
        limit: Number(p.limit || 0),
        imageFilename,
        imageUrl,
      };

      return item;
    })
  )
  .filter(isValidCartItem);
};

const computeTotals = (items) => ({
  items: items.reduce((s, it) => s + Number(it.qty || 0), 0),
  total: Math.round(
    items.reduce(
      (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
      0
    )
  ),
});

const writeBackToStorage = (items) => {
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
      limit: it.limit,
      image:
        it.imageFilename ||
        getFilenameFromValue(it.imageUrl) ||
        it.imageUrl ||
        null,
    });
    return acc;
  }, {});

  const allCategories = Object.entries(grouped).map(
    ([categoryName, products]) => ({
      categoryName,
      products: products.filter((p) => Number(p.qty) > 0),
    })
  );
  localStorage.setItem("allCategories", JSON.stringify(allCategories));
};

const GroceryOffersCartPage = () => {
  const navigate = useNavigate();
    const location = useLocation();
  const { userId, userType } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [imageBlobMap, setImageBlobMap] = useState({});
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [grandSummary, setGrandSummary] = useState({ items: 0, total: 0 });
  const pollRef = useRef(null);
  const [MIN_ORDER_TOTAL, setMinOrderTotal] = useState(100);

  const mobileNumber =
    location.state?.mobileNumber || localStorage.getItem("customerMobileNumber");
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
  
    const url = `https://handymanapiv2.azurewebsites.net/api/Mart/CheckFirstOrder?CustomerPhoneNumber=${encodeURIComponent(
      mobile
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
  
  useEffect(() => {
    const safeParse = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "[]");
      } catch {
        return [];
      }
    };
    
    const saved0 = safeParse("allCategories");
    if (!saved0.length) {
      const activeOrderId = localStorage.getItem("activeOrderId");
      const snap =
        activeOrderId && localStorage.getItem(`cartSnapshot_${activeOrderId}`);
      if (snap) localStorage.setItem("allCategories", snap);
    }
    const saved = safeParse("allCategories");
    const rawItems = mapSavedToItems(saved);

const clampedItems = rawItems.map((it) => ({
  ...it,
  qty: clampQty(it, Number(it.qty || 0)),
}));

writeBackToStorage(clampedItems);
setCartItems(clampedItems);
setGrandSummary(computeTotals(clampedItems));
 }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== "allCategories") return;
      try {
        const saved = JSON.parse(e.newValue || "[]");
        const allItems = mapSavedToItems(saved);
        setCartItems(allItems);
        setGrandSummary(computeTotals(allItems));
      } catch {
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const filenames = Array.from(
      new Set(
        cartItems
          .map((i) => i.imageFilename)
          .filter(Boolean)
          .filter((fn) => !(fn in imageBlobMap))
      )
    );
    if (!filenames.length) return;

    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.allSettled(
          filenames.map(async (fn) => {
            const res = await fetch(
              `${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}`
            );
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const data = await res.json();
              if (!data?.imageData) throw new Error("No imageData");
              const byte = atob(data.imageData);
              const arr = new Uint8Array(byte.length);
              for (let i = 0; i < byte.length; i++)
                arr[i] = byte.charCodeAt(i);
              const blob = new Blob([arr], { type: "image/*" });
              const blobUrl = URL.createObjectURL(blob);
              return { fn, url: blobUrl };
            } else {
              return {
                fn,
                url: `${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}`,
              };
            }
          })
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

const handleQtyChange = (rowId, delta) => {
  setCartItems((prev) => {
    const next = prev
      .map((it) => {
        if (it.id !== rowId) return it;
        const proposed = Number(it.qty || 0) + delta;
        const clamped = clampQty(it, proposed);
        return { ...it, qty: clamped };
      })
      .filter(isValidCartItem);
    writeBackToStorage(next);
    setGrandSummary(computeTotals(next));
    return next;
  });
};

  // ----- Proceed -----
  const handleGroceryProceed = async (event) => {
    event.preventDefault();
    const allCategories =
      JSON.parse(localStorage.getItem("allCategories") || "[]") || [];
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
      GrandTotal: String(grandSummary.total),
      TotalItemsSelected: String(grandSummary.items),
      categories: allCategories.map((cat) => {
        const products = (cat.products || [])
          .map((p) => {
            const persisted = p.image ?? p.productImage ?? "";
            const filename = getFilenameFromValue(persisted);
            const safeImage =
              filename || (typeof persisted === "string" ? persisted : "");
            const qty = Number(p.qty || p.noOfQuantity || 0);
            const price = Number(
              p.afterDiscountPrice || p.price || 0
            );
            const mrp = Number(p.mrp || 0);

            if (
              qty <= 0 ||
              (!mrp && !price) ||
              !String(p.productName || p.name || "").trim()
            ) {
              return null;
            }

            return {
              productName: (p.productName || p.name || "").trim(),
              noOfQuantity: String(qty),
              productImage: safeImage,
              mrp: String(mrp),
              discount: String(p.discount || 0),
              afterDiscountPrice: String(price),
              stockLeft: String(
                (Number(p.stockLeft) || 0) - qty
              ),
              code: String(p.code || ""),
              units: String(p.units || ""),
            };
          })
          .filter(Boolean);
        return {
          categoryName: cat.categoryName,
          numberOfItemsSelected: products.reduce(
            (sum, p) => sum + Number(p.noOfQuantity),
            0
          ),
          totalAmount: Math.round(
            products.reduce(
              (sum, p) =>
                sum +
                Number(p.afterDiscountPrice) *
                  Number(p.noOfQuantity),
              0
            )
          ),
          products,
        };
      }),
    };
    try {
      const response = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/Mart/UploadProductDetails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const extractedId = data.id;
        if (extractedId) {
          const currentCart =
            localStorage.getItem("allCategories") || "[]";
          localStorage.setItem(
            `cartSnapshot_${extractedId}`,
            currentCart
          );
          localStorage.setItem("activeOrderId", extractedId);
          localStorage.setItem(
            `cartMeta_${extractedId}`,
            JSON.stringify({
              items: grandSummary.items,
              total: grandSummary.total,
            })
          );
          navigate(
            `/groceryPaymentMethod/${userType}/${userId}/${extractedId}`
          );
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

const cartItemsRef = useRef([]);

useEffect(() => {
  cartItemsRef.current = cartItems;
}, [cartItems]);

 // ----- Poll stock & re-clamp by stock + per-item limit -----
useEffect(() => {
  const fetchAndUpdateStock = async () => {
    try {
      const categories = Array.from(
        new Set(
          cartItemsRef.current
            .map((it) => it.category)
            .filter(Boolean)
        )
      );
      if (!categories.length) return;

      const allProducts = [];
      for (const cat of categories) {
        const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsBycategory?Category=${encodeURIComponent(
          cat
        )}`;
        const res = await fetch(url);
        const list = (await res.json()) || [];
        allProducts.push(...list);
      }

     const byId = new Map();
      const byName = new Map();

      allProducts.forEach((p) => {
        const stock = Number(p.stockLeft || 0);
        const limit = Number(p.limit || 0);   
        byId.set(String(p.id), { stock, limit });
        byName.set(norm(p.name), { stock, limit });
      });


      setCartItems((prev) => {
        let changed = false;
        const next = prev.map((it) => {
         const apiData =
          byId.get(String(it.productId)) ??
          byName.get(norm(it.name));

        const stock = apiData?.stock ?? Number(it.stockLeft || 0);
        const limit = Number(apiData?.limit || it.limit || 0);

        const maxAllowed = Math.min(stock, getLimit({ limit }));
        const clampedQty = Math.max(0, Math.min(Number(it.qty || 0), maxAllowed));

          if (stock !== it.stockLeft || limit !== it.limit || clampedQty !== it.qty) {
            changed = true;
          }

          return { ...it, stockLeft: stock, limit, qty: clampedQty };
        });

        const filtered = next.filter(isValidCartItem);

        if (changed) {
          writeBackToStorage(filtered);
          setGrandSummary(computeTotals(filtered));
        }

        return filtered;
      });
    } catch (e) {
       console.error("Stock/limit update failed:", e);
    }
  };

  fetchAndUpdateStock();
  pollRef.current = setInterval(fetchAndUpdateStock, 10000);

  return () => {
    if (pollRef.current) clearInterval(pollRef.current);
  };
}, []); 

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };

  const itemsTotal = Math.round(
    cartItems.reduce(
      (s, it) =>
        s +
        (Number(it.mrp) > 0
          ? Number(it.mrp) * Number(it.qty)
          : Number(it.price) * Number(it.qty)),
      0
    )
  );

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
            onClick={() =>
              navigate(`/profilePage/${userType}/${userId}`)
            }
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
        style={{ overflowY: "auto", padding: "8px", marginTop: "48px" }}
      >
        {cartItems.map((item) => {
          const stockMax = Number.isFinite(item.stockLeft)
            ? item.stockLeft
            : Infinity;
          const limit = getLimit(item);
          const maxAllowed = Math.min(stockMax, limit);
          const canAdd = item.qty < maxAllowed;

          return (
            <div
              key={item.id}
              className="cart-item d-flex align-items-start justify-content-between mb-2"
            >
              {/* Product Image */}
              <img
                src={
                  (item.imageFilename &&
                    imageBlobMap[item.imageFilename]) ||
                  (item.imageFilename &&
                    fileToUrl(item.imageFilename)) ||
                  item.imageUrl ||
                  "/placeholder.png"
                }
                alt={item.name}
                onClick={() =>
                  handleImageClick(
                    (item.imageFilename &&
                      imageBlobMap[item.imageFilename]) ||
                      (item.imageFilename &&
                        fileToUrl(item.imageFilename)) ||
                      item.imageUrl ||
                      "/placeholder.png"
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
                  {Number(item.mrp) > 0 && (
                    <>
                      MRP: <s>₹{Math.round(item.mrp)}</s>&nbsp;
                      <span style={{ color: "red" }}>
                        {Math.round(item.discount)}% off
                      </span>
                    </>
                  )}
                  {item.units && (
                    <span
                      style={{ color: "dark", marginLeft: "5px" }}
                    >
                      {item.units}
                    </span>
                  )}
                   </div>

                <div
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  ₹{Math.round(item.price)}
                </div>
              </div>

              {/* Quantity Box */}
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
                  onClick={() =>
                    handleQtyChange(item.id, -1)
                  }
                  style={{ color: "white", padding: "2px" }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {item.qty}
                </span>
                <IconButton
                  size="small"
                  onClick={() =>
                    canAdd && handleQtyChange(item.id, +1)
                  }
                  style={{
                    color: "white",
                    padding: "2px",
                    opacity: canAdd ? 1 : 0.5,
                    cursor: canAdd
                      ? "pointer"
                      : "not-allowed",
                  }}
                  disabled={!canAdd}
                  title={
                    canAdd
                      ? "Add one"
                      : item.qty >= stockMax &&
                        stockMax !== Infinity
                      ? "No more stock"
                      : Number.isFinite(limit)
                      ? `Limit ${limit} per customer`
                      : "No more allowed"
                  }
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
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
            <s className="text-muted">₹{itemsTotal}</s>{" "}
            ₹{grandSummary.total}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            🚲 Delivery charge <InfoIcon fontSize="small" />
          </span>
          <span
            className="text-danger fw-bold"
            style={{ fontSize: "10px" }}
          >
            FREE
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            👜 Handling charge <InfoIcon fontSize="small" />
          </span>
          <span
            className="text-danger fw-bold"
            style={{ fontSize: "10px" }}
          >
            FREE
          </span>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between align-items-center fw-bold">
          <span>Grand total</span>
          <span>₹{grandSummary.total}</span>
        </div>
      </div>
      <Divider />

      {grandSummary.total < MIN_ORDER_TOTAL && (
        <p
          style={{
            color: "red",
            fontSize: "13px",
            marginTop: "0px",
          }}
        >
          Minimum order is ₹{MIN_ORDER_TOTAL} and above
        </p>
      )}

      {/* Footer CTA */}
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
          <span style={{ fontSize: "12px" }}>
            {grandSummary.items} items
          </span>
          <div
            style={{
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            ₹{grandSummary.total}
          </div>
        </div>

        <div
          style={{
            fontWeight: "500",
            fontSize: "15px",
            cursor:
              grandSummary.total < MIN_ORDER_TOTAL
                ? "not-allowed"
                : "pointer",
            opacity:
              grandSummary.total < MIN_ORDER_TOTAL ? 0.6 : 1,
          }}
          onClick={
            grandSummary.total >= MIN_ORDER_TOTAL
              ? handleGroceryProceed
              : undefined
          }
        >
          {grandSummary.total < MIN_ORDER_TOTAL
            ? "Add More Items"
            : "Proceed →"}
        </div>
      </div>

      <div className="text-start">
        <button
          className="btn btn-warning mt-1 mb-1"
          onClick={() =>
            navigate(`/profilePage/${userType}/${userId}`)
          }
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
            <img
              src={zoomImage}
              alt="Zoomed Product"
              className="zoom-image"
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GroceryOffersCartPage;
