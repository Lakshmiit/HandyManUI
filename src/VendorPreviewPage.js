// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import { getGroceryItems } from "./utils/groceryStore";
// import {
//   getVendorProductsByVendorId,
//   invalidateVendorProductsCache,
// } from "./utils/vendorListStore";

// const VENDOR_UPLOAD_PRODUCTS_API =
//   "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts";

// // Same key VendorStockUpdatePage writes to when a vendor checks a product
// // and sets its discount — this page reads that local "cart" back for a
// // final look before the real submission.
// const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// const VendorPreviewPage = () => {
//   const { vendorId } = useParams();
//   const navigate = useNavigate();
//   const [vendor, setVendor] = useState(null);
//   const [catalogItems, setCatalogItems] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [myProducts, setMyProducts] = useState(null);
//   const [myProductsLoading, setMyProductsLoading] = useState(true);

//   // Locally-saved candidate products (built on the Stock Update page) +
//   // which of them are still checked for this final submission.
//   const [pendingCart, setPendingCart] = useState(null);
//   const [finalSelected, setFinalSelected] = useState({});

//   useEffect(() => {
//     const sessionId = localStorage.getItem("vendorSession");
//     const savedVendor = localStorage.getItem("vendorProfile");

//     // No session
//     if (!sessionId) {
//       navigate("/vendor/login");
//       return;
//     }

//     // Wrong vendor session
//     if (sessionId !== vendorId) {
//       navigate("/vendor/login");
//       return;
//     }

//     // No saved vendor profile
//     if (!savedVendor) {
//       navigate("/vendor/login");
//       return;
//     }

//     try {
//       const profile = JSON.parse(savedVendor);

//       // Make sure saved profile belongs to current vendor
//       if (profile.vendorId !== vendorId) {
//         navigate("/vendor/login");
//         return;
//       }

//       setVendor(profile);
//     } catch (error) {
//       console.error("Unable to read vendor profile:", error);
//       navigate("/vendor/login");
//     }
//   }, [vendorId, navigate]);

//   // Product names/images for display only — the actual selection + discount
//   // now happens on the Stock Update page, this is just a lookup table.
//   useEffect(() => {
//     if (!vendor) return;
//     let active = true;
//     getGroceryItems()
//       .then((data) => {
//         if (active) setCatalogItems(Array.isArray(data) ? data : []);
//       })
//       .catch((err) => console.error("Unable to load product catalog:", err));
//     return () => {
//       active = false;
//     };
//   }, [vendor]);

//   const productNameById = useMemo(() => {
//     const map = {};
//     catalogItems.forEach((item) => {
//       map[String(item.id)] = item.name;
//     });
//     return map;
//   }, [catalogItems]);

//   useEffect(() => {
//     if (!vendorId) return;
//     let active = true;
//     setMyProductsLoading(true);
//     // First load for this vendorId hits GetVendorProductsByVendorId,
//     // later loads within the cache window are served from vendorListStore.
//     getVendorProductsByVendorId(vendorId)
//       .then((vendorWithProducts) => {
//         if (active) setMyProducts(vendorWithProducts);
//       })
//       .catch((err) => {
//         console.error("Unable to load vendor products:", err);
//         if (active) setMyProducts(null);
//       })
//       .finally(() => active && setMyProductsLoading(false));
//     return () => {
//       active = false;
//     };
//   }, [vendorId]);

//   // Load the local candidate cart saved from the Stock Update page, and
//   // default every product in it to "checked" for the final submission.
//   useEffect(() => {
//     if (!vendorId) return;
//     try {
//       const raw = localStorage.getItem(pendingCartKey(vendorId));
//       if (!raw) {
//         setPendingCart(null);
//         setFinalSelected({});
//         return;
//       }
//       const parsed = JSON.parse(raw);
//       setPendingCart(parsed);
//       const initialSelected = {};
//       (parsed.categorie || []).forEach((cat) => {
//         (cat.products || []).forEach((p) => {
//           initialSelected[`${cat.categoryName}||${p.productIds}`] = true;
//         });
//       });
//       setFinalSelected(initialSelected);
//     } catch (err) {
//       console.error("Unable to read pending product selection:", err);
//       setPendingCart(null);
//       setFinalSelected({});
//     }
//   }, [vendorId]);

//   const pendingProductCount = useMemo(
//     () =>
//       (pendingCart?.categorie || []).reduce(
//         (sum, cat) => sum + (cat.products?.length || 0),
//         0,
//       ),
//     [pendingCart],
//   );
//   const finalSelectedCount = useMemo(
//     () => Object.values(finalSelected).filter(Boolean).length,
//     [finalSelected],
//   );

//   const toggleFinalSelected = (categoryName, productId) => {
//     const key = `${categoryName}||${productId}`;
//     setFinalSelected((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   if (!vendor) return null;

//   const handleBackToProfile = () => {
//     // Sent here from the customer ProfilePage (which stashes where to
//     // return to). Falls back to the app root if that's missing.
//     const returnTo = localStorage.getItem("vendorReturnProfile");
//     navigate(returnTo || "/");
//   };

