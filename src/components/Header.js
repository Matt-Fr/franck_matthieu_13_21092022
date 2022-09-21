import React from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";
const Header = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo">
        <img
          src={argentBankLogo}
          alt="logo"
          className="main-nav-logo-image.png"
        />
      </Link>
    </nav>
  );
};

export default Header;
