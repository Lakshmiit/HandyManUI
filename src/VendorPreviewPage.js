// // // import React, { useEffect, useMemo, useRef, useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // // import StorefrontIcon from "@mui/icons-material/Storefront";
// // // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // // import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// // // import { playNotificationSound } from "./notificationSound";
// // // import { getGroceryItems } from "./utils/groceryStore";
// // // import {
// // //   getVendorProductsByVendorId,
// // //   invalidateVendorProductsCache,
// // // } from "./utils/vendorListStore";

// // // const VENDOR_UPLOAD_PRODUCTS_API =
// // //   "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts";
// // // // Updates an EXISTING vendor record by id. The backend replaces the whole
// // // // record with whatever we send, so the caller (handleSubmitFinal below) is
// // // // responsible for merging newly-picked products into the vendor's
// // // // already-submitted categories/products first, and for carrying forward
// // // // status/createdDate/pincodes — never send just the new selection here, or
// // // // the previously approved/pending items and metadata on this record would
// // // // be wiped out.
// // // const VENDOR_UPDATE_PRODUCTS_API =
// // //   "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/VendorUploadProducts/UpdateVendorProductsValues";

// // // // Category display-order key: an array of category names, in the order
// // // // the vendor has arranged them via the up/down arrows on this page. Kept
// // // // separate from pendingCartKey so quantity/discount edits on the Stock
// // // // Update page (which rewrite that key wholesale) never clobber the
// // // // vendor's arrangement — this page reconciles the two on every load.
// // // const categoryOrderKey = (vendorId) => `vendorCategoryOrder_${vendorId}`;

// // // // Same key VendorStockUpdatePage writes to when a vendor checks a product
// // // // and sets its discount — this page reads that local "cart" back for a
// // // // final look before the real submission.
// // // const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// // // // Orders bell on this page polls the same endpoint VendorOrdersPage reads
// // // // from. NOTE: this is the QA host, not the "localhost:5250" base used
// // // // elsewhere in this file — see VendorOrdersPage.js for why.
// // // const ORDERS_API_BASE = "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";
// // // const GET_VENDOR_ORDERS = `${ORDERS_API_BASE}/Mart/GetVendorOrdersByVendorId`;
// // // const ORDERS_POLL_INTERVAL_MS = 25000;

// // // const VendorPreviewPage = () => {
// // //   const { vendorId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [vendor, setVendor] = useState(null);
// // //   const [catalogItems, setCatalogItems] = useState([]);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [message, setMessage] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [myProducts, setMyProducts] = useState(null);
// // //   const [myProductsLoading, setMyProductsLoading] = useState(true);

// // //   // Order count + "new order just came in" state for the header bell.
// // //   const [orderCount, setOrderCount] = useState(0);
// // //   const [hasNewOrder, setHasNewOrder] = useState(false);
// // //   const knownOrderIdsRef = useRef(null);

// // //   // Locally-saved candidate products (built on the Stock Update page) +
// // //   // which of them are still checked for this final submission.
// // //   const [pendingCart, setPendingCart] = useState(null);
// // //   const [finalSelected, setFinalSelected] = useState({});

// // //   // Vendor-arranged display order of pendingCart's categories — a list of
// // //   // category names, front-to-back. Persisted separately (see
// // //   // categoryOrderKey above) and reconciled against pendingCart's current
// // //   // categories every time either changes: known categories keep their
// // //   // arranged position, brand-new ones are appended at the end, and ones
// // //   // that dropped out of pendingCart (qty back to 0) are dropped here too.
// // //   const [categoryOrder, setCategoryOrder] = useState([]);

// // //   useEffect(() => {
// // //     const sessionId = localStorage.getItem("vendorSession");
// // //     const savedVendor = localStorage.getItem("vendorProfile");

// // //     // No session
// // //     if (!sessionId) {
// // //       navigate("/vendor/login");
// // //       return;
// // //     }

// // //     // Wrong vendor session
// // //     if (sessionId !== vendorId) {
// // //       navigate("/vendor/login");
// // //       return;
// // //     }

// // //     // No saved vendor profile
// // //     if (!savedVendor) {
// // //       navigate("/vendor/login");
// // //       return;
// // //     }

// // //     try {
// // //       const profile = JSON.parse(savedVendor);

// // //       // Make sure saved profile belongs to current vendor
// // //       if (profile.vendorId !== vendorId) {
// // //         navigate("/vendor/login");
// // //         return;
// // //       }

// // //       setVendor(profile);
// // //     } catch (error) {
// // //       console.error("Unable to read vendor profile:", error);
// // //       navigate("/vendor/login");
// // //     }
// // //   }, [vendorId, navigate]);

// // //   // Poll for orders so the header bell can show a live count and flag
// // //   // brand-new orders with a highlight + sound, even while the vendor is
// // //   // just sitting on their profile page.
// // //   useEffect(() => {
// // //     if (!vendor) return;
// // //     let cancelled = false;

// // //     const pollOrders = async () => {
// // //       try {
// // //         const { data } = await axios.get(GET_VENDOR_ORDERS, {
// // //           params: { vendorId },
// // //         });
// // //         if (cancelled) return;
// // //         const list = Array.isArray(data) ? data : [];
// // //         setOrderCount(list.length);

// // //         const ids = new Set(list.map((o) => o.id));
// // //         if (knownOrderIdsRef.current) {
// // //           const arrived = [...ids].some(
// // //             (id) => !knownOrderIdsRef.current.has(id),
// // //           );
// // //           if (arrived) {
// // //             setHasNewOrder(true);
// // //             try {
// // //               playNotificationSound();
// // //             } catch {
// // //               // audio playback blocked/unsupported — highlight still shows
// // //             }
// // //           }
// // //         }
// // //         knownOrderIdsRef.current = ids;
// // //       } catch (err) {
// // //         console.error("Failed to poll vendor orders:", err);
// // //       }
// // //     };

// // //     pollOrders();
// // //     const interval = setInterval(pollOrders, ORDERS_POLL_INTERVAL_MS);
// // //     return () => {
// // //       cancelled = true;
// // //       clearInterval(interval);
// // //     };
// // //   }, [vendor, vendorId]);

// // //   // Product names/images for display only — the actual selection + discount
// // //   // now happens on the Stock Update page, this is just a lookup table.
// // //   useEffect(() => {
// // //     if (!vendor) return;
// // //     let active = true;
// // //     getGroceryItems()
// // //       .then((data) => {
// // //         if (active) setCatalogItems(Array.isArray(data) ? data : []);
// // //       })
// // //       .catch((err) => console.error("Unable to load product catalog:", err));
// // //     return () => {
// // //       active = false;
// // //     };
// // //   }, [vendor]);

// // //   const productNameById = useMemo(() => {
// // //     const map = {};
// // //     catalogItems.forEach((item) => {
// // //       map[String(item.id)] = item.name;
// // //     });
// // //     return map;
// // //   }, [catalogItems]);

// // //   useEffect(() => {
// // //     if (!vendorId) return;
// // //     let active = true;
// // //     setMyProductsLoading(true);
// // //     // First load for this vendorId hits GetVendorProductsByVendorId,
// // //     // later loads within the cache window are served from vendorListStore.
// // //     getVendorProductsByVendorId(vendorId)
// // //       .then((vendorWithProducts) => {
// // //         if (active) setMyProducts(vendorWithProducts);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Unable to load vendor products:", err);
// // //         if (active) setMyProducts(null);
// // //       })
// // //       .finally(() => active && setMyProductsLoading(false));
// // //     return () => {
// // //       active = false;
// // //     };
// // //   }, [vendorId]);

// // //   // Load the local candidate cart saved from the Stock Update page, and
// // //   // default every product in it to "checked" for the final submission.
// // //   // This is re-run (not just mount-once) so that Excel-driven bulk updates
// // //   // made on the Stock Update page — in this tab or another one — are
// // //   // reflected here as soon as this page becomes active again, instead of
// // //   // being stuck showing whatever was in localStorage the first time this
// // //   // component happened to mount.
// // //   useEffect(() => {
// // //     if (!vendorId) return;

// // //     const loadPendingCart = () => {
// // //       try {
// // //         const raw = localStorage.getItem(pendingCartKey(vendorId));
// // //         if (!raw) {
// // //           setPendingCart(null);
// // //           setFinalSelected({});
// // //           return;
// // //         }
// // //         const parsed = JSON.parse(raw);
// // //         setPendingCart(parsed);
// // //         setFinalSelected((prev) => {
// // //           // Keep any existing checked/unchecked choices the vendor already
// // //           // made in this session; only default newly-appeared products
// // //           // (e.g. from a fresh Excel import) to checked.
// // //           const next = {};
// // //           (parsed.categorie || []).forEach((cat) => {
// // //             (cat.products || []).forEach((p) => {
// // //               const key = `${cat.categoryName}||${p.productIds}`;
// // //               next[key] = key in prev ? prev[key] : true;
// // //             });
// // //           });
// // //           return next;
// // //         });
// // //       } catch (err) {
// // //         console.error("Unable to read pending product selection:", err);
// // //         setPendingCart(null);
// // //         setFinalSelected({});
// // //       }
// // //     };

// // //     loadPendingCart();

// // //     // Same-tab: catches returning to this page (e.g. via bfcache/tab
// // //     // switch) after an Excel import elsewhere without a full remount.
// // //     // Cross-tab: catches the "storage" event fired when another tab
// // //     // (Stock Update open in a second tab) writes to this same key.
// // //     const handleVisibility = () => {
// // //       if (document.visibilityState === "visible") loadPendingCart();
// // //     };
// // //     const handleStorage = (event) => {
// // //       if (!event.key || event.key === pendingCartKey(vendorId)) {
// // //         loadPendingCart();
// // //       }
// // //     };
// // //     window.addEventListener("focus", loadPendingCart);
// // //     document.addEventListener("visibilitychange", handleVisibility);
// // //     window.addEventListener("storage", handleStorage);
// // //     return () => {
// // //       window.removeEventListener("focus", loadPendingCart);
// // //       document.removeEventListener("visibilitychange", handleVisibility);
// // //       window.removeEventListener("storage", handleStorage);
// // //     };
// // //   }, [vendorId]);

// // //   // Reconcile the vendor's arranged category order against pendingCart's
// // //   // current set of categories, and seed it from localStorage / current
// // //   // category order on first load.
// // //   useEffect(() => {
// // //     if (!vendorId) return;
// // //     const currentNames = (pendingCart?.categorie || []).map(
// // //       (cat) => cat.categoryName,
// // //     );
// // //     setCategoryOrder((prev) => {
// // //       let base = prev;
// // //       if (!prev.length) {
// // //         try {
// // //           const raw = localStorage.getItem(categoryOrderKey(vendorId));
// // //           if (raw) base = JSON.parse(raw);
// // //         } catch {
// // //           // ignore malformed saved order
// // //         }
// // //       }
// // //       const known = base.filter((name) => currentNames.includes(name));
// // //       const appended = currentNames.filter((name) => !known.includes(name));
// // //       const next = [...known, ...appended];
// // //       if (
// // //         next.length === prev.length &&
// // //         next.every((name, idx) => name === prev[idx])
// // //       ) {
// // //         return prev;
// // //       }
// // //       return next;
// // //     });
// // //   }, [vendorId, pendingCart]);

// // //   const persistCategoryOrder = (order) => {
// // //     try {
// // //       localStorage.setItem(categoryOrderKey(vendorId), JSON.stringify(order));
// // //     } catch {
// // //       // storage full/unavailable — arrangement still works for this session
// // //     }
// // //   };

// // //   // Move a category up (-1) or down (+1) in the vendor's display order.
// // //   const moveCategory = (index, direction) => {
// // //     setCategoryOrder((prev) => {
// // //       const targetIndex = index + direction;
// // //       if (targetIndex < 0 || targetIndex >= prev.length) return prev;
// // //       const next = [...prev];
// // //       [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
// // //       persistCategoryOrder(next);
// // //       return next;
// // //     });
// // //   };

// // //   // pendingCart.categorie re-sorted to match the vendor's arranged order,
// // //   // with each category's 1-based position attached as "rank" — this is
// // //   // what's rendered below and what gets sent on final submission.
// // //   const orderedPendingCategories = useMemo(() => {
// // //     const cats = pendingCart?.categorie || [];
// // //     const byName = new Map(cats.map((cat) => [cat.categoryName, cat]));
// // //     const ordered = categoryOrder
// // //       .map((name) => byName.get(name))
// // //       .filter(Boolean);
// // //     cats.forEach((cat) => {
// // //       if (!categoryOrder.includes(cat.categoryName)) ordered.push(cat);
// // //     });
// // //     return ordered.map((cat, idx) => ({ ...cat, rank: String(idx + 1) }));
// // //   }, [pendingCart, categoryOrder]);

// // //   const pendingProductCount = useMemo(
// // //     () =>
// // //       (pendingCart?.categorie || []).reduce(
// // //         (sum, cat) => sum + (cat.products?.length || 0),
// // //         0,
// // //       ),
// // //     [pendingCart],
// // //   );
// // //   const finalSelectedCount = useMemo(
// // //     () => Object.values(finalSelected).filter(Boolean).length,
// // //     [finalSelected],
// // //   );

// // //   const toggleFinalSelected = (categoryName, productId) => {
// // //     const key = `${categoryName}||${productId}`;
// // //     setFinalSelected((prev) => ({ ...prev, [key]: !prev[key] }));
// // //   };

// // //   if (!vendor) return null;

// // //   const handleBackToProfile = () => {
// // //     // Sent here from the customer ProfilePage (which stashes where to
// // //     // return to). Falls back to the app root if that's missing.
// // //     const returnTo = localStorage.getItem("vendorReturnProfile");
// // //     navigate(returnTo || "/");
// // //   };

// // //   // Merges newly-selected {categoryName, products:[{productIds, quantity,
// // //   // discount}]} entries into the vendor's already-submitted categories
// // //   // (myProducts, normalized shape: {category, products:[{productId, qty,
// // //   // discount}]}). Existing categories/products are preserved; a product
// // //   // already in a category gets its quantity/discount updated in place, a
// // //   // new product is appended to that category's product list, and a
// // //   // brand-new category is appended as a whole new entry. Returns the
// // //   // merged list already in the PascalCase shape UpdateVendorProductsValues
// // //   // expects.
// // //   const mergeIntoExistingCategorie = (existingVendor, newCategorie) => {
// // //     // existingCats: categoryName -> Map(productId -> {quantity, discount})
// // //     const existingCats = new Map();
// // //     const order = [];
// // //     (existingVendor?.categories || []).forEach((cat) => {
// // //       const productMap = new Map();
// // //       (cat.products || []).forEach((p) => {
// // //         productMap.set(String(p.productId), {
// // //           quantity: String(p.qty ?? 0),
// // //           discount: String(p.discount ?? 0),
// // //           limit: String(p.limit ?? 0),
// // //         });
// // //       });
// // //       existingCats.set(cat.category, productMap);
// // //       order.push(cat.category);
// // //     });

// // //     newCategorie.forEach((cat) => {
// // //       let productMap = existingCats.get(cat.categoryName);
// // //       if (!productMap) {
// // //         productMap = new Map();
// // //         existingCats.set(cat.categoryName, productMap);
// // //         order.push(cat.categoryName);
// // //       }
// // //       (cat.products || []).forEach((p) => {
// // //         // Upsert: overwrites quantity/discount if this product was already
// // //         // on the record, adds it if it wasn't — everything else in the
// // //         // category (and every other category) is left untouched.
// // //         productMap.set(String(p.productIds), {
// // //           quantity: String(p.quantity),
// // //           discount: String(p.discount),
// // //           limit: String(p.limit),
// // //         });
// // //       });
// // //     });

// // //     // Categories the vendor has explicitly arranged (via the up/down
// // //     // arrows above) take that order; anything left over — a category on
// // //     // the server record the vendor hasn't touched this round — keeps its
// // //     // original relative position, appended after the arranged ones.
// // //     const rankOf = (name) => {
// // //       const idx = categoryOrder.indexOf(name);
// // //       return idx === -1 ? Infinity : idx;
// // //     };
// // //     const finalOrder = [...order].sort((a, b) => {
// // //       const diff = rankOf(a) - rankOf(b);
// // //       if (diff !== 0) return diff;
// // //       return order.indexOf(a) - order.indexOf(b);
// // //     });

// // //     return finalOrder.map((categoryName, idx) => ({
// // //       CategoryName: categoryName,
// // //       Rank: String(idx + 1),
// // //       Products: Array.from(existingCats.get(categoryName).entries()).map(
// // //         ([productId, v]) => ({
// // //           ProductIds: productId,
// // //           Quantity: v.quantity,
// // //           Discount: v.discount,
// // //           limit: v.limit,
// // //         }),
// // //       ),
// // //     }));
// // //   };

// // //   const handleSubmitFinal = async () => {
// // //     if (!pendingCart) return;
// // //     const categorie = orderedPendingCategories
// // //       .map((cat) => ({
// // //         categoryName: cat.categoryName,
// // //         rank: cat.rank,
// // //         products: (cat.products || []).filter(
// // //           (p) => finalSelected[`${cat.categoryName}||${p.productIds}`],
// // //         ),
// // //       }))
// // //       .filter((cat) => cat.products.length > 0)
// // //       // Re-number after dropping unselected categories so rank stays a
// // //       // clean 1..N sequence with no gaps.
// // //       .map((cat, idx) => ({ ...cat, rank: String(idx + 1) }));

// // //     if (!categorie.length) {
// // //       setError("Select at least one product before submitting for approval.");
// // //       return;
// // //     }

// // //     setSubmitting(true);
// // //     setError("");
// // //     setMessage("");

// // //     // If this vendor already has a record on the server (myProducts.id),
// // //     // update it in place: merge the newly-picked products into its
// // //     // existing categories/products rather than creating a second, separate
// // //     // submission. Only a brand-new vendor with no prior record at all
// // //     // falls through to the create (POST) path below.

// // //     const hasExistingRecord = !!myProducts?.id;

// // //     try {
// // //       let submittedCount = 0;

// // //       if (hasExistingRecord) {
// // //         const mergedCategorie = mergeIntoExistingCategorie(
// // //           myProducts,
// // //           categorie,
// // //         );
// // //         // Full VendorProducts shape expected by UpdateVendorProductsValues —
// // //         // this PUT replaces the whole record server-side, so every field on
// // //         // the C# model is carried forward from the existing record (falling
// // //         // back to pendingCart/vendor only where myProducts has nothing).
// // //         const updatePayload = {
// // //           id: myProducts.id,
// // //           VendorId: String(vendorId || ""),
// // //           StoreName:
// // //             myProducts.storeName ||
// // //             pendingCart.storeName ||
// // //             vendor.storeName ||
// // //             vendor.name ||
// // //             "",
// // //           status: myProducts.status || pendingCart.status || "Pending",
// // //           CreatedDate:
// // //             myProducts.createdDate ||
// // //             pendingCart.createdDate ||
// // //             new Date().toISOString(),
// // //           UpdatedDate: new Date().toISOString(),
// // //           Pincodes: Array.isArray(myProducts.pincodes)
// // //             ? myProducts.pincodes
// // //             : Array.isArray(pendingCart.pincodes)
// // //               ? pendingCart.pincodes
// // //               : [],
// // //           Categorie: mergedCategorie,
// // //         };

// // //         console.log(
// // //           "Vendor Update Products Payload:",
// // //           JSON.stringify(updatePayload, null, 2),
// // //         );

// // //         const response = await axios.put(
// // //           `${VENDOR_UPDATE_PRODUCTS_API}?id=${encodeURIComponent(myProducts.id)}`,
// // //           updatePayload,
// // //           { headers: { "Content-Type": "application/json" } },
// // //         );

// // //         console.log("Vendor Update Products Response:", response.data);
// // //         submittedCount = categorie.reduce(
// // //           (sum, cat) => sum + cat.products.length,
// // //           0,
// // //         );
// // //       } else {
// // //         const payload = {
// // //           id: pendingCart.id || "",
// // //           vendorId: String(vendorId || ""),
// // //           storeName:
// // //             pendingCart.storeName || vendor.storeName || vendor.name || "",
// // //           status: pendingCart.status || "Pending",
// // //           createdDate: pendingCart.createdDate || new Date().toISOString(),
// // //           updatedDate: new Date().toISOString(),
// // //           pincodes: Array.isArray(pendingCart.pincodes)
// // //             ? pendingCart.pincodes
// // //             : [],
// // //           categorie,
// // //         };

// // //         console.log(
// // //           "Vendor Upload Products Payload:",
// // //           JSON.stringify(payload, null, 2),
// // //         );

// // //         const response = await axios.post(VENDOR_UPLOAD_PRODUCTS_API, payload, {
// // //           headers: { "Content-Type": "application/json" },
// // //         });

// // //         console.log("Vendor Upload Products Response:", response.data);
// // //         submittedCount = categorie.reduce(
// // //           (sum, cat) => sum + cat.products.length,
// // //           0,
// // //         );
// // //       }

// // //       setMessage(
// // //         `${submittedCount} product${submittedCount === 1 ? "" : "s"} sent to Handyman Admin for approval.`,
// // //       );

// // //       // Clear the local candidate cart now that it's been submitted, and
// // //       // refresh "Your submitted products" so it reflects the new state.
// // //       try {
// // //         localStorage.removeItem(pendingCartKey(vendorId));
// // //       } catch (err) {
// // //         // ignore
// // //       }
// // //       setPendingCart(null);
// // //       setFinalSelected({});

// // //       invalidateVendorProductsCache(vendorId);
// // //       getVendorProductsByVendorId(vendorId, { force: true })
// // //         .then(setMyProducts)
// // //         .catch((err) =>
// // //           console.error("Unable to refresh vendor products:", err),
// // //         );
// // //     } catch (submitError) {
// // //       console.error("Vendor approval submission failed:", submitError);
// // //       console.error("API Error Response:", submitError.response?.data);
// // //       setError(
// // //         submitError.response?.data?.message ||
// // //           "The approval request could not be submitted. Please try again.",
// // //       );
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container py-4 pb-5">
// // //       <button
// // //         type="button"
// // //         className="btn btn-outline-secondary btn-sm mb-3 d-inline-flex align-items-center gap-1"
// // //         onClick={handleBackToProfile}
// // //       >
// // //         <ArrowBackIcon fontSize="small" /> Back to Profile
// // //       </button>

// // //       <div className="card border-0 shadow-sm mb-4 overflow-hidden">
// // //         <div
// // //           className="card-body p-4 d-flex flex-column flex-md-row align-items-md-center gap-3"
// // //           style={{
// // //             background: "linear-gradient(135deg, #10301F, #2F6B4F)",
// // //             color: "white",
// // //           }}
// // //         >
// // //           <div
// // //             className="rounded-circle d-flex align-items-center justify-content-center position-relative"
// // //             style={{
// // //               width: 72,
// // //               height: 72,
// // //               background: "rgba(255,255,255,.16)",
// // //               border: "1px solid rgba(255,255,255,.4)",
// // //               cursor: "pointer",
// // //             }}
// // //             role="button"
// // //             title="View orders"
// // //             onClick={() => {
// // //               setHasNewOrder(false);
// // //               navigate(`/vendor/orders/${vendorId}`);
// // //             }}
// // //           >
// // //             <StorefrontIcon fontSize="large" />
// // //             <span
// // //               className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-white position-absolute${
// // //                 hasNewOrder ? " vendor-bell-ring" : ""
// // //               }`}
// // //               style={{
// // //                 width: 30,
// // //                 height: 30,
// // //                 top: -6,
// // //                 right: -6,
// // //                 color: "#10301F",
// // //                 boxShadow: "0 1px 4px rgba(0,0,0,.35)",
// // //               }}
// // //             >
// // //               <NotificationsActiveIcon fontSize="small" />
// // //               {orderCount > 0 && (
// // //                 <span
// // //                   className="badge rounded-pill bg-danger position-absolute"
// // //                   style={{ top: -6, right: -6, fontSize: 10 }}
// // //                 >
// // //                   {orderCount}
// // //                 </span>
// // //               )}
// // //             </span>
// // //           </div>
// // //           <div className="flex-grow-1">
// // //             <p
// // //               className="text-uppercase mb-1 small"
// // //               style={{ letterSpacing: ".08em", opacity: 0.8 }}
// // //             >
// // //               Vendor profile
// // //             </p>
// // //             <h2 className="mb-1">{vendor.storeName || vendor.name}</h2>
// // //             {vendor.storeName && vendor.name && (
// // //               <div className="small mb-1" style={{ opacity: 0.85 }}>
// // //                 Owner: {vendor.name}
// // //               </div>
// // //             )}
// // //             <div style={{ opacity: 0.85 }}>
// // //               {vendor.email} &middot; {vendor.phone}
// // //             </div>
// // //             {vendor.address && (
// // //               <div className="small mt-1" style={{ opacity: 0.75 }}>
// // //                 {vendor.address}
// // //               </div>
// // //             )}
// // //           </div>
// // //           <div className="d-flex gap-2">
// // //             <button
// // //               className={`btn btn-light position-relative d-inline-flex align-items-center gap-1${
// // //                 hasNewOrder ? " vendor-orders-bell-pulse" : ""
// // //               }`}
// // //               onClick={() => {
// // //                 setHasNewOrder(false);
// // //                 navigate(`/vendor/orders/${vendorId}`);
// // //               }}
// // //             >
// // //               <LocalShippingIcon fontSize="small" /> Orders
// // //               {orderCount > 0 && (
// // //                 <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
// // //                   {orderCount}
// // //                 </span>
// // //               )}
// // //             </button>
// // //             <button
// // //               className="btn btn-light d-inline-flex align-items-center gap-1"
// // //               onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
// // //             >
// // //               <ArrowBackIcon fontSize="small" /> Back to stock
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <style>{`
// // //         @keyframes vendorOrdersPulse {
// // //           0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, .6); }
// // //           70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
// // //           100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
// // //         }
// // //         .vendor-orders-bell-pulse {
// // //           animation: vendorOrdersPulse 1.4s ease-out infinite;
// // //         }
// // //         @keyframes vendorBellRing {
// // //           0%, 100% { transform: rotate(0deg); }
// // //           10% { transform: rotate(-18deg); }
// // //           20% { transform: rotate(16deg); }
// // //           30% { transform: rotate(-14deg); }
// // //           40% { transform: rotate(12deg); }
// // //           50% { transform: rotate(-8deg); }
// // //           60% { transform: rotate(6deg); }
// // //           70%, 100% { transform: rotate(0deg); }
// // //         }
// // //         .vendor-bell-ring {
// // //           animation: vendorBellRing 1s ease-in-out infinite;
// // //           transform-origin: 50% 0%;
// // //         }
// // //       `}</style>