//   const handleSubmitFinal = async () => {
//     if (!pendingCart) return;
//     const categorie = (pendingCart.categorie || [])
//       .map((cat) => ({
//         categoryName: cat.categoryName,
//         products: (cat.products || []).filter(
//           (p) => finalSelected[`${cat.categoryName}||${p.productIds}`],
//         ),
//       }))
//       .filter((cat) => cat.products.length > 0);

//     if (!categorie.length) {
//       setError("Select at least one product before submitting for approval.");
//       return;
//     }

//     setSubmitting(true);
//     setError("");
//     setMessage("");

//     const payload = {
//       id: pendingCart.id || "",
//       vendorId: String(vendorId || ""),
//       storeName: pendingCart.storeName || vendor.storeName || vendor.name || "",
//       status: pendingCart.status || "Pending",
//       createdDate: pendingCart.createdDate || new Date().toISOString(),
//       updatedDate: new Date().toISOString(),
//       pincodes: Array.isArray(pendingCart.pincodes) ? pendingCart.pincodes : [],
//       categorie,
//     };

//     try {
//       console.log(
//         "Vendor Upload Products Payload:",
//         JSON.stringify(payload, null, 2),
//       );

//       const response = await axios.post(VENDOR_UPLOAD_PRODUCTS_API, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Vendor Upload Products Response:", response.data);

//       const submittedCount = categorie.reduce(
//         (sum, cat) => sum + cat.products.length,
//         0,
//       );
//       setMessage(
//         `${submittedCount} product${submittedCount === 1 ? "" : "s"} sent to Handyman Admin for approval.`,
//       );

//       // Clear the local candidate cart now that it's been submitted, and
//       // refresh "Your submitted products" so it reflects the new state.
//       try {
//         localStorage.removeItem(pendingCartKey(vendorId));
//       } catch (err) {
//         // ignore
//       }
//       setPendingCart(null);
//       setFinalSelected({});

//       invalidateVendorProductsCache(vendorId);
//       getVendorProductsByVendorId(vendorId, { force: true })
//         .then(setMyProducts)
//         .catch((err) =>
//           console.error("Unable to refresh vendor products:", err),
//         );
//     } catch (submitError) {
//       console.error("Vendor approval submission failed:", submitError);
//       console.error("API Error Response:", submitError.response?.data);
//       setError(
//         submitError.response?.data?.message ||
//           "The approval request could not be submitted. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="container py-4 pb-5">
//       <button
//         type="button"
//         className="btn btn-outline-secondary btn-sm mb-3 d-inline-flex align-items-center gap-1"
//         onClick={handleBackToProfile}
//       >
//         <ArrowBackIcon fontSize="small" /> Back to Profile
//       </button>

//       <div className="card border-0 shadow-sm mb-4 overflow-hidden">
//         <div
//           className="card-body p-4 d-flex flex-column flex-md-row align-items-md-center gap-3"
//           style={{
//             background: "linear-gradient(135deg, #10301F, #2F6B4F)",
//             color: "white",
//           }}
//         >
//           <div
//             className="rounded-circle d-flex align-items-center justify-content-center"
//             style={{
//               width: 72,
//               height: 72,
//               background: "rgba(255,255,255,.16)",
//               border: "1px solid rgba(255,255,255,.4)",
//             }}
//           >
//             <StorefrontIcon fontSize="large" />
//           </div>
//           <div className="flex-grow-1">
//             <p
//               className="text-uppercase mb-1 small"
//               style={{ letterSpacing: ".08em", opacity: 0.8 }}
//             >
//               Vendor profile
//             </p>
//             <h2 className="mb-1">{vendor.name}</h2>
//             <div style={{ opacity: 0.85 }}>
//               {vendor.email} &middot; {vendor.phone}
//             </div>
//           </div>
//           <button
//             className="btn btn-light d-inline-flex align-items-center gap-1"
//             onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
//           >
//             <ArrowBackIcon fontSize="small" /> Back to stock
//           </button>
//         </div>
//       </div>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       {/* ---- Products picked on the Stock Update page, awaiting final submission ---- */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body p-4">
//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
//             <h3 className="mb-0">Products ready to submit</h3>
//             {pendingProductCount > 0 && (
//               <span className="badge bg-success fs-6">
//                 {finalSelectedCount} of {pendingProductCount} selected
//               </span>
//             )}
//           </div>

