import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importing necessary components
import Header from './Header';

import UploadForm from './uploadform';
import ProductView from './ProductView';  // Add ProductView component
import EditUploadForm from './EditUploadForm';
import ProductList from './ProductList';
import RaiseTicket from './RaiseTicket';
import BuyProduct from './BuyProducts';
import Sidebar from './Sidebar';
import BuyProductView from './BuyProductView';
import AdminProductApproval from './AdminProductApproval.js';
import AdminProductList from './AdminProductList.js';
import AdminUpdateProduct from './AdminUpdateProduct.js';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />

        {/* Main content */}
        <main className="container py-3 mt_100px">
          <Routes>
            <Route path="/product/:productownedby" element={<UploadForm />} />
            {/* Dynamic product ID route for ProductView */}
            <Route path="/product-view/:id/:productownedby" element={<ProductView />} /> 
            <Route path="/product-list/:productownedby" element={<ProductList />} />
            <Route path="/product-edit/:id" element={<EditUploadForm />} />           
            <Route path="/RaiseTicket/:customerId" element={<RaiseTicket />} />
            <Route path="/buyProducts" element={<BuyProduct />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/buyproduct-view" element={<BuyProductView />} />
            <Route path="/adminProductApproval/:id" element={<AdminProductApproval />} />
            <Route path="/adminProductList" element={<AdminProductList />} />
            <Route path="/adminUpdateProduct/:id" element={<AdminUpdateProduct />} />
          
          </Routes>
        </main>

      
      </div>
    </Router>
  );
}

export default App;
