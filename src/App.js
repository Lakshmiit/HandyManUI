import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';

// Importing necessary components
// import Header from './Header';
// import Footer from './Footer.js';
import UploadForm from './uploadform';
import ProductView from './ProductView'; 
import EditUploadForm from './EditUploadForm';
import ProductList from './ProductList';
import RaiseTicket from './RaiseTicket';
import BuyProducts from './BuyProducts';
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
// import TermsandConditions from './TermsandConditions.js';
import CustomerCareGrid from './CustomerCareGrid.js';
import BookTechnician from './BookTechnician.js';
import BookTechnicianActionView from './BookTechnicianActionView.js';
import UploadBookTechnician from './UploadBookTechnician.js';
import BookTechnicianList from './BookTechnicianList.js';
import BookTechnicianPaymentPage from './BookTechnicianPaymentPage.js';
import UpdateBookTechnician from './UpdateBookTechnician.js';
import BookTechnicianNotificationGrid from './BookTechnicianNotificationGrid.js';
import BookTechnicianCustomerGrid from './BookTechnicianCustomerGrid.js';
import CustomerBookTechnicianQuotation from './CustomerBookTechnicianQuotation.js';
import BooKTechnicianAdminGridView from './BooKTechnicianAdminGridView.js';
import CustomerBookTechnicianQuotationView from './CustomerBookTechnicianQuotationView.js';
import BuyProductPaymentPage from './BuyProductPaymentPage.js';
import AdminBuyProductOrders from './AdminBuyProductOrders.js';
import AdminBuyProductOrderGridView from './AdminBuyProductOrderGridView..js';

import BuyProductNotificationGrid from './BuyProductNotificationGrid.js';
import CustomerOrdersNotifications from './CustomerOrdersNotifications.js';
import ViewCustomerBuyProductOrders from './ViewCustomerBuyProductsOrders.js';
import CustomerBuyProductOrdersGrid from './CustomerBuyproductsOrdersGrid.js';
import ViewCustomerBuyProductOrdersGrid from './ViewCustomerBuyProductOrdersGrid.js';
import AdminClosedBuyProductOrders from './AdminClosedBuyProductsOrders.js';
import BuyProductClosedOrdersGrid from './BuyProductClosedOrdersGrid.js';
import AdminClosedOrdersFinalGridView from './AdminClosedOrdersFinalGridView.js';
import BuyProductsCustomerCart from './BuyProductsCustomerCart.js';
import ProfilePage from './ProfilePage.js';
import PaymentPage from './PaymentPage';
// import TechnicianViewBookTechnician from './TechnicianViewBookTechnician.js';
// import BuyProductCartView from './BuyProductCartView.js';

const PreventBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate(1); // Moves user forward, preventing back navigation
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return null;
};

