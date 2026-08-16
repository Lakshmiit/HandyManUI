import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import { getVendorProfileById, submitVendorProductRequests } from "./utils/vendorStorage";

const API_BASE = "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";
const GET_ALL_GROCERY_ITEMS = `${API_BASE}/UploadGrocery/GetAllGroceryItems`;

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

  useEffect(() => {
    const sessionId = localStorage.getItem("vendorSession");
    const profile = getVendorProfileById(vendorId);
    if (!profile || sessionId !== vendorId) {
      navigate("/vendor/login");
      return;
    }
    setVendor(profile);
  }, [vendorId, navigate]);

  useEffect(() => {
    if (!vendor) return;
    let active = true;
    setLoading(true);
    axios
      .get(GET_ALL_GROCERY_ITEMS)
      .then(({ data }) => {
        if (active) setItems((Array.isArray(data) ? data : []).map(normalizeItem));
      })
      .catch(() => active && setError("Unable to load products right now. Please try again."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [vendor]);

  const categories = useMemo(() => {
    const chosen = JSON.parse(localStorage.getItem(`vendorSelectedCategories-${vendorId}`) || "[]");
    const available = Array.from(new Set(items.map((item) => item.category || "Unspecified"))).sort();
    return chosen.length ? available.filter((category) => chosen.includes(category)) : available;
  }, [items, vendorId]);
  const categoryItems = useMemo(
    () => selectedCategory ? items.filter((item) => (item.category || "Unspecified") === selectedCategory) : [],
    [items, selectedCategory]
  );

  const toggleProduct = (id) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  };

  const getCategoryItemIds = (category) =>
    items.filter((item) => (item.category || "Unspecified") === category).map((item) => item.id);

  const isCategoryFullySelected = (category) => {
    const ids = getCategoryItemIds(category);
    return ids.length > 0 && ids.every((id) => selectedIds.includes(id));
  };

  const toggleCategory = (category, event) => {
    event.stopPropagation();
    const ids = getCategoryItemIds(category);
    setSelectedIds((current) => {
      const allSelected = ids.every((id) => current.includes(id));
      return allSelected ? current.filter((id) => !ids.includes(id)) : Array.from(new Set([...current, ...ids]));
    });
  };

  const submitForApproval = () => {
    const selectedProducts = items.filter((item) => selectedIds.includes(item.id));
    if (!selectedProducts.length) {
      setError("Select at least one product before submitting for approval.");
      setMessage("");
      return;
    }
    setSubmitting(true);
    setError("");
    setMessage("");
    try {
      // Saved locally for now instead of calling the remote grocery API.
      submitVendorProductRequests(vendor.name, selectedProducts);
      setItems((current) => current.map((item) => selectedIds.includes(item.id)
        ? { ...item, status: "Pending Approval", requestedBy: vendor.name }
        : item));
      setSelectedIds([]);
      setMessage("Request sent successfully. Admin approval in progress.");
    } catch (submitError) {
      console.error("Vendor approval submission failed", submitError);
      setError("The approval request could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!vendor) return null;

  const handleBackToProfile = () => {
    // Sent here from the customer ProfilePage (which stashes where to
    // return to). Falls back to the app root if that's missing.
    const returnTo = localStorage.getItem("vendorReturnProfile");
    navigate(returnTo || "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorSession");
    navigate("/vendor/login");
  };

  return (
    <div className="container py-4 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
          onClick={handleBackToProfile}
        >
          <ArrowBackIcon fontSize="small" /> Back to Profile
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
          onClick={handleLogout}
        >
          <LogoutIcon fontSize="small" /> Logout
        </button>
      </div>

      <div className="card border-0 shadow-sm mb-4 overflow-hidden">
        <div className="card-body p-4 d-flex flex-column flex-md-row align-items-md-center gap-3" style={{ background: "linear-gradient(135deg, #10301F, #2F6B4F)", color: "white" }}>
          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 72, height: 72, background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.4)" }}>
            <StorefrontIcon fontSize="large" />
          </div>
          <div className="flex-grow-1">
            <p className="text-uppercase mb-1 small" style={{ letterSpacing: ".08em", opacity: .8 }}>Vendor profile</p>
            <h2 className="mb-1">{vendor.name}</h2>
            <div style={{ opacity: .85 }}>{vendor.email} &middot; {vendor.phone}</div>
          </div>
          <button className="btn btn-light d-inline-flex align-items-center gap-1" onClick={() => navigate(`/vendor/stock-update/${vendorId}`)}>
            <ArrowBackIcon fontSize="small" /> Back to stock
          </button>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap">
        <div>
          <h3 className="mb-1">Choose a product category</h3>
          <p className="text-muted mb-0">Select a category to view its products, then choose products to submit for approval.</p>
        </div>
        {selectedIds.length > 0 && <span className="badge bg-success fs-6">{selectedIds.length} selected</span>}
      </div>

      {loading ? <div className="text-center py-5"><div className="spinner-border text-success" /><p className="mt-2">Loading categories…</p></div> : (
        <>
          {!selectedCategory ? (
            <div className="row g-3">
              {categories.map((category) => {
                const count = items.filter((item) => (item.category || "Unspecified") === category).length;
                const categoryChecked = isCategoryFullySelected(category);
                return <div className="col-12 col-sm-6 col-lg-4" key={category}>
                  <div className={`card w-100 h-100 shadow-sm ${categoryChecked ? "border-success border-2" : "border-0"}`}>
                    <button type="button" className="btn p-0 border-0 bg-transparent text-start w-100 h-100" onClick={() => setSelectedCategory(category)}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <h5 className="mb-1">{category}</h5>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success">{count}</span>
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              checked={categoryChecked}
                              onClick={(event) => event.stopPropagation()}
                              onChange={(event) => toggleCategory(category, event)}
                              aria-label={`Select all products in ${category}`}
                            />
                          </div>
                        </div>
                        <small className="text-muted">View products in this category</small>
                      </div>
                    </button>
                  </div>
                </div>;
              })}
            </div>
          ) : (
            <>
              <button className="btn btn-outline-secondary mb-3 d-inline-flex align-items-center gap-1" onClick={() => setSelectedCategory(null)}><ArrowBackIcon fontSize="small" /> All categories</button>
              <h4 className="mb-3">{selectedCategory}</h4>
              <div className="row g-3">
                {categoryItems.map((item) => {
                  const checked = selectedIds.includes(item.id);
                  return <div className="col-12 col-md-6 col-xl-4" key={item.id}>
                    <label className={`card h-100 shadow-sm ${checked ? "border-success border-2" : ""}`} style={{ cursor: "pointer" }}>
                      <div className="card-body">
                        <div className="form-check float-end"><input className="form-check-input" type="checkbox" checked={checked} onChange={() => toggleProduct(item.id)} aria-label={`Select ${item.name}`} /></div>
                        <h5 className="card-title pe-4">{item.name}</h5>
                        <p className="mb-1 text-muted small">Code: {item.code || "—"}</p>
                        <p className="mb-1"><strong>Price:</strong> ₹{Math.round(item.afterDiscount || item.mrp || 0)}</p>
                        <p className="mb-2"><strong>Stock:</strong> {item.stockLeft}</p>
                        <span className={`badge ${item.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}>{item.status || "Pending Approval"}</span>
                      </div>
                    </label>
                  </div>;
                })}
              </div>
            </>
          )}
        </>
      )}

      <div className="position-sticky bottom-0 bg-white border-top mt-4 py-3">
        {message && <div className="alert alert-success py-2 mb-2">{message}</div>}
        {error && <div className="alert alert-danger py-2 mb-2">{error}</div>}
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <small className="text-muted">Selected products will be marked Pending Approval for Handyman Admin.</small>
          <button className="btn btn-success px-4" onClick={submitForApproval} disabled={submitting}>
            {submitting ? "Submitting…" : `Submit for approval${selectedIds.length ? ` (${selectedIds.length})` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorPreviewPage;