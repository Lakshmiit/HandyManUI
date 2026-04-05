import React, { useState, useEffect} from "react";
import "./App.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Footer from './Footer.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack} from '@mui/icons-material';
// import ForwardIcon from '@mui/icons-material/Forward';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import axios from "axios";
// import { appConfig } from "./config";

const AdminGroceryOrderPage = () => {
  const navigate = useNavigate(); 
  const {groceryItemId} = useParams();
  const [martId, setMartId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  // const [showMenu, setShowMenu] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState(''); 
  const [id, setId] = useState("");  
const [assignedTo, setAssignedTo] = useState('');
const [loading, setLoading] = useState(true);
const [paymentMode, setPaymentMode] = useState('');
const [transactionDetails, setTransactionDetails] = useState('');
const [customerId, setCustomerId] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [customerName, setCustomerName] = useState('');
const [date, setDate] = useState('');
const [error, setError] = useState('');
const [items, setItems] = useState([]);
const [deliveryPartners, setDeliveryPartners] = useState([]);
const [selectedPartner, setSelectedPartner] = useState(""); 
const [longitude, setLongitude] = useState(""); 
const [latitude, setLatitude] = useState(""); 
const [grandTotal, setGrandTotal] = useState(""); 
const [paidAmount, setPaidAmount] = useState(""); 
const [transactionNumber, setTransactionNumber] = useState(""); 
const [transactionStatus, setTransactionStatus] = useState(""); 
 const [totalItemsSelected, setTotalItemsSelected] = useState(""); 
const [cartData, setCartData] = useState(null);
const [code, setCode] = useState("");
const [units, setUnits] = useState("");
 const [groceryData, setgroceryData] = useState();
  const [groceryId, setgroceryId] = useState();
const [cashbackAmount, setCashbackAmount] = useState(0);
const showFreeSugar = Number(grandTotal) > 599 && Number(grandTotal) < 998;
// const showAttaSugar = Number(grandTotal) > 499 && Number(grandTotal) < 999;
 const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [zoomProduct, setZoomProduct] = useState(null);
  // const [giftName, setGiftName] = useState("");
// const [freeItemImage, setFreeItemImage] = useState(null);
// const [freeItemName, setFreeItemName] = useState("");
useEffect(() => {
    const fetchCart = async () => {
      if (!groceryItemId) return;

      const ctrl = new AbortController();
      try {
        const res1 = await fetch(
          `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/GetProductDetails?id=${groceryItemId}`,
          { signal: ctrl.signal }
        );
        if (!res1.ok) throw new Error("Failed to fetch product details");
        const data = await res1.json();
        setCartData(data);
        setMartId(data.martId);
        setGrandTotal(data.grandTotal);
        setTotalItemsSelected(data.totalItemsSelected);
        setCustomerName(data.customerName);
        setDate(data.date);
        const products = (data?.categories ?? []).flatMap(
          (c) => c?.products ?? []
        );
        const selected = products.filter(
          (p) =>
            p?.isSelected || p?.selected || (p?.qty ?? p?.quantity ?? 0) > 0
        );
        const baseList = selected.length ? selected : products;
        const productNames = Array.from(
          new Set(baseList.map((p) => p?.productName?.trim()).filter(Boolean))
        );

        if (productNames.length === 0) {
          console.warn("⚠️ No product names found in the first API response");
          setgroceryData([]);
          setgroceryId(null);
          return;
        }

        const requests = productNames.map(async (name) => {
          const url = `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
            name
          )}`;
          const res = await fetch(url, { signal: ctrl.signal });
          if (!res.ok)
            throw new Error(
              `UploadGrocery failed for "${name}" (HTTP ${res.status})`
            );
          const items = await res.json();
          const arr = Array.isArray(items) ? items : items ? [items] : [];
          return arr.map((it) => ({ ...it, _matchedProductName: name }));
        });
        const settled = await Promise.allSettled(requests);

        const allItems = [];
        settled.forEach((r, idx) => {
          const n = productNames[idx];
          if (r.status === "fulfilled") {
            allItems.push(...r.value);
          } else {
            console.warn(`UploadGrocery lookup failed for "${n}":`, r.reason);
          }
        });

        setgroceryData(allItems);
        const firstId = allItems?.[0]?.id ?? null;
        setgroceryId(firstId);
        console.log("✅ Combined UploadGrocery items:", allItems);
        console.log("✅ First grocery id:", firstId);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err.message || String(err));
        console.error("Error fetching cart data:", err);
      }
      return () => ctrl.abort();
    };
    fetchCart();
  }, [groceryItemId]);

useEffect(() => {
  console.log(groceryData,groceryId, id, customerId, loading, longitude, latitude, grandTotal, paidAmount, transactionNumber, transactionStatus, totalItemsSelected, cartData, code, units);
}, [groceryData, groceryId,id,customerId, loading, longitude, latitude, grandTotal, paidAmount, transactionNumber, transactionStatus, totalItemsSelected, cartData, code, units]);

useEffect(() => {
  const fetchDeliveryPartners = async () => {
    try {
      const response = await axios.get(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/DeliveryPartner/GetAllDeliveryPartners`);
      const partners = response.data.filter(partner => partner.status === "open");
      setDeliveryPartners(partners);
    } catch (error) {
      console.error("Error fetching delivery partners:", error);
    }
  };
  fetchDeliveryPartners();
}, []);

useEffect(() => {
  const fetchGroceryData = async () => {
    try {
      const response = await fetch(
        `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/GetProductDetails?id=${groceryItemId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch grocery product data");
      }
      const data = await response.json();
      console.log("Fetched Grocery Data:", data);
      setCartData(data);
      setCustomerId(data.userId);
      setId(data.id);
      setMartId(data.martId); 
      setCustomerName(data.customerName);
      setMobileNumber(data.customerPhoneNumber);
      setAddress(data.address);
      setState(data.state);
      setDistrict(data.district);
      setPincode(data.zipCode);
      setPaymentMode(data.paymentMode);
      setTransactionDetails(data.utrTransactionNumber);
      setLongitude(data.longitude);
      setLatitude(data.latitude);
      setGrandTotal(data.grandTotal);
      setPaymentMode(data.paymentMode);
      setTotalItemsSelected(data.totalItemsSelected);
      setTransactionStatus(data.transactionStatus);
      setPaidAmount(data.paidAmount);
      setTransactionNumber(data.transactionNumber);
      
      let allProducts = [];
      let totalAmountFromApi = 0;

      if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((cat) => {
          totalAmountFromApi += Number(cat.totalAmount) || 0;
          cat.products.forEach((p, idx) => {
            allProducts.push({
               id: p.productImage, 
              serial: allProducts.length + 1,
              name: p.productName,
              category: cat.categoryName,
              mrp: p.mrp,
              discount: Math.round(p.discount),
              afterDiscountPrice: p.afterDiscountPrice,
              quantity: p.noOfQuantity,
              total: Math.round(p.afterDiscountPrice * p.noOfQuantity),
              code: p.code,
              units: p.units,
              image: p.productImage,
            });
          });
        });
        setItems(allProducts);
        if (allProducts.length > 0) {
        setCode(allProducts[0].code || "");
        setUnits(allProducts[0].units || "");
        }
      }
      const grandTotalNumeric = Number(data.grandTotal) || 0;
      const cashback = totalAmountFromApi - grandTotalNumeric;
        
      if ((cashback >= 49 && cashback <= 51) ||(cashback >= 29 && cashback <= 31) || (cashback >= 99 && cashback <= 101) || (cashback >= 149 && cashback <= 151) || (cashback >= 199 && cashback <= 201))
      {
        setCashbackAmount(cashback);                       
      } else {
        setCashbackAmount(0);        
      }

      // const numericGrandTotal = Number(data.grandTotal) || 0;
      // let gift = "";
      // if (numericGrandTotal >= 1699 && numericGrandTotal <= 1998) {
      //   gift = "Paras Miracle Pedal Dustbin";
      // } 
      // else if (numericGrandTotal >= 2499) {
      //   gift = "Oliveware Easy Meal Lunch Box";
      // }
      // setGiftName(gift);

//       let offerImage = null;
// let offerName = "";

// if (grandTotal >= 199 && grandTotal <= 298) {
//   offerImage = Container1Img;
//   offerName = "Masti Oye Masala Noodles 60 g + Thums Up Soft Drink 250 ml";
// }
// else if (grandTotal >= 299 && grandTotal <= 398) {
//   offerImage = Container2Img;
//   offerName = "Nayasa Use Max Plastic Storage Container Pack 1";
// }
// else if (grandTotal >= 399 && grandTotal <= 498) {
//   offerName = "₹50 Cashback";
// }
// else if (grandTotal >= 499 && grandTotal <= 598) {
//   offerImage = Container3Img;
//   offerName = "Home One Plastic Container 550 ml";
// }
// else if (grandTotal >= 599 && grandTotal <= 698) {
//   offerImage = Container4Img;
//   offerName = "Max Store Food Storage Container Pack 3";
// }
// else if (grandTotal >= 699) {
//   offerImage = Container5Img;
//   offerName = "Nayasa Use Max Plastic Storage Container Pack 3";
// }
// setFreeItemImage(offerImage);
// setFreeItemName(offerName);
    } catch (error) {
      console.error("Error fetching grocery product data:", error);
    } finally {
      setLoading(false);
    }
  };   
  if (groceryItemId) {
    fetchGroceryData();
  }
}, [groceryItemId, grandTotal]);
   
const handleAssignedToChange = (e) => {
  const selectedAssignedTo = e.target.value;
  setAssignedTo(selectedAssignedTo);
  setError({});
};

// ForwardIcon 
//   const handleUpdatePaymentMethod = async () => {
//     try {   
//       const partner = deliveryPartners.find(p => p.deliveryPartnerId === selectedPartner);
//   const payload = {
//     ...cartData,
//     customerName: customerName,
//     address: address, 
//     state: state,
//     district: district,
//     zipCode: pincode,
//     customerPhoneNumber: mobileNumber,
//     id: groceryItemId,
//     userId: customerId, 
//     martId: martId,
//     date: new Date(),
//     grandTotal: grandTotal,
//     totalItemsSelected: totalItemsSelected,
//     status: "In Progress", 
//     paymentMode: paymentMode,
//     utrTransactionNumber: transactionDetails,
//     transactionNumber: transactionNumber,
//     transactionStatus: transactionStatus,
//     paidAmount: paidAmount,
//     AssignedTo: partner? partner.deliveryPartnerName: "",
//     DeliveryPartnerUserId: partner? partner.userId: "",
//     latitude: latitude,
//     longitude: longitude,
//     code: code,
//     units: units,
//   };

//     let response = await fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to Update Delivery Partner.');
//     }
//     alert(`Ticket has been assigned to ${partner ? partner.deliveryPartnerName : ""}`);
//     navigate(`/adminNotifications`);
//   } catch (error) {
//     console.error('Error:', error);
//     window.alert('Failed to Update Delivery Partner. Please try again later.');
//   }
// };

  // Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); 
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

   const handleSubmit = (e) => {
     e.preventDefault();
   };

const addHeader = (doc, martId) => {
  doc.setTextColor(0, 0, 0); 
  doc.setFontSize(12);
  doc.setFont("Roboto", "bold");
  doc.text("Handyman", 14, 12);
  doc.text("Lakshmi Mart", 195, 12, { align: "right" });
  doc.setLineWidth(0.5);
  doc.line(14, 15, 195, 15);
  doc.setFontSize(11);
  doc.setFont("Roboto", "bold");
  doc.text(`Order Number: ${martId}`, 105, 22, { align: "center" });
};

const addFooter = (doc) => {
  const pageHeight = doc.internal.pageSize.height;
  doc.setLineWidth(0.5);
   doc.line(
    20,                
    pageHeight - 15,    
    190,                
    pageHeight - 15    
  );
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Roboto", "bold");
  doc.text(
    "For Support : Call / WhatsApp 6281198953 | Mon–Sun : 7:00 AM – 9:00 PM",
    105,    
    pageHeight - 10,
    { align: "center" }            
  );
};

const handleDownloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");
  const PAGE_HEIGHT = doc.internal.pageSize.height;
  const FOOTER_SPACE = 25;
  const TOP_MARGIN = 30;
  addHeader(doc, martId);
  addFooter(doc);
  doc.setFont("Roboto", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Customer Name: ${customerName || ""}`, 14, 28);  const addressText = `Customer Address: ${[
    address,
    district,
    state,
    pincode,
    mobileNumber,
  ].filter(Boolean).join(", ")}`;

  doc.text(addressText || "", 14, 32, { maxWidth: 180 });
  doc.text(`Date: ${date ? date.split("T")[0] : ""}`, 14, 42);  autoTable(doc, {
    startY: 48,
    head: [[
      "S.No",
      "Photo",
      "Item Name",
      "Category",
      "MRP",
      "Dis (%)",
      "Price",
      "Qty",
      "Total",
    ]],
    body: items.map((item, index) => [
      index + 1,
      "",
      item.name,
      item.category,
      `Rs. ${Math.round(item.mrp)}`,
      `${Math.round(item.discount)}%`,
      `Rs. ${Math.round(item.afterDiscountPrice)}`,
      item.quantity,
      `Rs. ${Math.round(item.total)}`,
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: [255, 255, 255],
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 25 },
      2: { cellWidth: 40 },
      3: { cellWidth: 25 },
      4: { cellWidth: 20, halign: "right" },
      5: { cellWidth: 15, halign: "right" },
      6: { cellWidth: 23, halign: "right" },
      7: { cellWidth: 12, halign: "center" },
      8: { cellWidth: 23, halign: "right" },
    },
    didDrawCell(data) {
      if (data.column.index === 1 && data.cell.section === "body") {
        const item = items[data.row.index];
        const imgData = imageUrls[item?.id];
        if (!imgData) return;

        const size = 14;
        const x = data.cell.x + (data.cell.width - size) / 2;
        const y = data.cell.y + (data.cell.height - size) / 2;

        doc.addImage(imgData, "JPEG", x, y, size, size);
      }
    },
    didDrawPage() {
      addHeader(doc, martId);
      addFooter(doc);
    },
  });

  doc.setFont("Roboto", "normal");
  doc.setTextColor(0, 0, 0);

  const uiGrandTotal = Math.round(    
    items.reduce((sum, item) => sum + Number(item.total), 0)
  );

  let pdfCashback = 0;
  if (
    (cashbackAmount >= 49 && cashbackAmount <= 51) ||
    (cashbackAmount >= 29 && cashbackAmount <= 31) ||
    (cashbackAmount >= 99 && cashbackAmount <= 101) ||
    (cashbackAmount >= 149 && cashbackAmount <= 151)||
    (cashbackAmount >= 199 && cashbackAmount <= 201)
  ) {
    pdfCashback = cashbackAmount;
  }

  const pdfShowFreeSugar =
    Number(grandTotal) > 599 && Number(grandTotal) < 998;
  //   const pdfshowAttaSugar =
  //   Number(grandTotal) > 499 && Number(grandTotal) < 999;
  let currentY = doc.lastAutoTable.finalY + 10;

  let requiredHeight = 12;
  if (pdfCashback > 0) requiredHeight += 6;
  if (pdfShowFreeSugar) requiredHeight += 6;
  // if (pdfshowAttaSugar) requiredHeight += 6;
  if (currentY + requiredHeight > PAGE_HEIGHT - FOOTER_SPACE) {
    doc.addPage();
    addHeader(doc, martId);
    addFooter(doc);
    currentY = TOP_MARGIN + 10;
  }
  if (pdfCashback > 0) {
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Cashback Applied : Rs. ${pdfCashback}`,
      195,
      currentY,
      { align: "right" }
    );
    currentY += 6;
  }

 if (pdfShowFreeSugar) {
  doc.setFontSize(10);
  doc.setTextColor(0, 128, 0);
  doc.setFont("Roboto", "bold");
  doc.text(
    "🎁 Give Customer Sugar 1 Kg FREE",
    195,
    currentY,
    { align: "right" }
  );
  currentY += 8;
}

