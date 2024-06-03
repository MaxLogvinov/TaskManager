import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/utils/types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      const { email, password } = action.payload;
      if (email === 'user@user.com' && password === '12345') {
        state.isAuthenticated = true;
        state.user = { email, role: 'user' };
      } else if (email === 'admin@admin.com' && password === '67890') {
        state.isAuthenticated = true;
        state.user = { email, role: 'admin' };
      } else {
        alert('Неверный email или пароль');
        return;
      }
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