//           {!pendingCart || pendingProductCount === 0 ? (
//             <div className="text-center py-3">
//               <p className="text-muted mb-3">
//                 No products picked yet. Go to Stock Update, check the products
//                 you want to sell and set a discount for each.
//               </p>
//               <button
//                 className="btn btn-outline-success btn-sm"
//                 onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
//               >
//                 Go to Stock Update
//               </button>
//             </div>
//           ) : (
//             <>
//               {pendingCart.categorie.map((cat) => (
//                 <div key={cat.categoryName} className="mb-3">
//                   <h6 className="mb-2">{cat.categoryName}</h6>
//                   <div className="row g-2">
//                     {cat.products.map((p) => {
//                       const key = `${cat.categoryName}||${p.productIds}`;
//                       const checked = !!finalSelected[key];
//                       return (
//                         <div
//                           className="col-12 col-sm-6 col-lg-4"
//                           key={p.productIds}
//                         >
//                           <label
//                             className={`border rounded p-2 small d-flex align-items-start gap-2 w-100 ${checked ? "border-success border-2" : ""}`}
//                             style={{ cursor: "pointer" }}
//                           >
//                             <input
//                               type="checkbox"
//                               className="form-check-input mt-1"
//                               checked={checked}
//                               onChange={() =>
//                                 toggleFinalSelected(
//                                   cat.categoryName,
//                                   p.productIds,
//                                 )
//                               }
//                             />
//                             <div>
//                               <div className="fw-bold">
//                                 {productNameById[p.productIds] ||
//                                   `Product ${p.productIds}`}
//                               </div>
//                               <div className="text-muted">
//                                 Qty: {p.quantity} &middot; Discount:{" "}
//                                 {p.discount}%
//                               </div>
//                             </div>
//                           </label>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}

//               <div className="d-flex justify-content-end mt-3">
//                 <button
//                   className="btn btn-success px-4"
//                   onClick={handleSubmitFinal}
//                   disabled={submitting || finalSelectedCount === 0}
//                 >
//                   {submitting
//                     ? "Submitting…"
//                     : `Submit for approval${finalSelectedCount ? ` (${finalSelectedCount})` : ""}`}
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ---- Vendor's already-submitted products, from the server ---- */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body p-4">
//           <h3 className="mb-3">Your submitted products</h3>
//           {myProductsLoading ? (
//             <div className="text-center py-4">
//               <div className="spinner-border text-success" />
//               <p className="mt-2 mb-0">Loading your products…</p>
//             </div>
//           ) : myProducts ? (
//             <>
//               <span
//                 className={`badge mb-3 ${myProducts.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
//               >
//                 {myProducts.status || "Pending Approval"}
//               </span>
//               {myProducts.categories.map((cat) => (
//                 <div key={cat.category} className="mb-3">
//                   <h6 className="mb-2">{cat.category}</h6>
//                   <div className="row g-2">
//                     {cat.products.map((p) => (
//                       <div
//                         className="col-12 col-sm-6 col-lg-4"
//                         key={p.productId}
//                       >
//                         <div className="border rounded p-2 small">
//                           <div className="d-flex justify-content-between align-items-start gap-2">
//                             <div>
//                               {p.name ||
//                                 productNameById[p.productId] ||
//                                 `Product ${p.productId}`}
//                             </div>
//                             <span
//                               className={`badge ${p.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
//                               style={{ fontSize: "10px" }}
//                             >
//                               {p.status || "Pending"}
//                             </span>
//                           </div>
//                           <div>
//                             Qty: {p.qty} &middot; Discount: {p.discount}%
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="text-center py-3">
//               <p className="text-muted mb-0">
//                 No products submitted yet — Pending
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorPreviewPage;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import { getGroceryItems } from "./utils/groceryStore";
// import {
//   getVendorProductsByVendorId,
//   invalidateVendorProductsCache,
// } from "./utils/vendorListStore";

// const VENDOR_UPLOAD_PRODUCTS_API =
//   "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts";
// // Updates an EXISTING vendor record by id. The backend replaces the whole
// // Categorie field with whatever we send, so the caller (handleSubmitFinal
// // below) is responsible for merging newly-picked products into the
// // vendor's already-submitted categories/products first — never send just
// // the new selection here, or the previously approved/pending items on
// // this record would be wiped out.
// const VENDOR_UPDATE_PRODUCTS_API =
//   "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/UpdateVendorProductsValues";

// // Same key VendorStockUpdatePage writes to when a vendor checks a product
// // and sets its discount — this page reads that local "cart" back for a
// // final look before the real submission.
// const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// const VendorPreviewPage = () => {
//   const { vendorId } = useParams();
//   const navigate = useNavigate();
//   const [vendor, setVendor] = useState(null);
//   const [catalogItems, setCatalogItems] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [myProducts, setMyProducts] = useState(null);
//   const [myProductsLoading, setMyProductsLoading] = useState(true);

//   // Locally-saved candidate products (built on the Stock Update page) +
//   // which of them are still checked for this final submission.
//   const [pendingCart, setPendingCart] = useState(null);
//   const [finalSelected, setFinalSelected] = useState({});

//   useEffect(() => {
//     const sessionId = localStorage.getItem("vendorSession");
//     const savedVendor = localStorage.getItem("vendorProfile");

//     // No session
//     if (!sessionId) {
//       navigate("/vendor/login");
//       return;
//     }

//     // Wrong vendor session
//     if (sessionId !== vendorId) {
//       navigate("/vendor/login");
//       return;
//     }

//     // No saved vendor profile
//     if (!savedVendor) {
//       navigate("/vendor/login");
//       return;
//     }

//     try {
//       const profile = JSON.parse(savedVendor);

