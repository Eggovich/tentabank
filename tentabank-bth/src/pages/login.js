import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, NavLink } from "react-router-dom";
import LoginForm from "../components/loginForm";
import SignupForm from "../components/signupForm"
import "./login.css"


const Login = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.loggedIn) {
      navigate("/");
    }
  }, [cookies.loggedIn, navigate]);    

  return (
    <div className="login-page">
      <div className="form">
        <LoginForm></LoginForm>
      </div>
      <div className="form">
      <SignupForm/>
      </div>
    </div>
  )
};
export default Login;
