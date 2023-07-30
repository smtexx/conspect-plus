import { Button } from 'react-bootstrap';
import { getFakeUsers } from '../../fakeData/getFakeUsers';
import { ChangeEvent, useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Screen from '../Screen/Screen';
import UserCard from '../UserCard/UserCard';

export default function Users() {
  const [modalShown, setModalShown] = useState(false);
  const [login, setLogin] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);

  const { users } = getFakeUsers();

  function handleCloseModal() {
    setSaveDisabled(true);
    setLogin('');
    setModalShown(false);
  }
  function handleSaveUser() {
    handleCloseModal();
  }
  function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
      .trim()
      .replace(/[^a-zа-я0-9_]/gi, '');
    const correctLoginRegExp = /^[a-zа-я0-9_]{3,20}$/i;

    const alreadyExists =
      users.findIndex((user) => user.login === value) !== -1;

    if (correctLoginRegExp.test(value) && !alreadyExists) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }

    setLogin(value);
  }

  return (
    <>
      <Screen title="Учетные записи">
        <h5>Существующие учетные записи</h5>
        <p style={{ maxWidth: '40rem' }}>
          Ниже представлен список учетных записей, сохраненных в
          приложении. Вы можете использовать одну из них.
        </p>
        <div className="row px-3 gy-4 mb-4 justify-content-start align-items-stretch">
          {users.map((user) => (
            <div key={user.login} className="col-auto">
              <UserCard
                key={user.login}
                title={user.login}
                description={`Количество записей: ${user.notesQty}`}
                saved={user.lastActivity}
                isActive={user.isActive}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
        <h5>Создание учетной записи</h5>
        <p style={{ maxWidth: '40rem' }}>
          Вы можете создать новую учетную запись пользователя ниже.
          Удаление учетных записей осуществляется в разделе
          менеджмента данных.
        </p>
        <Button
          className="mt-2 ms-lg-3"
          variant="primary"
          onClick={() => setModalShown(true)}
        >
          Создать учетную запись
        </Button>
      </Screen>

      <ConfirmModal
        title="Создание учетной записи"
        open={modalShown}
        onHide={handleCloseModal}
        buttonText="Создать"
        buttonHandler={handleSaveUser}
        disabled={saveDisabled}
      >
        <p>
          Для того чтобы начать пользоваться приложением, вам
          необходимо создать новую учетную запись. Учетная запись
          позволит вам сохранять ваши конспекты и ссылки на ресурсы.
          Для ее создания введите новое имя пользователя в поле ниже и
          нажмите на кнопку создать.
        </p>
        <label
          htmlFor="inputLogin"
          className="form-label mb-2 text-white"
        >
          Имя пользователя:
        </label>
        <input
          type="text"
          id="inputLogin"
          className="form-control"
          aria-labelledby="loginHelpBlock"
          onChange={handleLoginChange}
          value={login}
          autoFocus={true}
        />
        <div id="loginHelpBlock" className="form-text">
          Имя пользователя должно состоять из букв, цифр, символов
          нижнего подчеркивания, иметь длинну 3-20 знаков.
        </div>
      </ConfirmModal>
    </>
  );
}
