import { AES, enc } from 'crypto-js';
import { I_UserData } from '../model/typesModel';
import { getUserData } from './localstorage';
import { regenerateTokens } from './utils';

const FILE_INTACT_KEY = '3й$8 я+9e 2Жc* b1_6 Н5e0';
const FILE_SECURITY_KEY = 'VaO_81QGBMudScBgErSt';

interface I_FileData {
  userData: I_UserData;
  key: typeof FILE_INTACT_KEY;
}

function encryptData(dataJSON: string): string {
  return AES.encrypt(dataJSON, FILE_SECURITY_KEY).toString();
}

function decryptData(encryptedData: string): string {
  const bytes = AES.decrypt(encryptedData, FILE_SECURITY_KEY);
  return bytes.toString(enc.Utf8);
}

async function saveFile(login: string, encryptedData: string) {
  const fileName = `${login} ${new Date().toLocaleString()}.tip`;
  const blobData = new Blob([encryptedData], { type: 'text/plain' });

  const dataURL = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
    fileReader.readAsDataURL(blobData);
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataURL as string;
  link.click();
}

async function readFile(file: File): Promise<string> {
  const data = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
    fileReader.readAsText(file);
  });

  return data as string;
}

export async function exportStoredData(login: string) {
  const userData = getUserData(login);

  if (userData !== null) {
    const fileData: I_FileData = {
      userData,
      key: FILE_INTACT_KEY,
    };

    const encryptedData = encryptData(JSON.stringify(fileData));
    await saveFile(login, encryptedData);
  }
}

export async function readFileData(file: File): Promise<I_UserData> {
  const encryptedData = await readFile(file);
  const fileData = JSON.parse(
    decryptData(encryptedData)
  ) as I_FileData;

  if (fileData.key !== FILE_INTACT_KEY) {
    throw new Error('File is damaged and cannot be read');
  }

  regenerateTokens(fileData.userData);

  return fileData.userData;
}
