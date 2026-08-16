import { saveAs } from "file-saver";

const VENDOR_PROFILES_KEY = "vendorProfiles";
const VENDOR_INVENTORY_KEY = "vendorInventory";
const VENDOR_ADMIN_SESSION_KEY = "vendorAdminSession";
const VENDOR_PINCODE_MAP_KEY = "vendorPincodeMap";

// Hardcoded credentials for the vendor-approval admin console (Submit Admin).
export const VENDOR_ADMIN_CREDENTIALS = { username: "adminuser", password: "admin@123" };

// Serviceable pin codes grouped by delivery zone. Shared by the vendor admin
// console (assigning pin codes to an approved vendor) and the customer
// Profile page (looking up which vendors serve a customer's pin code).
export const zoneData = {
  A: ["530001", "530002", "530003", "530004"],
  B: ["530005", "530013", "530016", "530020", "530024", "530022", "530017"],
  C: ["530007", "530008", "530009", "530012", "530018"],
  D: ["530011", "530031", "530029", "530026", "530032"],
  E: ["530027", "530028", "530040"],
  F: ["530014", "530041", "530043", "530045", "530048", "530049"],
  G: ["531162", "531163", "531173"],
};

export const getZoneForPincode = (pincode) => {
  const code = String(pincode || "").trim();
  if (!code) return null;
  const entry = Object.entries(zoneData).find(([, codes]) => codes.includes(code));
  return entry ? entry[0] : null;
};

// Generates a placeholder image entirely locally (inline SVG data URI) —
// no external network call, so it never shows up broken/empty like
// via.placeholder.com does when that service is unreachable.
export const makePlaceholderImage = (text, bg = "e9ecef", fg = "ffffff") => {
  const safeText = String(text || "?").slice(0, 22);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'>
    <rect width='100%' height='100%' fill='#${bg}'/>
    <text x='50%' y='50%' font-family='Arial, sans-serif' font-size='26' font-weight='bold'
      fill='#${fg}' text-anchor='middle' dominant-baseline='middle'>${safeText}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const DEFAULT_VENDOR_INVENTORY = [
  {
    id: "P001",
    name: "Sona Masoori Rice",
    sku: "RICE-001",
    stock: 0,
    price: 59.99,
    category: "Rice & Ravva",
    vendorName: "Lakshmi Mart",
    image: makePlaceholderImage("Rice", "ffbe0b", "000000"),
  },
  {
    id: "P002",
    name: "Sunflower Oil",
    sku: "OIL-002",
    stock: 0,
    price: 139.0,
    category: "Oils & Dals",
    vendorName: "Lakshmi Mart",
    image: makePlaceholderImage("Oil", "fb5607", "ffffff"),
  },
  {
    id: "P003",
    name: "Surf Excel Detergent",
    sku: "DETERGENT-003",
    stock: 0,
    price: 199.0,
    category: "Bath & Body Care",
    vendorName: "Lakshmi Grocers",
    image: makePlaceholderImage("Detergent", "8338ec", "ffffff"),
  },
  {
    id: "P004",
    name: "Colgate Toothpaste",
    sku: "TOOTHPASTE-004",
    stock: 0,
    price: 69.0,
    category: "Health & Oral Care",
    vendorName: "Lakshmi Grocers",
    image: makePlaceholderImage("Toothpaste", "3a86ff", "ffffff"),
  },
  {
    id: "P005",
    name: "Amul Milk Powder",
    sku: "MILK-005",
    stock: 0,
    price: 299.0,
    category: "Milk, Curd & Ghee",
    vendorName: "AgriMandi",
    image: makePlaceholderImage("Milk", "70d6ff", "000000"),
  },
  {
    id: "P006",
    name: "Lifebuoy Soap",
    sku: "SOAP-006",
    stock: 0,
    price: 25.0,
    category: "Bath & Body Care",
    vendorName: "AgriMandi",
    image: makePlaceholderImage("Soap", "f8961e", "ffffff"),
  },
  {
    id: "P007",
    name: "Aashirvaad Atta",
    sku: "ATTA-007",
    stock: 0,
    price: 62.5,
    category: "Atta & Flours",
    vendorName: "Lakshmi Mart",
    image: makePlaceholderImage("Atta", "8ac926", "000000"),
  },
  {
    id: "P008",
    name: "Red Label Tea",
    sku: "TEA-008",
    stock: 0,
    price: 159.0,
    category: "Tea & Coffee",
    vendorName: "Lakshmi Grocers",
    image: makePlaceholderImage("Tea", "ff006e", "ffffff"),
  },
  {
    id: "P009",
    name: "SatyaStore Juice",
    sku: "JUICE-009",
    stock: 0,
    price: 45.0,
    category: "Drinks & Juices",
    vendorName: "SatyaStores",
    image: makePlaceholderImage("Juice", "00b4d8", "ffffff"),
  },
  {
    id: "P010",
    name: "SatyaStore Wheat Flour",
    sku: "FLOUR-010",
    stock: 0,
    price: 72.0,
    category: "Atta & Flours",
    vendorName: "SatyaStores",
    image: makePlaceholderImage("Flour", "90be6d", "000000"),
  },
];

const safeParse = (raw, fallback) => {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return fallback;
  } catch {
    return fallback;
  }
};

export const getVendorProfiles = () => {
  const raw = localStorage.getItem(VENDOR_PROFILES_KEY);
  return safeParse(raw, []);
};

export const saveVendorProfiles = (profiles) => {
  localStorage.setItem(VENDOR_PROFILES_KEY, JSON.stringify(profiles));
};