// // //       {message && <div className="alert alert-success">{message}</div>}
// // //       {error && <div className="alert alert-danger">{error}</div>}

// // //       {/* ---- Products picked on the Stock Update page, awaiting final submission ---- */}
// // //       <div className="card border-0 shadow-sm mb-4">
// // //         <div className="card-body p-4">
// // //           <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
// // //             <h3 className="mb-0">Products ready to submit</h3>
// // //             {pendingProductCount > 0 && (
// // //               <span className="badge bg-success fs-6">
// // //                 {finalSelectedCount} of {pendingProductCount} selected
// // //               </span>
// // //             )}
// // //           </div>

// // //           {!pendingCart || pendingProductCount === 0 ? (
// // //             <div className="text-center py-3">
// // //               <p className="text-muted mb-3">
// // //                 No products picked yet. Go to Stock Update, check the products
// // //                 you want to sell and set a discount for each.
// // //               </p>
// // //               <button
// // //                 className="btn btn-outline-success btn-sm"
// // //                 onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
// // //               >
// // //                 Go to Stock Update
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <p className="text-muted small mb-2">
// // //                 Use the arrows to arrange the order these categories appear in
// // //                 on your storefront.
// // //               </p>
// // //               {orderedPendingCategories.map((cat, index) => (
// // //                 <div key={cat.categoryName} className="mb-3">
// // //                   <div className="d-flex align-items-center gap-2 mb-2">
// // //                     <span className="badge bg-secondary">#{cat.rank}</span>
// // //                     <h6 className="mb-0">{cat.categoryName}</h6>
// // //                     <div
// // //                       className="btn-group btn-group-sm ms-auto"
// // //                       role="group"
// // //                     >
// // //                       <button
// // //                         type="button"
// // //                         className="btn btn-outline-secondary"
// // //                         title="Move up"
// // //                         disabled={index === 0}
// // //                         onClick={() => moveCategory(index, -1)}
// // //                       >
// // //                         &uarr;
// // //                       </button>
// // //                       <button
// // //                         type="button"
// // //                         className="btn btn-outline-secondary"
// // //                         title="Move down"
// // //                         disabled={index === orderedPendingCategories.length - 1}
// // //                         onClick={() => moveCategory(index, 1)}
// // //                       >
// // //                         &darr;
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div className="row g-2">
// // //                     {cat.products.map((p) => {
// // //                       const key = `${cat.categoryName}||${p.productIds}`;
// // //                       const checked = !!finalSelected[key];
// // //                       return (
// // //                         <div
// // //                           className="col-12 col-sm-6 col-lg-4"
// // //                           key={p.productIds}
// // //                         >
// // //                           <label
// // //                             className={`border rounded p-2 small d-flex align-items-start gap-2 w-100 ${checked ? "border-success border-2" : ""}`}
// // //                             style={{ cursor: "pointer" }}
// // //                           >
// // //                             <input
// // //                               type="checkbox"
// // //                               className="form-check-input mt-1"
// // //                               checked={checked}
// // //                               onChange={() =>
// // //                                 toggleFinalSelected(
// // //                                   cat.categoryName,
// // //                                   p.productIds,
// // //                                 )
// // //                               }
// // //                             />
// // //                             <div>
// // //                               <div className="fw-bold">
// // //                                 {productNameById[p.productIds] ||
// // //                                   `Product ${p.productIds}`}
// // //                               </div>
// // //                               <div className="text-muted">
// // //                                 Qty: {p.quantity} &middot; Discount:{" "}
// // //                                 {p.discount}%
// // //                               </div>
// // //                             </div>
// // //                           </label>
// // //                         </div>
// // //                       );
// // //                     })}
// // //                   </div>
// // //                 </div>
// // //               ))}

// // //               <div className="d-flex justify-content-end mt-3">
// // //                 <button
// // //                   className="btn btn-success px-4"
// // //                   onClick={handleSubmitFinal}
// // //                   disabled={submitting || finalSelectedCount === 0}
// // //                 >
// // //                   {submitting
// // //                     ? "Submitting…"
// // //                     : `Submit for approval${finalSelectedCount ? ` (${finalSelectedCount})` : ""}`}
// // //                 </button>
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ---- Vendor's already-submitted products, from the server ---- */}
// // //       <div className="card border-0 shadow-sm mb-4">
// // //         <div className="card-body p-4">
// // //           <h3 className="mb-3">Your submitted products</h3>
// // //           {myProductsLoading ? (
// // //             <div className="text-center py-4">
// // //               <div className="spinner-border text-success" />
// // //               <p className="mt-2 mb-0">Loading your products…</p>
// // //             </div>
// // //           ) : myProducts ? (
// // //             <>
// // //               <span
// // //                 className={`badge mb-3 ${myProducts.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
// // //               >
// // //                 {myProducts.status || "Pending Approval"}
// // //               </span>
// // //               {myProducts.categories.map((cat) => (
// // //                 <div key={cat.category} className="mb-3">
// // //                   <h6 className="mb-2">{cat.category}</h6>
// // //                   <div className="row g-2">
// // //                     {cat.products.map((p) => (
// // //                       <div
// // //                         className="col-12 col-sm-6 col-lg-4"
// // //                         key={p.productId}
// // //                       >
// // //                         <div className="border rounded p-2 small">
// // //                           <div className="d-flex justify-content-between align-items-start gap-2">
// // //                             <div>
// // //                               {p.name ||
// // //                                 productNameById[p.productId] ||
// // //                                 `Product ${p.productId}`}
// // //                             </div>
// // //                             <span
// // //                               className={`badge ${p.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
// // //                               style={{ fontSize: "10px" }}
// // //                             >
// // //                               {p.status || "Pending"}
// // //                             </span>
// // //                           </div>
// // //                           <div>
// // //                             Qty: {p.qty} &middot; Discount: {p.discount}%
// // //                             &middot; Limit: {p.limit}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </>
// // //           ) : (
// // //             <div className="text-center py-3">
// // //               <p className="text-muted mb-0">
// // //                 No products submitted yet — Pending
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default VendorPreviewPage;

// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import axios from "axios";
// // import { useNavigate, useParams } from "react-router-dom";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import StorefrontIcon from "@mui/icons-material/Storefront";
// // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// // import { playNotificationSound } from "./notificationSound";
// // import { getGroceryItems } from "./utils/groceryStore";
// // import {
// //   getVendorProductsByVendorId,
// //   invalidateVendorProductsCache,
// // } from "./utils/vendorListStore";
   
// // const VENDOR_UPLOAD_PRODUCTS_API =
// //   "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts";
// // // const VENDOR_UPDATE_PRODUCTS_API =
// // //   "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/VendorUploadProducts/UpdateVendorProductsValues";

// // const MASTER_DATA_API_BASE = "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/MasterData";
// // const GET_STATES_API = `${MASTER_DATA_API_BASE}/getStates`;
// // const GET_DISTRICTS_API = `${MASTER_DATA_API_BASE}/getDistricts`;
// // const GET_PINCODES_API = `${MASTER_DATA_API_BASE}/getPincodes`;
 
// // const categoryOrderKey = (vendorId) => `vendorCategoryOrder_${vendorId}`;

// // const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// // const ORDERS_API_BASE = "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";
// // const GET_VENDOR_ORDERS = `${ORDERS_API_BASE}/Mart/GetVendorOrdersByVendorId`;
// // const ORDERS_POLL_INTERVAL_MS = 25000;

// // const getStateId = (s) => s?.stateId ?? s?.id ?? s?.StateId ?? s?.Id ?? "";
// // const getStateName = (s) =>
// //   s?.stateName ?? s?.name ?? s?.StateName ?? s?.Name ?? "";
// // const getDistrictId = (d) =>
// //   d?.districtId ?? d?.id ?? d?.DistrictId ?? d?.Id ?? "";
// // const getDistrictName = (d) =>
// //   d?.districtName ?? d?.name ?? d?.DistrictName ?? d?.Name ?? "";
// // const getPincodeId = (p) => {
// //   if (p === null || p === undefined) return "";
// //   if (typeof p !== "object") return String(p);
// //   return p.pincodeId ?? p.id ?? p.PincodeId ?? p.Id ?? "";
// // };
// // const getPincodeValue = (p) => {
// //   if (p === null || p === undefined) return "";
// //   if (typeof p !== "object") return String(p);
// //   return (
// //     p.pincode ?? p.pinCode ?? p.code ?? p.Pincode ?? p.name ?? p.Name ?? ""
// //   );
// // };

// // const VendorPreviewPage = () => {
// //   const { vendorId } = useParams();
// //   const navigate = useNavigate();
// //   const [vendor, setVendor] = useState(null);
// //   const [catalogItems, setCatalogItems] = useState([]);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");
// //   const [myProducts, setMyProducts] = useState(null);
// //   const [myProductsLoading, setMyProductsLoading] = useState(true);

// //   const [orderCount, setOrderCount] = useState(0);
// //   const [hasNewOrder, setHasNewOrder] = useState(false);
// //   const knownOrderIdsRef = useRef(null);

// //   const [pendingCart, setPendingCart] = useState(null);
// //   const [finalSelected, setFinalSelected] = useState({});

// //   const [categoryOrder, setCategoryOrder] = useState([]);
// //   const [expandedCategories, setExpandedCategories] = useState({});
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const pageRef = useRef(null);
// //   const [isFullScreen, setIsFullScreen] = useState(false);

// //   useEffect(() => {
// //     const handleFullScreenChange = () => {
// //       setIsFullScreen(!!document.fullscreenElement);
// //     };
// //     document.addEventListener("fullscreenchange", handleFullScreenChange);
// //     return () =>
// //       document.removeEventListener("fullscreenchange", handleFullScreenChange);
// //   }, []);

// //   const [stateList, setStateList] = useState([]);
// //   const [districtList, setDistrictList] = useState([]);
// //   const [pincodeList, setPincodeList] = useState([]);
// //   const [statesLoading, setStatesLoading] = useState(false);
// //   const [districtsLoading, setDistrictsLoading] = useState(false);
// //   const [pincodesLoading, setPincodesLoading] = useState(false);
// //   const [formData, setFormData] = useState({ stateId: "", districtId: "" });

// //  const [selectedPincodes, setSelectedPincodes] = useState({});
// // const [pincodesLocked, setPincodesLocked] = useState(false);

// // const seededPincodesRef = useRef(false);
// // const seededStateRef = useRef(false);
// // const seededDistrictRef = useRef(false);

// //   const normalizedQuery = searchQuery.trim().toLowerCase();

// //   const normalizeText = (value) =>
// //     String(value ?? "")
// //       .trim()
// //       .toLowerCase();

// //   const matchesQuery = (value) => {
// //     if (!normalizedQuery) return true;

// //     return normalizeText(value).includes(
// //       normalizedQuery
// //     );
// //   };

// //   const orderedPendingCategories = useMemo(() => {
// //     const cats = pendingCart?.categorie || [];
// //     const byName = new Map(cats.map((cat) => [cat.categoryName, cat]));
// //     const ordered = categoryOrder
// //       .map((name) => byName.get(name))
// //       .filter(Boolean);
// //     cats.forEach((cat) => {
// //       if (!categoryOrder.includes(cat.categoryName)) ordered.push(cat);
// //     });
// //     return ordered.map((cat, idx) => ({ ...cat, rank: String(idx + 1) }));
// //   }, [pendingCart, categoryOrder]);

// //   const statusByProductId = useMemo(() => {
// //     const map = {};
// //     (myProducts?.categories || []).forEach((cat) => {
// //       (cat.products || []).forEach((p) => {
// //         map[String(p.productId)] = p.status || "Pending";
// //       });
// //     });
// //     return map;
// //   }, [myProducts]);

// //   // productId -> the values already on the vendor's server record, used to
// // // detect whether a pendingCart entry actually represents a change.
// // const existingProductValues = useMemo(() => {
// //   const map = {};
// //   (myProducts?.categories || []).forEach((cat) => {
// //     (cat.products || []).forEach((p) => {
// //       map[String(p.productId)] = {
// //         quantity: String(p.qty ?? 0),
// //         discount: String(p.discount ?? 0),
// //         limit: String(p.limit ?? 0),
// //       };
// //     });
// //   });
// //   return map;
// // }, [myProducts]);

// // // A pendingCart product is worth showing in "ready to submit" only if it's
// // // brand new (never on the server record) or at least one field differs
// // // from what's already there.
// // const isProductModified = (p) => {
// //   const existing = existingProductValues[String(p.productIds)];
// //   if (!existing) return true; // never submitted before -> new, show it

// //   return (
// //     String(p.quantity ?? 0) !== existing.quantity ||
// //     String(p.discount ?? 0) !== existing.discount ||
// //     String(p.limit ?? 0) !== existing.limit
// //   );
// // };

// //   const readyToSubmitCategories = useMemo(() => {
// //   return orderedPendingCategories
// //     .map((cat) => ({
// //       ...cat,
// //       products: (cat.products || []).filter(
// //         (p) =>
// //           statusByProductId[String(p.productIds)] !== "Approved" &&
// //           isProductModified(p),   
// //       ),
// //     }))
// //     .filter((cat) => cat.products.length > 0);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [orderedPendingCategories, statusByProductId, existingProductValues]);

// //   const productNameById = useMemo(() => {
// //     const map = {};
// //     catalogItems.forEach((item) => {
// //       map[String(item.id)] = item.name;
// //     });
// //     return map;
// //   }, [catalogItems]);

// //   // ------------------------------------------------------------
// //   // Get product name from catalog
// //   // Supports both id/productId formats
// //   // ------------------------------------------------------------
// //   const getProductName = (product) => {
// //     const productId =
// //       product?.productIds ??
// //       product?.productId ??
// //       product?.id ??
// //       "";

// //     const catalogProduct = catalogItems.find(
// //       (item) =>
// //         String(item.id ?? item.productId ?? item.productIds) ===
// //         String(productId)
// //     );

// //     return (
// //       product?.name ||
// //       product?.productName ||
// //       catalogProduct?.name ||
// //       catalogProduct?.productName ||
// //       `Product ${productId}`
// //     );
// //   };

// //   const searchedReadyToSubmitCategories = useMemo(() => {
// //     if (!normalizedQuery) {
// //       return readyToSubmitCategories;
// //     }

// //     return readyToSubmitCategories
// //       .map((cat) => {
// //         const categoryName =
// //           cat.categoryName || "";
// //         const categoryMatches =
// //           matchesQuery(categoryName);
// //         const matchingProducts =
// //           (cat.products || []).filter((product) => {
// //             const productName =
// //               getProductName(product);

// //             const productId =
// //               product?.productIds ??
// //               product?.productId ??
// //               "";

// //             return (
// //               matchesQuery(productName) ||
// //               matchesQuery(productId)
// //             );
// //           });

// //         return {
// //           ...cat,
// //           products: categoryMatches
// //             ? cat.products || []
// //             : matchingProducts,
// //         };
// //       })
// //       .filter(
// //         (cat) =>
// //           cat.products &&
// //           cat.products.length > 0
// //       );
// //       // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [
// //     readyToSubmitCategories,
// //     normalizedQuery,
// //     catalogItems,
// //   ]);

// //    const approvedCategories = useMemo(() => {
// //     return (myProducts?.categories || [])
// //       .map((cat) => ({
// //         ...cat,
// //         products: (cat.products || []).filter(
// //           (p) => p.status === "Approved"
// //         ),
// //       }))
// //       .filter(
// //         (cat) => cat.products.length > 0
// //       );
// //   }, [myProducts]);

// //   const searchedApprovedCategories = useMemo(() => {
// //     if (!normalizedQuery) {
// //       return approvedCategories;
// //     }

// //     return approvedCategories
// //       .map((cat) => {
// //         const categoryName =
// //           cat.category || "";

// //         const categoryMatches =
// //           matchesQuery(categoryName);

// //         const matchingProducts =
// //           (cat.products || []).filter((product) => {
// //             const productName =
// //               getProductName(product);

// //             const productId =
// //               product?.productId ??
// //               product?.productIds ??
// //               "";

// //             return (
// //               matchesQuery(productName) ||
// //               matchesQuery(productId)
// //             );
// //           });

// //         return {
// //           ...cat,
// //           products: categoryMatches
// //             ? cat.products || []
// //             : matchingProducts,
// //         };
// //       })
// //       .filter(
// //         (cat) =>
// //           cat.products &&
// //           cat.products.length > 0
// //       );
// //       // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [
// //     approvedCategories,
// //     normalizedQuery,
// //     catalogItems,
// //   ]);

// //   useEffect(() => {
// //     if (!normalizedQuery) return;
// //     setExpandedCategories((prev) => {
// //       const next = { ...prev };
// //       searchedReadyToSubmitCategories.forEach((cat) => {
// //         next[cat.categoryName] = true;
// //       });
// //       searchedApprovedCategories.forEach((cat) => {
// //         next[`approved-${cat.category}`] = true;
// //       });
// //       return next;
// //     });
// //   }, [normalizedQuery, searchedReadyToSubmitCategories, searchedApprovedCategories]);

// //   const toggleCategoryExpanded = (categoryName) => {
// //     setExpandedCategories((prev) => ({
// //       ...prev,
// //       [categoryName]: !prev[categoryName],
// //     }));
// //   };

// //   useEffect(() => {
// //     const sessionId = localStorage.getItem("vendorSession");
// //     const savedVendor = localStorage.getItem("vendorProfile");

// //     // No session
// //     if (!sessionId) {
// //       navigate("/vendor/login");
// //       return;
// //     }

// //     // Wrong vendor session
// //     if (sessionId !== vendorId) {
// //       navigate("/vendor/login");
// //       return;
// //     }

// //     // No saved vendor profile
// //     if (!savedVendor) {
// //       navigate("/vendor/login");
// //       return;
// //     }

// //     try {
// //       const profile = JSON.parse(savedVendor);

// //       // Make sure saved profile belongs to current vendor
// //       if (profile.vendorId !== vendorId) {
// //         navigate("/vendor/login");
// //         return;
// //       }

// //       setVendor(profile);
// //     } catch (error) {
// //       console.error("Unable to read vendor profile:", error);
// //       navigate("/vendor/login");
// //     }
// //   }, [vendorId, navigate]);

// //   // Poll for orders so the header bell can show a live count and flag
// //   // brand-new orders with a highlight + sound, even while the vendor is
// //   // just sitting on their profile page.
// //   useEffect(() => {
// //     if (!vendor) return;
// //     let cancelled = false;

// //     const pollOrders = async () => {
// //       try {
// //         const { data } = await axios.get(GET_VENDOR_ORDERS, {
// //           params: { vendorId },
// //         });
// //         if (cancelled) return;
// //         const list = Array.isArray(data) ? data : [];
// //         setOrderCount(list.length);

// //         const ids = new Set(list.map((o) => o.id));
// //         if (knownOrderIdsRef.current) {
// //           const arrived = [...ids].some(
// //             (id) => !knownOrderIdsRef.current.has(id),
// //           );
// //           if (arrived) {
// //             setHasNewOrder(true);
// //             try {
// //               playNotificationSound();
// //             } catch {
// //               // audio playback blocked/unsupported — highlight still shows
// //             }
// //           }
// //         }
// //         knownOrderIdsRef.current = ids;
// //       } catch (err) {
// //         console.error("Failed to poll vendor orders:", err);
// //       }
// //     };

// //     pollOrders();
// //     const interval = setInterval(pollOrders, ORDERS_POLL_INTERVAL_MS);
// //     return () => {
// //       cancelled = true;
// //       clearInterval(interval);
// //     };
// //   }, [vendor, vendorId]);

// //   // Product names/images for display only — the actual selection + discount
// //   // now happens on the Stock Update page, this is just a lookup table.
// //   useEffect(() => {
// //     if (!vendor) return;
// //     let active = true;
// //     getGroceryItems()
// //       .then((data) => {
// //         if (active) setCatalogItems(Array.isArray(data) ? data : []);
// //       })
// //       .catch((err) => console.error("Unable to load product catalog:", err));
// //     return () => {
// //       active = false;
// //     };
// //   }, [vendor]);

// //   // productId -> status ("Approved" | "Pending" | etc), sourced from the
// //   // vendor's real server record. Used to keep "Products ready to submit"
// //   // and "Your submitted products" mutually exclusive by status.

// //   useEffect(() => {
// //     if (!vendorId) return;
// //     let active = true;
// //     setMyProductsLoading(true);
// //     // First load for this vendorId hits GetVendorProductsByVendorId,
// //     // later loads within the cache window are served from vendorListStore.
// //     getVendorProductsByVendorId(vendorId)
// //       .then((vendorWithProducts) => {
// //         if (active) setMyProducts(vendorWithProducts);
// //       })
// //       .catch((err) => {
// //         console.error("Unable to load vendor products:", err);
// //         if (active) setMyProducts(null);
// //       })
// //       .finally(() => active && setMyProductsLoading(false));
// //     return () => {
// //       active = false;
// //     };
// //   }, [vendorId]);

// //   useEffect(() => {
// //     if (!vendorId) return;

// //     const loadPendingCart = () => {
// //       try {
// //         const raw = localStorage.getItem(pendingCartKey(vendorId));
// //         if (!raw) {
// //           setPendingCart(null);
// //           setFinalSelected({});
// //           return;
// //         }
// //         const parsed = JSON.parse(raw);
// //         setPendingCart(parsed);
// //         setFinalSelected((prev) => {
// //           const next = {};
// //           (parsed.categorie || []).forEach((cat) => {
// //             (cat.products || []).forEach((p) => {
// //               const key = `${cat.categoryName}||${p.productIds}`;
// //               next[key] = key in prev ? prev[key] : true;
// //             });
// //           });
// //           return next;
// //         });
// //       } catch (err) {
// //         console.error("Unable to read pending product selection:", err);
// //         setPendingCart(null);
// //         setFinalSelected({});
// //       }
// //     };

// //     loadPendingCart();

// //     // Same-tab: catches returning to this page (e.g. via bfcache/tab
// //     // switch) after an Excel import elsewhere without a full remount.
// //     // Cross-tab: catches the "storage" event fired when another tab
// //     // (Stock Update open in a second tab) writes to this same key.
// //     const handleVisibility = () => {
// //       if (document.visibilityState === "visible") loadPendingCart();
// //     };
// //     const handleStorage = (event) => {
// //       if (!event.key || event.key === pendingCartKey(vendorId)) {
// //         loadPendingCart();
// //       }
// //     };
// //     window.addEventListener("focus", loadPendingCart);
// //     document.addEventListener("visibilitychange", handleVisibility);
// //     window.addEventListener("storage", handleStorage);
// //     return () => {
// //       window.removeEventListener("focus", loadPendingCart);
// //       document.removeEventListener("visibilitychange", handleVisibility);
// //       window.removeEventListener("storage", handleStorage);
// //     };
// //   }, [vendorId]);

