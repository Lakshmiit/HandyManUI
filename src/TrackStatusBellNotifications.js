// import { useState, useEffect } from "react";
// import {  useParams } from "react-router-dom";
// import { db, collection, onSnapshot } from "./FirebaseConflict.js";
// import RouteIcon from '@mui/icons-material/Route';
// // import notificationSound from "./bell.mp3";

// const TrackStatusNotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
// //   const navigate = useNavigate();
//   const { userId } = useParams(); 

//   useEffect(() => {
//     const notificationsRef = collection(db, "notifications");
 
//     const unsubscribe = onSnapshot(notificationsRef, async (snapshot) => {
//       try {
//         const response = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTrackTicketsByCustomerId?customerId=${userId}`
//         );
//         const data = await response.json();
//         const getTrackNotifications = data.filter(
//           (item) => item.assignedTo === "Customer"&& (item.internalStatus === "Assigned" || item.internalStatus === "Pending" || item.internalStatus === "Customer Approved" ||  item.internalStatus === "PaymentDone")
//         )
//         // Check for new notifications
//         if (getTrackNotifications.length > notifications.length) {
//           setUnreadCount(getTrackNotifications.length - notifications.length);
//         }
//         setNotifications(getTrackNotifications);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     });

//     return () => unsubscribe();
//   }, [userId, notifications]); 
  
//   //   const playNotificationSound = () => {
//   //     const audio = new Audio(notificationSound);
//   //     audio.play();
//   //   };

//   //   const handleNotificationClick = (ticketId) => {
//   //     setUnreadCount(0);
//   //     navigate(`/ticket/${ticketId}`);
//   //   };

//   return (
//     <div className="relative">
//       <div className="relative p-2" onClick={() => setUnreadCount(0)}>
//         <RouteIcon  sx={{ fontSize: 25, color: "black" }}
//         />
//         {unreadCount > 0 && (
//           <span className="bell-count">{unreadCount}</span>
//         )}
//       </div>
//       {/* Uncomment if you want to show notifications */}
//       {/* <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
//         {notifications.map((ticket) => (
//           <div
//             key={ticket.id}
//             className="cursor-pointer p-2 hover:bg-gray-200"
//             onClick={() => handleNotificationClick(ticket.id)}
//           >
//             {ticket.title}
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default TrackStatusNotificationBell;
