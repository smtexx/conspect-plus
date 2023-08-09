import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Screen from '../Screen/Screen';
import UserCard from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  selectActiveUser,
  selectUsers,
  setUserActive,
} from '../../app/controller/redux/users/usersSlice';

export default function Users() {
  const [createModalShown, setCreateModalShown] = useState(false);
  const [switchModalLogin, setSwitchModalLogin] = useState('');
  const [login, setLogin] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const users = useSelector(selectUsers);
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();

  function handleCloseCreateModal() {
    setSaveDisabled(true);
    setLogin('');
    setCreateModalShown(false);
  }
  function handleSaveUser() {
    dispatch(createUser(login));
    handleCloseCreateModal();
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
        <h2 className="fs-5">Существующие учетные записи</h2>
        <p style={{ maxWidth: '40rem' }}>
          {users.length === 0
            ? 'Учетных записей не найдено. Создайте новую учетную запись для работы с приложением.'
            : 'Ниже представлен список учетных записей, сохраненных в приложении. Вы можете использовать одну из них.'}
        </p>
        <div className="row px-3 gy-4 mb-4 justify-content-start align-items-stretch">
          {users.map((user) => (
            <div key={user.login} className="col-auto">
              <UserCard
                login={user.login}
                isActive={user.isActive}
                created={user.created}
                lastActivity={user.lastActivity}
                notes={user.notes}
                onClick={() => {
                  if (activeUser) {
                    setSwitchModalLogin(user.login);
                  } else {
                    dispatch(setUserActive(user.login));
                  }
                }}
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
          onClick={() => setCreateModalShown(true)}
        >
          Создать учетную запись
        </Button>
      </Screen>

      <ConfirmModal
        title="Создание учетной записи"
        open={createModalShown}
        onHide={handleCloseCreateModal}
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

        <FloatingLabel
          controlId="inputLogin"
          label="Имя пользователя"
        >
          <Form.Control
            type="text"
            placeholder="Имя пользователя"
            value={login}
            onChange={handleLoginChange}
            aria-labelledby="loginHelpBlock"
          />
        </FloatingLabel>
        <p id="loginHelpBlock" className="form-text">
          Имя пользователя должно состоять из букв, цифр, символов
          нижнего подчеркивания, иметь длинну 3-20 знаков.
        </p>
      </ConfirmModal>

      <ConfirmModal
        title="Сменить учетную запись"
        open={switchModalLogin !== ''}
        onHide={() => setSwitchModalLogin('')}
        buttonText="Сменить"
        disabled={false}
        buttonHandler={() => {
          dispatch(setUserActive(switchModalLogin));
          setSwitchModalLogin('');
        }}
      >
        <p>
          Вы действительно хотите сменить учетную запись на{' '}
          {`"${switchModalLogin}"`}? Все несохраненные данные текущей
          учетной записи {`"${activeUser?.login}"`} будут утеряны.
          Убедитесь что сохранили данные перед сменой пользователя.
        </p>
      </ConfirmModal>
    </>
  );
}
