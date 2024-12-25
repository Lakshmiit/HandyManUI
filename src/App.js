import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importing necessary components
import Header from './Header';
import UploadForm from './uploadform';
import ProductView from './ProductView'; 
import EditUploadForm from './EditUploadForm';
import ProductList from './ProductList';
import RaiseTicket from './RaiseTicket';
import BuyProduct from './BuyProducts';
import Sidebar from './Sidebar';
import BuyProductView from './BuyProductView';
import AdminProductApproval from './AdminProductApproval.js';
import AdminProductList from './AdminProductList.js';
import AdminUpdateProduct from './AdminUpdateProduct.js';
import AdminUploadForm from './AdminUploadForm.js';
import AdminSidebar from './AdminSidebar';
import AdminNotifications from './AdminNotifications.js';
import RaiseTicketActionView from './RaiseTicketActionView.js';
import AdminRaiseaQuote from './AdminRaiseaQuote.js';
import RaiseTicketNotifications from './RaiseTicketNotifications.js';
import AddTechnician from './AddTechnician.js';
import TechnicianQuoteNotifications from './TechnicianQuoteNotifications.js';
import ViewRaiseQuoteTech from './ViewRaiseQuoteTech.js';
import RaiseTicketQuotation from './RaiseTicketQuotation';
import QuoteNotifications from './QuoteNotifications';
import NotificationTechnician from './NotificationTechnician.js';
import CustomerNotification from './CustomerNotification.js';
import ViewCustomerGrid from './ViewCustomerGrid.js';

function App() {
  return (
    <Router>     
      <div className="App">
        {/* Header Component */}
        <Header />

        {/* Main content */}
        <main className="container py-3 mt_100px">
          <Routes>
            <Route path="/product/:ProductOwnedBy/:userType" element={<UploadForm />} />
            {/* Dynamic product ID route for ProductView */}
            <Route path="/product-view/:id/:ProductOwnedBy/:userType" element={<ProductView />} /> 
            <Route path="/product-list/:ProductOwnedBy/:userType" element={<ProductList />} />
            <Route path="/product-edit/:id/:ProductOwnedBy/:userType" element={<EditUploadForm />} />           
            <Route path="/RaiseTicket/:customerId/:userType" element={<RaiseTicket />} />
            <Route path="/buyProducts/:userId/:userType" element={<BuyProduct />} />
            <Route path="/sidebar/:userType" element={<Sidebar />} />
            <Route path="/buyproduct-view/:id/:userId/:userType" element={<BuyProductView />} />
            <Route path="/adminUploadForm/Admin" element={<AdminUploadForm />} />
            <Route path="/adminProductApproval/:id/Admin" element={<AdminProductApproval />} />
            <Route path="/adminProductList/Admin" element={<AdminProductList />} />
            <Route path="/adminUpdateProduct/:id/Admin" element={<AdminUpdateProduct />} /> 
            <Route path="/adminSidebar" element={<AdminSidebar />} />
            <Route path="/adminNotifications" element={<AdminNotifications />} />
            <Route path="/raiseTicketActionView/:raiseTicketId" element={<RaiseTicketActionView />} />
            <Route path="/adminRaiseQuote" element={<AdminRaiseaQuote />} />
            <Route path="/raiseTicketNotification" element={<RaiseTicketNotifications />} />
            <Route path="/addTechnician/:userType" element={<AddTechnician />} />
            <Route path="/technicianQuoteNotification/:userType" element={<TechnicianQuoteNotifications />} />
            <Route path="/viewRaiseQuote/:raiseTicketId/:userType" element={<ViewRaiseQuoteTech />} />
            <Route path="/raiseTicketQuotation" element={<RaiseTicketQuotation />} />
            <Route path="/quoteNotification" element={<QuoteNotifications />} />
            <Route path="/notificationTechnician/:userType" element={<NotificationTechnician />} />
            <Route path="/customerNotification/:userType" element={<CustomerNotification />} />
            <Route path="/viewCustomer/:userType" element={<ViewCustomerGrid />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
