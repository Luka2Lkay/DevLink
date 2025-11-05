import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useState } from "react"

function Notifications() {

    const [notifications, setNotification] = useState([
        { id: 1, message: 'New message received!' },
        { id: 2, message: 'Your order has shipped.' },
    ])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        
    }


    return (
        <>

            <IconButton color="inherit" onClick={handleClick} data-testid="icon-button" >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                </Badge>

            </IconButton></>
    )
}

export default Notifications