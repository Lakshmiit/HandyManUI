import React, { useEffect, useState, useCallback} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form} from 'react-bootstrap';
import Footer from "./Footer.js";
import Confetti from "react-confetti";
import IdlyRavvaImg from './img/IdlyRavva.jpeg';

const GroceryPaymentmethod = () => {
  const navigate = useNavigate();
  // const location = useLocation();
 const {userType} = useParams();
  const {userId} = useParams();
  const {groceryItemId} = useParams();
   const [isMobile, setIsMobile] = useState(false);
    // const [showMenu, setShowMenu] = useState(false);
   const [isChecked, setIsChecked] = useState(true);
const [selectedPayment, setSelectedPayment] = useState("cash");
const [error, setError] = useState("");
  const [martId, setMartId] = useState('');
  const [totalItemsSelected, setTotalItemsSelected] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [cartData, setCartData] = useState(null);
const [addressData, setAddressData] = useState({
fullName  : '',
mobileNumber: '',
address: '',
state: '',
district: '',
zipCode: '',
});
const [serviceUnavailable, setServiceUnavailable] = useState(false);
 const [addresses, setAddresses] = useState([]);
const [newAddress, setNewAddress] = useState('');
const [state, setState] = useState('');
   const [districtList, setDistrictList] = useState([]);  
 const [stateList, setStateList] = useState([]);
   const [district, setDistrict] = useState('');  
   const [districtId, setDistrictId] = useState('');    
   const [stateId, setStateId] = useState(null);  
  const [fullName, setFullName] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [showModals, setShowModals] = useState(false);
const [mobileNumber, setMobileNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [guestCustomerId, setGuestCustomerId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [shouldBlink,setShouldBlink] = useState(false);
   const[groceryId,setgroceryId] =useState();
  const [groceryData,setgroceryData]=useState();
//  const [location, setLocation] = useState({latitude: '', longitude: ''});
//   const [locationError, setLocationError] = useState(null);
// ADD these (you already have some; keep only one copy)
const [referralRec, setReferralRec] = useState(null);
const [referralPoints, setReferralPoints] = useState(0);   
const [referralAmount, setReferralAmount] = useState(0);  
const [netPayable, setNetPayable] = useState(0);     
const [isOffersOrder, setIsOffersOrder] = useState(false);
 const [firstOrderDiscount, setFirstOrderDiscount] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
const [cashbackMessage, setCashbackMessage] = useState("");
// const [date, setDate] = useState("");
const isGuestName = (name) => (name ?? '').trim().toLowerCase() === 'guest';
const readServerPoints = (record) => {
  const raw =
    record?.referralPoints ?? 
    record?.referralpoints ??
    record?.ReferralPoints ??
    0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};
const [loading, setLoading] = useState(false); 
  
useEffect(() => {
  console.log("Addresses:", addresses);
  const primary = addresses.find(a => a.type === "primary");
  console.log("ZipCode:", primary?.zipCode);
}, [addresses]);

useEffect(() => {
  console.log(  cashbackMessage, loading, isChecked, editingAddressId, customerName, groceryId);
}, [cashbackMessage, loading, isChecked, editingAddressId, customerName, groceryId]);

const showSugarOffer =
  Number(grandTotal) >= 499 && Number(grandTotal) <= 998;
const netPayables=  grandTotal - firstOrderDiscount     

  const totalPayable =
    isNewUser || grandTotal > 1000 ? netPayables : netPayable;
const numericGrandTotal = Number(grandTotal) || 0;
const isFirstOrderMinNotReached = isNewUser && numericGrandTotal < 150;

  const loginMeta = (() => {   
    try {
      return JSON.parse(localStorage.getItem("loginMeta") || "null") || {};
    } catch {
      return {};
    }
  })();

   useEffect(() => {
    if (firstOrderDiscount > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); 
    }
  }, [firstOrderDiscount]);

  const mobile =
    state.mobile ?? loginMeta.mobile ?? localStorage.getItem("mobile") ?? "";
    
  const CheckFirstOrder = async (mobile) => {
    if (!mobile) return null;
    const url = `https://handymanapiv2.azurewebsites.net/api/Mart/CheckFirstOrder?CustomerPhoneNumber=${encodeURIComponent(
      mobile
    )}`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log("RAW RESPONSE:", text);
      if (
        text.includes("Firstorder Can not be found")
      ) {
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

useEffect(() => {
  let cancelled = false;
  (async () => {
    try {
      const prevOrders = await CheckFirstOrder(mobile);
      if (cancelled) return;
      const isNew = prevOrders === null;
      setIsNewUser(isNew);
      const usedCashbacks = new Set();
      if (Array.isArray(prevOrders)) {
        prevOrders.forEach((order) => {
          const categoryTotal = (order.categories ?? []).reduce(
            (sum, c) => sum + Number(c?.totalAmount ?? 0),
            0
          );
          const paid = Number(order.grandTotal ?? 0);
          const diff = Math.round(categoryTotal - paid);
          if (diff === 50) {
            usedCashbacks.add(50);
          }
          if (diff === 100) {
            usedCashbacks.add(100);
            usedCashbacks.add(50);
          }
          if (diff === 200) {
            usedCashbacks.add(200);
            usedCashbacks.add(50);
          }
          if (diff === 300) {
            usedCashbacks.add(300);
            usedCashbacks.add(50); 
          }  
        });
      }
      const currentGT = Number(grandTotal) || 0;
      let discount = 0;
      let msg = "";
      if (currentGT >= 1999 && !usedCashbacks.has(200)) {
        discount = 200;
      } 
       else if (currentGT >= 1499 && !usedCashbacks.has(200)) {
        discount = 200;
      } 
       else if (currentGT >= 1000 && !usedCashbacks.has(100)) {
        discount = 100;
      } 
      else if (currentGT >= 150 && !usedCashbacks.has(50)) {
        discount = 50;
      } 
      else {
        discount = 0; 
        // if (isNew) {
        //   msg = "Order ₹150 or more to get ₹50 cashback on your first order!";
        // }
      }
      setFirstOrderDiscount(discount);
      setCashbackMessage(msg);
      console.log("✅ Cashback FINAL CHECK:", {
        usedCashbacks: [...usedCashbacks],
        applied: discount,
        currentGT,
      });

    } catch (err) {
      console.error("Cashback check failed:", err);
      if (!cancelled) {
        setFirstOrderDiscount(0);
        setCashbackMessage("");
      }
    }
  })();

  return () => {
    cancelled = true;
  };
}, [mobile, grandTotal]);    


const getReferralRecord = async (userId) => {
  if (!userId) return null;
  const url = `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/GetReferralPointsByUserId?referreId=${encodeURIComponent(userId)}`;
  const res = await fetch(url);     
  const text = await res.text();
  let data = []; 
  try { data = text ? JSON.parse(text) : []; } catch { data = []; }
  if (Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data[0];
  }
  return null; 
};

useEffect(() => {
  let cancelled = false;
  (async () => {
    try {
      const rec = await getReferralRecord(userId);
      if (cancelled) return;
      setReferralRec(rec);
      setReferralPoints(readServerPoints(rec));
    } catch (e) {
      console.error("Failed to load referral points:", e);
      if (!cancelled) {
        setReferralRec(null);
        setReferralPoints(0);
      }
    }
  })();
  return () => { cancelled = true; };
}, [userId]);

useEffect(() => {
  const gt = Number(grandTotal) || 0;
  const pts = Number(referralPoints) || 0;
  const applied = Math.min(pts, gt);   
  setReferralAmount(applied);
  setNetPayable(Math.max(0, gt - applied));
}, [grandTotal, referralPoints]);

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
      const catNames = Array.isArray(data?.categories)
        ? data.categories.map(c => String(c?.categoryName || "").trim().toLowerCase())
        : [];
      const onlyOffers = catNames.length > 0 && catNames.every(n => n === "offers");
      setIsOffersOrder(onlyOffers);
      setMartId(data.martId);
      setGrandTotal(data.grandTotal);
      setTotalItemsSelected(data.totalItemsSelected);
      setCustomerName(data.customerName);
      // setDate(data.date);
      const products = (data?.categories ?? []).flatMap(c => c?.products ?? []);
      const selected = products.filter(
        p => p?.isSelected || p?.selected || (p?.qty ?? p?.quantity ?? 0) > 0
      );
      const baseList = selected.length ? selected : products;
      const productNames = Array.from(
        new Set( 
          baseList
            .map(p => p?.productName?.trim())
            .filter(Boolean)
        )
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
        if (!res.ok) throw new Error(`UploadGrocery failed for "${name}" (HTTP ${res.status})`);
        const items = await res.json();            
        const arr = Array.isArray(items) ? items : (items ? [items] : []);
        return arr.map(it => ({ ...it, _matchedProductName: name }));
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

const goBackToCart = () => {
  if (isOffersOrder) {
    navigate(`/groceryOffersCart/${userType}/${userId}`);
  } else {
    navigate(`/groceryCart/${userType}/${userId}`);
  }
};

 const fetchCustomerData = useCallback(async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Address/GetAddressById/${userId}`);
        if (!response.ok) {

          throw new Error('Failed to fetch customer profile data');
        }
        const data = await response.json();
        console.log(data);
        const addresses = Array.isArray(data) ? data : [data];
        const formattedAddresses = addresses.map((addr) => ({
          id: addr.addressId, 
          type: addr.isPrimaryAddress ? 'primary' : 'secondary',
          address: addr.address,
          state: addr.state,
          district: addr.district,
          zipCode: addr.zipCode, 
          emailAddress: addr.emailAddress,
          mobileNumber: addr.mobileNumber,
          fullName: addr.fullName,
        }));
        setAddresses(formattedAddresses);
        const customerName = Array.isArray(data) ? data[0]?.fullName || '' : data.fullName || '';
        setFullName(customerName);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
  }, [userId]);

  useEffect(() => {
  const primary = addresses.find(addr => addr.type === "primary");
  const district = primary?.district?.toLowerCase();
  if (district && district !== "visakhapatnam") {
    setServiceUnavailable(true);  
  } else {
    setServiceUnavailable(false);
  }
}, [addresses]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  useEffect(() => {
    axios.get('https://handymanapiv2.azurewebsites.net/api/MasterData/getStates')
      .then(response => {
        const data = response.data;
        console.log("States API Response:", data); 
        setStateList(data);
        setStateId('');
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);
  
   useEffect(() => {
    if (stateId) {
      axios.get(`https://handymanapiv2.azurewebsites.net/api/MasterData/getDistricts/${stateId}`)
        .then(response => {
          setDistrictList(response.data);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    } else {
      setDistrictList([]);
    }
  }, [stateId]);

   // Reset address form fields
  const resetAddressForm = () => {
    setFullName('');
    setMobileNumber('');
    setNewAddress(''); 
    setState('');
    setDistrict('');
    setZipCode('');
  };

  // Handle address editing
  const handleAddressEdit = async () => {
    if (!newAddress || !zipCode || !mobileNumber || !state || !district) {
      alert("Please fill in all required fields.");
      return; 
    }
    if (fullName.trim().toLowerCase() === 'guest') {
      alert("Please Change Your Full Name.");
      return;
    }  
    if (!/^\d{6}$/.test(zipCode)) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }
  
      const updatedAddress = {
        id: guestCustomerId,
        fullName,
        mobileNumber,
        address: newAddress,
        state,
        district,
        zipCode,
      };
    
      const payload3 = {
        id: guestCustomerId,
        profileType: "profileType",
        addressId: guestCustomerId,
        isPrimaryAddress: true,
        address: newAddress,
        state: state,
        district: district,
        StateId: stateId,
        DistrictId: districtId,
        zipCode: zipCode,
        mobileNumber: mobileNumber,
        emailAddress: "emailAddress",
        userId: userId,
        firstName: fullName,
        lastName: "lastName",
        fullName: fullName,
      };
    
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Customer/CustomerAddressEdit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload3),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error("Failed to edit address.");
        }
        setAddresses(prev =>
          prev.map(addr => addr.id === guestCustomerId ? updatedAddress : addr)
        );
        setAddressData(updatedAddress);
        await fetchCustomerData();
        alert("Address Updated Successfully!");
        setShowModal(false);
        resetAddressForm();
        setIsEditing(false);
        setEditingAddressId(null);
      } catch (error) {
        console.error("Error editing address:", error);
        alert("Failed to edit address. Please try again later.");
      }
    };

    const primaryAddress = addresses.find(addr => addr.type === 'primary');
    const isAddressInvalid = !primaryAddress || !primaryAddress.address || !primaryAddress.zipCode;
     const isOrderDisabled = isAddressInvalid || serviceUnavailable || isFirstOrderMinNotReached;
    useEffect(() => {
        if (isAddressInvalid) {
          setShouldBlink(true);
        } else {
          setShouldBlink(false);
        }
      }, [isAddressInvalid]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpdatePaymentMethod = async () => {
  // if (!selectedPayment) {
  //   setError("Please select at least one payment method.");
  //   return;
  // }
  // if (!isChecked) {
  //   alert("You must accept the terms and conditions.");
  //   return;
  // }

  try {
    const primaryAddress = addresses.find((addr) => addr.type === "primary");
    const state = primaryAddress?.state;
    const district = primaryAddress?.district || "";
    const pincode = primaryAddress?.zipCode || primaryAddress?.pincode;
    const mobileNumber = primaryAddress?.mobileNumber || primaryAddress?.mobileNumber;

    const payload = {
      ...cartData,
      customerName: addressData.fullName || fullName,
      address: addressData.address || primaryAddress?.address,
      state: addressData.state || state,
      district: addressData.district || district,
      zipCode: addressData.zipCode || pincode,
      customerPhoneNumber: addressData.mobileNumber || mobileNumber,
      id: groceryItemId,
      userId: userId,
      martId: martId,
      date: new Date(),   
      grandTotal: String(totalPayable), 
      totalItemsSelected: totalItemsSelected,
      status: "Open",
      paymentMode: selectedPayment,
      utrTransactionNumber: "",
      transactionNumber: "",
      transactionStatus: "",
      paidAmount: "",
      AssignedTo: "",
      DeliveryPartnerUserId: "",
      latitude: 0,
      longitude: 0,
      isPickUp: false,
      isDelivered: false,
    };

    let response = await fetch(
      `https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order.");
    }

    // If update succeeds, RESET referral points to 0 on the referral record
    if (referralAmount > 0 && referralRec?.id) {
      try {
        const id = String(referralRec.id).trim();
        const payloadPut = {
          id,
          date: referralRec.date ?? new Date().toISOString(),
          referralNumbers: referralRec.referralNumbers ?? "",
          referreId: referralRec.referreId ?? userId ?? "",
          IsReferralUsed: true,
          referralPoints: "0",
        };

        let resp = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/UpdateReferralPoints?id=${encodeURIComponent(id)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payloadPut),
          }
        );

        if (!resp.ok) {
          resp = await fetch(
            `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/UpdateReferralPoints/${encodeURIComponent(id)}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json; charset=utf-8" },
              body: JSON.stringify(payloadPut),
            }
          );
        }

        if (!resp.ok) {
          const t = await resp.text().catch(() => "");
          console.error("Referral PUT failed:", resp.status, t);
        } else {
          setReferralPoints(0);
        }
      } catch (e) {
        console.error("Referral PUT error:", e);
      }
    }
    localStorage.removeItem(`cartSnapshot_${groceryItemId}`);
    localStorage.removeItem("activeOrderId");
    localStorage.removeItem("allCategories");
    localStorage.removeItem(`cartMeta_${groceryItemId}`);

   if (selectedPayment === 'online') {
     response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to Update Payment.');
    }
