import { Link } from "react-router-dom"
import Notifications from "../notifications/Notifications"

function Navigation() {
    return (
        <div className="flex justify-end gap-2 mb-2">
            <Link to={"/feed"} className="text-white">Projects</Link>
            <Notifications/>
            <Link to={"/"} className="text-red-500" onClick={() => sessionStorage.clear()}>Logout</Link>
        </div>
    )
}

export default Navigation