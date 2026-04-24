// import React, { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap'; // Import Bootstrap components for modal
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
// import "./App.css";
// import Sidebar from './Sidebar';
// import Header from './Header.js';
// import Footer from './Footer.js';
// import { useParams, useNavigate} from 'react-router-dom';

// const CustomerRaiseTicketGridView = () => {
//  const Navigate = useNavigate();
//  const {userType} = useParams();
//  const {userId} = useParams();
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const { raiseTicketId } = useParams();
//   const [ticketData, setTicketData] = useState([]);
//   const [subject, setSubject] = useState('');
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [zipCode, setZipcode]=useState('');
//   const [id, setId] = useState('');
//   const [address, setAddress] = useState('');
//   const [isMaterialType, setIsWithMaterial] = useState('');
//   const [commentsList, setCommentsList] = useState([{updatedDate: new Date(), commentText: ""}]);
//   const [loading, setLoading] = useState(true);
//   const [specifications, setSpecifications] = useState([{ material: "", quantity: "", price: "", total: "" }]);
//   const [requestType, setRequestType] = useState('');
//   const [customerId, setCustomerId] = useState(''); 
//   const [status, setStatus] = useState(''); 
//   const [technicianId, setTechnicianId] = useState(""); 
//   const [serviceCharges, setServiceCharge] = useState("");
//   const [gst, setGST] = useState(""); 
//   const [fixedQuote, setFixedQuote] = useState('');
//   const [fixedDiscount, setFixedDiscount] = useState('');
//   const [fixedOtherCharge, setFixedOtherCharge] = useState('');
//   const [fixedServiceCharge, setFixedServiceCharge] = useState('');
//   const [fixedGST, setFixedGST] = useState('');
//   const [lowestBidder, setLowestBidder] = useState("");
//   const [totalAmount, setTotalAmount] = useState('');
//   const [othercharges, setOtherCharge] = useState("");
//   const [assignedTo, setAssignedTo] = useState('');
//   const [category, setCategory] = useState("");
//   const [technicianDetails, setTechnicianDetails] = useState([]);
//   const [techRemarks, setRemarks] = useState([]);
//   const [addrRmarks, setAddrRmarks] = useState([{requestedDate: new Date(), remarks: ""}]);
//   const [raiseAQuoteId, setRaiseAQuoteId] = useState('');
//   const [enterQuoteAmount, setQuote] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [details, setDetails] = useState('');
//   const [isMaterialApproved, setIsMaterialApproved] = useState(true);
//   const [isAgencyApproved, setIsAgencyApproved] = useState(true);
//   const [materialQuotation, setMaterialQuotation] = useState([{discounts: "", fixedDiscounts: "", deliveryCharges: "", fixedDeliveryCharges: "", serviceCharges: "", fixedServiceCharges: "", gsts: "", fixedGSTS: "", grandtotal: ""}]);
//   const [lowestGrandTotal, setLowestGrandTotal] = useState('');
//   const [dealerDetails, setDealerDetails] = useState([]);
//   const [lowestDealerBidder, setLowestDealerBidder] = useState("");
//   const [dealerId, setDealerId] = useState("");
//   const [fullName, setFullName] = useState('');
//   const [technicianList, setTechnicianList] = useState([]);
//   const [dealerList, setDealerList] = useState([]);
//   const [materialTotal, setMaterialTotal] = useState('');
//   const [rateQuotedBy, setRateQuotedBy] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

//   useEffect(() => {
//     console.log(category, materialTotal, state, district, zipCode, address, isMaterialType, commentsList, assignedTo, details, fullName, technicianList, dealerList, rateQuotedBy, customerEmail, customerPhoneNumber, customerId, loading, subject,status, id, fixedQuote, enterQuoteAmount, materialQuotation, raiseAQuoteId);
//   }, [category, loading, materialTotal , state, district, zipCode, address, isMaterialType, commentsList, assignedTo, details, fullName, technicianList, dealerList, rateQuotedBy, customerEmail, customerPhoneNumber, customerId, subject,status, id, fixedQuote, enterQuoteAmount, materialQuotation, raiseAQuoteId]);

