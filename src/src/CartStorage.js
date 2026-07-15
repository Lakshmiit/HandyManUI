// import { appConfig } from "./config";

const CART_KEY = "allCategories";
/* ---------------- IMAGE URL ---------------- */
export const fileToUrl = (fn) => {
  if (!fn) return null;
  if (fn.startsWith("http")) return fn;
  return `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(fn)}`;
};

/* ---------------- CLEAN DATA ---------------- */
function cleanedCategories(all) {
  return (all || [])
    .map(c => ({
      categoryName: c.categoryName,
      products: (c.products || []).filter(p => Number(p?.qty) > 0)
    }))
    .filter(c => c.products.length > 0);
}

/* ---------------- CART STORAGE ---------------- */
export const CartStorage = {
  /* ---------- GET ALL ---------- */
  getAll() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Cart parse error", err);
      return [];
    }
  },

  /* ---------- SAVE ---------- */
  save(all) {
    const cleaned = cleanedCategories(all);
    localStorage.setItem(CART_KEY, JSON.stringify(cleaned));
  },

  /* ---------- UPSERT CATEGORY ---------- */
  upsertCategory(categoryName, productList) {
    let all = this.getAll();
    const idx = all.findIndex(c => c.categoryName === categoryName);
    const cleanedProducts = (productList || []).filter(p => Number(p.qty) > 0);
    if (idx >= 0) {
      all[idx] = {
        categoryName,
        products: cleanedProducts
      };
    } else {
      all.push({
        categoryName,
        products: cleanedProducts
      });
    }
    this.save(all);
  },

  /* ---------- FLAT ITEMS FOR CART PAGE ---------- */
  flatItems() {
    const all = this.getAll();
    return all.flatMap(cat =>
      (cat.products || []).map(p => {
        const imageFile = p.image
          ? (String(p.image).split("generatedfilename=")[1] || p.image)
          : null;
        return {
          id: `${cat.categoryName}-${p.productId}`,
          category: cat.categoryName,
          productId: p.productId,
          name: p.productName,
          qty: Number(p.qty || 0),
          mrp: Number(p.mrp || 0),
          discount: Number(p.discount || 0),
          price: Number(p.afterDiscountPrice || 0),
          stockLeft: Number(p.stockLeft || 0),
          imageFilename: imageFile,
          img: fileToUrl(imageFile)
        };
      })
    );
  },

  /* ---------- WRITE BACK FROM CART PAGE ---------- */
  writeBackFromFlatItems(items) {
    const grouped = {};
    (items || []).forEach(it => {
      if (!grouped[it.category]) {
        grouped[it.category] = [];
      }

      const imageFile = it.imageFilename
        ? it.imageFilename
        : (it.img ? (String(it.img).split("generatedfilename=")[1] || it.img) : null);
      grouped[it.category].push({
        productId: it.productId,
        productName: it.name,
        qty: Number(it.qty || 0),
        mrp: Number(it.mrp || 0),
        discount: Number(it.discount || 0),
        afterDiscountPrice: Number(it.price || 0),
        stockLeft: Number(it.stockLeft || 0),
        image: imageFile
      });
    });
    const all = Object.entries(grouped).map(([categoryName, products]) => ({
      categoryName,
      products: products.filter(p => Number(p.qty) > 0)
    }));
    this.save(all);
  },

  /* ---------- GRAND SUMMARY ---------- */
  grandSummary() {
    const all = this.getAll();
    let items = 0;
    let total = 0;
    all.forEach(cat =>
      (cat.products || []).forEach(p => {
        const qty = Number(p.qty || 0);
        const price = Number(p.afterDiscountPrice || 0);
        items += qty;
        total += price * qty;
      })
    );
    return {
      items,
      total: Math.round(total)
    };
  },
  clear() {
    localStorage.removeItem(CART_KEY);
  }
};