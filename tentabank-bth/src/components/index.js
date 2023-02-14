import React from "react";
import { Nav, NavLink, NavMenu } from "./navbar";
import img from "./bilder/logga-tentabank.png"


const Navbar = () => {
  return (
    <>
      <Nav>
	  <div className="logo">
   		 <img src={img} alt="logo"/> 
  		</div>
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
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;