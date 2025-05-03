import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = storedUser || {
  name: localStorage.getItem('username') || '',
  email: localStorage.getItem('email') || '',
  isAuthenticated: !!localStorage.getItem('username'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ name, email }));
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { signUp, logout } = userSlice.actions;
export default userSlice.reducer;