//       // Make sure saved profile belongs to current vendor
//       if (profile.vendorId !== vendorId) {
//         navigate("/vendor/login");
//         return;
//       }

//       setVendor(profile);
//     } catch (error) {
//       console.error("Unable to read vendor profile:", error);
//       navigate("/vendor/login");
//     }
//   }, [vendorId, navigate]);

//   // Product names/images for display only — the actual selection + discount
//   // now happens on the Stock Update page, this is just a lookup table.
//   useEffect(() => {
//     if (!vendor) return;
//     let active = true;
//     getGroceryItems()
//       .then((data) => {
//         if (active) setCatalogItems(Array.isArray(data) ? data : []);
//       })
//       .catch((err) => console.error("Unable to load product catalog:", err));
//     return () => {
//       active = false;
//     };
//   }, [vendor]);

//   const productNameById = useMemo(() => {
//     const map = {};
//     catalogItems.forEach((item) => {
//       map[String(item.id)] = item.name;
//     });
//     return map;
//   }, [catalogItems]);

//   useEffect(() => {
//     if (!vendorId) return;
//     let active = true;
//     setMyProductsLoading(true);
//     // First load for this vendorId hits GetVendorProductsByVendorId,
//     // later loads within the cache window are served from vendorListStore.
//     getVendorProductsByVendorId(vendorId)
//       .then((vendorWithProducts) => {
//         if (active) setMyProducts(vendorWithProducts);
//       })
//       .catch((err) => {
//         console.error("Unable to load vendor products:", err);
//         if (active) setMyProducts(null);
//       })
//       .finally(() => active && setMyProductsLoading(false));
//     return () => {
//       active = false;
//     };
//   }, [vendorId]);

//   // Load the local candidate cart saved from the Stock Update page, and
//   // default every product in it to "checked" for the final submission.
//   useEffect(() => {
//     if (!vendorId) return;
//     try {
//       const raw = localStorage.getItem(pendingCartKey(vendorId));
//       if (!raw) {
//         setPendingCart(null);
//         setFinalSelected({});
//         return;
//       }
//       const parsed = JSON.parse(raw);
//       setPendingCart(parsed);
//       const initialSelected = {};
//       (parsed.categorie || []).forEach((cat) => {
//         (cat.products || []).forEach((p) => {
//           initialSelected[`${cat.categoryName}||${p.productIds}`] = true;
//         });
//       });
//       setFinalSelected(initialSelected);
//     } catch (err) {
//       console.error("Unable to read pending product selection:", err);
//       setPendingCart(null);
//       setFinalSelected({});
//     }
//   }, [vendorId]);

//   const pendingProductCount = useMemo(
//     () =>
//       (pendingCart?.categorie || []).reduce(
//         (sum, cat) => sum + (cat.products?.length || 0),
//         0,
//       ),
//     [pendingCart],
//   );
//   const finalSelectedCount = useMemo(
//     () => Object.values(finalSelected).filter(Boolean).length,
//     [finalSelected],
//   );

//   const toggleFinalSelected = (categoryName, productId) => {
//     const key = `${categoryName}||${productId}`;
//     setFinalSelected((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   if (!vendor) return null;

//   const handleBackToProfile = () => {
//     // Sent here from the customer ProfilePage (which stashes where to
//     // return to). Falls back to the app root if that's missing.
//     const returnTo = localStorage.getItem("vendorReturnProfile");
//     navigate(returnTo || "/");
//   };

//   // Merges newly-selected {categoryName, products:[{productIds, quantity,
//   // discount}]} entries into the vendor's already-submitted categories
//   // (myProducts, normalized shape: {category, products:[{productId, qty,
//   // discount}]}). Existing categories/products are preserved; a product
//   // already in a category gets its quantity/discount updated in place, a
//   // new product is appended to that category's product list, and a
//   // brand-new category is appended as a whole new entry. Returns the
//   // merged list already in the PascalCase shape UpdateVendorProductsValues
//   // expects.
//   const mergeIntoExistingCategorie = (existingVendor, newCategorie) => {
//     // existingCats: categoryName -> Map(productId -> {quantity, discount})
//     const existingCats = new Map();
//     const order = [];
//     (existingVendor?.categories || []).forEach((cat) => {
//       const productMap = new Map();
//       (cat.products || []).forEach((p) => {
//         productMap.set(String(p.productId), {
//           quantity: String(p.qty ?? 0),
//           discount: String(p.discount ?? 0),
//         });
//       });
//       existingCats.set(cat.category, productMap);
//       order.push(cat.category);
//     });

//     newCategorie.forEach((cat) => {
//       let productMap = existingCats.get(cat.categoryName);
//       if (!productMap) {
//         productMap = new Map();
//         existingCats.set(cat.categoryName, productMap);
//         order.push(cat.categoryName);
//       }
//       (cat.products || []).forEach((p) => {
//         // Upsert: overwrites quantity/discount if this product was already
//         // on the record, adds it if it wasn't — everything else in the
//         // category (and every other category) is left untouched.
//         productMap.set(String(p.productIds), {
//           quantity: String(p.quantity),
//           discount: String(p.discount),
//         });
//       });
//     });

