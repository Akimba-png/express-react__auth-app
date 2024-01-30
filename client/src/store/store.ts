import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../slices/auth-slice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});
