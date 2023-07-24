import { useState } from 'react';
import {
  Card,
  Button,
  Accordion,
  Modal,
  Alert,
} from 'react-bootstrap';
import { ChangeEvent } from 'react';

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
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.tip')) {
      setFileAccepted(true);
    } else {
      setFileAccepted(false);
    }
  }
  function handleFileImport() {
    closeImportModal();
    openMessageModal(E_MessageTypes.IMPORT_OK);
  }

  const dataActions: I_DataCard[] = [
    {
      header: 'Сохранить изменения',
      text: `Изменения которые вы внесли в Ваши конспекты хронятся
      в памяти браузера, и не сохраняются при закрытии вкладки приложения,
      или закрытии браузера. Для того чтобы они были доступны при следующем
      запуске приложения, нажмите на кнопку ниже.`,
      buttonText: 'Сохранить',
      buttonHandler: () => {
        openMessageModal(E_MessageTypes.SAVE_OK);
      },
    },
    {
      header: 'Экспортировать данные',
      text: `Выполнить экспорт данных вашего аккаунта в файл.
      Это позволит вам загрузить данные в приложение, открытое на другом 
      устройстве или в другом браузере. Таким образом вы можете 
      работать с вашими конспектами где вам удобно.`,
      buttonText: 'Экспортировать',
      buttonHandler: () => {
        openMessageModal(E_MessageTypes.EXPORT_OK);
      },
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
    <div className="row gy-4">
      <div className="col-12">
        <Card>
          <Card.Header as="h5" className="text-white">
            Менеджмент данных
          </Card.Header>
          <Card.Body className="px-lg-4">
            <Accordion defaultActiveKey="0" className="mb-5">
              {dataActions.map((action, idx) => (
                <Accordion.Item eventKey={idx.toString()}>
                  <Accordion.Header>
                    <span className="text-white fw-weight-bold">
                      {action.header}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ maxWidth: '40rem' }}>{action.text}</p>
                    <Button
                      className="mb-4 ms-3"
                      variant="primary"
                      onClick={action.buttonHandler}
                    >
                      {action.buttonText}
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card.Body>
        </Card>
      </div>

      {/* Notifiaction modal */}
      <Modal show={messageModalOpen} onHide={closeMessageModal}>
        <Modal.Header
          className={
            messageType === E_MessageTypes.ERROR
              ? 'bg-danger text-white'
              : ''
          }
        >
          <Modal.Title>
            {messageType === E_MessageTypes.ERROR
              ? 'Ошибка выполнения'
              : 'Завершено успешно'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessages[messageType]}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeMessageModal}>
            {messageType === E_MessageTypes.ERROR
              ? 'Закрыть'
              : 'Отлично'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Import modal */}
      <Modal show={importModalOpen} onHide={closeImportModal}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Импорт данных из файла</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Выберите файл содержащий данные с конспектами, которые
            будут импортированы в приложение.
          </p>

          <Alert variant="danger">
            <Alert.Heading>Предупреждение</Alert.Heading>
            <p>
              Все данные текущего пользовательского аккаунта будут
              заменены данными импортированными из файла. Если вы не
              уверены в результате, рекомендуем создать новый
              пользовательский аккаунт и выполнить импорт данных
              внутри него.
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
            // value={login}
            // autoFocus={true}
          />
          <div id="fileHelpBlock" className="form-text">
            Файл пользовательских конспектов filename.tip
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeImportModal}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleFileImport}
            disabled={!fileAccepted}
          >
            Импортировать
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