//     return order.map((categoryName) => ({
//       CategoryName: categoryName,
//       Products: Array.from(existingCats.get(categoryName).entries()).map(
//         ([productId, v]) => ({
//           ProductIds: productId,
//           Quantity: v.quantity,
//           Discount: v.discount,
//         }),
//       ),
//     }));
//   };

//   const handleSubmitFinal = async () => {
//     if (!pendingCart) return;
//     const categorie = (pendingCart.categorie || [])
//       .map((cat) => ({
//         categoryName: cat.categoryName,
//         products: (cat.products || []).filter(
//           (p) => finalSelected[`${cat.categoryName}||${p.productIds}`],
//         ),
//       }))
//       .filter((cat) => cat.products.length > 0);

//     if (!categorie.length) {
//       setError("Select at least one product before submitting for approval.");
//       return;
//     }

//     setSubmitting(true);
//     setError("");
//     setMessage("");

//     // If this vendor already has a record on the server (myProducts.id),
//     // update it in place: merge the newly-picked products into its
//     // existing categories/products rather than creating a second, separate
//     // submission. Only a brand-new vendor with no prior record at all
//     // falls through to the create (POST) path below.
//     const hasExistingRecord = !!myProducts?.id;

//     try {
//       let submittedCount = 0;

//       if (hasExistingRecord) {
//         const mergedCategorie = mergeIntoExistingCategorie(
//           myProducts,
//           categorie,
//         );
//         const updatePayload = {
//           id: myProducts.id,
//           VendorId: String(vendorId || ""),
//           StoreName:
//             myProducts.storeName ||
//             pendingCart.storeName ||
//             vendor.storeName ||
//             vendor.name ||
//             "",
//           Categorie: mergedCategorie,
//         };

//         console.log(
//           "Vendor Update Products Payload:",
//           JSON.stringify(updatePayload, null, 2),
//         );

//         const response = await axios.put(
//           `${VENDOR_UPDATE_PRODUCTS_API}?id=${encodeURIComponent(myProducts.id)}`,
//           updatePayload,
//           { headers: { "Content-Type": "application/json" } },
//         );

//         console.log("Vendor Update Products Response:", response.data);
//         submittedCount = categorie.reduce(
//           (sum, cat) => sum + cat.products.length,
//           0,
//         );
//       } else {
//         const payload = {
//           id: pendingCart.id || "",
//           vendorId: String(vendorId || ""),
//           storeName:
//             pendingCart.storeName || vendor.storeName || vendor.name || "",
//           status: pendingCart.status || "Pending",
//           createdDate: pendingCart.createdDate || new Date().toISOString(),
//           updatedDate: new Date().toISOString(),
//           pincodes: Array.isArray(pendingCart.pincodes)
//             ? pendingCart.pincodes
//             : [],
//           categorie,
//         };

//         console.log(
//           "Vendor Upload Products Payload:",
//           JSON.stringify(payload, null, 2),
//         );

//         const response = await axios.post(VENDOR_UPLOAD_PRODUCTS_API, payload, {
//           headers: { "Content-Type": "application/json" },
//         });

//         console.log("Vendor Upload Products Response:", response.data);
//         submittedCount = categorie.reduce(
//           (sum, cat) => sum + cat.products.length,
//           0,
//         );
//       }

//       setMessage(
//         `${submittedCount} product${submittedCount === 1 ? "" : "s"} sent to Handyman Admin for approval.`,
//       );

//       // Clear the local candidate cart now that it's been submitted, and
//       // refresh "Your submitted products" so it reflects the new state.
//       try {
//         localStorage.removeItem(pendingCartKey(vendorId));
//       } catch (err) {
//         // ignore
//       }
//       setPendingCart(null);
//       setFinalSelected({});

//       invalidateVendorProductsCache(vendorId);
//       getVendorProductsByVendorId(vendorId, { force: true })
//         .then(setMyProducts)
//         .catch((err) =>
//           console.error("Unable to refresh vendor products:", err),
//         );
//     } catch (submitError) {
//       console.error("Vendor approval submission failed:", submitError);
//       console.error("API Error Response:", submitError.response?.data);
//       setError(
//         submitError.response?.data?.message ||
//           "The approval request could not be submitted. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="container py-4 pb-5">
//       <button
//         type="button"
//         className="btn btn-outline-secondary btn-sm mb-3 d-inline-flex align-items-center gap-1"
//         onClick={handleBackToProfile}
//       >
//         <ArrowBackIcon fontSize="small" /> Back to Profile
//       </button>

