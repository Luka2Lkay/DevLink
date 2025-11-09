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

      <div className="flex">
        {notitifications.length > 0 &&
          notitifications.map((notification) => (
            <div className="flex">
              <p className="text-white">{notification.fromUser.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default NotificationsList;
