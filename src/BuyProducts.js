import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RouteIcon from "@mui/icons-material/Route";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";

const BuyProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Electrical items");
  const [productSize, setProductSize] = useState("");
  const [productCatalogue, setProductCatalogue] = useState("");
  const [chooseColor, setChooseColor] = useState("");
  const [otherThanProduct, setOtherThanProduct] = useState("");
  const [requiredQuality, setRequiredQuality] = useState("");
  const [units, setUnits] = useState("");
  const [productName, setProductName] = useState("");
  const [product] = useState({ id: 1 });

  const handleAddToCart = () => {
    alert("Item added to cart!");
  };

  const handleGetQuotation = () => {
    alert("Quotation requested");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
  };

  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      <div className="m-0 p-0 sde_mnu">
        <div className="_mnu_dv">
          <span>
            <DashboardIcon /> Dashboard
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <SupportAgentIcon /> Raise Ticket
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <PersonAddIcon /> Add Member
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <RouteIcon /> Track Ticket Status
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <NotificationsIcon /> Notifications
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <PaymentsIcon /> Buy Products
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <InventoryIcon /> Orders
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <ShoppingCartIcon /> Cart
          </span>
        </div>
        <div className="_mnu_dv">
          <span>
            <AccountCircle /> My Accounts
          </span>
        </div>
      </div>
      {/* Form Section */}
      <div className="container-fluid p-2">
        <h3 className="mb-4">Buy Products</h3>
        <div className="bg-white rounded-3 p-4 bx_sdw w-75">
          <form className="form" onSubmit={handleSubmit}>
            <div className="m-1">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Address</h5>
                <p className="text-dark mb-0 text-decoration-underline">Change Address</p>
              </div>
              <div className="p-3 border rounded bg-light">
                <p className="mb-1">Akshya Nagar 1st Block 1st Cross,</p>
                <p className="mb-1">Rammurthy Nagar,</p>
                <p className="mb-0">Bangalore-560016</p>
              </div>
            </div>

            <div className="form-group">
              <label>
                Category <span className="req_star">*</span>
              </label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electrical items</option>
                <option>Plumbing Materials</option>
                <option>Sanitary items</option>
                <option>Electronics appliances</option>
                <option>Paints</option>
                <option>Hardware items</option>
                <option>Civil & Waterproofing Materials</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Product Name <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
              />
            </div>

            <div className="form-group">
              <label>
                Product Catalogue <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productCatalogue}
                onChange={(e) => setProductCatalogue(e.target.value)}
                placeholder="Select Product Catalogue"
              />
            </div>

            <div className="form-group">
              <label>
                Product Size <span className="req_star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                placeholder="Select Product Size"
              />
            </div>

            <div className="form-group">
              <label>Color (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={chooseColor}
                onChange={(e) => setChooseColor(e.target.value)}
                placeholder="Enter Color"
              />
            </div>

            <button
              type="button"
              className="btn btn-warning text-white w-50 mt-2"
              onClick={() => navigate(`/product-view/${product.id}`)}
            >
              View Product
            </button>

            <div className="form-group mb-3">
              <label>Other Than Product</label>
              <input
                type="text"
                className="form-control"
                value={otherThanProduct}
                onChange={(e) => setOtherThanProduct(e.target.value)}
                placeholder="Enter Product Name"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>
                  Required Quality <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={requiredQuality}
                  onChange={(e) => setRequiredQuality(e.target.value)}
                  placeholder="Enter Required Quality"
                />
              </div>
              <div className="col-md-6">
                <label>
                  Units <span className="req_star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="Enter Units"
                />
              </div>
            </div>

            <div className="d-flex gap-5 mt-3">
              <button
                type="button"
                className="text-white btn btn-warning w-50"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="text-white btn btn-warning w-50"
                onClick={handleGetQuotation}
              >
                Get Quotation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