localStorage.removeItem(`cartSnapshot_${groceryItemId}`);
  localStorage.removeItem("activeOrderId");
  localStorage.removeItem("allCategories");
  localStorage.removeItem(`cartMeta_${groceryItemId}`);
    window.alert(`We are Redirecting to the Payment Page! Your reference number is ${martId}.`);
    window.location.href = `/groceryOnlinePayment/${groceryItemId}`;
  } else if (selectedPayment === 'cash') {
    response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${groceryItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
    }
     localStorage.removeItem(`cartSnapshot_${groceryItemId}`);
  localStorage.removeItem("activeOrderId");
  localStorage.removeItem("allCategories");
  localStorage.removeItem(`cartMeta_${groceryItemId}`);
    const primary = addresses.find(a => a.type === "primary");
  console.log("ZipCode:", primary?.zipCode);
if (primary?.zipCode === "530048" || primary?.zipCode === "530045") {
 window.alert(`Thank You for Choosing the Lakshmi Mart Services! Your Reference Order Number is ${martId}. Delivery in 45 Minutes.`);
    } else {
       window.alert(`Thank You for Choosing the Lakshmi Mart Services! Your Reference Order Number is ${martId}. Delivery in Between 45 to 120 Minutes.`);
    }
   window.location.href = `/profilePage/${userType}/${userId}`;   
   }    
  } catch (error) {
    console.error('Error:', error);
  }
};         

