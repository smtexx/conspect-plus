import { Middleware } from '@reduxjs/toolkit';
import { setUnsaved } from './app/appSlice';

export const markUnsaved: Middleware =
  (storeAPI) => (next) => (action) => {
    const unsavedOnActions = [
      'users/addUser',
      'users/deleteUser',
      'users/setActiveUser',
      'users/updateUserActivity',
      'users/setNotesQty',
      'data/createConspect',
      'data/editConspect',
      'data/deleteConspect',
      'data/createSection',
      'data/editSection',
      'data/deleteSection',
      'data/createPageDraft',
      'data/deletePageDraft',
      'data/createPage',
      'data/addDraft',
      'data/deletePage',
      'data/createLinksetDraft',
      'data/createLinkset',
      'data/deleteLinkset',
      'data/updateRecentLinks',
    ];

    if (unsavedOnActions.includes(action.type)) {
      storeAPI.dispatch(setUnsaved());
      window.onbeforeunload = () => false;
    }

    if (action.type === 'app/saveAppState/fulfilled') {
      window.onbeforeunload = null;
    }

    return next(action);
  };
