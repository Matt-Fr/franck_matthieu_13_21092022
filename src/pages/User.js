import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";

const User = () => {
  const { isLoading, user, authToken } = useSelector((store) => store.user);
  const { firstName, lastName } = user;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      alert("please fill out all fields");
    }
    dispatch(updateUser(authToken));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
    console.log(`${name} ${value}`);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${firstName} ${lastName}!`}
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstName">Firstname</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="LastName">Lastname</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <button className="edit-button" type="submit" disabled={isLoading}>
            {isLoading ? "isLoading..." : "Save Name"}
          </button>
        </form>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
