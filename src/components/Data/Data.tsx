import { useState, useRef } from 'react';
import { Button, Accordion, Alert } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import MessageModal from '../MessageModal/MessageModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Screen from '../Screen/Screen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/controller/redux/store';
import { setUserData } from '../../app/controller/localstorage';
import { I_UserData } from '../../app/model/typesModel';
import {
  setNotesQty,
  updateUserActivity,
} from '../../app/controller/redux/users/usersSlice';
import {
  loadData,
  setSaved,
} from '../../app/controller/redux/data/dataSlice';
import {
  exportStoredData,
  importStoredData,
} from '../../app/controller/fileProcessing';
import { regenerateTokens } from '../../app/controller/utils';

interface I_DataCard {
  header: string;
  text: string;
  buttonText: string;
  buttonHandler: () => void;
}

enum E_MessageTypes {
  SAVE_OK = 'SAVE_OK',
  IMPORT_OK = 'IMPORT_OK',
  EXPORT_OK = 'EXPORT_OK',
  EXIT_OK = 'EXIT_OK',
  ERROR = 'ERROR',
}

const modalMessages: { [prop in E_MessageTypes]: string } = {
  [E_MessageTypes.SAVE_OK]: `Данные успешно сохранены в localstorage. При 
    переустановке или принудительной очистке браузера данные могут быть утеряны.
    Чтобы этого не произошло, выполните импорт файла данных.`,
  [E_MessageTypes.IMPORT_OK]: `Импорт данных был успешно выполнен. Данные активной
    учетной записи были обновлены.`,
  [E_MessageTypes.EXPORT_OK]: `Экспорт данных в файл был успешно выполнен. Файл
  был загружен браузером в расположение загрузок по умолчанию.`,
  [E_MessageTypes.EXIT_OK]: `Экспорт данных в файл был успешно выполнен. Файл
  был загружен браузером в расположение загрузок по умолчанию.. Активная учетная 
  запись была удалена.`,
  [E_MessageTypes.ERROR]: `В ходе выполнения операции что то пошло не так. Возможна
  потеря данных. Попробуйте перезагрузить приложение или использовать другой браузер.`,
};

