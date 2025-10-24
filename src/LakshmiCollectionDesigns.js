import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { Button, Modal} from "react-bootstrap";
import { Dashboard as MoreVertIcon } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LakshmiCollectionDesigns = () => {
  const { id } = useParams();
  const {userId} = useParams();
  const {userType} = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [collectionData, setCollectionData] = useState(null);
  const [attachments, setAttachments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [idx, setIdx] = useState(0);
const [posting, setPosting] = useState(false);
const [postMsg, setPostMsg] = useState("");
const [selectedSize, setSelectedSize] = useState(null);
const [sizeError, setSizeError] = useState("");
const [selectedColor, setSelectedColor] = useState(null);
const [colorError, setColorError] = useState("");
const [showZoomModal, setShowZoomModal] = useState(false);
const [zoomImage, setZoomImage] = useState("");

useEffect(() => {
  console.log(loading, err, postMsg);
}, [loading, err, postMsg]);

 const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc); 
    setShowZoomModal(true);
  };
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTicketData = async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/UploadLakshmiCollection/GetLakshmiCollections?id=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setCollectionData(data);
        const imgFiles = Array.isArray(data.images) ? data.images : []; 
        const imageRequests =
          imgFiles.map((fileName) =>
            fetch(
              `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(
                fileName
              )}`
            )
              .then((r) => {
                if (!r.ok) throw new Error("Image fetch failed");
                return r.json();
              })
              .then((payload) => ({
                fileName,
                imageData: payload?.imageData || null, 
              }))
          ) || [];
        const imgs = await Promise.all(imageRequests);
        setAttachments(imgs.filter((i) => !!i.imageData));
      } catch (err) {
        console.error("Error fetching collection:", err);
        setErr(
          err?.message ||
            "Something went wrong while loading the collection. Please try again."
        );
      } finally {
        setLoading(false);
      }      
    };
    if (id) fetchTicketData();
  }, [id]);

  // Parse colors from the "colour" field
const parseColors = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((c) => String(c).trim()).filter(Boolean);
  if (typeof raw === "string")
    return raw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
  return [];
};

const colors = useMemo(() => parseColors(collectionData?.colour), [collectionData?.colour]);

const parseSizesWithStock = (raw) => {
  if (!raw) return [];
  const toPair = (token) => {
    const t = String(token).trim();
    let m = t.match(/^([A-Za-z0-9]+)\s*[:-]\s*(\d+)$/);
    if (m) return { size: m[1], stock: Math.max(0, Number(m[2]) || 0) };
    m = t.match(/^([A-Za-z0-9]+)\s*\((\d+)\)$/);
    if (m) return { size: m[1], stock: Math.max(0, Number(m[2]) || 0) };
    return { size: t, stock: null };
  };

  if (Array.isArray(raw)) return raw.map(toPair);
  if (typeof raw === "string") return raw.split(",").map((x) => x.trim()).filter(Boolean).map(toPair);
  if (typeof raw === "object" && raw.size)
    return [{ size: String(raw.size), stock: Math.max(0, Number(raw.stock ?? 0) || 0) }];
  return [];
};

const sizes = useMemo(() => parseSizesWithStock(collectionData?.size), [collectionData?.size]);

const stockLabel = (stock) => {
  if (stock === null || stock === undefined) return ""; 
  if (stock <= 0) return "No stock";
  if (stock === 1) return "1 left";
  return `${stock} left`;
};

