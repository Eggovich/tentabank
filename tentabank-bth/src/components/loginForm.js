import { useNavigate, NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"
import "./loginForm.css"


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [failedServer, setFailedServer] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const [response, setResponse] = useState("");
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();


    const handleCookies = (currentUser) => {
        setCookie("username", currentUser.username, {path: '/'})
        setCookie("user_id", currentUser.user_id, {path: '/'})
        setCookie('email', currentUser.email, { path: '/' });
        setCookie('password', currentUser.password, { path: '/' });
        setCookie("loggedIn", true, {path: '/' })
        setCookie("role", currentUser.role, {path: '/'})
        setCookie("uploads", currentUser.uploads, {path: '/'})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password){
            setFailedLogin(true)
            setResponse("Fyll i alla fälten")
            return
        }
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
        await fetch("http://localhost:5000/login", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            if (Object.keys(data).length < 2){
            setLoggedIn(true)
            handleCookies(data.response)
            window.location.reload(false);
            return
            }else{
            setFailedLogin(true)
            setResponse(data.response)
            return
            }
        });
      
        } catch (error) {
        setFailedServer(true);
        console.error(error);
        }
    };
    useEffect(() => {
        if (cookies.loggedIn) {
        navigate("/");
        }
    }, [cookies.loggedIn, navigate]);
    return (
        <div className='login-container'>
            <h2 className='login-title'>Logga in</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' className='login-input' onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='Lösenord' className='login-input' onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit' className='login-submit'>
                    Logga in
                </button>
                <NavLink to="/login">Har du inget konto? Skapa ett här!</NavLink>
            </form>
            {failedLogin === true && (<p className="errormessage">{response}</p>)}
            {failedServer === true && (<p className="errormessage">Ingen kontakt med servern, försök igen om en stund</p>)}
        </div>
    )
}

export default LoginForm