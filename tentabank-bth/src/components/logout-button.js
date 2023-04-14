import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import styles from "./login-out.module.css"


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
        removeCookie("uploads")
        window.location.reload(false);
    }
    return (
    <NavLink onClick={handleLogout} className={styles.sign_out} to="/">Logga ut</NavLink>
    )
}

export default LogoutButtom