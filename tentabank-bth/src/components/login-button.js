import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"

const LoginButtom = () => {
    const [cookies] = useCookies(["user"])
    console.log(cookies)
    return (
        <button>
            <NavLink className="sign-in" to="/login">Logga in</NavLink>
        </button>
    )
}

export default LoginButtom