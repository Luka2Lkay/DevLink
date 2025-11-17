import Navigation from "../navigation/Navigation";
import {
  receivedInvitesThunk,
  inviteResponseThunk,
} from "../../state/thunks/invite_thunk";
import {
  selectInvites,
  selectLoading,
} from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotificationsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectInvites) ?? [];
  const loading = useSelector(selectLoading) ?? false;

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user") !== null;
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(receivedInvitesThunk());
    }
  }, [dispatch]);

  const handleAcceptInvite = async (inviteId) => {
    await dispatch(inviteResponseThunk({ inviteId, status: "accepted" }));
    await dispatch(receivedInvitesThunk());
  };

  const handleRejectInvite = async (inviteId) => {
    await dispatch(inviteResponseThunk({ inviteId, status: "rejected" }));
    await dispatch(receivedInvitesThunk());
  };

  return (
    <div>
      <Navigation />
      <div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between max-w-sm mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl p-2 mb-2"
            >
              <div className="mt-2 text-gray-700 text-base border-red-200 border">
                {notification.status === "accepted" ? (
                  <p className="text-center">
                    Accepted invite from {notification.fromUser.name} for{" "}
                    {notification.projectId.title}
                  </p>
                ) : notification.status === "pending" ? (
                  <p>
                    New invite! from {notification.fromUser.name} for{" "}
                    {notification.projectId.title}
                  </p>
                ) : (
                  notification.status === "rejected" && (
                    <p className="text-center">
                      Rejected invite from {notification.fromUser.name} for{" "}
                      {notification.projectId.title}
                    </p>
                  )
                )}
              </div>
              {notification.status === "pending" && (
                <div className="flex flex-col sm:flex-row flex-items gap-2">
                  <button
                    onClick={() => handleAcceptInvite(notification.id)}
                    disabled={loading}
                    aria-label="accept-button"
                    className="bg-green-500 text-sm text-white cursor-pointer border border-gray-700 p-2 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectInvite(notification.id)}
                    disabled={loading}
                    aria-label="reject-button"
                    className="bg-red-500 text-sm text-white cursor-pointer border border-gray-700 p-2 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-white">No invitations</p>
        )}
      </div>
    </div>
  );
}

export default NotificationsList;
