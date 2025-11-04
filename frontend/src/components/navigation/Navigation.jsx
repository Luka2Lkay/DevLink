import { Link } from "react-router-dom"

function Navigation() {
    return (
        <div className="flex justify-end gap-2 text-red-500 mb-2">

            <Link to={"/feed"}>Projects</Link>

            <Link to={"/"} onClick={() => sessionStorage.clear()}>Logout</Link>
        </div>
    )
}

export default Navigation