// //   // Reconcile the vendor's arranged category order against pendingCart's
// //   // current set of categories, and seed it from localStorage / current
// //   // category order on first load.
// //   useEffect(() => {
// //     if (!vendorId) return;
// //     const currentNames = (pendingCart?.categorie || []).map(
// //       (cat) => cat.categoryName,
// //     );
// //     setCategoryOrder((prev) => {
// //       let base = prev;
// //       if (!prev.length) {
// //         try {
// //           const raw = localStorage.getItem(categoryOrderKey(vendorId));
// //           if (raw) base = JSON.parse(raw);
// //         } catch {
// //           // ignore malformed saved order
// //         }
// //       }
// //       const known = base.filter((name) => currentNames.includes(name));
// //       const appended = currentNames.filter((name) => !known.includes(name));
// //       const next = [...known, ...appended];
// //       if (
// //         next.length === prev.length &&
// //         next.every((name, idx) => name === prev[idx])
// //       ) {
// //         return prev;
// //       }
// //       return next;
// //     });
// //   }, [vendorId, pendingCart]);

// //   // ============================================================
// //   // Load States (once, on mount)
// //   // ============================================================
// //   useEffect(() => {
// //     setStatesLoading(true);

// //     axios
// //       .get(GET_STATES_API)
// //       .then((response) => {
// //         setStateList(Array.isArray(response.data) ? response.data : []);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching states:", error);
// //         setError("Could not load states. Please refresh and try again.");
// //       })
// //       .finally(() => {
// //         setStatesLoading(false);
// //       });
// //   }, []);

// //   // ============================================================
// //   // Load Districts using State ID
// //   // ============================================================
// //   useEffect(() => {
// //     if (!formData.stateId) {
// //       setDistrictList([]);
// //       return;
// //     }

// //     setDistrictsLoading(true);
// //     setDistrictList([]);

// //     axios
// //       .get(`${GET_DISTRICTS_API}/${formData.stateId}`)
// //       .then((response) => {
// //         setDistrictList(Array.isArray(response.data) ? response.data : []);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching districts:", error);
// //         setError("Could not load districts. Please try again.");
// //         setDistrictList([]);
// //       })
// //       .finally(() => {
// //         setDistrictsLoading(false);
// //       });
// //   }, [formData.stateId]);

// //   // ============================================================
// //   // Load Pincodes using District ID
// //   // ============================================================
// //   useEffect(() => {
// //     if (!formData.districtId) {
// //       setPincodeList([]);
// //       setPincodesLoading(false);
// //       return;
// //     }

// //     setPincodesLoading(true);
// //     setPincodeList([]);

// //     axios
// //       .get(`${GET_PINCODES_API}/${formData.districtId}`)
// //       .then((response) => {
// //         const raw = Array.isArray(response.data) ? response.data : [];
// //         // A handful of rows in the master data have no pincode value at
// //         // all (null/blank) — drop those here instead of rendering an
// //         // empty, unusable checkbox for each one.
// //         const withValue = raw.filter(
// //           (p) => String(getPincodeValue(p) ?? "").trim() !== "",
// //         );
// //         if (withValue.length !== raw.length) {
// //           console.warn(
// //             `getPincodes returned ${raw.length} rows, ${
// //               raw.length - withValue.length
// //             } had no pincode value:`,
// //             raw,
// //           );
// //         }
// //         setPincodeList(withValue);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching pincodes:", error);
// //         setError("Could not load pincodes. Please try again.");
// //         setPincodeList([]);
// //       })
// //       .finally(() => {
// //         setPincodesLoading(false);
// //       });
// //   }, [formData.districtId]);

// //   // Seed the pincode checkboxes once from whatever's already saved on this
// //   // vendor's server record (myProducts.pincodes) or the local pendingCart,
// //   // so previously-picked pincodes stay checked even before their state/
// //   // district has been re-selected on this page.
// //   // ============================================================
// // // Load previously saved pincodes
// // //
// // // First visit:
// // //   No saved pincodes -> user can freely select/unselect.
// // //
// // // Later visits:
// // //   Saved pincodes found -> show only those pincodes and lock them.
// // // ============================================================
// // // ============================================================
// // // Load previously saved pincodes
// // // ============================================================

// // useEffect(() => {
// //   // Wait until the vendor's products API has finished loading.
// //   if (myProductsLoading) return;

// //   if (seededPincodesRef.current) return;

// //   const existingPincodes = Array.isArray(myProducts?.pincodes)
// //     ? myProducts.pincodes
// //     : [];

// //   const pendingPincodes = Array.isArray(pendingCart?.pincodes)
// //     ? pendingCart.pincodes
// //     : [];

// //   const savedPincodes =
// //     existingPincodes.length > 0
// //       ? existingPincodes
// //       : pendingPincodes;

// //   if (savedPincodes.length > 0) {
// //     const selected = {};

// //     savedPincodes.forEach((pin) => {
// //       const value = String(
// //         getPincodeValue(pin)
// //       ).trim();

// //       if (value) {
// //         selected[value] = true;
// //       }
// //     });

// //     setSelectedPincodes(selected);
// //     setPincodesLocked(true);
// //   } else {
// //     setSelectedPincodes({});
// //     setPincodesLocked(false);
// //   }

// //   seededPincodesRef.current = true;
// // }, [myProductsLoading, myProducts, pendingCart]);
// //   // ------------------------------------------------------------
// //   // Auto-select the vendor's own State once both the vendor profile and
// //   // the states list are available. Same idea as everywhere else this
// //   // page reads "vendor details" (vendor.storeName, vendor.email, etc. in
// //   // the header card below): read it straight off the `vendor` object
// //   // that was loaded from localStorage's "vendorProfile" / the vendor's
// //   // server record. We try a direct id first (vendor.stateId), and fall
// //   // back to matching a stored state *name* (vendor.state / vendor.stateName)
// //   // against the loaded stateList, in case the vendor record only stores
// //   // the name rather than the master-data id.
// //   // ------------------------------------------------------------
// //   useEffect(() => {
// //     if (seededStateRef.current) return;
// //     if (!vendor || stateList.length === 0) return;

// //     const directId = vendor.stateId ?? vendor.StateId ?? "";
// //     let stateId = directId ? String(directId) : "";

// //     if (!stateId) {
// //       const vendorStateName = vendor.state ?? vendor.stateName ?? "";
// //       if (vendorStateName) {
// //         const match = stateList.find(
// //           (s) => normalizeText(getStateName(s)) === normalizeText(vendorStateName),
// //         );
// //         if (match) stateId = String(getStateId(match));
// //       }
// //     }

// //     if (stateId) {
// //       setFormData((prev) => ({ ...prev, stateId }));
// //     }
// //     seededStateRef.current = true;
// //   }, [vendor, stateList]);

// //   // Auto-select the vendor's own District, once the districtList for the
// //   // (auto-selected, above) state has loaded. Same direct-id-then-name-match
// //   // approach as the state seeding above.
// //   useEffect(() => {
// //     if (seededDistrictRef.current) return;
// //     if (!vendor || districtList.length === 0) return;

// //     const directId = vendor.districtId ?? vendor.DistrictId ?? "";
// //     let districtId = directId ? String(directId) : "";

// //     if (!districtId) {
// //       const vendorDistrictName = vendor.district ?? vendor.districtName ?? "";
// //       if (vendorDistrictName) {
// //         const match = districtList.find(
// //           (d) =>
// //             normalizeText(getDistrictName(d)) === normalizeText(vendorDistrictName),
// //         );
// //         if (match) districtId = String(getDistrictId(match));
// //       }
// //     }

// //     if (districtId) {
// //       setFormData((prev) => ({ ...prev, districtId }));
// //     }
// //     seededDistrictRef.current = true;
// //   }, [vendor, districtList]);

// //   const togglePincode = (pincodeValue) => {
// //   // Saved pincodes cannot be modified.
// //   if (pincodesLocked) {
// //     return;
// //   }

// //   const key = String(pincodeValue).trim();

// //   setSelectedPincodes((prev) => ({
// //     ...prev,
// //     [key]: !prev[key],
// //   }));
// // };

// //  const selectedPincodeValues = useMemo(
// //   () =>
// //     Object.keys(selectedPincodes).filter(
// //       (key) => selectedPincodes[key],
// //     ),
// //   [selectedPincodes],
// // );


// // const visiblePincodeList = useMemo(() => {
// //   if (!pincodesLocked) {
// //     return pincodeList;
// //   }

// //   const savedPincodes = Array.isArray(myProducts?.pincodes)
// //     ? myProducts.pincodes
// //     : [];

// //   const selectedValues = Object.keys(selectedPincodes)
// //     .filter((pin) => selectedPincodes[pin]);

// //   const combined = [
// //     ...savedPincodes,
// //     ...selectedValues,
// //   ];

// //   const uniquePincodes = [
// //     ...new Set(
// //       combined
// //         .map((pin) => String(getPincodeValue(pin)).trim())
// //         .filter(Boolean)
// //     ),
// //   ];

// //   return uniquePincodes.map((pin) => {
// //     const existing = pincodeList.find(
// //       (p) => String(getPincodeValue(p)).trim() === pin
// //     );

// //     return (
// //       existing || {
// //         pincodeId: pin,
// //         pincode: pin,
// //       }
// //     );
// //   });
// // }, [
// //   pincodeList,
// //   selectedPincodes,
// //   pincodesLocked,
// //   myProducts,
// // ]);

// //   const persistCategoryOrder = (order) => {
// //     try {
// //       localStorage.setItem(categoryOrderKey(vendorId), JSON.stringify(order));
// //     } catch {
// //     }
// //   };

// //   const moveCategory = (index, direction) => {
// //     setCategoryOrder((prev) => {
// //       const targetIndex = index + direction;
// //       if (targetIndex < 0 || targetIndex >= prev.length) return prev;
// //       const next = [...prev];
// //       [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
// //       persistCategoryOrder(next);
// //       return next;
// //     });
// //   };

// //   const pendingProductCount = useMemo(
// //     () =>
// //       readyToSubmitCategories.reduce(
// //         (sum, cat) => sum + (cat.products?.length || 0),
// //         0,
// //       ),
// //     [readyToSubmitCategories],
// //   );

// //   const finalSelectedCount = useMemo(() => {
// //     let count = 0;
// //     readyToSubmitCategories.forEach((cat) => {
// //       (cat.products || []).forEach((p) => {
// //         if (finalSelected[`${cat.categoryName}||${p.productIds}`]) count++;
// //       });
// //     });
// //     return count;
// //   }, [readyToSubmitCategories, finalSelected]);

// //   const selectedStateName = useMemo(() => {
// //   const match = stateList.find(
// //     (s) => String(getStateId(s)) === String(formData.stateId)
// //   );
// //   return getStateName(match) || vendor?.state || vendor?.stateName || "";
// // }, [stateList, formData.stateId, vendor]);

// // const selectedDistrictName = useMemo(() => {
// //   const match = districtList.find(
// //     (d) => String(getDistrictId(d)) === String(formData.districtId)
// //   );
// //   return getDistrictName(match) || vendor?.district || vendor?.districtName || "";
// // }, [districtList, formData.districtId, vendor]);

// //   const toggleFinalSelected = (categoryName, productId) => {
// //     const key = `${categoryName}||${productId}`;
// //     setFinalSelected((prev) => ({ ...prev, [key]: !prev[key] }));
// //   };

// //   if (!vendor) return null;

// //   const handleBackToProfile = () => {
// //     const returnTo = localStorage.getItem("vendorReturnProfile");
// //     navigate(returnTo || "/");
// //   };

// //   const mergeIntoExistingCategorie = (existingVendor, newCategorie) => {
// //   const existingCats = new Map();
// //   const order = [];

// //   // Keep existing products INCLUDING their status
// //   (existingVendor?.categories || []).forEach((cat) => {
// //     const categoryName =
// //       cat.categoryName ??
// //       cat.category ??
// //       cat.CategoryName ??
// //       "";

// //     const productMap = new Map();

// //     (cat.products || []).forEach((p) => {
// //       const productId =
// //         p.productIds ??
// //         p.productId ??
// //         p.ProductIds ??
// //         "";

// //       productMap.set(String(productId), {
// //         quantity: String(p.quantity ?? p.qty ?? p.Quantity ?? 0),
// //         discount: String(p.discount ?? p.Discount ?? 0),
// //         limit: String(p.limit ?? p.Limit ?? 0),

// //         // IMPORTANT: preserve existing status
// //         status: p.status ?? "Pending",
// //       });
// //     });

// //     existingCats.set(categoryName, productMap);
// //     order.push(categoryName);
// //   });

// //   // Add/update newly submitted products
// //   newCategorie.forEach((cat) => {
// //     const categoryName = cat.categoryName;

// //     let productMap = existingCats.get(categoryName);

// //     if (!productMap) {
// //       productMap = new Map();
// //       existingCats.set(categoryName, productMap);
// //       order.push(categoryName);
// //     }

// //     (cat.products || []).forEach((p) => {
// //       const productId =
// //         p.productIds ??
// //         p.productId ??
// //         p.ProductIds ??
// //         "";

// //       // IMPORTANT:
// //       // Anything submitted from Vendor Preview is Pending
// //       productMap.set(String(productId), {
// //         quantity: String(p.quantity ?? p.Quantity ?? 0),
// //         discount: String(p.discount ?? p.Discount ?? 0),
// //         limit: String(p.limit ?? p.Limit ?? 0),

// //         status: "Pending",
// //       });
// //     });
// //   });

// //   const rankOf = (name) => {
// //     const idx = categoryOrder.indexOf(name);
// //     return idx === -1 ? Infinity : idx;
// //   };

// //   const finalOrder = [...order].sort((a, b) => {
// //     const diff = rankOf(a) - rankOf(b);

// //     if (diff !== 0) return diff;

// //     return order.indexOf(a) - order.indexOf(b);
// //   });

// //   return finalOrder.map((categoryName, idx) => ({
// //     CategoryName: categoryName,
// //     Rank: String(idx + 1),

// //     Products: Array.from(
// //       existingCats.get(categoryName).entries()
// //     ).map(([productId, v]) => ({
// //       ProductIds: productId,
// //       Quantity: v.quantity,
// //       Discount: v.discount,
// //       Limit: v.limit,

// //       // IMPORTANT
// //       Status: v.status,
// //     })),
// //   }));
// // };

// //   // const handleSubmitFinal = async () => {
// //   //   if (!pendingCart) return;
// //   //   const categorie = readyToSubmitCategories
// //   //     .map((cat) => ({
// //   //       categoryName: cat.categoryName,
// //   //       rank: cat.rank,
// //   //       products: (cat.products || [])
// //   //         .filter(
// //   //           (p) => finalSelected[`${cat.categoryName}||${p.productIds}`],
// //   //         )
// //   //         .map((p) => ({
// //   //           ...p,
// //   //           limit: p.limit ?? "0",
// //   //         })),
// //   //     }))
// //   //     .filter((cat) => cat.products.length > 0)
// //   //     // Re-number after dropping unselected categories so rank stays a
// //   //     // clean 1..N sequence with no gaps.
// //   //     .map((cat, idx) => ({ ...cat, rank: String(idx + 1) }));

// //   //   if (!categorie.length) {
// //   //     setError("Select at least one product before submitting for approval.");
// //   //     return;
// //   //   }

// //   //   if (selectedPincodeValues.length === 0) {
// //   //     setError("Select at least one pincode before submitting for approval.");
// //   //     return;
// //   //   }

// //   //   setSubmitting(true);
// //   //   setError("");
// //   //   setMessage("");

// //   //   // If this vendor already has a record on the server (myProducts.id),
// //   //   // update it in place: merge the newly-picked products into its
// //   //   // existing categories/products rather than creating a second, separate
// //   //   // submission. Only a brand-new vendor with no prior record at all
// //   //   // falls through to the create (POST) path below.

// //   //   const hasExistingRecord = !!myProducts?.id;

// //   //   try {
// //   //     let submittedCount = 0;

// //   //     if (hasExistingRecord) {
// //   //       const mergedCategorie = mergeIntoExistingCategorie(
// //   //         myProducts,
// //   //         categorie,
// //   //       );
// //   //        const updatePayload = {
// //   //         id: myProducts.id,
// //   //         VendorId: String(vendorId || ""),
// //   //         StoreName:
// //   //           myProducts.storeName ||
// //   //           pendingCart.storeName ||
// //   //           vendor.storeName ||
// //   //           vendor.name ||
// //   //           "",
// //   //         status: myProducts.status || pendingCart.status || "Pending",
// //   //         CreatedDate:
// //   //           myProducts.createdDate ||
// //   //           pendingCart.createdDate ||
// //   //           new Date().toISOString(),
// //   //         UpdatedDate: new Date().toISOString(),
// //   //         Pincodes: selectedPincodeValues,
// //   //         Categorie: mergedCategorie,
// //   //         District: selectedDistrictName,
// //   //         DistrictId: formData.districtId,
// //   //         State: selectedStateName,
// //   //         StateId: formData.stateId,
// //   //       };

// //   //       console.log(
// //   //         "Vendor Update Products Payload:",
// //   //         JSON.stringify(updatePayload, null, 2),
// //   //       );

// //   //       const response = await axios.put(
// //   //         `${VENDOR_UPDATE_PRODUCTS_API}?id=${encodeURIComponent(myProducts.id)}`,
// //   //         updatePayload,
// //   //         { headers: { "Content-Type": "application/json" } },
// //   //       );

// //   //       console.log("Vendor Update Products Response:", response.data);
// //   //       submittedCount = categorie.reduce(
// //   //         (sum, cat) => sum + cat.products.length,
// //   //         0,
// //   //       );
// //   //     } else {
// //   //       const payload = {
// //   //         id: pendingCart.id || "",
// //   //         vendorId: String(vendorId || ""),
// //   //         storeName:
// //   //           pendingCart.storeName || vendor.storeName || vendor.name || "",
// //   //         status: pendingCart.status || "Pending",
// //   //         createdDate: pendingCart.createdDate || new Date().toISOString(),
// //   //         updatedDate: new Date().toISOString(),
// //   //         pincodes: selectedPincodeValues,
// //   //         categorie,
// //   //         state: selectedStateName,
// //   //         stateId: formData.stateId,
// //   //         district: selectedDistrictName,
// //   //         districtId: formData.districtId,
// //   //       };

// //   //       console.log(
// //   //         "Vendor Upload Products Payload:",
// //   //         JSON.stringify(payload, null, 2),
// //   //       );

// //   //       const response = await axios.post(VENDOR_UPLOAD_PRODUCTS_API, payload, {
// //   //         headers: { "Content-Type": "application/json" },
// //   //       });

// //   //       console.log("Vendor Upload Products Response:", response.data);
// //   //       submittedCount = categorie.reduce(
// //   //         (sum, cat) => sum + cat.products.length,
// //   //         0,
// //   //       );
// //   //     }

// //   //     setMessage(
// //   //       `${submittedCount} product${submittedCount === 1 ? "" : "s"} sent to Handyman Admin for approval.`,
// //   //     );

// //   //     // Clear the local candidate cart now that it's been submitted, and
// //   //     // refresh "Your submitted products" so it reflects the new state.
// //   //     try {
// //   //       localStorage.removeItem(pendingCartKey(vendorId));
// //   //     } catch (err) {
// //   //       // ignore
// //   //     }
// //   //     setPendingCart(null);
// //   //     setFinalSelected({});

// //   //     invalidateVendorProductsCache(vendorId);
// //   //     getVendorProductsByVendorId(vendorId, { force: true })
// //   //       .then(setMyProducts)
// //   //       .catch((err) =>
// //   //         console.error("Unable to refresh vendor products:", err),
// //   //       );
// //   //   } catch (submitError) {
// //   //     console.error("Vendor approval submission failed:", submitError);
// //   //     console.error("API Error Response:", submitError.response?.data);
// //   //     setError(
// //   //       submitError.response?.data?.message ||
// //   //         "The approval request could not be submitted. Please try again.",
// //   //     );
// //   //   } finally {
// //   //     setSubmitting(false);
// //   //   }
// //   // };

// // const handleSubmitFinal = async () => {
// //   if (!pendingCart) return;
// //   const categorie = readyToSubmitCategories
// //     .map((cat) => ({
// //       categoryName: cat.categoryName,
// //       rank: cat.rank,
// //       products: (cat.products || [])
// //         .filter(
// //           (p) => finalSelected[`${cat.categoryName}||${p.productIds}`]
// //         )
// //         .map((p) => ({
// //           productIds: String(p.productIds ?? ""),
// //           quantity: String(p.quantity ?? "0"),
// //           limit: String(p.limit ?? "0"),
// //           discount: String(p.discount ?? "0"),
// //         })),
// //     }))
// //     .filter((cat) => cat.products.length > 0)
// //     .map((cat, idx) => ({
// //       ...cat,
// //       rank: String(idx + 1),
// //     }));
// //   if (!categorie.length) {
// //     setError("Select at least one product before submitting for approval.");
// //     return;
// //   }
// //   if (selectedPincodeValues.length === 0) {
// //     setError("Select at least one pincode before submitting for approval.");
// //     return;
// //   }
// //   setSubmitting(true);
// //   setError("");
// //   setMessage("");
// //   const hasExistingRecord = !!myProducts?.id;
// //   try {
// //     let submittedCount = 0;
// //     if (hasExistingRecord) {
// //       const mergedCategorie = mergeIntoExistingCategorie(
// //         myProducts,
// //         categorie
// //       );
// //       const updatePayload = {
// //         id: myProducts.id,
// //         VendorId: String(vendorId || ""),
// //         StoreName:
// //           myProducts.storeName ||
// //           pendingCart.storeName ||
// //           vendor.storeName ||
// //           vendor.name ||
// //           "",
// //         status:
// //           myProducts.status ||
// //           pendingCart.status ||
// //           "Pending",
// //         CreatedDate:
// //           myProducts.createdDate ||
// //           pendingCart.createdDate ||
// //           new Date().toISOString(),
// //         UpdatedDate: new Date().toISOString(),
// //         Pincodes: selectedPincodeValues,
// //         Categorie: mergedCategorie,
// //         District:
// //           myProducts.district ||
// //           selectedDistrictName ||
// //           "",
// //         DistrictId:
// //           myProducts.districtId ||
// //           formData.districtId ||
// //           "",
// //         State:
// //           myProducts.state ||
// //           selectedStateName ||
// //           "",
// //         StateId:
// //           myProducts.stateId ||
// //           formData.stateId ||
// //           "",
// //         imageName: "",
// //          existingVendorProducts: myProducts,
// //       };
// //       console.log(
// //         "Vendor Update Products PUT Payload:",
// //         JSON.stringify(updatePayload, null, 2)
// //       );
// //       // const updateResponse = await axios.put(
// //       //   `${VENDOR_UPDATE_PRODUCTS_API}?id=${encodeURIComponent(
// //       //     myProducts.id
// //       //   )}`,
// //       //   updatePayload,
// //       //   {
// //       //     headers: {
// //       //       "Content-Type": "application/json",
// //       //     },
// //       //   }
// //       // );
// //       // console.log(
// //       //   "Vendor Update Products Response:",
// //       //   updateResponse.data
// //       // );


// //       const postPayload = {
// //         id: String(
// //           myProducts.id ||
// //           pendingCart.id ||
// //           ""
// //         ),

// //         vendorId: String(
// //           myProducts.vendorId ||
// //           myProducts.VendorId ||
// //           vendorId ||
// //           ""
// //         ),

// //         storeName:
// //           myProducts.storeName ||
// //           myProducts.StoreName ||
// //           pendingCart.storeName ||
// //           vendor.storeName ||
// //           vendor.name ||
// //           "",

// //         status:
// //           myProducts.status ||
// //           myProducts.Status ||
// //           pendingCart.status ||
// //           "Pending",

// //         createdDate:
// //           myProducts.createdDate ||
// //           myProducts.CreatedDate ||
// //           pendingCart.createdDate ||
// //           new Date().toISOString(),

