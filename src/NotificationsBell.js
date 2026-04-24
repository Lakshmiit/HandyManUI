// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { db, collection, onSnapshot } from "./FirebaseConflict.js";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import notificationSound from "./Bell.mp3";

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const lastNotificationCount = useRef(0);
//   const { userId } = useParams();

//   useEffect(() => {
//     console.log(notifications);
//   }, [notifications]);
//   useEffect(() => {
//     const notificationsRef = collection(db, "notifications");
//     const unsubscribe = onSnapshot(notificationsRef, async () => {
//       try {
//         const response = await fetch(
//           `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/BookTechnician/GetBookTechnicianDetailsForUserList?userId=${userId}`
//         );
//         const data = await response.json();

//         const getTechnicianFiltered = data.filter(
//           (item) =>
//             item.status === "Assigned" &&
//             item.assignedTo === "Customer" &&
//             item.bookTechnicianId != null
//         );

//         // Check for new notifications
//         if (getTechnicianFiltered.length > lastNotificationCount.current) {
//           setUnreadCount(getTechnicianFiltered.length - lastNotificationCount.current);
//           playNotificationSound();
//         }

//         setNotifications(getTechnicianFiltered);
//         lastNotificationCount.current = getTechnicianFiltered.length; // Store latest count
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     });

//     return () => unsubscribe();
//   }, [userId]); 

//   const playNotificationSound = () => {
//     try {
//       const audio = new Audio(notificationSound);
//       audio.play();
//     } catch (error) {
//       console.error("Error playing sound:", error);
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="relative" onClick={() => setUnreadCount(0)}>
//         <NotificationsNoneIcon sx={{ fontSize: 35, color: "black" }} />
//         {unreadCount > 0 && <span className="bell-count">{unreadCount}</span>}
//       </div>
//     </div>
//   );
// };

// export default NotificationBell;
