const CART_KEY = "allCategories";

export const fileToUrl = (fn) =>
  fn
    ? `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(fn)}`
    : null;

function cleanedCategories(all) {
  return (all || [])
    .map(c => ({
      ...c,
      products: (c.products || []).filter(p => Number(p?.qty) > 0),
    }))
    .filter(c => c.products.length > 0);
}

export const CartStorage = {
  getAll() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  },

  save(all) {
    localStorage.setItem(CART_KEY, JSON.stringify(cleanedCategories(all)));
  },

  upsertCategory(categoryName, productList) {
  let all = this.getAll() || [];
  if (!Array.isArray(all)) {
    all = [all]; // normalize to array
  }

  const idx = all.findIndex(c => c.categoryName === categoryName);

  // filter only products with qty > 0
  const cleaned = (productList || []).filter(p => Number(p.qty) > 0);

  if (idx >= 0) {
    all[idx] = { categoryName, products: cleaned };
  } else {
    all.push({ categoryName, products: cleaned });
  }

  this.save(all);
},

  flatItems() {
    return this.getAll().flatMap(cat =>
      (cat.products || []).map((p, i) => ({
        id: `${cat.categoryName}-${p.productId}-${i}`,
        category: cat.categoryName,
        productId: p.productId,
        name: p.productName,
        qty: Number(p.qty || 0),
        mrp: Number(p.mrp || 0),
        discount: Number(p.discount || 0),
        price: Number(p.afterDiscountPrice || 0),
        stockLeft: Number(p.stockLeft || 0),
        img: fileToUrl(p.image || null), // build URL only when rendering
      }))
    );
  },

  writeBackFromFlatItems(items) {
    const grouped = {};
    (items || []).forEach(it => {
      const imageFile = it.img
        ? (String(it.img).split("generatedfilename=")[1] || it.img)
        : null;
      (grouped[it.category] ||= []).push({
        productId: it.productId,
        productName: it.name,
        qty: Number(it.qty || 0),
        mrp: Number(it.mrp || 0),
        discount: Number(it.discount || 0),
        afterDiscountPrice: Number(it.price || 0),
        stockLeft: Number(it.stockLeft || 0),
        image: imageFile, // store filename only
      });
    });
    const all = Object.entries(grouped).map(([categoryName, products]) => ({
      categoryName,
      products: (products || []).filter(p => Number(p.qty) > 0),
    }));
    this.save(all);
  },

 grandSummary() {
  const all = this.getAll() || [];   // fallback to empty array
  let items = 0, total = 0;

  // Ensure it's always an array
  const list = Array.isArray(all) ? all : [all];

  list.forEach(cat =>
    (cat.products || []).forEach(p => {
      items += Number(p.qty || 0);
      total += Number(p.afterDiscountPrice || 0) * Number(p.qty || 0);
    })
  );

  return { items, total: Math.round(total) };
}
};