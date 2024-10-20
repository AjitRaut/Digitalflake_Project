// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authslice";

const getInitialAuthState = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isRegistered = localStorage.getItem("isRegistered") === "true";
  const firstName = localStorage.getItem("firstName");

  return {
    isLoggedIn,
    isRegistered,
    firstName: firstName || null,
  };
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: getInitialAuthState(),
  },
});

export default store; // Default export
