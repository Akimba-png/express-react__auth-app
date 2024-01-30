import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { AuthStatus } from '../const';

type AuthState = {
  user: User;
  authStatus: AuthStatus;
};

const authState: AuthState = {
  user: {
    id: '',
    name: '',
    email: '',
    accessToken: '',
  },
  authStatus: AuthStatus.Unknown,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: authState,
  reducers: {},
});