export default function Data() {
  const [messageType, setMessageType] = useState<E_MessageTypes>(
    E_MessageTypes.SAVE_OK
  );
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [fileAccepted, setFileAccepted] = useState(false);
  const users = useSelector((state: RootState) => state.users);
  const userData = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);

  function openMessageModal(type: E_MessageTypes) {
    setMessageType(type);
    setMessageModalOpen(true);
  }
  function closeMessageModal() {
    setMessageModalOpen(false);
  }

  function openImportModal() {
    setImportModalOpen(true);
  }
  function closeImportModal() {
    setImportModalOpen(false);
    setFileAccepted(false);
  }

  function saveData() {
    // Prepare userData
    const compressedUserData = JSON.parse(
      JSON.stringify(userData)
    ) as I_UserData;
    let notesCounter = 0;

    // Compress data, delete all tokens
    compressedUserData.conspects.forEach((c) => {
      c.sections.forEach((s) => {
        s.pages.forEach((p) => {
          p.tokens = [];
          notesCounter++;
        });
      });
    });
    compressedUserData.linksets.forEach((l) => {
      l.tokens = [];
      notesCounter++;
    });
    compressedUserData.tip = '';
    compressedUserData.saved = true;

    // Prepare user
    const lastActivity = new Date().toString();
    const activeUser = users.find((u) => u.isActive);
    if (activeUser) {
      const activeUserCopy = { ...activeUser };
      activeUserCopy.lastActivity = lastActivity;
      activeUserCopy.notes = notesCounter;

      // Save data
      setUserData(activeUserCopy, compressedUserData);
      // Update state
      dispatch(setNotesQty(notesCounter));
      dispatch(updateUserActivity(lastActivity));
      dispatch(setSaved());
    }
  }

  function handleSaveData() {
    try {
      saveData();
      openMessageModal(E_MessageTypes.SAVE_OK);
    } catch (error) {
      openMessageModal(E_MessageTypes.ERROR);
      console.error(error);
    }
  }

  async function exportData() {
    if (!userData.saved) {
      saveData();
    }

    const user = users.find((u) => u.isActive);
    if (user !== undefined) {
      await exportStoredData(user.login);
    }
  }

  async function handleExportData() {
    try {
      await exportData();
      openMessageModal(E_MessageTypes.EXPORT_OK);
    } catch (error) {
      openMessageModal(E_MessageTypes.ERROR);
      console.error(error);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.tip')) {
      setFileAccepted(true);
    } else {
      setFileAccepted(false);
    }
  }

  async function importUserData() {
    if (
      inputFileRef.current !== null &&
      inputFileRef.current.files !== null
    ) {
      const file = inputFileRef.current.files[0];
      const { userData } = await importStoredData(file);
      regenerateTokens(userData);
      userData.saved = false;

      // Update state
      dispatch(loadData(userData));
      dispatch(updateUserActivity(new Date().toString()));
    }
  }

  async function handleImportData() {
    let messageType;

    try {
      await importUserData();
      messageType = E_MessageTypes.IMPORT_OK;
    } catch (error) {
      messageType = E_MessageTypes.ERROR;
      console.error(error);
    }

    closeImportModal();
    openMessageModal(messageType);
  }

  const dataActions: I_DataCard[] = [
    {
      header: 'Сохранить изменения',
      text: `Изменения которые вы внесли в Ваши конспекты хронятся
      в памяти браузера, и не сохраняются при закрытии вкладки приложения,
      или закрытии браузера. Для того чтобы они были доступны при следующем
      запуске приложения, нажмите на кнопку ниже.`,
      buttonText: 'Сохранить',
      buttonHandler: handleSaveData,
    },
    {
      header: 'Экспортировать данные',
      text: `Выполнить экспорт данных вашего аккаунта в файл.
      Это позволит вам загрузить данные в приложение, открытое на другом 
      устройстве или в другом браузере. Таким образом вы можете 
      работать с вашими конспектами где вам удобно.`,
      buttonText: 'Экспортировать',
      buttonHandler: handleExportData,
    },
    {
      header: 'Импортировать данные',
      text: `Выполнить импорт данных из ранее экспортированного файла.
      Данные будут сохранены в браузере для дальнейшей работы с ними. Импорт 
      данных происходит в активный аккаунт, при этом все данные активного
      аккаунта заменяются импортируемыми данными из файла!`,
      buttonText: 'Импортировать',
      buttonHandler: () => {
        openImportModal();
      },
    },
    {
      header: 'Экспортировать и выйти',
      text: `Выполнить импорт данных в файл аналогично функции "Экспортировать данные".
      После чего аккаунт пользователя удаляется из приложения. Подходит в случае, если вы
      больше не планируете работать с приложением на данном устройстве.`,
      buttonText: 'Экспортировать и выйти',
      buttonHandler: () => {
        openMessageModal(E_MessageTypes.EXIT_OK);
      },
    },
  ];

  return (
    <>
      <Screen title="Менеджмент данных">
        <Accordion defaultActiveKey="0">
          {dataActions.map((action, idx) => (
            <Accordion.Item key={idx} eventKey={idx.toString()}>
              <Accordion.Header as="h2">
                <span className="h5 mb-0">{action.header}</span>
              </Accordion.Header>
              <Accordion.Body>
                <p style={{ maxWidth: '40rem' }}>{action.text}</p>
                <Button
                  className="mb-4 mt-2 ms-lg-3"
                  variant="primary"
                  onClick={action.buttonHandler}
                >
                  {action.buttonText}
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Screen>

      {/* Notifiaction modal */}
      <MessageModal
        open={messageModalOpen}
        onHide={closeMessageModal}
        modalText={modalMessages[messageType]}
        title={
          messageType === E_MessageTypes.ERROR
            ? 'Ошибка выполнения'
            : 'Завершено успешно'
        }
        type={
          messageType === E_MessageTypes.ERROR ? 'error' : 'primary'
        }
        buttonText={
          messageType === E_MessageTypes.ERROR ? 'Закрыть' : 'Отлично'
        }
        buttonHandler={closeMessageModal}
      />

      {/* Import modal */}
      <ConfirmModal
        title="Импорт данных из файла"
        open={importModalOpen}
        disabled={!fileAccepted}
        onHide={closeImportModal}
        buttonText="Импортировать"
        buttonHandler={handleImportData}
      >
        <p>
          Выберите файл содержащий данные с конспектами, которые будут
          импортированы в приложение.
        </p>

        <Alert variant="danger">
          <Alert.Heading>Предупреждение</Alert.Heading>
          <p>
            Все данные текущего пользовательского аккаунта будут
            заменены данными импортированными из файла. Если вы не
            уверены в результате, рекомендуем создать новый
            пользовательский аккаунт и выполнить импорт данных внутри
            него.
          </p>
        </Alert>

        <label
          htmlFor="importFile"
          className="form-label mb-2 text-white"
        >
          Файл данных:
        </label>
        <input
          type="file"
          id="importFile"
          className="form-control"
          aria-labelledby="fileHelpBlock"
          accept=".tip"
          onChange={handleFileChange}
          ref={inputFileRef}
        />
        <div id="fileHelpBlock" className="form-text">
          Файл пользовательских конспектов filename.tip
        </div>
      </ConfirmModal>
    </>
  );
}
