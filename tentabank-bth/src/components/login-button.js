import { useAuth0 } from "@auth0/auth0-react";

const LoginButtom = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    return (
        !isAuthenticated && (
            <button className="sign-in" onClick= {() => loginWithRedirect()}>
                Logga in
            </button>
        )
    )
}

export default LoginButtom