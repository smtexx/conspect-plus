import {
  E_TokenType,
  I_LinkToken,
  I_User,
  I_UserData,
} from '../model/typesModel';
import { parse } from './parser';

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

export function setUserData(user: I_User, userData: I_UserData) {
  if (localStorage) {
    const USER_DATA_KEY = `${dataNamespace}${user.login}`;

    // Update users array
    const savedUsers = getUsers();
    savedUsers.forEach((u) => (u.isActive = false));
    const userIndex = savedUsers.findIndex(
      (u) => u.login === user.login
    );
    if (userIndex !== -1) {
      // User present in localstorage
      savedUsers.splice(userIndex, 1, user);
    } else {
      // It is new user
      savedUsers.push(user);
    }

    // Stringify and save data
    localStorage.setItem(USERS_KEY, JSON.stringify(savedUsers));
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } else {
    throw new Error('Unable to save user data to localstorage');
  }
}
