import { useState, useRef } from 'react';
import { Button, Accordion, Alert } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Screen from '../Screen/Screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/controller/redux/store';

import { selectActiveUserLogin } from '../../app/controller/redux/users/usersSlice';

import {
  exportAndExit,
  exportUserData,
  importUserData,
  selectSaved,
  writeAppState,
} from '../../app/controller/redux/app/appSlice';

interface I_DataCard {
  header: string;
  text: string;
  buttonText: string;
  buttonHandler: () => void;
}

export default function Data() {
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [fileAccepted, setFileAccepted] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch() as AppDispatch;
  const isSaved = useSelector(selectSaved);
  const userLogin = useSelector(selectActiveUserLogin);

  const handleExportData = async () => {
    if (userLogin !== '') {
      if (!isSaved) {
        await dispatch(writeAppState());
      }
      await dispatch(exportUserData(userLogin));
    }
  };

  const handleExportDataAndExit = async () => {
    if (userLogin !== '') {
      if (!isSaved) {
        await dispatch(writeAppState());
      }
      await dispatch(exportAndExit(userLogin));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.tip')) {
      setFileAccepted(true);
    } else {
      setFileAccepted(false);
    }
  };

  const handleCloseImportModal = () => {
    setImportModalOpen(false);
    setFileAccepted(false);
  };

  const handleImportData = async () => {
    if (inputFileRef.current && inputFileRef.current.files) {
      await dispatch(importUserData(inputFileRef.current.files[0]));
    }
  };

  const dataActions: I_DataCard[] = [
    {
      header: 'Экспортировать данные',
      text: `Сохранить данные и выполнить экспорт вашего аккаунта в файл.
      Это позволит вам загрузить данные в приложение, открытое на другом 
      устройстве или в другом браузере. Таким образом вы можете 
      работать с вашими конспектами где вам удобно. `,
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
        setImportModalOpen(true);
      },
    },
    {
      header: 'Экспортировать и выйти',
      text: `Выполнить импорт данных в файл аналогично функции "Экспортировать данные".
      После чего аккаунт пользователя удаляется из приложения. Подходит в случае, если вы
      больше не планируете работать с приложением на данном устройстве.`,
      buttonText: 'Экспортировать и выйти',
      buttonHandler: handleExportDataAndExit,
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

      {/* Import modal */}
      <ConfirmModal
        title="Импорт данных из файла"
        open={importModalOpen}
        disabled={!fileAccepted}
        onHide={handleCloseImportModal}
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