//   useEffect(() => {
//     const fetchticketData = async () => {
//       try {
//         const response = await fetch(`https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch ticket data');
//         }
//         const data = await response.json();
//         setTicketData(data);
//         setId(data.id);
//         setStatus(data.status);
//         setDetails(data.details);
//         setState(data.state);
//         setAddress(data.address);
//         setDistrict(data.district);
//         setZipcode(data.zipCode);
//         setSubject(data.subject);
//         setCategory(data.category);
//         setRateQuotedBy(data.rateQuotedBy);
//         setCustomerId(data.customerId);
//         setCustomerEmail(data.customerEmail);
//         setCustomerPhoneNumber(data.customerPhoneNumber);
//         setAssignedTo(data.assignedTo);
//         setTechnicianList(data.technicianList || []);
//         setDealerList(data.dealerList || []);
//         setIsWithMaterial(data.isMaterialType);
//         setFullName(data.customerName);
//         setRequestType(data.requestType || 'Without Material');
//         setCommentsList(data.comments || [{ updatedDate: new Date(), commentText: ""}]);
//       } catch (error) {
//         console.error('Error fetching ticket data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchticketData();
//   }, [raiseTicketId]);

//     // Fetch data from API on component mount
//     useEffect(() => {
//       const apiUrl = `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/RaiseAQuote/GetRaiseAQuoteDetailsByid?raiseAQuotetId=${raiseTicketId}`;
//       // Fetching the data from the API
//       const fetchData = async () => {
//         try {
//           const response = await fetch(apiUrl);
//           const data = await response.json();
//           setTechnicianDetails(data);     
//           setQuote(data.enterQuoteAmount);
//           setFixedQuote(data.fixedQuote);
//           setDiscount(data.discount);
//           setFixedDiscount(data.fixedDiscount);
//           setId(data.id);
//           setGST(data.gst);
//           setFixedGST(data.fixedGST);
//           setTotalAmount(data.totalAmount);
//           setOtherCharge(data.othercharges);
//           setServiceCharge(data.serviceCharges);
//           setFixedServiceCharge(data.fixedServiceCharge);
//           setFixedOtherCharge(data.fixedOtherCharge);         
//           setRaiseAQuoteId(data.raiseAQuoteId);
//           setMaterialQuotation(data.materialQuotation || [{discount: "", fixedDiscount: "", deliverycharges: "", fixedDeliveryChargs: "", servicecharges: "", fixedServiceCharges: "", gst: "", fixedGST: "", grandtotal: ""}]);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
//       fetchData();
//     }, [raiseTicketId]); 

//       useEffect(() => {
//         if (technicianDetails.length > 0) {
//           const lowest = technicianDetails.reduce((prev, current) => {
//             const prevAmount = parseFloat(prev.totalAmount);
//             const currentAmount = parseFloat(current.totalAmount);
//             return currentAmount < prevAmount ? current : prev;
//           });
//           setTechnicianId(lowest.technicianId);
//           setLowestBidder(lowest.technicianId);
//           setQuote(lowest.enterQuoteAmount);
//           setRaiseAQuoteId(lowest.raiseAQuoteId);
//           setId(lowest.id);
//           setFixedQuote(lowest.fixedQuote);
//           setDiscount(lowest.discount);
//           setFixedDiscount(lowest.fixedDiscount);
//           setGST(lowest.gst);
//           setFixedGST(lowest.fixedGST);
//           setOtherCharge(lowest.othercharges);
//           setFixedOtherCharge(lowest.fixedOtherCharge);
//           setServiceCharge(lowest.serviceCharges);
//           setFixedServiceCharge(lowest.fixedServiceCharge);
//           setTotalAmount(lowest.totalAmount); 
//           setMaterialQuotation(lowest.materialQuotation);
//           if (lowest.addRemarks?.length > 0) {
//             setRemarks(lowest.addRemarks[0].remarks);
//           } else {
//             setRemarks("");
//           }
//         } else {
//           setTechnicianId('');
//           setLowestBidder('');
//           setTotalAmount(0);
//         }
//       }, [technicianDetails, discount, fixedDiscount, othercharges, fixedOtherCharge, serviceCharges,fixedServiceCharge, gst, fixedGST]);


