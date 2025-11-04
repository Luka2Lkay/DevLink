import Navigation from "../navigation/Navigation"
import { selectCurrentInvite, setCurrentInvite, selectError, setError, selectLoading } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validator from "validator"
import { sendInviteThunk } from "../../state/thunks/invite_thunk";
import CircularProgress from "@mui/material/CircularProgress";

function Invite() {
  const { id } = useParams();
  const email = useSelector(selectCurrentInvite) ?? "";
  const error = useSelector(selectError) ?? "";
  const loading = useSelector(selectLoading) ?? false

  const dispatch = useDispatch();

  const sendInvite = async (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim();
    const checkEmail = validator.isEmail(trimmedEmail);

    if (!checkEmail) {
      return dispatch(setError("Invalid Email"));
    }

    try {
      await dispatch(sendInviteThunk({ id, trimmedEmail }))
      dispatch(setError(""));
    } catch (error) {
      dispatch(setError("Failed to send an invite."))
    }

  }

  return (
    <div>
      <Navigation />

      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-white">Invite a contributor</h1>

        <div className="flex justify-center">
          {error !== "" && (<p className="text-red-500">{error}</p>)}
          {loading && (<CircularProgress className="mt-4" role="progressbar" />)}
        </div>

        <form onSubmit={sendInvite} className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <div>
            <label
              htmlFor="email"
              className="text-left text-gray-100 block font-medium text-sm/6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="toEmail"
                name="toEmail"
                type="email"
                value={email}
                onChange={(e) => dispatch(setCurrentInvite(e.target.value))}
                data-testid="email-input"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              aria-label="send-invite-button"
              data-testid="send-invite-button"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm/6 text-white font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 "
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Invite