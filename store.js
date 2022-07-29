import { configureStore } from '@reduxjs/toolkit';
import userScoreSlice  from './createSlice';

export const store = configureStore({
  reducer: {
    userscore : userScoreSlice,
  },
})