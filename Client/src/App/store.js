import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Authslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