//   if (pdfshowAttaSugar) {
//   doc.setFontSize(10);
//   doc.setTextColor(0, 128, 0);
//   doc.setFont("Roboto", "bold");
//   doc.text(
//     "🎁 Give Customer Sugar 1 Kg FREE",
//     195,
//     currentY,
//     { align: "right" }
//   );
//   currentY += 8;
// }

  doc.setFont("Roboto", "bold");
  doc.setFontSize(11);
  doc.setTextColor(200, 0, 0); 
  doc.text(
    `Grand Total : Rs. ${uiGrandTotal}`,
    195,
    currentY,
    { align: "right" }
  );
  doc.save(`Grocery_Order_${martId}.pdf`);
};

useEffect(() => {
  if (!items.length) return;        
  const controller = new AbortController();
  async function loadImages() {
    const map = {};
    await Promise.all(
      items.map(async (item) => {
        if (!item.image) return;
        try {
          const res = await fetch(
            `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(
              item.image
            )}`,
            { signal: controller.signal }
          );
          const json = await res.json();
          if (!json?.imageData) return;
          map[item.id] = `data:image/jpeg;base64,${json.imageData}`;
        } catch (err) {
          console.error("Image fetch failed:", err);
        }
      })
    );
    setImageUrls(map);
  }
  loadImages();
  return () => controller.abort();
}, [items]);