//       useEffect(() => {
//         const fetchDealerData = async () => {
//           try {
//             const response = await fetch(`https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/RaiseAQuoteByDealer/GetRaiseAQuoteLowestDealerByid?raiseAQuotetDealerId=${raiseTicketId}`);
//             if (!response.ok) {
//               throw new Error('Failed to fetch ticket data');
//             }
//             const dataDealer = await  response.json();
            
//             setDealerDetails(dataDealer);
//             setDealerId(dataDealer.dealerId);
//             setAddrRmarks(dataDealer[0].addrRmarks || []);
//             setMaterialTotal(dataDealer[0].totalAmount);
//            setMaterialQuotation(dataDealer[0]?.materialQuotation || []);
//           } catch (error) {
//             console.error('Error fetching dealer data:', error);
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchDealerData();
//       }, [raiseTicketId]);

//       useEffect(() => {
//         if (dealerDetails.length > 0) {
//           const lowest = dealerDetails.reduce((prev, current) => {
//             const prevAmount = parseFloat(prev.materialQuotation[0].grandtotal);
//             const currentAmount = parseFloat(current.materialQuotation[0].grandtotal);
//             return currentAmount < prevAmount ? current : prev;
//           });
//           setLowestDealerBidder(lowest.dealerId);
//           setDealerId(lowest.dealerId);
//           setMaterialTotal(lowest.totalAmount);
//           setLowestGrandTotal(lowest.materialQuotation[0].grandtotal);
//           setSpecifications(lowest.materials);
//           setId(lowest.id);
//           setDealerId(lowest.dealerId);
//            if (lowest.addrRmarks?.length > 0) {
//             setAddrRmarks(lowest.addrRmarks[0].remarks);
//           } else {
//             setAddrRmarks("");
//           }
//         } else {
//           setId('');
//           setDealerId('');
//           setLowestDealerBidder('');
//           setMaterialQuotation('');
//           setAddrRmarks('');
//         }
//       }, [dealerDetails]);        

//   // Detect screen size for responsiveness
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize(); 
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const materialCharge = parseFloat(lowestGrandTotal || 0);
//   const technicalAmount = parseFloat(Number(totalAmount || 0).toFixed(2));
//   const total = materialCharge + technicalAmount;

//   const approvedAcceptanceTotal = (() => {
//     if (isMaterialApproved && isAgencyApproved) {
//       return total;
//     } else if (isAgencyApproved) {
      
//       return technicalAmount;
//     } else if (isMaterialApproved) {
      
//       return materialCharge;
//     } else {
//       return 0;
//     }
//   })();
//  const isCustomerCare = dealerId === "customerCare";
//   return (
//     <div>
//   {isMobile && <Header />}
//     <div className="d-flex">
//       {!isMobile && (
//         <div className=" ml-0 p-0 sde_mnu">
//           <Sidebar />
//         </div>
//       )}

//       {isMobile && (
//         <div className="floating-menu">
//           <Button
//             variant="primary"
//             className="rounded-circle shadow"
//             onClick={() => setShowMenu(!showMenu)}
//           >
//             <MoreVertIcon />
//           </Button>

//           {showMenu && (
//             <div className="sidebar-container">
//               <Sidebar /> 
//             </div>
//           )}
//         </div>
//       )}

//       <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
//       <h1 className="text-center mb-2">Raise a Ticket Quotation(Customer)</h1>

//       {/* Ticket Form */}
//       <Form 
//     >
//       <div className="ticket-info">
//         <p><strong>Ticket ID: </strong> {ticketData.raiseTicketId}</p>
//         <p><strong>Subject: </strong> {subject}</p>
//         <p><strong>Category: </strong> {category}</p>
//       </div>

//       <div className="radio m-1">
//         <label className="m-1">
//           <input 
//           className='form-check-input m-2 border-dark'
//           type='radio'
//           name="RequestType"
//           value="With Material"
//           checked={requestType === "With Material"}
//           required
//           />
//           With Material
//           </label>

//           <label className="m-1">
//           <input 
//           className='form-check-input  m-2 border-dark'
//           type='radio'
//           name="RequestType"
//           value="Without Material"
//           checked={requestType === "Without Material"}
//           required
//           />
//           Without Material
//           </label>

