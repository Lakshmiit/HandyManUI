import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { db, collection, onSnapshot } from "./FirebaseConflict.js";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificationSound from "./Bell.mp3";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
//   const navigate = useNavigate();
  const { userId } = useParams(); 
  
  useEffect(() => {
    const notificationsRef = collection(db, "notifications");

    const unsubscribe = onSnapshot(notificationsRef, async (snapshot) => {
      try {
        const response = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianDetailsForUserList?userId=${userId}`
        );
        const data = await response.json();
// alert(getTechnicianFiltered.length);
        const getTechnicianFiltered = data.filter(
          (item) =>
            item.status === "Assigned" &&
            item.assignedTo === "Customer" &&
            item.bookTechnicianId != null
        );

        // Check for new notifications
        if (getTechnicianFiltered.length > notifications.length) {
          setUnreadCount(getTechnicianFiltered.length - notifications.length);
         playNotificationSound();
        }

        setNotifications(getTechnicianFiltered);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    });

    return () => unsubscribe();
  }, [userId, notifications]); // Added dependencies to re-run effect when `userId` or `notifications` change

    const playNotificationSound = () => {
      const audio = new Audio(notificationSound);
      audio.play();
    };

  //   const handleNotificationClick = (ticketId) => {
  //     setUnreadCount(0);
  //     navigate(`/ticket/${ticketId}`);
  //   };

  return (
    <div className="relative">
      <button className="relative p-2" onClick={() => setUnreadCount(0)}>
        <NotificationsNoneIcon sx={{ color: "black" }}/>
        {unreadCount > 0 && (
          <span className="bell-count">{unreadCount}</span>
        )}
      </button>
      {/* Uncomment if you want to show notifications */}
      {/* <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
        {notifications.map((ticket) => (
          <div
            key={ticket.id}
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => handleNotificationClick(ticket.id)}
          >
            {ticket.title}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NotificationBell;
