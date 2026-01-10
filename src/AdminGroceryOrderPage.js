import React, { useState, useEffect} from "react";
import * as XLSX from "xlsx";
import "./App.css";
import AdminSidebar from './AdminSidebar';
import Footer from './Footer.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Dashboard as MoreVertIcon} from '@mui/icons-material';
// import ForwardIcon from '@mui/icons-material/Forward';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import axios from "axios";
const AdminGroceryOrderPage = () => {
  const navigate = useNavigate(); 
  const {groceryItemId} = useParams();
  const [martId, setMartId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
//   const [category, setCategory] = useState("");  
//   const [totalAmount, setTotalAmount] = useState('');
//   const [requiredQuantity, setRequiredQuantity] = useState("");
//   const [rate, setRate] = useState("");
//   const [discount, setDiscount] = useState("");
//  const [afterDiscount, setAfterDiscount] = useState("");
//   const [productName, setProductName] = useState("");
// const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState(''); 
  const [id, setId] = useState("");  
//   const [technicianDetails, setTechnicianDetails] = useState('');
// const [invoiceDetails, setInvoiceDetails] = useState('');
// const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
const [assignedTo, setAssignedTo] = useState('');
const [loading, setLoading] = useState(true);
// const [productInvoice, setProdctInvoice] = useState([]);
// const [uploadedFiles, setUploadedFiles] = useState([]);
// const [showAlert, setShowAlert] = useState(false);
const [paymentMode, setPaymentMode] = useState('');
const [transactionDetails, setTransactionDetails] = useState('');
const [customerId, setCustomerId] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [customerName, setCustomerName] = useState('');
const [date, setDate] = useState('');
// const [selectedSlot, setSelectedSlot] = useState(false);
// const [date, setDate] = useState('');
const [error, setError] = useState('');
// const [emailAddress, setEmailAddress] = useState("");
// const [selectPincode, setSelectPincode] = useState("");
// const [selectTechnician, setSelectTechnician] = useState("");
const [items, setItems] = useState([]);
const [deliveryPartners, setDeliveryPartners] = useState([]);
const [selectedPartner, setSelectedPartner] = useState(""); 
const [longitude, setLongitude] = useState(""); 
const [latitude, setLatitude] = useState(""); 
const [grandTotal, setGrandTotal] = useState(""); 
const [paidAmount, setPaidAmount] = useState(""); 
const [transactionNumber, setTransactionNumber] = useState(""); 
const [transactionStatus, setTransactionStatus] = useState(""); 
// const [transactionType, setTransactionType] = useState(""); 
 const [totalItemsSelected, setTotalItemsSelected] = useState(""); 
const [cartData, setCartData] = useState(null);
const [code, setCode] = useState("");
const [units, setUnits] = useState("");
 const [groceryData, setgroceryData] = useState();
  const [groceryId, setgroceryId] = useState();
const [cashbackAmount, setCashbackAmount] = useState(0);
const showFreeSugar = Number(grandTotal) > 499 && Number(grandTotal) < 998;
 const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [zoomProduct, setZoomProduct] = useState(null);

useEffect(() => {
    const fetchCart = async () => {
      if (!groceryItemId) return;

      const ctrl = new AbortController();
      try {
        const res1 = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${groceryItemId}`,
          { signal: ctrl.signal }
        );
        if (!res1.ok) throw new Error("Failed to fetch product details");
        const data = await res1.json();
        setCartData(data);
        // Decide whether this order is Offers-only
        // const catNames = Array.isArray(data?.categories)
        //   ? data.categories.map((c) =>
        //       String(c?.categoryName || "")
        //         .trim()
        //         .toLowerCase()
        //     )
        //   : [];

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
          const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
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

  // const handleUpdateProductDetails = async () => {
  //   try {
  //     await handleUpdatePaymentMethod();
  //     await handleUpdateStockLeft();

  //     console.log("Payment updated & SMS sent ✅");
  //   } catch (error) {
  //     console.error("Error in Update ProductDetails:", error);
  //   }
  // };

  // const handleUpdatePaymentMethod = async () => {
  //   try {
  //     const payload = {
  //       ...cartData,
  //       customerName: customerName,
  //       address: address,
  //       state: state,
  //       district: district,
  //       zipCode: pincode,
  //       customerPhoneNumber: mobileNumber,
  //       id: groceryItemId,
  //       userId: customerId,
  //       martId: martId,
  //       slotBooking: selectedSlot || "",
  //       date: new Date(),
  //       grandTotal: grandTotal,
  //       totalItemsSelected: totalItemsSelected,
  //       status: "Cancel",
  //       paymentMode: "cash",
  //       utrTransactionNumber: "",
  //       transactionNumber: "",
  //       transactionStatus: "",
  //       paidAmount: "",
  //       AssignedTo: "",
  //       DeliveryPartnerUserId: "",
  //       latitude: 0,
  //       longitude: 0,
  //       isPickUp: false,
  //       isDelivered: false,
  //     };

  //     let response = await fetch(
  //       `https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (response.ok) {
  //       window.alert("Ticket has been Canceled Successfully.");
  //     }
  //     window.location.href = `/adminNotifications`;

  //     if (!response.ok) {
  //       throw new Error("Failed to update order.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     window.alert("Failed to Update Grocery. Please try again later.");
  //   }
  // };

  // const handleUpdateStockLeft = async () => {
  //   try {
  //     if (!Array.isArray(groceryData) || groceryData.length === 0) {
  //       throw new Error("No grocery data to update.");
  //     }
  //     if (!cartData) {
  //       throw new Error("Cart data unavailable.");
  //     }
  //     const productsFromCart = (cartData?.categories ?? []).flatMap(
  //       (c) => c?.products ?? []
  //     );
  //     const qtyMap = new Map(
  //       productsFromCart
  //         .map((p) => {
  //           const name = p?.productName?.trim();
  //           const qty = Number(
  //             p?.noOfQuantity ?? p?.noofQuantity ?? p?.qty ?? p?.quantity ?? 0
  //           );
  //           return name ? [name, isNaN(qty) ? 0 : qty] : null;
  //         })
  //         .filter(Boolean)
  //     );
  //     const toNum = (v, fallback = 0) => {
  //       const n = Number(v);
  //       return Number.isFinite(n) ? n : fallback;
  //     };
  //     const requests = groceryData.map(async (item) => {
  //       const nameKey = item?.name?.trim() || item?._matchedProductName?.trim();
  //       const purchasedQty = toNum(qtyMap.get(nameKey) ?? 0, 0);
  //       const prevStock = toNum(item?.stockLeft, 0);
  //       const newStock = Math.max(0, prevStock + purchasedQty);
  //       const payload = {
  //         id: item.id,
  //         date: item.date,
  //         GroceryItemId: item.groceryItemId,
  //         Name: item.name,
  //         Category: item.category,
  //         Images: Array.isArray(item.images) ? item.images : [],
  //         MRP: item.mrp,
  //         Discount: item.discount,
  //         AfterDiscount: item.afterDiscount,
  //         StockLeft: String(newStock),
  //         DeliveryIn: item.deliveryIn,
  //         RequestedBy: "Admin",
  //         Status: item.status,
  //         Code: item.code,
  //         Units: item.units,
  //       };

  //       const res = await fetch(
  //         `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/UpdateGroceryItems?id=${encodeURIComponent(
  //           item.id
  //         )}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(payload),
  //         }
  //       );

  //       console.log("AdminGroceryOrderPage12345", item.id);
  //       if (!res.ok) {
  //         const msg = await res.text().catch(() => "");
  //         throw new Error(`Failed for ${item.id} (HTTP ${res.status}). ${msg}`);
  //       }

  //       return {
  //         id: item.id,
  //         name: nameKey,
  //         prevStock,
  //         purchasedQty,
  //         newStock,
  //       };
  //     });

  //     const results = await Promise.allSettled(requests);
  //     const ok = results
  //       .filter((r) => r.status === "fulfilled")
  //       .map((r) => r.value);
  //     const fail = results
  //       .filter((r) => r.status === "rejected")
  //       .map((r) => r.reason);

  //     console.log("✅ Updated:", ok);
  //     if (fail.length) {
  //       console.warn("⚠️ Failed updates:", fail);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     window.alert("Failed to Update Grocery. Please try again later.");
  //   }
  // };

useEffect(() => {
  console.log(groceryData,groceryId, id, customerId, loading, longitude, latitude, grandTotal, paidAmount, transactionNumber, transactionStatus, totalItemsSelected, cartData, code, units);
}, [groceryData, groceryId,id,customerId, loading, longitude, latitude, grandTotal, paidAmount, transactionNumber, transactionStatus, totalItemsSelected, cartData, code, units]);

useEffect(() => {
  const fetchDeliveryPartners = async () => {
    try {
      const response = await axios.get(`https://handymanapiv2.azurewebsites.net/api/DeliveryPartner/GetAllDeliveryPartners`);
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
        `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${groceryItemId}`
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
      // setDate(data.date);
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
      // setTransactionType(data.transactionType);
      setPaidAmount(data.paidAmount);
      setTransactionNumber(data.transactionNumber);
      
      let allProducts = [];
      let totalAmountFromApi = 0;

      if (data.categories && Array.isArray(data.categories)) {
        // let allProducts = [];
        data.categories.forEach((cat) => {
          totalAmountFromApi += Number(cat.totalAmount) || 0;
          cat.products.forEach((p, idx) => {
            allProducts.push({
                id: `${cat.categoryName}-${idx}`,
              serial: allProducts.length + 1,
              name: p.productName,
              category: cat.categoryName,
              mrp: p.mrp,
              discount: p.discount,
              afterDiscountPrice: p.afterDiscountPrice,
              quantity: p.noOfQuantity,
              total: p.afterDiscountPrice * p.noOfQuantity,
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

      // if (cashback === 50 || cashback === 100) 
        
      if ((cashback >= 49 && cashback <= 51) ||
    (cashback >= 99 && cashback <= 101) || (cashback >= 299 && cashback <= 301))
        {
        setCashbackAmount(cashback); 
      } else {
        setCashbackAmount(0);
      }
    } catch (error) {
      console.error("Error fetching grocery product data:", error);
    } finally {
      setLoading(false);
    }
  };
  if (groceryItemId) {
    fetchGroceryData();
  }
}, [groceryItemId]);
   
const handleAssignedToChange = (e) => {
  const selectedAssignedTo = e.target.value;
  setAssignedTo(selectedAssignedTo);
  setError({});
};
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
//     status: "closed", 
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

//     let response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
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

    const handleDownloadExcel = () => {
  const worksheetData = items.map((item, idx) => ({
    "Sl. No": idx + 1,
    "Item Name": item.name,
    "Category": item.category,
    "MRP": item.mrp,
    "Discount (%)": item.discount,
    "After Discount Price": item.afterDiscountPrice,
    "Required Quantity": item.quantity,
    "Total": item.total,
  }));

  worksheetData.push({
    "Sl. No": "",
    "Item Name": "",
    "Category": "",
    "MRP": "",
    "Discount (%)": "",
    "After Discount Price": "",
    "Required Quantity": "Grand Total",
    "Total": items.reduce((sum, item) => sum + item.total, 0),
  });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Grocery Items");
  XLSX.writeFile(workbook, `Grocery_Order_${martId}.xlsx`);
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
            `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(
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
      {!isMobile && (
        <div className=" ml-0 p-0 adm_mnu h-90">
          <AdminSidebar />
        </div>
      )}

      {isMobile && (
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
      )}

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
              {/* <div className="row">
          <div className="form-group col-md-6">
            <label>
              Code <span className="req_star">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={code}
              placeholder="Product Code"
              readOnly
            />
          </div>

          <div className="form-group col-md-6">
            <label>
              Units <span className="req_star">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={units}
              placeholder="Units"
              readOnly
            />
          </div>
        </div> */}

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
      <td colSpan="8" className="text-end fw-bold text-danger">
        Cashback Applied:
      </td>
      <td className="fw-bold text-success">
        ₹{cashbackAmount}
      </td>
    </tr>
  )}
   {showFreeSugar && (
    <tr>
      <td colSpan="9" className="text-end fw-bold text-success">
        🎁 Give Customer <strong>500 g Sugar FREE</strong>
      </td>
    </tr>
  )}
    <tr>
      <td colSpan="8" className="text-end fw-bold">
        Grand Total:
      </td>
      <td className="fw-bold">     
        ₹{grandTotal}
      </td>
    </tr>   
  </tfoot>  
</table>
<div className="text-end mt-1">
  <button style={{ background: "green", color: "white", borderRadius: "20px"}} onClick={handleDownloadExcel}>
    Download Excel
  </button>
  {/* <button
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "20px",
                    padding: "5px 12px",
                  }}
                  onClick={handleUpdateProductDetails}
                >
                  Cancel
                </button> */}
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
                        {/* {deliveryPartners.map((partner) => (
                        <option key={partner.id} value={partner.deliveryPartnerId}>{partner.deliveryPartnerName}</option>
                        ))} */}
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
                  {/* Show these fields only if "Technician" is selected */}
                  {/* {assignedTo === "Technician" && (
                    <>
                      {/* Select Category 
                      <Col md={12}>
                        <Form.Group>
                          <label>Category</label>
                          <Form.Control
                            type="text"
                            name="category"
                            value={category}
                            onChange={handleChange}
                            placeholder="Category"
                            readOnly
                          >
                          </Form.Control>
                        </Form.Group>
                      </Col>
             */}
            
                      {/* Select Pincodes */}
                      {/* <Col md={12}>
                        <Form.Group>n
                          <label>Select Pincode</label>
                          <Form.Control as="select" value={selectPincode} onChange={handlePincodeChange} required>
                            <option value="">Select Pincode</option>
                            {pincodes.map((pincode, i) => (
                              <option key={i} value={pincode.zipCode}>{pincode.zipCode}</option>
                            ))}
                          </Form.Control>
                          {error.selectPincode && <div style={{ color: "red", marginTop: "5px" }}>{error.selectPincode}</div>}
                        </Form.Group>
                      </Col>
             */}
                      {/* Select Technician */}
            
                      {/* <Col md={12}>
                  <Form.Group>
                    <label>Select Technician</label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        className="custom-checkbox"
                        label="Select All"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                      {technicians.map((technician, i) => (
                        <div key={i}>
                          <Form.Check
                            type="checkbox"
                            className="custom-checkbox"
                            label={technician.technicianFullName}
                            value={technician.technicianFullName}
                            checked={selectedTechnicians.includes(technician.technicianFullName)}
                            onChange={handleTechnicianChange}
                          />
                        </div>
                      ))}
                    </div>
                    {error.selectTechnician && (
                      <div style={{ color: "red", marginTop: "5px" }}>{error.selectTechnician}</div>
                    )}
                  </Form.Group>
                </Col>
                    </>
                  )} */}
                </Row> 
            <div className="mt-2 d-flex justify-content-between">
            <Button type="submit" className=" text-white mx-2" style={{background: 'green'}} onClick={() => navigate(`/adminNotifications`)} title="Forward">
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

// import React, { useState, useEffect} from "react";
// import * as XLSX from "xlsx";
// import "./App.css";
// import AdminSidebar from './AdminSidebar';
// import Footer from './Footer.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowBack, Dashboard as MoreVertIcon} from '@mui/icons-material';
// // import ForwardIcon from '@mui/icons-material/Forward';
// import { Button, Form, Row, Col } from 'react-bootstrap';
// import axios from "axios";
// const AdminGroceryOrderPage = () => {
//   const navigate = useNavigate(); 
//   const {groceryItemId} = useParams();
//   const [martId, setMartId] = useState('');
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
// //   const [category, setCategory] = useState("");  
// //   const [totalAmount, setTotalAmount] = useState('');
// //   const [requiredQuantity, setRequiredQuantity] = useState("");
// //   const [rate, setRate] = useState("");
// //   const [discount, setDiscount] = useState("");
// //  const [afterDiscount, setAfterDiscount] = useState("");
// //   const [productName, setProductName] = useState("");
// // const [addressType, setAddressType] = useState('');
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [address, setAddress] = useState(''); 
//   const [id, setId] = useState("");  
// //   const [technicianDetails, setTechnicianDetails] = useState('');
// // const [invoiceDetails, setInvoiceDetails] = useState('');
// // const [technicianConfirmationCode, setTechnicianConfirmationCode] = useState('');
// const [assignedTo, setAssignedTo] = useState('');
// const [loading, setLoading] = useState(true);
// // const [productInvoice, setProdctInvoice] = useState([]);
// // const [uploadedFiles, setUploadedFiles] = useState([]);
// // const [showAlert, setShowAlert] = useState(false);
// const [paymentMode, setPaymentMode] = useState('');
// const [transactionDetails, setTransactionDetails] = useState('');
// const [customerId, setCustomerId] = useState('');
// const [mobileNumber, setMobileNumber] = useState('');
// const [customerName, setCustomerName] = useState('');
// // const [date, setDate] = useState('');
// const [error, setError] = useState('');
// // const [emailAddress, setEmailAddress] = useState("");
// // const [selectPincode, setSelectPincode] = useState("");
// // const [selectTechnician, setSelectTechnician] = useState("");
// const [items, setItems] = useState([]);
// const [deliveryPartners, setDeliveryPartners] = useState([]);
// const [selectedPartner, setSelectedPartner] = useState(""); 
// const [longitude, setLongitude] = useState(""); 
// const [latitude, setLatitude] = useState(""); 
// const [grandTotal, setGrandTotal] = useState(""); 
// const [paidAmount, setPaidAmount] = useState(""); 
// const [transactionNumber, setTransactionNumber] = useState(""); 
// const [transactionStatus, setTransactionStatus] = useState(""); 
// // const [transactionType, setTransactionType] = useState(""); 
//  const [totalItemsSelected, setTotalItemsSelected] = useState(""); 
// const [cartData, setCartData] = useState(null);
// const [code, setCode] = useState("");
// const [units, setUnits] = useState("");
// const [cashbackAmount, setCashbackAmount] = useState(0);

// useEffect(() => {
//   console.log(id, customerId, loading, longitude, latitude, grandTotal, paidAmount, transactionNumber, transactionStatus, totalItemsSelected, cartData, code, units);
// }, [id,customerId, loading, longitude, latitude, grandTotal, paidAmount, transactionNumber, transactionStatus, totalItemsSelected, cartData, code, units]);

// useEffect(() => {
//   const fetchDeliveryPartners = async () => {
//     try {
//       const response = await axios.get(`https://handymanapiv2.azurewebsites.net/api/DeliveryPartner/GetAllDeliveryPartners`);
//       const partners = response.data.filter(partner => partner.status === "open");
//       setDeliveryPartners(partners);
//     } catch (error) {
//       console.error("Error fetching delivery partners:", error);
//     }
//   };
//   fetchDeliveryPartners();
// }, []);

// useEffect(() => {
//   const fetchGroceryData = async () => {
//     try {
//       const response = await fetch(
//         `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${groceryItemId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch grocery product data");
//       }
//       const data = await response.json();
//       console.log("Fetched Grocery Data:", data);
//       setCartData(data);
//       setCustomerId(data.userId);
//       setId(data.id);
//       setMartId(data.martId);
//       // setDate(data.date);
//       setCustomerName(data.customerName);
//       setMobileNumber(data.customerPhoneNumber);
//       setAddress(data.address);
//       setState(data.state);
//       setDistrict(data.district);
//       setPincode(data.zipCode);
//       setPaymentMode(data.paymentMode);
//       setTransactionDetails(data.utrTransactionNumber);
//       setLongitude(data.longitude);
//       setLatitude(data.latitude);
//       setGrandTotal(data.grandTotal);
//       setPaymentMode(data.paymentMode);
//       setTotalItemsSelected(data.totalItemsSelected);
//       setTransactionStatus(data.transactionStatus);
//       // setTransactionType(data.transactionType);
//       setPaidAmount(data.paidAmount);
//       setTransactionNumber(data.transactionNumber);
      
//       let allProducts = [];
//       let totalAmountFromApi = 0;

//       if (data.categories && Array.isArray(data.categories)) {
//         // let allProducts = [];
//         data.categories.forEach((cat) => {
//           totalAmountFromApi += Number(cat.totalAmount) || 0;
//           cat.products.forEach((p, idx) => {
//             allProducts.push({
//               serial: allProducts.length + 1,
//               name: p.productName,
//               category: cat.categoryName,
//               mrp: p.mrp,
//               discount: p.discount,
//               afterDiscountPrice: p.afterDiscountPrice,
//               quantity: p.noOfQuantity,
//               total: p.afterDiscountPrice * p.noOfQuantity,
//               code: p.code,
//               units: p.units,
//             });
//           });
//         });
//         setItems(allProducts);
//         if (allProducts.length > 0) {
//         setCode(allProducts[0].code || "");
//         setUnits(allProducts[0].units || "");
//         }
//       }
//       const grandTotalNumeric = Number(data.grandTotal) || 0;
//       const cashback = totalAmountFromApi - grandTotalNumeric;

//       // if (cashback === 50 || cashback === 100) 
        
//       if ((cashback >= 49 && cashback <= 51) ||
//     (cashback >= 99 && cashback <= 101))
//         {
//         setCashbackAmount(cashback); 
//       } else {
//         setCashbackAmount(0);
//       }
//     } catch (error) {
//       console.error("Error fetching grocery product data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (groceryItemId) {
//     fetchGroceryData();
//   }
// }, [groceryItemId]);
   
// const handleAssignedToChange = (e) => {
//   const selectedAssignedTo = e.target.value;
//   setAssignedTo(selectedAssignedTo);
//   setError({});
// };
// //   const handleUpdatePaymentMethod = async () => {
// //     try {   
// //       const partner = deliveryPartners.find(p => p.deliveryPartnerId === selectedPartner);
// //   const payload = {
// //     ...cartData,
// //     customerName: customerName,
// //     address: address, 
// //     state: state,
// //     district: district,
// //     zipCode: pincode,
// //     customerPhoneNumber: mobileNumber,
// //     id: groceryItemId,
// //     userId: customerId, 
// //     martId: martId,
// //     date: new Date(),
// //     grandTotal: grandTotal,
// //     totalItemsSelected: totalItemsSelected,
// //     status: "closed", 
// //     paymentMode: paymentMode,
// //     utrTransactionNumber: transactionDetails,
// //     transactionNumber: transactionNumber,
// //     transactionStatus: transactionStatus,
// //     paidAmount: paidAmount,
// //     AssignedTo: partner? partner.deliveryPartnerName: "",
// //     DeliveryPartnerUserId: partner? partner.userId: "",
// //     latitude: latitude,
// //     longitude: longitude,
// //     code: code,
// //     units: units,
// //   };

// //     let response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(payload),
// //     });
// //     if (!response.ok) {
// //       throw new Error('Failed to Update Delivery Partner.');
// //     }
// //     alert(`Ticket has been assigned to ${partner ? partner.deliveryPartnerName : ""}`);
// //     navigate(`/adminNotifications`);
// //   } catch (error) {
// //     console.error('Error:', error);
// //     window.alert('Failed to Update Delivery Partner. Please try again later.');
// //   }
// // };

//   // Detect screen size for responsiveness
// useEffect(() => {
//   const handleResize = () => setIsMobile(window.innerWidth <= 768);
//   handleResize(); 
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

//    const handleSubmit = (e) => {
//      e.preventDefault();
//    };

//     const handleDownloadExcel = () => {
//   const worksheetData = items.map((item, idx) => ({
//     "Sl. No": idx + 1,
//     "Item Name": item.name,
//     "Category": item.category,
//     "MRP": item.mrp,
//     "Discount (%)": item.discount,
//     "After Discount Price": item.afterDiscountPrice,
//     "Required Quantity": item.quantity,
//     "Total": item.total,
//   }));

//   worksheetData.push({
//     "Sl. No": "",
//     "Item Name": "",
//     "Category": "",
//     "MRP": "",
//     "Discount (%)": "",
//     "After Discount Price": "",
//     "Required Quantity": "Grand Total",
//     "Total": items.reduce((sum, item) => sum + item.total, 0),
//   });

//   const worksheet = XLSX.utils.json_to_sheet(worksheetData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Grocery Items");
//   XLSX.writeFile(workbook, `Grocery_Order_${martId}.xlsx`);
// };

//   return (
//   <>
// <div className="d-flex flex-row justify-content-start align-items-start" style={{marginTop: "130px"}}>
//       {/* Sidebar menu for Larger Screens */}
//       {!isMobile && (
//         <div className=" ml-0 p-0 adm_mnu h-90">
//           <AdminSidebar />
//         </div>
//       )}

//       {isMobile && (
//         <div className="floating-menu">
//           <Button
//             variant="primary"
//             className="rounded-circle shadow"
//             onClick={() => setShowMenu(!showMenu)}
//           >
//             <MoreVertIcon />
//           </Button>
//           {showMenu && (
//             <div className="sidebar-container">
//               <AdminSidebar />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Main Content */}
//       <div className={`container ${isMobile ? 'w-100' : 'w-75'}`}>
//       <h3 className="text-center">Grocery Items Orders</h3>
//         <div className="rounded-3bx_sdw w-100">
//           <form className="form" onSubmit={handleSubmit}>
//                 <div className="text-center">
//                 <strong className="fs-5">Order Number:<span>{martId}</span></strong>
//                 </div>
//                 <div className="row">
//                 <div className="col-md-6 form-group">
//               <label>
//                 Customer Name <span className="req_star">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerName}
//                 placeholder="Customer Name"
//                 readOnly
//               />
//             </div>
//               <div className="col-md-6 form-group">
//                   <label>
//                     Customer Address <span className="req_star">*</span>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     style={{
//                       overflow: "hidden",
//                       resize: "none",
//                       minHeight: "80px",
//                     }}
//                     value={[address, district, state, pincode, mobileNumber]
//                       .filter(Boolean)
//                       .join(", ")}
//                     onChange={(e) => {
//                       e.target.style.height = "auto";
//                       e.target.style.height = e.target.scrollHeight + "px";
//                       setAddress(e.target.value);
//                     }}
//                     placeholder="Customer Address"
//                     readOnly
//                   ></textarea>
//                 </div>
//                </div>     
//               {/* <div className="row">
//           <div className="form-group col-md-6">
//             <label>
//               Code <span className="req_star">*</span>
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               value={code}
//               placeholder="Product Code"
//               readOnly
//             />
//           </div>

//           <div className="form-group col-md-6">
//             <label>
//               Units <span className="req_star">*</span>
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               value={units}
//               placeholder="Units"
//               readOnly
//             />
//           </div>
//         </div> */}

//       <h4 className="m-0">Grocery Items</h4>
// <table className="table table-bordered table-striped">
//   <thead>
//     <tr>
//       <th style={{ background: "green", color: "white" }}>Sl. No</th>
//       <th style={{ background: "green", color: "white" }}>Item Name</th>
//       <th style={{ background: "green", color: "white" }}>Code</th>
//       <th style={{ background: "green", color: "white" }}>Category</th>
//       <th style={{ background: "green", color: "white" }}>MRP</th>
//       <th style={{ background: "green", color: "white" }}>Discount (%)</th>
//       <th style={{ background: "green", color: "white" }}>
//         After Discount <br /> Price
//       </th>
//       <th style={{ background: "green", color: "white" }}>
//         Required <br /> Quantity
//       </th>
//       <th style={{ background: "green", color: "white" }}>Total</th>
//     </tr>
//   </thead>
//   <tbody>
//     {items.map((item, idx) => (
//       <tr key={idx}>
//         <td>{item.serial}</td>
//         <td>{item.name}</td>
//         <td>{item.code}</td>
//         <td>{item.category}</td>
//         <td>₹{item.mrp}</td>
//         <td>{item.discount}%</td>
//         <td>₹{item.afterDiscountPrice.toFixed(0)}</td>
//         <td>{item.quantity}</td>
//         <td>₹{item.total.toFixed(0)}</td>
//       </tr>
//     ))}
//   </tbody>
//   <tfoot>
//      {cashbackAmount > 0 && (
//     <tr>
//       <td colSpan="8" className="text-end fw-bold text-danger">
//         Cashback Applied:
//       </td>
//       <td className="fw-bold text-success">
//         ₹{cashbackAmount}
//       </td>
//     </tr>
//   )}
//     <tr>
//       <td colSpan="8" className="text-end fw-bold">
//         Grand Total:
//       </td>
//       <td className="fw-bold">     
//         ₹{grandTotal}
//       </td>
//     </tr>   
//   </tfoot>  
// </table>
// <div className="text-end mt-1">
//   <button style={{ background: "green", color: "white", borderRadius: "20px"}} onClick={handleDownloadExcel}>
//     Download Excel
//   </button>
// </div>

//         <div className='payment'>
//         <label className='fw-bold fs-5 w-100 p-2' style={{ background: "green", color: "white", borderRadius: "15px", width: "25px" }}>Payment Mode</label>
//         <label className='fs-5 '>
//             <input 
//             type="radio" 
//             className="form-check-input border-secondary m-2 border-dark"
//             checked={paymentMode === 'online'}
//             readOnly
//              />
//             Pay Through Online
//           </label>
//           <label className='fs-5'>
//             <input 
//             type="radio" 
//             className="form-check-input border-secondary border-dark m-2"
//             checked={paymentMode === 'cash'}
//             readOnly
//             />
//             Cash On Delivery
//           </label>
//     </div> 

//     <div className="form-group mt-0">
//               <label>Payment Transaction Details </label>
//               <input
//                 type="text"
//                 className="form-control "
//                 value={transactionDetails}
//                 onChange={(e) => setTransactionDetails(e.target.value)}
//                 placeholder="Payment Transaction Details"
//                 readOnly
//               />
//             </div>
//             <Row>
//                   {/* Assigned To */}
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Assigned To</label>
//                       <Form.Control as="select" value={assignedTo} onChange={handleAssignedToChange} required>
//                         <option value="">Select Assigned</option>
//                         <option value="Delivery Partner">Delivery Partner</option>
//                         {/* {deliveryPartners.map((partner) => (
//                         <option key={partner.id} value={partner.deliveryPartnerId}>{partner.deliveryPartnerName}</option>
//                         ))} */}
//                       </Form.Control>
//                       {error.assignedTo && <p className="text-danger">{error.assignedTo}</p>}
//                     </Form.Group>
//                   </Col>

//                    {/* New Delivery Partner Names Dropdown */}
//                   <Col md={12}>
//                     <Form.Group>
//                       <label>Delivery Partner Names</label>
//                       <Form.Control
//                         as="select"
//                         value={selectedPartner}
//                         onChange={(e) => setSelectedPartner(e.target.value)}
//                         required
//                       >
//                         <option value="">Select Delivery Partner</option>
//                         {deliveryPartners.map((partner) => (
//                           <option key={partner.id} value={partner.deliveryPartnerId}>
//                             {partner.deliveryPartnerName}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                   {/* Show these fields only if "Technician" is selected */}
//                   {/* {assignedTo === "Technician" && (
//                     <>
//                       {/* Select Category 
//                       <Col md={12}>
//                         <Form.Group>
//                           <label>Category</label>
//                           <Form.Control
//                             type="text"
//                             name="category"
//                             value={category}
//                             onChange={handleChange}
//                             placeholder="Category"
//                             readOnly
//                           >
//                           </Form.Control>
//                         </Form.Group>
//                       </Col>
//              */}
            
//                       {/* Select Pincodes */}
//                       {/* <Col md={12}>
//                         <Form.Group>n
//                           <label>Select Pincode</label>
//                           <Form.Control as="select" value={selectPincode} onChange={handlePincodeChange} required>
//                             <option value="">Select Pincode</option>
//                             {pincodes.map((pincode, i) => (
//                               <option key={i} value={pincode.zipCode}>{pincode.zipCode}</option>
//                             ))}
//                           </Form.Control>
//                           {error.selectPincode && <div style={{ color: "red", marginTop: "5px" }}>{error.selectPincode}</div>}
//                         </Form.Group>
//                       </Col>
//              */}
//                       {/* Select Technician */}
            
//                       {/* <Col md={12}>
//                   <Form.Group>
//                     <label>Select Technician</label>
//                     <div>
//                       <Form.Check
//                         type="checkbox"
//                         className="custom-checkbox"
//                         label="Select All"
//                         checked={selectAll}
//                         onChange={handleSelectAllChange}
//                       />
//                       {technicians.map((technician, i) => (
//                         <div key={i}>
//                           <Form.Check
//                             type="checkbox"
//                             className="custom-checkbox"
//                             label={technician.technicianFullName}
//                             value={technician.technicianFullName}
//                             checked={selectedTechnicians.includes(technician.technicianFullName)}
//                             onChange={handleTechnicianChange}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     {error.selectTechnician && (
//                       <div style={{ color: "red", marginTop: "5px" }}>{error.selectTechnician}</div>
//                     )}
//                   </Form.Group>
//                 </Col>
//                     </>
//                   )} */}
//                 </Row> 
//             <div className="mt-2 d-flex justify-content-between">
//             <Button type="submit" className=" text-white mx-2" style={{background: 'green'}} onClick={() => navigate(`/adminNotifications`)} title="Forward">
//                 <ArrowBack />
//                 </Button>
//                 {/* <Button type="submit" className="text-white mx-2" style={{background: 'green'}} title="Forward" onClick={handleUpdatePaymentMethod}> 
//                 <ForwardIcon />
//                 </Button> */}
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* Styles for floating menu */}
// <style jsx>{`
//         .floating-menu {
//           position: fixed;
//           top: 80px; /* Increased from 20px to avoid overlapping with the logo */
//           left: 20px; /* Adjusted for placement on the left side */
//           z-index: 1000;
//         }
//         .menu-popup {
//           position: absolute;
//           top: 50px; /* Keeps the popup aligned below the floating menu */
//           left: 0; /* Aligns the popup to the left */
//           background: white;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           width: 200px;
//         }
//       `}</style>    
//     </div>
//     <Footer /> 
//     </>
//   );
// };

// export default AdminGroceryOrderPage;