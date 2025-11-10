import Navigation from "../navigation/Navigation";
import { recievedInvites } from "../../state/thunks/invite_thunk";
import { selectInvites, removeInvite } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function NotificationsList() {
  const dispatch = useDispatch();
  const notitifications = useSelector(selectInvites) ?? [];

  useEffect(() => {
    dispatch(recievedInvites());
  });

  return (
    <div>
      <Navigation />
      <button className="text-white">All</button>
      <div>
        {notitifications.length > 0 &&
          notitifications.map((notification) => (
            <div className="flex items-center justify-between max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl transform hover:scale-[1.02] transition duration-3000 ease-in-out p-2 mb-2">
              <p className="mt-2 text-gray-700 text-sm">
                New invite! from {notification.fromUser.name}
              </p>
              <div className="flex flex-items gap-2">
                <button
                  onClick={() => {}}
                  className="bg-green-500 text-white cursor-pointer border border-gray-700 p-2 radius-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => {}}
                  className="bg-red-500 text-white cursor-pointer border border-gray-700 p-2 radius-md"
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
