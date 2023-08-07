import { Card } from 'react-bootstrap';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';

interface I_Props {
  isActive: boolean;
  title: string;
  description: string;
  saved: Date;
  onClick: () => void;
}

export default function UserCard({
  isActive,
  title,
  description,
  saved,
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
              {title}
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
            title="Последняя активность"
          >
            {saved.toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </button>
  );
}
