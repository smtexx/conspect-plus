import { Card } from 'react-bootstrap';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import s from './UserCard.module.scss';

interface I_Props {
  login: string;
  isActive: boolean;
  created: string;
  lastActivity: string;
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
      <Card className={s.card}>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between mb-3">
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

          <ul className="list-unstyled">
            {[
              ['Записей:', notes],
              ['Создан:', new Date(created).toLocaleString()],
              ['Активен:', new Date(lastActivity).toLocaleString()],
            ].map(([key, value]) => (
              <li key={key}>
                <span className={s.feature}>{key}</span>
                {value}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </button>
  );
}
