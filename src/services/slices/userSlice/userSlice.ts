import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './fetchUser';

interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    isAuthCheckedSelect: (state) => state.isAuthChecked,
    errorSelect: (state) => state.error,
    isLoadingSelect: (state) => state.isLoading,
    userSelect: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе выхода: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе обновления: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      // getUser
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе загрузки: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = `Ошибка в процессе входа: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе регистрации: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      // checkUserAuth
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = `Пользователь не зарегистрирован: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      });
  }
});

export const { authChecked, clearError } = userSlice.actions;
export const { userSelect, isAuthCheckedSelect, errorSelect, isLoadingSelect } =
  userSlice.selectors;
