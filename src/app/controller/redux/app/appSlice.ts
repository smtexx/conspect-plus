import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { I_User, I_UserData } from '../../../model/typesModel';
import {
  getUserData,
  getUsers,
  removeUser,
  setUserData,
} from '../../localstorage';
import {
  addUser,
  deleteUser,
  loadUsers,
  setActiveUser,
  setNotesQty,
  updateUserActivity,
} from '../users/usersSlice';
import { loadData } from '../data/dataSlice';
import { RootState } from '../store';
import { exportStoredData, readFileData } from '../../fileProcessing';

interface I_InitialState {
  message: {
    type: 'primary' | 'error';
    text: string;
  } | null;
  tip: string | null;
  saved: boolean;
}

const initialState: I_InitialState = {
  message: null,
  tip: null,
  saved: true,
};

export const writeAppState = createAsyncThunk(
  'app/saveAppState',
  async (data, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const user = JSON.parse(
      JSON.stringify(rootState.users.find((u) => u.isActive))
    ) as I_User;
    const userData = JSON.parse(
      JSON.stringify(rootState.data)
    ) as I_UserData;

    // Prepare userData
    let notesCounter = 0;

    // Compress data, delete all tokens
    userData.conspects.forEach((c) => {
      c.sections.forEach((s) => {
        s.pages.forEach((p) => {
          p.tokens = [];
          notesCounter++;
        });
      });
    });
    userData.linksets.forEach((l) => {
      l.tokens = [];
      notesCounter++;
    });
    user.notes = notesCounter;
    user.lastActivity = new Date().toString();

    // Save data
    setUserData(user, userData);

    // Update user notes and last activity date
    dispatch(setNotesQty(notesCounter));
    dispatch(updateUserActivity(user.lastActivity));
  }
);

export const readAppState = createAsyncThunk(
  'app/saveAppState',
  async (data, { dispatch }) => {
    const users = getUsers();
    dispatch(loadUsers(users));

    const activeUser = users.find((u) => u.isActive);
    if (activeUser !== undefined) {
      const userData = getUserData(activeUser.login);
      dispatch(loadData(userData));
    }
  }
);

export const changeUser = createAsyncThunk(
  'app/changeUser',
  async (login: I_User['login'], { dispatch }) => {
    const userData = getUserData(login);
    dispatch(setActiveUser(login));
    dispatch(loadData(userData));
  }
);

export const exportUserData = createAsyncThunk(
  'app/exportUserData',
  async (login: I_User['login']) => {
    await exportStoredData(login);
  }
);

export const importUserData = createAsyncThunk(
  'app/importUserData',
  async (file: File, { dispatch }) => {
    const userData = await readFileData(file);
    dispatch(loadData(userData));
  }
);

export const exportAndExit = createAsyncThunk(
  'app/exportAndExit',
  async (login: I_User['login'], { dispatch }) => {
    await exportStoredData(login);
    removeUser(login);
    dispatch(deleteUser(login));
  }
);

export const createUser = createAsyncThunk(
  'app/createUser',
  async (login: I_User['login'], { dispatch, getState }) => {
    const state = getState() as RootState;
    if (state.users.findIndex((u) => u.login === login) !== -1) {
      throw new AlreadyExistError('User already exists in app state');
    }

    const user: I_User = {
      login,
      created: new Date().toString(),
      lastActivity: new Date().toString(),
      isActive: false,
      notes: 0,
    };

    const userData: I_UserData = {
      conspects: [],
      linksets: [],
      drafts: [],
      recent: {
        links: [],
        notes: [],
      },
    };

    setUserData(user, userData);
    dispatch(addUser(user));
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<I_InitialState['message']>
    ) => {
      state.message = action.payload;
    },
    setTip: (state, action: PayloadAction<I_InitialState['tip']>) => {
      state.tip = action.payload;
    },
    setUnsaved: (state) => {
      state.saved = false;
    },
  },

  extraReducers: (builder) => {
    // Save app state
    builder.addCase(writeAppState.fulfilled, (state, action) => {
      state.message = {
        type: 'primary',
        text: 'Состояние приложения успешно сохранено в локальном хранилище браузера.',
      };
      state.saved = true;
    });
    builder.addCase(writeAppState.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text: 'Ошибка при сохранении состояния приложения. Попробуйте использовать другой браузер.',
      };
      console.error(action.error);
    });

    // Read app state
    builder.addCase(readAppState.fulfilled, (state) => {
      state.message = {
        type: 'primary',
        text: 'Предыдущая сессия пользователя успешно восстановлена. Желаем приятной работы.',
      };
    });
    builder.addCase(readAppState.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text: 'Ошибка при чтении сохраненных данных приложения. Возможно данные были удалены браузером.',
      };
      console.error(action.error);
    });

    // Changing user
    builder.addCase(changeUser.fulfilled, (state) => {
      state.message = {
        type: 'primary',
        text: 'Вход в аккаунт выполнен успешно. Данные пользователя прочитаны.',
      };
      state.saved = false;
    });
    builder.addCase(changeUser.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text: 'Ошибка при чтении сохраненных данных пользователя. Возможно данные были удалены браузером.',
      };
      console.error(action.error);
    });

    // Export data
    builder.addCase(exportUserData.fulfilled, (state) => {
      state.message = {
        type: 'primary',
        text: 'Экспорт данных выполнен успешно. Файл данных загружен браузером в папку с загрузками.',
      };
    });
    builder.addCase(exportUserData.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text: 'Во время экспорта данных в файл произошла ошибка. Экспорт небыл выполнен.',
      };
      console.error(action.error);
    });

    // Import data
    builder.addCase(importUserData.fulfilled, (state) => {
      state.message = {
        type: 'primary',
        text: 'Данные были успешно ипортированы из файла. Учетная запись пользователя обновлена.',
      };
      state.saved = false;
    });
    builder.addCase(importUserData.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text: 'Во время импорта данных из файла произошла ошибка. Импорт небыл выполнен.',
      };
      console.error(action.error);
    });

    // Export data and exit
    builder.addCase(exportAndExit.fulfilled, (state) => {
      state.message = {
        type: 'primary',
        text: 'Экспорт данных выполнен успешно. Файл данных загружен браузером в папку с загрузками. Пользователь удален.',
      };
    });
    builder.addCase(exportAndExit.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text: 'Во время экспорта данных или выхода произошла ошибка. Удаление пользователя небыло выполнено.',
      };
      console.error(action.error);
    });

    // Create user
    builder.addCase(createUser.fulfilled, (state) => {
      state.message = {
        type: 'primary',
        text: 'Новая учетная запись успешно создана и доступна для использования',
      };
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.message = {
        type: 'error',
        text:
          action.error instanceof AlreadyExistError
            ? 'Учетная запись с таким именем уже существует, используйте другое имя учетной записи.'
            : 'Во время создания учетной записи возникла ошибка. Попробуйте перезагрузить приложение или использовать другой браузер',
      };
      console.error(action.error);
    });
  },
});

export const { setMessage, setUnsaved, setTip } = appSlice.actions;
export const { reducer: appReducer } = appSlice;

// Selectors
export const selectMessage = (state: RootState) => state.app.message;
export const selectTip = (state: RootState) => state.app.tip;
export const selectSaved = (state: RootState) => state.app.saved;

class AlreadyExistError extends Error {}
