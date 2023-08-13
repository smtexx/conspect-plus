import {
  PayloadAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  E_PageType,
  I_Conspect,
  I_Page,
  I_PageDraft,
  I_UserData,
} from '../../../model/typesModel';
import { createID } from '../../utils';
import { RootState } from '../store';
import { parse } from '../../parser';

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

    deleteSection: (
      state,
      action: PayloadAction<{ conspectID: string; sectionID: string }>
    ) => {
      const conspect = state.conspects.find(
        (c) => c.id === action.payload.conspectID
      );
      if (conspect !== undefined) {
        conspect.sections = conspect.sections.filter(
          (s) => s.id !== action.payload.sectionID
        );
      }
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

    deletePageDraft: (
      state,
      action: PayloadAction<{ draftID: string }>
    ) => {
      state.drafts = state.drafts.filter(
        (d) => d.id !== action.payload.draftID
      );
    },

    createPage: (state, action: PayloadAction<I_PageDraft>) => {
      const conspect = state.conspects.find(
        (c) => c.id === action.payload.conspectID
      );
      if (conspect !== undefined) {
        const section = conspect.sections.find(
          (s) => s.id === action.payload.sectionID
        );
        if (section) {
          const newPage: I_Page = {
            ...action.payload,
            tokens: parse(action.payload.markup),
          };
          section.pages.push(newPage);
        }
      }
    },

    changeTip: (state, action: PayloadAction<{ html: string }>) => {
      state.tip = action.payload.html;
    },
  },
});

export const {
  clearData,
  createConspect,
  editConspect,
  deleteConspect,
  createSection,
  editSection,
  deleteSection,
  createPageDraft,
  deletePageDraft,
  createPage,
  changeTip,
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

export const selectTip = (state: RootState) => state.data.tip;
