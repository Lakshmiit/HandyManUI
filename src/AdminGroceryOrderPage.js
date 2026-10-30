
import React, { useState, useEffect } from "react";

import "./App.css";
//import "../App.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Footer from "./Footer.js";
//import Footer from "../CommonPages/Footer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import ForwardIcon from "@mui/icons-material/Forward";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";

const API_BASE =
  "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api";

const AdminGroceryOrderPage = () => {
  const navigate = useNavigate();
  const { groceryItemId } = useParams();
  const [martId, setMartId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentMode, setPaymentMode] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
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
  const [status, setStatus] = useState();
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState("");
  const [zoomImage, setZoomImage] = useState("");
  const [zoomProduct, setZoomProduct] = useState(null);
  const [availedAmount, setAvailedAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // ---- NEW: quantity update state ----
  const [savingQty, setSavingQty] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // forces a re-fetch after save

  const timeSlots = [
    "7:00 AM - 9:00 AM",
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM",
  ];

  // ---- Derived values ----
  const itemsTotal = items.reduce((sum, item) => sum + Number(item.total), 0);
  const deliveryCharge = itemsTotal >= 150 ? 0 : 15;
  const handlingCharge = 5;

  // ---- NEW: quantity-change helpers ----
  // Items total as saved on the server (using originalQuantity)
  const originalItemsTotal = items.reduce(
    (s, i) => s + Math.round(i.afterDiscountPrice * i.originalQuantity),
    0,
  );

  // Grand total shown on screen = saved grand total + (change caused by +/- clicks).
  // Because it is based on the saved total, repeated saves never drift.
  const displayGrandTotal = Math.max(
    0,
    Math.round((Number(grandTotal) || 0) + itemsTotal - originalItemsTotal),
  );

  const isQtyChanged = items.some((i) => i.quantity !== i.originalQuantity);
  const allRemoved = items.length > 0 && items.every((i) => i.quantity === 0);

  useEffect(() => {
    console.log(
      status,
      groceryData,
      groceryId,
      id,
      customerId,
      loading,
      longitude,
      latitude,
      grandTotal,
      paidAmount,
      transactionNumber,
      transactionStatus,
      totalItemsSelected,
      cartData,
      code,
      units,
    );
  }, [
    status,
    groceryData,
    groceryId,
    id,
    customerId,
    loading,
    longitude,
    latitude,
    grandTotal,
    paidAmount,
    transactionNumber,
    transactionStatus,
    totalItemsSelected,
    cartData,
    code,
    units,
  ]);

  useEffect(() => {
    const ctrl = new AbortController();
    const fetchCart = async () => {
      if (!groceryItemId) return;
      try {
        const res1 = await fetch(
          `${API_BASE}/Mart/GetProductDetails?id=${groceryItemId}`,
          { signal: ctrl.signal },
        );
        if (!res1.ok) throw new Error("Failed to fetch product details");
        const data = await res1.json();
        setCartData(data);
        setMartId(data.martId);
        setGrandTotal(data.grandTotal);
        setRemainingAmount(data.remainingAmount);
        setAvailedAmount(data.availedAmount);
        setTotalItemsSelected(data.totalItemsSelected);
        setCustomerName(data.customerName);
        setStatus(data.status);
        const products = (data?.categories ?? []).flatMap(
          (c) => c?.products ?? [],
        );
        const selected = products.filter(
          (p) =>
            p?.isSelected || p?.selected || (p?.qty ?? p?.quantity ?? 0) > 0,
        );
        const baseList = selected.length ? selected : products;
        const productNames = Array.from(
          new Set(baseList.map((p) => p?.productName?.trim()).filter(Boolean)),
        );

        if (productNames.length === 0) {
          console.warn("⚠️ No product names found in the first API response");
          setgroceryData([]);
          setgroceryId(null);
          return;
        }

        const requests = productNames.map(async (name) => {
          const url = `${API_BASE}/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
            name,
          )}`;
          const res = await fetch(url, { signal: ctrl.signal });
          if (!res.ok)
            throw new Error(
              `UploadGrocery failed for "${name}" (HTTP ${res.status})`,
            );
          const list = await res.json();
          const arr = Array.isArray(list) ? list : list ? [list] : [];
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
        console.error("Error fetching cart data:", err);
      }
    };
    fetchCart();
    return () => ctrl.abort();
  }, [groceryItemId, refreshKey]);

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/DeliveryPartner/GetAllDeliveryPartners`,
        );
        const partners = response.data.filter(
          (partner) => partner.status === "open",
        );
        setDeliveryPartners(partners);
      } catch (error) {
        console.error("Error fetching delivery partners:", error);
      }
    };
    fetchDeliveryPartners();
  }, []);

  // IMPORTANT: dependencies are only [groceryItemId, refreshKey].
  // (The original had grandTotal and items here, which re-fetched in a loop
  //  and would also wipe the +/- changes the admin just made.)
  useEffect(() => {
    const fetchGroceryData = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/Mart/GetProductDetails?id=${groceryItemId}`,
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
        setRemainingAmount(data.remainingAmount);
        setTotalItemsSelected(data.totalItemsSelected);
        setTransactionStatus(data.transactionStatus);
        setPaidAmount(data.paidAmount);
        setTransactionNumber(data.transactionNumber);
        setDate(data.date);

        const allProducts = [];

        if (data.categories && Array.isArray(data.categories)) {
          data.categories.forEach((cat) => {
            (cat.products ?? []).forEach((p) => {
              const qty = Number(p.noOfQuantity) || 0;
              allProducts.push({
                id: p.productImage,
                serial: allProducts.length + 1,
                name: p.productName,
                category: cat.categoryName,
                mrp: p.mrp,
                discount: Math.round(p.discount),
                afterDiscountPrice: p.afterDiscountPrice,
                quantity: qty,
                originalQuantity: qty, // NEW: quantity saved on server
                total: Math.round(p.afterDiscountPrice * qty),
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
      } catch (error) {
        console.error("Error fetching grocery product data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (groceryItemId) {
      fetchGroceryData();
    }
  }, [groceryItemId, refreshKey]);

  // ---- NEW: increase / decrease quantity (local only, saved with button) ----
  const changeQty = (idx, delta) => {
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== idx) return it;
        const newQty = Math.max(0, Number(it.quantity) + delta); // 0 = item removed
        return {
          ...it,
          quantity: newQty,
          total: Math.round(it.afterDiscountPrice * newQty),
        };
      }),
    );
  };

  // ---- NEW: PUT call to save new quantities + new grand total ----
  const handleSaveQuantity = async () => {
    try {
      setSavingQty(true);

      // Keep the SAME data type the API gave us (string stays string, number stays number)
      const keepType = (original, value) =>
        typeof original === "string" ? String(value) : value;

      const categories = (cartData?.categories ?? []).map((cat) => {
        const products = (cat.products ?? []).map((p) => {
          const item = items.find(
            (i) => i.name === p.productName && i.category === cat.categoryName,
          );
          const newQty = item ? item.quantity : Number(p.noOfQuantity) || 0;
          return {
            ...p,
            noOfQuantity: keepType(p.noOfQuantity, newQty), // removed items stay with 0
          };
        });
        const catTotal = products.reduce(
          (s, p) => s + Number(p.afterDiscountPrice) * Number(p.noOfQuantity),
          0,
        );
        return {
          ...cat,
          products,
          totalAmount: keepType(cat.totalAmount, catTotal),
        };
      });

      const payload = {
        ...cartData,
        categories,
        grandTotal: keepType(cartData?.grandTotal, displayGrandTotal),
        totalItemsSelected: keepType(
          cartData?.totalItemsSelected,
          items.reduce((s, i) => s + Number(i.quantity), 0),
        ),
      };

      const response = await fetch(
        `${API_BASE}/Mart/UpdateProductDetails/${groceryItemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error("Failed to update quantity");

      alert("Quantity updated successfully");
      // Reload fresh data from the server (also resets originalQuantity)
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity. Try again.");
    } finally {
      setSavingQty(false);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    try {
      const partner = deliveryPartners.find(
        (p) => p.deliveryPartnerId === selectedPartner,
      );
      const payload = {
        ...cartData,
        customerName: customerName,
        address: address,
        state: state,
        district: district,
        zipCode: pincode,
        customerPhoneNumber: mobileNumber,
        id: groceryItemId,
        userId: customerId,
        martId: martId,
        date: date,
        grandTotal: grandTotal,
        totalItemsSelected: totalItemsSelected,
        status: "In Progress",
        paymentMode: paymentMode,
        utrTransactionNumber: transactionDetails,
        transactionNumber: transactionNumber,
        transactionStatus: transactionStatus,
        paidAmount: paidAmount,
        AssignedTo: partner ? partner.deliveryPartnerName : "",
        DeliveryPartnerUserId: partner ? partner.userId : "",
        deliveryAssignedTime: new Date().toISOString(),
        deliverySubmitTime: "",
        latitude: latitude,
        longitude: longitude,
        code: code,
        units: units,
        slotTime: `${selectedDate} ${selectedTimeSlot}`,
      };

      const response = await fetch(
        `${API_BASE}/Mart/UpdateProductDetails/${groceryItemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to Update Delivery Partner.");
      }
      alert(
        `Ticket has been assigned to ${partner ? partner.deliveryPartnerName : ""}`,
      );
      navigate(`/adminGroceryZoneDashboard`);
    } catch (error) {
      console.error("Error:", error);
      window.alert(
        "Failed to Update Delivery Partner. Please try again later.",
      );
    }
  };

  const handleCancelOrder = async () => {
    try {
      const normalizeProductName = (value) =>
        String(value ?? "")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ");

      const getQuantityNumber = (value) => {
        if (value === null || value === undefined || value === "") return 0;
        const number = Number(String(value).replace(/,/g, "").trim());
        return Number.isFinite(number) ? number : NaN;
      };

      // 1. GET LATEST CUSTOMER ORDER
      console.log("STARTING ORDER CANCELLATION, ORDER ID:", groceryItemId);

      const detailsResponse = await fetch(
        `${API_BASE}/Mart/GetProductDetails?id=${encodeURIComponent(
          groceryItemId,
        )}`,
      );

      if (!detailsResponse.ok) {
        const errorText = await detailsResponse.text();
        throw new Error(
          `Failed to get order details - HTTP ${detailsResponse.status} - ${errorText}`,
        );
      }

      const latestData = await detailsResponse.json();
      console.log("LATEST CUSTOMER ORDER:", latestData);

      // 2. GET VENDOR ID FROM ORDER
      const vendorId = String(
        latestData?.vendorId ?? latestData?.VendorId ?? "",
      ).trim();

      if (!vendorId) {
        throw new Error("Vendor ID was not found in the customer order.");
      }
      console.log("VENDOR ID:", vendorId);

      // 3. GET ALL PRODUCTS FROM CUSTOMER ORDER (same product -> quantities combined)
      //    Products with quantity 0 (removed with the "−" button) are skipped.
      const orderProductsMap = new Map();

      if (Array.isArray(latestData?.categories)) {
        latestData.categories.forEach((category) => {
          if (!Array.isArray(category?.products)) return;

          category.products.forEach((product) => {
            const productName = String(
              product?.productName ?? product?.ProductName ?? "",
            ).trim();

            const quantity = getQuantityNumber(
              product?.noOfQuantity ?? product?.quantity ?? product?.Quantity,
            );

            if (!productName || !Number.isFinite(quantity) || quantity <= 0) {
              return;
            }

            const normalizedName = normalizeProductName(productName);
            const existing = orderProductsMap.get(normalizedName);

            if (existing) {
              existing.quantity += quantity;
            } else {
              orderProductsMap.set(normalizedName, { productName, quantity });
            }
          });
        });
      }

      const orderProducts = Array.from(orderProductsMap.values());
      console.log("PRODUCTS FROM ORDER:", orderProducts);

      if (orderProducts.length === 0) {
        throw new Error("No products with quantity were found in this order.");
      }

      // 4. GET COMPLETE VENDOR INVENTORY
      const vendorResponse = await fetch(
        `${API_BASE}/VendorUploadProducts/GetVendorProductsvalues?vendorId=${encodeURIComponent(
          vendorId,
        )}`,
      );

      if (!vendorResponse.ok) {
        const errorText = await vendorResponse.text();
        throw new Error(
          `Failed to get vendor products - HTTP ${vendorResponse.status} - ${errorText}`,
        );
      }

      const vendorData = await vendorResponse.json();

      if (!Array.isArray(vendorData)) {
        throw new Error("Vendor API did not return an array.");
      }
      console.log("COMPLETE VENDOR INVENTORY:", vendorData);

      // 5. DEEP COPY VENDOR DATA (we modify this copy only)
      const updatedVendorRecords = JSON.parse(JSON.stringify(vendorData));
      const restorationResults = [];

      // 6. PROCESS EVERY PRODUCT FROM ORDER
      for (const orderProduct of orderProducts) {
        const productName = orderProduct.productName;
        const cancelledQuantity = getQuantityNumber(orderProduct.quantity);

        console.log("PROCESSING ORDER PRODUCT:", productName);
        console.log("CANCELLED QUANTITY:", cancelledQuantity);

        // 6.1 GET UploadGrocery DATA BY PRODUCT NAME
        const groceryResponse = await fetch(
          `${API_BASE}/UploadGrocery/GetGroceryItemsByProductName?productName=${encodeURIComponent(
            productName,
          )}`,
        );

        if (!groceryResponse.ok) {
          const errorText = await groceryResponse.text();
          throw new Error(
            `UploadGrocery failed for "${productName}" - HTTP ${groceryResponse.status} - ${errorText}`,
          );
        }

        const groceryResult = await groceryResponse.json();
        const groceryProducts = Array.isArray(groceryResult)
          ? groceryResult
          : groceryResult
            ? [groceryResult]
            : [];

        if (groceryProducts.length === 0) {
          throw new Error(
            `No UploadGrocery product found for "${productName}".`,
          );
        }
        console.log("UploadGrocery RESPONSE:", groceryProducts);

        // 6.2 FIND ALL EXACT PRODUCT NAME MATCHES
        const normalizedOrderName = normalizeProductName(productName);

        const matchingGroceryProducts = groceryProducts.filter((item) => {
          const apiProductName = normalizeProductName(
            item?.name ?? item?.productName ?? item?.ProductName ?? "",
          );
          return apiProductName === normalizedOrderName;
        });

        if (matchingGroceryProducts.length === 0) {
          throw new Error(
            `Exact product name not found in UploadGrocery for "${productName}".`,
          );
        }
        console.log("EXACT UploadGrocery MATCHES:", matchingGroceryProducts);

        // 6.3 GET ALL VALID UploadGrocery IDs
        const uploadGroceryCandidates = matchingGroceryProducts
          .map((item) => ({
            item,
            id: String(item?.id ?? item?.Id ?? "").trim(),
          }))
          .filter((item) => item.id);

        if (uploadGroceryCandidates.length === 0) {
          throw new Error(
            `UploadGrocery returned records but no valid ID was found for "${productName}".`,
          );
        }
        console.log(
          "UploadGrocery IDs TO CHECK:",
          uploadGroceryCandidates.map((x) => x.id),
        );

        // 6.4 FIND ALL VENDOR MATCHES (UploadGrocery.id === Vendor.productIds)
        //     Search the COMPLETE vendor response, then pick the latest updatedDate.
        const vendorMatches = [];

        for (
          let vendorIndex = 0;
          vendorIndex < updatedVendorRecords.length;
          vendorIndex++
        ) {
          const vendorRecord = updatedVendorRecords[vendorIndex];

          if (!Array.isArray(vendorRecord?.categorie)) continue;

          for (
            let categoryIndex = 0;
            categoryIndex < vendorRecord.categorie.length;
            categoryIndex++
          ) {
            const category = vendorRecord.categorie[categoryIndex];

            if (!Array.isArray(category?.products)) continue;

            for (
              let productIndex = 0;
              productIndex < category.products.length;
              productIndex++
            ) {
              const vendorProduct = category.products[productIndex];

              const vendorProductId = String(
                vendorProduct?.productIds ?? vendorProduct?.ProductIds ?? "",
              ).trim();

              if (!vendorProductId) continue;

              const matchedUpload = uploadGroceryCandidates.find(
                (candidate) => candidate.id === vendorProductId,
              );

              if (!matchedUpload) continue;

              const vendorUpdatedDate =
                vendorRecord?.updatedDate ??
                vendorRecord?.UpdatedDate ??
                vendorRecord?.createdDate ??
                vendorRecord?.CreatedDate ??
                "";

              const parsedDate = Date.parse(vendorUpdatedDate);
              const timestamp = Number.isFinite(parsedDate) ? parsedDate : 0;

              vendorMatches.push({
                vendorIndex,
                categoryIndex,
                productIndex,
                vendorRecord,
                vendorProduct,
                uploadGroceryId: matchedUpload.id,
                uploadGroceryProduct: matchedUpload.item,
                updatedDate: vendorUpdatedDate,
                timestamp,
              });
            }
          }
        }

        // 6.5 VALIDATE VENDOR MATCH
        if (vendorMatches.length === 0) {
          console.error("❌ NO VENDOR MATCH FOUND:", {
            productName,
            uploadGroceryIds: uploadGroceryCandidates.map((x) => x.id),
          });
          throw new Error(
            `No Vendor productIds matched any UploadGrocery ID for "${productName}".`,
          );
        }

        console.log(
          "ALL VENDOR MATCHES:",
          vendorMatches.map((match) => ({
            productName,
            uploadGroceryId: match.uploadGroceryId,
            vendorRecordId: match.vendorRecord?.id,
            updatedDate: match.updatedDate,
            quantity:
              match.vendorProduct?.quantity ?? match.vendorProduct?.Quantity,
            vendorIndex: match.vendorIndex,
            categoryIndex: match.categoryIndex,
            productIndex: match.productIndex,
          })),
        );

        // 6.6 SORT BY LATEST updatedDate (latest vendor record is the source of truth)
        vendorMatches.sort((a, b) => b.timestamp - a.timestamp);
        const latestVendorMatch = vendorMatches[0];

        console.log("LATEST VENDOR MATCH SELECTED:", {
          productName,
          uploadGroceryId: latestVendorMatch.uploadGroceryId,
          vendorRecordId: latestVendorMatch.vendorRecord?.id,
          updatedDate: latestVendorMatch.updatedDate,
          quantity:
            latestVendorMatch.vendorProduct?.quantity ??
            latestVendorMatch.vendorProduct?.Quantity,
          vendorIndex: latestVendorMatch.vendorIndex,
          categoryIndex: latestVendorMatch.categoryIndex,
          productIndex: latestVendorMatch.productIndex,
        });

        // 7. GET THE EXACT LATEST VENDOR PRODUCT
        const matchedVendorRecord =
          updatedVendorRecords[latestVendorMatch.vendorIndex];
        const matchedCategory =
          matchedVendorRecord.categorie[latestVendorMatch.categoryIndex];
        const matchedVendorProduct =
          matchedCategory.products[latestVendorMatch.productIndex];

        // 8. FINAL ID VALIDATION
        const finalVendorProductId = String(
          matchedVendorProduct?.productIds ??
            matchedVendorProduct?.ProductIds ??
            "",
        ).trim();

        if (finalVendorProductId !== latestVendorMatch.uploadGroceryId) {
          throw new Error(
            `Product ID mismatch for "${productName}". ` +
              `UploadGrocery ID: ${latestVendorMatch.uploadGroceryId}, ` +
              `Vendor productIds: ${finalVendorProductId}`,
          );
        }

        // 9. GET LATEST CURRENT VENDOR QUANTITY
        const existingVendorQuantity = getQuantityNumber(
          matchedVendorProduct?.quantity ?? matchedVendorProduct?.Quantity,
        );

        if (!Number.isFinite(existingVendorQuantity)) {
          throw new Error(
            `Invalid existing Vendor quantity for "${productName}". ` +
              `Vendor quantity: ${
                matchedVendorProduct?.quantity ?? matchedVendorProduct?.Quantity
              }`,
          );
        }

        // 10. RESTORED QUANTITY = existing vendor quantity + cancelled order quantity
        const restoredQuantity = existingVendorQuantity + cancelledQuantity;

        if (!Number.isFinite(restoredQuantity)) {
          throw new Error(`Invalid restored quantity for "${productName}".`);
        }

        console.log(
          "QUANTITY CALCULATION",
          productName,
          `${existingVendorQuantity} + ${cancelledQuantity} = ${restoredQuantity}`,
        );

        // 11. UPDATE ONLY quantity
        matchedVendorProduct.quantity = String(restoredQuantity);

        if (
          Object.prototype.hasOwnProperty.call(matchedVendorProduct, "Quantity")
        ) {
          delete matchedVendorProduct.Quantity;
        }

        // 12. VERIFY UPDATED PRODUCT
        const verifyId = String(matchedVendorProduct?.productIds ?? "").trim();
        const verifyQuantity = getQuantityNumber(
          matchedVendorProduct?.quantity,
        );

        if (verifyId !== latestVendorMatch.uploadGroceryId) {
          throw new Error(
            `Verification failed for "${productName}": product ID changed.`,
          );
        }

        if (verifyQuantity !== restoredQuantity) {
          throw new Error(
            `Verification failed for "${productName}": ` +
              `expected quantity ${restoredQuantity}, ` +
              `got ${verifyQuantity}.`,
          );
        }

        // 13. SAVE RESTORATION RESULT
        restorationResults.push({
          productName,
          uploadGroceryId: latestVendorMatch.uploadGroceryId,
          cancelledQuantity,
          oldVendorQuantity: existingVendorQuantity,
          newVendorQuantity: restoredQuantity,
          vendorRecordId: matchedVendorRecord.id,
          vendorUpdatedDate: latestVendorMatch.updatedDate,
          vendorIndex: latestVendorMatch.vendorIndex,
          categoryIndex: latestVendorMatch.categoryIndex,
          productIndex: latestVendorMatch.productIndex,
        });

        console.log("✅ PRODUCT STOCK UPDATED IN MEMORY:", {
          productName,
          oldQuantity: existingVendorQuantity,
          cancelledQuantity,
          newQuantity: restoredQuantity,
        });
      }

      // 14. GROUP RECORDS (one PUT per vendor record, containing all updated quantities)
      const recordsToUpdate = new Map();

      restorationResults.forEach((result) => {
        recordsToUpdate.set(
          result.vendorRecordId,
          updatedVendorRecords[result.vendorIndex],
        );
      });

      console.log("FINAL STOCK RESTORATION RESULTS:", restorationResults);
      console.table(restorationResults);
      console.log("VENDOR RECORDS TO PUT:", recordsToUpdate.size);

      // 15. PUT UPDATED VENDOR RECORDS
      for (const [vendorRecordId, vendorRecord] of recordsToUpdate.entries()) {
        if (!vendorRecord?.id) {
          throw new Error(`Vendor record ID missing for ${vendorRecordId}`);
        }

        const payload = JSON.parse(JSON.stringify(vendorRecord));

        console.log("UPDATING VENDOR RECORD:", payload.id, payload);

        const updateResponse = await fetch(
          `${API_BASE}/VendorUploadProducts/UpdateVendorProductsValues?id=${encodeURIComponent(
            payload.id,
          )}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error("❌ VENDOR UPDATE FAILED:", {
            vendorRecordId: payload.id,
            status: updateResponse.status,
            error: errorText,
            payload,
          });
          throw new Error(
            `Vendor quantity update failed - HTTP ${updateResponse.status} - ${errorText}`,
          );
        }

        console.log("✅ VENDOR RECORD PUT SUCCESS:", payload.id);
      }

      // 16. GET vendor data again to verify the quantity reached the backend
      const verifyVendorResponse = await fetch(
        `${API_BASE}/VendorUploadProducts/GetVendorProductsvalues?vendorId=${encodeURIComponent(
          vendorId,
        )}`,
      );

      if (!verifyVendorResponse.ok) {
        throw new Error(
          "Vendor stock was PUT successfully, but final verification GET failed.",
        );
      }

      const verifiedVendorData = await verifyVendorResponse.json();
      console.log("FINAL VENDOR INVENTORY AFTER PUT:", verifiedVendorData);

      // 17. VERIFY EACH RESTORED PRODUCT FROM BACKEND
      for (const result of restorationResults) {
        let verifiedMatch = null;

        for (const vendorRecord of verifiedVendorData) {
          if (!Array.isArray(vendorRecord?.categorie)) continue;

          for (const category of vendorRecord.categorie) {
            if (!Array.isArray(category?.products)) continue;

            for (const product of category.products) {
              const vendorProductId = String(
                product?.productIds ?? product?.ProductIds ?? "",
              ).trim();

              if (vendorProductId === result.uploadGroceryId) {
                const vendorDate =
                  vendorRecord?.updatedDate ?? vendorRecord?.UpdatedDate ?? "";
                const timestamp = Date.parse(vendorDate) || 0;

                if (!verifiedMatch || timestamp > verifiedMatch.timestamp) {
                  verifiedMatch = { product, vendorRecord, timestamp };
                }
              }
            }
          }
        }

        if (!verifiedMatch) {
          throw new Error(
            `Final verification failed: product "${result.productName}" with ID ${result.uploadGroceryId} was not found in Vendor API.`,
          );
        }

        const actualQuantity = getQuantityNumber(
          verifiedMatch.product?.quantity ?? verifiedMatch.product?.Quantity,
        );

        console.log("FINAL BACKEND QUANTITY CHECK:", {
          productName: result.productName,
          productId: result.uploadGroceryId,
          expectedQuantity: result.newVendorQuantity,
          actualQuantity,
          vendorUpdatedDate: verifiedMatch.vendorRecord?.updatedDate,
        });

        if (actualQuantity !== result.newVendorQuantity) {
          throw new Error(
            `Vendor backend quantity verification failed for "${result.productName}". ` +
              `Expected ${result.newVendorQuantity}, ` +
              `but Vendor API returned ${actualQuantity}.`,
          );
        }
      }

      console.log("✅ ALL VENDOR QUANTITIES VERIFIED FROM BACKEND");

      // 18. ONLY NOW CANCEL CUSTOMER ORDER (stock already restored and verified)
      const cancelPayload = {
        ...latestData,
        id: groceryItemId,
        status: "Cancel",
        AssignedTo: "",
        DeliveryPartnerUserId: "",
        deliveryAssignedTime: "",
        deliverySubmitTime: "",
        SlotTime: "",
        VendorId: "",
      };

      console.log("CANCEL ORDER PAYLOAD:", cancelPayload);

      const cancelResponse = await fetch(
        `${API_BASE}/Mart/UpdateProductDetails/${encodeURIComponent(
          groceryItemId,
        )}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cancelPayload),
        },
      );

      if (!cancelResponse.ok) {
        const errorText = await cancelResponse.text();
        throw new Error(
          `Vendor stock was restored and verified, but order cancellation failed - HTTP ${cancelResponse.status} - ${errorText}`,
        );
      }
      console.log("✅ ORDER CANCELLED SUCCESSFULLY");
      console.log("✅ ALL VENDOR STOCK RESTORED");
      console.table(restorationResults);

      alert(
        "Order has been cancelled and all vendor stock has been restored successfully.",
      );
      navigate("/adminGroceryZoneDashboard");
    } catch (error) {
      console.error("❌ CANCEL ORDER FAILED:", error);
      alert(`Failed to cancel order: ${error?.message || "Please try again."}`);
    }
  };

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    doc.line(20, pageHeight - 15, 190, pageHeight - 15);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont("Roboto", "bold");
    doc.text(
      "For Support : Call / WhatsApp 6281198953 | Mon–Sun : 7:00 AM – 9:00 PM",
      105,
      pageHeight - 10,
      { align: "center" },
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
    doc.text(`Customer Name: ${customerName || ""}`, 14, 28);
    const addressText = `Customer Address: ${[
      address,
      district,
      state,
      pincode,
      mobileNumber,
    ]
      .filter(Boolean)
      .join(", ")}`;

    doc.text(addressText || "", 14, 32, { maxWidth: 180 });
    doc.text(`Date: ${date ? date.split("T")[0] : ""}`, 14, 42);

    // Show ALL items. A removed item (qty 0) prints Qty 0 and Total Rs. 0
    autoTable(doc, {
      startY: 48,
      head: [
        [
          "S.No",
          "Photo",
          "Item Name",
          "Category",
          "MRP",
          "Dis (%)",
          "Price",
          "Qty",
          "Total",
        ],
      ],
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

    let currentY = doc.lastAutoTable.finalY + 10;

    const requiredHeight = 48;
    if (currentY + requiredHeight > PAGE_HEIGHT - FOOTER_SPACE) {
      doc.addPage();
      addHeader(doc, martId);
      addFooter(doc);
      currentY = TOP_MARGIN + 10;
    }
    doc.setFont("Roboto", "bold");
    doc.setFontSize(11);
    doc.setTextColor(200, 0, 0);
    doc.text(`Delivery Charges : Free`, 195, currentY, { align: "right" });
    currentY += 6;
    doc.text(`Handling Charges : Rs. ${handlingCharge}`, 195, currentY, {
      align: "right",
    });
    currentY += 6;
    doc.text(`Cashback Earned : Rs. ${availedAmount}`, 195, currentY, {
      align: "right",
    });
    currentY += 6;
    const finalCashback = availedAmount - handlingCharge;

    doc.text(
      `Cashback Deducted : Rs. ${finalCashback.toFixed(2)}`,
      195,
      currentY,
      { align: "right" },
    );
    currentY += 6;
    // Grand total now includes the quantity changes (+ / −)
    doc.text(`Grand Total : Rs. ${displayGrandTotal}`, 195, currentY, {
      align: "right",
    });
    currentY += 6;
    doc.text(
      `Remaining Wallet Balance : Rs. ${remainingAmount}`,
      195,
      currentY,
      {
        align: "right",
      },
    );

    currentY += 6;

    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);

    doc.text(
      "For every Rs.100 order value, Rs.10 will be used from wallet on next order.",
      105,
      currentY,
      { align: "center" },
    );
    doc.save(`Grocery_Order_${martId}.pdf`);
  };

  useEffect(() => {
    if (!items.length) return;
    const currentItems = items;
    const controller = new AbortController();
    async function loadImages() {
      const map = {};
      await Promise.all(
        currentItems.map(async (item) => {
          if (!item.image) return;
          try {
            const res = await fetch(
              `${API_BASE}/FileUpload/download?generatedfilename=${encodeURIComponent(
                item.image,
              )}`,
              { signal: controller.signal },
            );
            const json = await res.json();
            if (!json?.imageData) return;
            map[item.id] = `data:image/jpeg;base64,${json.imageData}`;
          } catch (err) {
            if (err?.name === "AbortError") return;
            console.error("Image fetch failed:", err);
          }
        }),
      );

      if (!controller.signal.aborted) {
        setImageUrls(map);
      }
    }
    loadImages();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleImageClick = (imageSrc, product) => {
    setZoomImage(imageSrc);
    setZoomProduct(product);
    setShowZoomModal(true);
  };

  return (
    <>
      <div
        className="d-flex flex-row justify-content-start align-items-start"
        style={{ marginTop: "130px" }}
      >
        {/* Main Content */}
        <div className={`container ${isMobile ? "w-100" : "w-75"}`}>
          <h3 className="text-center">Grocery Items Orders</h3>
          <div className="rounded-3bx_sdw w-100">
            <form className="form" onSubmit={handleSubmit}>
              <div className="text-center">
                <strong className="fs-5">
                  Order Number:<span>{martId}</span>
                </strong>
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
                    onFocus={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder="Customer Address"
                    readOnly
                  ></textarea>
                </div>
                <div className="col-md-6 form-group">
                  Date: {date ? date.split("T")[0] : ""}
                </div>
              </div>
              <h4 className="m-0">Grocery Items</h4>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th style={{ background: "green", color: "white" }}>
                      Sl. No
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      Item Name
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      Photo
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      Code
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      Category
                    </th>
                    <th style={{ background: "green", color: "white" }}>MRP</th>
                    <th style={{ background: "green", color: "white" }}>
                      Discount (%)
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      After Discount <br /> Price
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      Required <br /> Quantity
                    </th>
                    <th style={{ background: "green", color: "white" }}>
                      Total
                    </th>
                    {/* NEW column */}
                    <th style={{ background: "green", color: "white" }}>
                      Add or Less
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr
                      key={idx}
                      style={
                        item.quantity === 0
                          ? { opacity: 0.5, textDecoration: "line-through" }
                          : {}
                      }
                    >
                      <td>{item.serial}</td>
                      <td>{item.name}</td>
                      <td>
                        {imageUrls[item.id] ? (
                          <img
                            src={imageUrls[item.id]}
                            alt={item.name}
                            onClick={() =>
                              handleImageClick(imageUrls[item.id], item)
                            }
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
                      <td>Rs {item.mrp}</td>
                      <td>{item.discount}%</td>
                      <td>Rs {item.afterDiscountPrice.toFixed(0)}</td>
                      <td>{item.quantity}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        Rs {item.total.toFixed(0)}
                      </td>
                      {/* NEW: Add or Less buttons */}
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => changeQty(idx, -1)}
                            disabled={item.quantity <= 0 || savingQty}
                            title="Less"
                          >
                            −
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => changeQty(idx, 1)}
                            disabled={savingQty}
                            title="Add"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" className="text-end fw-bold text-danger">
                      Delivery Charge:{" "}
                      {deliveryCharge === 0
                        ? "FREE"
                        : `Rs ${deliveryCharge} /-`}
                    </td>

                    <td colSpan="6" className="text-end fw-bold text-danger">
                      Handling Charge:{" "}
                      {handlingCharge === 0
                        ? "FREE"
                        : `Rs ${handlingCharge} /-`}
                    </td>
                  </tr>
                  {availedAmount > 0 && (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-end fw-bold text-success"
                      >
                        Cashback Applied:
                      </td>
                      <td className="fw-bold text-success">
                        Rs {availedAmount}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="10" className="text-end fw-bold">
                      Grand Total:
                    </td>
                    <td className="fw-bold">Rs {displayGrandTotal}</td>
                  </tr>
                  <tr>
                    <td colSpan="10" className="text-danger text-end fw-bold">
                      Your's current wallet balance :
                    </td>
                    <td className="fw-bold">Rs {remainingAmount}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="text-end">
                {/* NEW: Save Quantity button, visible only after a change */}
                {isQtyChanged && (
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    style={{ borderRadius: "20px" }}
                    onClick={handleSaveQuantity}
                    disabled={savingQty || allRemoved}
                    title={
                      allRemoved
                        ? "All items removed - cancel the order instead"
                        : "Save quantity changes"
                    }
                  >
                    {savingQty ? "Saving..." : "Save Quantity"}
                  </button>
                )}
                <button
                  type="button"
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "20px",
                    padding: "8px",
                  }}
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button>
              </div>

              <Row>
                {/* Delivery Date */}
                <Col md={6}>
                  <Form.Group>
                    <label>Delivery Date</label>
                    <Form.Control
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                {/* Time Slot */}
                <Col md={6}>
                  <Form.Group>
                    <label>Time Slot</label>
                    <Form.Control
                      as="select"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      required
                    >
                      <option value="">Select Time Slot</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Delivery Partner Names Dropdown */}
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
                        <option
                          key={partner.id}
                          value={partner.deliveryPartnerId}
                        >
                          {partner.deliveryPartnerName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-2 d-flex justify-content-between">
                <Button
                  type="submit"
                  className=" text-white mx-2"
                  style={{ background: "green" }}
                  onClick={() => navigate(`/adminGroceryZoneDashboard`)}
                  title="Back"
                >
                  <ArrowBack />
                </Button>
                <Button
                  type="submit"
                  className="text-white mx-2"
                  style={{ background: "green" }}
                  title="Forward"
                  onClick={handleUpdatePaymentMethod}
                  // also blocked while there are unsaved quantity changes
                  disabled={!!paidAmount || !selectedPartner || isQtyChanged}
                >
                  <ForwardIcon />
                </Button>
                <Button
                  className="text-white mx-2"
                  style={{ background: "red" }}
                  onClick={handleCancelOrder}
                  title="Cancel Order"
                  disabled={!!selectedPartner}
                >
                  Cancel
                </Button>
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
            <h6 className="text-start fw-bold m-0" style={{ fontSize: "20px" }}>
              {zoomProduct?.name || ""}
            </h6>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default AdminGroceryOrderPage;
