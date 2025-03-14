import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulons un service d'API pour l'instant
// Plus tard, nous créerons un véritable service d'API
const getUserProfileAPI = async (token) => {
  // Simulons une requête API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (token) {
        resolve({
          status: 200,
          message: "Profile retrieved",
          body: {
            firstName: "Tony",
            lastName: "Stark",
            email: "tony@stark.com",
          },
        });
      } else {
        resolve({
          status: 401,
          message: "Unauthorized",
          body: {},
        });
      }
    }, 1000);
  });
};

const updateUserProfileAPI = async (token, userData) => {
  // Simulons une requête API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (token) {
        resolve({
          status: 200,
          message: "Profile updated",
          body: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: "tony@stark.com",
          },
        });
      } else {
        resolve({
          status: 401,
          message: "Unauthorized",
          body: {},
        });
      }
    }, 1000);
  });
};

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await getUserProfileAPI(auth.token);
      if (response.status === 200) {
        return response.body;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await updateUserProfileAPI(auth.token, userData);
      if (response.status === 200) {
        return response.body;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
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
        state.email = action.payload.email;
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
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
