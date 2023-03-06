import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import "./login-out.css"


const LogoutButtom = () => {
    const [cookie, setcookies, removeCookie] = useCookies(['user'])
    const handleLogout = () => {
        removeCookie("user")
        removeCookie("username")
        removeCookie("email")
        removeCookie("password")
        removeCookie("role")
        removeCookie("user_id")
        removeCookie("loggedIn")
        window.location.reload(false);
    }
    return (
    <NavLink onClick={handleLogout} className="sign-out1" to="/">Logga ut</NavLink>
    )
}

export default LogoutButtom