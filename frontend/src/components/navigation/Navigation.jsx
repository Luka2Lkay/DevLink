import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Navigation() {
    return (
        <div className="flex justify-between text-red-500 mb-2">

            <ArrowBackIcon
                aria-label="back-button"
                className="text-white m-5 text-3xl cursor-pointer"
                onClick={() => window.history.back()}
            />

            <Link to={"/"} onClick={() => sessionStorage.clear()}>Logout</Link>
        </div>
    )
}

export default Navigation