// //         updatedDate: new Date().toISOString(),
// //         state:
// //           myProducts.state ||
// //           myProducts.State ||
// //           selectedStateName ||
// //           "",
// //         stateId: String(
// //           myProducts.stateId ||
// //           myProducts.StateId ||
// //           formData.stateId ||
// //           ""
// //         ),
// //         image: [],
// //         imageName: "",
// //         district:
// //           myProducts.district ||
// //           myProducts.District ||
// //           selectedDistrictName ||
// //           "",
// //         districtId: String(
// //           myProducts.districtId ||
// //           myProducts.DistrictId ||
// //           formData.districtId ||
// //           ""
// //         ),
// //         pincodes: selectedPincodeValues,
// //          categorie: mergedCategorie.map((cat) => ({
// //         categoryName: cat.CategoryName,
// //           rank: String(cat.Rank),
// //           products: (cat.Products || []).map((p) => ({
// //             productIds: String(p.ProductIds ?? ""),
// //             quantity: String(p.Quantity ?? "0"),
// //             limit: String(p.Limit ?? "0"),
// //             discount: String(p.Discount ?? "0"),
// //           })),
// //         })),
// //       };
// //       console.log(
// //         "Vendor Upload Products POST Payload:",
// //         JSON.stringify(postPayload, null, 2)
// //       );
// //       const postResponse = await axios.post(
// //         VENDOR_UPLOAD_PRODUCTS_API,
// //         postPayload,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       console.log(
// //         "Vendor Upload Products POST Response:",
// //         postResponse.data
// //       );
// //       submittedCount = categorie.reduce(
// //         (sum, cat) => sum + cat.products.length,
// //         0
// //       );
// //     }
// //     else {
// //       const postPayload = {
// //         id: String(pendingCart.id || ""),
// //         vendorId: String(vendorId || ""),
// //         storeName:
// //           pendingCart.storeName ||
// //           vendor.storeName ||
// //           vendor.name ||
// //           "",
// //         status:
// //           pendingCart.status ||
// //           "Pending",
// //         createdDate:
// //           pendingCart.createdDate ||
// //           new Date().toISOString(),
// //         updatedDate: new Date().toISOString(),
// //         state: selectedStateName || "",
// //         stateId: String(formData.stateId || ""),
// //         image: [],
// //         imageName: "",
// //         district: selectedDistrictName || "",
// //         districtId: String(formData.districtId || ""),
// //         pincodes: selectedPincodeValues,
// //         categorie: categorie.map((cat) => ({
// //           categoryName: cat.categoryName,
// //           rank: String(cat.rank),
// //           products: (cat.products || []).map((p) => ({
// //             productIds: String(p.productIds ?? ""),
// //             quantity: String(p.quantity ?? "0"),
// //             limit: String(p.limit ?? "0"),
// //             discount: String(p.discount ?? "0"),
// //           })),
// //         })),
// //       };
// //       console.log(
// //         "Vendor Upload Products POST Payload:",
// //         JSON.stringify(postPayload, null, 2)
// //       );
// //       const response = await axios.post(
// //         VENDOR_UPLOAD_PRODUCTS_API,
// //         postPayload,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       console.log(
// //         "Vendor Upload Products Response:",
// //         response.data
// //       );
// //       submittedCount = categorie.reduce(
// //         (sum, cat) => sum + cat.products.length,
// //         0
// //       );
// //     }
// //     setMessage(
// //       `${submittedCount} product${
// //         submittedCount === 1 ? "" : "s"
// //       } sent to Handyman Admin for approval.`
// //     );
// //     try {
// //       localStorage.removeItem(
// //         pendingCartKey(vendorId)
// //       );
// //     } catch (err) {
// //       console.error(
// //         "Unable to clear pending cart:",
// //         err
// //       );
// //     }

// //     setPendingCart(null);
// //     setFinalSelected({});
// //     invalidateVendorProductsCache(vendorId);
// //     getVendorProductsByVendorId(
// //       vendorId,
// //       { force: true }
// //     )
// //       .then(setMyProducts)
// //       .catch((err) =>
// //         console.error(
// //           "Unable to refresh vendor products:",
// //           err
// //         )
// //       );
// //   } catch (submitError) {
// //     console.error(
// //       "Vendor approval submission failed:",
// //       submitError
// //     );
// //     console.error(
// //       "API Error Response:",
// //       submitError.response?.data
// //     );
// //     setError(
// //       submitError.response?.data?.message ||
// //         "The approval request could not be submitted. Please try again."
// //     );
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };

// //   // Only categories that have at least one Approved product show in
// //   // "Your submitted products".
// // const handleLogout = () => {
// //     localStorage.removeItem("vendorSession");
// //     navigate("/vendor/login");
// //   };

// //   return (
// //     <div
// //       ref={pageRef}
// //       className={isFullScreen ? "container-fluid py-4 pb-5" : "container-xl py-4 pb-5"}
// //       style={{
// //         maxWidth: isFullScreen ? "100%" : "1320px",
// //         backgroundColor: isFullScreen ? "#fff" : undefined,
// //         minHeight: isFullScreen ? "100vh" : undefined,
// //         overflowY: isFullScreen ? "auto" : undefined,
// //       }}
// //     >
// //       <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
// //         <button
// //           type="button"
// //           className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1 mb-0"
// //           onClick={handleBackToProfile}
// //         >
// //           <ArrowBackIcon fontSize="small" /> Back to Profile
// //         </button>
// //       </div>

// //       <div className="border-4 shadow-sm mb-2 overflow-hidden">
// //         <div
// //           className="p-4 d-flex flex-column flex-md-row align-items-md-center gap-3"
// //           style={{
// //             background: "linear-gradient(135deg, #10301F, #2F6B4F)",
// //             color: "white",
// //           }}
// //         >
// //           <div
// //             className="rounded-circle d-flex align-items-center justify-content-center position-relative"
// //             style={{
// //               width: 72,
// //               height: 72,
// //               background: "rgba(255,255,255,.16)",
// //               border: "1px solid rgba(255,255,255,.4)",
// //               cursor: "pointer",
// //             }}
// //             role="button"
// //             title="View orders"
// //             onClick={() => {
// //               setHasNewOrder(false);
// //               navigate(`/vendor/orders/${vendorId}`);
// //             }}
// //           >
// //             <StorefrontIcon fontSize="large" />
// //             <span
// //               className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-white position-absolute${
// //                 hasNewOrder ? " vendor-bell-ring" : ""
// //               }`}
// //               style={{
// //                 width: 30,
// //                 height: 30,
// //                 top: -6,
// //                 right: -6,
// //                 color: "#10301F",
// //                 boxShadow: "0 1px 4px rgba(0,0,0,.35)",
// //               }}
// //             >
// //               <NotificationsActiveIcon fontSize="small" />
// //               {orderCount > 0 && (
// //                 <span
// //                   className="badge rounded-pill bg-danger position-absolute"
// //                   style={{ top: -6, right: -6, fontSize: 10 }}
// //                 >
// //                   {orderCount}
// //                 </span>
// //               )}
// //             </span>
// //           </div>
// //           <div className="flex-grow-1">
// //             <p
// //               className="text-uppercase mb-1 small"
// //               style={{ letterSpacing: ".08em", opacity: 0.8 }}
// //             >
// //               Vendor profile
// //             </p>
// //             <h2 className="mb-1">{vendor.storeName || vendor.name}</h2>
// //             {vendor.storeName && vendor.name && (
// //               <div className="small mb-1" style={{ opacity: 0.85 }}>
// //                 Owner: {vendor.name}
// //               </div>
// //             )}
// //             <div style={{ opacity: 0.85 }}>
// //               {vendor.email} &middot; {vendor.phone}
// //             </div>
// //             {vendor.address && (
// //               <div className="small mt-1" style={{ opacity: 0.75 }}>
// //                 {vendor.address}
// //               </div>
// //             )}
// //           </div>
// //           <div className="d-flex gap-1">
// //             <button
// //               className={`btn btn-light position-relative d-inline-flex align-items-center ${
// //                 hasNewOrder ? " vendor-orders-bell-pulse" : ""
// //               }`}
// //               onClick={() => {
// //                 setHasNewOrder(false);
// //                 navigate(`/vendor/orders/${vendorId}`);
// //               }}
// //             >
// //               <LocalShippingIcon fontSize="small" /> Orders
// //               {orderCount > 0 && (
// //                 <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
// //                   {orderCount}
// //                 </span>
// //               )}
// //             </button>
// //             <button
// //               className="btn btn-light d-inline-flex align-items-center gap-1"
// //               onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
// //             >
// //               <ArrowBackIcon fontSize="small" /> Back to stock
// //             </button>
// //             <button
// //                     className="btn btn-light d-inline-flex align-items-center"
// //                     onClick={handleLogout}
// //                   >
// //                     Logout
// //                   </button>
// //           </div>
// //         </div>
// //       </div>
// //       <style>{`
// //         @keyframes vendorOrdersPulse {
// //           0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, .6); }
// //           70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
// //           100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
// //         }
// //         .vendor-orders-bell-pulse {
// //           animation: vendorOrdersPulse 1.4s ease-out infinite;
// //         }
// //         @keyframes vendorBellRing {
// //           0%, 100% { transform: rotate(0deg); }
// //           10% { transform: rotate(-18deg); }
// //           20% { transform: rotate(16deg); }
// //           30% { transform: rotate(-14deg); }
// //           40% { transform: rotate(12deg); }
// //           50% { transform: rotate(-8deg); }
// //           60% { transform: rotate(6deg); }
// //           70%, 100% { transform: rotate(0deg); }
// //         }
// //         .vendor-bell-ring {
// //           animation: vendorBellRing 1s ease-in-out infinite;
// //           transform-origin: 50% 0%;
// //         }
// //           @media (min-width: 992px) {
// //           .vendor-product-card {
// //             padding: 1.15rem !important;
// //             font-size: 1rem;
// //             min-height: 130px;
// //           }
// //           .vendor-product-card .fw-bold {
// //             font-size: 1.1rem;
// //           }

// //           .vendor-products-grid {
// //             display: grid;
// //             grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
// //             gap: 1.15rem;
// //           }
// //         }
// //       `}</style>

// //       {message && <div className="alert alert-success">{message}</div>}
// //       {error && <div className="alert alert-danger">{error}</div>}

// //       {/* ---- Service area: State -> District -> Pincode (checkbox) ---- */}
// //       <div className="border-0 shadow-sm">
// //         <div className="card-body p-4">
// //           <h3 className="mb-1">Service area</h3>
// //           <p className="text-muted small">
// //   {pincodesLocked
// //     ? "Your selected pincodes are saved and cannot be changed."
// //     : "Select the pincodes you want to serve. You can select or unselect multiple pincodes before submitting."}
// // </p>

// //           <div className="row g-1">
// //            <div className="col-12 col-md-4">
// //     <div className="d-flex align-items-center gap-1">
// //       <label className="form-label small fw-bold mb-0 text-nowrap">State:</label>
// //       <div className="form-control-plaintext fw-semibold text-danger">
// //         {statesLoading ? "Loading…" : selectedStateName || "—"}
// //       </div>
// //     </div>
// //   </div>

// //   <div className="col-12 col-md-4">
// //     <div className="d-flex align-items-center gap-1">
// //       <label className="form-label small fw-bold mb-0 text-nowrap">District:</label>
// //       <div className="form-control-plaintext fw-semibold text-danger">
// //         {districtsLoading ? "Loading…" : selectedDistrictName || "—"}
// //       </div>
// //       </div>
// //     </div>
// //             <div className="col-12 col-md-4">
// //               <label className="form-label small fw-bold">
// //   Pincodes selected -- {selectedPincodeValues.length}
// //   {pincodesLocked && (
// //     <span className="text-success ms-2">
// //       (Locked)
// //     </span>
// //   )}
// // </label>
// //             </div>
// //           </div>

// //           <div className="mt-1">
// //             {!formData.districtId ? (
// //               <p className="text-muted small mb-0">
// //                 Select a district above to see its pincodes.
// //               </p>
// //             ) : pincodesLoading ? (
// //               <div className="text-center py-3">
// //                 <div className="spinner-border spinner-border-sm text-success" />
// //                 <span className="ms-2 small text-muted">
// //                   Loading pincodes…
// //                 </span>
// //               </div>
// //             ) : pincodeList.length === 0 ? (
// //               <p className="text-muted small mb-0">
// //                 No pincodes found for this district.
// //               </p>
// //             ) : (
// //               <div className="row g-2">
// //                 {visiblePincodeList.map((p) => {
// //                   const value = getPincodeValue(p);
// //                   const key = String(value);
// //                   const checked = !!selectedPincodes[key];
// //                   return (
// //                     <div
// //                       className="col-6 col-sm-4 col-md-3"
// //                       key={getPincodeId(p) || key}
// //                     >
// //                       <label
// //                         className={`border rounded p-2 small d-flex align-items-center gap-2 w-60 ${
// //                           checked ? "border-success border-2" : ""
// //                         }`}
// //                         style={{ cursor: "pointer" }}
// //                       >
// //                         <input
// //                           type="checkbox"
// //                           className="form-check-input border-dark"
// //                           checked={checked}
// //                           disabled={pincodesLocked}
// //                           onChange={() => togglePincode(value)}
// //                         />
// //                         {value}
// //                       </label>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* ---- Products picked on the Stock Update page, awaiting final submission (non-approved only) ---- */}
// //       <div className=" border-0 shadow-sm">
// //         <div>
// //           <input
// //             type="text"
// //             className="form-control"
// //             placeholder="Search products or categories…"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //         </div>
// //         <div className="card-body p-4">
// //           <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
// //             <h3 className="mb-0">Products ready to submit</h3>
// //             {pendingProductCount > 0 && (
// //               <span className="badge bg-success fs-6">
// //                 {finalSelectedCount} of {pendingProductCount} selected
// //               </span>
// //             )}
// //           </div>

// //           {!pendingCart || pendingProductCount === 0 ? (
// //             <div className="text-center py-3">
// //               <p className="text-muted mb-3">
// //                 No products picked yet. Go to Stock Update, check the products
// //                 you want to sell and set a discount for each.
// //               </p>
// //               <button
// //                 className="btn btn-outline-success btn-sm"
// //                 onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
// //               >
// //                 Go to Stock Update
// //               </button>
// //             </div>
// //           ) : (
// //             <>
// //               <p className="text-muted small mb-2">
// //                 Use the arrows to arrange the order these categories appear in
// //                 on your storefront.
// //               </p>
// //               {searchedReadyToSubmitCategories.map((cat, index) => {
// //                 const isExpanded = !!expandedCategories[cat.categoryName];
// //                 return (
// //                   <div key={cat.categoryName} className="mb-3">
// //                     <div className="d-flex align-items-center gap-2 mb-2">
// //                       <span className="badge bg-secondary">#{cat.rank}</span>
// //                       <h6
// //                         className="mb-0"
// //                         role="button"
// //                         style={{ cursor: "pointer", userSelect: "none" }}
// //                         onClick={() => toggleCategoryExpanded(cat.categoryName)}
// //                       >
// //                         {cat.categoryName}{" "}
// //                         <span style={{ fontSize: "0.75em" }}>
// //                           {isExpanded ? "▲" : "▼"}
// //                         </span>
// //                       </h6>
// //                       <div className="btn-group btn-group-sm ms-auto" role="group">
// //                         <button
// //                           type="button"
// //                           className="btn btn-outline-secondary"
// //                           title="Move up"
// //                           disabled={index === 0}
// //                           onClick={() => moveCategory(index, -1)}
// //                         >
// //                           &uarr;
// //                         </button>
// //                         <button
// //                           type="button"
// //                           className="btn btn-outline-secondary"
// //                           title="Move down"
// //                           disabled={index === searchedReadyToSubmitCategories.length - 1}
// //                           onClick={() => moveCategory(index, 1)}
// //                         >
// //                           &darr;
// //                         </button>
// //                       </div>
// //                     </div>

// //                     {isExpanded && (
// //                       <div className="vendor-products-grid">
// //                         {cat.products.map((p) => {
// //                           const key = `${cat.categoryName}||${p.productIds}`;
// //                           const checked = !!finalSelected[key];
// //                           return (
// //                             <div key={p.productIds}>
// //                               <label
// //                                 className={`border rounded p-2 small d-flex align-items-start gap-2 w-100 h-100 ${checked ? "border-success border-2" : ""}`}
// //                                 style={{ cursor: "pointer" }}
// //                               >
// //                                 <input
// //                                   type="checkbox"
// //                                   className="form-check-input mt-1"
// //                                   checked={checked}
// //                                   onChange={() => toggleFinalSelected(cat.categoryName, p.productIds)}
// //                                 />
// //                                 <div>
// //                                   <div className="fw-bold">
// //                                     {productNameById[p.productIds] || `Product ${p.productIds}`}
// //                                   </div>
// //                                   <div className="text-muted">
// //                                     Qty: {p.quantity} &middot; Discount: {p.discount}% &middot; Limit: {p.limit ?? 0}
// //                                   </div>
// //                                 </div>
// //                               </label>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               })}

// //               <div className="d-flex justify-content-end mt-3">
// //                 <button
// //                   className="btn btn-success px-4"
// //                   onClick={handleSubmitFinal}
// //                   disabled={submitting || finalSelectedCount === 0}
// //                 >
// //                   {submitting
// //                     ? "Submitting…"
// //                     : `Submit for approval${finalSelectedCount ? ` (${finalSelectedCount})` : ""}`}
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* ---- Vendor's already-submitted products, from the server (Approved only) ---- */}
// //       <div className="border-0 shadow-sm mb-4">
// //         <div className="card-body p-4">
// //           <h3 className="mb-3">Your submitted products</h3>
// //           {myProductsLoading ? (
// //             <div className="text-center py-4">
// //               <div className="spinner-border text-success" />
// //               <p className="mt-2 mb-0">Loading your products…</p>
// //             </div>
// //           ) : searchedApprovedCategories.length > 0 ? (
// //             <>
// //               <span className="badge mb-3 bg-success">Approved</span>
// //               {searchedApprovedCategories.map((cat) => {
// //                 const isExpanded = !!expandedCategories[`approved-${cat.category}`];
// //                 return (
// //                   <div key={cat.category} className="mb-3">
// //                     <h6
// //                       className="mb-2"
// //                       role="button"
// //                       style={{ cursor: "pointer", userSelect: "none" }}
// //                       onClick={() => toggleCategoryExpanded(`approved-${cat.category}`)}
// //                     >
// //                       {cat.category}{" "}
// //                       <span style={{ fontSize: "0.75em" }}>{isExpanded ? "▲" : "▼"}</span>
// //                     </h6>
// //                     {isExpanded && (
// //                       <div className="vendor-products-grid">
// //                         {cat.products.map((p) => (
// //                           <div key={p.productId}>
// //                             <div className="vendor-product-card border rounded p-2 small h-100">
// //                               <div className="d-flex justify-content-between align-items-start gap-2">
// //                                 <div>{p.name || productNameById[p.productId] || `Product ${p.productId}`}</div>
// //                                 <span className="badge bg-success" style={{ fontSize: "10px" }}>Approved</span>
// //                               </div>
// //                               <div>
// //                                 Qty: {p.qty} &middot; Discount: {p.discount}% &middot; Limit: {p.limit}
// //                               </div>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </>
// //           ) : (
// //             <div className="text-center py-3">
// //               <p className="text-muted mb-0">
// //                 No approved products yet — still pending review.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VendorPreviewPage;









// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   getVendorProfileById,
//   updateVendorProfile,
// } from "./utils/vendorStorage";
// import ImageCache from "./utils/ImageCache";
// import { getGroceryItems } from "./utils/groceryStore";

// // Same backend the customer-facing Profile page (and Admin grocery pages) use.
// const API_BASE =
//   "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";
// const ADD_GROCERY_ITEM = `${API_BASE}/UploadGrocery/UploadGrocery`;

// const IMAGE_DOWNLOAD = `${API_BASE}/FileUpload/download?generatedfilename=`;
// const IMAGE_UPLOAD = `${API_BASE}/FileUpload/upload?filename=`;
// const ADD_CATEGORY = `${API_BASE}/Categorie/UploadCategories`;
// // Called directly here (bypassing utils/vendorListStore.js's cached
// // normalizeVendor) so the limit-binding logic below is guaranteed to be
// // the code actually running, regardless of any stale build/cache
// // upstream. Same endpoint vendorListStore.js points at.
// const GET_VENDOR_PRODUCTS_BY_VENDOR_ID = `${API_BASE}/VendorUploadProducts/GetVendorProductsvalues`;

// // Same key VendorPreviewPage reads to show the "ready to submit" list —
// // keep this string identical in both files.
// const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// const BARCODE_FORMATS = [
//   "ean_13",
//   "ean_8",
//   "upc_a",
//   "upc_e",
//   "code_128",
//   "code_39",
//   "qr_code",
// ];

// // Earthy, market-ledger palette used to color-code category ribbons —
// // deterministic per category name so the same category always gets the same tone.
// const CATEGORY_PALETTE = [
//   "#2F6B4F",
//   "#C08A2E",
//   "#7C6A46",
//   "#4C7A8C",
//   "#8C5B4C",
//   "#6B7C4C",
//   "#A24B4B",
//   "#3E5C76",
// ];
// const colorForCategory = (name) => {
//   const str = String(name || "");
//   let hash = 0;
//   for (let i = 0; i < str.length; i++)
//     hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
//   return CATEGORY_PALETTE[hash % CATEGORY_PALETTE.length];
// };

// // Locally-generated fallback image (inline SVG data URI) — used only until
// // the real photo loads, or if a product has no image at all. No external
// // network call, so it never shows up broken.
// const makePlaceholder = (text, bg = "adb5bd", fg = "ffffff") => {
//   const safeText = String(text || "?").slice(0, 22);
//   const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'>
//     <rect width='100%' height='100%' fill='#${bg}'/>
//     <text x='50%' y='50%' font-family='Arial, sans-serif' font-size='26' font-weight='bold'
//       fill='#${fg}' text-anchor='middle' dominant-baseline='middle'>${safeText}</text>
//   </svg>`;
//   return `data:image/svg+xml,${encodeURIComponent(svg)}`;
// };

// const normalizeItem = (p) => ({
//   ...p,
//   stockLeft: Number(p.stockLeft || 0),
//   limit: Number(p.limit || 0),
//   mrp: Number(p.mrp || 0),
//   discount: Number(p.discount || 0),
//   afterDiscount: Number(p.afterDiscount || 0),
// });

// // Reads the RAW response from GetVendorProductsvalues directly — this page
// // now fetches that endpoint itself (see fetchVendorProductsDirect below)
// // instead of going through utils/vendorListStore.js's normalizeVendor, so
// // there's no intermediate caching/normalization layer that could still be
// // running stale code. Handles both a bare vendor object and an array
// // containing one (some backends wrap a single result in an array).
// // Field names match the confirmed live response exactly:
// // { categorie: [{ categoryName, products: [{ productIds, quantity, limit, discount }] }] }
// // but also tolerates the capitalized variants (Categorie/Products/
// // ProductIds/Quantity/Limit/Discount) just in case the API casing ever
// // changes. This is what feeds `pendingLimit`, which the "Per-customer
// // limit" input below reads via getPendingLimit().
// const extractSelectionFromVendorProducts = (vendorProductsRaw) => {
//   const map = {};
//   const qtyMap = {};
//   const limitMap = {};
//   const mrpMap = {};
//   const priceMap = {};
//   const vendorProducts = Array.isArray(vendorProductsRaw)
//     ? vendorProductsRaw[0]
//     : vendorProductsRaw;

//   if (!vendorProducts) return { map, qtyMap, limitMap };

//   const categories =
//     vendorProducts.categorie ||
//     vendorProducts.categories ||
//     vendorProducts.Categorie ||
//     [];

//   categories.forEach((cat) => {
//     const products = cat.products || cat.Products || [];
//     products.forEach((p) => {
//       const productId = p.productIds ?? p.productId ?? p.ProductIds;
//       const qty = p.quantity ?? p.qty ?? p.Quantity;
//       const discount = p.discount ?? p.Discount;
//       const limit = p.limit ?? p.Limit;
//       const mrp = p.mrp ?? p.Mrp;
//       const price = p.price ?? p.Price ?? p.afterDiscount ?? p.AfterDiscount;
//       if (!productId || !(Number(qty) > 0)) return;
//       if (mrp !== undefined) mrpMap[productId] = Number(mrp);
//       if (price !== undefined) priceMap[productId] = Number(price);
//       map[productId] = { checked: true, discount: String(discount ?? "0") };
//       qtyMap[productId] = Number(qty);
//       limitMap[productId] = Number(limit ?? 0);
//     });
//   });

//   return { map, qtyMap, limitMap, mrpMap, priceMap };
// };

// // Direct fetch, bypassing utils/vendorListStore.js's cache/normalizeVendor
// // layer entirely — this guarantees the code above is what actually runs
// // against the real response, independent of any stale cached bundle,
// // sessionStorage entry, or service worker elsewhere in the app.
// const fetchVendorProductsDirect = async (vendorId) => {
//   const res = await fetch(
//     `${GET_VENDOR_PRODUCTS_BY_VENDOR_ID}?vendorId=${encodeURIComponent(vendorId)}`,
//   );
//   if (res.status === 404) return null; // no submission yet — not an error
//   if (!res.ok) throw new Error(`Request failed: ${res.status}`);
//   const data = await res.json();
//   return data;
// };