const allOutOfStock = sizes.length > 0 && sizes.every(s => (s.stock ?? 0) <= 0);
// const selectedSizeStock = useMemo(() => {
//   const found = sizes.find(s => s.size === selectedSize);
//   return found?.stock ?? null;
// }, [sizes, selectedSize]);

  const hasImages = attachments && attachments.length > 0;
  const currentImg =
    hasImages && attachments[idx]?.imageData
      ? `data:image/*;base64,${attachments[idx].imageData}`
      : null;
  const nextImg = () =>
    setIdx((p) => (attachments.length ? (p + 1) % attachments.length : 0));
  const prevImg = () =>
    setIdx((p) =>
      attachments.length ? (p - 1 + attachments.length) % attachments.length : 0
    );

    const onPostSelection = async (event) => {
      event.preventDefault();
  if (!collectionData) return;

   let valid = true;

  if (sizes.length > 0 && !selectedSize) {
    setSizeError("Please select a size before adding to cart.");
    valid = false;
  } else {
    setSizeError("");
  }

  if (colors.length > 0 && !selectedColor) {
    setColorError("Please select a color before adding to cart.");
    valid = false;
  } else {
    setColorError("");
  }

  if (!valid) {
    const targetId = !selectedSize
      ? "size-section"
      : !selectedColor
      ? "color-section"
      : null;
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return; 
  }

  const selectedImageFileName =
    attachments?.[idx]?.fileName ?? (Array.isArray(collectionData.images) && collectionData.images[0]) ?? "";
  const rate = Number(collectionData?.rate ?? 0);
  const after = Number(collectionData?.afterDiscount ?? rate);
  const qty = 1;

  // const updatedSizes = sizes.map((s) => {
  //   if (s.size === selectedSize) {
  //     const newStock = Math.max(0, (s.stock ?? 0) - qty);
  //     return { ...s, stock: newStock };
  //   }
  //   return s;
  // });

  //  const updatedSizeString = updatedSizes
  //   .map(({ size, stock }) => `${size}-${stock}`)
  //   .join(", ");

   // Find remaining stock for the selected size
    // const selectedSizeRemaining = updatedSizes.find(
    //   (s) => s.size === selectedSize
    // )?.stock ?? 0;

   const payload = {
    id: collectionData.id,                                       
    lakshmicollectionId: collectionData.lakshmicollectionId ?? "",
    date: "string",                             
    customerId: userId,
    customerName: "",
    customerPhonenumber: "",
    stockLeft: String(collectionData.stockLeft - qty),
    // stockLeft: `${selectedSize}-${selectedSizeRemaining}`,
    totalItemsSelected: String(qty),                                      
    address: "",
    state: "",
    district: "",
    zipCode: "",
    status: "",
    isDelivered: false,
    latitude: 0,
    longitude: 0,
    paymentMode: "",
    utrTransactionNumber: "",
    transactionNumber: "",
    transactionStatus: "",
    transactionType: "",
    DeliveryPartnerUserId: "",
    AssignedTo: "",
    paidAmount: "0",
    grandTotal: String(Math.round(after * qty)),                 
    categoriess: [
      {
        categoryName: collectionData.category,
        productname: collectionData.productName ?? "",    
        mrp: rate.toString(), 
        code: "",                                             
        discount: (collectionData.discount ?? 0).toString(),
        afterDiscountPrice: after.toString(),
        productImage: String(selectedImageFileName),              
        size: String(selectedSize ?? collectionData.size ?? ""),
        colour: selectedColor,
        stockLeft: String(collectionData.stockLeft - qty),
        noOfQuantity: String(qty),
      },
    ],
  };
  try {
    setPosting(true);
    setPostMsg(null);
    const res = await fetch(
      "https://handymanapiv2.azurewebsites.net/api/LakshmiCollection/UploadColectionsDetails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );   
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`POST failed (${res.status}): ${txt || res.statusText}`);
    }
    const data = await res.json();
    const uploadedId = data?.id;
    localStorage.setItem("uploadedId", uploadedId);
    //  setCollectionData((prev) => ({
    //   ...prev,
    //   size: updatedSizeString,
    // }));
    navigate(`/lakshmiCollectionCart/${userType}/${userId}`);
  } catch (err) {
    console.error("Failed to add to cart:", err);
  } finally {
    setPosting(false);
  }
};

  return (
    <>
<div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundImage: "linear-gradient(#ff9800, #ff5722, #ff4081)",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  }}
>
  <div style={{ display: "flex", alignItems: "center", padding: "8px" }}>
    <button
      onClick={() => navigate(`/lakshmiCollections/${userType}/${userId}`)}
      aria-label="Back"
      style={{
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        padding: 4,
      }}
    >
      <ArrowBackIcon />
    </button>
    <h1
      style={{
        flex: 1,
        margin: 0,
        textAlign: "center",
        fontFamily: "'Baloo 2'",
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: "1px",
      }}
    >
      Lakshmi Collections
    </h1>
    <span style={{ width: 36 }} />
  </div>
