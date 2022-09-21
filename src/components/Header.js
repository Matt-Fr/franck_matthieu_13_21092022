import React from "react";
import { Link, NavLink } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";

const Header = () => {
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo " to="/">
        <img src={argentBankLogo} alt="logo" className="main-nav-logo-image" />
      </NavLink>
      <div>
        {/* <FontAwesomeIcon icon="fa-solid fa-circle-user" /> */}
        <NavLink className="main-nav-item" to="/sign-in">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
