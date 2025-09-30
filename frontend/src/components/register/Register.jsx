import { useState, useEffect } from "react"

function Register() {
  const initialFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    githubUsername: ""
  }

  const [register, setRegister] = useState(initialFormFields);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const signIn = async (e) => {
    e.prevent.default();

    const data = { ...login };
    const baseUrl = "http://localhost:3000/api/users/signin";

    await axios.post(baseUrl, data).then(reset())
  }

  const reset = () => {
    setLogin(initialFormFields)
  }

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="https://i.postimg.cc/wxSVR0jG/logo.png" alt="logo" className="mx-auto w-auto h-10 rounded-sm" />
        <h2 className="mt-10 text-white text-center font-bold">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={signIn} className="space-y-6">

          <div>
            <label htmlFor="email" className="text-left text-gray-100 block font-medium text-sm/6">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" value={login.email} onChange={handleChange} autoComplete="email" required className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-left text-gray-100 block font-medium text-sm/6">Password</label>
            <div className="mt-2">
              <input id="password" name="password" type="password" value={login.password} onChange={handleChange} autoComplete="none" required className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm/6 text-white font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ouline-indigo-500 ">Sign in</button>
          </div>

        </form>

        <p className="mt-10 text-center `text-sm/6 text-gray-400">
          Don't have an account? <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-400">Sign up</a>.
        </p>

      </div>
    </div>
  )
}

export default Login