import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth-slice';
import { createApi } from '../http/api';

const api = createApi();

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
