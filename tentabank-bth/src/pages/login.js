import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, NavLink } from "react-router-dom";


const Login = () => {
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
    setCookie("privleges", currentUser.browse_permission, {path: '/'})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="upload-form">
      {cookies.loggedIn ? (
        <useNavigate to="/" />
    
      ) : (
        <div>
        <form onSubmit={handleSubmit}>
          <input type="text" className="input-field" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord"/>
          <button type="submit" className="submit-button">Logga in</button>
        </form>
        <NavLink to="/signup">Har du inget konto? Skapa ett här!</NavLink>
        </div>
      )}
      {failedLogin === true && (<p className="errormessage">{response}</p>)}
      {failedServer === true && (<p className="errormessage">Ingen kontakt med servern, försök igen om en stund</p>)}
    </div>
  );
};
export default Login;
