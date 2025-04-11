import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getUserProfile, updateUserProfile } from "../features/user/userSlice";
import AccountSection from "../components/AccountSection";

// Données statiques pour les comptes (à remplacer par des données dynamiques)
const accountData = [
  {
    id: "checking-8349",
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
  },
  {
    id: "savings-6712",
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
  },
  {
    id: "credit-card-8349",
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance",
  },
];

const User = () => {
  const { firstName, lastName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // State pour gérer l'édition
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(firstName || "");
  const [editedLastName, setEditedLastName] = useState(lastName || "");

  // Obtenir l'état de chargement et les erreurs potentiels pour le profil utilisateur
  const { isLoading: isProfileLoading, error: updateProfileError } =
    useSelector((state) => state.user);

  // Erreur spécifique au chargement initial du profil (si besoin de les distinguer)
  const initialProfileLoadError = useSelector((state) => state.user.error);

  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    } else {
      toast.error("Authentication token not found. Please log in.");
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!isEditing) {
      setEditedFirstName(firstName || "");
      setEditedLastName(lastName || "");
    }
  }, [firstName, lastName, isEditing]);

  const handleEditFullName = () => {
    setEditedFirstName(firstName || "");
    setEditedLastName(lastName || "");
    setIsEditing(true);
  };

  const handleSaveFullName = async (e) => {
    e.preventDefault();

    const trimmedFirstName = editedFirstName.trim();
    const trimmedLastName = editedLastName.trim();

    // Validation: non vide
    if (!trimmedFirstName || !trimmedLastName) {
      toast.error("First name and last name cannot be empty.");
      return;
    }

    // Validation: lettres, espaces, apostrophes, tirets uniquement
    // Regex: ^           => début de la chaîne
    //        [a-zA-Z\s'-]+ => une ou plusieurs lettres (maj/min), espaces, apostrophes, tirets
    //        $           => fin de la chaîne
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
      toast.error(
        "Name and last name can only contain letters, spaces, apostrophes, or hyphens."
      );
      return;
    }

    const saveToast = toast.loading("Saving profile...");

    try {
      await dispatch(
        updateUserProfile({
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
        })
      ).unwrap();

      toast.success("Profile updated successfully!", { id: saveToast });
      setIsEditing(false);
    } catch (err) {
      const errorMessage =
        err?.message ||
        updateProfileError ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage, { id: saveToast });
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancelFullName = () => {
    setIsEditing(false);
  };

  return (
    <main
      className={`user-page ${
        isProfileLoading && !firstName ? "loading" : ""
      }`}>
      <div className="header">
        {isProfileLoading && !firstName && <p>Loading profile...</p>}
        {initialProfileLoadError &&
          !firstName &&
          toast.error(`Error loading profile: ${initialProfileLoadError}`, {
            toastId: "load-profile-error",
          })}

        {firstName && (
          <>
            {!isEditing ? (
              <>
                <h1>
                  Welcome back
                  <br />
                  {fullName}!
                </h1>
                <button
                  className="button edit-button"
                  onClick={handleEditFullName}>
                  Edit Name
                </button>
              </>
            ) : (
              <form onSubmit={handleSaveFullName} className="edit-name-form">
                <h1>Welcome back</h1>
                <div className="edit-name-inputs">
                  <label htmlFor="editedFirstName" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="editedFirstName"
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    placeholder="First Name"
                    aria-label="First Name"
                    disabled={isProfileLoading}
                  />
                  <label htmlFor="editedLastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="editedLastName"
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    placeholder="Last Name"
                    aria-label="Last Name"
                    disabled={isProfileLoading}
                  />
                </div>
                <div className="edit-name-buttons">
                  <button
                    type="submit"
                    className="button save-button"
                    disabled={isProfileLoading}>
                    {isProfileLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="button cancel-button"
                    onClick={handleCancelFullName}
                    disabled={isProfileLoading}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
      {accountData.map((account) => (
        <AccountSection
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
};

export default User;
