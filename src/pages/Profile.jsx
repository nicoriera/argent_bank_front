import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../features/user/userSlice";
import Account from "../components/Account";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { firstName, lastName, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Charger les données du profil utilisateur
    dispatch(getUserProfile());
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    // Mettre à jour les champs d'édition lorsque les données utilisateur sont chargées
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  }, [firstName, lastName]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Réinitialiser les champs d'édition
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        firstName: editedFirstName,
        lastName: editedLastName,
      })
    );
    setIsEditing(false);
  };

  // Données de compte simulées
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {error && <div className="error-message">{error}</div>}
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          </>
        ) : (
          <div className="edit-profile-form">
            <h1>Edit user info</h1>
            <form onSubmit={handleSave}>
              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="button-group">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
};

export default Profile;
