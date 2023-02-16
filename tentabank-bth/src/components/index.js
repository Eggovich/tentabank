import React from "react";
import { Nav, NavLink, NavMenu } from "./navbar";
import img from "./bilder/logga-tentabank.png"
import LoginButtom from "./login-button";
import LogoutButtom from "./logout-button";


const Navbar = () => {
  return (
    <>
      <Nav>
	  
   		 <NavLink className= "logo" to="/" ><img src={img} alt="logo"/> </NavLink>
  		
        <NavMenu>
          <NavLink to="/" activestyle="true">
            Hem
          </NavLink>
          <NavLink to="/browse" activestyle="true">
            Tentabank
          </NavLink>
          <NavLink to="/upload" activestyle="true">
            Ladda upp
          </NavLink>
          <NavLink to="/about" activestyle="true">
            Om oss
          </NavLink>
          <NavLink to="/profile" activestyle="true">
            Min sida
          </NavLink>
          <LoginButtom/>
          <LogoutButtom/>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
