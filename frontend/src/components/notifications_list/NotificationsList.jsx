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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
    console.log("Accepted invite with id:", inviteId);
    await dispatch(inviteResponseThunk({ inviteId, status: "accepted" }));
    await dispatch(receivedInvitesThunk());
    console.log("Current notifications:", notifications);
  };

  const handleRejectInvite = (inviteId) => {};

  return (
    <div>
      <Navigation />
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress role="progress-bar" />
        </div>
      )}
      <div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between max-w-sm mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl p-2 mb-2"
            >
              <div className="mt-2 text-gray-700 text-base">
                {notification.status === "accepted" ? (
                  <p>
                    Accepted invite from {notification.fromUser.name} for{" "}
                    {notification.projectId.title}
                  </p>
                ) : (
                  <p>New invite! from {notification.fromUser.name}</p>
                )}
              </div>
              {notification.status === "pending" && (
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
