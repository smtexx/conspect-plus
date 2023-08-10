import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/usersSlice';
import { dataReducer } from './data/dataSlice';

export const store = configureStore({
  reducer: { users: usersReducer, data: dataReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
