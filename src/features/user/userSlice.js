import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importer les fonctions API du service
import {
  getUserProfileApi,
  updateUserProfileApi,
} from "../../services/apiService";

// Les fonctions simulées getUserProfileAPI et updateUserProfileAPI sont supprimées
// BASE_URL n'est plus nécessaire ici

/**
 * Thunk asynchrone pour récupérer le profil utilisateur depuis l'API.
 * À utiliser avec `dispatch` depuis un composant React.
 * Gère les états `isLoading` et `error` dans le state Redux `user`.
 *
 * @example
 * import { useDispatch, useSelector } from 'react-redux';
 * import { getUserProfile } from './userSlice';
 *
 * const MyComponent = () => {
 *   const dispatch = useDispatch();
 *   const { isLoading, error } = useSelector((state) => state.user);
 *
 *   useEffect(() => {
 *     dispatch(getUserProfile());
 *   }, [dispatch]);
 *
 *   // ...
 * };
 */
export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue("Aucun token trouvé");
      }

      // Appeler la fonction du service API
      const data = await getUserProfileApi(token);
      // Le service retourne directement le corps de la réponse (le profil)
      return data;
    } catch (error) {
      // L'erreur gérée par handleApiResponse dans le service est relancée
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk asynchrone pour mettre à jour le prénom et le nom de l'utilisateur.
 * À utiliser avec `dispatch` depuis un composant React.
 * Gère les états `isLoading` et `error` dans le state Redux `user`.
 *
 * @param {object} userData - Un objet contenant les nouvelles données utilisateur.
 * @param {string} userData.firstName - Le nouveau prénom.
 * @param {string} userData.lastName - Le nouveau nom de famille.
 *
 * @example
 * import { useDispatch } from 'react-redux';
 * import { updateUserProfile } from './userSlice';
 *
 * const SettingsForm = () => {
 *   const dispatch = useDispatch();
 *
 *   const handleSubmit = (formData) => {
 *     dispatch(updateUserProfile({ firstName: formData.firstName, lastName: formData.lastName }));
 *   };
 *
 *   // ...
 * };
 */
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue("Aucun token trouvé");
      }

      // Appeler la fonction du service API
      const data = await updateUserProfileApi(token, userData);
      // Le service retourne directement le corps de la réponse (profil mis à jour)
      // Retourner seulement firstName et lastName pour correspondre à l'ancien comportement du reducer
      return {
        firstName: data.firstName,
        lastName: data.lastName,
      };
    } catch (error) {
      // L'erreur gérée par handleApiResponse dans le service est relancée
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  firstName: "",
  lastName: "",
  email: "", // Garder email dans l'état initial
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Action pour réinitialiser les données utilisateur dans le state Redux.
     * Utile par exemple lors de la déconnexion.
     * À utiliser avec `dispatch` depuis un composant React.
     *
     * @example
     * import { useDispatch } from 'react-redux';
     * import { clearUserData } from './userSlice';
     *
     * const LogoutButton = () => {
     *   const dispatch = useDispatch();
     *
     *   const handleLogout = () => {
     *     // ... autres actions de déconnexion
     *     dispatch(clearUserData());
     *   };
     *
     *   // ...
     * };
     */
    clearUserData: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.isLoading = false; // Assurer la réinitialisation complète
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email; // Mettre à jour l'email aussi
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        // L'email n'est pas mis à jour ici car l'API ne le permet pas
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
