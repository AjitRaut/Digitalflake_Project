// Features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
    setLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setLogin } = authSlice.actions; // Ensure this line is correct
export default authSlice.reducer;
