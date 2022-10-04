import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";
import { logoutUser } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo " to="/">
        <img src={argentBankLogo} alt="logo" className="main-nav-logo-image" />
      </NavLink>
      <div>
        {/* <FontAwesomeIcon icon="fa-solid fa-circle-user" /> */}
        <NavLink
          className="main-nav-item"
          to="/login"
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          {user ? "Logout" : "Sign In"}
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
