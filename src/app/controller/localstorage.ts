import {
  E_TokenType,
  I_LinkToken,
  I_User,
  I_UserData,
} from '../model/typesModel';
import { parse } from './parser';
import { RootState } from './redux/store';

const namespace = 'conspect_plus_';
const dataNamespace = `${namespace}data_`;
const USERS_KEY = `${namespace}users`;

export function getUsers(): I_User[] {
  if (localStorage) {
    const dataString = localStorage.getItem(USERS_KEY);
    if (dataString !== null) {
      return JSON.parse(dataString) as I_User[];
    } else {
      return [];
    }
  } else {
    throw new Error('Localstorage is not available in your browser');
  }
}

export function getUserData(login: string): I_UserData | null {
  const key = `${dataNamespace}${login}`;

  if (localStorage) {
    const dataString = localStorage.getItem(key);
    if (dataString !== null) {
      const dataObject = JSON.parse(dataString) as I_UserData;
      // Regenerate tokens
      dataObject.conspects.forEach((c) => {
        c.sections.forEach((s) => {
          s.pages.forEach((p) => {
            p.tokens = parse(p.markup);
          });
        });
      });
      dataObject.linksets.forEach((l) => {
        const tokens = parse(l.markup);
        l.tokens = tokens.filter(
          (t) => t.type === E_TokenType.R
        ) as I_LinkToken[];
      });
      return dataObject;
    }
  } else {
    throw new Error('Localstorage is not available in your browser');
  }

  return null;
}

export function setUserData(state: RootState) {
  const activeUser = {
    ...state.users.find((u) => u.isActive),
  } as I_User;

  if (activeUser === undefined) {
    throw new Error(
      'Unable to save user data, active user not found'
    );
  }

  if (localStorage) {
    // Update users
    const USER_DATA_KEY = `${dataNamespace}${activeUser.login}`;
    const users = getUsers();
    activeUser.lastActivity = new Date().toString();
    users.forEach((u) => (u.isActive = false));

    const userIndex = users.findIndex(
      (u) => u.login === activeUser.login
    );
    if (userIndex !== -1) {
      // User present in localstorage
      users.splice(userIndex, 1, activeUser);
    } else {
      // It is new user
      users.push(activeUser);
    }

    const userData = JSON.parse(
      JSON.stringify(state.data)
    ) as I_UserData;

    // Compress data, delete all tokens
    userData.conspects.forEach((c) => {
      c.sections.forEach((s) => {
        s.pages.forEach((p) => {
          p.tokens = [];
          activeUser.notes++;
        });
      });
    });
    userData.linksets.forEach((l) => {
      l.tokens = [];
      activeUser.notes++;
    });

    // Stringify and save data
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } else {
    throw new Error('Unable to save user data to localstorage');
  }
}
