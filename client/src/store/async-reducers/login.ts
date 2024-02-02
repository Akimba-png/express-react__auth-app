import { AxiosError } from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../slices/auth-slice';
import { tokenService } from '../../services/token-service';
import { Credentials, User } from '../../models/user';
import { createAppAsyncThunk } from './../../utils/store';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../const';

export const login = createAppAsyncThunk<User, Credentials>(
  'auth/login',
  async (credentials: Credentials, { extra, rejectWithValue }) => {
    try {
      const response = await extra.post<User>(ApiRoute.Login, credentials);
      return response.data;
    } catch (error) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createLoginReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(login.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });
  builder.addCase(login.fulfilled, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.user = action.payload;
    state.authStatus = AuthStatus.Auth;
    tokenService.setToken(action.payload.accessToken);
  });
  builder.addCase(login.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
