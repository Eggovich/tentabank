import React from "react";
import { NavLink } from "react-router-dom";
import img from "./bilder/logga-tentabank.png";
import LoginButtom from "./login-button";
import LogoutButtom from "./logout-button";
import { useCookies } from "react-cookie";
import "./navbar.css";

const Navbar = () => {
  const [cookies] = useCookies(["user"]);
  return (
    <>
      <nav className="nav">
        <NavLink className="logo" to="/">
          <img src={img} alt="logo" />
        </NavLink>
        <div className="nav-menu">
          <NavLink className="nav-link" to="/" activeClassName="active">
            Hem
          </NavLink>
          {cookies.role !== "Reviewer" && (
            <NavLink className="nav-link" to="/browse" activeClassName="active">
              Tentabank
            </NavLink>
          )}
          {cookies.role !== "Reviewer" && (
            <NavLink className="nav-link" to="/upload" activeClassName="active">
              Ladda upp
            </NavLink>
          )}
          {cookies.role === "Reviewer" && (
            <NavLink className="nav-link" to="/review" activeClassName="active">
              Granska
            </NavLink>
          )}
          <NavLink className="nav-link" to="/about" activeClassName="active">
            Om oss
          </NavLink>
          <NavLink className="nav-link" to="/profile" activeClassName="active">
            Min sida
          </NavLink>
          {!cookies.loggedIn && <LoginButtom />}
          {cookies.loggedIn && <LogoutButtom />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