//         {/* Material Input Fields */}
//         {requestType === "With Material" && (
//         <>
// <div className='form-group'>
//   <p><strong>Required Material</strong></p>
//   {!isMobile ? (
//     <div>
//       <div className='d-flex gap-3 mb-2 text-center'>
//         {['Material', 'Quantity', 'Price', 'Total'].map((label, idx) => (
//           <div key={idx} style={{flex:4}}>
//             <label className='fw-bold'>{label}</label>
//           </div>
//         ))}
//       </div>
//       {specifications.map((spec, index) => (
//         <div className='d-flex gap-3 mb-2' key={index}>
//           {['material', 'quantity', 'price', 'total'].map((field, i) => (
//             <input
//             key={i}
//             type={field === 'price' || field === 'total' ? 'number' : 'text'}
//             className='form-control text-end'
//             value={spec[field] || ''}
//             readOnly
//             />
//           ))}
//           </div>
//       ))}
//       </div>
//   ) : (
//     <div className='mobile-view'>
//       {specifications.map((spec, index) => (
//         <div key={index} className='card w-100 border p-2 mb-2'>
//           {Object.entries(spec).map(([key, value]) => (
//            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}: </strong>{value}</p> 
//           ))}
//           </div>
//       ))}
//       </div>
//   )}
// </div>

// <p><strong>{isCustomerCare ? "Customer Care Quotation" : "Trader Quotation"}</strong></p>
//   <>
//   {!isMobile ? (
//     <table className="table table-bordered">
//       <thead>
//         <tr>
//           {[isCustomerCare ? "Customer Care ID" : "Trader ID", 'Total', 'Discount', 'Delivery Charges', 'Service Charges', 'GST', 'Grand Total', 'Lowest Bidder'].map((header, idx) => (
//             <th key={idx}>{header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {dealerDetails.map((dealer, index) => (
//           <tr key={index} className="text-end">
//             {[
//               dealer.dealerId,
//               dealer.totalAmount,
//               Number(dealer.materialQuotation[0].fixedDiscount).toFixed(2),
//               dealer.materialQuotation[0].fixedDeliveryChargs,
//               Number(dealer.materialQuotation[0].fixedServicecharges).toFixed(2),
//               Number(dealer.materialQuotation[0].fixedGST).toFixed(2),
//               Number(dealer.materialQuotation[0].grandtotal).toFixed(2),
//               dealer.dealerId === lowestDealerBidder ? 'Yes' : 'No'
//             ].map((value, i) => (
//               <td key={i}>{value}</td>
//             ))}
//           </tr>
//         ))}
//         <tr>
//     <td colSpan="3">
//             <input
//             type="text"
//             className='form-control text-end'
//             value= {dealerId}
//             readOnly
//             placeholder='Lowest Bidder Trader ID'
//             /> 
//         </td>
//         <td className="m-4">Quotation Amount</td>
//         <td colspan="4">
//             <input
//             type="number"
//             className="form-control text-end"
//             value={Number(lowestGrandTotal).toFixed(2)}
//             readOnly
//             placeholder="Quotation Amount"
//             /> 
//         </td> 
//     </tr>
//       </tbody>
//     </table>
//   ) : (
//     <div className="mobile-view">
//       {dealerDetails.map((dealer, index) => (
//         <div key={index} className="card w-100 border p-2 mb-3">
//           {[
//             [isCustomerCare ? "Customer Care ID" : "Trader ID", dealer.dealerId],
//             ['Total', dealer.totalAmount],
//             ['Discount', Number(dealer.materialQuotation[0].fixedDiscount).toFixed(2)],
//             ['Delivery Charges', dealer.materialQuotation[0].fixedDeliveryChargs],
//             ['Service Charges', Number(dealer.materialQuotation[0].fixedServicecharges).toFixed(2)],
//             ['GST', Number(dealer.materialQuotation[0].fixedGST).toFixed(2)],
//             ['Grand Total', Number(dealer.materialQuotation[0].grandtotal).toFixed(2)],
//             ['Lowest Bidder', dealer.dealerId === lowestDealerBidder ? 'Yes' : 'No']
//           ].map(([label, value], i) => (
//             <p key={i}><strong>{label}:</strong> {value}</p>
//           ))}
//         </div>
//       ))}
//       <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#198754' }}>Quotation Amount: {Number(lowestGrandTotal).toFixed(2)}</p>
//     </div>
//   )}
// </>
//     </>
//     )}
//   </div> 
//   {/* Add Remarks */}
//   <div className="form-group col-md-6">
//             <label className='fw-bold'>{isCustomerCare ? "Customer Care Remarks" : "Dealer Remarks"}</label>
//             <input 
//             type="text"
//             className="form-control m-2"
//             value={addrRmarks}
//             placeholder="Enter Remarks"
            