// const EMPTY_ADD_FORM = {
//   name: "",
//   category: "",
//   newCategory: "",
//   code: "",
//   mrp: "",
//   discount: "0",
//   units: "",
//   deliveryIn: "30",
//   stockLeft: "0",
//   limit: "",
// };

// const VendorStockUpdatePage = () => {
//   const { vendorId } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [items, setItems] = useState([]);
//   const [imageUrls, setImageUrls] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [pendingLimit, setPendingLimit] = useState({});

//   // null = show categories only. Set to a category name (or "All") to view products.
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Locally tracked submission quantities — start at 0. As soon as a
//   // product's quantity goes above 0 it's automatically added to the
//   // submit-for-approval payload; dropping it back to 0 automatically
//   // removes it again. No separate "save" step needed.
//   const [pendingQty, setPendingQty] = useState({});
//   const [showVendorMenu, setShowVendorMenu] = useState(false);

//   // ---- Edit vendor info modal state ----
//   const [showEditVendorModal, setShowEditVendorModal] = useState(false);
//   const [editVendorForm, setEditVendorForm] = useState(null);
//   const [editVendorSaving, setEditVendorSaving] = useState(false);
//   const [editVendorError, setEditVendorError] = useState("");

//   // ---- Add New Product modal state ----
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [addForm, setAddForm] = useState(EMPTY_ADD_FORM);
//   const [addPhoto, setAddPhoto] = useState(null);
//   const [addSaving, setAddSaving] = useState(false);
//   const [addError, setAddError] = useState("");
//   const [codeMode, setCodeMode] = useState("manual"); // "manual" | "scan"
//   const [scanning, setScanning] = useState(false);
//   const [scanError, setScanError] = useState("");
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const scanFrameRef = useRef(null);
//   const [pendingMrp, setPendingMrp] = useState({});
//   const [pendingPrice, setPendingPrice] = useState({});
//   const [mrpInputText, setMrpInputText] = useState({});
//   const [priceInputText, setPriceInputText] = useState({});
//   const [selection, setSelection] = useState({});
//   const hydratedSelectionRef = useRef(false);
//   const hydratedBackendRef = useRef(false);
//   const [qtyInputText, setQtyInputText] = useState({});
//   const originalValuesRef = useRef({});
//   const getPendingMrp = (item) => Number(pendingMrp[item.id] ?? item.mrp ?? 0);

//   // ---- Add New Category modal state ----
//   const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [addCategorySaving, setAddCategorySaving] = useState(false);
//   const [addCategoryError, setAddCategoryError] = useState("");
//   // Categories created via the popup, before any product uses them yet —
//   // merged into the dropdown so they're selectable immediately.
//   const [customCategories, setCustomCategories] = useState([]);

//   const getPendingPrice = (item) =>
//     Number(pendingPrice[item.id] ?? item.afterDiscount ?? item.mrp ?? 0);

//   const handleMrpInputChange = (itemId, rawValue) => {
//     setMrpInputText((prev) => ({ ...prev, [itemId]: rawValue }));
//     const next = Math.max(0, Number(rawValue) || 0);
//     setPendingMrp((prev) => ({ ...prev, [itemId]: next }));
//   };

//   const handlePriceInputChange = (itemId, rawValue) => {
//     setPriceInputText((prev) => ({ ...prev, [itemId]: rawValue }));
//     const next = Math.max(0, Number(rawValue) || 0);
//     setPendingPrice((prev) => ({ ...prev, [itemId]: next }));
//   };

//   const getMrpDisplayValue = (item) => {
//     if (mrpInputText[item.id] !== undefined) return mrpInputText[item.id];
//     const mrp = getPendingMrp(item);
//     return mrp === 0 ? "" : mrp;
//   };

//   const getPriceDisplayValue = (item) => {
//     if (priceInputText[item.id] !== undefined) return priceInputText[item.id];
//     const price = getPendingPrice(item);
//     return price === 0 ? "" : price;
//   };

//   // Vendor session check.
//   useEffect(() => {
//     const sessionId = localStorage.getItem("vendorSession");
//     if (!sessionId || sessionId !== vendorId) {
//       navigate("/vendor/login");
//       return;
//     }
//     const vendorProfile = getVendorProfileById(vendorId);
//     if (!vendorProfile) {
//       navigate("/vendor/login");
//       return;
//     }
//     setVendor(vendorProfile);
//   }, [vendorId, navigate]);

//   const openEditVendorModal = () => {
//     if (!vendor) return;
//     setEditVendorForm({
//       name: vendor.name || "",
//       storeName: vendor.storeName || "",
//       phone: vendor.phone || "",
//       email: vendor.email || "",
//       address: vendor.address || "",
//     });
//     setEditVendorError("");
//     setShowEditVendorModal(true);
//   };

//   const handleEditVendorFieldChange = (field, value) => {
//     setEditVendorForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSaveVendorInfo = (event) => {
//     event.preventDefault();
//     if (!editVendorForm) return;
//     if (!editVendorForm.name.trim() || !editVendorForm.phone.trim()) {
//       setEditVendorError("Name and phone are required.");
//       return;
//     }
//     setEditVendorSaving(true);
//     setEditVendorError("");
//     try {
//       const updated = updateVendorProfile(vendorId, {
//         name: editVendorForm.name.trim(),
//         storeName: editVendorForm.storeName.trim(),
//         phone: editVendorForm.phone.trim(),
//         email: editVendorForm.email.trim(),
//         address: editVendorForm.address.trim(),
//       });
//       if (updated) {
//         setVendor(updated);
//         setShowEditVendorModal(false);
//         setMessage("Vendor information updated.");
//         setTimeout(() => setMessage(""), 3000);
//       } else {
//         setEditVendorError("Unable to save changes. Please try again.");
//       }
//     } catch (err) {
//       console.error("Failed to update vendor info", err);
//       setEditVendorError("Unable to save changes. Please try again.");
//     } finally {
//       setEditVendorSaving(false);
//     }
//   };

//   const fetchItems = async (showLoader = false, force = false) => {
//     if (showLoader) setLoading(true);
//     setError("");
//     try {
//       // Shared cache with Profile/Vendor-preview pages. Pass force=true
//       // after a mutation (add/update stock) so this page — and every page
//       // that reads the catalog afterward — gets the fresh data.
//       const data = await getGroceryItems({ force });
//       const normalized = (Array.isArray(data) ? data : []).map(normalizeItem);
//       setItems(normalized);
//       // Submission quantities/limits are a standing selection, not a delta
//       // against live stock, so they deliberately survive a catalog refresh.
//     } catch (err) {
//       console.error("Failed to fetch grocery items", err);
//       setError("Unable to load products right now. Please try again.");
//     } finally {
//       if (showLoader) setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!vendor) return;
//     fetchItems(true);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor]);

//   // ---- Hydrate from the backend's already-submitted record (if any) ----
//   useEffect(() => {
//     if (!vendor || hydratedBackendRef.current) return;
//     hydratedBackendRef.current = true;
//     (async () => {
//       try {
//         const vendorProducts = await fetchVendorProductsDirect(vendorId);

//         console.log(
//           "RAW response from GetVendorProductsvalues:",
//           JSON.stringify(vendorProducts, null, 2),
//         );

//         const { map, qtyMap, limitMap, mrpMap, priceMap } =
//           extractSelectionFromVendorProducts(vendorProducts);
//         const baseline = {};
//         Object.keys(map).forEach((productId) => {
//           baseline[productId] = {
//             quantity: String(qtyMap[productId] ?? 0),
//             discount: String(map[productId]?.discount ?? "0"),
//             limit: String(limitMap[productId] ?? 0),
//             mrp: String(mrpMap[productId] ?? ""),
//             price: String(priceMap[productId] ?? ""),
//           };
//         });
//         originalValuesRef.current = baseline;

//         if (Object.keys(map).length)
//           setSelection((prev) => ({ ...map, ...prev }));
//         if (Object.keys(qtyMap).length)
//           setPendingQty((prev) => ({ ...qtyMap, ...prev }));
//         if (Object.keys(limitMap).length)
//           setPendingLimit((prev) => ({ ...limitMap, ...prev }));
//         if (Object.keys(mrpMap).length)
//           setPendingMrp((prev) => ({ ...mrpMap, ...prev }));
//         if (Object.keys(priceMap).length)
//           setPendingPrice((prev) => ({ ...priceMap, ...prev }));
//       } catch (err) {
//         // No submission yet (404) or a network hiccup — fine, just start
//         // from whatever the localStorage draft below provides (or blank).
//         console.error(
//           "Failed to load vendor's existing submitted products",
//           err,
//         );
//       }
//     })();
//   }, [vendor, vendorId]);

//   // A product is "updated" if either:
//   //  (a) it's a brand-new selection not present in the backend's last
//   //      submitted record, OR
//   //  (b) it IS in the backend record but at least one editable field
//   //      (quantity/discount/limit/mrp/price) differs from that baseline.
//   const isProductUpdated = (item) => {
//     const baseline = originalValuesRef.current[item.id];

//     const current = {
//       quantity: String(pendingQty[item.id] || 0),
//       discount: String(selection[item.id]?.discount ?? item.discount ?? 0),
//       limit: String(pendingLimit[item.id] ?? item.limit ?? 0),
//       mrp: String(pendingMrp[item.id] ?? item.mrp ?? 0),
//       price: String(
//         pendingPrice[item.id] ?? item.afterDiscount ?? item.mrp ?? 0,
//       ),
//     };

//     if (!baseline) return true; // never submitted before -> it's new/updated

//     return (
//       current.quantity !== baseline.quantity ||
//       current.discount !== baseline.discount ||
//       current.limit !== baseline.limit ||
//       current.mrp !== baseline.mrp ||
//       current.price !== baseline.price
//     );
//   };

//   // Restore any products the vendor already checked/discounted/limited last
//   // time they were on this page, so the cart survives navigation/reloads.
//   // This is the OVERLAY layer: it merges on top of (and, for shared product
//   // ids, overrides) whatever the backend hydration above already set.
//   useEffect(() => {
//     if (hydratedSelectionRef.current || !items.length) return;
//     hydratedSelectionRef.current = true;
//     try {
//       const raw = localStorage.getItem(pendingCartKey(vendorId));
//       if (!raw) return;
//       const saved = JSON.parse(raw);
//       const map = {};
//       const qtyMap = {};
//       const limitMap = {};
//       const mrpMap = {};
//       const priceMap = {};
//       (saved.categorie || []).forEach((cat) => {
//         (cat.products || []).forEach((p) => {
//           if (p?.productIds) {
//             map[p.productIds] = {
//               checked: true,
//               discount: String(p.discount ?? "0"),
//             };
//             qtyMap[p.productIds] = Number(p.quantity || 0);
//             limitMap[p.productIds] = Number(p.limit ?? 0);
//             if (p.mrp !== undefined) mrpMap[p.productIds] = Number(p.mrp);
//             if (p.price !== undefined) priceMap[p.productIds] = Number(p.price);
//           }
//         });
//       });
//       if (Object.keys(map).length)
//         setSelection((prev) => ({ ...prev, ...map }));
//       if (Object.keys(qtyMap).length)
//         setPendingQty((prev) => ({ ...prev, ...qtyMap }));
//       if (Object.keys(limitMap).length)
//         setPendingLimit((prev) => ({ ...prev, ...limitMap }));
//       if (Object.keys(mrpMap).length)
//         setPendingMrp((prev) => ({ ...mrpMap, ...prev }));
//       if (Object.keys(priceMap).length)
//         setPendingPrice((prev) => ({ ...priceMap, ...prev }));
//     } catch (err) {
//       // ignore malformed/old local cart
//     }
//   }, [items, vendorId]);

//   // Auto-construct the submission payload from whichever products currently
//   // have a quantity greater than 0, and auto-save it to localStorage in the
//   // exact shape vendorUploadProducts expects — every time quantity,
//   // discount, or limit changes, no separate "save" step. Dropping a
//   // product's quantity back to 0 drops it out of this payload automatically.
//   useEffect(() => {
//     if (!vendor) return;
//     const selectedItems = items.filter(
//       (it) => !!selection[it.id]?.checked && isProductUpdated(it),
//     );
//     const categorieMap = {};
//     selectedItems.forEach((item) => {
//       const categoryName = item.category || "Unspecified";
//       if (!categorieMap[categoryName]) categorieMap[categoryName] = [];
//       categorieMap[categoryName].push({
//         productIds: String(item.id || ""),
//         quantity: String(pendingQty[item.id] || 0),
//         discount: String(selection[item.id]?.discount ?? item.discount ?? 0),
//         limit: String(pendingLimit[item.id] ?? item.limit ?? 0),
//         mrp: String(pendingMrp[item.id] ?? item.mrp ?? 0),
//         price: String(
//           pendingPrice[item.id] ?? item.afterDiscount ?? item.mrp ?? 0,
//         ),
//       });
//     });
//     const payload = {
//       id: "",
//       vendorId: String(vendorId || ""),
//       storeName: vendor.storeName || vendor.name || "",
//       status: "Pending",
//       createdDate: new Date().toISOString(),
//       updatedDate: new Date().toISOString(),
//       pincodes: Array.isArray(vendor.pincodes) ? vendor.pincodes : [],
//       categorie: Object.keys(categorieMap).map((categoryName) => ({
//         categoryName,
//         products: categorieMap[categoryName],
//       })),
//     };
//     try {
//       localStorage.setItem(pendingCartKey(vendorId), JSON.stringify(payload));
//     } catch (err) {}
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     selection,
//     pendingQty,
//     pendingLimit,
//     pendingMrp,
//     pendingPrice,
//     items,
//     vendor,
//     vendorId,
//   ]);

//   // Same image-loading pattern as GroceryItems.js / ProfilePage.js:
//   // check IndexedDB cache first, otherwise download + cache.
//   useEffect(() => {
//     if (!items.length) return;
//     const controller = new AbortController();
//     let cancelled = false;

//     (async () => {
//       for (const item of items) {
//         const filename = Array.isArray(item.images) ? item.images[0] : null;
//         if (!filename || imageUrls[item.id]) continue;
//         try {
//           const cached = await ImageCache.getBase64(filename);
//           if (cancelled) return;
//           if (cached) {
//             setImageUrls((prev) => ({
//               ...prev,
//               [item.id]: `data:image/jpeg;base64,${cached}`,
//             }));
//             continue;
//           }
//           const res = await fetch(
//             `${IMAGE_DOWNLOAD}${encodeURIComponent(filename)}`,
//             {
//               signal: controller.signal,
//             },
//           );
//           const json = await res.json();
//           const b64 = json?.imageData || "";
//           if (!b64 || cancelled) continue;
//           await ImageCache.setBase64(filename, b64);
//           if (!cancelled) {
//             setImageUrls((prev) => ({
//               ...prev,
//               [item.id]: `data:image/jpeg;base64,${b64}`,
//             }));
//           }
//         } catch (e) {
//           // ignore aborted/failed image fetch — card falls back to a placeholder
//         }
//       }
//     })();

//     return () => {
//       cancelled = true;
//       controller.abort();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [items]);

//   const categories = useMemo(() => {
//     const unique = Array.from(
//       new Set([
//         ...items.map((i) => i.category || "Unspecified"),
//         ...customCategories,
//       ]),
//     ).sort();
//     return unique;
//   }, [items, customCategories]);

//   const displayedItems = useMemo(() => {
//     if (!selectedCategory) return [];
//     let list =
//       selectedCategory === "All"
//         ? items
//         : items.filter(
//             (i) => (i.category || "Unspecified") === selectedCategory,
//           );
//     if (searchQuery.trim()) {
//       const q = searchQuery.trim().toLowerCase();
//       list = list.filter((i) => i.name?.toLowerCase().includes(q));
//     }
//     return list;
//   }, [items, selectedCategory, searchQuery]);

//   const totalProducts = items.length;
//   const totalStock = items.reduce(
//     (sum, item) => sum + Number(item.stockLeft || 0),
//     0,
//   );
//   const dirtyIds = useMemo(
//     () => Object.keys(pendingQty).filter((id) => Number(pendingQty[id]) > 0),
//     [pendingQty],
//   );

//   const getCategoryImage = (category) => {
//     if (category === "All") return makePlaceholder("All", "6c757d", "ffffff");
//     const match = items.find(
//       (i) => (i.category || "Unspecified") === category && imageUrls[i.id],
//     );
//     return match
//       ? imageUrls[match.id]
//       : makePlaceholder(category, "adb5bd", "ffffff");
//   };

//   const getProductImage = (item) =>
//     imageUrls[item.id] || makePlaceholder(item.name, "adb5bd", "ffffff");

//   const getPendingQty = (itemId) => Number(pendingQty[itemId] || 0);

//   const isSelectedForSubmission = (itemId) => !!selection[itemId]?.checked;
//   const getSelectionDiscount = (item) =>
//     selection[item.id]?.discount ?? String(item.discount ?? 0);

//   const getPendingLimit = (item) =>
//     Number(pendingLimit[item.id] ?? item.limit ?? 0);

//   const toggleSelectForSubmission = (item) => {
//     const currentlyChecked = !!selection[item.id]?.checked;

//     if (currentlyChecked) {
//       setSelection((prev) => {
//         const next = { ...prev };
//         delete next[item.id];
//         return next;
//       });
//       setPendingQty((prev) => ({ ...prev, [item.id]: 0 }));
//       setQtyInputText((prev) => {
//         const next = { ...prev };
//         delete next[item.id];
//         return next;
//       });
//     } else {
//       // Check: mark it selected for submission — do NOT force quantity to 1.
//       // Quantity stays whatever it currently is (0 if untouched).
//       setSelection((prev) => ({
//         ...prev,
//         [item.id]: {
//           checked: true,
//           discount: prev[item.id]?.discount ?? String(item.discount ?? 0),
//         },
//       }));
//     }
//   };

//   const getCategoryItems = (category) => {
//     return items.filter(
//       (item) => (item.category || "Unspecified") === category,
//     );
//   };

//   const isCategorySelected = (category) => {
//     const categoryItems = getCategoryItems(category);
//     if (categoryItems.length === 0) return false;
//     return categoryItems.every((item) => !!selection[item.id]?.checked);
//   };

//   const toggleCategorySelection = (category) => {
//     const categoryItems = getCategoryItems(category);
//     const shouldSelect = !isCategorySelected(category);

//     setSelection((prevSelection) => {
//       const nextSelection = { ...prevSelection };
//       categoryItems.forEach((item) => {
//         if (shouldSelect) {
//           nextSelection[item.id] = {
//             checked: true,
//             discount: String(
//               prevSelection[item.id]?.discount ?? item.discount ?? 0,
//             ),
//           };
//         } else {
//           delete nextSelection[item.id];
//         }
//       });
//       return nextSelection;
//     });

//     if (!shouldSelect) {
//       // Unselecting the category also resets those items' restock qty to 0.
//       setPendingQty((prevQty) => {
//         const nextQty = { ...prevQty };
//         categoryItems.forEach((item) => {
//           nextQty[item.id] = 0;
//         });
//         return nextQty;
//       });
//     }
//     // Selecting the category leaves quantities as-is (default 0).
//   };

//   // ---- Direct-typing handlers for the plain number inputs ----
//   const handleQtyInputChange = (itemId, rawValue, item) => {
//     // Keep exactly what the user typed for display (allows "0", "", "05" while typing)
//     setQtyInputText((prev) => ({ ...prev, [itemId]: rawValue }));

//     const next = Math.max(0, Number(rawValue) || 0);
//     setPendingQty((prev) => ({ ...prev, [itemId]: next }));
//     setSelection((prevSel) => {
//       if (next > 0) {
//         const current = prevSel[itemId];
//         return {
//           ...prevSel,
//           [itemId]: {
//             checked: true,
//             discount: current?.discount ?? String(item?.discount ?? 0),
//           },
//         };
//       }
//       if (!prevSel[itemId]) return prevSel;
//       const nextSel = { ...prevSel };
//       delete nextSel[itemId];
//       return nextSel;
//     });
//   };

//   const getQtyDisplayValue = (itemId) => {
//     // If the user has typed something (even "0"), show exactly that.
//     if (qtyInputText[itemId] !== undefined) return qtyInputText[itemId];
//     // Otherwise fall back to the numeric state (blank if 0/untouched).
//     const qty = getPendingQty(itemId);
//     return qty === 0 ? "" : qty;
//   };

//   const handleLimitInputChange = (itemId, rawValue, item) => {
//     const liveStock = Number(item.stockLeft || 0);
//     const next = Math.max(0, Math.min(Number(rawValue) || 0, liveStock));
//     setPendingLimit((prev) => ({ ...prev, [itemId]: next }));
//   };

//   const updateSelectionDiscount = (item, value) => {
//     setSelection((prev) => ({
//       ...prev,
//       [item.id]: {
//         checked: !!prev[item.id]?.checked, // <-- was: getPendingQty(item.id) > 0
//         discount: value,
//       },
//     }));
//   };

//   const selectedForSubmissionCount = useMemo(
//     () => Object.values(selection).filter((s) => s?.checked).length,
//     [selection],
//   );

//   const handleRefresh = () => {
//     fetchItems(true, true); // explicit user refresh — bypass the shared cache
//     setShowVendorMenu(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("vendorSession");
//     navigate("/vendor/login");
//   };

//   const handlePreview = () => {
//     // Preview the vendor's own profile, not the customer-facing profile.
//     navigate(`/vendor/preview/${vendorId}`);
//   };

//   const handleBackToProfile = () => {
//     navigate(`/profilePage/customer/${vendorId}`);
//   };

//   const handleCategorySelect = (category) => {
//     if (category !== "All") {
//       const key = `vendorSelectedCategories-${vendorId}`;
//       const previous = JSON.parse(localStorage.getItem(key) || "[]");
//       if (!previous.includes(category))
//         localStorage.setItem(key, JSON.stringify([...previous, category]));
//     }
//     setSelectedCategory(category);
//   };

//   // ---- Barcode scanning ----
//   const stopScan = () => {
//     if (scanFrameRef.current) {
//       cancelAnimationFrame(scanFrameRef.current);
//       scanFrameRef.current = null;
//     }
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     setScanning(false);
//   };

//   const startScan = async () => {
//     setScanError("");
//     if (!("BarcodeDetector" in window)) {
//       setScanError(
//         "Live barcode scanning isn't supported in this browser. Try Chrome on Android or desktop Chrome, or enter the code manually.",
//       );
//       return;
//     }
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//       }
//       setScanning(true);

//       // eslint-disable-next-line no-undef
//       const detector = new BarcodeDetector({ formats: BARCODE_FORMATS });

//       const tick = async () => {
//         if (!videoRef.current || !streamRef.current) return;
//         try {
//           const barcodes = await detector.detect(videoRef.current);
//           if (barcodes.length > 0) {
//             const value = barcodes[0].rawValue;
//             setAddForm((prev) => ({ ...prev, code: value }));
//             stopScan();
//             return;
//           }
//         } catch (e) {
//           // detection hiccup — keep trying on next frame
//         }
//         scanFrameRef.current = requestAnimationFrame(tick);
//       };
//       scanFrameRef.current = requestAnimationFrame(tick);
//     } catch (err) {
//       console.error("Camera access failed", err);
//       setScanError(
//         "Couldn't access the camera. Check permissions, or enter the code manually.",
//       );
//     }
//   };

//   useEffect(() => {
//     // Stop the camera whenever the modal closes or the mode switches away from scanning.
//     if (!showAddModal || codeMode !== "scan") {
//       stopScan();
//     }
//     return () => stopScan();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showAddModal, codeMode]);

//   // ---- Add New Product ----

//   const openAddModal = () => {
//     setAddForm(EMPTY_ADD_FORM);
//     setAddPhoto(null);
//     setAddError("");
//     setCodeMode("manual");
//     setShowAddModal(true);
//     setShowVendorMenu(false);
//   };

//   const closeAddModal = () => {
//     stopScan();
//     setShowAddModal(false);
//   };

//   const updateAddForm = (field, value) => {
//     setAddForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const getFileByteArray = (file) =>
//     new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(new Uint8Array(reader.result));
//       reader.readAsArrayBuffer(file);
//     });

//   const uploadAddPhoto = async (file) => {
//     try {
//       const byteArray = await getFileByteArray(file);
//       const formData = new FormData();
//       formData.append(
//         "file",
//         new Blob([byteArray], { type: file.type }),
//         file.name,
//       );
//       formData.append("fileName", file.name);
//       const response = await fetch(`${IMAGE_UPLOAD}${file.name}`, {
//         method: "POST",
//         headers: { Accept: "text/plain" },
//         body: formData,
//       });
//       const responseData = await response.text();
//       return responseData || "";
//     } catch (err) {
//       console.error("Photo upload failed", err);
//       return "";
//     }
//   };

