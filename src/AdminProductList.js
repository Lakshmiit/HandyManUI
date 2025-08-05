import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const AdminProductList = () => {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [catalogues, setCatalogues] = useState([]); // State for catalogues
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState("");
  const [productstatus, setproductstatus] = useState("");
  const [catalogue, setCatalogue] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const navigate = useNavigate();
  // const {userType} = useParams();
  // const {ProductOwnedBy} = useParams();
  
  // Fetch product data, categories, and catalogues
  useEffect(() => {
    setLoading(true);
    const url = `https://handymanapiv2.azurewebsites.net/api/Product/GetAdminProductList?ProductOwnedBy=Admin`;
    axios.get(url)
      .then((response) => {
        const products = response.data.map((product) => ({
          ...product,
          afterDiscountPrice: product.discount
            ? product.rate - (product.rate * product.discount) / 100
            : product.rate,
        }));
        setProductData(products);
        setFilteredData(products);
  
        // Extract unique categories, catalogues, and status
        const uniqueCategories = [...new Set(products.map((product) => product.category))];
        const uniqueCatalogues = [...new Set(products.map((product) => product.catalogue))];
        const uniqueStatus = [...new Set(products.map((product) => product.productStatus))];
        setCategories(uniqueCategories);
        setCatalogues(uniqueCatalogues);
        setStatus(uniqueStatus);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  // Handle delete functionality
  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      axios.delete(`https://handymanapiv2.azurewebsites.net/api/Product/${productId}`)
        .then(() => {
          setProductData(prevData => prevData.filter(product => product.id !== productId));
          setFilteredData(prevData => prevData.filter(product => product.id !== productId));
        })
        .catch(error => {
          console.error("Error deleting product:", error);
        });
    }
  };

  // Filter data based on selected category and catalogue
  useEffect(() => {
    let filtered = productData;

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (catalogue) {
      filtered = filtered.filter(product => product.catalogue === catalogue);
    }

    if (productstatus) {
      filtered = filtered.filter(product => product.productStatus === productstatus);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [category, catalogue, productstatus, productData]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get paginated data
  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is fetching
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">All Products</h2>
      <div className="d-flex align-items-center justify-content-between">
        {/* Category */}
        <div className="form-group text-start col-md-2 ml-2 m-5 mb-2">
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

        {/* Catalogue */}
        <div className="form-group col-md-2 m-5 mb-2">
          <label>Catalogues</label>
          <select
            className="form-control"
            value={catalogue}
            onChange={(e) => setCatalogue(e.target.value)}
          >
            <option value="">All Catalogues</option>
            {catalogues.map((catalogueOption, index) => (
              <option key={index} value={catalogueOption}>
                {catalogueOption}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="form-group col-md-2 m-5 mb-2">
          <label>Product Status</label>
          <select
            className="form-control"
            value={productstatus}
            onChange={(e) => setproductstatus(e.target.value)}
          >
            <option value="">All Product Status</option>
            {status.map((statusoption, index) => (
              <option key={index} value={statusoption}>
                {statusoption}
              </option>
            ))}
          </select>
        </div>

        {/* Add New Product Button */}
        <div className="text-end col-md-3 mb-1">
  <button
    className="btn btn-success"
    onClick={() => navigate(`/adminUploadForm/Admin`)}
  >
    Add New Product
  </button> 
</div>   
      </div> 

      {filteredData.length === 0 ? (
        <div className="text-center my-5">
          <h4>No Products Available</h4>
        </div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>After Discount Price</th>
                <th>Requested By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index}>
                  <td className="product-name-cell">{product.productName}</td>
                  <td>₹{product.rate}</td>
                  <td>{product.discount ? `${product.discount}%` : "No discount"}</td>
                  <td>₹{product.afterDiscountPrice.toFixed(0) || 'N/A'}</td>
                  <td>
                    {product.productOwnedBy ? (
                      <span
                        style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                        title={product.productOwnedBy}
                      >
                        {product.productOwnedBy}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="actions-cell">
                    <Link to={`/adminUpdateProduct/${product.id}/Admin`} className="btn btn-warning" title="Edit">
                      <FaEdit />
                    </Link>
                    <Link to={`/adminProductApproval/${product.id}/Admin`} className="btn btn-info mx-2" title="View">
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-danger" title="Delete"
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

export default AdminProductList;
