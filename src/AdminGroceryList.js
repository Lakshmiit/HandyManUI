import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const AdminGroceryList = () => {
  const [groceryData, setGroceryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState("");
  const [grocerystatus, setGrocerystatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]); 
  const rowsPerPage = 15;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");    
 const [stockFetched, setStockFetched] = useState(false);
const [stockLoading, setStockLoading] = useState(false);
   
useEffect(() => {
  console.log(stockLoading);
}, [stockLoading])
//   useEffect(() => {
//   setLoading(true);
//   const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsBycategory?Category=${category}`;
  
//   axios.get(url)
//     .then((response) => {
//       const groceries = response.data.map((grocery) => ({
//         ...grocery,
//         mrp: parseFloat(grocery.mrp) || 0,
//         discount: parseFloat(grocery.discount) || 0,
//         afterDiscount: parseFloat(grocery.afterDiscount) || 0,
//         stockLeft: parseInt(grocery.stockLeft) || 0,
//       }));

//       // Sort alphabetically by product name
//       groceries.sort((a, b) => a.name.localeCompare(b.name));
//       setGroceryData(groceries);
//       setFilteredData(groceries);

//       // Collect unique status values (from "status" field)
//       const uniqueCategories = [...new Set(groceries.map((p) => p.category))];
//       const uniqueStatus = [...new Set(groceries.map((p) => p.status))];
//       setCategories(uniqueCategories);
//       setStatus(uniqueStatus);
//     })
//     .catch((error) => {
//       console.error("Error fetching grocery data:", error);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, [category]);

useEffect(() => {
  setLoading(true);
  const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetAllGroceryItems`;

  axios.get(url)
    .then((response) => {
      const groceries = response.data.map((grocery) => ({
        ...grocery,
        mrp: parseFloat(grocery.mrp) || 0,
        discount: parseFloat(grocery.discount) || 0,
        afterDiscount: parseFloat(grocery.afterDiscount) || 0,
        stockLeft: parseInt(grocery.stockLeft) || 0,
         name: (grocery.name || "").trim(),
      }));

      groceries.sort((a, b) => a.name.localeCompare(b.name));

      setGroceryData(groceries);
      setFilteredData(groceries);

      const uniqueCategories = [...new Set(groceries.map((p) => p.category))];
      setCategories(uniqueCategories);

      // ✅ Collect unique statuses (Approved / Pending Approval etc.)
      const uniqueStatus = [...new Set(groceries.map((p) => p.status))];
      setStatus(uniqueStatus);
    })
    .catch((error) => {
      console.error("Error fetching grocery data:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

useEffect(() => {
  if (!groceryData.length || stockFetched) return;

  let cancelled = false;
  setStockLoading(true);

  const fetchStockForName = async (name) => {
    if (!name || name.toLowerCase() === "string") return { name, total: 0 };

    try {
      const url = `https://handymanapiv2.azurewebsites.net/api/Mart/GetMartItemsByProductName?productName=${encodeURIComponent(name)}`;
      const res = await axios.get(url, { validateStatus: () => true });

      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        // ✅ Some APIs wrap product details inside "p"
        const totalStock = res.data.reduce((sum, item) => {
          const stock =
            item.p && item.p.stockLeft !== undefined
              ? parseInt(item.p.stockLeft, 10)
              : parseInt(item.stockLeft, 10);
          return sum + (stock || 0);
        }, 0);
        return { name, total: totalStock };
      }

      return { name, total: 0 };
    } catch (e) {
      console.warn("Stock fetch failed for:", name, e?.message || e);
      return { name, total: 0 };
    }
  };

  (async () => {
    try {
      // ✅ Fetch all stocks in parallel
      const results = await Promise.allSettled(
        groceryData.map((p) => fetchStockForName(p.name))
      );

      if (cancelled) return;

      const stockMap = {};
      for (const r of results) {
        if (r.status === "fulfilled") {
          stockMap[r.value.name] = r.value.total;
        }
      }

      // ✅ Merge data — if Mart API has stock > 0, use it; else fallback to original
      const merged = groceryData.map((item) => {
        const newStock = stockMap[item.name];
        return {
          ...item,
          stockLeft:
            newStock && newStock > 0
              ? newStock
              : parseInt(item.stockLeft) || 0,
        };
      });

      setGroceryData(merged);
      setFilteredData(merged);
      setStockFetched(true);
    } finally {
      if (!cancelled) setStockLoading(false);
    }
  })();

  return () => {
    cancelled = true;
  };
}, [groceryData, stockFetched]);


  // Handle delete functionality
  const handleDelete = (groceryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this grocery?');
    if (confirmDelete) {
      axios.delete(`https://handymanapiv2.azurewebsites.net/api/Product/${groceryId}`)
        .then(() => {
          setGroceryData(prevData => prevData.filter(grocery => grocery.id !== groceryId));
          setFilteredData(prevData => prevData.filter(grocery => grocery.id !== groceryId));
        })
        .catch(error => {
          console.error("Error deleting grocery:", error);
        });
    }
  };

  // Filter data based on selected category and catalogue
