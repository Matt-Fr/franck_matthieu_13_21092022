import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const [values, setValues] = useState(initialState);
  //{user} que je récupère du store
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}${value}`);
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isMember } = values;
    if (!email || !password) {
      console.log("please fill out all fields");
    }
    //on récupère loginUser from the userSlice
    dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        {/* <i className="fa fa-user-circle sign-in-icon"></i> */}
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="email"
              id="username"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Signin;
