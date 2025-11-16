import Navigation from "../navigation/Navigation";
import {
  selectCurrentInvite,
  resetInvites,
  setCurrentInvite,
  selectErrorMessage,
  setErrorMessage,
  selectLoading,
  setSuccessMessage,
  selectSuccessMessage,
} from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validator from "validator";
import { sendInviteThunk } from "../../state/thunks/invite_thunk";
import CircularProgress from "@mui/material/CircularProgress";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Invite() {
  const { id } = useParams();
  const email = useSelector(selectCurrentInvite);
  const errorMessage = useSelector(selectErrorMessage);
  const loading = useSelector(selectLoading) ?? false;
  const successMessage = useSelector(selectSuccessMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user") !== null;
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(resetInvites());
    }

    console.log("Success Message:", successMessage);
    console.log("Error Message:", errorMessage);
  }, [dispatch, navigate]);

  const sendInvite = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const checkEmail = validator.isEmail(trimmedEmail);

    if (!checkEmail) {
      return dispatch(setErrorMessage("Invalid Email"));
    }

    try {
      const result = await dispatch(
        sendInviteThunk({ id, email: trimmedEmail })
      );

      if (result.payload) {
        return await dispatch(setErrorMessage(result.payload));
      }
      await dispatch(setCurrentInvite(""));
    } catch (error) {
      await dispatch(setErrorMessage(error));
      await dispatch(setSuccessMessage(""));
    }
  };

  const handleChange = (e) => {
    if (errorMessage) dispatch(setErrorMessage(""));
    if (successMessage) dispatch(setSuccessMessage(""));

    dispatch(setCurrentInvite(e.target.value));
  };

  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-white">Invite a contributor</h1>

        <div className="flex justify-center mt-4">
          {loading ? (
            <CircularProgress role="progressbar" />
          ) : successMessage ? (
            <div className="flex justify-center gap-2">
              <TaskAltIcon
                aria-label="success-check-icon"
                className="text-green-500 text-sm"
              />
              <p role="alert" className="text-green-500 text-sm">
                Invite Successful!
              </p>
            </div>
          ) : (
            errorMessage && (
              <div className="flex justify-center gap-2">
                <p className="text-red-500">error</p>
              </div>
            )
          )}
        </div>

        <form
          onSubmit={sendInvite}
          className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
        >
          <div>
            <label
              htmlFor="email"
              className="text-left text-gray-100 block font-medium text-sm"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                data-testid="email-input"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              aria-label="send-invite-button"
              data-testid="send-invite-button"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm text-white font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 "
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Invite;
