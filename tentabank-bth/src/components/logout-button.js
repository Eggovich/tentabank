import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"


const LogoutButtom = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
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
        
        <button className="sign-out1" onClick={handleLogout}>
            <NavLink  to="/">Logga ut</NavLink>
        </button>
    )
}

export default LogoutButtom