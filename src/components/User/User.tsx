import { Button, Card } from 'react-bootstrap';
import { getFakeUsers } from '../../fakeData/getFakeUsers';

export default function User() {
  const { users } = getFakeUsers();

  return (
    <div className="row gy-4">
      {users.map((user) => (
        <div className="col-sm-12 col-lg-6 col-xxl-4">
          <Card border={user.isActive ? 'warning' : ''}>
            <Card.Header as="h5" className="text-white">
              {user.login}
            </Card.Header>
            <Card.Body>
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
                  <span className="text-white">{user.notesQty}</span>.
                </p>
              </Card.Text>
              <Button variant="light" disabled={user.isActive}>
                Войти
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
