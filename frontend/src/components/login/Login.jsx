import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Login() {
  const initialFormFields = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(initialFormFields);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async (e) => {
    e.preventDefault();

    const data = { ...login };
    const baseUrl =
      "http://localhost:3000/api/users/signin";

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(baseUrl, data);

      localStorage.setItem("token", response.data.token);
      setLoading(false);
      navigate("/feed");
      reset();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const reset = () => {
    setLogin(initialFormFields);
  };

  return (
    <>
      <div className="flex justify-start">
        <ArrowBackIcon
          aria-label="back-button"
          className="text-white m-5 text-3xl cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            <img
              src="https://i.postimg.cc/wxSVR0jG/logo.png"
              alt="logo"
              className="mx-auto w-auto h-10 rounded-sm"
            />
          </Link>
          <h2 className="mt-10 text-white text-center font-bold">
            Sign in to your account
          </h2>
        </div>

        <div>
          {error && <p className="text-red-500 mt-2 text-sm/6">{error}</p>}
          {loading && <CircularProgress className="mt-2" role="progressbar" />}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={signIn} className="space-y-6">
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
                  value={login.email}
                  onChange={handleChange}
                  data-testid="email-input"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-left text-gray-100 block font-medium text-sm/6"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="password-input"
                  value={login.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                aria-label="sign-in-button"
                data-testid="sign-in-button"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm/6 text-white font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 "
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-500 hover:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
