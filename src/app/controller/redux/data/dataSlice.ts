import {
  PayloadAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  E_PageType,
  I_Conspect,
  I_UserData,
} from '../../../model/typesModel';
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

    deleteConspect: (
      state,
      action: PayloadAction<{ conspectID: string }>
    ) => {
      state.conspects = state.conspects.filter(
        (c) => c.id !== action.payload.conspectID
      );
    },

    createPageDraft: (
      state,
      action: PayloadAction<{
        pageID: string;
        conspectID: string;
        sectionID: string;
      }>
    ) => {
      state.drafts.push({
        conspectID: action.payload.conspectID,
        sectionID: action.payload.sectionID,
        id: action.payload.pageID,
        title: '',
        created: new Date().toString(),
        saved: new Date().toString(),
        markup: '',
        type: E_PageType.PAGE,
      });
    },

    editSection: (
      state,
      action: PayloadAction<{
        conspectID: string;
        sectionID: string;
        title: string;
      }>
    ) => {
      const conspect = state.conspects.find(
        (c) => c.id === action.payload.conspectID
      );
      if (conspect !== undefined) {
        const section = conspect.sections.find(
          (s) => s.id === action.payload.sectionID
        );
        if (section !== undefined) {
          section.title = action.payload.title;
        }
      }
    },
  },
});

export const {
  clearData,
  createConspect,
  createSection,
  editConspect,
  deleteConspect,
  createPageDraft,
  editSection,
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
