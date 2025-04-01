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
    <main className="flex-1 bg-purple-950">
      <div className="text-white mb-8">
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-200 p-2.5 mb-4 rounded">
            {error}
          </div>
        )}
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 cursor-pointer"
              onClick={handleEdit}>
              Edit Name
            </button>
          </>
        ) : (
          <div className="mx-auto w-4/5 max-w-lg">
            <h1>Edit user info</h1>
            <form onSubmit={handleSave}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col text-left mb-4">
                  <label htmlFor="firstName" className="font-bold">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    className="p-1.5 text-lg border border-gray-300 rounded text-black"
                    required
                  />
                </div>
                <div className="flex flex-col text-left mb-4">
                  <label htmlFor="lastName" className="font-bold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    className="p-1.5 text-lg border border-gray-300 rounded text-black"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4 mr-2 cursor-pointer">
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white font-bold py-2 px-4 cursor-pointer"
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
