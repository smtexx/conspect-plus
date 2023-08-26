import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/usersSlice';
import { dataReducer } from './data/dataSlice';
import { appReducer } from './app/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    users: usersReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
