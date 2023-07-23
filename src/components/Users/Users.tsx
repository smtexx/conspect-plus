import { Button, Card, Modal } from 'react-bootstrap';
import { getFakeUsers } from '../../fakeData/getFakeUsers';
import { ChangeEvent, useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';

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
      <div className="row gy-4">
        {users.map((user) => (
          <div className="col-sm-12 col-lg-6 col-xxl-4">
            <Card border={user.isActive ? 'light' : ''}>
              <Card.Header as="h5" className="text-white d-flex">
                <span>{user.login}</span>
                {user.isActive ? (
                  <span className="ms-auto lh-1">
                    <BsFillPersonCheckFill />
                  </span>
                ) : null}
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Text>
                  <p className="mb-0">
                    Время последней активности:{' '}
                    <span className="text-white">
                      {user.isActive
                        ? 'сейчас'
                        : user.lastActivity.toLocaleString()}
                    </span>
                    .
                  </p>
                  <p>
                    Количество созданных записей:{' '}
                    <span className="text-white">
                      {user.notesQty}
                    </span>
                    .
                  </p>
                </Card.Text>
                <Button
                  className="align-self-end"
                  variant={user.isActive ? 'secondary' : 'light'}
                  disabled={user.isActive}
                >
                  Войти
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="row mt-4 justify-content-end">
        <div className="col-auto">
          <Button
            variant="warning"
            onClick={() => setModalShown(true)}
          >
            Создать учетную запись
          </Button>
        </div>
      </div>

      <Modal show={modalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Создание учетной записи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Для того чтобы начать пользоваться приложением, вам
            необходимо создать новую учетную запись. Учетная запись
            позволит вам сохранять ваши конспекты и ссылки на ресурсы.
            Для ее создания введите новое имя пользователя в поле ниже
            и нажмите на кнопку создать.
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button
            variant="warning"
            onClick={handleSaveUser}
            disabled={saveDisabled}
          >
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
