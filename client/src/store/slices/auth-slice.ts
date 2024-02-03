import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { AuthStatus, LoadingStatus } from '../../const';
import { createSignupReducer } from '../async-reducers/signup';
import { createLoginReducer } from '../async-reducers/login';
import { createLogoutReducer } from '../async-reducers/logout';

export const DEFAULT_USER: User = {
  id: '',
  name: '',
  email: '',
  accessToken: '',
};

export type AuthState = {
  user: User;
  authStatus: AuthStatus;
  loadingStatus: LoadingStatus;
  error: string;
};

const authState: AuthState = {
  user: DEFAULT_USER,
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
    createLogoutReducer(builder);
  },
});
