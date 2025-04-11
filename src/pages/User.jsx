import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../features/user/userSlice";

const User = () => {
  const { firstName, lastName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // State pour gérer l'édition
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);

  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    } else {
      console.error("Aucun token trouvé, impossible de récupérer le profil.");
      // Gérer l'absence de token (redirection, etc.)
    }
  }, [dispatch, token]); // Dépendances : dispatch et token

  // Initialiser les champs d'édition lorsque le prénom/nom change (au cas où le profil est chargé après le montage initial)
  useEffect(() => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  }, [firstName, lastName]);

  const handleEditFullName = () => {
    setIsEditing(true);
    // Pas besoin d'initialiser ici si on le fait dans l'useEffect ci-dessus
  };

  const handleSaveFullName = () => {
    // Dispatch l'action pour mettre à jour le profil utilisateur
    dispatch(
      updateUserProfile({
        firstName: editedFirstName,
        lastName: editedLastName,
      })
    );
    setIsEditing(false); // Masquer le formulaire après la sauvegarde
  };

  const handleCancelFullName = () => {
    setIsEditing(false); // Masquer le formulaire
    // Réinitialiser les champs aux valeurs originales (du store Redux)
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  };

  return (
    <main className="user-page">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {fullName}!
            </h1>
            <button className="button edit-button" onClick={handleEditFullName}>
              Edit Name
            </button>
          </>
        ) : (
          <>
            <h1>Welcome back</h1> {/* Afficher le titre même en mode édition */}
            <div className="edit-name-form">
              <div className="edit-name-inputs">
                <input
                  type="text"
                  value={editedFirstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
              <div className="edit-name-buttons">
                <button
                  className="button save-button"
                  onClick={handleSaveFullName}>
                  Save
                </button>
                <button
                  className="button cancel-button"
                  onClick={handleCancelFullName}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="button transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="button transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="button transaction-button">
            View transactions
          </button>
        </div>
      </section>
    </main>
  );
};

export default User;
