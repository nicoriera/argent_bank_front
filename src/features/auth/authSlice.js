import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulons un service d'API pour l'instant
// Plus tard, nous créerons un véritable service d'API
const loginAPI = async (credentials) => {
  // Simulons une requête API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        credentials.email === "tony@stark.com" &&
        credentials.password === "password123"
      ) {
        resolve({
          status: 200,
          message: "Login successful",
          body: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRvbnkgU3RhcmsiLCJpYXQiOjE1MTYyMzkwMjJ9",
          },
        });
      } else {
        resolve({
          status: 400,
          message: "Invalid credentials",
          body: {},
        });
      }
    }, 1000);
  });
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      if (response.status === 200) {
        // Stocker le token dans le localStorage si "remember me" est coché
        if (credentials.rememberMe) {
          localStorage.setItem("token", response.body.token);
        } else {
          sessionStorage.setItem("token", response.body.token);
        }
        return response.body;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  return null;
});

const initialState = {
  token:
    localStorage.getItem("token") || sessionStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  isAuthenticated: !!(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  ),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
