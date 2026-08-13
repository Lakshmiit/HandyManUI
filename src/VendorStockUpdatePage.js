import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SearchIcon from "@mui/icons-material/Search";
import { getVendorProfileById } from "./utils/vendorStorage";
import ImageCache from "./utils/ImageCache";

// Same backend the customer-facing Profile page (and Admin grocery pages) use.
const API_BASE = "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";
const GET_ALL_GROCERY_ITEMS = `${API_BASE}/UploadGrocery/GetAllGroceryItems`;
const UPDATE_GROCERY_ITEM = `${API_BASE}/UploadGrocery/UpdateGroceryItems`;
const ADD_GROCERY_ITEM = `${API_BASE}/UploadGrocery/UploadGrocery`;
const IMAGE_DOWNLOAD = `${API_BASE}/FileUpload/download?generatedfilename=`;
const IMAGE_UPLOAD = `${API_BASE}/FileUpload/upload?filename=`;


const BARCODE_FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"];

// Earthy, market-ledger palette used to color-code category ribbons —
// deterministic per category name so the same category always gets the same tone.
const CATEGORY_PALETTE = ["#2F6B4F", "#C08A2E", "#7C6A46", "#4C7A8C", "#8C5B4C", "#6B7C4C", "#A24B4B", "#3E5C76"];
const colorForCategory = (name) => {
  const str = String(name || "");
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return CATEGORY_PALETTE[hash % CATEGORY_PALETTE.length];
};

