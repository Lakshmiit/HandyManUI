import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, collection, onSnapshot } from "./FirebaseConflict.js";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Badge from '@mui/material/Badge';

const OrdersNotificationBell = () => { 
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    const notificationsRef = collection(db, "notifications");
    const unsubscribe = onSnapshot(notificationsRef, async (snapshot) => {
      try {
        const response = await fetch(
          `https://handymanapiv2.azurewebsites.net/api/BuyProduct/GetBuyProductDetailsForUserList?UserID=${userId}`
        );
        const data = await response.json();
        const productOrdersFiltered = data.filter(
          (item) => item.assignedTo === "Customer" && item.status === "Assigned"
        );
        if (productOrdersFiltered.length > notifications.length) {
          setUnreadCount(productOrdersFiltered.length - notifications.length);
        }
        setNotifications(productOrdersFiltered);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    });

    return () => unsubscribe();
  }, [userId, notifications]);

  return (
    <div className="relative">
      <div className="relative p-2" onClick={() => setUnreadCount(0)}>
        <Badge 
          badgeContent={unreadCount > 0 ? unreadCount : null}
          color="error"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '12px',
              height: '20px',
              minWidth: '20px',
            },
          }}
        >
          <ListAltIcon sx={{ fontSize: 35, color: "black" }} />
        </Badge>
      </div> 
    </div>
  );
};

export default OrdersNotificationBell;
