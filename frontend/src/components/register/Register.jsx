import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

function Register() {
  const initialFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    githubUsername: "",
  };

  const [register, setRegister] = useState(initialFormFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    password: "",
    email: "",
    githubUsername: "",
    server: "",
  });

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();

    const data = { ...register };
    const baseUrl = "http://localhost:3000/api/users/signup";

    if (data.password !== data.confirmPassword) {
      return setError({ ...error, password: "Passwords don't match" });
    }

    setLoading(true);
    setError({ ...error, password: "", server: "" });

    try {
      await axios.post(baseUrl, data);
      setLoading(false);
      reset();
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError({ ...error, server: error.response.data.message });
      } else {
        setError({ ...error, server: "An error occurred. Please try again." });
      }
    }
  };

  const reset = () => {
    setRegister(initialFormFields);
  };

  return (
    <>
      <div className="flex justify-start">
        <ArrowBackIcon
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
          <h2 className="mt-10 text-white text-center font-bold">Sign up</h2>
        </div>

        <div>
          {error && (
            <p className="text-red-500 mt-2 text-sm/6">{error.server}</p>
          )}
          {loading && <CircularProgress className="mt-2" role="progressbar" />}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={signUp} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-left text-gray-100 block font-medium text-sm/6"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  data-testid="name-id"
                  name="name"
                  type="text"
                  value={register.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

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
                  data-testid="email-id"
                  name="email"
                  type="email"
                  value={register.email}
                  onChange={handleChange}
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
                  data-testid="password-id"
                  name="password"
                  type="password"
                  value={register.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="text-left text-gray-100 block font-medium text-sm/6"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  data-testid="confirm-password-id"
                  name="confirmPassword"
                  type="password"
                  value={register.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
                />
                <p className="text-red-500 mt-2 text-sm/6">{error.password}</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="github-username"
                className="text-left text-gray-100 block font-medium text-sm/6"
              >
                Github Username
              </label>
              <div className="mt-2">
                <input
                  id="github-username"
                  data-testid="github-username-id"
                  name="githubUsername"
                  type="text"
                  value={register.githubUsername}
                  onChange={handleChange}
                  autoComplete="github-username"
                  required
                  className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm/6 text-white font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ouline-indigo-500 "
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-indigo-500 hover:text-indigo-400"
            >
              Sign in
            </Link>{" "}
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