// Locally-generated fallback image (inline SVG data URI) — used only until
// the real photo loads, or if a product has no image at all. No external
// network call, so it never shows up broken.
const makePlaceholder = (text, bg = "adb5bd", fg = "ffffff") => {
  const safeText = String(text || "?").slice(0, 22);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'>
    <rect width='100%' height='100%' fill='#${bg}'/>
    <text x='50%' y='50%' font-family='Arial, sans-serif' font-size='26' font-weight='bold'
      fill='#${fg}' text-anchor='middle' dominant-baseline='middle'>${safeText}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const normalizeItem = (p) => ({
  ...p,
  stockLeft: Number(p.stockLeft || 0),
  limit: Number(p.limit || 0),
  mrp: Number(p.mrp || 0),
  discount: Number(p.discount || 0),
  afterDiscount: Number(p.afterDiscount || 0),
});

const EMPTY_ADD_FORM = {
  name: "",
  category: "",
  newCategory: "",
  code: "",
  mrp: "",
  discount: "0",
  units: "",
  deliveryIn: "30",
  stockLeft: "0",
  limit: "",
};

// One embedded stylesheet for this page's design language — a warm
// "market ledger" palette (deep forest green + antique gold) paired with
// the Playfair Display / Source Sans fonts already loaded in index.html.
const VendorStockStyles = () => (
  <style>{`
    .vsu-page {
      background: linear-gradient(180deg, #F5F7F1 0%, #ECF1E8 100%);
      min-height: 100vh;
      font-family: 'Source Sans 3', sans-serif;
      color: #1F2A22;
    }
    .vsu-title { font-family: 'Playfair Display', serif; }
    .vsu-header {
      position: relative;
      overflow: hidden;
      border-radius: 26px;
      background: linear-gradient(135deg, #10301F 0%, #1B4332 55%, #2F6B4F 100%);
      color: #fff;
      box-shadow: 0 22px 44px -22px rgba(16, 48, 31, 0.55);
    }
    .vsu-header::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 88% -10%, rgba(212, 162, 76, 0.35), transparent 55%);
      pointer-events: none;
    }
    .vsu-avatar {
      width: 68px; height: 68px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600;
      background: rgba(255,255,255,0.14);
      border: 1px solid rgba(255,255,255,0.35);
      color: #F3E6C8;
    }
    .vsu-pill {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(212, 162, 76, 0.18);
      border: 1px solid rgba(212, 162, 76, 0.55);
      color: #F3E6C8;
      border-radius: 999px;
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .vsu-stat-card {
      background: #fff;
      border-radius: 18px;
      border: 1px solid rgba(27,67,50,0.08);
      box-shadow: 0 10px 24px -18px rgba(20,40,30,0.25);
      transition: transform .18s ease, box-shadow .18s ease;
      padding: 18px 20px;
      display: flex; align-items: center; gap: 14px;
    }
    .vsu-stat-card:hover { transform: translateY(-3px); box-shadow: 0 16px 30px -16px rgba(20,40,30,0.32); }
    .vsu-stat-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; flex-shrink: 0;
    }
    .vsu-stat-value { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; line-height: 1; color: #16311F; }
    .vsu-stat-label { font-size: 12px; color: #6B7A70; letter-spacing: 0.02em; text-transform: uppercase; }
    .vsu-section-heading { font-family: 'Playfair Display', serif; font-weight: 600; color: #16311F; }
    .vsu-cat-tile {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 20px -14px rgba(20,40,30,0.3);
      transition: transform .18s ease, box-shadow .18s ease;
      overflow: hidden;
      border: 1px solid rgba(27,67,50,0.06);
      cursor: pointer;
      width: 116px;
    }
    .vsu-cat-tile:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 16px 28px -14px rgba(20,40,30,0.35); }
    .vsu-cat-ribbon { height: 5px; width: 100%; }
    .vsu-cat-body { padding: 10px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .vsu-cat-img { height: 68px; width: 68px; border-radius: 10px; object-fit: cover; }
    .vsu-cat-label { font-size: 12px; font-weight: 700; text-align: center; line-height: 1.2; min-height: 28px; display: flex; align-items: center; justify-content: center; color: #223529; }
    .vsu-search {
      border-radius: 999px !important;
      border: 1px solid rgba(27,67,50,0.18) !important;
      padding-left: 34px !important;
    }
    .vsu-search-wrap { position: relative; }
    .vsu-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #6B7A70; font-size: 18px; pointer-events: none; }
    .vsu-back-btn {
      border-radius: 999px; border: 1px solid rgba(27,67,50,0.2); background: #fff;
      color: #16311F; font-weight: 600; padding: 6px 14px; display: inline-flex; align-items: center; gap: 6px;
      transition: background .15s ease;
    }
    .vsu-back-btn:hover { background: #EEF3EA; color: #16311F; }
    .vsu-product-card {
      background: #fff;
      border-radius: 16px;
      border: 1px solid rgba(27,67,50,0.07);
      box-shadow: 0 10px 22px -18px rgba(20,40,30,0.28);
      transition: transform .16s ease, box-shadow .16s ease;
      width: 200px; padding: 10px;
    }
    .vsu-product-card:hover { transform: translateY(-3px); box-shadow: 0 16px 28px -14px rgba(20,40,30,0.32); }
    .vsu-restock-pill {
      background: linear-gradient(135deg, #C08A2E 0%, #E0AE52 100%);
      color: #3A2A05;
      border-radius: 999px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.45);
      padding: 3px;
    }
    .vsu-restock-btn {
      width: 24px; height: 24px; border-radius: 50%; border: none;
      background: rgba(58,42,5,0.12); color: #3A2A05; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .vsu-btn-primary {
      background: linear-gradient(135deg, #1B4332, #2F6B4F);
      border: none; color: #fff; border-radius: 12px; font-weight: 600;
      box-shadow: 0 10px 22px -12px rgba(27,67,50,0.55);
    }
    .vsu-btn-primary:hover { filter: brightness(1.08); color: #fff; }
    .vsu-btn-primary:disabled { opacity: 0.55; }
    .vsu-btn-gold-outline {
      border: 1.5px solid #C08A2E; color: #8a611c; background: transparent; border-radius: 12px; font-weight: 600;
    }
    .vsu-btn-gold-outline:hover { background: rgba(192,138,46,0.1); color: #6c4a14; }
    .vsu-fab {
      background: linear-gradient(135deg, #1B4332, #2F6B4F);
      box-shadow: 0 14px 28px -10px rgba(20,40,30,0.55);
      border: none; color: #fff;
    }
    .vsu-fab-menu { border-radius: 18px; box-shadow: 0 20px 40px -18px rgba(20,40,30,0.4); border: 1px solid rgba(27,67,50,0.08); }
    .vsu-fab-menu-item {
      border: none; background: transparent; text-align: left; padding: 10px 12px; border-radius: 10px;
      font-weight: 600; color: #223529; display: flex; align-items: center; gap: 8px;
    }
    .vsu-fab-menu-item:hover { background: #EEF3EA; }
    .vsu-modal-card { border-radius: 22px; box-shadow: 0 30px 60px -20px rgba(0,0,0,0.4); border: none; }
    .vsu-modal-header { border-radius: 22px 22px 0 0; background: linear-gradient(135deg, #10301F, #2F6B4F); color: #fff; padding: 18px 22px; }
    .vsu-empty {
      border: 1.5px dashed rgba(27,67,50,0.25);
      border-radius: 18px;
      padding: 32px 20px;
      text-align: center;
      color: #4B5A50;
      background: rgba(255,255,255,0.6);
    }
    @media (prefers-reduced-motion: reduce) {
      .vsu-cat-tile, .vsu-stat-card, .vsu-product-card { transition: none !important; }
    }
  `}</style>
);

const VendorStockUpdatePage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [items, setItems] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // null = show categories only. Set to a category name (or "All") to view products.
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Locally tracked restock quantities — start at 0, live only in this
  // component's state until "Save Stock" pushes them to the server.
  const [pendingQty, setPendingQty] = useState({});

  const [showVendorMenu, setShowVendorMenu] = useState(false);

  // ---- Add New Product modal state ----
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_ADD_FORM);
  const [addPhoto, setAddPhoto] = useState(null);
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState("");
  const [codeMode, setCodeMode] = useState("manual"); // "manual" | "scan"
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanFrameRef = useRef(null);

  // Vendor session check.
  useEffect(() => {
    const sessionId = localStorage.getItem("vendorSession");
    if (!sessionId || sessionId !== vendorId) {
      navigate("/vendor/login");
      return;
    }
    const vendorProfile = getVendorProfileById(vendorId);
    if (!vendorProfile) {
      navigate("/vendor/login");
      return;
    }
    setVendor(vendorProfile);
  }, [vendorId, navigate]);

  const fetchItems = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    setError("");
    try {
      const res = await axios.get(GET_ALL_GROCERY_ITEMS);
      const normalized = (Array.isArray(res.data) ? res.data : []).map(normalizeItem);
      setItems(normalized);
      // Restock quantities always reset to 0 against the freshly-fetched baseline.
      setPendingQty({});
    } catch (err) {
      console.error("Failed to fetch grocery items", err);
      setError("Unable to load products right now. Please try again.");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if (!vendor) return;
    fetchItems(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor]);

  // Same image-loading pattern as GroceryItems.js / ProfilePage.js:
  // check IndexedDB cache first, otherwise download + cache.
  useEffect(() => {
    if (!items.length) return;
    const controller = new AbortController();
    let cancelled = false;

    (async () => {
      for (const item of items) {
        const filename = Array.isArray(item.images) ? item.images[0] : null;
        if (!filename || imageUrls[item.id]) continue;
        try {
          const cached = await ImageCache.getBase64(filename);
          if (cancelled) return;
          if (cached) {
            setImageUrls((prev) => ({ ...prev, [item.id]: `data:image/jpeg;base64,${cached}` }));
            continue;
          }
          const res = await fetch(`${IMAGE_DOWNLOAD}${encodeURIComponent(filename)}`, {
            signal: controller.signal,
          });
          const json = await res.json();
          const b64 = json?.imageData || "";
          if (!b64 || cancelled) continue;
          await ImageCache.setBase64(filename, b64);
          if (!cancelled) {
            setImageUrls((prev) => ({ ...prev, [item.id]: `data:image/jpeg;base64,${b64}` }));
          }
        } catch (e) {
          // ignore aborted/failed image fetch — card falls back to a placeholder
        }
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category || "Unspecified"))).sort();
    return unique;
  }, [items]);

  const displayedItems = useMemo(() => {
    if (!selectedCategory) return [];
    let list =
      selectedCategory === "All"
        ? items
        : items.filter((i) => (i.category || "Unspecified") === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((i) => i.name?.toLowerCase().includes(q));
    }
    return list;
  }, [items, selectedCategory, searchQuery]);

  const totalProducts = items.length;
  const totalStock = items.reduce((sum, item) => sum + Number(item.stockLeft || 0), 0);
  const dirtyIds = useMemo(
    () => Object.keys(pendingQty).filter((id) => Number(pendingQty[id]) > 0),
    [pendingQty]
  );

  const getCategoryImage = (category) => {
    if (category === "All") return makePlaceholder("All", "6c757d", "ffffff");
    const match = items.find((i) => (i.category || "Unspecified") === category && imageUrls[i.id]);
    return match ? imageUrls[match.id] : makePlaceholder(category, "adb5bd", "ffffff");
  };

  const getProductImage = (item) => imageUrls[item.id] || makePlaceholder(item.name, "adb5bd", "ffffff");

  const getPendingQty = (itemId) => Number(pendingQty[itemId] || 0);

  const handlePendingChange = (itemId, delta) => {
    setPendingQty((prev) => {
      const next = Math.max(0, Number(prev[itemId] || 0) + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const buildUpdatePayload = (item, newStockLeft) => ({
    id: item.id,
    Date: item.date,
    GroceryItemId: item.groceryItemId,
    Name: item.name,
    Category: item.category,
    Images: item.images || [],
    MRP: String(item.mrp ?? ""),
    Discount: String(item.discount ?? ""),
    AfterDiscount: String(item.afterDiscount ?? ""),
    StockLeft: newStockLeft,
    DeliveryIn: item.deliveryIn,
    Status: item.status,
    code: item.code,
    units: item.units,
    RequestedBy: vendor?.name || "Vendor",
    manufactureDate: item.manufactureDate,
    expireDate: item.expireDate,
    Limit: item.limit,
  });

  const handleSave = async () => {
    if (dirtyIds.length === 0) {
      setMessage("No restock quantities to save.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const updates = dirtyIds.map((id) => {
        const item = items.find((i) => String(i.id) === String(id));
        const newStockLeft = Number(item.stockLeft || 0) + getPendingQty(id);
        return { item, newStockLeft };
      });
      await Promise.all(
        updates.map(({ item, newStockLeft }) =>
          axios.put(`${UPDATE_GROCERY_ITEM}?id=${item.id}`, buildUpdatePayload(item, newStockLeft))
        )
      );
      setItems((prev) =>
        prev.map((item) => {
          const found = updates.find((u) => String(u.item.id) === String(item.id));
          return found ? { ...item, stockLeft: found.newStockLeft } : item;
        })
      );
      setPendingQty({});
      setMessage(`Restocked ${updates.length} product${updates.length > 1 ? "s" : ""}.`);
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.error("Failed to save stock updates", err);
      setError("Unable to save one or more stock updates. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "grocery_stock.json");
  };

  const handleRefresh = () => {
    fetchItems(true);
    setShowVendorMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorSession");
    navigate("/vendor/login");
  };

  const handlePreview = () => {
    // Preview the vendor's own profile, not the customer-facing profile.
    navigate(`/vendor/preview/${vendorId}`);
  };

  const handleBackToProfile = () => {
    // Sent here from the customer ProfilePage (which stashes where to
    // return to). Falls back to the app root if that's missing.
    const returnTo = localStorage.getItem("vendorReturnProfile");
    navigate(returnTo || "/");
  };

  const handleCategorySelect = (category) => {
    if (category !== "All") {
      const key = `vendorSelectedCategories-${vendorId}`;
      const previous = JSON.parse(localStorage.getItem(key) || "[]");
      if (!previous.includes(category)) localStorage.setItem(key, JSON.stringify([...previous, category]));
    }
    setSelectedCategory(category);
  };

  // ---- Barcode scanning ----
  const stopScan = () => {
    if (scanFrameRef.current) {
      cancelAnimationFrame(scanFrameRef.current);
      scanFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const startScan = async () => {
    setScanError("");
    if (!("BarcodeDetector" in window)) {
      setScanError(
        "Live barcode scanning isn't supported in this browser. Try Chrome on Android or desktop Chrome, or enter the code manually."
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);

      // eslint-disable-next-line no-undef
      const detector = new BarcodeDetector({ formats: BARCODE_FORMATS });

      const tick = async () => {
        if (!videoRef.current || !streamRef.current) return;
        try {
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes.length > 0) {
            const value = barcodes[0].rawValue;
            setAddForm((prev) => ({ ...prev, code: value }));
            stopScan();
            return;
          }
        } catch (e) {
          // detection hiccup — keep trying on next frame
        }
        scanFrameRef.current = requestAnimationFrame(tick);
      };
      scanFrameRef.current = requestAnimationFrame(tick);
    } catch (err) {
      console.error("Camera access failed", err);
      setScanError("Couldn't access the camera. Check permissions, or enter the code manually.");
    }
  };

  useEffect(() => {
    // Stop the camera whenever the modal closes or the mode switches away from scanning.
    if (!showAddModal || codeMode !== "scan") {
      stopScan();
    }
    return () => stopScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddModal, codeMode]);

  // ---- Add New Product ----
  const openAddModal = () => {
    setAddForm(EMPTY_ADD_FORM);
    setAddPhoto(null);
    setAddError("");
    setCodeMode("manual");
    setShowAddModal(true);
    setShowVendorMenu(false);
  };

  const closeAddModal = () => {
    stopScan();
    setShowAddModal(false);
  };

  const updateAddForm = (field, value) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const getFileByteArray = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(new Uint8Array(reader.result));
      reader.readAsArrayBuffer(file);
    });

  const uploadAddPhoto = async (file) => {
    try {
      const byteArray = await getFileByteArray(file);
      const formData = new FormData();
      formData.append("file", new Blob([byteArray], { type: file.type }), file.name);
      formData.append("fileName", file.name);
      const response = await fetch(`${IMAGE_UPLOAD}${file.name}`, {
        method: "POST",
        headers: { Accept: "text/plain" },
        body: formData,
      });
      const responseData = await response.text();
      return responseData || "";
    } catch (err) {
      console.error("Photo upload failed", err);
      return "";
    }
  };

  const validateAddForm = () => {
    const finalCategory = addForm.category === "__new__" ? addForm.newCategory.trim() : addForm.category;
    if (!addForm.name.trim()) return "Product name is required.";
    if (!finalCategory) return "Category is required.";
    if (!addForm.units.trim()) return "Units are required (e.g. 1kg, 500ml).";
    if (!addForm.code.trim()) return "Product code is required — scan a barcode or enter one manually.";
    if (!addForm.mrp || isNaN(addForm.mrp)) return "A valid price (MRP) is required.";
    if (addForm.discount === "" || isNaN(addForm.discount)) return "A valid discount is required (0 if none).";
    if (!addForm.deliveryIn.toString().trim()) return "Delivery time (minutes) is required.";
    if (addForm.stockLeft === "" || isNaN(addForm.stockLeft)) return "A valid starting stock quantity is required.";
    return null;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateAddForm();
    if (validationError) {
      setAddError(validationError);
      return;
    }
    setAddError("");
    setAddSaving(true);
    try {
      let images = [];
      if (addPhoto) {
        const src = await uploadAddPhoto(addPhoto);
        if (src) images = [src];
      }
      const finalCategory = addForm.category === "__new__" ? addForm.newCategory.trim() : addForm.category;
      const mrp = parseFloat(addForm.mrp);
      const discount = parseFloat(addForm.discount || 0);
      const payload = {
        id: "unique-id",
        date: new Date().toISOString(),
        GroceryItemId: "string",
        name: addForm.name.trim(),
        category: finalCategory,
        images,
        mrp: mrp.toString(),
        discount: discount.toString(),
        afterDiscount: (mrp - (mrp * discount) / 100).toString(),
        stockLeft: addForm.stockLeft,
        deliveryIn: addForm.deliveryIn,
        status: "Pending Approval",
        requestedBy: vendor?.name || "Vendor",
        Code: addForm.code.trim(),
        Units: addForm.units.trim(),
        ManufactureDate: "",
        ExpireDate: "",
        Limit: addForm.limit ? addForm.limit.toString() : "",
      };
      const response = await fetch(ADD_GROCERY_ITEM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Add product request failed");

      setMessage(`"${addForm.name}" submitted (pending approval).`);
      setTimeout(() => setMessage(""), 4000);
      setShowAddModal(false);
      fetchItems(true);
    } catch (err) {
      console.error("Failed to add product", err);
      setAddError("Unable to add this product right now. Please try again.");
    } finally {
      setAddSaving(false);
    }
  };

  if (!vendor) {
    return null;
  }

  return (
    <div className="vsu-page" style={{ position: "relative" }}>
      <VendorStockStyles />
      <div className="container py-4">
        {/* Back to Profile */}
        <button
          type="button"
          className="vsu-back-btn mb-3"
          onClick={handleBackToProfile}
        >
          <ArrowBackIcon fontSize="small" /> Back to Profile
        </button>

        {/* Header */}
        <div className="vsu-header p-4 p-md-5 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="vsu-avatar">{vendor.name?.charAt(0)?.toUpperCase() || "V"}</div>
            <div>
              <h2 className="vsu-title mb-1" style={{ fontSize: "28px" }}>{vendor.name}</h2>
              <p className="mb-2" style={{ opacity: 0.85, fontSize: "14px" }}>{vendor.email} · {vendor.phone}</p>
              <span className="vsu-pill"><StorefrontIcon style={{ fontSize: "14px" }} /> Vendor stock manager</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="vsu-stat-card">
              <div className="vsu-stat-icon" style={{ background: "linear-gradient(135deg,#1B4332,#2F6B4F)" }}>
                <Inventory2Icon fontSize="small" />
              </div>
              <div>
                <div className="vsu-stat-value">{totalProducts}</div>
                <div className="vsu-stat-label">Total products</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="vsu-stat-card">
              <div className="vsu-stat-icon" style={{ background: "linear-gradient(135deg,#3E5C76,#4C7A8C)" }}>
                <LocalShippingIcon fontSize="small" />
              </div>
              <div>
                <div className="vsu-stat-value">{totalStock}</div>
                <div className="vsu-stat-label">Total live stock</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="vsu-stat-card">
              <div className="vsu-stat-icon" style={{ background: "linear-gradient(135deg,#C08A2E,#E0AE52)" }}>
                <PendingActionsIcon fontSize="small" />
              </div>
              <div>
                <div className="vsu-stat-value">{dirtyIds.length}</div>
                <div className="vsu-stat-label">Pending restock entries</div>
              </div>
            </div>
          </div>
        </div>

        {message && <div className="alert alert-success rounded-4 border-0 shadow-sm">{message}</div>}
        {error && <div className="alert alert-danger rounded-4 border-0 shadow-sm">{error}</div>}

        {/* ---- Categories-only landing view ---- */}
        {!selectedCategory ? (
          <div className="mb-4">
            <h3 className="vsu-section-heading mb-1">Choose a category</h3>
            <p className="text-muted mb-3">Select a category to view and restock its products.</p>

            {loading ? (
              <div className="vsu-empty">
                <div className="spinner-border text-success mb-2" role="status" style={{ width: "2rem", height: "2rem" }} />
                <p className="mb-0">Gathering today's stock...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="vsu-empty">
                <p className="mb-1 fw-bold">No categories yet</p>
                <p className="mb-0">Add your first product to start building out your catalog.</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap gap-3">
                <div className="vsu-cat-tile" onClick={() => handleCategorySelect("All")}>
                  <div className="vsu-cat-ribbon" style={{ background: "#16311F" }} />
                  <div className="vsu-cat-body">
                    <img src={getCategoryImage("All")} alt="All" className="vsu-cat-img" />
                    <span className="vsu-cat-label">All Products</span>
                  </div>
                </div>
                {categories.map((category) => (
                  <div key={category} className="vsu-cat-tile" onClick={() => handleCategorySelect(category)}>
                    <div className="vsu-cat-ribbon" style={{ background: colorForCategory(category) }} />
                    <div className="vsu-cat-body">
                      <img
                        src={getCategoryImage(category)}
                        alt={category}
                        className="vsu-cat-img"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = makePlaceholder(category, "adb5bd", "ffffff");
                        }}
                      />
                      <span className="vsu-cat-label">{category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ---- Product view for the selected category ---- */
          <div>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <button className="vsu-back-btn" onClick={() => setSelectedCategory(null)}>
                <ArrowBackIcon fontSize="small" /> All Categories
              </button>
              <h5 className="vsu-section-heading mb-0">{selectedCategory === "All" ? "All Products" : selectedCategory}</h5>
              <div className="vsu-search-wrap">
                <SearchIcon className="vsu-search-icon" />
                <input
                  type="text"
                  className="form-control form-control-sm vsu-search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ maxWidth: "220px" }}
                />
              </div>
            </div>

            {displayedItems.length === 0 ? (
              <div className="vsu-empty">
                <p className="mb-1 fw-bold">Nothing here yet</p>
                <p className="mb-0">Try a different category, clear your search, or add a new product.</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap gap-3 mb-4">
                {displayedItems.map((item) => {
                  const liveStock = Number(item.stockLeft || 0);
                  const restockQty = getPendingQty(item.id);
                  const isOutOfStock = liveStock <= 0;
                  return (
                    <div key={item.id} className="vsu-product-card position-relative" style={{ opacity: isOutOfStock ? 0.85 : 1 }}>
                      <span
                        className="badge position-absolute"
                        style={{ top: 6, right: 6, fontSize: "9px", zIndex: 3, maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", background: colorForCategory(item.category), color: "#fff" }}
                      >
                        {item.status || "—"}
                      </span>

                      <div className="d-flex justify-content-center align-items-center position-relative" style={{ height: "90px" }}>
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = makePlaceholder(item.name, "adb5bd", "ffffff");
                          }}
                          style={{ maxHeight: "80px", maxWidth: "100%", objectFit: "contain", borderRadius: "6px", backgroundColor: "#f5f5f5" }}
                        />
                        {isOutOfStock && (
                          <div
                            className="position-absolute d-flex justify-content-center align-items-center"
                            style={{ top: 0, left: 0, width: "100%", height: "100%", background: "rgba(255,255,255,0.75)", borderRadius: "6px", zIndex: 2 }}
                          >
                            <span style={{ fontWeight: 500, backgroundColor: "grey", color: "white", fontSize: "10px", borderRadius: "6px", padding: "2px 6px" }}>
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <h6
                        className="text-start fw-bold m-0 mt-1"
                        style={{ fontSize: "11px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.2em", maxHeight: "2.4em" }}
                      >
                        {item.name}
                      </h6>
                      <small className="text-muted" style={{ fontSize: "10px" }}>{item.code}</small>

                      <div className="text-start" style={{ fontSize: "12px", marginTop: "2px" }}>
                        {item.afterDiscount != null && <b className="text-success me-2">₹{Math.round(Number(item.afterDiscount))}</b>}
                        {item.mrp != null && <s className="text-muted">₹{item.mrp}</s>}
                      </div>

                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: "10px", color: "#6B7A70" }}>
                          <span>Live: {liveStock}</span>
                          <span className="fw-bold" style={{ color: "#8a611c" }}>Restock</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between vsu-restock-pill">
                          <button
                            type="button"
                            className="vsu-restock-btn"
                            style={{ opacity: restockQty > 0 ? 1 : 0.4, cursor: restockQty > 0 ? "pointer" : "not-allowed" }}
                            onClick={() => restockQty > 0 && handlePendingChange(item.id, -1)}
                            disabled={restockQty <= 0}
                            title="Decrease restock quantity"
                          >
                            –
                          </button>
                          <span className="fw-bold" style={{ fontSize: "13px" }}>{restockQty}</span>
                          <button
                            type="button"
                            className="vsu-restock-btn"
                            onClick={() => handlePendingChange(item.id, 1)}
                            title="Increase restock quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="d-flex flex-column flex-sm-row gap-2 mb-5">
          <button className="btn vsu-btn-primary px-4 py-2" onClick={handleSave} disabled={saving || dirtyIds.length === 0}>
            {saving ? "Saving..." : `Save Stock${dirtyIds.length > 0 ? ` (${dirtyIds.length})` : ""}`}
          </button>
          <button className="btn vsu-btn-gold-outline px-4 py-2" onClick={handleExport}>
            Export stock JSON
          </button>
        </div>
      </div>

      {/* ---- Floating vendor icon navigation ---- */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1500 }}>
        {showVendorMenu && (
          <div className="bg-white vsu-fab-menu p-2 mb-2" style={{ minWidth: "210px" }}>
            <button className="vsu-fab-menu-item w-100 mb-1" onClick={openAddModal}>
              <AddIcon fontSize="small" /> Add New Product
            </button>
            <button className="vsu-fab-menu-item w-100 mb-1" onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh from server"}
            </button>
            <button className="vsu-fab-menu-item w-100 mb-1" onClick={() => { setShowVendorMenu(false); handlePreview(); }}>
              Preview Products
            </button>
            <button className="vsu-fab-menu-item w-100 mb-1" onClick={() => { setShowVendorMenu(false); handleBackToProfile(); }}>
              Back to Profile
            </button>
            <button className="vsu-fab-menu-item w-100" style={{ color: "#A24B4B" }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        <button
          className="btn vsu-fab rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{ width: "58px", height: "58px" }}
          onClick={() => setShowVendorMenu((prev) => !prev)}
          title="Vendor menu"
        >
          <StorefrontIcon />
        </button>
      </div>

      {/* ---- Add New Product modal ---- */}
      {showAddModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(16,48,31,0.55)", zIndex: 2000 }}
          onClick={closeAddModal}
        >
          <div
            className="bg-white vsu-modal-card"
            style={{ width: "min(520px, 92vw)", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vsu-modal-header d-flex justify-content-between align-items-center">
              <h5 className="vsu-title mb-0">Add New Product</h5>
              <button className="btn btn-sm" style={{ color: "#fff" }} onClick={closeAddModal}>
                <CloseIcon fontSize="small" />
              </button>
            </div>

            <div className="p-4">
              {addError && <div className="alert alert-danger py-2 rounded-3">{addError}</div>}

              <form onSubmit={handleAddSubmit}>
                <div className="mb-2">
                  <label className="form-label mb-1" style={{ fontSize: "13px" }}>Product Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={addForm.name}
                    onChange={(e) => updateAddForm("name", e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1" style={{ fontSize: "13px" }}>Category</label>
                  <select
                    className="form-select form-select-sm"
                    value={addForm.category}
                    onChange={(e) => updateAddForm("category", e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="__new__">+ Add new category</option>
                  </select>
                  {addForm.category === "__new__" && (
                    <input
                      type="text"
                      className="form-control form-control-sm mt-2"
                      placeholder="New category name"
                      value={addForm.newCategory}
                      onChange={(e) => updateAddForm("newCategory", e.target.value)}
                    />
                  )}
                </div>

                {/* Product Code: scan or manual */}
                <div className="mb-2">
                  <label className="form-label mb-1" style={{ fontSize: "13px" }}>Product Code / Barcode</label>
                  <div className="btn-group btn-group-sm mb-2 w-100">
                    <button
                      type="button"
                      className={`btn ${codeMode === "manual" ? "vsu-btn-primary" : "btn-outline-secondary"}`}
                      onClick={() => setCodeMode("manual")}
                    >
                      Enter Manually
                    </button>
                    <button
                      type="button"
                      className={`btn ${codeMode === "scan" ? "vsu-btn-primary" : "btn-outline-secondary"}`}
                      onClick={() => setCodeMode("scan")}
                    >
                      <CameraAltIcon fontSize="small" /> Scan Barcode
                    </button>
                  </div>

                  {codeMode === "manual" ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. RICE-001"
                      value={addForm.code}
                      onChange={(e) => updateAddForm("code", e.target.value)}
                    />
                  ) : (
                    <div>
                      {scanError && <div className="alert alert-warning py-2 rounded-3" style={{ fontSize: "12px" }}>{scanError}</div>}
                      {!scanning ? (
                        <button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={startScan}>
                          Start Camera Scan
                        </button>
                      ) : (
                        <div>
                          <video ref={videoRef} muted playsInline style={{ width: "100%", borderRadius: "10px", backgroundColor: "#000" }} />
                          <button type="button" className="btn btn-outline-secondary btn-sm w-100 mt-2" onClick={stopScan}>
                            Stop Scanning
                          </button>
                        </div>
                      )}
                      <input
                        type="text"
                        className="form-control form-control-sm mt-2"
                        placeholder="Detected code appears here (or type it in)"
                        value={addForm.code}
                        onChange={(e) => updateAddForm("code", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: "13px" }}>Units</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. 1kg"
                      value={addForm.units}
                      onChange={(e) => updateAddForm("units", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: "13px" }}>Starting Stock</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-sm"
                      value={addForm.stockLeft}
                      onChange={(e) => updateAddForm("stockLeft", e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: "13px" }}>MRP (₹)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control form-control-sm"
                      value={addForm.mrp}
                      onChange={(e) => updateAddForm("mrp", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: "13px" }}>Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-control form-control-sm"
                      value={addForm.discount}
                      onChange={(e) => updateAddForm("discount", e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: "13px" }}>Delivery In (mins)</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={addForm.deliveryIn}
                      onChange={(e) => updateAddForm("deliveryIn", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: "13px" }}>Per-customer limit</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-sm"
                      placeholder="Optional"
                      value={addForm.limit}
                      onChange={(e) => updateAddForm("limit", e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label mb-1" style={{ fontSize: "13px" }}>Product Photo (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control form-control-sm"
                    onChange={(e) => setAddPhoto(e.target.files?.[0] || null)}
                  />
                </div>

                <button type="submit" className="btn vsu-btn-primary w-100 py-2" disabled={addSaving}>
                  {addSaving ? "Submitting..." : "Submit for Approval"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorStockUpdatePage;
