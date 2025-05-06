import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = storedUser || {
  name: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { name } = action.payload;
      state.name = name;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ name }));
    },
    logout: (state) => {
      state.name = '';
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { signUp, logout } = userSlice.actions;
export default userSlice.reducer;
