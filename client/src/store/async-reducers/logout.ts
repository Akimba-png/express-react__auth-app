import { AxiosError } from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState, DEFAULT_USER } from '../slices/auth-slice';
import { tokenService } from '../../services/token-service';
import { createAppAsyncThunk } from './../../utils/store';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../const';

export const logout = createAppAsyncThunk<void>(
  'auth/logout',
  async (_, { extra, rejectWithValue }) => {
    try {
      await extra.delete<void>(ApiRoute.Logout);
    } catch (error) {
      const e = error as AxiosError<{ message: string }>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createLogoutReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(logout.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });
  builder.addCase(logout.fulfilled, (state) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.NotAuth;
    state.user = DEFAULT_USER;
    tokenService.resetToken();
  });
  builder.addCase(logout.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
