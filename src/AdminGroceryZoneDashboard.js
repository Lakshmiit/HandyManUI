
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const zoneData = {
  A: ["530001", "530002", "530003", "530004"],
  B: ["530005", "530013", "530016", "530020", "530024", "530022", "530017"],
  C: ["530007", "530008", "530009", "530012", "530018"],
  D: ["530011", "530031", "530029", "530026", "530032", "530049"],
  E: ["530027", "530028", "530040"],
  F: ["530014", "530041", "530043", "530045", "530048"],
  G: ["531162", "531163", "531173"],
};

const AdminGroceryZoneDashboard = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState(null);
  const allZones = [
    "Grocery",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "Others",
    "In Progress",
    "Delivered Tickets",
    "Return Orders",
    "Cancel Tickets",
    "All Grocery",
  ];

  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blinkingZones, setBlinkingZones] = useState({});
  const prevZoneCountsRef = useRef({});

  // Date filter (yyyy-mm-dd strings from <input type="date">)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const fetchGroceryData = useCallback(async (isInitial = false) => {
    try {
      const res = await fetch(
        "https://lmartapiv1-fxcyd2b4btacgsav.westus2-01.azurewebsites.net/api/Mart/GetAllMartItems",
      );
      const data = await res.json();

      setGroceryList((prev) => {
        if (isInitial || prev.length === 0) {
          return data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        const prevMap = new Map(prev.map((i) => [i.martId, i]));
        const hasChanges =
          data.length !== prev.length ||
          data.some((item) => {
            const old = prevMap.get(item.martId);
            return (
              !old ||
              old.status !== item.status ||
              old.assignedTo !== item.assignedTo
            );
          });

        if (!hasChanges) return prev;

        const merged = data.map((item) => {
          const existing = prevMap.get(item.martId);
          if (!existing) return item;
          return existing.status === item.status &&
            existing.assignedTo === item.assignedTo
            ? existing
            : item;
        });

        return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchGroceryData(true);
  }, [fetchGroceryData]);

  useEffect(() => {
    let intervalId = null;

    const ACTIVE_INTERVAL = 30_000;
    const HIDDEN_INTERVAL = 120_000;

    const start = (ms) => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => fetchGroceryData(false), ms);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        start(HIDDEN_INTERVAL);
      } else {
        fetchGroceryData(false);
        start(ACTIVE_INTERVAL);
      }
    };

    const handleOnline = () => start(ACTIVE_INTERVAL);
    const handleOffline = () => {
      if (intervalId) clearInterval(intervalId);
    };

    start(ACTIVE_INTERVAL);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchGroceryData]);

  const zoneMap = useMemo(() => {
    const map = {};
    Object.entries(zoneData).forEach(([zone, pincodes]) => {
      pincodes.forEach((p) => (map[p] = zone));
    });
    return map;
  }, []);

  const zoneCounts = useMemo(() => {
    const zones = {};

    const addTo = (key, item) => {
      if (!zones[key]) zones[key] = { count: 0, tickets: [] };
      zones[key].tickets.push(item);
      zones[key].count++;
    };

    groceryList.forEach((item) => {
      const status = item.status?.toLowerCase().trim();
      const zip = item.zipCode?.trim();
      const zone = zip && zoneMap[zip] ? zoneMap[zip] : "Others";

      if (status === "open") {
        addTo(zone, item);
        addTo("Grocery", item);
      }
      if (status === "in progress") addTo("In Progress", item);
      if (status === "delivered") addTo("Delivered Tickets", item);
      if (status === "return") addTo("Return Orders", item);
      if (status === "cancel") addTo("Cancel Tickets", item);
      if (["open", "in progress", "delivered"].includes(status))
        addTo("All Grocery", item);
    });

    Object.keys(zones).forEach((zone) => {
      zones[zone].tickets.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    return zones;
  }, [groceryList, zoneMap]);

  // ---------- Date filter ----------
  const isInDateRange = useCallback(
    (item) => {
      if (!fromDate && !toDate) return true;

      const d = new Date(item.date);
      if (isNaN(d)) return false;

      if (fromDate && d < new Date(`${fromDate}T00:00:00`)) return false;
      if (toDate && d > new Date(`${toDate}T23:59:59.999`)) return false;

      return true;
    },
    [fromDate, toDate],
  );

  // Date-filtered version of zoneCounts (used for display only)
  const filteredZoneCounts = useMemo(() => {
    const result = {};
    Object.entries(zoneCounts).forEach(([zone, v]) => {
      const tickets = v.tickets.filter(isInDateRange);
      result[zone] = { count: tickets.length, tickets };
    });
    return result;
  }, [zoneCounts, isInDateRange]);

  // Blinking uses the ORIGINAL zoneCounts so changing the date filter
  // never triggers a fake blink.
  useEffect(() => {
    const newBlinking = {};
    const prev = prevZoneCountsRef.current;

    Object.keys(zoneCounts).forEach((zone) => {
      if ((zoneCounts[zone]?.count || 0) > (prev[zone] || 0)) {
        newBlinking[zone] = true;
        setTimeout(
          () => setBlinkingZones((s) => ({ ...s, [zone]: false })),
          5000,
        );
      }
    });

    setBlinkingZones((s) => ({ ...s, ...newBlinking }));
    prevZoneCountsRef.current = Object.fromEntries(
      Object.entries(zoneCounts).map(([z, v]) => [z, v.count]),
    );
  }, [zoneCounts]);

  const totalValidTickets = useMemo(
    () =>
      groceryList.filter(
        (i) => i.status?.toLowerCase().trim() === "open" && isInDateRange(i),
      ).length,
    [groceryList, isInDateRange],
  );

  const handleGroceryClick = (id) => {
    navigate(`/adminGroceryOrderPage/${id}`, { state: { martId: id } });
  };

  const clearDates = () => {
    setFromDate("");
    setToDate("");
  };

  // ---------- Day / Month / Year counts ----------
  const toYMD = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;

  // Counts are for the selected tab (falls back to "All Grocery"),
  // ignoring the date filter so they always show real totals.
  const periodLabel = selectedZone || "All Grocery";
  const periodStats = useMemo(() => {
    const base = zoneCounts[periodLabel]?.tickets || [];
    const now = new Date();
    let today = 0;
    let month = 0;
    let year = 0;

    base.forEach((item) => {
      const d = new Date(item.date);
      if (isNaN(d) || d.getFullYear() !== now.getFullYear()) return;
      year++;
      if (d.getMonth() !== now.getMonth()) return;
      month++;
      if (d.getDate() === now.getDate()) today++;
    });

    return { today, month, year };
  }, [zoneCounts, periodLabel]);

  const applyQuickRange = (type) => {
    const now = new Date();
    if (type === "day") {
      setFromDate(toYMD(now));
      setToDate(toYMD(now));
    } else if (type === "month") {
      setFromDate(toYMD(new Date(now.getFullYear(), now.getMonth(), 1)));
      setToDate(toYMD(new Date(now.getFullYear(), now.getMonth() + 1, 0)));
    } else {
      setFromDate(toYMD(new Date(now.getFullYear(), 0, 1)));
      setToDate(toYMD(new Date(now.getFullYear(), 11, 31)));
    }
  };

  const chipStyle = {
    border: "none",
    background: "#198754",
    color: "#fff",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  };

  const selectedTickets = filteredZoneCounts[selectedZone]?.tickets || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        <ArrowBackIcon
          fontSize="large"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/adminNotifications")}
        />{" "}
        Grocery Orders{" "}
        <span
          className="badge bg-danger"
          style={{ color: "#fff", padding: "5px 10px", borderRadius: "10px" }}
        >
          {totalValidTickets}
        </span>
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        {allZones.map((zone) => {
          const data = filteredZoneCounts[zone] || { count: 0 };
          return (
            <div
              key={zone}
              onClick={() => setSelectedZone(zone)}
              style={{
                background: selectedZone === zone ? "#ffffff" : "#ffc107",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                minWidth: "80px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {zone}
              <div
                className="badge bg-danger"
                style={{
                  color: "#fff",
                  borderRadius: "8px",
                  marginTop: "5px",
                  marginLeft: "5px",
                  animation: blinkingZones?.[zone]
                    ? "blink 1s infinite"
                    : "none",
                }}
              >
                {data.count}
              </div>
            </div>
          );
        })}

        {/* Date filter beside "All Grocery" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            background: "#fff",
            padding: "8px 14px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>From</label>
          <input
            type="date"
            value={fromDate}
            max={toDate || undefined}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>To</label>
          <input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(e) => setToDate(e.target.value)}
          />
          {(fromDate || toDate) && (
            <button
              onClick={clearDates}
              style={{
                border: "none",
                background: "#dc3545",
                color: "#fff",
                borderRadius: "6px",
                padding: "4px 10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Clear
            </button>
          )}

          <span
            style={{
              borderLeft: "2px solid #ddd",
              paddingLeft: "10px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {periodLabel}:
          </span>
          <button
            style={chipStyle}
            title="Show today's orders"
            onClick={() => applyQuickRange("day")}
          >
            Today: {periodStats.today}
          </button>
          <button
            style={chipStyle}
            title="Show this month's orders"
            onClick={() => applyQuickRange("month")}
          >
            This Month: {periodStats.month}
          </button>
          <button
            style={chipStyle}
            title="Show this year's orders"
            onClick={() => applyQuickRange("year")}
          >
            This Year: {periodStats.year}
          </button>

          {(fromDate || toDate) && (
            <span
              style={{
                background: "#0d6efd",
                color: "#fff",
                borderRadius: "6px",
                padding: "4px 10px",
                fontWeight: "bold",
                fontSize: "13px",
              }}
              title={`Orders in the selected date range for ${periodLabel}`}
            >
              {fromDate ? fromDate.split("-").reverse().join("-") : "Start"}
              {" → "}
              {toDate ? toDate.split("-").reverse().join("-")  :   "Today"}:{" "}
              {filteredZoneCounts[periodLabel]?.count || 0}
            </span>
          )}
        </div>
      </div>

      {selectedZone && (
        <div>
          <h3 className="text-danger">Zone {selectedZone} Orders</h3>

          {selectedTickets.length === 0 && (
            <p>
              {fromDate || toDate
                ? "No orders found for the selected date range."
                : "No orders found."}
            </p>
          )}

          {selectedTickets.map((item) => (
            <div
              key={item.martId}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <strong>ID: </strong>
              <span
                onClick={() => handleGroceryClick(item.id)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {item.martId}
              </span>
              <div>
                <strong>Name:</strong> {item.customerName}
              </div>
              <div>
                <strong>Address:</strong> {item.address}, {item.district},{" "}
                {item.state}, {item.zipCode}, {item.customerPhoneNumber}
              </div>
              <div>
                <strong>Grand Total:</strong> Rs {item.grandTotal} /-
              </div>
              <div>
                <strong>Date:</strong> {new Date(item.date).toLocaleString()}
              </div>
              <div>
                <strong>Delivery Partner:</strong> {item.assignedTo}
              </div>
              {item.status === "In Progress" && (
                <div>
                  <strong>Delivery Assigned Time:</strong>{" "}
                  {new Date(item.deliveryAssignedTime).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </div>
              )}
              {item.status === "Delivered" && (
                <div>
                  <strong>Delivery Submit Time:</strong>{" "}
                  {new Date(item.deliverySubmitTime).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </div>
              )}
              <div>
                <strong>Customer Paid Amount:</strong> Rs {item.paidAmount} /-
              </div>
              <div>
                <strong>Payment Mode:</strong> {item.paymentMode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGroceryZoneDashboard;