//             />
//         </div>
   
// <div>
//   <p><strong>Technician Quotation</strong></p>
//   <>
//   {!isMobile ? (
// <table className="table table-bordered">
//   <thead>
//     <tr>
//       {['Technician ID', 'Quoted Amount', 'Discount', 'Other Charges', 'Service Charges', 'GST', 'Total Quoted Amount', 'Lowest Bidder'].map((header, idx) => (
//         <th key={idx}>{header}</th>
//       ))}
//     </tr>
//   </thead>
//   <tbody>
//     {technicianDetails.map((technician, index) => (
//       <tr key={index} className='text-end'>
//         {[technician.technicianId, technician.enterQuoteAmount, technician.fixedDiscount
//     ? Number(technician.fixedDiscount).toFixed(2)
//     : '0.00', technician.fixedOtherCharge
//     ? Number(technician.fixedOtherCharge).toFixed(2)
//     : '0.00', technician.fixedServiceCharge
//     ? Number(technician.fixedServiceCharge).toFixed(2)
//     : '0.00', technician.fixedGST
//     ? Number(technician.fixedGST).toFixed(2)
//     : '0.00', technician.totalAmount
//     ? Number(technician.totalAmount).toFixed(2)
//     : '0.00', technician.technicianId === lowestBidder ? 'Yes' : 'No'].map((value, i) => (
//       <td key={i}>{value}</td>
//     ))}
//     </tr>
//   ))} 
//   <tr>
//         <td colSpan="3">
//             <input
//             type="text"
//             className='form-control text-end'
//             value={technicianId}
//             readOnly
//             placeholder='Lowest Bidder Technician ID'
//             /> 
//         </td>
//         <td>Lowest Bidder Amount</td>
        
//         <td colspan="4">
//             <input
//             type="number"
//             className="form-control text-end"
//             value={Number(totalAmount || 0).toFixed(2)}
//             readOnly
//             placeholder="Lowest Bidder Amount"
//             />
//         </td>
//         </tr> 
//   </tbody>
//   </table>
//   ) : (
//     <div className="mobile-view">
//       {technicianDetails.map((technician, index) => (
//         <div key={index} className="card w-100 border p-2 mb-3">
//           {[
//             ['Technician ID', technician.technicianId],
//             ['Quoted Amount', technician.enterQuoteAmount],
//             ['Discount', technician.fixedDiscount ? Number(technician.fixedDiscount).toFixed(2) : '0.00'],
//             ['Other Charges', technician.fixedOtherCharge ? Number(technician.fixedOtherCharge).toFixed(2) : '0.00'],
//             ['Service Charges',technician.fixedServiceCharge ? Number(technician.fixedServiceCharge).toFixed(2) : '0.00'],
//             ['GST', technician.fixedGST ? Number(technician.fixedGST).toFixed(2) : '0.00'],
//             ['Total Quoted Amount', technician.totalAmount ? Number(technician.totalAmount).toFixed(2) : '0.00'],
//             ['Lowest Bidder', technician.technicianId === lowestBidder ? 'Yes' : 'No']
//           ].map(([label, value], i) => (
//             <p key={i}><strong>{label}:</strong> {value}</p>
//           ))}
//         </div>
//       ))}
//       <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#198754' }}>Lowest Bidder Amount: {Number(totalAmount || 0).toFixed(2)}</p>
//     </div>
//   )}
// </>
// </div>
//         {/* Technician Remarks */}
//        <div className="form-group col-md-6">
//             <label className='fw-bold'>Technician Remarks</label>
//             <input 
//             type="text"
//             className="form-control"
//             value={techRemarks}
//             placeholder="Enter Remarks"
//             />
//         </div>

