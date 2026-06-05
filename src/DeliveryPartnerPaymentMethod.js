import React, { useEffect, useState } from "react";

const DeliveryPartnerPaymentDashboard = () => {
  const [martItems, setMartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    paymentType: "All",
    deliveryPartner: "All",
    fromDate: "",
    toDate: "",
  });

  const MART_API =
    "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Mart/GetAllMartItems";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(MART_API);
      const data = await response.json();
      console.log("FULL API RESPONSE:", data);
      setMartItems(data?.data || data?.$values || data || []);
    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only "Delivered" status items for partner dropdown
  const deliveryPartners = [
    "All",
    ...new Set(
      martItems
        .filter((item) => (item.status || item.Status || "").toString().trim().toLowerCase() === "delivered")
        .map((item) => item.assignedTo || item.AssignedTo)
        .filter(Boolean)
    ),
  ].sort();

  // Returns only "Delivered" items matching all filters
  const getFilteredItems = () => {
    if (!Array.isArray(martItems)) return [];

    return martItems.filter((item) => {
      // Must be Delivered
      const status = (item.status || item.Status || "")
      .toString()
      .trim();
      if (status !== "Delivered") {
           return false;
      }
      // Date filter — compare date only (strip time)
      //  const itemDateStr = ( item.date || item.Date || "").split("T")[0];
      const d = new Date(item.date || item.Date);
      const itemDateStr =
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0");
      const fromDateValid = !filters.fromDate || itemDateStr >= filters.fromDate;
      const toDateValid = !filters.toDate || itemDateStr <= filters.toDate;

      // Payment mode filter
      const paymentMode = (item.PaymentMode || item.paymentMode || "")
      .toString()
      .trim()
      .toLowerCase();
      let paymentValid = true;
       switch (filters.paymentType) {
      case "cash":
        paymentValid = paymentMode === "cash";
        break;

      case "online":
        paymentValid = paymentMode === "online";
        break;

      case "cash&online":
        paymentValid =
          paymentMode.includes("cash") &&
          paymentMode.includes("online");
        break;

      default:
        paymentValid = true;
    }

      // Delivery partner filter
      const partnerName = item.assignedTo || item.AssignedTo || "Not Assigned";
      const partnerValid =
        filters.deliveryPartner === "All" || partnerName === filters.deliveryPartner;

      return fromDateValid && toDateValid && paymentValid && partnerValid;
    });
  };

  // Group by delivery partner name — totals recalculate with every filter change
  const groupedData = () => {
    const filtered = getFilteredItems();
    const grouped = {};

    filtered.forEach((item) => {
      const partnerName = item.assignedTo || item.AssignedTo || "Not Assigned";

      if (!grouped[partnerName]) {
        grouped[partnerName] = {
          deliveryPartnerName: partnerName,
          cash: 0,
          online: 0,
          cashAndOnline: 0,
          totalOrders: 0,
          grandTotal: 0,
          totalAmountReceived: 0,
        };
      }

      const grandTotal = Number(item.grandTotal || item.GrandTotal || 0);
      const paidAmount = Number(
        item.paidAmount ?? item.PaidAmount ?? item.grandTotal ?? item.GrandTotal ?? 0
      );
      const paymentMode = (item.PaymentMode || item.paymentMode || "")
        .toString()
        .trim()
        .toLowerCase();

      grouped[partnerName].grandTotal += grandTotal;
      grouped[partnerName].totalOrders += 1;
      grouped[partnerName].totalAmountReceived += paidAmount;

      if (paymentMode === "cash") {
        grouped[partnerName].cash += paidAmount;
      } else if (paymentMode === "online") {
        grouped[partnerName].online += paidAmount;
      } else if (paymentMode.includes("cash") && paymentMode.includes("online")) {
        grouped[partnerName].cashAndOnline += paidAmount;
      }
    });

    return Object.values(grouped);
  };

  const summaryData = groupedData();

  // Footer totals — derived from filtered+grouped data
  // const totalOrders = summaryData.reduce((sum, r) => sum + r.totalOrders, 0);
  const filteredItems = getFilteredItems();
  const totalOrders = filteredItems.length;
  const totalGrandTotal = summaryData.reduce((sum, r) => sum + r.grandTotal, 0);
  const totalCash = summaryData.reduce((sum, r) => sum + r.cash, 0);
  const totalOnline = summaryData.reduce((sum, r) => sum + r.online, 0);
  const totalCashOnline = summaryData.reduce((sum, r) => sum + r.cashAndOnline, 0);
  const totalAmountReceived = summaryData.reduce((sum, r) => sum + r.totalAmountReceived, 0);

  const fmt = (n) => `₹${(Number(n) || 0).toFixed(2)}`;

  const today = new Date().toISOString().split("T")[0];

  const handleFromDate = (e) => {
    const val = e.target.value;
    if (val > today) {
      alert("From Date should not exceed today's date");
      return;
    }
    if (filters.toDate && val > filters.toDate) {
      alert("From Date should not be greater than To Date");
      return;
    }
    setFilters({ ...filters, fromDate: val });
  };

  const handleToDate = (e) => {
    const val = e.target.value;
    if (val > today) {
      alert("To Date should not exceed today's date");
      return;
    }
    if (filters.fromDate && val < filters.fromDate) {
      alert("To Date should not be less than From Date");
      return;
    }
     setFilters({ ...filters, toDate: val });
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="header-card">
        <h1 className="main-title">Delivery Partner Payment Dashboard</h1>

        <div className="filters-row">
          {/* PAYMENT TYPE */}
          <div className="filter-box">
            <label className="filter-label">Payment Type</label>
            <select
              value={filters.paymentType}
              onChange={(e) => setFilters({ ...filters, paymentType: e.target.value })}
              className="filter-input"
            >
              <option value="All">All</option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
              <option value="cash&online">Cash &amp; Online</option>
            </select>
          </div>

          {/* FROM DATE */}
          <div className="filter-box">
            <label className="filter-label">From Date</label>
            <input
              type="date"
              value={filters.fromDate}
              max={today}
              onChange={handleFromDate}
              className="filter-input"
            />
          </div>   

          {/* TO DATE */}
          <div className="filter-box">
            <label className="filter-label">To Date</label>
            <input
              type="date"
              value={filters.toDate}
              min={filters.fromDate || ""}
              max={today}
              onChange={handleToDate}
              className="filter-input"
            />
          </div>

          {/* DELIVERY PARTNERS */}
          <div className="filter-box">
            <label className="filter-label">Delivery Partners</label>
            <select
              value={filters.deliveryPartner}
              onChange={(e) => setFilters({ ...filters, deliveryPartner: e.target.value })}
              className="filter-input"
            >
              {deliveryPartners.map((partner, index) => (
                <option key={index} value={partner}>
                  {partner}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-row">
        <div className="summary-card blue-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="summary-card orange-card">
          <h3>Grand Total</h3>
          <p>{fmt(totalGrandTotal)}</p>
        </div>
        <div className="summary-card green-card">
          <h3>Total Cash</h3>
          <p>{fmt(totalCash)}</p>
        </div>
        <div className="summary-card indigo-card">
          <h3>Total Online</h3>
          <p>{fmt(totalOnline)}</p>
        </div>
        <div className="summary-card purple-card">
          <h3>Cash &amp; Online</h3>
          <p>{fmt(totalCashOnline)}</p>
        </div>
        <div className="summary-card teal-card">
          <h3>Total Amount Received</h3>
          <p>{fmt(totalAmountReceived)}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Delivery Partner</th>
              <th>Grand Total</th>
              <th>Cash</th>
              <th>Online</th>
              <th>Cash &amp; Online</th>
              <th>Total Orders</th>
              <th>Total Amount Received</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="no-data">Loading...</td>
              </tr>
            ) : summaryData.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">No Data Found</td>
              </tr>
            ) : (
              summaryData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.deliveryPartnerName}</td>
                  <td className="bold-text">{fmt(item.grandTotal)}</td>
                  <td className="green-text">{fmt(item.cash)}</td>
                  <td className="blue-text">{fmt(item.online)}</td>
                  <td className="purple-text">{fmt(item.cashAndOnline)}</td>
                  <td>{item.totalOrders}</td>
                  <td className="bold-text">{fmt(item.totalAmountReceived)}</td>
                </tr>
              ))
            )}
          </tbody>

          {/* FOOTER TOTALS ROW */}
          {summaryData.length > 0 && (
            <tfoot>
              <tr className="total-row">
                <td colSpan="2" className="bold-text">Total</td>
                <td className="bold-text">{fmt(totalGrandTotal)}</td>
                <td className="green-text bold-text">{fmt(totalCash)}</td>
                <td className="blue-text bold-text">{fmt(totalOnline)}</td>
                <td className="purple-text bold-text">{fmt(totalCashOnline)}</td>
                <td className="bold-text">{totalOrders}</td>
                <td className="bold-text">{fmt(totalAmountReceived)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default DeliveryPartnerPaymentDashboard;


// import React, { useEffect, useState } from "react";
// const DeliveryPartnerPaymentDashboard = () => { 
//   const [martItems, setMartItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     paymentType: "All",
//     deliveryPartner: "All",
//     fromDate: "",
//     toDate: "",
//   });

//   // API
//   const MART_API =
//     "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/Mart/GetAllMartItems";

//   // FETCH API
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(MART_API);

//       const data = await response.json();

//       console.log("FULL API RESPONSE:", data);

//       setMartItems(data?.data || data?.$values || data || []);
//     } catch (error) {
//       console.error("API ERROR:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELIVERY PARTNERS ONLY DELIVERED
//   const deliveryPartners = [
//     "All",
//     ...new Set(
//       martItems
//         .filter((item) => {
//           const status = (item.status || item.Status || "")
//             .toString()
//             .trim()
//             // .toLowerCase();

//           return status === "Delivered";
//         })
//         .map((item) => {
//           return item.assignedTo || item.AssignedTo;
//         })
//         .filter(Boolean),
//     ),
//   ].sort();

//   // FILTER DATA
//   const getFilteredItems = () => {
//     if (!Array.isArray(martItems)) return [];
//     return martItems.filter((item) => {
//       // STATUS
//      const status = (item.status || item.Status || "")
//         .toString()
//         .trim();

//         if (status !== "Delivered") {
//         return false;
//         }
//       // ITEM DATE
//       const itemDate = new Date(item.date);

//       // FROM DATE
//       const fromDateValid = filters.fromDate
//         ? itemDate >= new Date(filters.fromDate)
//         :  true;

//       // TO DATE
//       const toDateValid = filters.toDate
//         ? itemDate <= new Date(filters.toDate + "T23:59:59")
//         : true;

//       // PAYMENT MODE
//       const paymentType = (item.PaymentMode || item.paymentMode || "")
//         .toString()
//         .trim()
//         .toLowerCase();

//       // PAYMENT FILTER
//       const paymentValid =
//         filters.paymentType === "All"
//           ? true
//           : paymentType.includes(filters.paymentType.toLowerCase());

//       // DELIVERY PARTNER
//       const partnerName = item.assignedTo || item.AssignedTo || "Not Assigned";

//       // DELIVERY PARTNER FILTER
//       const deliveryPartnerValid =
//         filters.deliveryPartner === "All"
//           ? true
//           : partnerName === filters.deliveryPartner;

//       return (
//         fromDateValid && toDateValid && paymentValid && deliveryPartnerValid
//       );
//     });
//   };

//   // GROUP DATA
//   const groupedData = () => {
//     const filtered = getFilteredItems();

//     const grouped = {};

//     filtered.forEach((item) => {
//       // PARTNER NAME
//       const partnerName = item.assignedTo || item.AssignedTo || "Not Assigned";

//       const grandTotal = item.grandTotal || item.GrandTotal || 0;

//       const martId = item.martId || item.MartId || "-";

//       const date = item.date ? new Date(item.date).toLocaleString() : "-";

//       const key = `${partnerName}_${date}_${grandTotal}_${martId}`;

//       // CREATE GROUP
//       if (!grouped[key]) {
//         grouped[key] = {
//           deliveryPartnerName: partnerName,

//           martId: martId,

//           grandTotal: grandTotal,

//           date,

//           cash: 0,
//           online: 0,
//           cashAndOnline: 0,

//           totalOrders: 0,

//           totalAmount: 0,
//         };
//       }

//       // SAFE AMOUNT
//       const rawAmount =
//         item.PaidAmount ??
//         item.paidAmount ??
//         item.GrandTotal ??
//         item.grandTotal ??
//         item.TotalAmount ??
//         item.totalAmount ??
//         item.Amount ??
//         item.amount ??
//         0;

//       // CONVERT NUMBER
//       const amount = Number(rawAmount) || 0;

//       // PAYMENT MODE
//       const paymentType = (item.PaymentMode ?? item.paymentMode ?? "")
//         .toString()
//         .trim()
//         .toLowerCase();

//       // CASH
//       if (paymentType.includes("cash") && !paymentType.includes("online")) {
//         grouped[key].cash += amount;
//       }

//       // ONLINE
//       else if (
//         paymentType.includes("online") &&
//         !paymentType.includes("cash")
//       ) {
//         grouped[key].online += amount;
//       }

//       // CASH & ONLINE
//       else if (paymentType.includes("cash") && paymentType.includes("online")) {
//         grouped[key].cashAndOnline += amount;
//       }

//       grouped[key].totalOrders += 1;

//       grouped[key].totalAmount += amount;
//     });

//     return Object.values(grouped);
//   };

//   const summaryData = groupedData();

//   // TOTALS
//   const totalOrders = summaryData.reduce(
//     (sum, item) => sum + item.totalOrders,
//     0,
//   );

//   const totalCash = summaryData.reduce((sum, item) => sum + item.cash, 0);

//   const totalOnline = summaryData.reduce((sum, item) => sum + item.online, 0);

//   const totalCashOnline = summaryData.reduce(
//     (sum, item) => sum + item.cashAndOnline,
//     0,
//   );

//   const grandTotalAmount =
//     (Number(totalCash) || 0) +
//     (Number(totalOnline) || 0) +
//     (Number(totalCashOnline) || 0);

//   const grandTotal = summaryData.reduce(
//     (sum, item) => sum + (Number(item.grandTotal) || 0),
//     0,
//   );

//   return (
//     <div className="dashboard-container">
//       {/* HEADER */}
//       <div className="header-card">
//         <h1 className="main-title">Delivery Partner Payment Dashboard</h1>

//         {/* FILTERS */}
//         <div className="filters-row">
//           {/* PAYMENT TYPE */}
//           <div className="filter-box">
//             <label className="filter-label">Payment Type</label>

//             <select
//               value={filters.paymentType}
//               onChange={(e) =>
//                 setFilters({
//                   ...filters,
//                   paymentType: e.target.value,
//                 })
//               }
//               className="filter-input"
//             >
//               <option value="All">All</option>

//               <option value="cash">Cash</option>

//               <option value="online">Online</option>

//               <option value="cash&online">Cash & Online</option>
//             </select>
//           </div>

//           {/* FROM DATE */}
//           <div className="filter-box">
//             <label className="filter-label">From Date</label>

//             <input
//               type="date"
//               value={filters.fromDate}
//               max={new Date().toLocaleString()}
//               onChange={(e) => {
//                 const selectedDate = e.target.value;

//                 const today = new Date().toISOString().split("T")[0];

//                 // FUTURE DATE BLOCK
//                 if (selectedDate > today) {
//                   alert("Current date should not exceed today's date");

//                   setFilters({
//                     ...filters,
//                     fromDate: "",
//                   });

//                   return;
//                 }
//                 setFilters({
//                   ...filters,
//                   fromDate: selectedDate,
//                 });
//               }}
//               className="filter-input"
//             />
//           </div>

//           <div className="filter-box">
//             <label className="filter-label">To Date</label>

//             <input
//               type="date"
//               value={filters.toDate}
//               max={new Date().toLocaleString()}
//               onChange={(e) => {
//                 const selectedDate = e.target.value;

//                 const today = new Date().toISOString().split("T")[0];

//                 // FUTURE DATE BLOCK
//                 if (selectedDate > today) {
//                   alert("Current date should not exceed today's date");

//                   setFilters({
//                     ...filters,
//                     toDate: "",
//                   });

//                   return;
//                 }

//                 // TO DATE VALIDATION
//                 if (filters.fromDate && selectedDate < filters.fromDate) {
//                   alert("To Date should not be less than From Date");

//                   setFilters({
//                     ...filters,
//                     toDate: "",
//                   });

//                   return;
//                 }

//                 setFilters({
//                   ...filters,
//                   toDate: selectedDate,
//                 });
//               }}
//               className="filter-input"
//             />
//           </div>

//           {/* DELIVERY PARTNERS */}
//           <div className="filter-box">
//             <label className="filter-label">Delivery Partners</label>

//             <select
//               value={filters.deliveryPartner}
//               onChange={(e) =>
//                 setFilters({
//                   ...filters,
//                   deliveryPartner: e.target.value,
//                 })
//               }
//               className="filter-input"
//             >
//               {deliveryPartners.map((partner, index) => (
//                 <option key={index} value={partner}>
//                   {partner}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="summary-row">
//         {/* TOTAL ORDERS */}
//         <div className="summary-card blue-card">
//           <h3>Total Orders</h3>

//           <p>{totalOrders}</p>
//         </div>

//         {/* GRAND TOTAL */}
//         <div className="summary-card orange-card">
//           <h3>Grand Total</h3>

//           <p>₹{grandTotal.toFixed(2)}</p>
//         </div>

//         {/* TOTAL CASH */}
//         <div className="summary-card green-card">
//           <h3>Total Cash</h3>

//           <p>₹{(Number(totalCash) || 0).toFixed(2)}</p>
//         </div>

//         {/* TOTAL ONLINE */}
//         <div className="summary-card indigo-card">
//           <h3>Total Online</h3>

//           <p>₹{(Number(totalOnline) || 0).toFixed(2)}</p>
//         </div>

//         {/* CASH & ONLINE */}
//         <div className="summary-card purple-card">
//           <h3>Cash & Online</h3>

//           <p>₹{(Number(totalCashOnline) || 0).toFixed(2)}</p>
//         </div>

//         {/* Total Amount Received */}
//         <div className="summary-card purple-card">
//           <h3>Total Amount Received</h3>

//           <p>₹{(Number(grandTotalAmount) || 0).toFixed(2)}</p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="table-container">
//         <table className="payment-table">
//           <thead>
//             <tr>
//               <th>S.No</th>

//               <th>Delivery Partner</th>

//               <th>Mart Id</th>

//               <th>Grand Total</th>

//               <th>Date</th>

//               <th>Cash</th>

//               <th>Online</th>

//               <th>Cash & Online</th>

//               <th>Total Orders</th>

//               <th>Total Amount Received</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="10" className="no-data">
//                   Loading...
//                 </td>
//               </tr>
//             ) : summaryData.length === 0 ? (
//               <tr>
//                 <td colSpan="10" className="no-data">
//                   No Data Found
//                 </td>
//               </tr>
//             ) : (
//               summaryData.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>

//                   <td>{item.deliveryPartnerName}</td>

//                   <td>{item.martId}</td>

//                   <td className="bold-text">
//                     ₹{(Number(item.grandTotal) || 0).toFixed(2)}
//                   </td>

//                   <td>{item.date}</td>

//                   {/* CASH */}
//                   <td className="green-text">₹{item.cash.toFixed(2)}</td>

//                   {/* ONLINE */}
//                   <td className="blue-text">₹{item.online.toFixed(2)}</td>

//                   {/* CASH & ONLINE */}
//                   <td className="purple-text">
//                     ₹{item.cashAndOnline.toFixed(2)}
//                   </td>

//                   {/* TOTAL ORDERS */}
//                   <td>{item.totalOrders}</td>

//                   {/* GRAND TOTAL */}
//                   <td className="bold-text">
//                     ₹
//                     {filters.paymentType === "cash"
//                       ? item.cash.toFixed(2)
//                       : filters.paymentType === "online"
//                         ? item.online.toFixed(2)
//                         : filters.paymentType === "cash&online"
//                           ? item.cashAndOnline.toFixed(2)
//                           : item.totalAmount.toFixed(2)}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// export default DeliveryPartnerPaymentDashboard;                                 
