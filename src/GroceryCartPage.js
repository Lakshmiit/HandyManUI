import React, { useEffect, useState, useRef, useCallback } from "react";
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
// import { appConfig } from "./config";
// import { useLocation } from "react-router-dom";
 
const HANDYMAN_CATEGORIES = ["electrical products", "plumbing products"];

const GroceryCartPage = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { userId } = useParams();
  const { userType } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [grandSummary, setGrandSummary] = useState({ items: 0, total: 0 });
  const [imageBlobMap, setImageBlobMap] = useState({});
  const [limitMap, setLimitMap] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [fullName, setFullName] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);
  const isGuestName = (name) => (name ?? "").trim().toLowerCase() === "guest";
  // const [walletAmount, setWalletAmount] = useState(0);
// const MIN_ORDER_TOTAL = Number(walletAmount) === 50 ? 150 : 100;  
   const [comboInfo, setComboInfo] = useState(null);
const [comboImages, setComboImages] = useState({});
  useEffect(() => {
    console.log(addresses, fullName, isNewUser);
  }, [addresses, fullName, isNewUser]);

useEffect(() => {
  try {
    const raw = localStorage.getItem("comboSelectedItems");
    if (!raw) return;
    setComboInfo(JSON.parse(raw));
  } catch {}
}, []);