</div>


      <div className="d-flex flex-row justify-content-start align-items-start" style={{ marginTop: 70 }}>
        {/* Sidebar */}
        {!isMobile && (
          <div className="ml-0 p-0 adm_mnu h-90">
            <Sidebar />
          </div>
        )}

        {isMobile && (
          <div className="collectionfloating-menu">
            <Button
              variant="primary"
              className="rounded-circle shadow"
              onClick={() => setShowMenu(!showMenu)}>
              <MoreVertIcon />
            </Button>

            {showMenu && (
              <div className="sidebar-container">
                <Sidebar />
              </div>
            )}
          </div>
        )}

        {/* Main */}
        <div className={`container ${isMobile ? "w-100" : "w-75"}`}>
              <div className="row">
                {/* Image Section */}
                <div className="col-12 col-md-6">
                  <div className="position-relative border rounded-3 d-flex justify-content-center align-items-center" style={{ minHeight: 310 }}>
                    {currentImg ? (    
                      <img
                        src={currentImg}
                        alt={attachments[idx]?.fileName || "Product"}
                        className="img-fluid"
                        style={{ maxHeight: 300, width: "60%",  cursor: "zoom-in", borderRadius: "10px"}}
                        onClick={() => handleImageClick(currentImg)}
                      />
                    ) : (
                      <div className="text-muted">image Loading</div>
                    )}

                    {/* Discount badge on image (top-right) */}
                      {Number(collectionData?.discount) > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            padding: "6px",
                            borderRadius: "50%",
                            fontWeight: 700,
                            fontSize: 12,
                            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                            color: "#fff",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            lineHeight: 1,
                            zIndex: 2,
                          }}
                        >
                          {Math.round(Number(collectionData.discount))}% 
                        </div>
                      )}

                    {hasImages && attachments.length > 1 && (
                      <>
                        <Button
                          variant="white"
                          className="position-absolute top-50 start-0 translate-middle-y"
                          onClick={prevImg}
                        >
                          ‹
                        </Button>
                        <Button
                          variant="white"
                          className="position-absolute top-50 end-0 translate-middle-y"
                          onClick={nextImg}
                        >
                          ›
                        </Button>
                      </>
                    )}
                  </div>
                  {hasImages && attachments.length > 1 && (
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {attachments.map((a, i) => (
                        <button
                          key={a.fileName + i}
                          className={`border rounded ${i === idx ? "border-2" : ""}`}
                          style={{
                            padding: 0,
                            background: "transparent",
                            outline: "none",
                          }}
                          onClick={() => setIdx(i)}
                          title={a.fileName}
                        >
                          <img
                            src={`data:image/*;base64,${a.imageData}`}
                            alt={a.fileName}
                            style={{ width: 64, height: 75, objectFit: "cover", borderRadius: 6 }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="col-12 col-md-6">
                  <h2 style={{ fontFamily: "'Baloo 2'",fontSize: "18px", fontWeight: "bold"}}>{collectionData?.productName || "—"}</h2>
                  <div className="d-flex align-items-end gap-3 mb-2">
                    {collectionData?.afterDiscount && (
                      <span className="fw-bold" style={{ fontSize: "14px", color: "black"}}>₹{Math.round(collectionData.afterDiscount)}</span>
                    )}
                     {collectionData?.rate && (
                      <span className="text-muted text-decoration-line-through" style={{ fontSize: "14px"}}>
                        ₹{collectionData.rate}
                      </span>
                    )} 
                    {/* {collectionData?.discount && (
                      <span className="fw-bold" style={{ fontSize: "14px", color: "red"}}>₹{collectionData.discount}%</span>
                    )} */}
                  </div>

                   {/* Color Selection */}
                  <div id="color-section" className="">
                    <div className="fw-semibold">Select Color</div>
                    {colors.length === 0 ? (
                      <div className="text-muted small">No colors available</div>
                    ) : (
                      <div className="d-flex flex-wrap gap-3">
                        {colors.map((color) => {
                          const isSelected = selectedColor === color;
                          return (
                            <button
                              key={color}
                              type="button"
                              className={`btn btn-sm ${isSelected ? "btn-danger" : "btn-outline-danger"}`}
                              onClick={() => {
                                setSelectedColor(isSelected ? null : color);
                                setColorError("");
                              }}
                              aria-pressed={isSelected}
                              style={{ minWidth: 60 }}
                            >
                              {color}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <div className="mt-1">
                      {colorError && <p className="text-danger mb-0" style={{fontSize: "12px"}}>{colorError}</p>}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div id="size-section" className="">
                    <div className="fw-semibold">Select Size</div>
                    {sizes.length === 0 ? (
                      <div className="text-muted small">No size info available</div>
                    ) : (
                      <div className="d-flex flex-wrap gap-3">
                        {sizes.map(({ size, stock }) => {
                          const isSelected = selectedSize === size;
                          const outOfStock = (stock ?? 0) <= 0;
                          return (
                            <div key={size} className="d-flex flex-column align-items-center" style={{ minWidth: 40 }}>
                              <button
                                type="button"
                                className={`btn btn-sm ${isSelected ? "btn-danger" : "btn-outline-danger"}`} 
                                onClick={() => {
                                  if (outOfStock) return;
                                  setSelectedSize(isSelected ? null : size);
                                  setSizeError("");
                                }}
                                disabled={outOfStock}
                                aria-pressed={isSelected}
                                aria-disabled={outOfStock}
                                style={{ minWidth: 45 }}
                                title={outOfStock ? "Out of stock" : `${stockLabel(stock)}`}
                              >
                                {size}
                              </button>
                              <div
                                className={`small mt-1 ${outOfStock ? "text-danger" : "text-muted"}`}
                                style={{ lineHeight: 1, fontSize: "12px" }}
                              >
                                {stockLabel(stock)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {/* Validation error */}
                    <div className="mt-1">
                      {sizeError && <p className="text-danger mb-0" style={{fontSize: "12px"}}>{sizeError}</p>}
                    </div>
                    {sizes.length > 0 && allOutOfStock && (
                      <div className="mt-2 text-danger fw-semibold">This item is currently out of stock.</div>
                    )}
                  </div>
                  
                  {/* Description Pairs */}
                  {Array.isArray(collectionData?.descriptions) &&
                    collectionData.descriptions.length > 0 && (
                      <div className="mb-2">
                        <div className="fw-semibold">Description</div>
                        <ul className="list-unstyled mb-0">
                          {collectionData.descriptions.map((d, i) => (
                            <li key={`${d.name}-${i}`} className="small">
                              <span className="text-muted">{d.name?.trim()}:</span>{" "}
                              <span className="fw-semibold">{d.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div className="d-flex justify-content-between gap-2 mb-1">
                    <Button
                      variant="outline-secondary" style={{fontWeight: "bold"}}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      Top ↑ 
                    </Button>
                    <button
                      style={{ background: "#ff4080b7", color: "white", borderRadius: "10px", padding: "4px", fontWeight: "bold" }}
                      onClick={onPostSelection}
                      disabled={
                        posting ||
                        !collectionData ||
                        allOutOfStock }
                      title={
                        allOutOfStock
                          ? "Out of stock"
                          : "Add to cart"
                      }
                    >
                      {posting ? "Submitting..." : (allOutOfStock ? "Out of Stock" : "Add To Cart")}
                    </button>
                  </div>        
                </div>
              </div> 
        </div>
         <Modal show={showZoomModal} onHide={() => setShowZoomModal(false)} centered>
          <button className="close-button text-end mt-0" onClick={() => setShowZoomModal(false)}>
              &times; </button>
                <Modal.Body className="text-center">
                  <div className="zoom-container">
                    <img src={zoomImage} alt="Zoomed Product" className="zoom-image" />
                  </div>
                </Modal.Body>
              </Modal>
      </div>
    </>
  );
};

export default LakshmiCollectionDesigns;
