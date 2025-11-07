import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { recievedInvites } from "../../state/thunks/invite_thunk";
import { selectInvites } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Notifications() {
  const dispatch = useDispatch();

  let notifications = useSelector(selectInvites) ?? [];
  const [anchorElement, setAnchorElement] = useState(null);
  const open = Boolean(anchorElement);

  const handleClick = (e) => {
    setAnchorElement(e.currentTarget);
  };

  useEffect(() => {
    const dispatchThunk = async () => {
      const result = await dispatch(recievedInvites());
      notifications = result.payload.invite.invites;

      console.log("result: ", notifications);
      return notifications;
    };

    dispatchThunk();
   
  }, []);

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleMarkAsRead = (id) => {


    return notifications.filter((notification) => notification.id !== id)

      console.log("id arg", id)
  };

  const viewNotification = async (notification) => {
    handleMarkAsRead(notification.id);

    const result = await dispatch(recievedInvites());

    console.log("length", result.payload.invite.invites.length);
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
              <p>New invite! from {notification.fromUser.name}</p>
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