useEffect(() => {
  if (!comboInfo?.items?.length) return;
  let cancelled = false;
  (async () => {
    const map = {};
    await Promise.allSettled(
      comboInfo.items.map(async ({ productName, image }) => {
        if (!image) return;
        try {
          const res = await fetch(
            `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(image)}`
          );
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await res.json();
            if (data?.imageData) {
              map[productName] = `data:image/jpeg;base64,${data.imageData}`;
            }
          } else {
            map[productName] = res.url;
          }
        } catch {}
      })
    );
    if (!cancelled) setComboImages(map);
  })();
  return () => { cancelled = true; };
}, [comboInfo]);

  const fetchCustomerData = useCallback(async () => {
      try {
        const response = await fetch(
          `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Address/GetAddressById/${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customer profile data");
        }
        const data = await response.json();
        console.log(data);
        const addresses = Array.isArray(data) ? data : [data];
        const formattedAddresses = addresses.map((addr) => ({
          id: addr.addressId,
          type: addr.isPrimaryAddress ? "primary" : "secondary",
          address: addr.address, 
          state: addr.state,
          district: addr.district,
          zipCode: addr.zipCode,
          emailAddress: addr.emailAddress,
          mobileNumber: addr.mobileNumber,
          fullName: addr.fullName,
          walletAmount: addr.walletAmount,
        }));            
        setAddresses(formattedAddresses);
        const apiFullName = addresses[0]?.fullName ?? "";
          setFullName(apiFullName);
          // const wallet = addresses[0]?.walletAmount ?? 0;
          // setWalletAmount(Number(wallet));
        if (!apiFullName || isGuestName(apiFullName)) {
          setIsNewUser(true);
        } else {
          setIsNewUser(false);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }, [userId]);

useEffect(() => {
  if (userId) {
    fetchCustomerData();
  }
}, [userId, fetchCustomerData]);

  const IMAGE_DOWNLOAD =
    `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=`;

  // function toNum(v, f = 0) {
  //   const n = Number(v);
  //   return Number.isFinite(n) ? n : f;
  // }

  const getDynamicLimit = useCallback((productName) => {
    const key = String(productName || "")
      .trim()
      .toLowerCase();
    return limitMap[key] ?? Infinity;
  }, [limitMap]);

  useEffect(() => {
    if (!cartItems.length) return;
   const uniqueNames = Array.from(
    new Set(
      cartItems
        .filter(
          (x) =>
            !HANDYMAN_CATEGORIES.includes(
              String(x.category || "").trim().toLowerCase()
            )
        )
        .map((x) => x.name)
        .filter(Boolean)
    ));
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.allSettled(
          uniqueNames.map(async (name) => {
            const res = await fetch(
              `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
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

  const getDynamicLimitRef = (name) => {
    const key = String(name || "")
      .trim()
      .toLowerCase();
    return limitMapRef.current[key] ?? Infinity;
  };
  
  function getFilenameFromValue(value) {
    if (!value) return "";
    const v = String(value);
    const i = v.indexOf("generatedfilename=");
    if (i >= 0)
      return decodeURIComponent(v.slice(i + "generatedfilename=".length));
    if (/^https?:\/\//i.test(v)) return "";
    return v.trim();
  }

 const fileToUrl = useCallback((filenameOrUrl) => {
  if (!filenameOrUrl) return "";
  if (/^https?:\/\//i.test(String(filenameOrUrl))) {
    return filenameOrUrl;
  }
  return IMAGE_DOWNLOAD + encodeURIComponent(filenameOrUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const buildCartFromStorage = React.useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");
    const items = saved.flatMap((cat) =>
      (cat.products || [])
        .filter((p) => Number(p.qty) > 0)
        .map((p, idx) => {
          const persisted = p.image ?? p.productImage ?? "";
          const imageFilename = getFilenameFromValue(persisted);
          const imageUrl = imageFilename
            ? fileToUrl(imageFilename)
            : typeof persisted === "string"
              ? persisted
              : "";
          const rawQty = Number(p.qty);
          const limit = getDynamicLimitRef(p.productName ?? p.name ?? "");
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
        }),
    );
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const res = await fetch(fileToUrl(fn));
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
              return { fn, url: `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(fn)}` };
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
  }, [cartItems, imageBlobMap, fileToUrl]);

  const writeBackToStorage = useCallback((items) => {
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
      }),
    );
    localStorage.setItem("allCategories", JSON.stringify(allCategories));
  },[]);

const handleQtyChange = async (rowId, delta) => {
  const item = cartItems.find((i) => i.id === rowId);
  if (!item) return;

  const latestStock = await fetchLatestStock(item.name, item.category);

  setCartItems((prev) => {
    const updated = prev.map((it) => {
      if (it.id !== rowId) return it;
      const limitMax = getDynamicLimit(it.name);
      const maxAllowed = Math.min(latestStock, limitMax);
      const proposedQty = Number(it.qty || 0) + delta;
      if (latestStock <= 0) {
        return {
          ...it,
          stockLeft: 0,
          outOfStock: true,
          qty: 0,
        };
      }
      if (proposedQty <= 0) {
        return null; 
      }
      return {
        ...it,
        stockLeft: latestStock,
        outOfStock: false,
        qty: Math.min(proposedQty, maxAllowed),
      };
    }).filter(Boolean);
    writeBackToStorage(updated);
    setGrandSummary(computeTotals(updated));
    return updated;
  });
};

  const computeTotals = (items) => ({
    items: items.reduce((s, it) => s + Number(it.qty || 0), 0),
    total: Math.round(
      items.reduce(
        (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
        0,
      ),
    ),
  });

const fetchLatestStockForHandyman = useCallback(async (productName) => {
  try {
    const res = await fetch(
      `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Product/GetProductsByProductName?productName=${encodeURIComponent(productName)}`
    );
    if (!res.ok) return Infinity;
    const data = await res.json();
    const normalizedInput = normalizeName(productName);
    const exactMatch = (Array.isArray(data) ? data : []).filter(
      (x) => normalizeName(x.productName) === normalizedInput
    );
    const latest = exactMatch.sort(
      (a, b) => Date.parse(b?.date || 0) - Date.parse(a?.date || 0)
    )[0];
    if (!latest) return Infinity;
    return Number(latest?.numberOfStockAvailable || 0);
  } catch (err) {
    console.error("Handyman stock fetch error:", err);
    return Infinity;
  }
}, []);

  const fetchLatestStock = useCallback(async (productName, category = "") => {
   const isHandymanCategory = HANDYMAN_CATEGORIES.includes(
    String(category || "").trim().toLowerCase()
  );

  if (isHandymanCategory) {
    return fetchLatestStockForHandyman(productName);
  }
    try {
    const res = await fetch(
      `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(productName)}`
    );
    if (!res.ok) return Infinity;
    const data = await res.json();
    const normalizedInput = normalizeName(productName);
    const exactMatch = (Array.isArray(data) ? data : []).filter(
      (x) => normalizeName(x.name) === normalizedInput
    );
    const latest = exactMatch.sort(
      (a, b) => Date.parse(b?.date || 0) - Date.parse(a?.date || 0)
    )[0];
    if (!latest) return Infinity;
    return Number(latest?.stockLeft || 0);
  } catch (err) {
    console.error(err);
    return Infinity;
  }
},[fetchLatestStockForHandyman]);

const normalizeName = (name) =>
  String(name || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const refreshAllCartStocks = useCallback(async () => {
  const saved =
    JSON.parse(localStorage.getItem("allCategories")) || [];

  const currentItems = saved.flatMap((cat) =>
    (cat.products || []).map((p, idx) => ({
      id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
      productId: p.productId ?? p.id ?? idx,
      name: p.productName ?? p.name ?? "",
      category: cat.categoryName,
      qty: Number(p.qty || 0),
      mrp: Number(p.mrp || 0),
      discount: Number(p.discount || 0),
      price: Number(p.afterDiscountPrice || p.price || 0),
      stockLeft: Number(p.stockLeft || 0),
      code: p.code,
      units: p.units,
      imageFilename: getFilenameFromValue(p.image ?? p.productImage ?? ""),
      imageUrl: fileToUrl(p.image ?? p.productImage ?? ""),
    }))
  );

  if (!currentItems.length) return;

  const stockResults = await Promise.all(
    currentItems.map(async (item) => ({
      name: item.name,
       category: item.category,
      stockLeft: await fetchLatestStock(item.name, item.category),
    }))
  );

  const updated = currentItems
    .map((item) => {
      const latest = stockResults.find(
        (x) => normalizeName(x.name) === normalizeName(item.name)
      );

      if (!latest) return item;

      const limit = getDynamicLimit(item.name);

      if (latest.stockLeft <= 0) {
        return {
          ...item,
          stockLeft: 0,
          outOfStock: true,
          qty: 0,
        };
      }

      return {
        ...item,
        stockLeft: latest.stockLeft,
        qty: limit === Infinity
    ? Math.min(item.qty, latest.stockLeft)
    : Math.min(item.qty, latest.stockLeft, limit),
      };
    })
    .filter(Boolean);

  setCartItems(updated);
  writeBackToStorage(updated);
  setGrandSummary(computeTotals(updated));
}, [fetchLatestStock, getDynamicLimit, writeBackToStorage, fileToUrl]);

useEffect(() => {
  refreshAllCartStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  const handleFocus = () => {
    refreshAllCartStocks();
  };
const handleOnline = () => {
    refreshAllCartStocks();
  };
  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      refreshAllCartStocks();
    }
  };
  window.addEventListener("focus", handleFocus);
  window.addEventListener("online", handleOnline);
  document.addEventListener("visibilitychange", handleVisibility);
  return () => {
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("online", handleOnline);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, [refreshAllCartStocks]);

const validateCartStockBeforeCheckout = async () => {
  const checks = await Promise.all(
    cartItems.map(async (item) => ({
      name: item.name,
      requestedQty: item.qty,
      stockLeft: await fetchLatestStock(item.name, item.category),
    }))
  );

  const invalidItems = checks.filter(
    (x) => x.stockLeft <= 0 || x.requestedQty > x.stockLeft
  );

  if (invalidItems.length > 0) {
    setCartItems((prev) => {
      const updated = prev
      .map((item) => {
        const latest = checks.find(
          (x) => normalizeName(x.name) === normalizeName(item.name)
        );

        if (!latest) return item;

        if (latest.stockLeft <= 0) {
          return {
            ...item,
            stockLeft: 0,
            outOfStock: true,
            qty: 0,
          };
        }

        return {
          ...item,
          stockLeft: latest.stockLeft,
          outOfStock: false,
          qty: Math.min(item.qty, latest.stockLeft),
        };
      })
      .filter(Boolean);
      writeBackToStorage(updated);
      setGrandSummary(computeTotals(updated));
      return updated;
    });
     const itemNames = invalidItems.map((item) => item.name).join(", ");
    alert(`${itemNames} items are out of stock.`);
  return false;
  }
  return true;
};

const removeEntireCombo = () => {
  localStorage.removeItem("comboSelectedItems");
  setComboInfo(null);
  setComboImages({});
};

  // const handleGroceryProceed = async (event) => {
  //   event.preventDefault();
  //  const valid = await validateCartStockBeforeCheckout();
  //   if (!valid) return;

  //   const allCategories =
  //     JSON.parse(localStorage.getItem("allCategories")) || [];

  //   const payload = {
  //     id: "string",
  //     martId: "string",
  //     date: "string",
  //     customerId: userId,
  //     status: "Draft",
  //     paymentMode: "",
  //     utrTransactionNumber: "",
  //     transactionNumber: "",
  //     transactionStatus: "",
  //     TransactionType: "",
  //     paidAmount: "",
  //     walletAmount: "walletValue",
  //     customerName: "",
  //     address: "",
  //     state: "",
  //     district: "",
  //     zipCode: "",
  //     customerPhoneNumber: "",
  //     AssignedTo: "",
  //     DeliveryPartnerUserId: "",
  //     latitude: 0,     
  //     longitude: 0,
  //     isPickUp: false,
  //     isDelivered: false,
  //     DeliveryAssignedTime: "",
  //     DeliverySubmitTime: "",
  //     GrandTotal: roundedGrandTotal.toString(),
  //     TotalItemsSelected: grandSummary.items.toString(),
  //     categories: allCategories.map((cat) => {
  //       const products = (cat.products || []).map((p) => {
  //         const persisted = p.image ?? p.productImage ?? "";
  //         const filename = getFilenameFromValue(persisted);
  //         const safeImage =
  //           filename || (typeof persisted === "string" ? persisted : "");
  //         return {
  //           productName: p.productName?.trim() || p.name?.trim() || "",
  //           noOfQuantity: String(p.qty),
  //           productImage: safeImage,
  //           mrp: String(p.mrp || 0),
  //           discount: String(p.discount || 0),
  //           afterDiscountPrice: String(p.afterDiscountPrice || p.price || 0),
  //           stockLeft: String(p.stockLeft - p.qty),
  //           code: String(p.code),
  //           units: String(p.units),
  //         };
  //       });     
  //       return {
  //         categoryName: cat.categoryName,
  //         numberOfItemsSelected: products.reduce(
  //           (sum, p) => sum + Number(p.noOfQuantity),
  //           0,
  //         ),
  //         totalAmount: Math.round(
  //           products.reduce(
  //             (sum, p) =>
  //               sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity),
  //             0,
  //           ),
  //         ),
  //         products,
  //       };
  //     }),
  //   };

  //   try {
  //     const response = await fetch(
  //       `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Mart/UploadProductDetails`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       },
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       const extractedId = data.id;
  //       if (extractedId) {
  //         const currentCart = localStorage.getItem("allCategories") || "[]";
  //         localStorage.setItem(`cartSnapshot_${extractedId}`, currentCart);
  //         localStorage.setItem("activeOrderId", extractedId);
  //         localStorage.setItem(
  //           `cartMeta_${extractedId}`,
  //           JSON.stringify({
  //             items: grandSummary.items,
  //             total: roundedGrandTotal,
  //           }),
  //         );
  //         navigate(
  //           `/groceryPaymentMethod/${userType}/${userId}/${extractedId}`,
  //         );
  //       }
  //     } else {
  //       const errorText = await response.text();
  //       alert("Failed to upload order: " + errorText);
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     alert("An error occurred while uploading the order.");
  //   }
  // };
const activeItems = cartItems.filter(
    (item) => !item.outOfStock && item.stockLeft > 0 && item.qty > 0
  );

  const handleGroceryProceed = async (event) => {
  event.preventDefault();
  const hasCombo =
  comboInfo?.items?.length > 0;

if (activeItems.length === 0 && !hasCombo) {
  alert("Your cart is empty");
  return;
}
  await createWelcomeWalletIfEligible();
  const valid = await validateCartStockBeforeCheckout();
  if (!valid) return;

  const allCategories = JSON.parse(localStorage.getItem("allCategories")) || [];

  const comboRaw = localStorage.getItem("comboSelectedItems");
  let comboCategory = null;

  if (comboRaw) {
    try {
      const comboData = JSON.parse(comboRaw);
      if (comboData?.items?.length > 0) {
         const comboStocks = await Promise.all(
        comboData.items.map(async (item) => ({
          productName: item.productName,
          stockLeft: await fetchLatestStock(item.productName),
        }))
      );
       console.log("Combo live stocks:", comboStocks);
        comboCategory = {
          categoryName: comboData.comboProductName || "Combo Selections",
          numberOfItemsSelected: comboData.items.length,
          totalAmount: 0,  
          products: comboData.items.map((item) => {
            const stockEntry = comboStocks.find(
            (s) => normalizeName(s.productName) === normalizeName(item.productName)
          );
          const liveStock = stockEntry?.stockLeft ?? 0;
           console.log(`Combo product: ${item.productName} | liveStock: ${liveStock} | stockLeft in payload: ${Math.max(0, liveStock - 1)}`);
          return {
            productName: item.productName?.trim() || "",
            noOfQuantity: "1",
            productImage: item.image || "",
            mrp: "0",
            discount: "0",
            afterDiscountPrice: "0",
            stockLeft: String(Math.max(0, liveStock - 1)),
            code: "",
            units: item.category || "", 
          };  
          }),
        };
      }
    } catch {}
  }

  const finalCategories = comboCategory
    ? [...allCategories.map((cat) => {
        const products = (cat.products || []).map((p) => {
          const persisted = p.image ?? p.productImage ?? "";
          const filename = getFilenameFromValue(persisted);
          const safeImage = filename || (typeof persisted === "string" ? persisted : "");
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
          numberOfItemsSelected: products.reduce((sum, p) => sum + Number(p.noOfQuantity), 0),
          totalAmount: Math.round(
            products.reduce((sum, p) => sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity), 0)
          ),
          products,
        };
      }), comboCategory]
    : allCategories.map((cat) => {
        const products = (cat.products || []).map((p) => {
          const persisted = p.image ?? p.productImage ?? "";
          const filename = getFilenameFromValue(persisted);
          const safeImage = filename || (typeof persisted === "string" ? persisted : "");
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
          numberOfItemsSelected: products.reduce((sum, p) => sum + Number(p.noOfQuantity), 0),
          totalAmount: Math.round(
            products.reduce((sum, p) => sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity), 0)
          ),
          products,
        };
      });

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
    walletAmount: "walletValue",
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
    TotalWalletAmount:"",
    RemainingAmount:"",
    AvailedAmount:"",
    DeliveryAssignedTime: "",
    DeliverySubmitTime: "",
    GrandTotal: roundedGrandTotal.toString(),
    TotalItemsSelected: totalItemCount.toString(),
    categories: finalCategories,  
    // Location: '', 
  };
      
  try {
    const response = await fetch(
      `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Mart/UploadProductDetails`,
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
          JSON.stringify({ items: grandSummary.items, total: roundedGrandTotal }),
        );

        localStorage.removeItem("comboSelectedItems");

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

const createWelcomeWalletIfEligible = async () => {
  try {
    const primaryAddress = addresses.find((addr) => addr.type === "primary");
    const mobileNumber = primaryAddress?.mobileNumber;
    if (!mobileNumber) return;

    // Step 1: Verify Guest User
    const guestResponse = await fetch(
      `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Customer/GuestUserExistingVerification/${mobileNumber}`
    );
    if (!guestResponse.ok) return;
    const guestData = await guestResponse.json();
    if (!Array.isArray(guestData) || guestData.length === 0) return;

    const customer = guestData[0];
    const isGuest = customer?.firstName?.trim().toLowerCase() === "guest"; 

    // Step 2: Check if wallet transaction already exists
    const offerResponse = await fetch(
      `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/OffersTransactions/GetOfferTransactionByUserId?userId=${userId}`
    );

    if (offerResponse.ok) {
      const offerData = await offerResponse.json();

      if (Array.isArray(offerData) && offerData.length > 0) {
        console.log("Welcome wallet already exists — skipping POST.");
        return;
      }
    }

    const walletValue = isGuest ? "50" : "0";

    const payload3 = {
      id: "string",
      UserId: userId,
      CreatedDate: new Date().toISOString(),
      UpdatedDate: new Date().toISOString(),
      TicketId: "",
      TotalWalletAmount: walletValue,
      AvailedAmount: "0",
      RemainingAmount: walletValue,
    };

    const createResponse = await fetch(
      "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/OffersTransactions/UploadOffersTransactionsDetails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload3),
      }
    );

    if (createResponse.ok) {
      console.log(`₹${walletValue} Wallet Created Successfully`);
    } else {
      console.error("Failed to create welcome wallet:", await createResponse.text());
    }

  } catch (error) {
    console.error("createWelcomeWalletIfEligible error:", error);
  }
};

  const outOfStockCount = cartItems.filter(
    (item) => item.outOfStock || item.stockLeft <= 0
  ).length;

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
    setShowZoomModal(true);
  };

  // const handleRestore = (id) => {
  //   clearTimeout(removalTimers.current[id]);
  //   delete removalTimers.current[id];
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, qty: 1, removing: false } : item,
  //     ),
  //   );
  // };

  const itemsTotal = Math.round(
    cartItems.reduce((s, it) => s + it.mrp * it.qty, 0),
  );
  const grandTotal = Math.round(
    cartItems.reduce((s, it) => s + it.price * it.qty, 0),
  );
  const roundedItemsTotal = Math.round(itemsTotal);
  const roundedGrandTotal = Math.round(grandTotal);
 const deliveryCharge = roundedGrandTotal >= 150 ? 0 : 15;
  const handlingCharge = roundedGrandTotal >= 150 ? 0 : 5;
  const extraCharges = deliveryCharge + handlingCharge;
  const finalGrandTotal = roundedGrandTotal + extraCharges;
  const FREE_DELIVERY_LIMIT = 150;
  const amountNeeded = Math.max( 0,
  FREE_DELIVERY_LIMIT - roundedGrandTotal
);

const comboCount = comboInfo?.items?.length || 0;

const totalItemCount =
  grandSummary.items + comboCount;

  useEffect(() => {
  console.log("cartItems:", cartItems);
  console.log(
    "allCategories:",
    JSON.parse(localStorage.getItem("allCategories") || "[]")
  );
}, [cartItems]);

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
          minHeight: "250px"
        }}
      >
        {outOfStockCount > 0 && (
          <div
            style={{
              background: "#fff3cd",
              color: "#856404",
              padding: "8px",
              borderRadius: "6px",
              marginBottom: "10px",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {outOfStockCount} item(s) are currently unavailable.
          </div>
        )}
        {cartItems.map((item) => {
        const isOutOfStock = item.outOfStock || item.stockLeft <= 0;

        return (
          <div
            key={item.id}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "12px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #eee",
              backgroundColor: isOutOfStock ? "#f5f5f5" : "#fff",
            }}
          >
            {/* faded content */}
            <div
              style={{
                display: "flex",
                flex: 1,
                opacity: isOutOfStock ? 0.45 : 1,
              }}
            >
              {/* Product Image */}
              <img
              src={
                item.isCombo
                  ? item.imageUrl
                  : (
                      (item.imageFilename &&
                        imageBlobMap[item.imageFilename]) ||
                      (item.imageFilename &&
                        fileToUrl(item.imageFilename)) ||
                      item.imageUrl ||
                      "/placeholder.png"
                    )
              }
                // src={
                //   (item.imageFilename && imageBlobMap[item.imageFilename]) ||
                //   (item.imageFilename && fileToUrl(item.imageFilename)) ||
                //   item.imageUrl ||
                //   "/placeholder.png"
                // }
                alt={item.name}
                onClick={() =>
                  handleImageClick(
                    (item.imageFilename && imageBlobMap[item.imageFilename]) ||
                      (item.imageFilename && fileToUrl(item.imageFilename)) ||
                      item.imageUrl ||
                      "/placeholder.png"
                  )
                }
                style={{
                  height: 50,
                  width: 30,
                  borderRadius: 6,
                  cursor: "pointer",
                  // filter: isOutOfStock
                  //   ? "grayscale(100%)"
                  //   : "none",
                }}
              />

              {/* Product Details */}
              <div
                style={{
                  flex: 1,
                  marginLeft: "10px",
                  paddingRight: "70px",
                }}
              >
                <div
                  style={{
                    fontWeight: "500",
                    fontSize: "12px",
                    textDecoration: isOutOfStock
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    textDecoration: isOutOfStock
                      ? "line-through"
                      : "none",
                  }}
                >
                  MRP: <s>₹{Math.round(item.mrp)}</s>
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    {Math.round(item.discount)}% off
                  </span>
                  <span style={{ marginLeft: "5px" }}>
                    {item.units}
                  </span>
                </div>

                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    textDecoration: isOutOfStock
                      ? "line-through"
                      : "none",
                  }}
                >
                  ₹{Math.round(item.price)}
                </div>
              </div>
            </div>

            {/* Right Side */}
            {isOutOfStock ? (
                  <button
                onClick={() => {
                  const updated = cartItems.filter(
                    (x) => x.id !== item.id
                  );
                  setCartItems(updated);
                  writeBackToStorage(updated);
                  setGrandSummary(computeTotals(updated));
                }}
                style={{
                  border: "1px solid #d32f2f",
                  color: "#d32f2f",
                  background: "white",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  fontSize: "11px",
                  fontWeight: "600",
                  zIndex: 3,
                }}
              >
                Remove
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
                  {item.qty}
                </span>

                <IconButton
                  size="small"
                  onClick={() => handleQtyChange(item.id, 1)}
                  style={{ color: "white", padding: "2px" }}
                  disabled={item.qty >= item.stockLeft}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            )}

            {/* Out Of Stock Text */}
            {isOutOfStock && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "12px",
                  transform: "translateX(-50%)",
                  color: "#d32f2f",
                  fontSize: "13px",
                  fontWeight: "700",
                  zIndex: 4,
                  background: "transparent",
                }}
              >
                Out of Stock
              </div>
            )}
          </div>
        );
      })}
      </div>

      {/* Combo selected items panel */}
{comboInfo?.items?.length > 0 && (
  <div style={{ borderTop: "1px solid #eee" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: "600",
          margin: 0,
        }}
      >
        📦 {comboInfo.comboProductName}
      </p>

      <button
        onClick={removeEntireCombo}
        style={{
          background: "#2e7d32",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "4px",
          fontSize: "11px",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        Remove Combo
      </button>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {comboInfo.items.map(({ category, productName }) => (
        <div
          key={category}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "4px", minWidth: "72px", maxWidth: "88px",
          }}
        >
          <div
            style={{
              width: 56, height: 56, borderRadius: 8, overflow: "hidden",
              background: "#f3f4f6", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            {comboImages[productName] ? (
              <img
                src={comboImages[productName]}
                alt={productName}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              <span style={{ fontSize: 22 }}>🛒</span>
            )}
          </div>
          <span
            style={{
              fontSize: "10px", fontWeight: "500", textAlign: "center",
              color: "#374151", lineHeight: 1.3,
              display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}
          >
            {productName}
          </span>
          <span
            style={{
              fontSize: "9px", color: "#6b7280",
              background: "#f0fdf4", borderRadius: 4,
              padding: "1px 5px", fontWeight: 500,
            }}
          >
            {category}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

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
          <span
            className={deliveryCharge === 0 ? "text-danger fw-bold" : "fw-bold"}
            style={{ fontSize: "10px" }}
          >
            {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            👜 Handling charge <InfoIcon fontSize="small" />
          </span>
          <span
            className={handlingCharge === 0 ? "text-danger fw-bold" : "fw-bold"}
            style={{ fontSize: "10px" }}
          >
            {handlingCharge === 0 ? "FREE" : `₹${handlingCharge}`}
          </span>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between align-items-center fw-bold">
          <span>Grand total</span>
          <span>₹{finalGrandTotal}</span>
        </div>
      </div>
      <Divider />
      {roundedGrandTotal > 0 && roundedGrandTotal < FREE_DELIVERY_LIMIT && (
        <div
          style={{
            backgroundColor: "#FFF3CD",
            color: "#D10000",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            fontSize: "13px",
            fontWeight: "600",
            textAlign: "center",
            border: "1px solid #FFE69C"
          }}
        >
              🎉 Add ₹{amountNeeded} more to unlock save <strong style={{fontSize: "15px"}}>₹20</strong> FREE DELIVERY & Handling Charges
        </div>
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
          <span style={{ fontSize: "12px" }}>{totalItemCount} items</span>
          <div style={{ fontWeight: "500", fontSize: "15px" }}>
            ₹{finalGrandTotal}
          </div>
        </div>

        <div
          style={{
            fontWeight: "500",
            fontSize: "15px",
            cursor: activeItems.length === 0 ? "not-allowed" : "pointer", 
            opacity: activeItems.length === 0 ? 0.5 : 1,
          }}
          onClick={
            activeItems.length > 0
              ? handleGroceryProceed
              : undefined
          }
        >
          Proceed →
        </div>
      </div>

      <div className="text-start">
        <button
          className="btn btn-warning mt-1 mb-1"
          onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
        >
          Add More Items
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

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { Divider, IconButton } from "@mui/material";
// import { Modal } from "react-bootstrap";
// import {
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material";
// import "./App.css";
// import CartImg from "./img/Cart.jpeg";
// import { useNavigate, useParams } from "react-router-dom";
// import Footer from "./Footer.js";
// // import { appConfig } from "./config";
// // import { useLocation } from "react-router-dom";
 
// const GroceryCartPage = () => {
//   const navigate = useNavigate();
//   // const location = useLocation();
//   const { userId } = useParams();
//   const { userType } = useParams();
//   const [cartItems, setCartItems] = useState([]);
//   const [showZoomModal, setShowZoomModal] = useState(false);
//   const [zoomImage, setZoomImage] = useState("");
//   const [grandSummary, setGrandSummary] = useState({ items: 0, total: 0 });
//   const [imageBlobMap, setImageBlobMap] = useState({});
//   const [limitMap, setLimitMap] = useState({});
//   const [addresses, setAddresses] = useState([]);
//   const [fullName, setFullName] = useState("");
//   const [isNewUser, setIsNewUser] = useState(true);
//   const isGuestName = (name) => (name ?? "").trim().toLowerCase() === "guest";
//   const [walletAmount, setWalletAmount] = useState(0);
// const MIN_ORDER_TOTAL = Number(walletAmount) === 50 ? 150 : 100;
//    const [comboInfo, setComboInfo] = useState(null);
// const [comboImages, setComboImages] = useState({});
//   useEffect(() => {
//     console.log(addresses, fullName, isNewUser);
//   }, [addresses, fullName, isNewUser]);

// console.log("Wallet:", walletAmount);

// useEffect(() => {
//   try {
//     const raw = localStorage.getItem("comboSelectedItems");
//     if (!raw) return;
//     setComboInfo(JSON.parse(raw));
//   } catch {}
// }, []);

// useEffect(() => {
//   if (!comboInfo?.items?.length) return;
//   let cancelled = false;
//   (async () => {
//     const map = {};
//     await Promise.allSettled(
//       comboInfo.items.map(async ({ productName, image }) => {
//         if (!image) return;
//         try {
//           const res = await fetch(
//             `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(image)}`
//           );
//           const contentType = res.headers.get("content-type") || "";
//           if (contentType.includes("application/json")) {
//             const data = await res.json();
//             if (data?.imageData) {
//               map[productName] = `data:image/jpeg;base64,${data.imageData}`;
//             }
//           } else {
//             map[productName] = res.url;
//           }
//         } catch {}
//       })
//     );
//     if (!cancelled) setComboImages(map);
//   })();
//   return () => { cancelled = true; };
// }, [comboInfo]);

//   const fetchCustomerData = useCallback(async () => {
//       try {
//         const response = await fetch(
//           `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Address/GetAddressById/${userId}`,
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch customer profile data");
//         }
//         const data = await response.json();
//         console.log(data);
//         const addresses = Array.isArray(data) ? data : [data];
//         const formattedAddresses = addresses.map((addr) => ({
//           id: addr.addressId,
//           type: addr.isPrimaryAddress ? "primary" : "secondary",
//           address: addr.address, 
//           state: addr.state,
//           district: addr.district,
//           zipCode: addr.zipCode,
//           emailAddress: addr.emailAddress,
//           mobileNumber: addr.mobileNumber,
//           fullName: addr.fullName,
//           walletAmount: addr.walletAmount,
//         }));            
//         setAddresses(formattedAddresses);
//         const apiFullName = addresses[0]?.fullName ?? "";
//           setFullName(apiFullName);
//           const wallet = addresses[0]?.walletAmount ?? 0;
//           setWalletAmount(Number(wallet));
//         if (!apiFullName || isGuestName(apiFullName)) {
//           setIsNewUser(true);
//         } else {
//           setIsNewUser(false);
//         }
//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//       }
//     }, [userId]);

// useEffect(() => {
//   if (userId) {
//     fetchCustomerData();
//   }
// }, [userId, fetchCustomerData]);

//   const IMAGE_DOWNLOAD =
//     `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=`;

//   // function toNum(v, f = 0) {
//   //   const n = Number(v);
//   //   return Number.isFinite(n) ? n : f;
//   // }

//   const getDynamicLimit = useCallback((productName) => {
//     const key = String(productName || "")
//       .trim()
//       .toLowerCase();
//     return limitMap[key] ?? Infinity;
//   }, [limitMap]);

//   useEffect(() => {
//     if (!cartItems.length) return;
//     const uniqueNames = Array.from(
//       new Set(cartItems.map((x) => x.name).filter(Boolean)),
//     );
//     let cancelled = false;
//     (async () => {
//       try {
//         const results = await Promise.allSettled(
//           uniqueNames.map(async (name) => {
//             const res = await fetch(
//               `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
//                 name,
//               )}`,
//             );

//             const data = await res.json();
//             const arr = Array.isArray(data) ? data : [];
//             const best = arr
//               .slice()
//               .sort(
//                 (a, b) => Date.parse(b?.date || 0) - Date.parse(a?.date || 0),
//               )[0];

//             const limitValue = Number(best?.limit);
//             return {
//               name,
//               limit:
//                 Number.isFinite(limitValue) && limitValue > 0
//                   ? limitValue
//                   : Infinity,
//             };
//           }),
//         );
//         if (cancelled) return;
//         const newMap = {};
//         results.forEach((r) => {
//           if (r.status === "fulfilled") {
//             const k = String(r.value.name || "")
//               .trim()
//               .toLowerCase();
//             newMap[k] = r.value.limit;
//           }
//         });
//         setLimitMap((prev) => ({ ...prev, ...newMap }));
//       } catch (e) {
//         console.warn("Limit fetch failed", e);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [cartItems]);

//   const limitMapRef = useRef({});
//   useEffect(() => {
//     limitMapRef.current = limitMap;
//   }, [limitMap]);

//   const getDynamicLimitRef = (name) => {
//     const key = String(name || "")
//       .trim()
//       .toLowerCase();
//     return limitMapRef.current[key] ?? Infinity;
//   };

//   function getFilenameFromValue(value) {
//     if (!value) return "";
//     const v = String(value);
//     const i = v.indexOf("generatedfilename=");
//     if (i >= 0)
//       return decodeURIComponent(v.slice(i + "generatedfilename=".length));
//     if (/^https?:\/\//i.test(v)) return "";
//     return v.trim();
//   }

//  const fileToUrl = useCallback((filenameOrUrl) => {
//   if (!filenameOrUrl) return "";
//   if (/^https?:\/\//i.test(String(filenameOrUrl))) {
//     return filenameOrUrl;
//   }
//   return IMAGE_DOWNLOAD + encodeURIComponent(filenameOrUrl);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

//   const buildCartFromStorage = React.useCallback(() => {
//     const saved = JSON.parse(localStorage.getItem("allCategories") || "[]");
//     const items = saved.flatMap((cat) =>
//       (cat.products || [])
//         .filter((p) => Number(p.qty) > 0)
//         .map((p, idx) => {
//           const persisted = p.image ?? p.productImage ?? "";
//           const imageFilename = getFilenameFromValue(persisted);
//           const imageUrl = imageFilename
//             ? fileToUrl(imageFilename)
//             : typeof persisted === "string"
//               ? persisted
//               : "";
//           const rawQty = Number(p.qty);
//           const limit = getDynamicLimitRef(p.productName ?? p.name ?? "");
//           const stock = Number(p.stockLeft || Infinity);
//           return {
//             id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
//             productId: p.productId ?? p.id ?? idx,
//             name: p.productName ?? p.name ?? "",
//             category: cat.categoryName,
//             qty: Math.min(rawQty, limit, stock),
//             mrp: Number(p.mrp || 0),
//             discount: Number(p.discount || 0),
//             price: Number(p.afterDiscountPrice || p.price || 0),
//             stockLeft: Number(p.stockLeft || 0),
//             code: p.code,
//             units: p.units,
//             imageFilename,
//             imageUrl,
//           };
//         }),
//     );
//     return items;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const items = buildCartFromStorage();
//     setCartItems(items);
//     setGrandSummary({
//       items: items.reduce((s, it) => s + it.qty, 0),
//       total: Math.round(items.reduce((s, it) => s + it.price * it.qty, 0)),
//     });
//   }, [buildCartFromStorage]);

//   useEffect(() => {
//     const filenames = Array.from(
//       new Set(
//         cartItems
//           .map((i) => i.imageFilename)
//           .filter(Boolean)
//           .filter((fn) => !(fn in imageBlobMap)),
//       ),
//     );
//     if (!filenames.length) return;

//     let cancelled = false;
//     (async () => {
//       try {
//         const results = await Promise.allSettled(
//           filenames.map(async (fn) => {
//             const res = await fetch(fileToUrl(fn));
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
//               return { fn, url: `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(fn)}` };
//             }
//           }),
//         );
//         if (cancelled) return;
//         const mapUpdate = {};
//         results.forEach((r) => {
//           if (r.status === "fulfilled" && r.value?.fn && r.value?.url) {
//             mapUpdate[r.value.fn] = r.value.url;
//           }
//         });
//         if (Object.keys(mapUpdate).length) {
//           setImageBlobMap((prev) => ({ ...prev, ...mapUpdate }));
//         }
//       } catch (e) {
//         console.error("prefetch images failed", e);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [cartItems, imageBlobMap, fileToUrl]);

//   const writeBackToStorage = useCallback((items) => {
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
//         image:
//           it.imageFilename ||
//           getFilenameFromValue(it.imageUrl) ||
//           it.imageUrl ||
//           null,
//       });
//       return acc;
//     }, {});
//     const allCategories = Object.entries(grouped).map(
//       ([categoryName, products]) => ({
//         categoryName,
//         products: products.filter((p) => Number(p.qty) > 0),
//       }),
//     );
//     localStorage.setItem("allCategories", JSON.stringify(allCategories));
//   },[]);

// const handleQtyChange = async (rowId, delta) => {
//   const item = cartItems.find((i) => i.id === rowId);
//   if (!item) return;

//   const latestStock = await fetchLatestStock(item.name);

//   setCartItems((prev) => {
//     const updated = prev.map((it) => {
//       if (it.id !== rowId) return it;
//       const limitMax = getDynamicLimit(it.name);
//       const maxAllowed = Math.min(latestStock, limitMax);
//       const proposedQty = Number(it.qty || 0) + delta;
//       if (latestStock <= 0) {
//         return {
//           ...it,
//           stockLeft: 0,
//           outOfStock: true,
//           qty: 0,
//         };
//       }
//       if (proposedQty <= 0) {
//         return null; 
//       }
//       return {
//         ...it,
//         stockLeft: latestStock,
//         outOfStock: false,
//         qty: Math.min(proposedQty, maxAllowed),
//       };
//     }).filter(Boolean);
//     writeBackToStorage(updated);
//     setGrandSummary(computeTotals(updated));
//     return updated;
//   });
// };

//   const computeTotals = (items) => ({
//     items: items.reduce((s, it) => s + Number(it.qty || 0), 0),
//     total: Math.round(
//       items.reduce(
//         (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
//         0,
//       ),
//     ),
//   });

//   const fetchLatestStock = useCallback(async (productName) => {
//   try {
//     const res = await fetch(
//       `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(productName)}`
//     );
//     const data = await res.json();
//     const normalizedInput = normalizeName(productName);
//     const exactMatch = (Array.isArray(data) ? data : []).filter(
//       (x) => normalizeName(x.name) === normalizedInput
//     );
//     const latest = exactMatch.sort(
//       (a, b) => Date.parse(b?.date || 0) - Date.parse(a?.date || 0)
//     )[0];
//     return Number(latest?.stockLeft || 0);
//   } catch (err) {
//     console.error(err);
//     return 0;
//   }
// },[]);

// const normalizeName = (name) =>
//   String(name || "")
//     .replace(/\s+/g, " ")
//     .trim()
//     .toLowerCase();

// const refreshAllCartStocks = useCallback(async () => {
//   const saved =
//     JSON.parse(localStorage.getItem("allCategories")) || [];

//   const currentItems = saved.flatMap((cat) =>
//     (cat.products || []).map((p, idx) => ({
//       id: `${cat.categoryName}-${p.productId ?? p.id ?? idx}`,
//       productId: p.productId ?? p.id ?? idx,
//       name: p.productName ?? p.name ?? "",
//       category: cat.categoryName,
//       qty: Number(p.qty || 0),
//       mrp: Number(p.mrp || 0),
//       discount: Number(p.discount || 0),
//       price: Number(p.afterDiscountPrice || p.price || 0),
//       stockLeft: Number(p.stockLeft || 0),
//       code: p.code,
//       units: p.units,
//       imageFilename: getFilenameFromValue(p.image ?? p.productImage ?? ""),
//       imageUrl: fileToUrl(p.image ?? p.productImage ?? ""),
//     }))
//   );

//   if (!currentItems.length) return;

//   const stockResults = await Promise.all(
//     currentItems.map(async (item) => ({
//       name: item.name,
//       stockLeft: await fetchLatestStock(item.name),
//     }))
//   );

//   const updated = currentItems
//     .map((item) => {
//       const latest = stockResults.find(
//         (x) => normalizeName(x.name) === normalizeName(item.name)
//       );

//       if (!latest) return item;

//       const limit = getDynamicLimit(item.name);

//       if (latest.stockLeft <= 0) {
//         return {
//           ...item,
//           stockLeft: 0,
//           outOfStock: true,
//           qty: 0,
//         };
//       }

//       return {
//         ...item,
//         stockLeft: latest.stockLeft,
//         qty: Math.min(item.qty, latest.stockLeft, limit),
//       };
//     })
//     .filter(Boolean);

//   setCartItems(updated);
//   writeBackToStorage(updated);
//   setGrandSummary(computeTotals(updated));
// }, [fetchLatestStock, getDynamicLimit, writeBackToStorage, fileToUrl]);

// useEffect(() => {
//   refreshAllCartStocks();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// useEffect(() => {
//   const handleFocus = () => {
//     refreshAllCartStocks();
//   };
// const handleOnline = () => {
//     refreshAllCartStocks();
//   };
//   const handleVisibility = () => {
//     if (document.visibilityState === "visible") {
//       refreshAllCartStocks();
//     }
//   };
//   window.addEventListener("focus", handleFocus);
//   window.addEventListener("online", handleOnline);
//   document.addEventListener("visibilitychange", handleVisibility);
//   return () => {
//     window.removeEventListener("focus", handleFocus);
//     window.removeEventListener("online", handleOnline);
//     document.removeEventListener("visibilitychange", handleVisibility);
//   };
// }, [refreshAllCartStocks]);

// const validateCartStockBeforeCheckout = async () => {
//   const checks = await Promise.all(
//     cartItems.map(async (item) => ({
//       name: item.name,
//       requestedQty: item.qty,
//       stockLeft: await fetchLatestStock(item.name),
//     }))
//   );

//   const invalidItems = checks.filter(
//     (x) => x.stockLeft <= 0 || x.requestedQty > x.stockLeft
//   );

//   if (invalidItems.length > 0) {
//     setCartItems((prev) => {
//       const updated = prev
//       .map((item) => {
//         const latest = checks.find(
//           (x) => normalizeName(x.name) === normalizeName(item.name)
//         );

//         if (!latest) return item;

//         if (latest.stockLeft <= 0) {
//           return {
//             ...item,
//             stockLeft: 0,
//             outOfStock: true,
//             qty: 0,
//           };
//         }

//         return {
//           ...item,
//           stockLeft: latest.stockLeft,
//           outOfStock: false,
//           qty: Math.min(item.qty, latest.stockLeft),
//         };
//       })
//       .filter(Boolean);
//       writeBackToStorage(updated);
//       setGrandSummary(computeTotals(updated));
//       return updated;
//     });
//      const itemNames = invalidItems.map((item) => item.name).join(", ");
//     alert(`${itemNames} items are out of stock.`);
//   return false;
//   }
//   return true;
// };

// const removeEntireCombo = () => {
//   localStorage.removeItem("comboSelectedItems");
//   setComboInfo(null);
//   setComboImages({});
// };

//   // const handleGroceryProceed = async (event) => {
//   //   event.preventDefault();
//   //  const valid = await validateCartStockBeforeCheckout();
//   //   if (!valid) return;

//   //   const allCategories =
//   //     JSON.parse(localStorage.getItem("allCategories")) || [];

//   //   const payload = {
//   //     id: "string",
//   //     martId: "string",
//   //     date: "string",
//   //     customerId: userId,
//   //     status: "Draft",
//   //     paymentMode: "",
//   //     utrTransactionNumber: "",
//   //     transactionNumber: "",
//   //     transactionStatus: "",
//   //     TransactionType: "",
//   //     paidAmount: "",
//   //     walletAmount: "walletValue",
//   //     customerName: "",
//   //     address: "",
//   //     state: "",
//   //     district: "",
//   //     zipCode: "",
//   //     customerPhoneNumber: "",
//   //     AssignedTo: "",
//   //     DeliveryPartnerUserId: "",
//   //     latitude: 0,     
//   //     longitude: 0,
//   //     isPickUp: false,
//   //     isDelivered: false,
//   //     DeliveryAssignedTime: "",
//   //     DeliverySubmitTime: "",
//   //     GrandTotal: roundedGrandTotal.toString(),
//   //     TotalItemsSelected: grandSummary.items.toString(),
//   //     categories: allCategories.map((cat) => {
//   //       const products = (cat.products || []).map((p) => {
//   //         const persisted = p.image ?? p.productImage ?? "";
//   //         const filename = getFilenameFromValue(persisted);
//   //         const safeImage =
//   //           filename || (typeof persisted === "string" ? persisted : "");
//   //         return {
//   //           productName: p.productName?.trim() || p.name?.trim() || "",
//   //           noOfQuantity: String(p.qty),
//   //           productImage: safeImage,
//   //           mrp: String(p.mrp || 0),
//   //           discount: String(p.discount || 0),
//   //           afterDiscountPrice: String(p.afterDiscountPrice || p.price || 0),
//   //           stockLeft: String(p.stockLeft - p.qty),
//   //           code: String(p.code),
//   //           units: String(p.units),
//   //         };
//   //       });
//   //       return {
//   //         categoryName: cat.categoryName,
//   //         numberOfItemsSelected: products.reduce(
//   //           (sum, p) => sum + Number(p.noOfQuantity),
//   //           0,
//   //         ),
//   //         totalAmount: Math.round(
//   //           products.reduce(
//   //             (sum, p) =>
//   //               sum + Number(p.afterDiscountPrice) * Number(p.noOfQuantity),
//   //             0,
//   //           ),
//   //         ),
//   //         products,
//   //       };
//   //     }),
//   //   };

//   //   try {
//   //     const response = await fetch(
//   //       `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Mart/UploadProductDetails`,
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(payload),
//   //       },
//   //     );
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       const extractedId = data.id;
//   //       if (extractedId) {
//   //         const currentCart = localStorage.getItem("allCategories") || "[]";
//   //         localStorage.setItem(`cartSnapshot_${extractedId}`, currentCart);
//   //         localStorage.setItem("activeOrderId", extractedId);
//   //         localStorage.setItem(
//   //           `cartMeta_${extractedId}`,
//   //           JSON.stringify({
//   //             items: grandSummary.items,
//   //             total: roundedGrandTotal,
//   //           }),
//   //         );
//   //         navigate(
//   //           `/groceryPaymentMethod/${userType}/${userId}/${extractedId}`,
//   //         );
//   //       }
//   //     } else {
//   //       const errorText = await response.text();
//   //       alert("Failed to upload order: " + errorText);
//   //     }
//   //   } catch (error) {
//   //     console.error("API Error:", error);
//   //     alert("An error occurred while uploading the order.");
//   //   }
//   // };

//   const activeItems = cartItems.filter(
//     (item) => !item.outOfStock && item.stockLeft > 0 && item.qty > 0
//   );

//   const handleGroceryProceed = async (event) => {
//   event.preventDefault();
//    const hasCombo =
//   comboInfo?.items?.length > 0;

// if (activeItems.length === 0 && !hasCombo) {
//   alert("Your cart is empty");
//   return;
// }
//   const valid = await validateCartStockBeforeCheckout();
//   if (!valid) return;

//   const allCategories = JSON.parse(localStorage.getItem("allCategories")) || [];

//   const comboRaw = localStorage.getItem("comboSelectedItems");
//   let comboCategory = null;

//   if (comboRaw) {
//     try {
//       const comboData = JSON.parse(comboRaw);
//       if (comboData?.items?.length > 0) {
//         comboCategory = {
//           categoryName: comboData.comboProductName || "Combo Selections",
//           numberOfItemsSelected: comboData.items.length,
//           totalAmount: 0,  
//           products: comboData.items.map((item) => ({
//             productName: item.productName?.trim() || "",
//             noOfQuantity: "1",
//             productImage: item.image || "",
//             mrp: "0",
//             discount: "0",
//             afterDiscountPrice: "0",
//             stockLeft: "0",
//             code: "",
//             units: item.category || "",   
//           })),
//         };
//       }
//     } catch {}
//   }

//   const finalCategories = comboCategory
//     ? [...allCategories.map((cat) => {
//         const products = (cat.products || []).map((p) => {
//           const persisted = p.image ?? p.productImage ?? "";
//           const filename = getFilenameFromValue(persisted);
//           const safeImage = filename || (typeof persisted === "string" ? persisted : "");
//           return {
//             productName: p.productName?.trim() || p.name?.trim() || "",
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
//       }), comboCategory]
//     : allCategories.map((cat) => {
//         const products = (cat.products || []).map((p) => {
//           const persisted = p.image ?? p.productImage ?? "";
//           const filename = getFilenameFromValue(persisted);
//           const safeImage = filename || (typeof persisted === "string" ? persisted : "");
//           return {
//             productName: p.productName?.trim() || p.name?.trim() || "",
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
//       });

//   const payload = {
//     id: "string",
//     martId: "string",
//     date: "string",
//     customerId: userId,
//     status: "Draft",
//     paymentMode: "",
//     utrTransactionNumber: "",
//     transactionNumber: "",
//     transactionStatus: "",
//     TransactionType: "",
//     paidAmount: "",
//     walletAmount: "walletValue",
//     customerName: "",
//     address: "",
//     state: "",
//     district: "",
//     zipCode: "",
//     customerPhoneNumber: "",
//     AssignedTo: "",
//     DeliveryPartnerUserId: "",
//     latitude: 0,
//     longitude: 0,
//     isPickUp: false,
//     isDelivered: false,
//     DeliveryAssignedTime: "",
//     DeliverySubmitTime: "",
//     GrandTotal: roundedGrandTotal.toString(),
//     TotalItemsSelected: totalItemCount.toString(),
//     categories: finalCategories,   
//   };

//   try {
//     const response = await fetch(
//       `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Mart/UploadProductDetails`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       },
//     );
//     if (response.ok) {
//       const data = await response.json(); 
//       const extractedId = data.id;
//       if (extractedId) {
//         const currentCart = localStorage.getItem("allCategories") || "[]";
//         localStorage.setItem(`cartSnapshot_${extractedId}`, currentCart);
//         localStorage.setItem("activeOrderId", extractedId);
//         localStorage.setItem(
//           `cartMeta_${extractedId}`,
//           JSON.stringify({ items: grandSummary.items, total: roundedGrandTotal }),
//         );

//         localStorage.removeItem("comboSelectedItems");

//         navigate(`/groceryPaymentMethod/${userType}/${userId}/${extractedId}`);
//       }
//     } else {
//       const errorText = await response.text();
//       alert("Failed to upload order: " + errorText);
//     }
//   } catch (error) {
//     console.error("API Error:", error);
//     alert("An error occurred while uploading the order.");
//   }
// };

//   const outOfStockCount = cartItems.filter(
//     (item) => item.outOfStock || item.stockLeft <= 0
//   ).length;

//   const handleImageClick = (imageSrc) => {
//     setZoomImage(imageSrc);
//     setShowZoomModal(true);
//   };

//   // const handleRestore = (id) => {
//   //   clearTimeout(removalTimers.current[id]);
//   //   delete removalTimers.current[id];
//   //   setCartItems((prev) =>
//   //     prev.map((item) =>
//   //       item.id === id ? { ...item, qty: 1, removing: false } : item,
//   //     ),
//   //   );
//   // };

//   const itemsTotal = Math.round(
//     cartItems.reduce((s, it) => s + it.mrp * it.qty, 0),
//   );
//   const grandTotal = Math.round(
//     cartItems.reduce((s, it) => s + it.price * it.qty, 0),
//   );
//   const roundedItemsTotal = Math.round(itemsTotal);
//   const roundedGrandTotal = Math.round(grandTotal);
// const comboCount = comboInfo?.items?.length || 0;

// const totalItemCount =
//   grandSummary.items + comboCount;

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
//           minHeight: "250px"
//         }}
//       >
//         {outOfStockCount > 0 && (
//           <div
//             style={{
//               background: "#fff3cd",
//               color: "#856404",
//               padding: "8px",
//               borderRadius: "6px",
//               marginBottom: "10px",
//               fontSize: "12px",
//               fontWeight: "500",
//             }}
//           >
//             {outOfStockCount} item(s) are currently unavailable.
//           </div>
//         )}
//         {cartItems.map((item) => {
//         const isOutOfStock = item.outOfStock || item.stockLeft <= 0;

//         return (
//           <div
//             key={item.id}
//             style={{
//               position: "relative",
//               display: "flex",
//               alignItems: "flex-start",
//               justifyContent: "space-between",
//               marginBottom: "12px",
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #eee",
//               backgroundColor: isOutOfStock ? "#f5f5f5" : "#fff",
//             }}
//           >
//             {/* faded content */}
//             <div
//               style={{
//                 display: "flex",
//                 flex: 1,
//                 opacity: isOutOfStock ? 0.45 : 1,
//               }}
//             >
//               {/* Product Image */}
//               <img
//               src={
//                   item.isCombo
//                     ? item.imageUrl
//                     : (
//                         (item.imageFilename &&
//                           imageBlobMap[item.imageFilename]) ||
//                         (item.imageFilename &&
//                           fileToUrl(item.imageFilename)) ||
//                         item.imageUrl ||
//                         "/placeholder.png"
//                       )
//                 }
//                 // src={
//                 //   (item.imageFilename && imageBlobMap[item.imageFilename]) ||
//                 //   (item.imageFilename && fileToUrl(item.imageFilename)) ||
//                 //   item.imageUrl ||
//                 //   "/placeholder.png"
//                 // }
//                 alt={item.name}
//                 onClick={() =>
//                   handleImageClick(
//                     (item.imageFilename && imageBlobMap[item.imageFilename]) ||
//                       (item.imageFilename && fileToUrl(item.imageFilename)) ||
//                       item.imageUrl ||
//                       "/placeholder.png"
//                   )
//                 }
//                 style={{
//                   height: 50,
//                   width: 30,
//                   borderRadius: 6,
//                   cursor: "pointer",
//                   // filter: isOutOfStock
//                   //   ? "grayscale(100%)"
//                   //   : "none",
//                 }}
//               />

//               {/* Product Details */}
//               <div
//                 style={{
//                   flex: 1,
//                   marginLeft: "10px",
//                   paddingRight: "70px",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontWeight: "500",
//                     fontSize: "12px",
//                     textDecoration: isOutOfStock
//                       ? "line-through"
//                       : "none",
//                   }}
//                 >
//                   {item.name}
//                 </div>

//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: "#666",
//                     textDecoration: isOutOfStock
//                       ? "line-through"
//                       : "none",
//                   }}
//                 >
//                   MRP: <s>₹{Math.round(item.mrp)}</s>
//                   <span style={{ color: "red", marginLeft: "5px" }}>
//                     {Math.round(item.discount)}% off
//                   </span>
//                   <span style={{ marginLeft: "5px" }}>
//                     {item.units}
//                   </span>
//                 </div>

//                 <div
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "12px",
//                     textDecoration: isOutOfStock
//                       ? "line-through"
//                       : "none",
//                   }}
//                 >
//                   ₹{Math.round(item.price)}
//                 </div>
//               </div>
//             </div>

//             {/* Right Side */}
//             {isOutOfStock ? (
//               <button
//                 onClick={() => {
//                   const updated = cartItems.filter(
//                     (x) => x.id !== item.id
//                   );
//                   setCartItems(updated);
//                   writeBackToStorage(updated);
//                   setGrandSummary(computeTotals(updated));
//                 }}
//                 style={{
//                   border: "1px solid #d32f2f",
//                   color: "#d32f2f",
//                   background: "white",
//                   borderRadius: "6px",
//                   padding: "6px 10px",
//                   fontSize: "11px",
//                   fontWeight: "600",
//                   zIndex: 3,
//                 }}
//               >
//                 Remove
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

//                 <span style={{ fontWeight: "bold", fontSize: "12px" }}>
//                   {item.qty}
//                 </span>

//                 <IconButton
//                   size="small"
//                   onClick={() => handleQtyChange(item.id, 1)}
//                   style={{ color: "white", padding: "2px" }}
//                   disabled={item.qty >= item.stockLeft}
//                 >
//                   <AddIcon fontSize="small" />
//                 </IconButton>
//               </div>
//             )}

//             {/* Out Of Stock Text */}
//             {isOutOfStock && (
//               <div
//                 style={{
//                   position: "absolute",
//                   left: "50%",
//                   bottom: "12px",
//                   transform: "translateX(-50%)",
//                   color: "#d32f2f",
//                   fontSize: "13px",
//                   fontWeight: "700",
//                   zIndex: 4,
//                   background: "transparent",
//                 }}
//               >
//                 Out of Stock
//               </div>
//             )}
//           </div>
//         );
//       })}
//       </div>

//       {/* Combo selected items panel */}
// {comboInfo?.items?.length > 0 && (
//   <div style={{ padding: "8px", borderTop: "1px solid #eee" }}>
//       <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "8px",
//       }}
//     >
//       <p
//         style={{
//           fontSize: "12px",
//           fontWeight: "600",
//           margin: 0,
//         }}
//       >
//         📦 {comboInfo.comboProductName}
//       </p>

//       <button
//         onClick={removeEntireCombo}
//         style={{
//           background: "#2e7d32",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           padding: "4px",
//           fontSize: "11px",
//           fontWeight: "700",
//           cursor: "pointer",
//         }}
//       >
//         Remove Combo
//       </button>
//     </div>
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//       {comboInfo.items.map(({ category, productName }) => (
//         <div
//           key={category}
//           style={{
//             display: "flex", flexDirection: "column", alignItems: "center",
//             gap: "4px", minWidth: "72px", maxWidth: "88px",
//           }}
//         >
//           <div
//             style={{
//               width: 56, height: 56, borderRadius: 8, overflow: "hidden",
//               background: "#f3f4f6", display: "flex",
//               alignItems: "center", justifyContent: "center",
//             }}
//           >
//             {comboImages[productName] ? (
//               <img
//                 src={comboImages[productName]}
//                 alt={productName}
//                 style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
//               />
//             ) : (
//               <span style={{ fontSize: 22 }}>🛒</span>
//             )}
//           </div>
//           <span
//             style={{
//               fontSize: "10px", fontWeight: "500", textAlign: "center",
//               color: "#374151", lineHeight: 1.3,
//               display: "-webkit-box", WebkitLineClamp: 3,
//               WebkitBoxOrient: "vertical", overflow: "hidden",
//             }}
//           >
//             {productName}
//           </span>
//           <span
//             style={{
//               fontSize: "9px", color: "#6b7280",
//               background: "#f0fdf4", borderRadius: 4,
//               padding: "1px 5px", fontWeight: 500,
//             }}
//           >
//             {category}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// )}

//       {/* Bill Details */}
//       <div className="bill-details p-1">
//         <p className="fs-6 fw-bold">Bill details</p>
//         <div className="d-flex justify-content-between align-items-center">
//           <span>📋 Items total</span>
//           <span>
//             <s className="text-muted">₹{roundedItemsTotal}</s> ₹
//             {roundedGrandTotal}
//           </span>
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <span>
//             🚲 Delivery charge <InfoIcon fontSize="small" />
//           </span>
//           <span className="text-danger fw-bold" style={{ fontSize: "10px" }}>
//             FREE
//           </span>
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <span>
//             👜 Handling charge <InfoIcon fontSize="small" />
//           </span>
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
//       {roundedGrandTotal < MIN_ORDER_TOTAL && (
//         <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}>
//           Minimum order is ₹{MIN_ORDER_TOTAL} and above
//         </p>
//       )}

//       {/* Footer */}
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
//           <span style={{ fontSize: "12px" }}>{totalItemCount} items</span>
//           <div style={{ fontWeight: "500", fontSize: "15px" }}>
//             ₹{roundedGrandTotal}
//           </div>
//         </div>

//         <div
//           style={{
//             fontWeight: "500",
//             fontSize: "15px",
//             cursor:
//               roundedGrandTotal < MIN_ORDER_TOTAL ? "not-allowed" : "pointer",
//             opacity: roundedGrandTotal < MIN_ORDER_TOTAL ? 0.6 : 1,
//           }}
//           onClick={
//             roundedGrandTotal >= MIN_ORDER_TOTAL
//               ? handleGroceryProceed
//               : undefined
//           }
//         >
//           {roundedGrandTotal < MIN_ORDER_TOTAL ? "Add More Items" : "Proceed →"}
//         </div>
//       </div>

//       <div className="text-start">
//         <button
//           className="btn btn-warning mt-1 mb-1"
//           onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
//         >
//           Add More Items
//         </button>
//       </div>
//       <Footer />

//       {/* Zoom Modal */}
//       <Modal
//         show={showZoomModal}
//         onHide={() => setShowZoomModal(false)}
//         centered
//       >
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