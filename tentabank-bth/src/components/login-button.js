import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import "./login-out.css"

const LoginButtom = () => {
    const [cookies] = useCookies(["user"])
    return (
    <NavLink className="sign-in" to="/login">Logga in</NavLink>
    )
}

export default LoginButtom