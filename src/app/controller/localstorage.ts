import { I_User, I_UserData } from '../model/typesModel';
import { regenerateTokens } from './utils';

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
    throw new Error('Localstorage is not available');
  }
}

export function getUserData(login: string): I_UserData {
  const key = `${dataNamespace}${login}`;

  if (localStorage) {
    const dataString = localStorage.getItem(key);
    if (dataString !== null) {
      const userData = JSON.parse(dataString) as I_UserData;
      // Regenerate tokens
      regenerateTokens(userData);
      return userData;
    } else {
      throw new Error(
        `Data of user "${login}" not found in localstorage`
      );
    }
  } else {
    throw new Error('Localstorage is not available');
  }
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
    throw new Error('Localstorage is not available');
  }
}

export function removeUser(login: I_User['login']) {
  if (localStorage) {
    const USER_DATA_KEY = `${dataNamespace}${login}`;

    // Update users
    const savedUsers = getUsers();
    const userIndex = savedUsers.findIndex((u) => u.login === login);
    if (userIndex !== -1) {
      savedUsers.splice(userIndex, 1);
    }

    // Stringify and save data
    localStorage.setItem(USERS_KEY, JSON.stringify(savedUsers));

    // Delete user data
    localStorage.removeItem(USER_DATA_KEY);
  } else {
    throw new Error('Localstorage is not available');
  }
}