//   const validateAddForm = () => {
//     const finalCategory = addForm.category;
//     if (!addForm.name.trim()) return "Product name is required.";
//     if (!finalCategory) return "Category is required.";
//     if (!addForm.units.trim()) return "Units are required (e.g. 1kg, 500ml).";
//     if (!addForm.code.trim())
//       return "Product code is required — scan a barcode or enter one manually.";
//     if (!addForm.mrp || isNaN(addForm.mrp))
//       return "A valid price (MRP) is required.";
//     if (addForm.discount === "" || isNaN(addForm.discount))
//       return "A valid discount is required (0 if none).";
//     if (!addForm.deliveryIn.toString().trim())
//       return "Delivery time (minutes) is required.";
//     if (addForm.stockLeft === "" || isNaN(addForm.stockLeft))
//       return "A valid starting stock quantity is required.";
//     return null;
//   };

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validateAddForm();
//     if (validationError) {
//       setAddError(validationError);
//       return;
//     }
//     setAddError("");
//     setAddSaving(true);
//     try {
//       let images = [];
//       if (addPhoto) {
//         const src = await uploadAddPhoto(addPhoto);
//         if (src) images = [src];
//       }
//       const finalCategory = addForm.category;
//       const mrp = parseFloat(addForm.mrp);
//       const discount = parseFloat(addForm.discount || 0);
//       const payload = {
//         id: "unique-id",
//         date: new Date().toISOString(),
//         vendorId: String(vendorId || ""),
//         GroceryItemId: "string",
//         name: addForm.name.trim(),
//         category: finalCategory,
//         images,
//         mrp: mrp.toString(),
//         discount: discount.toString(),
//         afterDiscount: (mrp - (mrp * discount) / 100).toString(),
//         stockLeft: addForm.stockLeft,
//         deliveryIn: addForm.deliveryIn,
//         status: "Pending Approval",
//         requestedBy: vendor?.name || "Vendor",
//         Code: addForm.code.trim(),
//         Units: addForm.units.trim(),
//         ManufactureDate: "",
//         ExpireDate: "",
//         Limit: addForm.limit ? addForm.limit.toString() : "",
//       };
//       const response = await fetch(ADD_GROCERY_ITEM, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error("Add product request failed");

//       setMessage(`"${addForm.name}" submitted (pending approval).`);
//       setTimeout(() => setMessage(""), 4000);
//       setShowAddModal(false);
//       fetchItems(true, true); // just mutated the catalog — force past the cache
//     } catch (err) {
//       console.error("Failed to add product", err);
//       setAddError("Unable to add this product right now. Please try again.");
//     } finally {
//       setAddSaving(false);
//     }
//   };

//   // ---- Add New Category ----

//   const openAddCategoryModal = () => {
//     setNewCategoryName("");
//     setAddCategoryError("");
//     setShowAddCategoryModal(true);
//   };

//   const closeAddCategoryModal = () => {
//     if (addCategorySaving) return;
//     setShowAddCategoryModal(false);
//   };

//   const handleAddCategorySubmit = async (e) => {
//     e.preventDefault();
//     const trimmed = newCategoryName.trim();
//     if (!trimmed) {
//       setAddCategoryError("Category name is required.");
//       return;
//     }
//     setAddCategoryError("");
//     setAddCategorySaving(true);
//     try {
//       const payload = {
//         id: "",
//         Images: [],
//         CategoryName: trimmed,
//         Status: "Pending Approval",
//         Date: new Date().toISOString(),
//         VendorId: String(vendorId || ""),
//       };
//       const response = await fetch(ADD_CATEGORY, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error("Add category request failed");

//       setCustomCategories((prev) =>
//         prev.includes(trimmed) ? prev : [...prev, trimmed],
//       );
//       // Auto-select the new category on the Add Product form the user was just on.
//       setAddForm((prev) => ({ ...prev, category: trimmed }));
//       setMessage(`Category "${trimmed}" added.`);
//       setTimeout(() => setMessage(""), 3000);
//       setShowAddCategoryModal(false);
//     } catch (err) {
//       console.error("Failed to add category", err);
//       setAddCategoryError(
//         "Unable to add this category right now. Please try again.",
//       );
//     } finally {
//       setAddCategorySaving(false);
//     }
//   };

//   if (!vendor) {
//     return null;
//   }

//   return (
//     <div className="vsu-page" style={{ position: "relative" }}>
//       <div className="container py-4">
//         {/* Back to Preview */}
//         <button
//           type="button"
//           className="vsu-back-btn mb-3"
//           onClick={handlePreview}
//         >
//           <ArrowBackIcon fontSize="small" /> Back to Preview
//         </button>

//         {/* Header */}
//         <div className="vsu-header p-4 p-md-5 mb-4">
//           <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
//             <div className="d-flex align-items-center gap-3">
//               <div className="vsu-avatar">
//                 {vendor.name?.charAt(0)?.toUpperCase() || "V"}
//               </div>
//               <div>
//                 <h2 className="vsu-title mb-1" style={{ fontSize: "28px" }}>
//                   {vendor.name}
//                 </h2>
//                 {vendor.storeName && (
//                   <p
//                     className="mb-1"
//                     style={{ opacity: 0.85, fontSize: "14px" }}
//                   >
//                     {vendor.storeName}
//                   </p>
//                 )}
//                 <p className="mb-2" style={{ opacity: 0.85, fontSize: "14px" }}>
//                   {vendor.email} · {vendor.phone}
//                 </p>
//                 {vendor.address && (
//                   <p
//                     className="mb-2"
//                     style={{ opacity: 0.75, fontSize: "13px" }}
//                   >
//                     {vendor.address}
//                   </p>
//                 )}
//                 <span className="vsu-pill">
//                   <StorefrontIcon style={{ fontSize: "14px" }} /> Vendor stock
//                   manager
//                 </span>
//               </div>
//             </div>
//             <button
//               type="button"
//               className="btn btn-sm vsu-btn-gold-outline"
//               onClick={openEditVendorModal}
//             >
//               Edit
//             </button>
//           </div>
//         </div>

//         {showEditVendorModal && editVendorForm && (
//           <div
//             className="vsu-modal-backdrop"
//             style={{
//               position: "fixed",
//               inset: 0,
//               background: "rgba(0,0,0,0.5)",
//               zIndex: 1050,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "16px",
//             }}
//             onClick={() => !editVendorSaving && setShowEditVendorModal(false)}
//           >
//             <div
//               className="bg-white rounded-4 shadow-lg p-4"
//               style={{ width: "100%", maxWidth: "480px" }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h5 className="mb-0">Edit vendor information</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setShowEditVendorModal(false)}
//                   disabled={editVendorSaving}
//                 />
//               </div>

//               <form onSubmit={handleSaveVendorInfo}>
//                 <div className="mb-3">
//                   <label className="form-label">Owner name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editVendorForm.name}
//                     onChange={(e) =>
//                       handleEditVendorFieldChange("name", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Store name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editVendorForm.storeName}
//                     onChange={(e) =>
//                       handleEditVendorFieldChange("storeName", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={editVendorForm.phone}
//                     onChange={(e) =>
//                       handleEditVendorFieldChange("phone", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={editVendorForm.email}
//                     onChange={(e) =>
//                       handleEditVendorFieldChange("email", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Address</label>
//                   <textarea
//                     className="form-control"
//                     rows={2}
//                     value={editVendorForm.address}
//                     onChange={(e) =>
//                       handleEditVendorFieldChange("address", e.target.value)
//                     }
//                   />
//                 </div>

//                 {editVendorError && (
//                   <div className="alert alert-danger py-2">
//                     {editVendorError}
//                   </div>
//                 )}

//                 <div className="d-flex gap-2 justify-content-end">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowEditVendorModal(false)}
//                     disabled={editVendorSaving}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn vsu-btn-primary"
//                     disabled={editVendorSaving}
//                   >
//                     {editVendorSaving ? "Saving..." : "Save changes"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Stats */}
//         <div className="row g-3 mb-4">
//           <div className="col-12 col-md-4">
//             <div className="vsu-stat-card">
//               <div
//                 className="vsu-stat-icon"
//                 style={{
//                   background: "linear-gradient(135deg,#1B4332,#2F6B4F)",
//                 }}
//               >
//                 <Inventory2Icon fontSize="small" />
//               </div>
//               <div>
//                 <div className="vsu-stat-value">{totalProducts}</div>
//                 <div className="vsu-stat-label">Total products</div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div className="vsu-stat-card">
//               <div
//                 className="vsu-stat-icon"
//                 style={{
//                   background: "linear-gradient(135deg,#3E5C76,#4C7A8C)",
//                 }}
//               >
//                 <LocalShippingIcon fontSize="small" />
//               </div>
//               <div>
//                 <div className="vsu-stat-value">{totalStock}</div>
//                 <div className="vsu-stat-label">Total live stock</div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div className="vsu-stat-card">
//               <div
//                 className="vsu-stat-icon"
//                 style={{
//                   background: "linear-gradient(135deg,#C08A2E,#E0AE52)",
//                 }}
//               >
//                 <PendingActionsIcon fontSize="small" />
//               </div>
//               <div>
//                 <div className="vsu-stat-value">{dirtyIds.length}</div>
//                 <div className="vsu-stat-label">Pending restock entries</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {message && (
//           <div className="alert alert-success rounded-4 border-0 shadow-sm">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="alert alert-danger rounded-4 border-0 shadow-sm">
//             {error}
//           </div>
//         )}

//         {/* ---- Categories-only landing view ---- */}
//         {!selectedCategory ? (
//           <div className="mb-4">
//             <h3 className="vsu-section-heading mb-1">Choose a category</h3>
//             <p className="text-muted mb-3">
//               Select a category to view and restock its products.
//             </p>

//             {loading ? (
//               <div className="vsu-empty">
//                 <div
//                   className="spinner-border text-success mb-2"
//                   role="status"
//                   style={{ width: "2rem", height: "2rem" }}
//                 />
//                 <p className="mb-0">Gathering today's stock...</p>
//               </div>
//             ) : categories.length === 0 ? (
//               <div className="vsu-empty">
//                 <p className="mb-1 fw-bold">No categories yet</p>
//                 <p className="mb-0">
//                   Add your first product to start building out your catalog.
//                 </p>
//               </div>
//             ) : (
//               <div className="d-flex flex-wrap gap-3">
//                 <div
//                   className="vsu-cat-tile"
//                   onClick={() => handleCategorySelect("All")}
//                 >
//                   <div
//                     className="vsu-cat-ribbon"
//                     style={{ background: "#16311F" }}
//                   />
//                   <div className="vsu-cat-body">
//                     <img
//                       loading="lazy"
//                       decoding="async"
//                       src={getCategoryImage("All")}
//                       alt="All"
//                       className="vsu-cat-img"
//                     />
//                     <span className="vsu-cat-label">All Products</span>
//                   </div>
//                 </div>
//                 {categories.map((category) => (
//                   <div
//                     key={category}
//                     className="vsu-cat-tile position-relative"
//                     onClick={() => handleCategorySelect(category)}
//                   >
//                     <label
//                       className="position-absolute d-flex align-items-center justify-content-center"
//                       style={{
//                         top: "8px",
//                         left: "8px",
//                         zIndex: 10,
//                         background: "#fff",
//                         borderRadius: "6px",
//                         width: "28px",
//                         height: "28px",
//                         boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                         cursor: "pointer",
//                       }}
//                       onClick={(e) => e.stopPropagation()}
//                       title={`Select all ${category} products`}
//                     >
//                       <input
//                         type="checkbox"
//                         className="form-check-input m-0"
//                         style={{
//                           width: "18px",
//                           height: "18px",
//                           cursor: "pointer",
//                         }}
//                         checked={isCategorySelected(category)}
//                         onChange={() => toggleCategorySelection(category)}
//                       />
//                     </label>
//                     <div
//                       className="vsu-cat-ribbon"
//                       style={{ background: colorForCategory(category) }}
//                     />
//                     <div className="vsu-cat-body">
//                       <img
//                         loading="lazy"
//                         decoding="async"
//                         src={getCategoryImage(category)}
//                         alt={category}
//                         className="vsu-cat-img"
//                         onError={(e) => {
//                           e.currentTarget.onerror = null;
//                           e.currentTarget.src = makePlaceholder(
//                             category,
//                             "adb5bd",
//                             "ffffff",
//                           );
//                         }}
//                       />
//                       <span className="vsu-cat-label">{category}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           /* ---- Product view for the selected category ---- */
//           <div>
//             <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
//               <button
//                 className="vsu-back-btn"
//                 onClick={() => setSelectedCategory(null)}
//               >
//                 <ArrowBackIcon fontSize="small" /> All Categories
//               </button>
//               <h5 className="vsu-section-heading mb-0">
//                 {selectedCategory === "All" ? "All Products" : selectedCategory}
//               </h5>
//               <div className="d-flex align-items-center gap-2">
//                 {selectedForSubmissionCount > 0 && (
//                   <span className="badge bg-success">
//                     {selectedForSubmissionCount} selected for submission
//                   </span>
//                 )}
//                 <div className="vsu-search-wrap">
//                   <SearchIcon className="vsu-search-icon" />
//                   <input
//                     type="text"
//                     className="form-control form-control-sm vsu-search"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     style={{ maxWidth: "220px" }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {displayedItems.length === 0 ? (
//               <div className="vsu-empty">
//                 <p className="mb-1 fw-bold">Nothing here yet</p>
//                 <p className="mb-0">
//                   Try a different category, clear your search, or add a new
//                   product.
//                 </p>
//               </div>
//             ) : (
//               <div className="d-flex flex-wrap gap-3 mb-4">
//                 {displayedItems.map((item) => {
//                   const liveStock = Number(item.stockLeft || 0);
//                   // const restockQty = getPendingQty(item.id);
//                   const restockLimit = getPendingLimit(item);
//                   const isOutOfStock = liveStock <= 0;
//                   return (
//                     <div
//                       key={item.id}
//                       className={`vsu-product-card position-relative ${isSelectedForSubmission(item.id) ? "border-success border-2" : ""}`}
//                       style={{ opacity: isOutOfStock ? 0.85 : 1 }}
//                     >
//                       <label
//                         className="position-absolute d-flex align-items-center justify-content-center"
//                         style={{
//                           top: 6,
//                           left: 6,
//                           zIndex: 3,
//                           background: "#fff",
//                           borderRadius: "50%",
//                           width: "22px",
//                           height: "22px",
//                           border: "1px solid rgba(0,0,0,0.08)",
//                           cursor: "pointer",
//                         }}
//                         title="Select for submission"
//                       >
//                         <input
//                           type="checkbox"
//                           className="form-check-input m-0"
//                           style={{ width: "14px", height: "14px" }}
//                           checked={isSelectedForSubmission(item.id)}
//                           onChange={() => toggleSelectForSubmission(item)}
//                         />
//                       </label>

//                       <div
//                         className="d-flex justify-content-center align-items-center position-relative"
//                         style={{ height: "90px" }}
//                       >
//                         <img
//                           src={getProductImage(item)}
//                           alt={item.name}
//                           loading="lazy"
//                           decoding="async"
//                           onError={(e) => {
//                             e.currentTarget.onerror = null;
//                             e.currentTarget.src = makePlaceholder(
//                               item.name,
//                               "adb5bd",
//                               "ffffff",
//                             );
//                           }}
//                           style={{
//                             maxHeight: "80px",
//                             maxWidth: "100%",
//                             objectFit: "contain",
//                             borderRadius: "6px",
//                             backgroundColor: "#f5f5f5",
//                           }}
//                         />
//                       </div>

//                       <h6
//                         className="text-start fw-bold m-0 mt-1"
//                         style={{
//                           fontSize: "11px",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           lineHeight: "1.2em",
//                           maxHeight: "2.4em",
//                         }}
//                       >
//                         {item.name}
//                       </h6>
//                       <small
//                         className="text-muted"
//                         style={{ fontSize: "10px" }}
//                       >
//                         {item.code}
//                       </small>

//                       <div
//                         className="text-start"
//                         style={{ fontSize: "12px", marginTop: "2px" }}
//                       >
//                         {item.afterDiscount != null && (
//                           <b className="text-success me-2">
//                             ₹{Math.round(Number(item.afterDiscount))}
//                           </b>
//                         )}
//                         {item.mrp != null && (
//                           <s className="text-muted">₹{item.mrp}</s>
//                         )}
//                       </div>

//                       {/* ---- Submit quantity ---- */}
//                       <div className="mt-2">
//                         <div
//                           className="d-flex justify-content-between align-items-center mb-1"
//                           style={{ fontSize: "10px", color: "#6B7A70" }}
//                         >
//                           <span>Live: {liveStock}</span>
//                           <span
//                             className="fw-bold"
//                             style={{ color: "#8a611c" }}
//                           >
//                             Restock
//                           </span>
//                         </div>
//                         <input
//                           type="number"
//                           min="0"
//                           className="form-control form-control-sm"
//                           style={{ fontSize: "12px" }}
//                           value={getQtyDisplayValue(item.id)}
//                           onChange={(e) =>
//                             handleQtyInputChange(item.id, e.target.value, item)
//                           }
//                         />
//                       </div>

//                       {/* ---- Per-customer limit ---- */}
//                       <div className="mt-2">
//                         <div
//                           className="d-flex justify-content-between align-items-center mb-1"
//                           style={{ fontSize: "10px", color: "#6B7A70" }}
//                         >
//                           <span>Per-customer limit</span>
//                           <span
//                             className="fw-bold"
//                             style={{ color: "#8a611c" }}
//                           >
//                             Submit Limit
//                           </span>
//                         </div>

//                         <input
//                           type="number"
//                           min="0"
//                           max={liveStock}
//                           className="form-control form-control-sm"
//                           style={{ fontSize: "12px" }}
//                           value={restockLimit === 0 ? "" : restockLimit}
//                           onChange={(e) =>
//                             handleLimitInputChange(
//                               item.id,
//                               e.target.value,
//                               item,
//                             )
//                           }
//                         />

//                         {liveStock > 0 &&
//                           Number(restockLimit) >= liveStock &&
//                           restockLimit !== "" && (
//                             <div
//                               style={{
//                                 fontSize: "9px",
//                                 color: "#dc3545",
//                                 fontWeight: 600,
//                                 textAlign: "center",
//                                 marginTop: 3,
//                               }}
//                             >
//                               Maximum limit reached
//                             </div>
//                           )}
//                       </div>

//                       {/* ---- Submit discount ---- */}
//                       <div className="mt-2">
//                         <div
//                           className="d-flex justify-content-between align-items-center mb-1"
//                           style={{ fontSize: "10px", color: "#6B7A70" }}
//                         >
//                           <span>Submit discount</span>
//                           {isSelectedForSubmission(item.id) && (
//                             <span
//                               className="fw-bold"
//                               style={{ color: "#2F6B4F" }}
//                             >
//                               Selected
//                             </span>
//                           )}
//                         </div>
//                         <div className="input-group input-group-sm">
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             className="form-control form-control-sm"
//                             style={{ fontSize: "11px" }}
//                             placeholder="Discount %"
//                             value={getSelectionDiscount(item)}
//                             onChange={(e) =>
//                               updateSelectionDiscount(item, e.target.value)
//                             }
//                           />
//                           <span
//                             className="input-group-text"
//                             style={{ fontSize: "11px" }}
//                           >
//                             %
//                           </span>
//                         </div>
//                       </div>
//                       {/* ---- Submit MRP ---- */}
//                       <div className="mt-2">
//                         <div
//                           className="d-flex justify-content-between align-items-center mb-1"
//                           style={{ fontSize: "10px", color: "#6B7A70" }}
//                         >
//                           <span>MRP (₹)</span>
//                           <span
//                             className="fw-bold"
//                             style={{ color: "#8a611c" }}
//                           >
//                             Edit MRP
//                           </span>
//                         </div>
//                         <input
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           className="form-control form-control-sm"
//                           style={{ fontSize: "12px" }}
//                           value={getMrpDisplayValue(item)}
//                           onChange={(e) =>
//                             handleMrpInputChange(item.id, e.target.value)
//                           }
//                         />
//                       </div>

//                       {/* ---- Submit Price (after discount) ---- */}
//                       <div className="mt-2">
//                         <div
//                           className="d-flex justify-content-between align-items-center mb-1"
//                           style={{ fontSize: "10px", color: "#6B7A70" }}
//                         >
//                           <span>Selling price (₹)</span>
//                           <span
//                             className="fw-bold"
//                             style={{ color: "#8a611c" }}
//                           >
//                             Edit Price
//                           </span>
//                         </div>
//                         <input
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           className="form-control form-control-sm"
//                           style={{ fontSize: "12px" }}
//                           value={getPriceDisplayValue(item)}
//                           onChange={(e) =>
//                             handlePriceInputChange(item.id, e.target.value)
//                           }
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ---- Floating vendor icon navigation ---- */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "24px",
//           right: "24px",
//           zIndex: 1500,
//         }}
//       >
//         {showVendorMenu && (
//           <div
//             className="bg-white vsu-fab-menu p-2 mb-2"
//             style={{ minWidth: "210px" }}
//           >
//             <button
//               className="vsu-fab-menu-item w-100 mb-1"
//               onClick={openAddModal}
//             >
//               <AddIcon fontSize="small" /> Add New Product
//             </button>
//             <button
//               className="vsu-fab-menu-item w-100 mb-1"
//               onClick={handleRefresh}
//               disabled={loading}
//             >
//               {loading ? "Refreshing..." : "Refresh from server"}
//             </button>
//             <button
//               className="vsu-fab-menu-item w-100 mb-1"
//               onClick={() => {
//                 setShowVendorMenu(false);
//                 handlePreview();
//               }}
//             >
//               Preview Products
//             </button>
//             <button
//               className="vsu-fab-menu-item w-100 mb-1"
//               onClick={() => {
//                 setShowVendorMenu(false);
//                 handleBackToProfile();
//               }}
//             >
//               Back to Profile
//             </button>
//             <button
//               className="vsu-fab-menu-item w-100"
//               style={{ color: "#A24B4B" }}
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//         <button
//           className="btn vsu-fab rounded-circle shadow-lg d-flex align-items-center justify-content-center"
//           style={{ width: "58px", height: "58px" }}
//           onClick={() => setShowVendorMenu((prev) => !prev)}
//           title="Vendor menu"
//         >
//           <StorefrontIcon />
//         </button>
//       </div>

//       {/* ---- Add New Product modal ---- */}
//       {showAddModal && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
//           style={{ backgroundColor: "rgba(16,48,31,0.55)", zIndex: 2000 }}
//           onClick={closeAddModal}
//         >
//           <div
//             className="bg-white vsu-modal-card"
//             style={{
//               width: "min(520px, 92vw)",
//               maxHeight: "90vh",
//               overflowY: "auto",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="vsu-modal-header d-flex justify-content-between align-items-center">
//               <h5 className="vsu-title mb-0">Add New Product</h5>
//               <button
//                 className="btn btn-sm"
//                 style={{ color: "#fff" }}
//                 onClick={closeAddModal}
//               >
//                 <CloseIcon fontSize="small" />
//               </button>
//             </div>

//             <div className="p-4">
//               {addError && (
//                 <div className="alert alert-danger py-2 rounded-3">
//                   {addError}
//                 </div>
//               )}

//               <form onSubmit={handleAddSubmit}>
//                 <div className="mb-2">
//                   <label
//                     className="form-label mb-1"
//                     style={{ fontSize: "13px" }}
//                   >
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control form-control-sm"
//                     value={addForm.name}
//                     onChange={(e) => updateAddForm("name", e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-2">
//                   <div className="d-flex justify-content-between align-items-center mb-1">
//                     <label
//                       className="form-label mb-0"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Category
//                     </label>
//                     <button
//                       type="button"
//                       className="btn btn-link btn-sm p-0"
//                       style={{ fontSize: "12px", textDecoration: "none" }}
//                       onClick={openAddCategoryModal}
//                     >
//                       + Add New Category
//                     </button>
//                   </div>

//                   <select
//                     className="form-select form-select-sm"
//                     value={addForm.category}
//                     onChange={(e) => updateAddForm("category", e.target.value)}
//                   >
//                     <option value="">Choose Category</option>
//                     {categories.map((c) => (
//                       <option key={c} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Product Code: scan or manual */}

