import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      console.log(action.payload);
      const { email, username, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = username;
      state.userId = userId;
    },

    removeActiveUser: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

export const { setActiveUser, removeActiveUser } = authSlice.actions;

// to be able to select the states from any component
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.username;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
