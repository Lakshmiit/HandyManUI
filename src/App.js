import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';

// Importing necessary components
// import Header from './Header';
//  import Footer from './Footer.js'; 
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
import AdminBuyProductOrderGridView from './AdminBuyProductOrderGridView.js';
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
import NotificationsBell from './NotificationsBell.js'; 
// import RaiseQuoteNotificationBell from './RaiseQuoteBellNotifications.js';
import OrdersNotificationBell from './OrdersBellNotifications.js';
import TrackStatusNotificationBell from './TrackStatusBellNotifications.js';
// import WebProfilePage from './WebProfilePage.js';
import Device from './Device.js';       
import Offers from './Offers.js';
// import OffersBuyProductPage from './OffersBuyProductPage.js';
// import FirebaseMainConfig from './FirebaseMainConfig.js';
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
          <Route path="/device" element={<Device />} />
            <Route path="/profilePage/:userType/:userId" element={<ProfilePage />} />
            {/* <Route path="/webProfilePage/:userType/:userId" element={<WebProfilePage />} /> */}
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
            <Route path="/technicianQuoteNotification/:userType/:userId/:category/:district" element={<TechnicianQuoteNotifications />} />
            <Route path="/viewRaiseQuote/:userType/:userId/:category/:raiseTicketId" element={<ViewRaiseQuoteTech />} />
            <Route path="/viewDetailsRaiseQuote/:userType/:userId/:category/:raiseTicketId" element={<ViewDetailsRaiseQuote />} />
            <Route path="/raiseTicketQuotation/:raiseTicketId" element={<RaiseTicketQuotation />} />
            <Route path="/raiseTicketBuyProducts/:raiseTicketId" element={<RaiseTicketBuyProducts />} /> 
            <Route path="/quoteNotification" element={<QuoteNotifications />} />
            <Route path="/notificationTechnician/:userType/:userId/:category/:district" element={<NotificationTechnician />} />
            <Route path="/customerNotification/:userType/:userId" element={<CustomerNotification />} />
            <Route path="/viewCustomer/:userType/:userId" element={<ViewCustomerGrid />} />
            <Route path="/ShortAdminNotifications" element={<ShortAdminNotifications />} />
            <Route path="/customerRaiseTicketQuotation/:userType/:userId/:raiseTicketId" element={<CustomerRaiseTicketQuotation />} />
            <Route path="/dealerNotifications/:userType/:userId/:category/:district" element={<DealerNotifications />} /> 
            <Route path="/dealerNotificationsGrid/:userType/:userId/:category/:district" element={<DealerNotificationsGrid />} />
            <Route path="/viewDealerRaiseTicket/:userType/:userId/:category/:raiseTicketId" element={<ViewDealerRaiseTicket />} />
            <Route path="/viewDealerDetailsRaiseTicket/:userType/:userId/:category/:raiseTicketId" element={<ViewDealerDetailsRaiseTicket />} />
            <Route path="/dealerGrid" element={<DealerGrid /> } />
            <Route path="/bidderTicketQuotation/:raiseTicketId" element={<BidderTicketQuotation /> } />
            <Route path="/timeSlotBooking/:userType/:userId/:raiseTicketId" element={<TimeSlotBooking />} />
            <Route path="/bookingConfirmation/:userType/:userId/:raiseTicketId" element={<BookingConfirmation />} />
            <Route path="/paymentConfirmation/:userType/:userId/:raiseTicketId" element={<PaymentConfirmation />} />
            <Route path="/ticketConfirmation/:userType/:userId/:district/:raiseTicketId" element={<TicketConfirmation />} />
            <Route path="/traderConfirmation/:userType/:userId/:district/:raiseTicketId" element={<TraderConfirmation />} />
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
            <Route path="/bookTechnicianCustomerGrid/:userType/:userId" element={<BookTechnicianCustomerGrid />} />
            <Route path="/customerBookTechnicianQuotation/:userType/:userId/:raiseTicketId" element={<CustomerBookTechnicianQuotation />} />
            <Route path="/bookTechnicianAdminView/:raiseTicketId" element={<BooKTechnicianAdminGridView />} /> 
            <Route path="/customerBookTechnicianQuotationView/:userType/:userId/:raiseTicketId" element={<CustomerBookTechnicianQuotationView />} />
            <Route path='/buyProductPaymentPage/:userType/:userId/:buyProductId' element={<BuyProductPaymentPage />} />
            <Route path='/adminBuyProductOrders/:buyProductId' element={<AdminBuyProductOrders />} />
            <Route path='/adminBuyProductOrderGridView/:buyProductId' element={<AdminBuyProductOrderGridView />} />
            <Route path='/buyProductNotificationGrid' element={<BuyProductNotificationGrid />} />
            <Route path='/customerOrders/:userType/:userId' element={<CustomerOrdersNotifications />} />
            <Route path='/viewCustomerBuyProductOrders/:userType/:userId/:buyProductId' element={<ViewCustomerBuyProductOrders />} />
            <Route path='/viewCustomerBuyProductOrdersGrid/:userType/:userId/:buyProductId' element={<ViewCustomerBuyProductOrdersGrid />} />
            <Route path='/adminClosedBuyProductOrders/:buyProductId' element={<AdminClosedBuyProductOrders />} />
            <Route path='/buyProductClosedOrdersGrid' element={<BuyProductClosedOrdersGrid />} />
            <Route path='/adminClosedOrdersFinalGridView/:buyProductId' element={<AdminClosedOrdersFinalGridView />} />
            <Route path='/buyProductsCustomerCart/:customerId/:userType' element={<BuyProductsCustomerCart />} />
            {/* <Route path='/buyProductsCartView/:customerId/:buyProductId/:userType' element={<BuyProductCartView />} /> */}
            {/* <Route path='/technicianViewBookTechnician/:userType/:raiseTicketId' element={<TechnicianViewBookTechnician />} />  */}
            <Route path='/customerBuyProductOrdersGrid/:userType/:userId' element={<CustomerBuyProductOrdersGrid />} /> 
            <Route path="/payment-selection/:raiseTicketId" element={<PaymentPage />} />
            <Route path="/notificationsbell/:userId" element={<NotificationsBell />} />
            <Route path="/ordersNotificationsbell/:userId" element={<OrdersNotificationBell />} />
            <Route path="/trackStatusNotificationsbell/:userId" element={<TrackStatusNotificationBell />} />
            <Route path="/offers/:userType/:userId" element={<Offers />} />
            {/* <Route path="/offersBuyProduct/:userType/:id" element={<OffersBuyProductPage />} /> */}
            {/* <Route path="/raiseQuoteNotificationsBell/:userId" element={<RaiseQuoteNotificationBell />} /> */}
            </Routes>
         
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App; 
 