function App() {

    useEffect(() => {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }, []);
  
  return (
    <Router>   
       <PreventBackNavigation />   
      <div className="App"> 
        {/* Header Component */}
        {/* <Header /> */}
        {/* Main content */}
        <main 
        className="py-3 mt-mob-50">
          <Routes>
            <Route path="/profilePage/:userType/:userId" element={<ProfilePage />} />
            <Route path="/product/:ProductOwnedBy" element={<UploadForm />} />
            {/* Dynamic product ID route for ProductView */}
            <Route path="/product-view/:id/:ProductOwnedBy" element={<ProductView />} /> 
            <Route path="/product-list/:ProductOwnedBy" element={<ProductList />} />
            <Route path="/product-edit/:id/:ProductOwnedBy" element={<EditUploadForm />} />           
            <Route path="/raiseTicket/:userType/:userId" element={<RaiseTicket />} />
            <Route path="/buyProducts/:userType/:userId" element={<BuyProducts />} />
            <Route path="/sidebar/:userType" element={<Sidebar />} />
            <Route path="/buyproduct-view/:userType/:userId/:id" element={<BuyProductView />} />
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
            <Route path="/notificationTechnician/:userType/:category/:district/:userId" element={<NotificationTechnician />} />
            <Route path="/customerNotification/:userType/:userId" element={<CustomerNotification />} />
            <Route path="/viewCustomer/:userType/:customerId" element={<ViewCustomerGrid />} />
            <Route path="/ShortAdminNotifications" element={<ShortAdminNotifications />} />
            <Route path="/customerRaiseTicketQuotation/:userType/:raiseTicketId" element={<CustomerRaiseTicketQuotation />} />
            <Route path="/dealerNotifications/:userType/:category/:district/:userId" element={<DealerNotifications />} /> 
            <Route path="/dealerNotificationsGrid/:userType/:category/:district/:dealerId" element={<DealerNotificationsGrid />} />
            <Route path="/viewDealerRaiseTicket/:raiseTicketId/:userType/:category/:dealerId" element={<ViewDealerRaiseTicket />} />
            <Route path="/viewDealerDetailsRaiseTicket/:raiseTicketId/:userType/:category/:dealerId" element={<ViewDealerDetailsRaiseTicket />} />
            <Route path="/dealerGrid" element={<DealerGrid /> } />
            <Route path="/bidderTicketQuotation/:raiseTicketId" element={<BidderTicketQuotation /> } />
            <Route path="/timeSlotBooking/:userType/:userId/:raiseTicketId" element={<TimeSlotBooking />} />
            <Route path="/bookingConfirmation/:userType/:userId/:raiseTicketId" element={<BookingConfirmation />} />
            <Route path="/paymentConfirmation/:userType/:userId/:raiseTicketId" element={<PaymentConfirmation />} />
            <Route path="/ticketConfirmation/:raiseTicketId/:district/:userType/:technicianId" element={<TicketConfirmation />} />
            <Route path="/traderConfirmation/:raiseTicketId/:district/:userType/:dealerId" element={<TraderConfirmation />} />
            <Route path="/raiseOrders/:userType" element={<RaiseOrdersGrid />} />
            <Route path="/customerCareConfirmation/:raiseTicketId" element={<CustomerCareConfirmation />} />
            <Route path="/customerTrackConfirmation/:userType/:userId/:raiseTicketId" element={<CustomerRaiseTicketTrack />} />
            <Route path="/trackStatusNotifications/:userType/:userId" element={<TrackStatusNotifications />} />
            <Route path="/ticketConfirmationGrid/:userType/:district/:technicianId" element={<TicketConfirmationGrid />} />
            <Route path="/traderConfirmationGrid/:userType/:district/:dealerId" element={<TraderConfirmationGrid />} />
            {/* <Route path="/termsandConditions" element={<TermsandConditions />} />*/}
            <Route path="/customerCareGrid" element={<CustomerCareGrid />} /> 
            <Route path="/trackStatus/:userType" element={<TrackStatusGrid />} />
            <Route path="/bookTechnician/:userType/:userId" element={<BookTechnician />} />
            <Route path="/bookTechnicianActionView/:raiseTicketId" element={<BookTechnicianActionView />} />
            <Route path="/uploadBookTechnician" element={<UploadBookTechnician />} />
            <Route path="/bookTechnicianList" element={<BookTechnicianList />} />
            <Route path="/bookTechnicianPaymentPage/:userType/:userId/:raiseTicketId" element={<BookTechnicianPaymentPage />} />
            <Route path="/updateBookTechnician/:id" element={<UpdateBookTechnician />} />
            <Route path="/bookTechnicianNotificationGrid" element={<BookTechnicianNotificationGrid />} />
            <Route path="/bookTechnicianCustomerGrid/:userType/:customerId" element={<BookTechnicianCustomerGrid />} />
            <Route path="/customerBookTechnicianQuotation/:userType/:userId/:raiseTicketId" element={<CustomerBookTechnicianQuotation />} />
            <Route path="/bookTechnicianAdminView/:raiseTicketId" element={<BooKTechnicianAdminGridView />} /> 
            <Route path="/customerBookTechnicianQuotationView/:userType/:raiseTicketId" element={<CustomerBookTechnicianQuotationView />} />
            <Route path='/buyProductPaymentPage/:userType/:userId/:buyProductId' element={<BuyProductPaymentPage />} />
            <Route path='/adminBuyProductOrders/:buyProductId' element={<AdminBuyProductOrders />} />
            <Route path='/adminBuyProductOrderGridView/:buyProductId' element={<AdminBuyProductOrderGridView />} />
            <Route path='/buyProductNotificationGrid' element={<BuyProductNotificationGrid />} />
            <Route path='/customerOrders/:customerId/:userType' element={<CustomerOrdersNotifications />} />
            <Route path='/viewCustomerBuyProductOrders/:buyProductId/:userType' element={<ViewCustomerBuyProductOrders />} />
            <Route path='/viewCustomerBuyProductOrdersGrid/:buyProductId/:userType' element={<ViewCustomerBuyProductOrdersGrid />} />
            <Route path='/adminClosedBuyProductOrders/:buyProductId' element={<AdminClosedBuyProductOrders />} />
            <Route path='/buyProductClosedOrdersGrid' element={<BuyProductClosedOrdersGrid />} />
            <Route path='/adminClosedOrdersFinalGridView/:buyProductId' element={<AdminClosedOrdersFinalGridView />} />
            <Route path='/buyProductsCustomerCart/:customerId/:userType' element={<BuyProductsCustomerCart />} />
            {/* <Route path='/buyProductsCartView/:customerId/:buyProductId/:userType' element={<BuyProductCartView />} /> */}
            {/* <Route path='/technicianViewBookTechnician/:userType/:raiseTicketId' element={<TechnicianViewBookTechnician />} />  */}
            
            <Route path='/customerBuyProductOrdersGrid/:customerId/:userType' element={<CustomerBuyProductOrdersGrid />} /> 
            <Route path="/payment-selection/:raiseTicketId" element={<PaymentPage />} />
            </Routes>
         
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App; 
 