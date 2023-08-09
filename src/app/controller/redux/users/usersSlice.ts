import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { I_User } from '../../../model/typesModel';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as I_User[],
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
  },
});

export const { createUser, setUserActive } = usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;

// Selectors
export const selectUsers = (state: RootState) => state.users;
export const selectActiveUser = (state: RootState) =>
  state.users.find((user) => user.isActive);
