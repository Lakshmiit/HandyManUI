import React, { useEffect, useState, useRef } from "react";
import {
  Divider,
  IconButton,
} from "@mui/material"; 
import { Modal } from 'react-bootstrap'; 
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import "./App.css"; 
import CartImg from './img/Cart.jpeg';
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer.js";
import { useLocation } from "react-router-dom";

const GroceryCartPage = () => {    
  const navigate = useNavigate();
  const location = useLocation();
  const {userId} = useParams();
  const {userType} = useParams();
  const [cartItems, setCartItems] = useState([]);
  const removalTimers = useRef({});
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [grandSummary, setGrandSummary] = useState({ items: 0, total: 0 });
  const [imageBlobMap, setImageBlobMap] = useState({}); 
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
    "https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=";

  function toNum(v, f = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : f;
  }

function getCustomLimit(name) {
 const n = String(name || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/(\d+)\s*l\b/, "$1 l")
    .replace(/(\d+)\s*ml\b/, "$1 ml")
    .trim();

  if ( n === "visakha dairy curd 180 g" ||
    n === "visakha dairy happy full cream milk 500 ml" ||
    n === "visakha dairy milk 200 ml" || n === "visakha dairy good milk 180 ml" || 
    n === "lemon (nimakaya) (3pcs)" || 
    n === "freedom refined sunflower oil 5 l" ||
    n === "gold drop refined sunflower oil can 5 l" ||
    n === "aashirvaad high fibre atta with multigrains 5 kg" ||
    n === "aashirvaad superior whole wheat atta 5 kg" ||
    n === "pomegranate 2 pcs (300-400 g)" ||
    n === "royal gala apple 2 pcs (200-300 g)" ||
    n === "banana 4 pcs" ||
    n === "fresh orange imported (narinja) 2 pcs (400-450 g)" ||
    n === "freedom refined sunflower oil bottle 1 l"  ||
    n === "guava 2 pcs (600-700 g)" ||
    n === "tomato 500 g" ||
    n === "heritage total curd 400 g" || 
    n === "mosambi (batthayi) 4 pcs" ||
    n === "pomegranate 3 pcs (300-400 g)" ||
    n === "fresh orange imported (narinja) 3 pcs (400-450 g)" ||
    n === "onion (ulligadda) 1kg"  ||
    n === "potato (bangala dumpa) 1 kg" ||
    n === "royal gala apple 2 pcs (200-250 g)" ||
     n === "iran apple 2 pcs" ||
     n === "baby oranges 2 pcs"  ||
     n === "tomato 1 kg" ||
     n === "cabbage (700-800 g) 1 pc"
    ) return 1;
  if (
    n === "coriander leaves (kottimeera) 70-80 g" ||
  n === "curry leaves (karivepaku) 100 g" ||
  n === "mint Leaves (pudina) 70-80 g" ||
    n === "radish (mulangi) 250-300 g" ||
    n === "visakha dairy ganga toned milk 500 ml" ||
    n === "onion (ulligadda) 500 g (1/2 kg)" || 
    n === "potato (bangala dumpa) 500 g (1/2 kg)" ||
    n === "ivy gourd (dondakaya) 250 g" ||
    n === "green chilli (pachchi mirchi) 100 g" || 
    n === "tomato 250 g" ||    
    n === "raw banana 2 pc"  ||    
    n === "independence refined sunflower oil 1 l"  || 
    n === "freedom refined sunflower oil 1 l"  ||
    n === "tomato 500 g (1/2 kg)" || 
    n === "eggs pack 2" || 
    n === "cucumber (dosakaya) 250 g"
    ) return 2;
  if (   
    n === "gold drop refined sunflower oil 1 l" ||
    n === "aashirvaad superior whole wheat mp atta 1 kg" ||
    n === "aashirvaad high fibre atta with multigrains 1 kg"
   ) return 3;
  return Infinity;   
}

  function getFilenameFromValue(value) {
    if (!value) return "";
    const v = String(value);
    const i = v.indexOf("generatedfilename=");
    if (i >= 0) return decodeURIComponent(v.slice(i + "generatedfilename=".length));
    if (/^https?:\/\//i.test(v)) return "";
    return v.trim();
  }
  function fileToUrl(filenameOrUrl) {
    if (!filenameOrUrl) return "";
    if (/^https?:\/\//i.test(String(filenameOrUrl))) return filenameOrUrl;
    return `${IMAGE_DOWNLOAD}${encodeURIComponent(String(filenameOrUrl))}`;
  }

    //  const norm = (s) => String(s || "").toLowerCase().trim();
    //   const MIN_ORDER_TOTAL = cartItems.some((it) => norm(it.category) === "grocery offers") ? 100 : 100;
  const refreshStocksOnce = React.useCallback(
    async (signal) => {
      const norm = (s) => String(s || "").toLowerCase().trim();
      const isOffersRow = (obj) => norm(obj?.category) === "offers";

      function pickBestNonOffer(items, name) {
        const pool = (items || []).filter((it) => !isOffersRow(it));
        if (!pool.length) return null;
        const lname = norm(name);
        const exact = pool.filter((it) => norm(it?.name) === lname);
        const p = exact.length ? exact : pool;
        return (
          p
            .slice()
            .sort((a, b) => {
              const aStock = Number(a?.stockLeft || 0);
              const bStock = Number(b?.stockLeft || 0);
              if ((bStock > 0) !== (aStock > 0)) return bStock > 0 ? 1 : -1;
              return Date.parse(b?.date || 0) - Date.parse(a?.date || 0);
            })[0] || null
        );
      }
      const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");
      const flat = saved
        .flatMap((cat) =>
      (cat.products || []).map((p) => ({
            categoryName: cat.categoryName,
            productName: p.productName || p.name || "",
            qty: Math.min(
            toNum(p.qty, 0),
            getCustomLimit(p.productName || p.name || "")
          ),
            mrp: toNum(p.mrp, 0),
            discount: toNum(p.discount, 0),
            price: toNum(p.afterDiscountPrice ?? p.price, 0),
            stockLeft: toNum(p.stockLeft, 0),
            code: p.code,
            units: p.units,
            image: p.image ?? p.productImage ?? null,
          }))
        )
        .filter((x) => x.qty > 0 && x.productName);
      if (!flat.length) return;
      const uniqueNames = Array.from(new Set(flat.map((x) => x.productName.trim())));
      const lookups = await Promise.allSettled(
        uniqueNames.map(async (name) => {
          const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
            name
          )}`;
          const res = await fetch(url, { signal });
          const text = await res.text();
          let data = [];
          try {
            data = text ? JSON.parse(text) : [];
          } catch {
            data = [];
          }
          return { name, items: Array.isArray(data) ? data : data ? [data] : [] };
        })
      );
      const stockMap = new Map();
      lookups.forEach((r) => {
        if (r.status !== "fulfilled") return;
        const { name, items } = r.value || {};
        const best = pickBestNonOffer(items, name);
        if (!best) return;
        const newStock = toNum(best?.stockLeft, null);
        if (newStock !== null) stockMap.set(name, newStock);
      });

      if (!stockMap.size) return;
      const updated = saved.map((cat) => ({
        ...cat,
        products: (cat.products || [])
          .map((p) => {
            const pname = p.productName || p.name || "";
            if (!pname) return p;
            const latestStock = stockMap.get(pname);
            if (latestStock == null) return p;
            const limit = getCustomLimit(p.productName || p.name || "");
              const currentQty = Math.min(toNum(p.qty, 0), limit);
              const clampedQty = Math.max(
                0,
                Math.min(currentQty, latestStock)
              );
            return {       
              ...p,
              stockLeft: String(latestStock),
              qty: clampedQty,
            };
          })
          .filter((p) => toNum(p.qty, 0) > 0),
      }));
      localStorage.setItem("allCategories", JSON.stringify(updated));
      const allItems = updated
        .flatMap((cat) =>
      (cat.products || []).map((p, idx) => {
            const persisted = p.image ?? p.productImage ?? "";
            const imageFilename = getFilenameFromValue(persisted);
            const imageUrl = imageFilename
              ? fileToUrl(imageFilename)
              : typeof persisted === "string"
              ? persisted
              : "";
            return {
              id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
              productId: p.productId ?? p.id ?? idx,
              name: p.productName ?? p.name ?? "",
              category: cat.categoryName,
              qty: toNum(p.qty, 0),
              mrp: toNum(p.mrp, 0),
              discount: toNum(p.discount, 0),
              price: toNum(p.afterDiscountPrice ?? p.price, 0),
              stockLeft: toNum(p.stockLeft, 0),
              code: p.code,
              units: p.units,
              imageFilename,
              imageUrl,
            };
          })
        )
        .filter((it) => it.qty > 0 && Number(it.stockLeft) > 0);
      setCartItems(allItems);
      setGrandSummary({
        items: allItems.reduce((s, it) => s + toNum(it.qty, 0), 0),
        total: Math.round(
          allItems.reduce((s, it) => s + toNum(it.price, 0) * toNum(it.qty, 0), 0)
        ),
      });
    },
    [] 
  );

  useEffect(() => {
  const ctrl = new AbortController();
  const tick = () => {
    if (ctrl.signal.aborted) return;
    refreshStocksOnce(ctrl.signal).catch((e) => {
      if (e?.name !== "AbortError") console.warn("Stock refresh failed:", e);
    });
  };

  tick();
  const id = setInterval(tick, 5000);
  return () => {
    clearInterval(id);
    ctrl.abort();
  };
}, [refreshStocksOnce]);

const buildCartFromStorage = React.useCallback(() => {
  const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");

  const items = saved.flatMap((cat) =>
    (cat.products || [])
      .filter(p => Number(p.qty) > 0)   
      .map((p, idx) => {
        const persisted = p.image ?? p.productImage ?? "";
        const imageFilename = getFilenameFromValue(persisted);
        const imageUrl = imageFilename
          ? fileToUrl(imageFilename)
          : (typeof persisted === "string" ? persisted : "");
        const rawQty = Number(p.qty);
        const limit = getCustomLimit(p.productName ?? p.name ?? "");
        const stock = Number(p.stockLeft || Infinity);
        return {          
          id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
          productId: p.productId ?? p.id ?? idx,
          name: p.productName ?? p.name ?? "",
          category: cat.categoryName,
          qty: Math.min(rawQty, limit, stock),
          mrp: Number(p.mrp || 0),
          discount: Number(p.discount || 0),
          price: Number(p.afterDiscountPrice || p.price || 0),
          stockLeft: Number(p.stockLeft || 0),
          code: p.code,
          units: p.units,
          imageFilename,
          imageUrl,
        };
      })
  );

  return items;
}, []);

useEffect(() => {
  const items = buildCartFromStorage();
  setCartItems(items);
  setGrandSummary({
    items: items.reduce((s, it) => s + it.qty, 0),
    total: Math.round(items.reduce((s, it) => s + it.price * it.qty, 0)),
  });
}, [buildCartFromStorage]);

  useEffect(() => {
    const filenames = Array.from(
      new Set(
        cartItems
          .map(i => i.imageFilename)
          .filter(Boolean)
          .filter(fn => !(fn in imageBlobMap))
      )
    );
    if (!filenames.length) return;

    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.allSettled(
          filenames.map(async (fn) => {
            const res = await fetch(`${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}`);
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
          })
        );
        if (cancelled) return;
        const mapUpdate = {};
        results.forEach(r => {
          if (r.status === "fulfilled" && r.value?.fn && r.value?.url) {
            mapUpdate[r.value.fn] = r.value.url;
          }
        });
        if (Object.keys(mapUpdate).length) {
          setImageBlobMap(prev => ({ ...prev, ...mapUpdate }));
        }
      } catch (e) {
        console.error("prefetch images failed", e);
      }
    })();
    return () => { cancelled = true; };
  }, [cartItems, imageBlobMap]);

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
        image: it.imageFilename || getFilenameFromValue(it.imageUrl) || it.imageUrl || null,
      });
      return acc;
    }, {});
    const allCategories = Object.entries(grouped).map(([categoryName, products]) => ({
      categoryName,
      products: products.filter(p => Number(p.qty) > 0),
    }));
    localStorage.setItem("allCategories", JSON.stringify(allCategories));
  };

  const handleQtyChange = (rowId, delta) => {
  setCartItems(prev => {
    const next = prev
      .map(it => {
        if (it.id !== rowId) return it;
        const stockMax = Number.isFinite(it.stockLeft) ? it.stockLeft : Infinity;
        const limitMax = getCustomLimit(it.name);
        const max = Math.min(stockMax, limitMax);

        const current = Number(it.qty || 0);
        const proposed = current + delta;
        const clamped = Math.max(0, Math.min(proposed, max));
        return { ...it, qty: clamped };
      })
      .filter(it => it.qty > 0);

    writeBackToStorage(next);
    setGrandSummary(computeTotals(next));
    return next;
  });
};

  const computeTotals = (items) => ({
    items: items.reduce((s, it) => s + Number(it.qty || 0), 0),
    total: Math.round(items.reduce((s, it) => s + Number(it.price || 0) * Number(it.qty || 0), 0)),
  });

  const handleGroceryProceed = async (event) => {
    event.preventDefault();
    const allCategories = JSON.parse(localStorage.getItem("allCategories")) || [];
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
      GrandTotal: (roundedGrandTotal).toString(),
      TotalItemsSelected: (grandSummary.items).toString(),
      categories: allCategories.map((cat) => {
        const products = (cat.products || []).map((p) => {
          const persisted = p.image ?? p.productImage ?? "";
          const filename = getFilenameFromValue(persisted);
          const safeImage = filename || (typeof persisted === "string" ? persisted : "");
          return {
            productName: (p.productName?.trim() || p.name?.trim() || ""),
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
          numberOfItemsSelected: products.reduce((sum, p) => sum + Number(p.noOfQuantity), 0),
          totalAmount: Math.round(
            products.reduce((sum, p) => sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity), 0)
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
          const currentCart = localStorage.getItem("allCategories") || "[]";
          localStorage.setItem(`cartSnapshot_${extractedId}`, currentCart);
          localStorage.setItem("activeOrderId", extractedId);
          localStorage.setItem(`cartMeta_${extractedId}`,JSON.stringify({ items: grandSummary.items, total: roundedGrandTotal }));
          navigate(`/groceryPaymentMethod/${userType}/${userId}/${extractedId}`);
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

  const handleRestore = (id) => {
    clearTimeout(removalTimers.current[id]);
    delete removalTimers.current[id];
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: 1, removing: false } : item
      )
    );
  };

  const itemsTotal = Math.round(cartItems.reduce((s, it) => s + it.mrp   * it.qty, 0));
  const grandTotal = Math.round(cartItems.reduce((s, it) => s + it.price * it.qty, 0));
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
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="cart-item d-flex align-items-start justify-content-between mb-2"
          >
            {/* Product Image */}
            <img
              src={ (item.imageFilename && imageBlobMap[item.imageFilename]) ||
                  (item.imageFilename && fileToUrl(item.imageFilename)) ||
                  item.imageUrl || "/placeholder.png" }
              alt={item.name}
              onClick={() => handleImageClick(
                (item.imageFilename && imageBlobMap[item.imageFilename]) ||
                (item.imageFilename && fileToUrl(item.imageFilename)) ||
                item.imageUrl ||
                "/placeholder.png"
              )}
              style={{ height: 50, width: 30, cursor: "pointer", borderRadius: 6 }}
              onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
            />

            {/* Product Details */}
            <div style={{ flex: 1, marginLeft: "8px" }}>
              <div style={{ fontWeight: "500", fontSize: "12px", marginRight: "5px"}}>{item.name}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                MRP: <s>₹{Math.round(item.mrp)}</s> &nbsp;
                <span style={{ color: "red" }}>{Math.round(item.discount)}% off</span>
                <span style={{ color: "dark", marginLeft: "5px" }}>{item.units}</span>
              </div>
              <div style={{ fontWeight: "600", fontSize: "12px" }}>₹{Math.round(item.price)}</div>
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
                <span style={{ fontWeight: "bold", fontSize: "12px" }}>{Math.min(item.qty, getCustomLimit(item.name))}</span>
                <IconButton
                  size="small"
                  onClick={() => handleQtyChange(item.id, 1)}
                  style={{ color: "white", padding: "2px", opacity: item.qty >= item.stockLeft ? 0.5 : 1 }}
                  disabled={
                    Math.min(item.qty, getCustomLimit(item.name)) >=
                    Math.min(item.stockLeft, getCustomLimit(item.name))
                  }
                 title={Number.isFinite(item.stockLeft) && item.qty >= item.stockLeft ? "No more stock" : "Add one"}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>   
            )}
          </div>
        ))}
      </div>

      {/* Bill Details */}
      <div className="bill-details p-1">
        <p className="fs-6 fw-bold">Bill details</p>
        <div className="d-flex justify-content-between align-items-center">
          <span>📋 Items total</span>
          <span>
            <s className="text-muted">₹{roundedItemsTotal}</s> ₹{roundedGrandTotal}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>🚲 Delivery charge <InfoIcon fontSize="small" /></span>
          <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
            FREE
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>👜 Handling charge <InfoIcon fontSize="small" /></span>
          <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
            FREE
          </span>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between align-items-center fw-bold">
          <span>Grand total</span>
          <span>₹{roundedGrandTotal}</span>
        </div>
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
          <div style={{ fontWeight: "500", fontSize: "15px" }}>₹{roundedGrandTotal}</div>
        </div>
        
        <div
          style={{
            fontWeight: "500",
            fontSize: "15px",
            cursor: roundedGrandTotal < MIN_ORDER_TOTAL ? "not-allowed" : "pointer",
            opacity: roundedGrandTotal < MIN_ORDER_TOTAL ? 0.6 : 1
          }}
          onClick={roundedGrandTotal >= MIN_ORDER_TOTAL ? handleGroceryProceed : undefined}
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
      <Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
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

// import React, { useEffect, useState, useRef } from "react";
// import {
//   Divider,
//   IconButton,
// } from "@mui/material"; 
// import { Modal } from 'react-bootstrap'; 
// import {
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material";
// import "./App.css"; 
// import CartImg from './img/Cart.jpeg';
// import { useNavigate, useParams } from "react-router-dom";
// import Footer from "./Footer.js";
// import { useLocation } from "react-router-dom";

// const GroceryCartPage = () => {    
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {userId} = useParams();
//   const {userType} = useParams();
//   const [cartItems, setCartItems] = useState([]);
//   const removalTimers = useRef({});
//   const [showZoomModal, setShowZoomModal] = useState(false);
//   const [zoomImage, setZoomImage] = useState("");
//   const [grandSummary, setGrandSummary] = useState({ items: 0, total: 0 });
//   const [imageBlobMap, setImageBlobMap] = useState({}); 
//   const [limitMap, setLimitMap] = useState({});
//   const [MIN_ORDER_TOTAL, setMinOrderTotal] = useState(100);

// const mobileNumber =
//   location.state?.mobileNumber || localStorage.getItem("customerMobileNumber");
//   useEffect(() => {
//   const checkUserOrder = async () => {
//     if (!mobileNumber) return;
//     const result = await CheckFirstOrder(mobileNumber);
//     if (result === null) {
//       setMinOrderTotal(150);
//     } else {
//       setMinOrderTotal(100);
//     }
//   };
//   checkUserOrder();
// }, [mobileNumber]);

//   const CheckFirstOrder = async (mobile) => {
//   if (!mobile) return null;

//   const url = `https://handymanapiv2.azurewebsites.net/api/Mart/CheckFirstOrder?CustomerPhoneNumber=${encodeURIComponent(
//     mobile
//   )}`;

//   try {
//     const res = await fetch(url);
//     const text = await res.text();
//     console.log("RAW RESPONSE:", text);
//     // ✅ First order (API returns this text)
//     if (text.toLowerCase().includes("firstorder can not be found")) {
//       return null;
//     }
//     let parsed;
//     try {
//       parsed = JSON.parse(text);
//     } catch (err) {
//       console.warn("Could not parse CheckFirstOrder response:", err);
//       return null;
//     }
//     if (parsed && !Array.isArray(parsed)) {
//       parsed = [parsed];
//     }
//     return Array.isArray(parsed) ? parsed : null;
//   } catch (error) {
//     console.error("API ERROR:", error);
//     return null;
//   }
// };

//   const IMAGE_DOWNLOAD =
//     "https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=";

//   function toNum(v, f = 0) {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : f;
//   }

//   const getDynamicLimit = (productName) => {
//   const key = String(productName || "").trim().toLowerCase();
//   return limitMap[key] ?? Infinity;
// };

// useEffect(() => {
//   if (!cartItems.length) return;

//   const uniqueNames = Array.from(
//     new Set(cartItems.map((x) => x.name).filter(Boolean))
//   );

//   let cancelled = false;

//   (async () => {
//     try {
//       const results = await Promise.allSettled(
//         uniqueNames.map(async (name) => {
//           const res = await fetch(
//             `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
//               name
//             )}`
//           );

//           const data = await res.json();
//           const arr = Array.isArray(data) ? data : [];
//           const best = arr
//             .slice()
//             .sort((a, b) => Date.parse(b?.date || 0) - Date.parse(a?.date || 0))[0];

//           const limitValue = Number(best?.limit);
//           return {
//             name,
//             limit: Number.isFinite(limitValue) && limitValue > 0 ? limitValue : Infinity,
//           };
//         })
//       );
//       if (cancelled) return;
//       const newMap = {};
//       results.forEach((r) => {
//         if (r.status === "fulfilled") {
//           const k = String(r.value.name || "").trim().toLowerCase();
//           newMap[k] = r.value.limit;
//         }
//       });
//       setLimitMap((prev) => ({ ...prev, ...newMap }));
//     } catch (e) {
//       console.warn("Limit fetch failed", e);
//     }
//   })();
//   return () => {
//     cancelled = true;
//   };
// }, [cartItems]);

// const limitMapRef = useRef({});
// useEffect(() => {
//   limitMapRef.current = limitMap;
// }, [limitMap]);

// const getDynamicLimitRef = (name) => {
//   const key = String(name || "").trim().toLowerCase();
//   return limitMapRef.current[key] ?? Infinity;
// };

//   function getFilenameFromValue(value) {
//     if (!value) return "";
//     const v = String(value);
//     const i = v.indexOf("generatedfilename=");
//     if (i >= 0) return decodeURIComponent(v.slice(i + "generatedfilename=".length));
//     if (/^https?:\/\//i.test(v)) return "";
//     return v.trim();
//   }
//   function fileToUrl(filenameOrUrl) {
//     if (!filenameOrUrl) return "";
//     if (/^https?:\/\//i.test(String(filenameOrUrl))) return filenameOrUrl;
//     return `${IMAGE_DOWNLOAD}${encodeURIComponent(String(filenameOrUrl))}`;
//   }

//     //  const norm = (s) => String(s || "").toLowerCase().trim();
//       // const MIN_ORDER_TOTAL = cartItems.some((it) => norm(it.category) === "grocery offers") ? 100 : 100;
//   const refreshStocksOnce = React.useCallback(
//     async (signal) => {
//       const norm = (s) => String(s || "").toLowerCase().trim();
//       const isOffersRow = (obj) => norm(obj?.category) === "offers";

//       function pickBestNonOffer(items, name) {
//         const pool = (items || []).filter((it) => !isOffersRow(it));
//         if (!pool.length) return null;
//         const lname = norm(name);
//         const exact = pool.filter((it) => norm(it?.name) === lname);
//         const p = exact.length ? exact : pool;
//         return (
//           p
//             .slice()
//             .sort((a, b) => {
//               const aStock = Number(a?.stockLeft || 0);
//               const bStock = Number(b?.stockLeft || 0);
//               if ((bStock > 0) !== (aStock > 0)) return bStock > 0 ? 1 : -1;
//               return Date.parse(b?.date || 0) - Date.parse(a?.date || 0);
//             })[0] || null
//         );
//       }
//       const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");
//       const flat = saved
//         .flatMap((cat) =>
//       (cat.products || []).map((p) => ({
//             categoryName: cat.categoryName,
//             productName: p.productName || p.name || "",
//             qty: Math.min(
//             toNum(p.qty, 0),
//             getDynamicLimitRef(p.productName || p.name || "")
//           ),
//             mrp: toNum(p.mrp, 0),
//             discount: toNum(p.discount, 0),
//             price: toNum(p.afterDiscountPrice ?? p.price, 0),
//             stockLeft: toNum(p.stockLeft, 0),
//             code: p.code,
//             units: p.units,
//             image: p.image ?? p.productImage ?? null,
//           }))
//         )
//         .filter((x) => x.qty > 0 && x.productName);
//       if (!flat.length) return;
//       const uniqueNames = Array.from(new Set(flat.map((x) => x.productName.trim())));
//       const lookups = await Promise.allSettled(
//         uniqueNames.map(async (name) => {
//           const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
//             name
//           )}`;
//           const res = await fetch(url, { signal });
//           const text = await res.text();
//           let data = [];
//           try {
//             data = text ? JSON.parse(text) : [];
//           } catch {
//             data = [];
//           }
//           return { name, items: Array.isArray(data) ? data : data ? [data] : [] };
//         })
//       );
//       const stockMap = new Map();
//       lookups.forEach((r) => {
//         if (r.status !== "fulfilled") return;
//         const { name, items } = r.value || {};
//         const best = pickBestNonOffer(items, name);
//         if (!best) return;
//         const newStock = toNum(best?.stockLeft, null);
//         if (newStock !== null) stockMap.set(name, newStock);
//       });

//       if (!stockMap.size) return;
//       const updated = saved.map((cat) => ({
//         ...cat,
//         products: (cat.products || [])
//           .map((p) => {
//             const pname = p.productName || p.name || "";
//             if (!pname) return p;
//             const latestStock = stockMap.get(pname);
//             if (latestStock == null) return p;
//             const limit = getDynamicLimitRef(p.productName || p.name || "");
//               const currentQty = Math.min(toNum(p.qty, 0), limit);
//               const clampedQty = Math.max(
//                 0,
//                 Math.min(currentQty, latestStock)
//               );
//             return {       
//               ...p,
//               stockLeft: String(latestStock),
//               qty: clampedQty,
//             };
//           })
//           .filter((p) => toNum(p.qty, 0) > 0),
//       }));
//       localStorage.setItem("allCategories", JSON.stringify(updated));
//       const allItems = updated
//         .flatMap((cat) =>
//       (cat.products || []).map((p, idx) => {
//             const persisted = p.image ?? p.productImage ?? "";
//             const imageFilename = getFilenameFromValue(persisted);
//             const imageUrl = imageFilename
//               ? fileToUrl(imageFilename)
//               : typeof persisted === "string"
//               ? persisted
//               : "";
//             return {
//               id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
//               productId: p.productId ?? p.id ?? idx,
//               name: p.productName ?? p.name ?? "",
//               category: cat.categoryName,
//               qty: toNum(p.qty, 0),
//               mrp: toNum(p.mrp, 0),
//               discount: toNum(p.discount, 0),
//               price: toNum(p.afterDiscountPrice ?? p.price, 0),
//               stockLeft: toNum(p.stockLeft, 0),
//               code: p.code,
//               units: p.units,
//               imageFilename,
//               imageUrl,
//             };
//           })
//         )
//         .filter((it) => it.qty > 0 && Number(it.stockLeft) > 0);
//       setCartItems(allItems);
//       setGrandSummary({
//         items: allItems.reduce((s, it) => s + toNum(it.qty, 0), 0),
//         total: Math.round(
//           allItems.reduce((s, it) => s + toNum(it.price, 0) * toNum(it.qty, 0), 0)
//         ),
//       });
//     },
//     [] 
//   );

//   useEffect(() => {
//   const ctrl = new AbortController();
//   const tick = () => {
//     if (ctrl.signal.aborted) return;
//     refreshStocksOnce(ctrl.signal).catch((e) => {
//       if (e?.name !== "AbortError") console.warn("Stock refresh failed:", e);
//     });
//   };

//   tick();
//   const id = setInterval(tick, 5000);
//   return () => {
//     clearInterval(id);
//     ctrl.abort();
//   };
// }, [refreshStocksOnce]);

// const buildCartFromStorage = React.useCallback(() => {
//   const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");

//   const items = saved.flatMap((cat) =>
//     (cat.products || [])
//       .filter(p => Number(p.qty) > 0)   
//       .map((p, idx) => {
//         const persisted = p.image ?? p.productImage ?? "";
//         const imageFilename = getFilenameFromValue(persisted);
//         const imageUrl = imageFilename
//           ? fileToUrl(imageFilename)
//           : (typeof persisted === "string" ? persisted : "");
//         const rawQty = Number(p.qty);
//         const limit = getDynamicLimitRef(p.productName ?? p.name ?? "");
//         const stock = Number(p.stockLeft || Infinity);
//         return {          
//           id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
//           productId: p.productId ?? p.id ?? idx,
//           name: p.productName ?? p.name ?? "",
//           category: cat.categoryName,
//           qty: Math.min(rawQty, limit, stock),
//           mrp: Number(p.mrp || 0),
//           discount: Number(p.discount || 0),
//           price: Number(p.afterDiscountPrice || p.price || 0),
//           stockLeft: Number(p.stockLeft || 0),
//           code: p.code,
//           units: p.units,
//           imageFilename,
//           imageUrl,
//         };
//       })
//   );

//   return items;
// }, []);

// useEffect(() => {
//   const items = buildCartFromStorage();
//   setCartItems(items);
//   setGrandSummary({
//     items: items.reduce((s, it) => s + it.qty, 0),
//     total: Math.round(items.reduce((s, it) => s + it.price * it.qty, 0)),
//   });
// }, [buildCartFromStorage]);

//   useEffect(() => {
//     const filenames = Array.from(
//       new Set(
//         cartItems
//           .map(i => i.imageFilename)
//           .filter(Boolean)
//           .filter(fn => !(fn in imageBlobMap))
//       )
//     );
//     if (!filenames.length) return;

//     let cancelled = false;
//     (async () => {
//       try {
//         const results = await Promise.allSettled(
//           filenames.map(async (fn) => {
//             const res = await fetch(`${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}`);
//             const contentType = res.headers.get("content-type") || "";
//             if (contentType.includes("application/json")) {
//               const data = await res.json();         
//               if (!data?.imageData) throw new Error("No imageData");
//               const byte = atob(data.imageData);
//               const arr = new Uint8Array(byte.length);
//               for (let i = 0; i < byte.length; i++) arr[i] = byte.charCodeAt(i);
//               const blob = new Blob([arr], { type: "image/*" });
//               const blobUrl = URL.createObjectURL(blob);
//               return { fn, url: blobUrl };
//             } else {
//               return { fn, url: `${IMAGE_DOWNLOAD}${encodeURIComponent(fn)}` };
//             }
//           })
//         );
//         if (cancelled) return;
//         const mapUpdate = {};
//         results.forEach(r => {
//           if (r.status === "fulfilled" && r.value?.fn && r.value?.url) {
//             mapUpdate[r.value.fn] = r.value.url;
//           }
//         });
//         if (Object.keys(mapUpdate).length) {
//           setImageBlobMap(prev => ({ ...prev, ...mapUpdate }));
//         }
//       } catch (e) {
//         console.error("prefetch images failed", e);
//       }
//     })();
//     return () => { cancelled = true; };
//   }, [cartItems, imageBlobMap]);

//   const writeBackToStorage = (items) => {
//     const grouped = items.reduce((acc, it) => {
//       (acc[it.category] ||= []).push({
//         productId: it.productId,
//         productName: it.name,
//         qty: it.qty,
//         mrp: it.mrp,
//         discount: it.discount,
//         afterDiscountPrice: it.price,
//         stockLeft: it.stockLeft,
//         code: it.code,
//         units: it.units,
//         image: it.imageFilename || getFilenameFromValue(it.imageUrl) || it.imageUrl || null,
//       });
//       return acc;
//     }, {});
//     const allCategories = Object.entries(grouped).map(([categoryName, products]) => ({
//       categoryName,
//       products: products.filter(p => Number(p.qty) > 0),
//     }));
//     localStorage.setItem("allCategories", JSON.stringify(allCategories));
//   };

//  const handleQtyChange = (rowId, delta) => {
//   setCartItems((prev) => {
//     const next = prev
//       .map((it) => {
//         if (it.id !== rowId) return it;

//         const stockMax = Number.isFinite(it.stockLeft) ? it.stockLeft : Infinity;
//         const limitMax = getDynamicLimit(it.name);
//         const maxAllowed = Math.min(stockMax, limitMax);

//         const currentQty = Number(it.qty || 0);
//         const proposed = currentQty + delta;
//         const clamped = Math.max(0, Math.min(proposed, maxAllowed));

//         return { ...it, qty: clamped };
//       })
//       .filter((it) => it.qty > 0);

//     writeBackToStorage(next);
//     setGrandSummary(computeTotals(next));
//     return next;
//   });
// };

//   const computeTotals = (items) => ({
//     items: items.reduce((s, it) => s + Number(it.qty || 0), 0),
//     total: Math.round(items.reduce((s, it) => s + Number(it.price || 0) * Number(it.qty || 0), 0)),
//   });

//   const handleGroceryProceed = async (event) => {
//     event.preventDefault();
//     const allCategories = JSON.parse(localStorage.getItem("allCategories")) || [];
//     const payload = { 
//       id: "string",
//       martId: "string",
//       date: "string",
//       customerId: userId,
//       status: "Draft",
//       paymentMode: "",
//       utrTransactionNumber: "",
//       transactionNumber: "",
//       transactionStatus: "",
//       TransactionType: "",
//       paidAmount: "",
//       customerName: "",
//       address: "", 
//       state: "",
//       district: "",
//       zipCode: "",
//       customerPhoneNumber: "",
//       AssignedTo: "",
//       DeliveryPartnerUserId: "",
//       latitude: 0,
//       longitude: 0,
//       isPickUp: false,
//       isDelivered: false,
//       GrandTotal: (roundedGrandTotal).toString(),
//       TotalItemsSelected: (grandSummary.items).toString(),
//       categories: allCategories.map((cat) => {
//         const products = (cat.products || []).map((p) => {
//           const persisted = p.image ?? p.productImage ?? "";
//           const filename = getFilenameFromValue(persisted);
//           const safeImage = filename || (typeof persisted === "string" ? persisted : "");
//           return {
//             productName: (p.productName?.trim() || p.name?.trim() || ""),
//             noOfQuantity: String(p.qty),
//             productImage: safeImage, 
//             mrp: String(p.mrp || 0),
//             discount: String(p.discount || 0),
//             afterDiscountPrice: String(p.afterDiscountPrice || p.price || 0),
//             stockLeft: String(p.stockLeft - p.qty),
//             code: String(p.code),
//             units: String(p.units),
//           };
//         });
//         return {
//           categoryName: cat.categoryName,
//           numberOfItemsSelected: products.reduce((sum, p) => sum + Number(p.noOfQuantity), 0),
//           totalAmount: Math.round(
//             products.reduce((sum, p) => sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity), 0)
//           ),
//           products,
//         };
//       }),
//     };

//     try {
//       const response = await fetch(
//         `https://handymanapiv2.azurewebsites.net/api/Mart/UploadProductDetails`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         const extractedId = data.id;
//         if (extractedId) {
//           const currentCart = localStorage.getItem("allCategories") || "[]";
//           localStorage.setItem(`cartSnapshot_${extractedId}`, currentCart);
//           localStorage.setItem("activeOrderId", extractedId);
//           localStorage.setItem(`cartMeta_${extractedId}`,JSON.stringify({ items: grandSummary.items, total: roundedGrandTotal }));
//           navigate(`/groceryPaymentMethod/${userType}/${userId}/${extractedId}`);
//         }
//       } else {
//         const errorText = await response.text();
//         alert("Failed to upload order: " + errorText);
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       alert("An error occurred while uploading the order.");
//     }
//   };

//   const handleImageClick = (imageSrc) => {
//     setZoomImage(imageSrc); 
//     setShowZoomModal(true);
//   };

//   const handleRestore = (id) => {
//     clearTimeout(removalTimers.current[id]);
//     delete removalTimers.current[id];
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, qty: 1, removing: false } : item
//       )
//     );
//   };

//   const itemsTotal = Math.round(cartItems.reduce((s, it) => s + it.mrp   * it.qty, 0));
//   const grandTotal = Math.round(cartItems.reduce((s, it) => s + it.price * it.qty, 0));
//   const roundedItemsTotal = Math.round(itemsTotal);
//   const roundedGrandTotal = Math.round(grandTotal);

//   return (
//     <div
//       className="cart-container d-flex flex-column"
//       style={{
//         maxWidth: "600px",
//         margin: "5px",
//         padding: "5px",
//         borderRadius: "8px",
//         height: "100vh",
//       }}
//     >
//       {/* Header */}
//       <div className="cart-header d-flex justify-content-between">
//         <div className="d-flex align-items-center">
//           <img src={CartImg} alt="Cart" className="cart-icon" />
//           <h3 className="ms-1" style={{ fontSize: "18px" }}>
//             My Cart
//           </h3>
//         </div>
//         <IconButton>
//           <CloseIcon
//             onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
//             style={{
//               cursor: "pointer",
//               fontSize: "30px",
//               color: "tomato",
//             }}
//           />
//         </IconButton>
//       </div>
//       <Divider />

//       {/* Cart Items */}
//       <div
//         className="cart-items flex-grow-1"
//         style={{
//           overflowY: "auto",
//           padding: "8px",
//           marginTop: "48px",
//         }}
//       >
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="cart-item d-flex align-items-start justify-content-between mb-2"
//           >
//             {/* Product Image */}
//             <img
//               src={ (item.imageFilename && imageBlobMap[item.imageFilename]) ||
//                   (item.imageFilename && fileToUrl(item.imageFilename)) ||
//                   item.imageUrl || "/placeholder.png" }
//               alt={item.name}
//               onClick={() => handleImageClick(
//                 (item.imageFilename && imageBlobMap[item.imageFilename]) ||
//                 (item.imageFilename && fileToUrl(item.imageFilename)) ||
//                 item.imageUrl ||
//                 "/placeholder.png"
//               )}
//               style={{ height: 50, width: 30, cursor: "pointer", borderRadius: 6 }}
//               onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
//             />

//             {/* Product Details */}
//             <div style={{ flex: 1, marginLeft: "8px" }}>
//               <div style={{ fontWeight: "500", fontSize: "12px", marginRight: "5px"}}>{item.name}</div>
//               <div style={{ fontSize: "12px", color: "#666" }}>
//                 MRP: <s>₹{Math.round(item.mrp)}</s> &nbsp;
//                 <span style={{ color: "red" }}>{Math.round(item.discount)}% off</span>
//                 <span style={{ color: "dark", marginLeft: "5px" }}>{item.units}</span>
//               </div>
//               <div style={{ fontWeight: "600", fontSize: "12px" }}>₹{Math.round(item.price)}</div>
//             </div>

//             {/* Quantity Box */}
//             {item.removing ? (
//               <button 
//                 onClick={() => handleRestore(item.id)}
//                 style={{
//                   backgroundColor: "white",
//                   color: "green",
//                   border: "1px solid green",
//                   borderRadius: "6px",
//                   fontSize: "14px",
//                   padding: "8px",
//                 }} 
//               >
//                 Add
//               </button>
//             ) : (
//               <div
//                 className="qty-box d-flex align-items-center justify-content-between"
//                 style={{
//                   backgroundColor: "#2e7d32",
//                   borderRadius: "6px",
//                   color: "white",
//                   minWidth: "60px",
//                   height: "25px",
//                 }}
//               >
//                 <IconButton
//                   size="small"
//                   onClick={() => handleQtyChange(item.id, -1)}
//                   style={{ color: "white", padding: "2px" }}
//                 >
//                   <RemoveIcon fontSize="small" />
//                 </IconButton>
//                 <span style={{ fontWeight: "bold", fontSize: "12px" }}>{Math.min(item.qty, getDynamicLimit(item.name))}</span>
//                 <IconButton
//                   size="small"
//                   onClick={() => handleQtyChange(item.id, 1)}
//                   style={{ color: "white", padding: "2px", opacity: item.qty >= item.stockLeft ? 0.5 : 1 }}
//                   disabled={
//                     Math.min(item.qty, getDynamicLimit(item.name)) >=
//                     Math.min(item.stockLeft, getDynamicLimit(item.name))
//                   }
//                  title={Number.isFinite(item.stockLeft) && item.qty >= item.stockLeft ? "No more stock" : "Add one"}
//                 >
//                   <AddIcon fontSize="small" />
//                 </IconButton>
//               </div>   
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Bill Details */}
//       <div className="bill-details p-1">
//         <p className="fs-6 fw-bold">Bill details</p>
//         <div className="d-flex justify-content-between align-items-center">
//           <span>📋 Items total</span>
//           <span>
//             <s className="text-muted">₹{roundedItemsTotal}</s> ₹{roundedGrandTotal}
//           </span>
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <span>🚲 Delivery charge <InfoIcon fontSize="small" /></span>
//           <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
//             FREE
//           </span>
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <span>👜 Handling charge <InfoIcon fontSize="small" /></span>
//           <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
//             FREE
//           </span>
//         </div>
//         <hr className="my-2" />
//         <div className="d-flex justify-content-between align-items-center fw-bold">
//           <span>Grand total</span>
//           <span>₹{roundedGrandTotal}</span>
//         </div>
//       </div>
//       <Divider />
//         {roundedGrandTotal < MIN_ORDER_TOTAL && (
//           <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}>
//             Minimum order is ₹{MIN_ORDER_TOTAL} and above
//           </p>
//         )}

//        {/* Footer */}
//       <div
//         className="cart-footer d-flex justify-content-between align-items-center mt-2 px-3 py-2"
//         style={{
//           backgroundColor: "#008000",
//           color: "white",
//           borderRadius: "8px",
//           width: "100%",
//         }}
//       >
//         <div>
//           <span style={{ fontSize: "12px" }}>{grandSummary.items} items</span>
//           <div style={{ fontWeight: "500", fontSize: "15px" }}>₹{roundedGrandTotal}</div>
//         </div>
        
//         <div
//           style={{
//             fontWeight: "500",
//             fontSize: "15px",
//             cursor: roundedGrandTotal < MIN_ORDER_TOTAL ? "not-allowed" : "pointer",
//             opacity: roundedGrandTotal < MIN_ORDER_TOTAL ? 0.6 : 1
//           }}
//           onClick={roundedGrandTotal >= MIN_ORDER_TOTAL ? handleGroceryProceed : undefined}
//         >
//           {roundedGrandTotal < MIN_ORDER_TOTAL ? "Add More Items" : "Proceed →"}
//         </div>
//       </div>

//       <div className="text-start"> 
//         <button
//           className="btn btn-warning mt-1 mb-1"
//           onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
//         >
//           Back
//         </button>
//       </div>
//       <Footer />

//       {/* Zoom Modal */}
//       <Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
//         <button
//           className="close-button text-end mt-0"
//           onClick={() => setShowZoomModal(false)}
//         >
//           &times;
//         </button>
//         <Modal.Body className="text-center">
//           <div className="zoom-container">
//             <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default GroceryCartPage;
