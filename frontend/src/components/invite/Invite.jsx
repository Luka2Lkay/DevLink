import { Link } from "react-router-dom"

function Invite() {
  return (
    <div>
      <div className="flex justify-end text-red-500 mb-2">
        <Link to={"/"} onClick={() => sessionStorage.clear()}>Logout</Link>
      </div>

      <h1 className="">Invite a contributor</h1></div>
  )
}

export default Invite