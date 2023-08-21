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
  I_RecentLink,
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
      const { conspectID } = action.payload;

      state.conspects = state.conspects.filter(
        (c) => c.id !== conspectID
      );

      // Delete drafts
      state.drafts = state.drafts.filter((d) => {
        if (
          d.type === E_PageType.PAGE &&
          d.conspectID === conspectID
        ) {
          return false;
        }

        return true;
      });

      // Delete recent links
      state.recent.notes = state.recent.notes.filter(
        (n) => !n.href.startsWith(`/conspect/${conspectID}/`)
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
      const { conspectID, sectionID } = action.payload;

      const conspect = state.conspects.find(
        (c) => c.id === conspectID
      );

      if (conspect !== undefined) {
        conspect.sections = conspect.sections.filter(
          (s) => s.id !== sectionID
        );

        // Delete drafts
        state.drafts = state.drafts.filter((d) => {
          if (
            d.type === E_PageType.PAGE &&
            d.conspectID === conspectID &&
            d.sectionID === sectionID
          ) {
            return false;
          }
          return true;
        });

        // Delete recent links
        state.recent.notes = state.recent.notes.filter(
          (n) => !n.href.startsWith(`/${conspectID}/${sectionID}/`)
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
      const newDraft = {
        conspectID: action.payload.conspectID,
        sectionID: action.payload.sectionID,
        id: action.payload.pageID,
        title: '',
        created: new Date().toString(),
        saved: new Date().toString(),
        markup: '',
        type: E_PageType.PAGE,
      };

      insertElement(newDraft, state.drafts);
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

        insertElement(newPage, pages);

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
      insertElement(action.payload, state.drafts);
    },

    deletePage: (
      state,
      action: PayloadAction<{
        conspectID: string;
        sectionID: string;
        pageID: string;
      }>
    ) => {
      const { conspectID, sectionID, pageID } = action.payload;

      const sections = state.conspects
        .find((c) => c.id === conspectID)
        ?.sections.find((s) => s.id === sectionID);

      if (sections !== undefined) {
        sections.pages = sections.pages.filter(
          (p) => p.id !== pageID
        );

        // Delete drafts
        state.drafts = state.drafts.filter((d) => d.id !== pageID);

        // Delete recent links
        state.recent.notes = state.recent.notes.filter(
          (n) =>
            !n.href.startsWith(
              `/${conspectID}/${sectionID}/${pageID}`
            )
        );
      }
    },

    createLinksetDraft: (
      state,
      action: PayloadAction<I_LinksetDraft['id']>
    ) => {
      const newDraft = {
        type: E_PageType.LINKSET,
        id: action.payload,
        title: '',
        description: '',
        created: new Date().toString(),
        saved: new Date().toString(),
        markup: '',
      };

      insertElement(newDraft, state.drafts);
    },

    createLinkset: (state, action: PayloadAction<I_LinksetDraft>) => {
      const newLinkset: I_Linkset = {
        ...action.payload,
        saved: new Date().toString(),
        tokens: parse(action.payload.markup) as I_LinkToken[],
      };

      insertElement(newLinkset, state.linksets);

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

      // Delete drafts
      state.drafts = state.drafts.filter(
        (d) => d.id !== action.payload
      );
    },

    updateRecentLinks: (
      state,
      action: PayloadAction<Omit<I_RecentLink, 'date'>>
    ) => {
      const link: I_RecentLink = {
        ...action.payload,
        date: new Date().toString(),
      };

      if (link.href.startsWith('/conspect')) {
        updateRecent(link, state.recent.notes);
      } else {
        updateRecent(link, state.recent.links);
      }
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
  updateRecentLinks,
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

// Helpers
function insertElement(
  element: { id: string },
  array: { id: string }[]
) {
  const elementIndex = array.findIndex((e) => e.id === element.id);

  if (elementIndex === -1) {
    array.push(element);
  } else {
    array.splice(elementIndex, 1, element);
  }
}

function updateRecent(link: I_RecentLink, queue: I_RecentLink[]) {
  const linkIndex = queue.findIndex((l) => l.href === link.href);

  if (linkIndex !== -1) {
    queue.splice(linkIndex);
  }
  if (queue.length >= 10) {
    queue.pop();
  }

  queue.unshift(link);
}
