import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importer les fonctions API du service
import {
  getUserProfileApi,
  updateUserProfileApi,
} from "../../services/apiService";

// Les fonctions simulées getUserProfileAPI et updateUserProfileAPI sont supprimées
// BASE_URL n'est plus nécessaire ici

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
