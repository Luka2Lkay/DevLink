import { Link } from "react-router-dom"

function Navigation() {
    return (
        <div className="flex justify-end text-red-500 mb-2">
            <Link to={"/"} onClick={() => sessionStorage.clear()}>Logout</Link>
        </div>
    )
}

export default Navigation