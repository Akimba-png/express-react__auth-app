import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { AuthStatus, LoadingStatus } from '../../const';
import { createSignupReducer } from '../async-reducers/signup';
import { createLoginReducer } from '../async-reducers/login';

export type AuthState = {
  user: User;
  authStatus: AuthStatus;
  loadingStatus: LoadingStatus;
  error: string;
};

const authState: AuthState = {
  user: {
    id: '',
    name: '',
    email: '',
    accessToken: '',
  },
  authStatus: AuthStatus.Unknown,
  loadingStatus: LoadingStatus.Idle,
  error: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: authState,
  reducers: {},
  extraReducers: (builder) => {
    createSignupReducer(builder);
    createLoginReducer(builder);
  },
});
