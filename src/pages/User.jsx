import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../features/user/userSlice";

const User = () => {
  const { firstName, lastName } = useSelector((state) => state.user);

  const fullName = `${firstName} ${lastName}`;

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    } else {
      console.error("Aucun token trouvé, impossible de récupérer le profil.");
      // Gérer l'absence de token (redirection, etc.)
    }
  }, [dispatch, token]); // Dépendances : dispatch et token

  const handleEditName = () => {
    console.log("Edit Name");
  };

  return (
    <main className="user-page">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {fullName}!
        </h1>
        <button className="edit-button" onClick={handleEditName}>
          Edit Name
        </button>
      </div>
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
