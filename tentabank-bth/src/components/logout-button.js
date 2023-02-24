import { useState } from "react"

const LogoutButtom = () => {
    const isAuthenticated = useState(true)
    return (
        isAuthenticated && (
            <button className="sign-in">
                Logga ut
            </button>
        )
    )
}

export default LogoutButtom