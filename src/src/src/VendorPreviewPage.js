import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
// import { getVendorProfileById } from "./utils/vendorStorage";
import { getGroceryItems } from "./utils/groceryStore";
import {
  getVendorProductsByVendorId,
  invalidateVendorProductsCache,
} from "./utils/vendorListStore";

const normalizeItem = (item) => ({
  ...item,
  stockLeft: Number(item.stockLeft || 0),
  mrp: Number(item.mrp || 0),
  afterDiscount: Number(item.afterDiscount || 0),
});

const VendorPreviewPage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [myProducts, setMyProducts] = useState(null);
  const [myProductsLoading, setMyProductsLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem("vendorSession");
    const savedVendor = localStorage.getItem("vendorProfile");

    console.log("URL Vendor ID:", vendorId);
    console.log("Session Vendor ID:", sessionId);
    console.log("Saved Vendor:", savedVendor);

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

  useEffect(() => {
    if (!vendor) return;
    let active = true;
    setLoading(true);
    // Shared cache: reuses the catalog the Profile page (or another vendor
    // page) may have already fetched this session instead of re-hitting the API.
    getGroceryItems()
      .then((data) => {
        if (active)
          setItems((Array.isArray(data) ? data : []).map(normalizeItem));
      })
      .catch(
        () =>
          active &&
          setError("Unable to load products right now. Please try again."),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [vendor]);

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

  const categories = useMemo(() => {
    const chosen = JSON.parse(
      localStorage.getItem(`vendorSelectedCategories-${vendorId}`) || "[]",
    );
    const available = Array.from(
      new Set(items.map((item) => item.category || "Unspecified")),
    ).sort();
    return chosen.length
      ? available.filter((category) => chosen.includes(category))
      : available;
  }, [items, vendorId]);
  const categoryItems = useMemo(
    () =>
      selectedCategory
        ? items.filter(
            (item) => (item.category || "Unspecified") === selectedCategory,
          )
        : [],
    [items, selectedCategory],
  );

  const toggleProduct = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const submitForApproval = async () => {
    const selectedProducts = items.filter((item) =>
      selectedIds.includes(item.id),
    );

    if (!selectedProducts.length) {
      setError("Select at least one product before submitting for approval.");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      // Group selected products by category
      const categorieMap = {};

      selectedProducts.forEach((item) => {
        const categoryName = item.category || "Unspecified";

        if (!categorieMap[categoryName]) {
          categorieMap[categoryName] = [];
        }

        categorieMap[categoryName].push({
          productIds: String(item.id || ""),
          quantity: String(item.stockLeft || 0),
          discount: String(item.discount || 0),
        });
      });

      // Create new payload
      const payload = {
        id: "",
        vendorId: String(vendorId || ""),
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        categorie: Object.keys(categorieMap).map((categoryName) => ({
          categoryName: categoryName,
          products: categorieMap[categoryName],
        })),
      };

      console.log(
        "Vendor Upload Products Payload:",
        JSON.stringify(payload, null, 2),
      );

      const response = await axios.post(
        "https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Vendor Upload Products Response:", response.data);

      setMessage(
        `${selectedProducts.length} product${
          selectedProducts.length === 1 ? "" : "s"
        } sent to Handyman Admin for approval.`,
      );

      setSelectedIds([]);

      // The vendor just submitted new products — invalidate so the "your
      // submitted products" section above refetches instead of showing stale data.
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

  // const submitForApproval = async () => {
  //   const selectedProducts = items.filter((item) => selectedIds.includes(item.id));
  //   if (!selectedProducts.length) {
  //     setError("Select at least one product before submitting for approval.");
  //     return;
  //   }
  //   setSubmitting(true);
  //   setError("");
  //   setMessage("");
  //   try {
  //     const productIds = selectedProducts.map((item) => ({
  //       productId: item.id,
  //       quantities: [
  //         {
  //           quantity: String(item.stockLeft || 0),
  //         },
  //       ],
  //     }));

  //     const payload = {
  //       id: "",
  //       vendorId: vendorId,
  //       createdDate: new Date().toISOString(),
  //       updatedDate: new Date().toISOString(),
  //       productIds: productIds,
  //       // quantity: selectedProducts.length.toString(),
  //     };
  //     console.log("Vendor Products:", payload);

  //     const response = await axios.post(`https://apiqa-b5cyfzbhhah5adc9.westus2-01.azurewebsites.net/api/VendorUploadProducts/vendorUploadProducts`, payload);
  //       console.log(
  //     "Vendor Upload Products Response:",
  //     response.data
  //   );

  //     // await Promise.all(selectedProducts.map((item) => axios.put(
  //     //   `${UPDATE_GROCERY_ITEM}?id=${item.id}`,
  //     //   {
  //     //     ...item,
  //     //     Status: "Pending Approval",
  //     //     status: "Pending Approval",
  //     //     RequestedBy: vendor.fullName || vendor.name,
  //     //     requestedBy: vendor.fullName || vendor.name,
  //     //   }
  //     // )));
  //     // setItems((current) => current.map((item) => selectedIds.includes(item.id)
  //     //   ? { ...item, status: "Pending Approval", requestedBy: vendor.fullName || vendor.name }
  //     //   : item));
  //     setMessage(`${selectedProducts.length} product${selectedProducts.length === 1 ? "" : "s"} sent to Handyman Admin for approval.`);
  //     setSelectedIds([]);
  //   } catch (submitError) {
  //     console.error("Vendor approval submission failed", submitError);
  //     setError("The approval request could not be submitted. Please try again.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  if (!vendor) return null;

  const handleBackToProfile = () => {
    // Sent here from the customer ProfilePage (which stashes where to
    // return to). Falls back to the app root if that's missing.
    const returnTo = localStorage.getItem("vendorReturnProfile");
    navigate(returnTo || "/");
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
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 72,
              height: 72,
              background: "rgba(255,255,255,.16)",
              border: "1px solid rgba(255,255,255,.4)",
            }}
          >
            <StorefrontIcon fontSize="large" />
          </div>
          <div className="flex-grow-1">
            <p
              className="text-uppercase mb-1 small"
              style={{ letterSpacing: ".08em", opacity: 0.8 }}
            >
              Vendor profile
            </p>
            <h2 className="mb-1">{vendor.name}</h2>
            <div style={{ opacity: 0.85 }}>
              {vendor.email} &middot; {vendor.phone}
            </div>
          </div>
          <button
            className="btn btn-light d-inline-flex align-items-center gap-1"
            onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}
          >
            <ArrowBackIcon fontSize="small" /> Back to stock
          </button>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

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
                          <div>Product ID: {p.productId}</div>
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

      <div className="d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap">
        <div>
          <h3 className="mb-1">Choose a product category</h3>
          <p className="text-muted mb-0">
            Select a category to view its products, then choose products to
            submit for approval.
          </p>
        </div>
        {selectedIds.length > 0 && (
          <span className="badge bg-success fs-6">
            {selectedIds.length} selected
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" />
          <p className="mt-2">Loading categories…</p>
        </div>
      ) : (
        <>
          {!selectedCategory ? (
            <div className="row g-3">
              {categories.map((category) => {
                const count = items.filter(
                  (item) => (item.category || "Unspecified") === category,
                ).length;
                return (
                  <div className="col-12 col-sm-6 col-lg-4" key={category}>
                    <button
                      className="card w-100 h-100 text-start border-0 shadow-sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <h5 className="mb-1">{category}</h5>
                          <span className="badge bg-success">{count}</span>
                        </div>
                        <small className="text-muted">
                          View products in this category
                        </small>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <button
                className="btn btn-outline-secondary mb-3 d-inline-flex align-items-center gap-1"
                onClick={() => setSelectedCategory(null)}
              >
                <ArrowBackIcon fontSize="small" /> All categories
              </button>
              <h4 className="mb-3">{selectedCategory}</h4>
              <div className="row g-3">
                {categoryItems.map((item) => {
                  const checked = selectedIds.includes(item.id);
                  return (
                    <div className="col-12 col-md-6 col-xl-4" key={item.id}>
                      <label
                        className={`card h-100 shadow-sm ${checked ? "border-success border-2" : ""}`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="form-check float-end">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleProduct(item.id)}
                              aria-label={`Select ${item.name}`}
                            />
                          </div>
                          <h5 className="card-title pe-4">{item.name}</h5>
                          <p className="mb-1 text-muted small">
                            Code: {item.code || "—"}
                          </p>
                          <p className="mb-1">
                            <strong>Price:</strong> ₹
                            {Math.round(item.afterDiscount || item.mrp || 0)}
                          </p>
                          <p className="mb-2">
                            <strong>Stock:</strong> {item.stockLeft}
                          </p>
                          <span
                            className={`badge ${item.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}
                          >
                            {item.status || "Pending Approval"}
                          </span>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      <div className="position-sticky bottom-0 bg-white border-top mt-4 py-3 d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <small className="text-muted">
          Selected products will be marked Pending Approval for Handyman Admin.
        </small>
        <button
          className="btn btn-success px-4"
          onClick={submitForApproval}
          disabled={submitting || selectedIds.length === 0}
        >
          {submitting
            ? "Submitting…"
            : `Submit for approval${selectedIds.length ? ` (${selectedIds.length})` : ""}`}
        </button>
      </div>
    </div>
  );
};

export default VendorPreviewPage;
