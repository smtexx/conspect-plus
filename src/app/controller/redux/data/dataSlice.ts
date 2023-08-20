import {
  PayloadAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  E_PageType,
  I_Conspect,
  I_Draft,
  I_LinkToken,
  I_Linkset,
  I_LinksetDraft,
  I_Page,
  I_PageDraft,
  I_UserData,
  T_Token,
} from '../../../model/typesModel';
import { createID } from '../../utils';
import { RootState } from '../store';
import { parse } from '../../parser';

const initialState: I_UserData = {
  conspects: [],
  linksets: [],
  drafts: [],
  recent: {
    notes: [],
    links: [],
  },
  tip: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData: (state) => {
      Object.assign(state, initialState);
    },

    loadData: (state, action: PayloadAction<I_UserData>) => {
      Object.assign(state, action.payload);
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
      action: PayloadAction<I_Draft['id']>
    ) => {
      state.drafts = state.drafts.filter(
        (d) => d.id !== action.payload
      );
    },

    createPage: (state, action: PayloadAction<I_PageDraft>) => {
      const { conspectID, sectionID, id: pageID } = action.payload;
      const pages = state.conspects
        .find((c) => c.id === conspectID)
        ?.sections.find((s) => s.id === sectionID)?.pages;

      if (pages !== undefined) {
        const newPage: I_Page = {
          ...action.payload,
          saved: new Date().toString(),
          tokens: parse(action.payload.markup) as Exclude<
            T_Token,
            I_LinkToken
          >[],
        };

        const newPageIndex = pages.findIndex((p) => p.id === pageID);

        if (newPageIndex === -1) {
          pages.push(newPage);
        } else {
          pages.splice(newPageIndex, 1, newPage);
        }

        // Delete corresponding draft
        state.drafts = state.drafts.filter((d) => d.id !== pageID);
      }
    },

    changeTip: (state, action: PayloadAction<{ html: string }>) => {
      state.tip = action.payload.html;
    },

    addDraft: (
      state,
      action: PayloadAction<I_PageDraft | I_LinksetDraft>
    ) => {
      const draftIndex = state.drafts.findIndex(
        (d) => d.id === action.payload.id
      );
      if (draftIndex === -1) {
        state.drafts.push(action.payload);
      } else {
        state.drafts.splice(draftIndex, 1, action.payload);
      }
    },

    deletePage: (
      state,
      action: PayloadAction<{
        conspectID: string;
        sectionID: string;
        pageID: string;
      }>
    ) => {
      const sections = state.conspects
        .find((c) => c.id === action.payload.conspectID)
        ?.sections.find((s) => s.id === action.payload.sectionID);

      if (sections) {
        sections.pages = sections.pages.filter(
          (p) => p.id !== action.payload.pageID
        );
      }
    },

    createLinksetDraft: (
      state,
      action: PayloadAction<I_LinksetDraft['id']>
    ) => {
      state.drafts.push({
        type: E_PageType.LINKSET,
        id: action.payload,
        title: '',
        description: '',
        created: new Date().toString(),
        saved: new Date().toString(),
        markup: '',
      });
    },

    createLinkset: (state, action: PayloadAction<I_LinksetDraft>) => {
      const newLinkset: I_Linkset = {
        ...action.payload,
        saved: new Date().toString(),
        tokens: parse(action.payload.markup) as I_LinkToken[],
      };

      const linksetIndex = state.linksets.findIndex(
        (l) => l.id === newLinkset.id
      );

      if (linksetIndex === -1) {
        state.linksets.push(newLinkset);
      } else {
        state.linksets.splice(linksetIndex, 1, newLinkset);
      }

      // Delete corresponding draft
      state.drafts = state.drafts.filter(
        (d) => d.id !== newLinkset.id
      );
    },

    deleteLinkset: (
      state,
      action: PayloadAction<I_Linkset['id']>
    ) => {
      state.linksets = state.linksets.filter(
        (l) => l.id !== action.payload
      );
      state.drafts = state.drafts.filter(
        (d) => d.id !== action.payload
      );
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
  loadData,
  addDraft,
  deletePage,
  createLinksetDraft,
  createLinkset,
  deleteLinkset,
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

export const selectRecent = (state: RootState) => state.data.recent;

export const selectDrafts = (state: RootState) => state.data.drafts;

export const selectLinksets = (state: RootState) =>
  state.data.linksets;

export const selectLinkset = (
  state: RootState,
  linksetID: I_Linkset['id']
) => state.data.linksets.find((l) => l.id === linksetID);
