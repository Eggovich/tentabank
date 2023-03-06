import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css"; 


const Footer = () => {
  return (
    <footer className="footer-basic">
      <div className="social">
        <a href="#">
          <i className="icon ion-social-instagram"></i>
        </a>
        <a href="#">
          <i className="icon ion-social-snapchat"></i>
        </a>
        <a href="#">
          <i className="icon ion-social-twitter"></i>
        </a>
        <a href="#">
          <i className="icon ion-social-facebook"></i>
        </a>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <NavLink to="/">Hem</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="/browse">Tentabank</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="/upload">Ladda upp</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="/about">Om oss</NavLink>
        </li>
        <li className="list-inline-item">
          <NavLink to="/profile">Min sida</NavLink>
        </li>
      </ul>
      <div className="text-center">
        <p className="mb-0">
          TentaBanken ©
        </p>
      </div>
    </footer>
  );
};

export default Footer;
