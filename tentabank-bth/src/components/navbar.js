import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import img from "./bilder/logga-tentabank.png";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies] = useCookies(["user"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <>
      <nav className="nav">
        <NavLink className="logo" to="/">
          <img src={img} alt="logo" />
        </NavLink>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>

          {cookies.role !== "Reviewer" && (
            <NavLink to="/browse" activeClassName="active">
              Tentabank
            </NavLink>
          )}
          {cookies.role !== "Reviewer" && (
            <NavLink to="/upload" activeClassName="active">
              Ladda upp
            </NavLink>
          )}
          {cookies.role === "Reviewer" && (
            <NavLink to="/review" activeClassName="active">
              Granska
            </NavLink>
          )}
          <NavLink to="/about" activeClassName="active">
            Om oss
          </NavLink>
          {cookies.loggedIn ? (<div className="profile-icon" onClick={handleProfileClick}>
            <i className="fas fa-user-circle"></i>
            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <NavLink to="/profile" activeClassName="active">
                  Min sida
                </NavLink>
                <NavLink to="/notifications" activeClassName="active">
                  Notifications
                </NavLink>
                <NavLink to="/settings" activeClassName="active">
                  Settings
                </NavLink>
                {cookies.loggedIn && <LogoutButton />}
              </div>
            )}
          </div>
          ):(<LoginButton/>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
