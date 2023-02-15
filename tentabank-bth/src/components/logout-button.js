import { useAuth0 } from "@auth0/auth0-react";

const LogoutButtom = () => {
    const { logout, isAuthenticated } = useAuth0()
    return (
        isAuthenticated && (
            <button className="sign-in" onClick= {() => logout()}>
                Logga ut
            </button>
        )
    )
}

export default LogoutButtom