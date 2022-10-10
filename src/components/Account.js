import React from "react";

const Account = ({ accountName, amount, balance }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountName}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{balance}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

export default Account;
