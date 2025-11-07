import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { recievedInvites } from "../../state/thunks/invite_thunk";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Notifications() {
  const dispatch = useDispatch();

  const invites = dispatch(recievedInvites());
  const [notifications, setNotification] = useState(invites);
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

  const viewNotification = async (notification) => {
    handleMarkAsRead(notification.id);
    console.log(`New invite! from ${notification.fromUser.name}`);

    const result = await dispatch(recievedInvites());

    console.log("length", result.payload.length);
  };

  return (
    <>
      <IconButton
        sx={{ color: "white" }}
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
              onClick={() => viewNotification(notification)}
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
