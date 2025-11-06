import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

function Notifications() {
  const [notifications, setNotification] = useState([
    { id: 1, message: "New message received!" },
    { id: 2, message: "Your order has shipped." },
  ]);
  const [anchorElement, setAnchorElement] = useState(null);
  const open = Boolean(anchorElement);

  const handleClick = (e) => {
    setAnchorElement(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleMarkAsRead = (id) => {
    setNotification(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <>
      <IconButton
        sx={{ marginBottom: "5px" }}
        color="white"
        onClick={handleClick}
        data-testid="icon-button"
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="notification-menu"
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        slotProps={{ list: { "aria-labelledby": "notification-button" } }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                handleMarkAsRead(notification.id);
                console.log(notification.message);
              }}
            >
              {notification.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>No new notifications</MenuItem>
        )}
      </Menu>
    </>
  );
}

export default Notifications;
