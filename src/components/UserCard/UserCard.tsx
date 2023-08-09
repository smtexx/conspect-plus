import { Card } from 'react-bootstrap';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';

interface I_Props {
  login: string;
  isActive: boolean;
  created: Date;
  lastActivity: Date;
  notes: number;
  onClick: () => void;
}

export default function UserCard({
  login,
  isActive,
  created,
  lastActivity,
  notes,
  onClick,
}: I_Props) {
  return (
    <button
      style={{ background: 'none', border: 'none' }}
      className={`cm-card-link text-start p-0 ${
        isActive ? 'active' : ''
      }`}
      onClick={onClick}
      disabled={isActive}
    >
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            <span className="overflow-hidden text-nowrap me-2">
              {login}
            </span>
            <span className="d-flex signed-in">
              {isActive ? (
                <BsFillPersonCheckFill />
              ) : (
                <BiLogInCircle />
              )}
            </span>
          </Card.Title>
          <Card.Subtitle
            className="mb-2 text-muted"
            title="Дата создания"
          >
            <span className="pe-2">Создан:</span>{' '}
            {created.toLocaleDateString()}
          </Card.Subtitle>

          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td className="pe-2">Активен:</td>
                <td>{created.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Записей:</td>
                <td>{notes}</td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </Card.Body>
      </Card>
    </button>
  );
}
