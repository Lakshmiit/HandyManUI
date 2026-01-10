import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, collection, onSnapshot } from "./FirebaseConflict.js";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import notificationSound from "./Bell.mp3";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const lastNotificationCount = useRef(0);
  // const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  useEffect(() => {
    const notificationsRef = collection(db, "notifications");

    const unsubscribe = onSnapshot(notificationsRef, async () => {
      try {
        const response = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/BookTechnician/GetBookTechnicianDetailsForUserList?userId=${userId}`
        );
        const data = await response.json();

        const getTechnicianFiltered = data.filter(
          (item) =>
            item.status === "Assigned" &&
            item.assignedTo === "Customer" &&
            item.bookTechnicianId != null
        );

        // Check for new notifications
        if (getTechnicianFiltered.length > lastNotificationCount.current) {
          setUnreadCount(getTechnicianFiltered.length - lastNotificationCount.current);
          playNotificationSound();
        }

        setNotifications(getTechnicianFiltered);
        lastNotificationCount.current = getTechnicianFiltered.length; // Store latest count
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    });

    return () => unsubscribe();
  }, [userId]); // Removed `notifications` dependency to avoid infinite re-renders

  const playNotificationSound = () => {
    try {
      const audio = new Audio(notificationSound);
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // const handleNotificationClick = (ticketId) => {
  //   setUnreadCount(0);
  //   navigate(`/ticket/${ticketId}`);
  // };

  return (
    <div className="relative">
      <div className="relative" onClick={() => setUnreadCount(0)}>
        <NotificationsNoneIcon sx={{ fontSize: 35, color: "black" }} />
        {unreadCount > 0 && <span className="bell-count">{unreadCount}</span>}
      </div>
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
