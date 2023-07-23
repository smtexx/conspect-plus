import { Button, Card, Modal } from 'react-bootstrap';
import { getFakeUsers } from '../../fakeData/getFakeUsers';
import { ChangeEvent, useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';

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
        <div className="col-12 ">
          <Card>
            <Card.Header as="h5" className="text-white ">
              Учетные записи
            </Card.Header>
            <Card.Body className="px-lg-4">
              <Card.Title>Существующие учетные записи</Card.Title>
              <Card.Text style={{ maxWidth: '40rem' }}>
                Ниже представлен список учетных записей, сохраненных в
                приложении. Вы можете использовать одну из них.
              </Card.Text>
              <div className="row px-3 gy-4 gx-1 mb-4">
                {users.map((user) => (
                  <div className="col d-flex align-items-stretch">
                    <Card
                      style={{ width: '20rem' }}
                      border={user.isActive ? 'primary' : ''}
                    >
                      <Card.Body>
                        <Card.Title
                          className={`d-flex ${
                            user.isActive ? 'text-white' : ''
                          }`}
                        >
                          <span>{user.login}</span>
                          {user.isActive ? (
                            <span className="ms-auto d-flex text-primary">
                              <BsFillPersonCheckFill />
                            </span>
                          ) : null}
                        </Card.Title>
                        <Card.Text>
                          <p className="mb-1">
                            Обновлена:{' '}
                            <span className="text-white ms-2">
                              {user.isActive
                                ? 'активна'
                                : user.lastActivity.toLocaleString()}
                            </span>
                          </p>
                          <p>
                            Всего записей:{' '}
                            <span className="text-white ms-2">
                              {user.notesQty}
                            </span>
                          </p>
                        </Card.Text>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            visibility: user.isActive
                              ? 'hidden'
                              : undefined,
                          }}
                        >
                          <Button
                            variant="primary"
                            className="d-flex"
                          >
                            <BiLogIn />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>

              <Card.Title>Создание учетной записи</Card.Title>
              <Card.Text style={{ maxWidth: '40rem' }}>
                Вы можете создать новую учетную запись пользователя
                ниже. Удаление учетных записей осуществляется в
                разделе менеджмента данных.
              </Card.Text>

              <Button
                className="ms-3 mb-5"
                variant="primary"
                onClick={() => setModalShown(true)}
              >
                Создать учетную запись
              </Button>
            </Card.Body>
          </Card>
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
            variant="primary"
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
