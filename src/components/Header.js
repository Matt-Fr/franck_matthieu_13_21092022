import React from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";

const Header = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo ">
        <img src={argentBankLogo} alt="logo" className="main-nav-logo-image" />
      </Link>
      <div>
        {/* <FontAwesomeIcon icon="fa-solid fa-circle-user" /> */}
        <Link className="main-nav-item">Sign In</Link>
      </div>
    </nav>
  );
};

export default Header;
