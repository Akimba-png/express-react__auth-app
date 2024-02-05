import { AxiosError } from 'axios';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../const';
import { User } from '../../models/user';
import { createAppAsyncThunk } from './../../utils/store';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../slices/auth-slice';
import { tokenService } from '../../services/token-service';

const checkAuth = createAppAsyncThunk<User>(
  'auth/checkAuth',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.get<User>(ApiRoute.Login);
      return response.data
    } catch (error) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  }
);

export const checkAuthReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(checkAuth.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });
  builder.addCase(checkAuth.fulfilled, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.Auth;
    state.user = action.payload;
    tokenService.setToken(action.payload.accessToken);
  });
  builder.addCase(checkAuth.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
