import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import styles from "./login-out.module.css"

const LoginButtom = () => {
    const [cookies] = useCookies(["user"])
    return (
    <NavLink className={styles.sign_in} to="/login">Logga in</NavLink>
    )
}

export default LoginButtom