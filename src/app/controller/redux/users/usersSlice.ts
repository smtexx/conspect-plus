import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { I_User } from '../../../model/typesModel';

const initialState: I_User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsers: (state, action: PayloadAction<I_User[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
    createUser: (state, action: PayloadAction<string>) => {
      state.push({
        login: action.payload,
        isActive: false,
        created: new Date().toString(),
        lastActivity: new Date().toString(),
        notes: 0,
      });
    },
    setActiveUser: (
      state,
      action: PayloadAction<I_User['login']>
    ) => {
      const user = state.find(
        (user) => user.login === action.payload
      );
      if (user) {
        state.forEach((user) => (user.isActive = false));
        user.isActive = true;
      }
    },
    updateUserActivity: (state, action: PayloadAction<string>) => {
      const activeUser = state.find((user) => user.isActive);
      if (activeUser) {
        activeUser.lastActivity = action.payload;
      }
    },
    setNotesQty: (state, action: PayloadAction<number>) => {
      const activeUser = state.find((user) => user.isActive);
      if (activeUser) {
        activeUser.notes = action.payload;
      }
    },
  },
});

export const {
  createUser,
  setActiveUser,
  updateUserActivity,
  loadUsers,
  setNotesQty,
} = usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;

// Selectors
export const selectUsers = (state: RootState) => state.users;
export const selectActiveUser = (state: RootState) =>
  state.users.find((user) => user.isActive);
