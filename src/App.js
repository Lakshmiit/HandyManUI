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
import ViewDetailsRaiseQuote from './ViewDetailsRaiseQuote.js';
import RaiseTicketQuotation from './RaiseTicketQuotation';
import RaiseTicketBuyProducts from './RaiseTicketBuyProducts.js';
import QuoteNotifications from './QuoteNotifications';
import NotificationTechnician from './NotificationTechnician.js';
import CustomerNotification from './CustomerNotification.js';
import ViewCustomerGrid from './ViewCustomerGrid.js';
import ShortAdminNotifications from './ShortAdminNotifications.js';
import ViewDealerRaiseTicket from './ViewDealerRaiseTicket.js';
import ViewDealerDetailsRaiseTicket from './ViewDealerDetailsRaiseTicket.js'; 
import CustomerRaiseTicketQuotation from './CustomerRaiseTicketQuotation.js';
import DealerNotifications from './DealerNotifications.js';
import DealerNotificationsGrid from './DealerNotificationsGrid.js';
import DealerGrid from './DealerGrid.js';
import BidderTicketQuotation from './BidderTicketQuotation.js';
import TimeSlotBooking from './TimeSlotBooking.js';
import BookingConfirmation from './BookingConfirmation.js';
import PaymentConfirmation from './PaymentConfirmation.js';
import TicketConfirmation from './TicketConfirmation.js';
import TraderConfirmation from './TraderConfirmation.js';
import RaiseOrdersGrid from './RaiseOrdersGrid.js';
import CustomerCareConfirmation from './CustomerCareConfirmation.js';
import CustomerRaiseTicketTrack from './CustomerRaiseTicketTrack.js';
import TrackStatusNotifications from './TrackStatusNotifications.js';
import TrackStatusGrid from './TrackStatusGrid.js';
import TicketConfirmationGrid from './TicketConfirmationGrid.js';
import TraderConfirmationGrid from './TraderConfirmationGrid.js';


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
            <Route path="/technicianQuoteNotification/:userType/:category/:district/:technicianId" element={<TechnicianQuoteNotifications />} />
            <Route path="/viewRaiseQuote/:raiseTicketId/:category/:userType/:technicianId" element={<ViewRaiseQuoteTech />} />
            <Route path="/viewDetailsRaiseQuote/:raiseTicketId/:category/:userType/:technicianId" element={<ViewDetailsRaiseQuote />} />
            <Route path="/raiseTicketQuotation/:raiseTicketId" element={<RaiseTicketQuotation />} />
            <Route path="/raiseTicketBuyProducts/:raiseTicketId" element={<RaiseTicketBuyProducts />} /> 
            <Route path="/quoteNotification" element={<QuoteNotifications />} />
            <Route path="/notificationTechnician/:userType/:category/:district/:technicianId" element={<NotificationTechnician />} />
            <Route path="/customerNotification/:userType/:customerId" element={<CustomerNotification />} />
            <Route path="/viewCustomer/:userType/:customerId" element={<ViewCustomerGrid />} />
            <Route path="/ShortAdminNotifications" element={<ShortAdminNotifications />} />
            <Route path="/customerRaiseTicketQuotation/:userType/:raiseTicketId" element={<CustomerRaiseTicketQuotation />} />
            <Route path="/dealerNotifications/:userType/:category/:district/:dealerId" element={<DealerNotifications />} /> 
            <Route path="/dealerNotificationsGrid/:userType/:category/:district/:dealerId" element={<DealerNotificationsGrid />} />
            <Route path="/viewDealerRaiseTicket/:raiseTicketId/:userType/:category/:dealerId" element={<ViewDealerRaiseTicket />} />
            <Route path="/viewDealerDetailsRaiseTicket/:raiseTicketId/:userType/:category/:dealerId" element={<ViewDealerDetailsRaiseTicket />} />
            <Route path="/dealerGrid" element={<DealerGrid /> } />
            <Route path="/bidderTicketQuotation/:raiseTicketId" element={<BidderTicketQuotation /> } />
            <Route path="/timeSlotBooking/:raiseTicketId/:userType" element={<TimeSlotBooking />} />
            <Route path="/bookingConfirmation/:raiseTicketId/:userType" element={<BookingConfirmation />} />
            <Route path="/paymentConfirmation/:raiseTicketId/:userType" element={<PaymentConfirmation />} />
            <Route path="/ticketConfirmation/:raiseTicketId/:district/:userType/:technicianId" element={<TicketConfirmation />} />
            <Route path="/traderConfirmation/:raiseTicketId/:district/:userType/:dealerId" element={<TraderConfirmation />} />
            <Route path="/raiseOrders/:userType" element={<RaiseOrdersGrid />} />
            <Route path="/customerCareConfirmation/:raiseTicketId" element={<CustomerCareConfirmation />} />
            <Route path="/customerTrack/:raiseTicketId/:userType" element={<CustomerRaiseTicketTrack />} />
            <Route path="/trackStatusNotifications/:userType" element={<TrackStatusNotifications />} />
            <Route path="/ticketConfirmationGrid/:userType/:district/:technicianId" element={<TicketConfirmationGrid />} />
            <Route path="/traderConfirmationGrid/:userType/:district/:dealerId" element={<TraderConfirmationGrid />} />

            <Route path="/trackStatus/:userType" element={<TrackStatusGrid />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
 