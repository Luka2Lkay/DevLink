import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { receivedInvitesThunk } from "../../state/thunks/invite_thunk";
import { selectInvites } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(selectInvites) ?? [];
  // const [anchorElement, setAnchorElement] = useState(null);
  // const open = Boolean(anchorElement);

  const handleClick = (e) => {
    navigate("/notifications-list");
  };

  useEffect(() => {
    dispatch(receivedInvitesThunk());
  }, [dispatch]);

  // const handleClose = () => {
  //   setAnchorElement(null);
  // };

  const numberOfUnhandledInvites = () => {
    const pendingInvites = notifications.filter(
      (notification) => notification.status === "pending"
    );

    return pendingInvites.length;
  };

  // const handleMarkAsRead = (id) => {
  //   //Consider reworking this
  //   dispatch(removeInvite(id));
  // };

  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={handleClick}
        data-testid="icon-button"
      >
        <Badge badgeContent={numberOfUnhandledInvites()} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* <Menu
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
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <p>New invite! from {notification.fromUser.name}</p>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>No new notifications</MenuItem>
        )}
      </Menu> */}
    </>
  );
}

export default Notifications;
