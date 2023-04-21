import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import img from "./bilder/logga-tentabank.png";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies] = useCookies(["user"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [navbar, setNavbar] = useState(false)
  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const changeBackground = () => {
    console.log(window.scrollY)
    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })
  return (
    <>
      <nav className={navbar?styles.nav_scroll:styles.nav}>
        <NavLink className={styles.logo} to="/">
          <img src={img} alt="logo" />
        </NavLink>
        <button
          className={styles.menu_toggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div className={menuOpen ? styles.nav_menu.open : styles.nav_menu}>

          {(cookies.role === "Student" || cookies.role === undefined) && (
            <NavLink className={styles.nav_link} to="/browse" activeclassname="active">
              Tentabank
            </NavLink>
          )}
          {cookies.role === "Student" && (
            <NavLink className={styles.nav_link} to="/upload" activeclassname="active">
              Ladda upp
            </NavLink>
          )}
          {cookies.role === "Reviewer" && (
            <NavLink className={styles.nav_link} to="/review" activeclassname="active">
              Granska
            </NavLink>
          )}
          {cookies.role === "Admin" && (
            <NavLink className={styles.nav_link} to="/promote" activeclassname="active">
              Befodra
            </NavLink>
          )}
          <NavLink className={styles.nav_link} to="/about" activeclassname="active">
            Om oss
          </NavLink>
          {cookies.loggedIn ? (<div className={styles.profile_icon} onClick={handleProfileClick}>
            <i className="fas fa-user-circle"></i>
            <div className={profileDropdownOpen ? styles.profile_dropdown : styles.dropdown_hide}>
              <NavLink className={styles.nav_link} to="/profile" activeclassname="active">
                Min sida
              </NavLink>
              <NavLink className={styles.nav_link} to="/notifications" activeclassname="active">
                Notifications
              </NavLink>
              <NavLink className={styles.nav_link} to="/settings" activeclassname="active">
                Settings
              </NavLink>
              {cookies.loggedIn && <LogoutButton />}
            </div>
          </div>
          ):(<LoginButton/>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
