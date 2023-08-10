import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { I_User } from '../../../model/typesModel';

const initialState: I_User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<string>) => {
      state.push({
        login: action.payload,
        isActive: false,
        created: new Date().toString(),
        lastActivity: new Date().toString(),
        notes: 0,
      });
    },
    setUserActive: (state, action: PayloadAction<string>) => {
      const user = state.find(
        (user) => user.login === action.payload
      );
      if (user) {
        state.forEach((user) => (user.isActive = false));
        user.isActive = true;
      }
    },
    updateUserActivity: (state) => {
      const activeUser = state.find((user) => user.isActive);
      if (activeUser) {
        activeUser.lastActivity = new Date().toString();
      }
    },
  },
});

export const { createUser, setUserActive, updateUserActivity } =
  usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;

// Selectors
export const selectUsers = (state: RootState) => state.users;
export const selectActiveUser = (state: RootState) =>
  state.users.find((user) => user.isActive);
