import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/usersSlice';
import { dataReducer } from './data/dataSlice';
import { appReducer } from './app/appSlice';
import { markUnsaved } from './middleware';

export const store = configureStore({
  reducer: {
    app: appReducer,
    users: usersReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(markUnsaved),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
