import { useState } from "react"


const LoginButtom = () => {
    const isAuthenticated  = useState(false)
    return (
        !isAuthenticated && (
            <button className="sign-in">
                Logga in
            </button>
        )
    )
}

export default LoginButtom