const normalizeName = (name) => {
  return (name ?? "")
    .toLowerCase()      
    .replace(/\s+/g, "") 
    .replace(/[^a-z0-9]/g, "");
};

const buildProductMapFromCart = (cart) => {
  const products = (cart?.categories ?? []).flatMap(c => c?.products ?? []);
  const map = new Map();
  for (const p of products) {
    const name = normalizeName(p?.productName);
    if (!name) continue;
    const qty = Number(
      p?.noOfQuantity ??
      p?.noofQuantity ??
      p?.qty ??
      p?.quantity ??
      0
    ) || 0;
    const stockLeft = Number(
      p?.stockLeft ??
      p?.StockLeft ??
      p?.stockleft ??
      0
    ) || 0;
    map.set(name, { qty, stockLeft });
  }
  return map;
};

const handleUpdateStockLeft = async () => {
  try {
    if (!Array.isArray(groceryData) || groceryData.length === 0) {
      console.warn("No grocery data to update.");
      return;
    }
    if (!cartData) {
      console.warn("Cart data unavailable.");
      return;
    }
    const productMap = buildProductMapFromCart(cartData);
    const requests = groceryData.map(async (item) => {
    const key = normalizeName(item?._matchedProductName || item?.name);
      if (!key) return null;
      const info = productMap.get(key);
      if (!info) {
        console.warn(`No cart match for grocery item ${item.id} (${key})`);
        return null;
      }
      const prevStock = info.stockLeft; 
      const newStock = prevStock;       
      const payload = {
        id: item.id,
        date: item.date,
        GroceryItemId: item.groceryItemId,
        Name: item.name,
        Category: item.category,
        Images: Array.isArray(item.images) ? item.images : [],
        MRP: item.mrp,
        Discount: item.discount,
        AfterDiscount: item.afterDiscount,
        StockLeft: String(newStock),   
        DeliveryIn: item.deliveryIn,
        RequestedBy: "Admin",
        Status: item.status,
        Code: item.code,
        Units: item.units,
      };
      const res = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/UpdateGroceryItems?id=${encodeURIComponent(item.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(`Failed for ${item.id}: ${msg}`);
      }
      console.log(`✔ Stock unchanged for ${item.name}: ${prevStock}`);
      return true;
    });
    await Promise.allSettled(requests);
    console.log("Stock updated (unchanged).");
  } catch (error) {
    console.error("Error updating stock:", error);
    alert("Failed to update grocery stock.");
  }
};

const sendLmartsms = async () => {
  try {
    const primaryAddress = addresses.find((addr) => addr.type === "primary");
    const mobileNumber = primaryAddress?.mobileNumber || primaryAddress?.mobileNumber; 
    const response = await fetch("https://handymanapiv2.azurewebsites.net/api/Auth/sendLmartsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addressData.fullName || fullName,
        ticketId: martId,
        phoneNumber: addressData.mobileNumber || mobileNumber,
        address: addressData.address || primaryAddress?.address,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); 
    console.log("SMS API success:", data);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

const handlePaymentAndSms = async () => {
  try {
    setLoading(true);
    await Promise.all([
      handleUpdateStockLeft(),
      sendLmartsms(),
      handleUpdatePaymentMethod()
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// const handleLocationMethod = async () => {
//   if (!navigator.geolocation) {
//     setLocationError("Geolocation not supported in this browser.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       setLocation({ latitude, longitude }); 
//       const payload = {
//         id: "string",
//         date: new Date().toISOString(), 
//         latitude,
//         longitude,
//       };
//       try {
//         const response = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/Location/UploadLocation`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//           }
//         );
//         if (!response.ok) throw new Error("Failed to update location details");
//         const result = await response.json();
//         console.log("Update success:", result);
//         // alert("Location updated successfully!");
//       } catch (error) {
//         console.error("Error updating location:", error);
//         alert("Update failed!");
//       }
//     },
//     (err) => {
//       setLocationError(err.message);
//       alert("Failed to get location: " + err.message);
//     },
//     { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//   );
// };
  
//   const BothHandlePaymentandLocation = async (e) => {
//       e.preventDefault();
//       try {
//         // await handleLocationMethod();
//         await handleUpdatePaymentMethod();
//       } catch (error) {
//         console.log("error:", error);
//       }
//     };

const handleCheckboxChange = (value) => {
  const newValue = selectedPayment === value ? null : value;
  setSelectedPayment(newValue);
  setError("");

  if (newValue) {
    setIsChecked(true);
  } else {
    setIsChecked(false);
  }
};

  return (
    <div>
    <div className="d-flex mt-80">
<div>
          <h1
            style={{
              background: "#008000",
              color: "white",
              fontFamily: "'Baloo 2'",
              fontSize: "25px",
              padding: "12px",
              fontWeight: "bold",
              textAlign: "center", 
              width: "100%",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              letterSpacing: "1px",
              marginBottom: "3px",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            Lakshmi Mart
          </h1>
        </div>

<div className={`container ${isMobile ? "w-100" : "w-75"}`}>
<div className="d-flex align-items-center">
  <span 
    className="me-2 text-success" 
    role="button" 
    style={{ cursor: "pointer" }}
    onClick={goBackToCart}
  >
    <ArrowBackIcon />
  </span>
  <h2 className="title text-success mb-0">PAYMENT CONFIRMATION</h2>
</div>
  {/* HANDYMAN */}
<div className="d-flex justify-content-between align-items-center">
                                <label className='mt-2 fs-6 fw-bold'>Address <span className="req_star">*</span></label>
                      {/* Modal */}
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton style={{ backgroundColor: isEditing ? "#008000" : "#008000",color: "white"}}>
                          <Modal.Title className='w-100'>
                            {isGuestName(fullName) ? 'Add Address' : 'Edit Address'}
                          </Modal.Title>
                          </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Full Name <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter Full name"
                                required
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Mobile Number <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                name="MobileNumber"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                maxLength="10"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                readOnly
                              />
                              </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="hidden"
                                name="UserId"
                                className="form-control"
                                placeholder="UserId"
                                value={guestCustomerId}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Address <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder="Enter address"
                                required
                              />
                            </Form.Group>
                           <Form.Group className="mb-3">
                              <Form.Label>State <span className="req_star">*</span></Form.Label>
                              <Form.Select
                                value={stateId || ''}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  setStateId(selectedId);
                                  const selectedState = stateList.find(
                                    (s) => s?.StateId?.toString() === selectedId
                                  );
                                  if (selectedState) {
                                    setState(selectedState.StateName);
                                  }
                                }}
                                required
                              >
                                <option value="">Select State</option>
                                {Array.isArray(stateList) &&
                                  stateList
                                    .filter((s) => s && s.StateId && s.StateName)
                                    .map((s) => (
                                      <option key={s.StateId} value={s.StateId.toString()}>
                                        {s.StateName}
                                      </option>
                                    ))}
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>District <span className="req_star">*</span></Form.Label>
                            <Form.Select
                                value={districtId || ''}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  setDistrictId(selectedId);
                                  const selectedDistrict = districtList.find(d => d.districtId.toString() === selectedId);
                                  if (selectedDistrict) {
                                    setDistrict(selectedDistrict.districtName);
                                  }
                                }}
                                required
                              >
                                <option value="">Select District</option>
                                {districtList.map((d) => (
                                  <option key={d.districtId} value={d.districtId.toString()}>
                                    {d.districtName}
                                  </option>
                                ))}
                              </Form.Select>
                              </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Pincode <span className="req_star">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={zipCode}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/\D/g, ""); 
                                  if (numericValue.length <= 6) {
                                    setZipCode(numericValue);
                                  }
                                }}              
                                 placeholder="Enter pincode"
                                 required
                              />
                            </Form.Group>
                            <Button type="button" style={{
                                            backgroundColor: isAddressInvalid ? "#008000" : "#008000",
                                            borderColor: isAddressInvalid ? "#008000" : "#008000",
                                            color: "white"
                                        }} onClick={handleAddressEdit}>
                              {isGuestName(fullName) ? 'Add Address' : 'Edit Address'}
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>  
                      </div>
                
                          <div className="p-3 border rounded bg-light">
                            {addresses
                                .map((address) => (
                                  <div 
                                    key={address.id}
                                    className="list-group-item d-flex justify-content-between align-items-center bg-white text-dark"
                                  >
                                    <div>
                                     <span className="ml-2">{address.fullName}</span>
                                      <br />
                                      <span className="ml-2">{address.mobileNumber}</span>
                                      <br />
                                      <span className="ml-2">{address.address}</span>
                                      <br />
                                      <span className="ml-2">{address.state}</span> 
                                      <br />
                                      <span className="ml-2">{address.district}</span> 
                                      <br />
                                      <span className="ml-2">{address.zipCode}</span> 
                                      <br />
                                    </div>
                                    <div className="text-end">
                                      <Button
                                        key={address.id}
                                        style={{
                                            backgroundColor: isAddressInvalid ? "#008000" : "#008000",
                                            borderColor: isAddressInvalid ? "#008000" : "#008000",
                                            color: "white"
                                        }}
                                        className={`text-white mx-1 ${
                                          shouldBlink ? "blinking-button" : ""
                                        }`}
                                        onClick={() => {
                                          setGuestCustomerId(address.id);
                                          setFullName(address.fullName);
                                          setMobileNumber(address.mobileNumber);
                                          setNewAddress(address.address);
                                          setState(address.state);
                                          setDistrict(address.district);
                                          setZipCode(address.zipCode);
                                          setIsEditing(true);
                                          setShowModal(true);
                                        }}
                                      >
                                        {address.address === "" ? "Add Address" : "Edit Address"}
                                      </Button>
                                </div> 
                                  </div>
                                ))}   
                                </div>

                            {fullName.trim().toLowerCase() === "guest" && (
                              <p className="text-danger">
                                Note: Please enter your address to Order Grocery
                              </p>
                            )}      
                    <div className='m-2'>
                      {serviceUnavailable && (
                        <div className="alert alert-danger">
                          <strong>Note:</strong> Currently, the options to Raise a Ticket, Book Technician or Lakshmi Mart services are unavailable in your district.
                            You can still purchase products through the "Buy Product" section.
                            For further assistance, please contact our customer support at 6281198953.
                        </div>
                      )}   
                    </div>

    <div className="grocery-confirmation">
    <p className='text-center' style={{ fontSize: "13px" }}><span className='name'>{fullName}</span> Thank you for Choosing the Lakshmi Mart</p>
      
       <div style={{ textAlign: "center" }}>    
       {firstOrderDiscount > 0 && (
        <span style={{ whiteSpace: "nowrap", color: "green"  }}>
          🎉 You have got 
          <span style={{ fontWeight: "bold", color: "red" }}> Rs </span>
          <span style={{ fontWeight: "bold", color: "red" }}>
            {firstOrderDiscount}
          </span>
          <span style={{ fontWeight: "normal", color: "green" }}> cashback!</span>
        </span>
      )}
      </div>
  <div
    className="d-flex align-items-center justify-content-between p-2"
    style={{
      background: "linear-gradient(90deg, #fff3cd, #ffe69c)",
      border: "2px dashed #ff9800",
      borderRadius: "12px",
    }}
  >
    <div>
      <strong style={{ color: "#d84315", fontSize: "13px" }}>
        🎁 FREE Idly Ravva 500 g    
      </strong>
      <div style={{ fontSize: "13px", fontWeight: "bold", textAlign: "center"}}>
        On orders above ₹499
      </div>
    </div>

    <img
      src={IdlyRavvaImg}
      alt="Free Atta"
      style={{ width: "50px", height: "60px" }}
    />
  </div>
         
  <table className="grocery-table m-2">
          <tbody>
            <tr>
              <td style={{ width: "40%", fontSize: "14px" }}>Order Id</td>
              <td style={{ width: "40%" }}>{martId}</td>
            </tr>   
            <tr>
              <td style={{ width: "40%", fontSize: "14px" }}>Number of Items selected</td>
              <td style={{ width: "40%" }}>{totalItemsSelected}</td>
            </tr>
          {showConfetti && <Confetti />}
            <tr>
              <td style={{ width: "40%", fontSize: "14px" }}>Grand Total</td>
              <td style={{ width: "40%" }}>Rs {grandTotal} /-</td>
            </tr>
           {showSugarOffer && (
            <tr>     
              <td colSpan="2" style={{ textAlign: "center" }}>
                <img
                  src={IdlyRavvaImg}
                  alt="Free Atta"
                  style={{ width: "60px", height: "60px" }}
                /> 
                <div style={{ fontSize: "13px", fontWeight: 600, color: "green" }}>
                  🎁 FREE Idly Ravva 500 g
                </div>
              </td>
            </tr>
          )}

            {firstOrderDiscount > 0 && (
              <tr>
                <td style={{ width: "40%", fontSize: "14px" }}>
                  Cash Back
                </td>

                <td style={{ width: "40%", fontSize: "14px" }}>
                  {`₹${firstOrderDiscount}`}
                </td>
              </tr>
            )}
            {/* {Number(referralAmount) > 0 && (
              <tr>
                <td style={{ width: "40%", fontSize: "14px" }}>Referral Earn Amount</td>
                <td style={{ width: "40%", color: "red" }}>- Rs {referralAmount} /-</td>
              </tr>
            )} */}
             <tr>
                <td style={{ width: "40%", fontSize: "14px", fontWeight: 600 }}>Total Payable</td>
                <td style={{ width: "40%", fontWeight: 700 }}>Rs {totalPayable} /-</td>
              </tr>
          </tbody>
        </table>

      <div className='payment m-2'>
        <label className='text-white w-100 p-2' style={{background: "#008000",borderRadius: "15px", fontSize: "14px"}}>Pay After Delivery – No Advance Needed</label>
        <div className='d-flex flex-column m-1'>
        {isMobile ? (
        <div className='d-flex flex-column'>
        {/* <label style={{fontSize: "13px"}}>
            <input 
            type="radio" 
            className="form-check-input border-dark m-1"
            checked={selectedPayment === 'online'}
            onChange={() => handleCheckboxChange('online')}/>
            Pay Through Online
          </label> */}
          <label style={{fontSize: "18px"}}>
            <input 
            type="radio" 
            className="form-check-input border-dark m-1"
            checked={selectedPayment === 'cash'}
            onChange={() => handleCheckboxChange('cash')}/>
            Cash On Delivery
          </label>
      {error && <p className="text-danger" style={{fontSize: "10px"}}>{error}</p>}
          </div>
        ) : (
          <div className="desktop-view d-flex flex-column ">
      {/* <label className="me-4" style={{fontSize: "12px"}}>
        <input 
        type="radio" 
        className="form-check-input border-dark me-2"
        checked={selectedPayment === 'online'}
        onChange={() => handleCheckboxChange('online')}
        />
        Pay Through Online
      </label> */}
      <label style={{fontSize: "20px"}}>
        <input 
          type="radio" 
          className="form-check-input border-dark me-2"
          checked={selectedPayment === 'cash'}
          onChange={() => handleCheckboxChange('cash')}
        />
        Cash On Delivery (COD)
      </label>
      {error && <p className="text-danger">{error}</p>}
    </div>
  )}
</div>
</div>

       <div className="note m-1">
          <div className="d-flex align-items-center">
  <input 
    type="checkbox" 
    className="form-check-input border-dark me-2"
    checked={isChecked}
    required
    onChange={(e) => setIsChecked(e.target.checked)}
    style={{ width: "13px", height: "13px" }} 
  />
  <button
    onClick={(e) => {
      e.preventDefault();
      setShowModals(true);
    }}
    className="p-0"
    style={{ 
      background: "none", 
      border: "none", 
      textDecoration: "underline", 
      cursor: "pointer",
      whiteSpace: "nowrap",
      fontSize: "13px",      
      color: "#0000FF",
    }}
  >
    Terms & Conditions & Cancellation Policy
  </button>
</div>
  {/* HANDYMAN */}
      {/* Modal for Terms and Conditions */}
      {showModals && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
      onClick={() => setShowModals(false)}
      style={{
        color: "red",
        position: "absolute",
        top: "10px",
        right: "15px",
        background: "none",
        border: "none",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      ✕
    </button>
            <h3>Terms & Conditions</h3>
            <div className="text-justify">
                    <div className="mt-10">
                        <h5>I. General</h5>
                        <p>
                          These Terms & Conditions apply to all grocery and daily-need purchases made through Lakshmi Mart (via APP or website).
                          By placing an order, you agree to abide by these T&C.
                          Lakshmi Sai Service Provider reserves the right to update policies without prior notice.                        
                        </p>
                    </div> 
                    <div className="mt-10">
                        <h5>II. Orders</h5>
                        <p>Orders are accepted subject to stock availability.In case of unavailability, Lakshmi Mart may cancel the product and issue a refund/replacement.
                            Customers must provide accurate delivery address and contact information. Incorrect details may lead to order cancellation.                       
                        </p>
                    </div>
                    <div className="mt-10">    
                        <h5>III. Pricing & Payment</h5>
                        <p>All prices are inclusive of GST, unless otherwise specified.Prices are subject to change depending on market conditions and supplier updates.
                          Payment options: UPI, credit/debit cards, net banking, and Cash on Delivery (COD, where available).                      
                        </p>
                    </div>
                    <div className="mt-10">
                        <h5>IV. Delivery</h5>
                        <p>Groceries are delivered within the estimated time shown at checkout.
                          Free delivery is available on eligible orders (e.g., above a specified order value).
                          Delivery times may vary due to traffic, weather, or supply chain issues.                        
                        </p>
                    </div>
                    <div className="mt-10">
                        <h5>V. Returns & Refunds</h5>
                        <p>
                          Perishable items (milk, vegetables, fruits, bakery, etc.) are non-returnable once delivered.
                          Non-perishable grocery items (packed pulses, rice, oil, flour, etc.) can be returned only if:
                        <br />
                        <h5>Wrong item delivered</h5>
                        Damaged or defective packaging at the time of delivery
                        Returns must be initiated within 24 hours of delivery by contacting customer support.
                        Refunds (if applicable) will be processed within 7–10 working days to the original payment method.
                        </p>
                    </div>
                     <h3>Cancellation Policy</h3>
                    <div className="mt-10">
                        <h5>I. Order Cancellations</h5>
                        <p>Orders can be cancelled before packing/dispatched at no extra cost.
                          Once the order is packed or out for delivery, cancellation is not allowed.
                          In case of COD orders, repeated cancellations may lead to blocking of the COD option for that customer.
                        </p>
                        <div className="mt-10">
                        <h4>II. Refund Timelines</h4>
                        <p>For prepaid orders cancelled before dispatch, a full refund will be processed.
                            Refunds take 7–10 working days to reflect in the original payment method.                        
                        </p>
                        </div>
                        <div className="mt-10">
                        <h5>III. Special Notes</h5>
                        <p>Bulk or wholesale orders may have separate cancellation/return terms.
                          Festival/offers/discounted items are not eligible for return or cancellation once dispatched.                        
                        </p>
                        </div>
                </div>
            </div>
            <div className = "text-center">
            <button className="btn btn-danger w-20" title="close" onClick={() => setShowModals(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>

<div className="button">
  {/* <button onClick={getLocation}>Get Location</button>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {locationError && <p style={{ color: "red" }}>{locationError}</p>} */}
    {/* <button className="btn-back m-2">Back</button> */}
      <button
        className="btn-grocery"
  disabled={isOrderDisabled}
  onClick={handlePaymentAndSms}
  title={
    isAddressInvalid
      ? "Please add a valid address"
      : serviceUnavailable
      ? "Service unavailable in your area"
      : isFirstOrderMinNotReached
      ? "Minimum order value ₹150 required on your first order to get ₹50 cashback."
      : ""
  }
>
  Order Now
</button>
</div>
    </div>
    </div>
    </div>
<Footer/>
    {/* Styles for floating menu */}
<style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0; 
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 20px;
          width: 100%;
          font-size: 13px;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default GroceryPaymentmethod;
