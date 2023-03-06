import React from "react";
import { Nav, NavLink, NavMenu } from "./navbar";
import img from "./bilder/logga-tentabank.png"
import LoginButtom from "./login-button";
import LogoutButtom from "./logout-button";
import { useCookies } from 'react-cookie'


const Navbar = () => {
  const [cookies] = useCookies(["user"])
   return (
    <>
      <Nav>
	  
   		 <NavLink className= "logo" to="/" ><img src={img} alt="logo"/> </NavLink>
  		
        <NavMenu>
          <NavLink to="/" activestyle="true">
            Hem
          </NavLink>
          {cookies.role !="Reviewer" && (<NavLink to="/browse" activestyle="true">Tentabank</NavLink>)}
          {cookies.role != "Reviewer" && (<NavLink to="/upload" activestyle="true">Ladda upp</NavLink>)}
          {cookies.role == "Reviewer" && (<NavLink to="/review" activestyle="true">Granska</NavLink>)}
          <NavLink to="/about" activestyle="true">
            Om oss
          </NavLink>
          <NavLink to="/profile" activestyle="true">
            Min sida
          </NavLink>
          {!cookies.loggedIn && (<LoginButtom/>)}
          {cookies.loggedIn && (<LogoutButtom/>)}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