const handleImageClick = (imageSrc, product) => {
    setZoomImage(imageSrc);
    setZoomProduct(product);
    setShowZoomModal(true);
  };
  
  return (
  <>
<div className="d-flex flex-row justify-content-start align-items-start" style={{marginTop: "130px"}}>
      {/* Sidebar menu for Larger Screens */}
      {/* {!isMobile && (
        <div className=" ml-0 p-0 adm_mnu h-90">
          <AdminSidebar />
        </div>
      )} */}   

      {/* {isMobile && (
        <div className="floating-menu">
          <Button
            variant="primary"
            className="rounded-circle shadow"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertIcon />
          </Button>
          {showMenu && (
            <div className="sidebar-container">
              <AdminSidebar />
            </div>
          )}
        </div>
      )} */}

      {/* Main Content */}
      <div className={`container ${isMobile ? 'w-100' : 'w-75'}`}>
      <h3 className="text-center">Grocery Items Orders</h3>
        <div className="rounded-3bx_sdw w-100">
          <form className="form" onSubmit={handleSubmit}>
                <div className="text-center">
                <strong className="fs-5">Order Number:<span>{martId}</span></strong>
                </div>
                <div className="row">
                <div className="col-md-6 form-group">
              <label>
                Customer Name <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                placeholder="Customer Name"
                readOnly
              />
            </div>
            
             <div className="col-md-6 form-group">
            <label>
              Customer Address <span className="req_star">*</span>
            </label>
            <textarea
              className="form-control"
              style={{
                overflow: "hidden",
                resize: "none",
                minHeight: "80px",
              }}
              value={[address, district, state, pincode, mobileNumber]
                .filter(Boolean)
                .join(", ")}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Customer Address"
              readOnly
            ></textarea>
          </div>
          <div className="col-md-6 form-group">Date: {date ? date.split("T")[0] : ""}</div> 
               </div>     
      <h4 className="m-0">Grocery Items</h4>
<table className="table table-bordered table-striped">
  <thead>
    <tr>
      <th style={{ background: "green", color: "white" }}>Sl. No</th>
      <th style={{ background: "green", color: "white" }}>Item Name</th>
      <th style={{ background: "green", color: "white" }}>Photo</th>
      <th style={{ background: "green", color: "white" }}>Code</th>
      <th style={{ background: "green", color: "white" }}>Category</th>
      <th style={{ background: "green", color: "white" }}>MRP</th>
      <th style={{ background: "green", color: "white" }}>Discount (%)</th>
      <th style={{ background: "green", color: "white" }}>
        After Discount <br /> Price
      </th>
      <th style={{ background: "green", color: "white" }}>
        Required <br /> Quantity
      </th>
      <th style={{ background: "green", color: "white" }}>Total</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item, idx) => (
      <tr key={idx}>
        <td>{item.serial}</td>
        <td>{item.name}</td>
        <td>
          {imageUrls[item.id] ? (
            <img
              src={imageUrls[item.id]}
              alt={item.name}
              onClick={() => handleImageClick(imageUrls[item.id], item)}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                borderRadius: "6px",
                border: "1px solid red",
              }}
            />
          ) : (
            <span className="text-muted small">Loading</span>
          )}
        </td>
        <td>{item.code}</td>
        <td>{item.category}</td>
        <td>₹{item.mrp}</td>
        <td>{item.discount}%</td>
        <td>₹{item.afterDiscountPrice.toFixed(0)}</td>
        <td>{item.quantity}</td>
        <td>₹{item.total.toFixed(0)}</td>
      </tr>
    ))}
  </tbody>
  <tfoot>
     {cashbackAmount > 0 && (
    <tr>
      <td colSpan="9" className="text-end fw-bold text-danger">
        Cashback Applied:
      </td>
      <td className="fw-bold text-success">
        ₹{cashbackAmount}
      </td>
    </tr> 
  )}
  {showFreeSugar && (
    <tr>
      <td colSpan="10" className="text-end fw-bold text-danger">
        🎁 Give Customer <strong> Sugar 1 Kg FREE</strong>
      </td>    
    </tr>
  )} 
  
