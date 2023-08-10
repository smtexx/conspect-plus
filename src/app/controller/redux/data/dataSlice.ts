import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  },
});

export const { clearData, createConspect } = dataSlice.actions;
export const { reducer: dataReducer } = dataSlice;

// Selectors
export const selectConspects = (state: RootState) =>
  state.data.conspects;