useEffect(() => {
  let filtered = groceryData;

  if (category) {
    filtered = filtered.filter((grocery) => grocery.category === category);
  }

  if (grocerystatus) {
    filtered = filtered.filter((grocery) => grocery.status === grocerystatus);
  }
    if (searchTerm) {
    filtered = filtered.filter(grocery =>
      grocery.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
 
  setFilteredData(filtered);
  setCurrentPage(1);
}, [grocerystatus, category, searchTerm, groceryData]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get paginated data
  const indexOfLastGrocery = currentPage * rowsPerPage;
  const indexOfFirstGrocery = indexOfLastGrocery - rowsPerPage;
  const currentGrocery = filteredData.slice(indexOfFirstGrocery, indexOfLastGrocery);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container my-2 ">
      <h2 className="text-center mb-2 mt-mob-50">All Grocery</h2>
      {/* Search Bar */}
        <div className="form-group col-md-3">
        <label>Search Products Here</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
         {/* Category */}
            {/* <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="">Choose Category</option>
                <option value="Baby & Kids">Baby & Kids</option>
                <option value="Beverages">Beverages</option>
                <option value="Home Needs">Home Needs</option>
                <option value="Masalas & Cooking Essentials">Masalas & Cooking Essentials</option>
                <option value="Packaged & Gourmet">Packaged & Gourmet</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Snacks & Branded Foods">Snacks & Branded Foods</option>
                <option value="Staples & Grains">Staples & Grains</option>
                </select>
            </div> */}

            <div className="form-group text-start col-md-2 m-2 ml-2 mb-3">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((categoryOption, index) => (
                <option key={index} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
          </div>

        {/* Status */}
        <div className="form-group">
        <label>Grocery Status</label>
        <select
          className="form-control"
          value={grocerystatus}
          onChange={(e) => setGrocerystatus(e.target.value)}
        >
          <option value="">All Grocery Status</option>
          {status.map((statusOption, index) => (
            <option key={index} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>

        {/* Add New Product Button */}
        <div className="d-flex justify-content-center col-md-6 ">
  <button
    className="btn btn-success"
     onClick={() => navigate(`/adminUploadGrocery/Admin`)}
  >
    Add New Grocery
  </button> 
</div>
      </div> 

      {filteredData.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No {category} Grocery Items Available</h4>
        </div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Grocery Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>After Discount Price</th>
                <th>Requested By</th>
                <th>Stock Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {currentGrocery.map((grocery, index) => (
    <tr key={index}>
      <td className="product-name-cell">{grocery.name}</td>
      <td>₹{Math.round(grocery.mrp)}</td>
      <td>{grocery.discount ? `${Math.round(grocery.discount)}%` : "No discount"}</td>
      <td>₹{Math.round(grocery.afterDiscount)}</td>
      <td>
        {grocery.requestedBy ? (
          <span
            style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
            title={grocery.requestedBy}
          >
            {grocery.requestedBy}
          </span>
        ) : (     
          'N/A'
        )}
      </td>
      <td>{(Number(grocery.stockLeft) || 0) <= 0 ? "No Stock"  : Number(grocery.stockLeft)}</td>
      <td className="d-flex">
  <Link 
    to={`/adminUpdateGrocery/${grocery.id}/Admin`} 
    className="btn btn-warning m-1"
  >
    <FaEdit />
  </Link>
  
  <Link 
    to={`/adminGroceryApproval/${grocery.id}/Admin`} 
    className="btn btn-info m-1"
  >
    <FaEye />
  </Link>
  
  <button
    onClick={() => handleDelete(grocery.id)}
    className="btn btn-danger m-1"
  >
    <FaTrash />
  </button>
</td>

    </tr>
  ))}
</tbody>

          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map((_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminGroceryList;
