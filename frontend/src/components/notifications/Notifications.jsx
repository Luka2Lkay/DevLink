import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { receivedInvitesThunk } from "../../state/thunks/invite_thunk";
import { selectInvites } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(selectInvites) ?? [];

  const handleClick = () => {
    navigate("/notifications-list");
  };

  useEffect(() => {
    dispatch(receivedInvitesThunk());
  }, [dispatch]);

  const numberOfUnhandledInvites = () => {
    const pendingInvites = notifications.filter(
      (notification) => notification.status === "pending"
    );

    return pendingInvites.length;
  };

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
    </>
  );
}

export default Notifications;