//       <div className="card border-0 shadow-sm mb-4 overflow-hidden">
//         <div
//           className="card-body p-4 d-flex flex-column flex-md-row align-items-md-center gap-3"
//           style={{
//             background: "linear-gradient(135deg, #10301F, #2F6B4F)",
//             color: "white",
//           }}
//         >
//           <div
//             className="rounded-circle d-flex align-items-center justify-content-center"
//             style={{
//               width: 72,
//               height: 72,
//               background: "rgba(255,255,255,.16)",
//               border: "1px solid rgba(255,255,255,.4)",
//             }}
//           >
//             <StorefrontIcon fontSize="large" />
//           </div>
//           <div className="flex-grow-1">
//             <p
//               className="text-uppercase mb-1 small"
//               style={{ letterSpacing: ".08em", opacity: 0.8 }}
//             >
//               Vendor profile
//             </p>
//             <h2 className="mb-1">{vendor.name}</h2>
//             <div style={{ opacity: 0.85 }}>
//               {vendor.email} &middot; {vendor.phone}
//             </div>
//           </div>
//           <button
//             className="btn btn-light d-inline-flex align-items-center gap-1"
//             onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
//           >
//             <ArrowBackIcon fontSize="small" /> Back to stock
//           </button>
//         </div>
//       </div>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       {/* ---- Products picked on the Stock Update page, awaiting final submission ---- */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body p-4">
//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
//             <h3 className="mb-0">Products ready to submit</h3>
//             {pendingProductCount > 0 && (
//               <span className="badge bg-success fs-6">
//                 {finalSelectedCount} of {pendingProductCount} selected
//               </span>
//             )}
//           </div>

//           {!pendingCart || pendingProductCount === 0 ? (
//             <div className="text-center py-3">
//               <p className="text-muted mb-3">
//                 No products picked yet. Go to Stock Update, check the products
//                 you want to sell and set a discount for each.
//               </p>
//               <button
//                 className="btn btn-outline-success btn-sm"
//                 onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
//               >
//                 Go to Stock Update
//               </button>
//             </div>
//           ) : (
//             <>
//               {pendingCart.categorie.map((cat) => (
//                 <div key={cat.categoryName} className="mb-3">
//                   <h6 className="mb-2">{cat.categoryName}</h6>
//                   <div className="row g-2">
//                     {cat.products.map((p) => {
//                       const key = `${cat.categoryName}||${p.productIds}`;
//                       const checked = !!finalSelected[key];
//                       return (
//                         <div
//                           className="col-12 col-sm-6 col-lg-4"
//                           key={p.productIds}
//                         >
//                           <label
//                             className={`border rounded p-2 small d-flex align-items-start gap-2 w-100 ${checked ? "border-success border-2" : ""}`}
//                             style={{ cursor: "pointer" }}
//                           >
//                             <input
//                               type="checkbox"
//                               className="form-check-input mt-1"
//                               checked={checked}
//                               onChange={() =>
//                                 toggleFinalSelected(
//                                   cat.categoryName,
//                                   p.productIds,
//                                 )
//                               }
//                             />
//                             <div>
//                               <div className="fw-bold">
//                                 {productNameById[p.productIds] ||
//                                   `Product ${p.productIds}`}
//                               </div>
//                               <div className="text-muted">
//                                 Qty: {p.quantity} &middot; Discount:{" "}
//                                 {p.discount}%
//                               </div>
//                             </div>
//                           </label>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}

//               <div className="d-flex justify-content-end mt-3">
//                 <button
//                   className="btn btn-success px-4"
//                   onClick={handleSubmitFinal}
//                   disabled={submitting || finalSelectedCount === 0}
//                 >
//                   {submitting
//                     ? "Submitting…"
//                     : `Submit for approval${finalSelectedCount ? ` (${finalSelectedCount})` : ""}`}
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ---- Vendor's already-submitted products, from the server ---- */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body p-4">
//           <h3 className="mb-3">Your submitted products</h3>
//           {myProductsLoading ? (
//             <div className="text-center py-4">
//               <div className="spinner-border text-success" />
//               <p className="mt-2 mb-0">Loading your products…</p>
//             </div>
//           ) : myProducts ? (
//             <>
//               <span
//                 className={`badge mb-3 ${myProducts.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
//               >
//                 {myProducts.status || "Pending Approval"}
//               </span>
//               {myProducts.categories.map((cat) => (
//                 <div key={cat.category} className="mb-3">
//                   <h6 className="mb-2">{cat.category}</h6>
//                   <div className="row g-2">
//                     {cat.products.map((p) => (
//                       <div
//                         className="col-12 col-sm-6 col-lg-4"
//                         key={p.productId}
//                       >
//                         <div className="border rounded p-2 small">
//                           <div className="d-flex justify-content-between align-items-start gap-2">
//                             <div>
//                               {p.name ||
//                                 productNameById[p.productId] ||
//                                 `Product ${p.productId}`}
//                             </div>
//                             <span
//                               className={`badge ${p.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
//                               style={{ fontSize: "10px" }}
//                             >
//                               {p.status || "Pending"}
//                             </span>
//                           </div>
//                           <div>
//                             Qty: {p.qty} &middot; Discount: {p.discount}%
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="text-center py-3">
//               <p className="text-muted mb-0">
//                 No products submitted yet — Pending
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorPreviewPage;

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import notificationSound from "./Bell.mp3";
import { getGroceryItems } from "./utils/groceryStore";
import {
  getVendorProductsByVendorId,
  invalidateVendorProductsCache,
} from "./utils/vendorListStore";

