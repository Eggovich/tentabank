
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background-color: rgb(255, 228, 196);
  height: 85px;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: flex-end;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;

export const NavLink = styled(Link)`
  color: #aaaaaa;
  background-color: rgb(255, 228, 196);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: rgb(0,27,59);
  }
  &:hover{
    color: rgb(0,27,59);
    text-decoration:none;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: transparent;
  background-color: rgb(255, 228, 196);
  background-color: transparent;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  background-color: rgb(255, 228, 196);
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
