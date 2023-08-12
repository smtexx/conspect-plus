import {
  PayloadAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { I_Conspect, I_UserData } from '../../../model/typesModel';
import { createID } from '../../utils';
import { RootState } from '../store';

const initialState: I_UserData = {
  conspects: [],
  linksets: [],
  drafts: [],
  viewed: {
    pages: [],
    links: [],
  },
  tip: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData: (state) => {
      state = initialState;
    },

    createConspect: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      const newConspect: I_Conspect = {
        id: createID(),
        title: action.payload.title,
        description: action.payload.description,
        created: new Date().toString(),
        saved: new Date().toString(),
        sections: [],
      };

      state.conspects.push(newConspect);
    },

    createSection: (
      state,
      action: PayloadAction<{ conspectID: string; title: string }>
    ) => {
      const conspect = state.conspects.find(
        (c) => c.id === action.payload.conspectID
      );

      if (conspect !== undefined) {
        conspect.sections.push({
          id: createID(),
          title: action.payload.title,
          created: new Date().toString(),
          saved: new Date().toString(),
          pages: [],
        });
      }
    },

    editConspect: (
      state,
      action: PayloadAction<{
        conspectID: string;
        title: string;
        description: string;
      }>
    ) => {
      const conspect = state.conspects.find(
        (c) => c.id === action.payload.conspectID
      );

      if (conspect !== undefined) {
        conspect.title = action.payload.title;
        conspect.description = action.payload.description;
      }
    },
  },
});

export const {
  clearData,
  createConspect,
  createSection,
  editConspect,
} = dataSlice.actions;
export const { reducer: dataReducer } = dataSlice;

// Selectors
export const selectConspects = (state: RootState) =>
  state.data.conspects;

export const selectConspect = createSelector(
  [
    (state: RootState) => state.data.conspects,
    (state, conspectID: string) => conspectID,
  ],
  (conspects, conspectID) => {
    return conspects.find((c) => c.id === conspectID);
  }
);
