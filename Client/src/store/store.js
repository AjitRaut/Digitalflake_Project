import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authslice"; 

const getInitialAuthState = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return {
    isLoggedIn,
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

export default store;