//                 <div className="mb-2">
//                   <label
//                     className="form-label mb-1"
//                     style={{ fontSize: "13px" }}
//                   >
//                     Product Code / Barcode
//                   </label>
//                   <div className="btn-group btn-group-sm mb-2 w-100">
//                     <button
//                       type="button"
//                       className={`btn ${codeMode === "manual" ? "vsu-btn-primary" : "btn-outline-secondary"}`}
//                       onClick={() => setCodeMode("manual")}
//                     >
//                       Enter Manually
//                     </button>
//                     <button
//                       type="button"
//                       className={`btn ${codeMode === "scan" ? "vsu-btn-primary" : "btn-outline-secondary"}`}
//                       onClick={() => setCodeMode("scan")}
//                     >
//                       <CameraAltIcon fontSize="small" /> Scan Barcode
//                     </button>
//                   </div>

//                   {codeMode === "manual" ? (
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       placeholder="e.g. RICE-001"
//                       value={addForm.code}
//                       onChange={(e) => updateAddForm("code", e.target.value)}
//                     />
//                   ) : (
//                     <div>
//                       {scanError && (
//                         <div
//                           className="alert alert-warning py-2 rounded-3"
//                           style={{ fontSize: "12px" }}
//                         >
//                           {scanError}
//                         </div>
//                       )}
//                       {!scanning ? (
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary btn-sm w-100"
//                           onClick={startScan}
//                         >
//                           Start Camera Scan
//                         </button>
//                       ) : (
//                         <div>
//                           <video
//                             ref={videoRef}
//                             muted
//                             playsInline
//                             style={{
//                               width: "100%",
//                               borderRadius: "10px",
//                               backgroundColor: "#000",
//                             }}
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-outline-secondary btn-sm w-100 mt-2"
//                             onClick={stopScan}
//                           >
//                             Stop Scanning
//                           </button>
//                         </div>
//                       )}
//                       <input
//                         type="text"
//                         className="form-control form-control-sm mt-2"
//                         placeholder="Detected code appears here (or type it in)"
//                         value={addForm.code}
//                         onChange={(e) => updateAddForm("code", e.target.value)}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="row g-2 mb-2">
//                   <div className="col-6">
//                     <label
//                       className="form-label mb-1"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Units
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       placeholder="e.g. 1kg"
//                       value={addForm.units}
//                       onChange={(e) => updateAddForm("units", e.target.value)}
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label
//                       className="form-label mb-1"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Starting Stock
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       className="form-control form-control-sm"
//                       value={addForm.stockLeft}
//                       onChange={(e) =>
//                         updateAddForm("stockLeft", e.target.value)
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="row g-2 mb-2">
//                   <div className="col-6">
//                     <label
//                       className="form-label mb-1"
//                       style={{ fontSize: "13px" }}
//                     >
//                       MRP (₹)
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       className="form-control form-control-sm"
//                       value={addForm.mrp}
//                       onChange={(e) => updateAddForm("mrp", e.target.value)}
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label
//                       className="form-label mb-1"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Discount (%)
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       max="100"
//                       className="form-control form-control-sm"
//                       value={addForm.discount}
//                       onChange={(e) =>
//                         updateAddForm("discount", e.target.value)
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="row g-2 mb-2">
//                   <div className="col-6">
//                     <label
//                       className="form-label mb-1"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Delivery In (mins)
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       value={addForm.deliveryIn}
//                       onChange={(e) =>
//                         updateAddForm("deliveryIn", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label
//                       className="form-label mb-1"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Per-customer limit
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       className="form-control form-control-sm"
//                       placeholder="Optional"
//                       value={addForm.limit}
//                       onChange={(e) => updateAddForm("limit", e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label
//                     className="form-label mb-1"
//                     style={{ fontSize: "13px" }}
//                   >
//                     Product Photo (optional)
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="form-control form-control-sm"
//                     onChange={(e) => setAddPhoto(e.target.files?.[0] || null)}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn vsu-btn-primary w-100 py-2"
//                   disabled={addSaving}
//                 >
//                   {addSaving ? "Submitting..." : "Submit for Approval"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---- Add New Category modal ---- */}
//       {showAddCategoryModal && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
//           style={{ backgroundColor: "rgba(16,48,31,0.55)", zIndex: 2100 }}
//           onClick={closeAddCategoryModal}
//         >
//           <div
//             className="bg-white vsu-modal-card"
//             style={{ width: "min(400px, 92vw)" }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="vsu-modal-header d-flex justify-content-between align-items-center">
//               <h5 className="vsu-title mb-0">Add New Category</h5>
//               <button
//                 className="btn btn-sm"
//                 style={{ color: "#fff" }}
//                 onClick={closeAddCategoryModal}
//               >
//                 <CloseIcon fontSize="small" />
//               </button>
//             </div>

//             <div className="p-4">
//               {addCategoryError && (
//                 <div className="alert alert-danger py-2 rounded-3">
//                   {addCategoryError}
//                 </div>
//               )}

//               <form onSubmit={handleAddCategorySubmit}>
//                 <div className="mb-3">
//                   <label
//                     className="form-label mb-1"
//                     style={{ fontSize: "13px" }}
//                   >
//                     Category Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control form-control-sm"
//                     placeholder="e.g. Vegetables"
//                     value={newCategoryName}
//                     onChange={(e) => setNewCategoryName(e.target.value)}
//                     autoFocus
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn vsu-btn-primary w-100 py-2"
//                   disabled={addCategorySaving}
//                 >
//                   {addCategorySaving ? "Saving..." : "Save Category"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VendorStockUpdatePage;








import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { playNotificationSound } from "./notificationSound";
import { getGroceryItems } from "./utils/groceryStore";
import {
  getVendorProductsByVendorId,
  invalidateVendorProductsCache,
} from "./utils/vendorListStore";

const API_BASE =
  "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/VendorUploadProducts";

const VENDOR_UPLOAD_PRODUCTS_API = `${API_BASE}/vendorUploadProducts`;

const GET_VENDOR_PRODUCTS_VALUES_API = `${API_BASE}/GetVendorProductsvalues`;

const VENDOR_UPDATE_PRODUCTS_API = `${API_BASE}/UpdateVendorProductsValues`;

// Master-data endpoints for the State -> District -> Pincode cascade used
// to pick which pincodes this vendor's submission should serve.
const MASTER_DATA_API_BASE =
  "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/MasterData";
const GET_STATES_API = `${MASTER_DATA_API_BASE}/getStates`;
const GET_DISTRICTS_API = `${MASTER_DATA_API_BASE}/getDistricts`;
const GET_PINCODES_API = `${MASTER_DATA_API_BASE}/getPincodes`;

// Category display-order key: an array of category names, in the order
// the vendor has arranged them via the up/down arrows on this page. Kept
// separate from pendingCartKey so quantity/discount edits on the Stock
// Update page (which rewrite that key wholesale) never clobber the
// vendor's arrangement — this page reconciles the two on every load.
//
// NOTE: VendorStockUpdatePage now also writes to this exact key, in the
// order categories are first SELECTED there — so the initial arrangement
// a vendor sees here already reflects the order they checked things in,
// before they've touched the arrows on this page at all.
const categoryOrderKey = (vendorId) => `vendorCategoryOrder_${vendorId}`;

// Same key VendorStockUpdatePage writes to when a vendor checks a product
// and sets its discount — this page reads that local "cart" back for a
// final look before the real submission.
const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// Orders bell on this page polls the same endpoint VendorOrdersPage reads
// from. NOTE: this is the QA host, not the "localhost:7091" base used
// elsewhere in this file — see VendorOrdersPage.js for why.
const ORDERS_API_BASE =
  "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";
const GET_VENDOR_ORDERS = `${ORDERS_API_BASE}/Mart/GetVendorOrdersByVendorId`;
const ORDERS_POLL_INTERVAL_MS = 25000;

// ---------------------------------------------------------------------
// Master-data shape helpers — the getStates/getDistricts/getPincodes
// endpoints aren't guaranteed to use the exact same field names, so pull
// out an id/label defensively instead of assuming one casing.
// ---------------------------------------------------------------------
const getStateId = (s) => s?.stateId ?? s?.id ?? s?.StateId ?? s?.Id ?? "";
const getStateName = (s) =>
  s?.stateName ?? s?.name ?? s?.StateName ?? s?.Name ?? "";
const getDistrictId = (d) =>
  d?.districtId ?? d?.id ?? d?.DistrictId ?? d?.Id ?? "";
const getDistrictName = (d) =>
  d?.districtName ?? d?.name ?? d?.DistrictName ?? d?.Name ?? "";
// The pincode list can come back either as an array of plain values
// (e.g. ["530001", "530002"]) or an array of objects (e.g.
// { pincode: "530001", pincodeId: 12 }) — handle both shapes.
const getPincodeId = (p) => {
  if (p === null || p === undefined) return "";
  if (typeof p !== "object") return String(p);
  return p.pincodeId ?? p.id ?? p.PincodeId ?? p.Id ?? "";
};
const getPincodeValue = (p) => {
  if (p === null || p === undefined) return "";
  if (typeof p !== "object") return String(p);
  return (
    p.pincode ?? p.pinCode ?? p.code ?? p.Pincode ?? p.name ?? p.Name ?? ""
  );
};