export const registerVendor = ({ name, email, phone, password }) => {
  const profiles = getVendorProfiles();
  const existing = profiles.find((profile) => profile.email === email);
  if (existing) {
    throw new Error("A vendor with this email already exists.");
  }

  const vendorId = `vendor-${Date.now()}`;
  const profile = {
    vendorId,
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString(),
  };

  profiles.push(profile);
  saveVendorProfiles(profiles);
  return profile;
};

export const findVendorByCredentials = (email, password) => {
  const profiles = getVendorProfiles();
  return profiles.find((profile) => profile.email === email && profile.password === password) || null;
};

export const getVendorProfileById = (vendorId) => {
  const profiles = getVendorProfiles();
  return profiles.find((profile) => profile.vendorId === vendorId) || null;
};

export const getVendorInventory = () => {
  const raw = localStorage.getItem(VENDOR_INVENTORY_KEY);
  if (!raw) {
    return DEFAULT_VENDOR_INVENTORY;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_VENDOR_INVENTORY;
    }
    return parsed;
  } catch {
    return DEFAULT_VENDOR_INVENTORY;
  }
};

export const saveVendorInventory = (inventory) => {
  localStorage.setItem(VENDOR_INVENTORY_KEY, JSON.stringify(inventory));
};

export const exportVendorInventory = (inventory) => {
  const blob = new Blob([JSON.stringify(inventory, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "vendor_inventory.json");
};

export const getVendorIcon = (vendorName) => {
  if (!vendorName) return "V";
  return vendorName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const getUniqueVendors = (inventory) => {
  const vendors = new Set(inventory.map((item) => item.vendorName || "Unknown"));
  return Array.from(vendors).sort();
};

// ── Vendor-approval admin session (Submit Admin console) ──
export const vendorAdminLogin = (username, password) => {
  const ok =
    String(username || "").trim() === VENDOR_ADMIN_CREDENTIALS.username &&
    String(password || "").trim() === VENDOR_ADMIN_CREDENTIALS.password;
  if (ok) localStorage.setItem(VENDOR_ADMIN_SESSION_KEY, "true");
  return ok;
};

export const isVendorAdminLoggedIn = () => localStorage.getItem(VENDOR_ADMIN_SESSION_KEY) === "true";

export const vendorAdminLogout = () => localStorage.removeItem(VENDOR_ADMIN_SESSION_KEY);

// ── Vendor <-> pin code assignments (which pin codes an approved vendor serves) ──
// Shape: { [vendorName]: string[] of pin codes }
export const getVendorPincodeMap = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(VENDOR_PINCODE_MAP_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const saveVendorPincodeMap = (map) => {
  localStorage.setItem(VENDOR_PINCODE_MAP_KEY, JSON.stringify(map || {}));
};

// Merge a set of newly-selected pin codes into a vendor's existing list.
export const assignPincodesToVendor = (vendorName, pincodes) => {
  if (!vendorName || !Array.isArray(pincodes) || pincodes.length === 0) return getVendorPincodeMap();
  const map = getVendorPincodeMap();
  const existing = new Set(map[vendorName] || []);
  pincodes.forEach((p) => existing.add(p));
  map[vendorName] = Array.from(existing);
  saveVendorPincodeMap(map);
  return map;
};

// Every pin code currently served by at least one approved vendor, with how
// many vendors serve it — used for the "ZipCode, Count" summary.
export const getPincodeVendorCounts = () => {
  const map = getVendorPincodeMap();
  const counts = {};
  Object.values(map).forEach((pincodes) => {
    (pincodes || []).forEach((code) => {
      counts[code] = (counts[code] || 0) + 1;
    });
  });
  return counts;
};

// Vendor names assigned to serve a given pin code.
export const getVendorNamesForPincode = (pincode) => {
  const code = String(pincode || "").trim();
  if (!code) return [];
  const map = getVendorPincodeMap();
  return Object.keys(map).filter((vendorName) => (map[vendorName] || []).includes(code));
};

// ── Vendor product approval requests (saved locally for now, instead of
// calling the remote grocery API) ──
const VENDOR_PRODUCT_REQUESTS_KEY = "vendorProductRequests";

export const getVendorProductRequests = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(VENDOR_PRODUCT_REQUESTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveVendorProductRequests = (requests) => {
  localStorage.setItem(VENDOR_PRODUCT_REQUESTS_KEY, JSON.stringify(requests || []));
};

// Vendor submits a batch of products for approval. Saved locally (for now)
// instead of hitting the remote API. Re-submitting the same product for the
// same vendor replaces the earlier request rather than duplicating it.
export const submitVendorProductRequests = (vendorName, products) => {
  const requests = getVendorProductRequests();
  const productIds = products.map((p) => p.id);
  const others = requests.filter((r) => !(r.requestedBy === vendorName && productIds.includes(r.id)));
  const newRequests = products.map((p) => ({
    ...p,
    requestedBy: vendorName,
    status: "Pending Approval",
    submittedAt: new Date().toISOString(),
  }));
  const merged = [...others, ...newRequests];
  saveVendorProductRequests(merged);
  return merged;
};

export const getPendingVendorProductRequests = () =>
  getVendorProductRequests().filter(
    (r) => String(r.status || "").trim().toLowerCase() === "pending approval"
  );

// Marks a vendor's selected locally-saved requests as Approved. `quantities`
// and `prices` are optional { [id]: number } maps for the quantity/price the
// admin set for each product before approving.
export const approveVendorProductRequests = (vendorName, ids, quantities = {}, prices = {}) => {
  const requests = getVendorProductRequests();
  const updated = requests.map((r) => {
    if (r.requestedBy !== vendorName || !ids.includes(r.id)) return r;
    const next = { ...r, status: "Approved", approvedQty: quantities[r.id] || r.approvedQty || 1 };
    if (prices[r.id] != null) next.approvedPrice = prices[r.id];
    return next;
  });
  saveVendorProductRequests(updated);
  return updated;
};