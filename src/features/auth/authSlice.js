import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importer la fonction loginApi du service
import { loginApi } from "../../services/apiService";

// Thunk asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Appeler la fonction du service API
      const data = await loginApi(credentials);
      // Le service retourne directement le corps de la réponse contenant le token
      return data.token;
    } catch (error) {
      // L'erreur gérée par handleApiResponse dans le service
      // est relancée et capturée ici.
      // error.message contient le message d'erreur formaté.
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  // user: null, // Le profil utilisateur sera géré par userSlice
  token: null,
  isLoading: false, // Ajouter isLoading
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // L'ancien reducer login est supprimé
    logout: (state) => {
      state.isAuthenticated = false;
      // state.user = null;
      state.token = null;
      state.error = null;
      state.isLoading = false; // Réinitialiser isLoading au logout
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false; // S'assurer que non authentifié pendant le chargement
        state.token = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload; // Stocker le token reçu
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload; // Stocker le message d'erreur
      });
  },
});

export const { logout, clearError } = authSlice.actions; // Ne plus exporter l'ancien login
export default authSlice.reducer;
