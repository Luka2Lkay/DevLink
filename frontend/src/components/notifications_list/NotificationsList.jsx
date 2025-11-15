import Navigation from "../navigation/Navigation";
import {
  recievedInvites,
  acceptInviteThunk,
} from "../../state/thunks/invite_thunk";
import { selectInvites, removeInvite } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotificationsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectInvites) ?? [];
  // const [processedInvites, setProcessedInvites] = useState(new Set());

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user") !== null;
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(recievedInvites());
    }
  }, [dispatch]);

  const handleAcceptInvite = async (inviteId) => {
    console.log("Accepted invite with id:", inviteId);
    // setProcessedInvites((prev) => new Set(prev).add(inviteId));
    await dispatch(acceptInviteThunk({ inviteId, status: "accepted" }));
    await dispatch(recievedInvites());
    console.log("Current notifications:", notifications);
  };

  const handleRejectInvite = (inviteId) => {};

  return (
    <div>
      <Navigation />
      <div>
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between max-w-sm mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl p-2 mb-2"
            >
              <p className="mt-2 text-gray-700 text-base">
                { notification.status === "accepted" ? (
                  <p>
                    Accepted invite from {notification.fromUser.name} for{" "}
                    {notification.projectId.title}
                  </p>
                ) : (
                  <p>New invite! from {notification.fromUser.name}</p>
                )}
              </p>
              <div className="flex flex-items gap-2">
                <button
                  onClick={() => handleAcceptInvite(notification.id)}
                  aria-label="accept-button"
                  className="bg-green-500 text-sm text-white cursor-pointer border border-gray-700 p-2 rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectInvite(notification.id)}
                  className="bg-red-500 text-sm text-white cursor-pointer border border-gray-700 p-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default NotificationsList;
