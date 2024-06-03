import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../servises/slices/authSlice';
import tasksReducer from '../servises/slices/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