{/* {giftName && (
<tr>
  <td colSpan="9" className="text-end fw-bold text-success">
    🎁 Free Gift:
  </td>
  <td className="fw-bold text-danger">
    {giftName}
  </td>
</tr>
)} */}
    <tr>
      <td colSpan="9" className="text-end fw-bold">
        Grand Total:
      </td>
      <td className="fw-bold">     
        ₹{grandTotal}
      </td>
    </tr>   
  </tfoot>  
</table>
<div className="text-end mt-1">
  <button
          style={{
            background: "red",
            color: "white",
            borderRadius: "20px",
            padding: "6px 14px",
          }}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
</div>

        <div className='payment'>
        <label className='fw-bold fs-5 w-100 p-2' style={{ background: "green", color: "white", borderRadius: "15px", width: "25px" }}>Payment Mode</label>
        <label className='fs-5 '>
            <input 
            type="radio" 
            className="form-check-input border-secondary m-2 border-dark"
            checked={paymentMode === 'online'}
            readOnly
             />
            Pay Through Online
          </label>
          <label className='fs-5'>
            <input 
            type="radio" 
            className="form-check-input border-secondary border-dark m-2"
            checked={paymentMode === 'cash'}
            readOnly
            />
            Cash On Delivery
          </label>
    </div> 

    <div className="form-group mt-0">
              <label>Payment Transaction Details </label>
              <input
                type="text"
                className="form-control "
                value={transactionDetails}
                onChange={(e) => setTransactionDetails(e.target.value)}
                placeholder="Payment Transaction Details"
                readOnly
              />
            </div>
            <Row>
                  {/* Assigned To */}
                  <Col md={12}>
                    <Form.Group>
                      <label>Assigned To</label>
                      <Form.Control as="select" value={assignedTo} onChange={handleAssignedToChange} required>
                        <option value="">Select Assigned</option>
                        <option value="Delivery Partner">Delivery Partner</option>
                      </Form.Control>
                      {error.assignedTo && <p className="text-danger">{error.assignedTo}</p>}
                    </Form.Group>
                  </Col>

                   {/* New Delivery Partner Names Dropdown */}
                  <Col md={12}>
                    <Form.Group>
                      <label>Delivery Partner Names</label>
                      <Form.Control
                        as="select"
                        value={selectedPartner}
                        onChange={(e) => setSelectedPartner(e.target.value)}
                        required
                      >
                        <option value="">Select Delivery Partner</option>
                        {deliveryPartners.map((partner) => (
                          <option key={partner.id} value={partner.deliveryPartnerId}>
                            {partner.deliveryPartnerName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                </Row> 
            <div className="mt-2 d-flex justify-content-between">
            <Button type="submit" className=" text-white mx-2" style={{background: 'green'}} onClick={() => navigate(`/adminNotifications`)} title="Back">
                <ArrowBack />
                </Button>
                {/* <Button type="submit" className="text-white mx-2" style={{background: 'green'}} title="Forward" onClick={handleUpdatePaymentMethod}> 
                <ForwardIcon />
                </Button> */}
            </div>
          </form>
        </div>
      </div>
       <Modal
              show={showZoomModal}
              onHide={() => {
                setShowZoomModal(false);
                setZoomProduct(null);
              }}
              centered
            >
              <button
                className="close-button text-end mt-0"
                onClick={() => {
                  setShowZoomModal(false);
                  setZoomProduct(null);
                }}
              >
                &times;
              </button>
              <Modal.Body className="text-center">
                <div className="zoom-container">
                  <img
                    src={zoomImage}
                    alt={zoomProduct?.name || "Zoomed Product"}
                    className="zoom-image"
                  />
                </div>
                <h6
                className="text-start fw-bold m-0"
                style={{ fontSize: "20px" }}
              >
                {zoomProduct?.name || ""}
              </h6>
              </Modal.Body>
            </Modal>
      {/* Styles for floating menu */}
<style jsx>{`
        .floating-menu {
          position: fixed;
          top: 80px; /* Increased from 20px to avoid overlapping with the logo */
          left: 20px; /* Adjusted for placement on the left side */
          z-index: 1000;
        }
        .menu-popup {
          position: absolute;
          top: 50px; /* Keeps the popup aligned below the floating menu */
          left: 0; /* Aligns the popup to the left */
          background: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 200px;
        }
      `}</style>    
    </div>
    <Footer /> 
    </>
  );
};
 
export default AdminGroceryOrderPage;