const VENDOR_UPLOAD_PRODUCTS_API =
  "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts";
// Updates an EXISTING vendor record by id. The backend replaces the whole
// record with whatever we send, so the caller (handleSubmitFinal below) is
// responsible for merging newly-picked products into the vendor's
// already-submitted categories/products first, and for carrying forward
// status/createdDate/pincodes — never send just the new selection here, or
// the previously approved/pending items and metadata on this record would
// be wiped out.
const VENDOR_UPDATE_PRODUCTS_API =
  "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/UpdateVendorProductsValues";

// Same key VendorStockUpdatePage writes to when a vendor checks a product
// and sets its discount — this page reads that local "cart" back for a
// final look before the real submission.
const pendingCartKey = (vendorId) => `vendorPendingProducts_${vendorId}`;

// Orders bell on this page polls the same endpoint VendorOrdersPage reads
// from. NOTE: this is the QA host, not the "apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net" base used
// elsewhere in this file — see VendorOrdersPage.js for why.
const ORDERS_API_BASE = "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api";
const GET_VENDOR_ORDERS = `${ORDERS_API_BASE}/Mart/GetVendorOrdersByVendorId`;
const ORDERS_POLL_INTERVAL_MS = 25000;

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
        const { data } = await axios.get(GET_VENDOR_ORDERS, { params: { vendorId } });
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setOrderCount(list.length);

        const ids = new Set(list.map((o) => o.id));
        if (knownOrderIdsRef.current) {
          const arrived = [...ids].some((id) => !knownOrderIdsRef.current.has(id));
          if (arrived) {
            setHasNewOrder(true);
            try {
              new Audio(notificationSound).play().catch(() => {});
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

  const productNameById = useMemo(() => {
    const map = {};
    catalogItems.forEach((item) => {
      map[String(item.id)] = item.name;
    });
    return map;
  }, [catalogItems]);

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

  // Load the local candidate cart saved from the Stock Update page, and
  // default every product in it to "checked" for the final submission.
  useEffect(() => {
    if (!vendorId) return;
    try {
      const raw = localStorage.getItem(pendingCartKey(vendorId));
      if (!raw) {
        setPendingCart(null);
        setFinalSelected({});
        return;
      }
      const parsed = JSON.parse(raw);
      setPendingCart(parsed);
      const initialSelected = {};
      (parsed.categorie || []).forEach((cat) => {
        (cat.products || []).forEach((p) => {
          initialSelected[`${cat.categoryName}||${p.productIds}`] = true;
        });
      });
      setFinalSelected(initialSelected);
    } catch (err) {
      console.error("Unable to read pending product selection:", err);
      setPendingCart(null);
      setFinalSelected({});
    }
  }, [vendorId]);

  const pendingProductCount = useMemo(
    () =>
      (pendingCart?.categorie || []).reduce(
        (sum, cat) => sum + (cat.products?.length || 0),
        0,
      ),
    [pendingCart],
  );
  const finalSelectedCount = useMemo(
    () => Object.values(finalSelected).filter(Boolean).length,
    [finalSelected],
  );

  const toggleFinalSelected = (categoryName, productId) => {
    const key = `${categoryName}||${productId}`;
    setFinalSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!vendor) return null;

  const handleBackToProfile = () => {
    // Sent here from the customer ProfilePage (which stashes where to
    // return to). Falls back to the app root if that's missing.
    const returnTo = localStorage.getItem("vendorReturnProfile");
    navigate(returnTo || "/");
  };

  // Merges newly-selected {categoryName, products:[{productIds, quantity,
  // discount}]} entries into the vendor's already-submitted categories
  // (myProducts, normalized shape: {category, products:[{productId, qty,
  // discount}]}). Existing categories/products are preserved; a product
  // already in a category gets its quantity/discount updated in place, a
  // new product is appended to that category's product list, and a
  // brand-new category is appended as a whole new entry. Returns the
  // merged list already in the PascalCase shape UpdateVendorProductsValues
  // expects.
  const mergeIntoExistingCategorie = (existingVendor, newCategorie) => {
    // existingCats: categoryName -> Map(productId -> {quantity, discount})
    const existingCats = new Map();
    const order = [];
    (existingVendor?.categories || []).forEach((cat) => {
      const productMap = new Map();
      (cat.products || []).forEach((p) => {
        productMap.set(String(p.productId), {
          quantity: String(p.qty ?? 0),
          discount: String(p.discount ?? 0),
        });
      });
      existingCats.set(cat.category, productMap);
      order.push(cat.category);
    });

    newCategorie.forEach((cat) => {
      let productMap = existingCats.get(cat.categoryName);
      if (!productMap) {
        productMap = new Map();
        existingCats.set(cat.categoryName, productMap);
        order.push(cat.categoryName);
      }
      (cat.products || []).forEach((p) => {
        // Upsert: overwrites quantity/discount if this product was already
        // on the record, adds it if it wasn't — everything else in the
        // category (and every other category) is left untouched.
        productMap.set(String(p.productIds), {
          quantity: String(p.quantity),
          discount: String(p.discount),
        });
      });
    });

    return order.map((categoryName) => ({
      CategoryName: categoryName,
      Products: Array.from(existingCats.get(categoryName).entries()).map(
        ([productId, v]) => ({
          ProductIds: productId,
          Quantity: v.quantity,
          Discount: v.discount,
        }),
      ),
    }));
  };

  const handleSubmitFinal = async () => {
    if (!pendingCart) return;
    const categorie = (pendingCart.categorie || [])
      .map((cat) => ({
        categoryName: cat.categoryName,
        products: (cat.products || []).filter(
          (p) => finalSelected[`${cat.categoryName}||${p.productIds}`],
        ),
      }))
      .filter((cat) => cat.products.length > 0);

    if (!categorie.length) {
      setError("Select at least one product before submitting for approval.");
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
        const mergedCategorie = mergeIntoExistingCategorie(
          myProducts,
          categorie,
        );
        // Full VendorProducts shape expected by UpdateVendorProductsValues —
        // this PUT replaces the whole record server-side, so every field on
        // the C# model is carried forward from the existing record (falling
        // back to pendingCart/vendor only where myProducts has nothing).
        const updatePayload = {
          id: myProducts.id,
          VendorId: String(vendorId || ""),
          StoreName:
            myProducts.storeName ||
            pendingCart.storeName ||
            vendor.storeName ||
            vendor.name ||
            "",
          status: myProducts.status || pendingCart.status || "Pending",
          CreatedDate:
            myProducts.createdDate ||
            pendingCart.createdDate ||
            new Date().toISOString(),
          UpdatedDate: new Date().toISOString(),
          Pincodes: Array.isArray(myProducts.pincodes)
            ? myProducts.pincodes
            : Array.isArray(pendingCart.pincodes)
              ? pendingCart.pincodes
              : [],
          Categorie: mergedCategorie,
        };

        console.log(
          "Vendor Update Products Payload:",
          JSON.stringify(updatePayload, null, 2),
        );

        const response = await axios.put(
          `${VENDOR_UPDATE_PRODUCTS_API}?id=${encodeURIComponent(myProducts.id)}`,
          updatePayload,
          { headers: { "Content-Type": "application/json" } },
        );

        console.log("Vendor Update Products Response:", response.data);
        submittedCount = categorie.reduce(
          (sum, cat) => sum + cat.products.length,
          0,
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
          pincodes: Array.isArray(pendingCart.pincodes)
            ? pendingCart.pincodes
            : [],
          categorie,
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

  return (
    <div className="container py-4 pb-5">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-3 d-inline-flex align-items-center gap-1"
        onClick={handleBackToProfile}
      >
        <ArrowBackIcon fontSize="small" /> Back to Profile
      </button>

      <div className="card border-0 shadow-sm mb-4 overflow-hidden">
        <div
          className="card-body p-4 d-flex flex-column flex-md-row align-items-md-center gap-3"
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
          <div className="d-flex gap-2">
            <button
              className={`btn btn-light position-relative d-inline-flex align-items-center gap-1${
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
      `}</style>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ---- Products picked on the Stock Update page, awaiting final submission ---- */}
      <div className="card border-0 shadow-sm mb-4">
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
              {pendingCart.categorie.map((cat) => (
                <div key={cat.categoryName} className="mb-3">
                  <h6 className="mb-2">{cat.categoryName}</h6>
                  <div className="row g-2">
                    {cat.products.map((p) => {
                      const key = `${cat.categoryName}||${p.productIds}`;
                      const checked = !!finalSelected[key];
                      return (
                        <div
                          className="col-12 col-sm-6 col-lg-4"
                          key={p.productIds}
                        >
                          <label
                            className={`border rounded p-2 small d-flex align-items-start gap-2 w-100 ${checked ? "border-success border-2" : ""}`}
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
                                {p.discount}%
                              </div>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

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

      {/* ---- Vendor's already-submitted products, from the server ---- */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h3 className="mb-3">Your submitted products</h3>
          {myProductsLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" />
              <p className="mt-2 mb-0">Loading your products…</p>
            </div>
          ) : myProducts ? (
            <>
              <span
                className={`badge mb-3 ${myProducts.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
              >
                {myProducts.status || "Pending Approval"}
              </span>
              {myProducts.categories.map((cat) => (
                <div key={cat.category} className="mb-3">
                  <h6 className="mb-2">{cat.category}</h6>
                  <div className="row g-2">
                    {cat.products.map((p) => (
                      <div
                        className="col-12 col-sm-6 col-lg-4"
                        key={p.productId}
                      >
                        <div className="border rounded p-2 small">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              {p.name ||
                                productNameById[p.productId] ||
                                `Product ${p.productId}`}
                            </div>
                            <span
                              className={`badge ${p.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
                              style={{ fontSize: "10px" }}
                            >
                              {p.status || "Pending"}
                            </span>
                          </div>
                          <div>
                            Qty: {p.qty} &middot; Discount: {p.discount}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-3">
              <p className="text-muted mb-0">
                No products submitted yet — Pending
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorPreviewPage;
