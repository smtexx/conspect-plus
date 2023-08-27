import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ChangeEvent, useState, useRef } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Screen from '../Screen/Screen';
import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../app/controller/redux/users/usersSlice';
import { I_User } from '../../app/model/typesModel';
import {
  changeUser,
  createUser,
  selectSaved,
  writeAppState,
} from '../../app/controller/redux/app/appSlice';
import { AppDispatch } from '../../app/controller/redux/store';

export default function Users() {
  const [createModalShown, setCreateModalShown] = useState(false);
  const [saveModalShown, setSaveModalShown] = useState(false);
  const [login, setLogin] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const users = useSelector(selectUsers);
  const isSaved = useSelector(selectSaved);
  const dispatch = useDispatch() as AppDispatch;
  const userToChangeRef = useRef('');

  const handleOpenCreateModal = () => {
    setCreateModalShown(true);
  };

  const handleCloseCreateModal = () => {
    setSaveDisabled(true);
    setLogin('');
    setCreateModalShown(false);
  };

  const handleCreateUser = () => {
    dispatch(createUser(login));
    handleCloseCreateModal();
  };

  const handleKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = (e) => {
    const keyCode = e.code;
    if (!saveDisabled && keyCode === 'Enter') {
      handleCreateUser();
    }
  };

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .trim()
      .replace(/[^a-zа-я0-9_]/gi, '');
    const correctLoginRegExp = /^[a-zа-я0-9_]{3,20}$/i;

    if (correctLoginRegExp.test(value)) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }

    setLogin(value);
  };

  const handleChangeUser = (login: I_User['login']) => {
    if (isSaved) {
      dispatch(changeUser(login));
      handleCloseCreateModal();
    } else {
      userToChangeRef.current = login;
      setSaveModalShown(true);
    }
  };

  const handleSaveAndChangeUserCancel = () => {
    userToChangeRef.current = '';
    setSaveModalShown(false);
  };

  const handleSaveAndChangeUser = async () => {
    await dispatch(writeAppState());
    await dispatch(changeUser(userToChangeRef.current));
    handleSaveAndChangeUserCancel();
  };

  return (
    <>
      <Screen title="Учетные записи">
        <h2 className="fs-5">Существующие учетные записи</h2>
        <p style={{ maxWidth: '40rem' }}>
          {users.length === 0
            ? 'Учетных записей не найдено. Создайте новую учетную запись для работы с приложением.'
            : 'Ниже представлен список учетных записей, сохраненных в приложении. Вы можете использовать одну из них.'}
        </p>
        <div className="row px-md-3 gy-4 mb-4 justify-content-start align-items-stretch">
          {users.map((user) => (
            <div key={user.login} className="col-auto">
              <UserCard
                login={user.login}
                isActive={user.isActive}
                created={user.created}
                lastActivity={user.lastActivity}
                notes={user.notes}
                onClick={() => handleChangeUser(user.login)}
              />
            </div>
          ))}
        </div>
        <h2 className="fs-5 pt-4">Создание учетной записи</h2>
        <p style={{ maxWidth: '40rem' }}>
          Вы можете создать новую учетную запись пользователя ниже.
          Удаление учетных записей осуществляется в разделе
          менеджмента данных.
        </p>
        <Button
          className="mt-2 ms-lg-3"
          variant="primary"
          onClick={handleOpenCreateModal}
        >
          Создать учетную запись
        </Button>
      </Screen>

      <ConfirmModal
        title="Создание учетной записи"
        open={createModalShown}
        onHide={handleCloseCreateModal}
        buttonText="Создать"
        buttonHandler={handleCreateUser}
        disabled={saveDisabled}
      >
        <p>
          Для того чтобы начать пользоваться приложением, вам
          необходимо создать новую учетную запись. Учетная запись
          позволит вам сохранять ваши конспекты и ссылки на ресурсы.
          Для ее создания введите новое имя пользователя в поле ниже и
          нажмите на кнопку создать.
        </p>

        <FloatingLabel
          controlId="inputLogin"
          label="Имя пользователя"
        >
          <Form.Control
            type="text"
            placeholder="Имя пользователя"
            value={login}
            onChange={handleChangeLogin}
            aria-labelledby="loginHelpBlock"
            autoFocus={true}
            onKeyDown={handleKeyDown}
          />
        </FloatingLabel>
        <p id="loginHelpBlock" className="form-text">
          Имя пользователя должно состоять из букв, цифр, символов
          нижнего подчеркивания, иметь длинну 3-20 знаков. Текущая:{' '}
          {login.length}.
        </p>
      </ConfirmModal>

      <ConfirmModal
        title="Сохранить изменения?"
        open={saveModalShown}
        onHide={handleSaveAndChangeUserCancel}
        buttonText="Сохранить"
        disabled={false}
        buttonHandler={handleSaveAndChangeUser}
      >
        <p>
          Данные активной учетной записи не сохранены и будут удалены
          при выходе из нее. Вы можете сохранить данные учетной записи
          или отменить смену пользователя.
        </p>
      </ConfirmModal>
    </>
  );
}
