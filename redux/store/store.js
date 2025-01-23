import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';
import { todosApi } from '../services/todosApi';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});