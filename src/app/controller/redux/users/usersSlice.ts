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
    addUser: (state, action: PayloadAction<I_User>) => {
      state.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<I_User['login']>) => {
      const userIndex = state.findIndex(
        (u) => u.login === action.payload
      );
      if (userIndex !== -1) {
        state.splice(userIndex, 1);
      }
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
  addUser,
  setActiveUser,
  updateUserActivity,
  loadUsers,
  setNotesQty,
  deleteUser,
} = usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;

// Selectors
export const selectUsers = (state: RootState) => state.users;
export const selectActiveUser = (state: RootState) =>
  state.users.find((user) => user.isActive);
