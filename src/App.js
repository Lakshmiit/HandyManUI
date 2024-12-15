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
import Notifications from './Notifications.js';
import RaiseTicketActionView from './RaiseTicketActionView.js';
import RaiseaQuote from './RaiseaQuote.js';
import RaiseTicketNotifications from './RaiseTicketNotifications.js';
import AddTechnician from './AddTechnician.js';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />

        {/* Main content */}
        <main className="container py-3 mt_100px">
          <Routes>
            <Route path="/product/:productownedby/:userType" element={<UploadForm />} />
            {/* Dynamic product ID route for ProductView */}
            <Route path="/product-view/:id/:productownedby/:userType" element={<ProductView />} /> 
            <Route path="/product-list/:productownedby" element={<ProductList />} />
            <Route path="/product-edit/:id/:userType" element={<EditUploadForm />} />           
            <Route path="/RaiseTicket/:customerId/:userType" element={<RaiseTicket />} />
            <Route path="/buyProducts/:userType" element={<BuyProduct />} />
            <Route path="/sidebar/:userType" element={<Sidebar />} />
            <Route path="/buyproduct-view/:userType" element={<BuyProductView />} />
            <Route path="/adminProductApproval/:id" element={<AdminProductApproval />} />
            <Route path="/adminProductList" element={<AdminProductList />} />
            <Route path="/adminUpdateProduct/:id" element={<AdminUpdateProduct />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/raiseTicketActionView" element={<RaiseTicketActionView />} />
            <Route path="/raiseQuote/:userType" element={<RaiseaQuote />} />
            <Route path="/raiseTicketNotification" element={<RaiseTicketNotifications />} />
            <Route path="/addTechnician/:userType" element={<AddTechnician />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
