import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import themeReducer from './themeSlice';
import postReducer from './postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    posts: postReducer,
  },
});