const VendorPreviewPage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [catalogItems, setCatalogItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [myProducts, setMyProducts] = useState(null);
  const [myProductsLoading, setMyProductsLoading] = useState(true);

  // Order count + "new order just came in" state for the header bell.
  const [orderCount, setOrderCount] = useState(0);
  const [hasNewOrder, setHasNewOrder] = useState(false);
  const knownOrderIdsRef = useRef(null);

  // Locally-saved candidate products (built on the Stock Update page) +
  // which of them are still checked for this final submission.
  const [pendingCart, setPendingCart] = useState(null);
  const [finalSelected, setFinalSelected] = useState({});

  // Vendor-arranged display order of pendingCart's categories — a list of
  // category names, front-to-back. Persisted separately (see
  // categoryOrderKey above) and reconciled against pendingCart's current
  // categories every time either changes: known categories keep their
  // arranged position, brand-new ones are appended at the end, and ones
  // that dropped out of pendingCart (qty back to 0) are dropped here too.
  const [categoryOrder, setCategoryOrder] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const pageRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  // ------------------------------------------------------------
  // State -> District -> Pincode cascade. formData holds the currently
  // selected dropdowns; selectedPincodes is the running set of pincodes
  // (checkbox-checked, can span multiple states/districts visited over
  // time) that gets sent to the server on submit.
  // ------------------------------------------------------------
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [pincodeList, setPincodeList] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [pincodesLoading, setPincodesLoading] = useState(false);
  const [formData, setFormData] = useState({ stateId: "", districtId: "" });

  // pincode value (string) -> checked/unchecked. Only checked pincodes are
  // sent to the server when "Submit for approval" is clicked.
  const [selectedPincodes, setSelectedPincodes] = useState({});
  const [pincodesLocked, setPincodesLocked] = useState(false);
  // Seed the checkboxes once from whatever pincodes are already on this
  // vendor's record/pendingCart, so re-opening this page doesn't silently
  // drop previously-chosen pincodes that aren't in the currently-loaded list.
  const seededPincodesRef = useRef(false);
  // Seed the State / District dropdowns once from the vendor's own
  // profile/record, so a vendor who already has a registered state and
  // district sees them pre-selected instead of starting from blank.
  const seededStateRef = useRef(false);
  const seededDistrictRef = useRef(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const normalizeText = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase();

  const matchesQuery = (value) => {
    if (!normalizedQuery) return true;

    return normalizeText(value).includes(normalizedQuery);
  };

  const orderedPendingCategories = useMemo(() => {
    const cats = pendingCart?.categorie || [];
    const byName = new Map(cats.map((cat) => [cat.categoryName, cat]));
    const ordered = categoryOrder
      .map((name) => byName.get(name))
      .filter(Boolean);
    cats.forEach((cat) => {
      if (!categoryOrder.includes(cat.categoryName)) ordered.push(cat);
    });
    return ordered.map((cat, idx) => ({ ...cat, rank: String(idx + 1) }));
  }, [pendingCart, categoryOrder]);

  const statusByProductId = useMemo(() => {
    const map = {};
    (myProducts?.categories || []).forEach((cat) => {
      (cat.products || []).forEach((p) => {
        map[String(p.productId)] = p.status || "Pending";
      });
    });
    return map;
  }, [myProducts]);

  // productId -> the values already on the vendor's server record, used to
  // detect whether a pendingCart entry actually represents a change.
  const existingProductValues = useMemo(() => {
    const map = {};
    (myProducts?.categories || []).forEach((cat) => {
      (cat.products || []).forEach((p) => {
        map[String(p.productId)] = {
          quantity: String(p.qty ?? 0),
          discount: String(p.discount ?? 0),
          limit: String(p.limit ?? 0),
        };
      });
    });
    return map;
  }, [myProducts]);

  // A pendingCart product is worth showing in "ready to submit" only if it's
  // brand new (never on the server record) or at least one field differs
  // from what's already there.
  const isProductModified = (p) => {
    const existing = existingProductValues[String(p.productIds)];
    if (!existing) return true; // never submitted before -> new, show it

    return (
      String(p.quantity ?? 0) !== existing.quantity ||
      String(p.discount ?? 0) !== existing.discount ||
      String(p.limit ?? 0) !== existing.limit
    );
  };

  const readyToSubmitCategories = useMemo(() => {
    return orderedPendingCategories
      .map((cat) => ({
        ...cat,
        products: (cat.products || []).filter(
          (p) =>
            statusByProductId[String(p.productIds)] !== "Approved" &&
            isProductModified(p),
        ),
      }))
      .filter((cat) => cat.products.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedPendingCategories, statusByProductId, existingProductValues]);

  const productNameById = useMemo(() => {
    const map = {};
    catalogItems.forEach((item) => {
      map[String(item.id)] = item.name;
    });
    return map;
  }, [catalogItems]);

  // ------------------------------------------------------------
  // Get product name from catalog
  // Supports both id/productId formats
  // ------------------------------------------------------------
  const getProductName = (product) => {
    const productId =
      product?.productIds ?? product?.productId ?? product?.id ?? "";

    const catalogProduct = catalogItems.find(
      (item) =>
        String(item.id ?? item.productId ?? item.productIds) ===
        String(productId),
    );

    return (
      product?.name ||
      product?.productName ||
      catalogProduct?.name ||
      catalogProduct?.productName ||
      `Product ${productId}`
    );
  };

  const searchedReadyToSubmitCategories = useMemo(() => {
    if (!normalizedQuery) {
      return readyToSubmitCategories;
    }

    return readyToSubmitCategories
      .map((cat) => {
        const categoryName = cat.categoryName || "";
        const categoryMatches = matchesQuery(categoryName);
        const matchingProducts = (cat.products || []).filter((product) => {
          const productName = getProductName(product);

          const productId = product?.productIds ?? product?.productId ?? "";

          return matchesQuery(productName) || matchesQuery(productId);
        });

        return {
          ...cat,
          products: categoryMatches ? cat.products || [] : matchingProducts,
        };
      })
      .filter((cat) => cat.products && cat.products.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSubmitCategories, normalizedQuery, catalogItems]);

  const approvedCategories = useMemo(() => {
    return (myProducts?.categories || [])
      .map((cat) => ({
        ...cat,
        products: (cat.products || []).filter((p) => p.status === "Approved"),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [myProducts]);

  const searchedApprovedCategories = useMemo(() => {
    if (!normalizedQuery) {
      return approvedCategories;
    }

    return approvedCategories
      .map((cat) => {
        const categoryName = cat.category || "";

        const categoryMatches = matchesQuery(categoryName);

        const matchingProducts = (cat.products || []).filter((product) => {
          const productName = getProductName(product);

          const productId = product?.productId ?? product?.productIds ?? "";

          return matchesQuery(productName) || matchesQuery(productId);
        });

        return {
          ...cat,
          products: categoryMatches ? cat.products || [] : matchingProducts,
        };
      })
      .filter((cat) => cat.products && cat.products.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvedCategories, normalizedQuery, catalogItems]);

  useEffect(() => {
    if (!normalizedQuery) return;
    setExpandedCategories((prev) => {
      const next = { ...prev };
      searchedReadyToSubmitCategories.forEach((cat) => {
        next[cat.categoryName] = true;
      });
      searchedApprovedCategories.forEach((cat) => {
        next[`approved-${cat.category}`] = true;
      });
      return next;
    });
  }, [
    normalizedQuery,
    searchedReadyToSubmitCategories,
    searchedApprovedCategories,
  ]);

  const toggleCategoryExpanded = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("vendorSession");
    const savedVendor = localStorage.getItem("vendorProfile");

    // No session
    if (!sessionId) {
      navigate("/vendor/login");
      return;
    }

    // Wrong vendor session
    if (sessionId !== vendorId) {
      navigate("/vendor/login");
      return;
    }

    // No saved vendor profile
    if (!savedVendor) {
      navigate("/vendor/login");
      return;
    }

    try {
      const profile = JSON.parse(savedVendor);

      // Make sure saved profile belongs to current vendor
      if (profile.vendorId !== vendorId) {
        navigate("/vendor/login");
        return;
      }

      setVendor(profile);
    } catch (error) {
      console.error("Unable to read vendor profile:", error);
      navigate("/vendor/login");
    }
  }, [vendorId, navigate]);

  // Poll for orders so the header bell can show a live count and flag
  // brand-new orders with a highlight + sound, even while the vendor is
  // just sitting on their profile page.
  useEffect(() => {
    if (!vendor) return;
    let cancelled = false;

    const pollOrders = async () => {
      try {
        const { data } = await axios.get(GET_VENDOR_ORDERS, {
          params: { vendorId },
        });
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setOrderCount(list.length);

        const ids = new Set(list.map((o) => o.id));
        if (knownOrderIdsRef.current) {
          const arrived = [...ids].some(
            (id) => !knownOrderIdsRef.current.has(id),
          );
          if (arrived) {
            setHasNewOrder(true);
            try {
              playNotificationSound();
            } catch {
              // audio playback blocked/unsupported — highlight still shows
            }
          }
        }
        knownOrderIdsRef.current = ids;
      } catch (err) {
        console.error("Failed to poll vendor orders:", err);
      }
    };

    pollOrders();
    const interval = setInterval(pollOrders, ORDERS_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [vendor, vendorId]);

  // Product names/images for display only — the actual selection + discount
  // now happens on the Stock Update page, this is just a lookup table.
  useEffect(() => {
    if (!vendor) return;
    let active = true;
    getGroceryItems()
      .then((data) => {
        if (active) setCatalogItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Unable to load product catalog:", err));
    return () => {
      active = false;
    };
  }, [vendor]);

  // productId -> status ("Approved" | "Pending" | etc), sourced from the
  // vendor's real server record. Used to keep "Products ready to submit"
  // and "Your submitted products" mutually exclusive by status.

  useEffect(() => {
    if (!vendorId) return;
    let active = true;
    setMyProductsLoading(true);
    // First load for this vendorId hits GetVendorProductsByVendorId,
    // later loads within the cache window are served from vendorListStore.
    getVendorProductsByVendorId(vendorId)
      .then((vendorWithProducts) => {
        if (active) setMyProducts(vendorWithProducts);
      })
      .catch((err) => {
        console.error("Unable to load vendor products:", err);
        if (active) setMyProducts(null);
      })
      .finally(() => active && setMyProductsLoading(false));
    return () => {
      active = false;
    };
  }, [vendorId]);

  useEffect(() => {
    if (!vendorId) return;

    const loadPendingCart = () => {
      try {
        const raw = localStorage.getItem(pendingCartKey(vendorId));
        if (!raw) {
          setPendingCart(null);
          setFinalSelected({});
          return;
        }
        const parsed = JSON.parse(raw);
        setPendingCart(parsed);
        setFinalSelected((prev) => {
          const next = {};
          (parsed.categorie || []).forEach((cat) => {
            (cat.products || []).forEach((p) => {
              const key = `${cat.categoryName}||${p.productIds}`;
              next[key] = key in prev ? prev[key] : true;
            });
          });
          return next;
        });
      } catch (err) {
        console.error("Unable to read pending product selection:", err);
        setPendingCart(null);
        setFinalSelected({});
      }
    };

    loadPendingCart();

    // Same-tab: catches returning to this page (e.g. via bfcache/tab
    // switch) after an Excel import elsewhere without a full remount.
    // Cross-tab: catches the "storage" event fired when another tab
    // (Stock Update open in a second tab) writes to this same key.
    const handleVisibility = () => {
      if (document.visibilityState === "visible") loadPendingCart();
    };
    const handleStorage = (event) => {
      if (!event.key || event.key === pendingCartKey(vendorId)) {
        loadPendingCart();
      }
    };
    window.addEventListener("focus", loadPendingCart);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("focus", loadPendingCart);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("storage", handleStorage);
    };
  }, [vendorId]);

  // Reconcile the vendor's arranged category order against pendingCart's
  // current set of categories, and seed it from localStorage / current
  // category order on first load.
  useEffect(() => {
    if (!vendorId) return;
    const currentNames = (pendingCart?.categorie || []).map(
      (cat) => cat.categoryName,
    );
    setCategoryOrder((prev) => {
      let base = prev;
      if (!prev.length) {
        try {
          const raw = localStorage.getItem(categoryOrderKey(vendorId));
          if (raw) base = JSON.parse(raw);
        } catch {
          // ignore malformed saved order
        }
      }
      const known = base.filter((name) => currentNames.includes(name));
      const appended = currentNames.filter((name) => !known.includes(name));
      const next = [...known, ...appended];
      if (
        next.length === prev.length &&
        next.every((name, idx) => name === prev[idx])
      ) {
        return prev;
      }
      return next;
    });
  }, [vendorId, pendingCart]);

  // ============================================================
  // Load States (once, on mount)
  // ============================================================
  useEffect(() => {
    setStatesLoading(true);

    axios
      .get(GET_STATES_API)
      .then((response) => {
        setStateList(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setError("Could not load states. Please refresh and try again.");
      })
      .finally(() => {
        setStatesLoading(false);
      });
  }, []);

  // ============================================================
  // Load Districts using State ID
  // ============================================================
  useEffect(() => {
    if (!formData.stateId) {
      setDistrictList([]);
      return;
    }

    setDistrictsLoading(true);
    setDistrictList([]);

    axios
      .get(`${GET_DISTRICTS_API}/${formData.stateId}`)
      .then((response) => {
        setDistrictList(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
        setError("Could not load districts. Please try again.");
        setDistrictList([]);
      })
      .finally(() => {
        setDistrictsLoading(false);
      });
  }, [formData.stateId]);

  // ============================================================
  // Load Pincodes using District ID
  // ============================================================
  useEffect(() => {
    if (!formData.districtId) {
      setPincodeList([]);
      setPincodesLoading(false);
      return;
    }

    setPincodesLoading(true);
    setPincodeList([]);

    axios
      .get(`${GET_PINCODES_API}/${formData.districtId}`)
      .then((response) => {
        const raw = Array.isArray(response.data) ? response.data : [];
        // A handful of rows in the master data have no pincode value at
        // all (null/blank) — drop those here instead of rendering an
        // empty, unusable checkbox for each one.
        const withValue = raw.filter(
          (p) => String(getPincodeValue(p) ?? "").trim() !== "",
        );
        if (withValue.length !== raw.length) {
          console.warn(
            `getPincodes returned ${raw.length} rows, ${
              raw.length - withValue.length
            } had no pincode value:`,
            raw,
          );
        }
        setPincodeList(withValue);
      })
      .catch((error) => {
        console.error("Error fetching pincodes:", error);
        setError("Could not load pincodes. Please try again.");
        setPincodeList([]);
      })
      .finally(() => {
        setPincodesLoading(false);
      });
  }, [formData.districtId]);

  // Seed the pincode checkboxes once from whatever's already saved on this
  // vendor's server record (myProducts.pincodes) or the local pendingCart,
  // so previously-picked pincodes stay checked even before their state/
  // district has been re-selected on this page.

useEffect(() => {
  if (myProductsLoading) return;
     if (seededPincodesRef.current) return;

  const existingPincodes = Array.isArray(myProducts?.pincodes)
    ? myProducts.pincodes
    : [];

  const pendingPincodes = Array.isArray(pendingCart?.pincodes)
    ? pendingCart.pincodes
    : [];

  const savedPincodes =
    existingPincodes.length > 0
      ? existingPincodes
      : pendingPincodes;

  if (savedPincodes.length > 0) {
    const selected = {};

    savedPincodes.forEach((pin) => {
      const value = String(
        getPincodeValue(pin)
      ).trim();

      if (value) {
        selected[value] = true;
      }
    });

    setSelectedPincodes(selected);
    setPincodesLocked(true);
  } else {
    setSelectedPincodes({});
    setPincodesLocked(false);
  }

  seededPincodesRef.current = true;
}, [myProductsLoading, myProducts, pendingCart]);

  // ------------------------------------------------------------
  // Auto-select the vendor's own State once both the vendor profile and
  // the states list are available. Same idea as everywhere else this
  // page reads "vendor details" (vendor.storeName, vendor.email, etc. in
  // the header card below): read it straight off the `vendor` object
  // that was loaded from localStorage's "vendorProfile" / the vendor's
  // server record. We try a direct id first (vendor.stateId), and fall
  // back to matching a stored state *name* (vendor.state / vendor.stateName)
  // against the loaded stateList, in case the vendor record only stores
  // the name rather than the master-data id.
  // ------------------------------------------------------------
  useEffect(() => {
    if (seededStateRef.current) return;
    if (!vendor || stateList.length === 0) return;

    const directId = vendor.stateId ?? vendor.StateId ?? "";
    let stateId = directId ? String(directId) : "";

    if (!stateId) {
      const vendorStateName = vendor.state ?? vendor.stateName ?? "";
      if (vendorStateName) {
        const match = stateList.find(
          (s) =>
            normalizeText(getStateName(s)) === normalizeText(vendorStateName),
        );
        if (match) stateId = String(getStateId(match));
      }
    }

    if (stateId) {
      setFormData((prev) => ({ ...prev, stateId }));
    }
    seededStateRef.current = true;
  }, [vendor, stateList]);

  // Auto-select the vendor's own District, once the districtList for the
  // (auto-selected, above) state has loaded. Same direct-id-then-name-match
  // approach as the state seeding above.
  useEffect(() => {
    if (seededDistrictRef.current) return;
    if (!vendor || districtList.length === 0) return;

    const directId = vendor.districtId ?? vendor.DistrictId ?? "";
    let districtId = directId ? String(directId) : "";

    if (!districtId) {
      const vendorDistrictName = vendor.district ?? vendor.districtName ?? "";
      if (vendorDistrictName) {
        const match = districtList.find(
          (d) =>
            normalizeText(getDistrictName(d)) ===
            normalizeText(vendorDistrictName),
        );
        if (match) districtId = String(getDistrictId(match));
      }
    }

    if (districtId) {
      setFormData((prev) => ({ ...prev, districtId }));
    }
    seededDistrictRef.current = true;
  }, [vendor, districtList]);

   const togglePincode = (pincodeValue) => {
  // Saved pincodes cannot be modified.
  if (pincodesLocked) {
    return;
  }

  const key = String(pincodeValue).trim();

  setSelectedPincodes((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

 const selectedPincodeValues = useMemo(
  () =>
    Object.keys(selectedPincodes).filter(
      (key) => selectedPincodes[key],
    ),
  [selectedPincodes],
);


const visiblePincodeList = useMemo(() => {
  if (!pincodesLocked) {
    return pincodeList;
  }

  const savedPincodes = Array.isArray(myProducts?.pincodes)
    ? myProducts.pincodes
    : [];

  const selectedValues = Object.keys(selectedPincodes)
    .filter((pin) => selectedPincodes[pin]);

  const combined = [
    ...savedPincodes,
    ...selectedValues,
  ];

  const uniquePincodes = [
    ...new Set(
      combined
        .map((pin) => String(getPincodeValue(pin)).trim())
        .filter(Boolean)
    ),
  ];

  return uniquePincodes.map((pin) => {
    const existing = pincodeList.find(
      (p) => String(getPincodeValue(p)).trim() === pin
    );

    return (
      existing || {
        pincodeId: pin,
        pincode: pin,
      }
    );
  });
}, [
  pincodeList,
  selectedPincodes,
  pincodesLocked,
  myProducts,
]);

  const persistCategoryOrder = (order) => {
    try {
      localStorage.setItem(categoryOrderKey(vendorId), JSON.stringify(order));
    } catch {}
  };

  const moveCategory = (index, direction) => {
    setCategoryOrder((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      persistCategoryOrder(next);
      return next;
    });
  };

  const pendingProductCount = useMemo(
    () =>
      readyToSubmitCategories.reduce(
        (sum, cat) => sum + (cat.products?.length || 0),
        0,
      ),
    [readyToSubmitCategories],
  );

  const finalSelectedCount = useMemo(() => {
    let count = 0;
    readyToSubmitCategories.forEach((cat) => {
      (cat.products || []).forEach((p) => {
        if (finalSelected[`${cat.categoryName}||${p.productIds}`]) count++;
      });
    });
    return count;
  }, [readyToSubmitCategories, finalSelected]);

  const selectedStateName = useMemo(() => {
    const match = stateList.find(
      (s) => String(getStateId(s)) === String(formData.stateId),
    );
    return getStateName(match) || vendor?.state || vendor?.stateName || "";
  }, [stateList, formData.stateId, vendor]);

  const selectedDistrictName = useMemo(() => {
    const match = districtList.find(
      (d) => String(getDistrictId(d)) === String(formData.districtId),
    );
    return (
      getDistrictName(match) || vendor?.district || vendor?.districtName || ""
    );
  }, [districtList, formData.districtId, vendor]);

  const toggleFinalSelected = (categoryName, productId) => {
    const key = `${categoryName}||${productId}`;
    setFinalSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!vendor) return null;

  const handleBackToProfile = () => {
    const returnTo = localStorage.getItem("vendorReturnProfile");
    navigate(returnTo || "/");
  };

   const mergeIntoExistingCategorie = (existingVendor, newCategorie) => {
  const existingCats = new Map();
  const order = [];

  // Keep existing products INCLUDING their status
  (existingVendor?.categories || []).forEach((cat) => {
    const categoryName =
      cat.categoryName ??
      cat.category ??
      cat.CategoryName ??
      "";

    const productMap = new Map();

    (cat.products || []).forEach((p) => {
      const productId =
        p.productIds ??
        p.productId ??
        p.ProductIds ??
        "";

      productMap.set(String(productId), {
        quantity: String(p.quantity ?? p.qty ?? p.Quantity ?? 0),
        discount: String(p.discount ?? p.Discount ?? 0),
        limit: String(p.limit ?? p.Limit ?? 0),

        // IMPORTANT: preserve existing status
        status: p.status ?? "Pending",
      });
    });

    existingCats.set(categoryName, productMap);
    order.push(categoryName);
  });

  // Add/update newly submitted products
  newCategorie.forEach((cat) => {
    const categoryName = cat.categoryName;

    let productMap = existingCats.get(categoryName);

    if (!productMap) {
      productMap = new Map();
      existingCats.set(categoryName, productMap);
      order.push(categoryName);
    }

    (cat.products || []).forEach((p) => {
      const productId =
        p.productIds ??
        p.productId ??
        p.ProductIds ??
        "";

      // IMPORTANT:
      // Anything submitted from Vendor Preview is Pending
      productMap.set(String(productId), {
        quantity: String(p.quantity ?? p.Quantity ?? 0),
        discount: String(p.discount ?? p.Discount ?? 0),
        limit: String(p.limit ?? p.Limit ?? 0),

        status: "Pending",
      });
    });
  });

  const rankOf = (name) => {
    const idx = categoryOrder.indexOf(name);
    return idx === -1 ? Infinity : idx;
  };

  const finalOrder = [...order].sort((a, b) => {
    const diff = rankOf(a) - rankOf(b);

    if (diff !== 0) return diff;

    return order.indexOf(a) - order.indexOf(b);
  });

  return finalOrder.map((categoryName, idx) => ({
    CategoryName: categoryName,
    Rank: String(idx + 1),

    Products: Array.from(
      existingCats.get(categoryName).entries()
    ).map(([productId, v]) => ({
      ProductIds: productId,
      Quantity: v.quantity,
      Discount: v.discount,
      Limit: v.limit,
      Status: v.status,
    })),
  }));
};


  const handleSubmitFinal = async () => {
    if (!pendingCart) return;
    const categorie = readyToSubmitCategories
      .map((cat) => ({
        categoryName: cat.categoryName,
        rank: cat.rank,
        products: (cat.products || [])
          .filter((p) => finalSelected[`${cat.categoryName}||${p.productIds}`])
        .map((p) => ({
          productIds: String(p.productIds ?? ""),
          quantity: String(p.quantity ?? "0"),
          limit: String(p.limit ?? "0"),
          discount: String(p.discount ?? "0"),
        })),
    }))
      .filter((cat) => cat.products.length > 0)
      // Re-number after dropping unselected categories so rank stays a
      // clean 1..N sequence with no gaps.
      .map((cat, idx) => ({ ...cat, rank: String(idx + 1) }));

    if (!categorie.length) {
      setError("Select at least one product before submitting for approval.");
      return;
    }

    if (selectedPincodeValues.length === 0) {
      setError("Select at least one pincode before submitting for approval.");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    // If this vendor already has a record on the server (myProducts.id),
    // update it in place: merge the newly-picked products into its
    // existing categories/products rather than creating a second, separate
    // submission. Only a brand-new vendor with no prior record at all
    // falls through to the create (POST) path below.

    const hasExistingRecord = !!myProducts?.id;

    try {
      let submittedCount = 0;

      
if (hasExistingRecord) {
  // 1. Get the latest vendor record from the server
  const getResponse = await axios.get(
    GET_VENDOR_PRODUCTS_VALUES_API,
    {
      params: {
        vendorId: String(vendorId),
      },
    }
  );

  // API returns an array of vendor records
  const vendorRecords = Array.isArray(getResponse.data)
    ? getResponse.data
    : [];

  const existingRecord =
    vendorRecords.find(
      (item) =>
        String(item.vendorId) === String(vendorId)
    ) ||
    vendorRecords.find(
      (item) =>
        String(item.id) === String(myProducts.id)
    );

  if (!existingRecord) {
    throw new Error(
      "Existing vendor record not found in GetVendorProductsvalues API."
    );
  }

  // 2. Merge the updated products with existing categories
  const mergedCategorie = mergeIntoExistingCategorie(
    myProducts,
    categorie
  );

  // 3. Bind image and imageName from GET API response
  const updatePayload = {
    id: existingRecord.id,

    vendorId: String(
      existingRecord.vendorId || vendorId
    ),

    storeName:
      existingRecord.storeName ||
      myProducts.storeName ||
      vendor.storeName ||
      vendor.name ||
      "",

    status:
      existingRecord.status ||
      myProducts.status ||
      "Pending",

    createdDate:
      existingRecord.createdDate ||
      myProducts.createdDate ||
      new Date().toISOString(),

    updatedDate: new Date().toISOString(),

    state:
      existingRecord.state ||
      myProducts.state ||
      selectedStateName ||
      "",

    stateId: String(
      existingRecord.stateId ||
      myProducts.stateId ||
      formData.stateId ||
      ""
    ),

    district:
      existingRecord.district ||
      myProducts.district ||
      selectedDistrictName ||
      "",

    districtId: String(
      existingRecord.districtId ||
      myProducts.districtId ||
      formData.districtId ||
      ""
    ),

    pincodes:
      existingRecord.pincodes ||
      selectedPincodeValues,

    // IMPORTANT: Preserve existing image data
    image: Array.isArray(existingRecord.image)
      ? existingRecord.image
      : [],

    imageName: existingRecord.imageName ?? "",

    // Preserve existing categories and product statuses
    categorie: mergedCategorie.map((cat) => ({
      categoryName: cat.CategoryName,
      rank: String(cat.Rank),

      products: (cat.Products || []).map((p) => ({
        productIds: String(p.ProductIds ?? ""),
        quantity: String(p.Quantity ?? "0"),
        limit: String(p.Limit ?? "0"),
        discount: String(p.Discount ?? "0"),
        status: p.Status ?? "Pending",
      })),
    })),
  };

  console.log(
    "Vendor Update Products PUT Payload:",
    updatePayload
  );

  // 4. Call PUT API
  const updateResponse = await axios.put(
    `${VENDOR_UPDATE_PRODUCTS_API}?id=${encodeURIComponent(
      existingRecord.id
    )}`,
    updatePayload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(
    "Vendor Update Products PUT Response:",
    updateResponse.data
  );

  submittedCount = categorie.reduce(
    (sum, cat) => sum + cat.products.length,
    0
  );
} else {
        const payload = {
          id: pendingCart.id || "",
          vendorId: String(vendorId || ""),
          storeName:
            pendingCart.storeName || vendor.storeName || vendor.name || "",
          status: pendingCart.status || "Pending",
          createdDate: pendingCart.createdDate || new Date().toISOString(),
          updatedDate: new Date().toISOString(),
        image: [],
        imageName: "",
        pincodes: selectedPincodeValues,
          categorie,
          state: selectedStateName,
          stateId: formData.stateId,
          district: selectedDistrictName,
          districtId: formData.districtId,
        };

        console.log(
          "Vendor Upload Products Payload:",
          JSON.stringify(payload, null, 2),
        );

        const response = await axios.post(VENDOR_UPLOAD_PRODUCTS_API, payload, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Vendor Upload Products Response:", response.data);
        submittedCount = categorie.reduce(
          (sum, cat) => sum + cat.products.length,
          0,
        );
      }

      setMessage(
        `${submittedCount} product${submittedCount === 1 ? "" : "s"} sent to Handyman Admin for approval.`,
      );

      // Clear the local candidate cart now that it's been submitted, and
      // refresh "Your submitted products" so it reflects the new state.
      try {
        localStorage.removeItem(pendingCartKey(vendorId));
      } catch (err) {
        // ignore
      }
      setPendingCart(null);
      setFinalSelected({});

      invalidateVendorProductsCache(vendorId);
      getVendorProductsByVendorId(vendorId, { force: true })
        .then(setMyProducts)
        .catch((err) =>
          console.error("Unable to refresh vendor products:", err),
        );
    } catch (submitError) {
      console.error("Vendor approval submission failed:", submitError);
      console.error("API Error Response:", submitError.response?.data);
      setError(
        submitError.response?.data?.message ||
          "The approval request could not be submitted. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorSession");
    navigate("/vendor/login");
  };

  // Only categories that have at least one Approved product show in
  // "Your submitted products".

  return (
    <div
      ref={pageRef}
      className={isFullScreen ? "container-fluid py-4 pb-5" : "container-xl py-4 pb-5"}
      style={{
        maxWidth: isFullScreen ? "100%" : "1320px",
        backgroundColor: isFullScreen ? "#fff" : undefined,
        minHeight: isFullScreen ? "100vh" : undefined,
        overflowY: isFullScreen ? "auto" : undefined,
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-3 d-inline-flex align-items-center gap-1"
        onClick={handleBackToProfile}
      >
        <ArrowBackIcon fontSize="small" /> Back to Profile
      </button>
      </div>
      <div className="border-4 shadow-sm mb-2 overflow-hidden">
        <div
          className="p-4 d-flex flex-column flex-md-row align-items-md-center gap-3"
          style={{
            background: "linear-gradient(135deg, #10301F, #2F6B4F)",
            color: "white",
          }}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center position-relative"
            style={{
              width: 72,
              height: 72,
              background: "rgba(255,255,255,.16)",
              border: "1px solid rgba(255,255,255,.4)",
              cursor: "pointer",
            }}
            role="button"
            title="View orders"
            onClick={() => {
              setHasNewOrder(false);
              navigate(`/vendor/orders/${vendorId}`);
            }}
          >
            <StorefrontIcon fontSize="large" />
            <span
              className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-white position-absolute${
                hasNewOrder ? " vendor-bell-ring" : ""
              }`}
              style={{
                width: 30,
                height: 30,
                top: -6,
                right: -6,
                color: "#10301F",
                boxShadow: "0 1px 4px rgba(0,0,0,.35)",
              }}
            >
              <NotificationsActiveIcon fontSize="small" />
              {orderCount > 0 && (
                <span
                  className="badge rounded-pill bg-danger position-absolute"
                  style={{ top: -6, right: -6, fontSize: 10 }}
                >
                  {orderCount}
                </span>
              )}
            </span>
          </div>
          <div className="flex-grow-1">
            <p
              className="text-uppercase mb-1 small"
              style={{ letterSpacing: ".08em", opacity: 0.8 }}
            >
              Vendor profile
            </p>
            <h2 className="mb-1">{vendor.storeName || vendor.name}</h2>
            {vendor.storeName && vendor.name && (
              <div className="small mb-1" style={{ opacity: 0.85 }}>
                Owner: {vendor.name}
              </div>
            )}
            <div style={{ opacity: 0.85 }}>
              {vendor.email} &middot; {vendor.phone}
            </div>
            {vendor.address && (
              <div className="small mt-1" style={{ opacity: 0.75 }}>
                {vendor.address}
              </div>
            )}
          </div>
          <div className="d-flex gap-1">
            <button
              className={`btn btn-light position-relative d-inline-flex align-items-center ${
                hasNewOrder ? " vendor-orders-bell-pulse" : ""
              }`}
              onClick={() => {
                setHasNewOrder(false);
                navigate(`/vendor/orders/${vendorId}`);
              }}
            >
              <LocalShippingIcon fontSize="small" /> Orders
              {orderCount > 0 && (
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {orderCount}
                </span>
              )}
            </button>
            <button
              className="btn btn-light d-inline-flex align-items-center gap-1"
              onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
            >
              <ArrowBackIcon fontSize="small" /> Back to stock
            </button>
             <button
                    className="btn btn-light d-inline-flex align-items-center"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes vendorOrdersPulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, .6); }
          70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        .vendor-orders-bell-pulse {
          animation: vendorOrdersPulse 1.4s ease-out infinite;
        }
        @keyframes vendorBellRing {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-18deg); }
          20% { transform: rotate(16deg); }
          30% { transform: rotate(-14deg); }
          40% { transform: rotate(12deg); }
          50% { transform: rotate(-8deg); }
          60% { transform: rotate(6deg); }
          70%, 100% { transform: rotate(0deg); }
        }
        .vendor-bell-ring {
          animation: vendorBellRing 1s ease-in-out infinite;
          transform-origin: 50% 0%;
        }
           @media (min-width: 992px) {
          .vendor-product-card {
            padding: 1.15rem !important;
            font-size: 1rem;
            min-height: 130px;
          }
          .vendor-product-card .fw-bold {
            font-size: 1.1rem;
          }

          .vendor-products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 1.15rem;
          }
        }
      `}</style>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ---- Service area: State -> District -> Pincode (checkbox) ---- */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h3 className="mb-1">Service area</h3>
          <p className="text-muted small">
            {pincodesLocked
    ? "Your selected pincodes are saved and cannot be changed."
    : "Select the pincodes you want to serve. You can select or unselect multiple pincodes before submitting."}
          </p>

          <div className="row g-1">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center gap-1">
                <label className="form-label small fw-bold mb-0 text-nowrap">
                  State:
                </label>
                <div className="form-control-plaintext fw-semibold text-danger">
                  {statesLoading ? "Loading…" : selectedStateName || "—"}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center gap-1">
                <label className="form-label small fw-bold mb-0 text-nowrap">
                  District:
                </label>
                <div className="form-control-plaintext fw-semibold text-danger">
                  {districtsLoading ? "Loading…" : selectedDistrictName || "—"}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold">
                Pincodes selected -- {selectedPincodeValues.length}
                 {pincodesLocked && (
                <span className="text-success ms-2">
                  (Locked)
                </span>
              )}
              </label>
            </div>
          </div>

          <div className="mt-1">
            {!formData.districtId ? (
              <p className="text-muted small mb-0">
                Select a district above to see its pincodes.
              </p>
            ) : pincodesLoading ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-success" />
                <span className="ms-2 small text-muted">Loading pincodes…</span>
              </div>
            ) : pincodeList.length === 0 ? (
              <p className="text-muted small mb-0">
                No pincodes found for this district.
              </p>
            ) : (
              <div className="row g-2">
                {visiblePincodeList.map((p) => {
                  const value = getPincodeValue(p);
                  const key = String(value);
                  const checked = !!selectedPincodes[key];
                  return (
                    <div
                      className="col-6 col-sm-4 col-md-3"
                      key={getPincodeId(p) || key}
                    >
                      <label
                        className={`border rounded p-2 small d-flex align-items-center gap-2 w-60 ${
                          checked ? "border-success border-2" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input border-dark"
                          checked={checked}
                           disabled={pincodesLocked}
                          onChange={() => togglePincode(value)}
                        />
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---- Products picked on the Stock Update page, awaiting final submission (non-approved only) ---- */}
      <div className="border-0 shadow-sm">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search products or categories…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h3 className="mb-0">Products ready to submit</h3>
            {pendingProductCount > 0 && (
              <span className="badge bg-success fs-6">
                {finalSelectedCount} of {pendingProductCount} selected
              </span>
            )}
          </div>

          {!pendingCart || pendingProductCount === 0 ? (
            <div className="text-center py-3">
              <p className="text-muted mb-3">
                No products picked yet. Go to Stock Update, check the products
                you want to sell and set a discount for each.
              </p>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
              >
                Go to Stock Update
              </button>
            </div>
          ) : (
            <>
              <p className="text-muted small mb-2">
                Use the arrows to arrange the order these categories appear in
                on your storefront.
              </p>
              {searchedReadyToSubmitCategories.map((cat, index) => {
                const isExpanded = !!expandedCategories[cat.categoryName];
                return (
                  <div key={cat.categoryName} className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-secondary">#{cat.rank}</span>
                      <h6
                        className="mb-0"
                        role="button"
                        style={{ cursor: "pointer", userSelect: "none" }}
                        onClick={() => toggleCategoryExpanded(cat.categoryName)}
                      >
                        {cat.categoryName}{" "}
                        <span style={{ fontSize: "0.75em" }}>
                          {isExpanded ? "▲" : "▼"}
                        </span>
                      </h6>
                      <div
                        className="btn-group btn-group-sm ms-auto"
                        role="group"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          title="Move up"
                          disabled={index === 0}
                          onClick={() => moveCategory(index, -1)}
                        >
                          &uarr;
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          title="Move down"
                          disabled={
                            index === searchedReadyToSubmitCategories.length - 1
                          }
                          onClick={() => moveCategory(index, 1)}
                        >
                          &darr;
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="vendor-product-grid">
                        {cat.products.map((p) => {
                          const key = `${cat.categoryName}||${p.productIds}`;
                          const checked = !!finalSelected[key];
                          return (
                            <div
                              className="col-12 col-sm-6 col-lg-4 col-xl-8"
                              key={p.productIds}
                            >
                              <label
                                className={`border rounded p-2 small d-flex align-items-start gap-2 w-100 h-100 ${checked ? "border-success border-2" : ""}`}
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  type="checkbox"
                                  className="form-check-input mt-1"
                                  checked={checked}
                                  onChange={() =>
                                    toggleFinalSelected(
                                      cat.categoryName,
                                      p.productIds,
                                    )
                                  }
                                />
                                <div>
                                  <div className="fw-bold">
                                    {productNameById[p.productIds] ||
                                      `Product ${p.productIds}`}
                                  </div>
                                  <div className="text-muted">
                                    Qty: {p.quantity} &middot; Discount:{" "}
                                    {p.discount}% &middot; Limit: {p.limit ?? 0}
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-success px-4"
                  onClick={handleSubmitFinal}
                  disabled={submitting || finalSelectedCount === 0}
                >
                  {submitting
                    ? "Submitting…"
                    : `Submit for approval${finalSelectedCount ? ` (${finalSelectedCount})` : ""}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---- Vendor's already-submitted products, from the server (Approved only) ---- */}
      <div className="border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h3 className="mb-3">Your submitted products</h3>
          {myProductsLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" />
              <p className="mt-2 mb-0">Loading your products…</p>
            </div>
          ) : searchedApprovedCategories.length > 0 ? (
            <>
              <span className="badge mb-3 bg-success">Approved</span>
              {searchedApprovedCategories.map((cat) => {
                const isExpanded =
                  !!expandedCategories[`approved-${cat.category}`];
                return (
                  <div key={cat.category} className="mb-3">
                    <h6
                      className="mb-2"
                      role="button"
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() =>
                        toggleCategoryExpanded(`approved-${cat.category}`)
                      }
                    >
                      {cat.category}{" "}
                      <span style={{ fontSize: "0.75em" }}>
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </h6>
                    {isExpanded && (
                      <div className="vendor-products-grid">
                        {cat.products.map((p) => (
                          <div key={p.productId}>
                            <div className="vendor-product-card border rounded p-2 small h-100">
                              <div className="d-flex justify-content-between align-items-start gap-2">
                                <div>
                                  {p.name ||
                                    productNameById[p.productId] ||
                                    `Product ${p.productId}`}
                                </div>
                                <span
                                  className="badge bg-success"
                                  style={{ fontSize: "10px" }}
                                >
                                  Approved
                                </span>
                              </div>      
                              <div>
                                Qty: {p.qty} &middot; Discount: {p.discount}%
                                &middot; Limit: {p.limit}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center py-3">
              <p className="text-muted mb-0">
                No approved products yet — still pending review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorPreviewPage;

