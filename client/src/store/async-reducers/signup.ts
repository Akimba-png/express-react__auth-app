import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthState } from '../slices/auth-slice';
import { tokenService } from '../../services/token-service';
import { RegData, User } from '../../models/user';
import { createAppAsyncThunk } from '../../utils/store';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../const';

export const signup = createAppAsyncThunk<User, RegData>(
  'auth/signup',
  async (regData, {extra, rejectWithValue}) => {
    try {
      const response = await extra.post(ApiRoute.signup, regData);
      return response.data;
    } catch (error: unknown) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createSignupReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(signup.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });
  builder.addCase(signup.fulfilled, (state, action) => {
    state.user = action.payload;
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.Auth;
    tokenService.setToken(action.payload.accessToken);
  });
  builder.addCase(signup.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
