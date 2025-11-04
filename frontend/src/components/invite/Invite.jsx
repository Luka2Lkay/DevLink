import Navigation from "../navigation/Navigation"
import { selectCurrentInvite, setCurrentInvite, selectError, setError } from "../../state/reducers/invite_slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validator from "validator"

function Invite() {

  const email = useSelector(selectCurrentInvite) ?? "";
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const sendInvite = (e) => {
    e.preventDefault()

    const { id } = useParams();

    const checkEmail = validator.isEmail(email);

    if (!checkEmail) {
      setError("Invalid Email")
    }
  }

  return (
    <div>
      <Navigation />

      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-white">Invite a contributor</h1>

        {error !== "" && (<p className="text-red text-center">{error}</p>)}
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
                id="email"
                name="email"
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