//      <p className='m-2'><strong>ABSTRACT</strong></p>
//      <>
//      {!isMobile ? (
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             {['Description', 'Lowest Bidder ID', 'Lowest Amount Including Charges and Taxes', 
//               'Actions'].map((header, idx) => (
//                 <th key={idx}>{header}</th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {[{
//             description: 'Required Material Quotation Bid Amount', id: dealerId,
//             amount: lowestGrandTotal ? Number(lowestGrandTotal).toFixed(2) : '0.00',
//             checked: isMaterialApproved,
//             onClick: () => setIsMaterialApproved(!isMaterialApproved) 
//           }, {
//             description: 'Technical Agency Quotation Bid Amount', id: technicianId,
//             amount: Number(totalAmount).toFixed(2),
//             checked: isAgencyApproved,
//             onClick: () => setIsAgencyApproved(!isAgencyApproved) 
//           }].map(({description, id, amount, checked, onClick}, index) => (
//             <tr key={index}>
//               <td>{description} Bid Amount</td>
//               <td>{id}</td>
//               <td>{amount}</td>
//               <td>
//                 <input
//                 type='radio'
//                 name={`${description}-approval`}
//                 className='form-check-input border-dark'
//                 checked={checked}
//                 onClick={onClick}
//               />
//               Approved
//               </td>
//             </tr>
//           ))}
//           <tr><td>Total Amount</td><td></td><td className='text-end'>{Number(total || 0).toFixed(2)}</td><td></td></tr>
//       <tr className="blinking-row">
//         <td className='fs-5'>Approved Acceptance Total Amount</td>
//         <td></td>
//         <td className='text-end'>{Number(approvedAcceptanceTotal).toFixed(2)}</td>
//         <td></td>
//       </tr>
//         </tbody>
//       </table>
//      ) : (
//       <div className="mobile-view">
//     {[{
//       label: 'Required Material',
//       id: dealerId,
//       amount: lowestGrandTotal ? Number(lowestGrandTotal).toFixed(2) : '0.00',
//       approved: isMaterialApproved, toggle: () => setIsMaterialApproved(!isMaterialApproved)
//     }, {
//       label: 'Technical Agency',
//       id: technicianId,
//       amount: Number(totalAmount || 0).toFixed(2),
//       approved: isAgencyApproved, toggle: () => setIsAgencyApproved(!isAgencyApproved) 
//     }].map(({label, id, amount, approved, toggle}, i) => (
//       <div key={i} className="card w-100 border p-2 mb-3">
//         <p><strong>Description: </strong>{label} Quotation</p>
//         <p><strong>Lowest Bidder ID:</strong> {id}</p>
//         <p><strong>Lowest Amount Including Charges and Taxes:</strong> {amount}</p>
//         <p><strong>Actions:</strong>
//         <input
//         type='radio'
//         name={`${label}-mobile-approval`}
//         className='form-check-input border-dark ms-2'
//         checked={approved}
//         onClick={toggle}
//         /> Approved
//         </p>
//       </div>
//     ))}
//     <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#198754' }}>
//       Approved Acceptance Total Amount: {Number(approvedAcceptanceTotal).toFixed(2)}
//     </p>
//   </div>
//      )}
//      </>
//         {/* Back Button */}
//         <div className="mt-4 ">
//           <Button onClick={() => Navigate(`/customerNotification/${userType}/${userId}`)} className="btn btn-warning text-white mx-2" title='back'>
//             Back
//           </Button>
//         </div>
//       </Form>
//     </div> 
//     </div>
//     <Footer /> 

//     {/* Styles for floating menu */}
// <style jsx>{`
//         .floating-menu {
//           position: fixed;
//           top: 80px; /* Increased from 20px to avoid overlapping with the logo */
//           left: 20px; /* Adjusted for placement on the left side */
//           z-index: 1000;
//         }
//          .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 110%;
//           height: 110%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }

//         .modal-content {
//           background: white;
//           padding: 20px;
//           border-radius: 20px;
//           width: 100%;
//           max-width: 600px;
//           max-height: 80vh;
//           overflow-y: auto;
//           text-align: left;
//         } 
//       `}</style>
      
//   </div>
//   );
// };

// export default CustomerRaiseTicketGridView;
