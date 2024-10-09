// store.js (or wherever your store is configured)
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Authslice";

const getInitialAuthState = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isRegistered = localStorage.getItem("isRegistered") === "true";
  const firstName = localStorage.getItem("firstName");

  return {
    isLoggedIn,
    isRegistered,
    firstName: firstName || null, // Ensure it returns null if firstName is not set
  };
};

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: getInitialAuthState(), // Set initial state from local storage
  },
});
