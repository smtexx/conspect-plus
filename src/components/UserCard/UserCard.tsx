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
      className={`cm-card-link w-100 text-start p-0 ${
        isActive ? 'active' : ''
      }`}
      onClick={onClick}
      disabled={isActive}
    >
      <Card className="w-100">
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            <span>{title}</span>
            <span className="d-flex signed-in">
              {isActive ? (
                <BsFillPersonCheckFill />
              ) : (
                <BiLogInCircle />
              )}
            </span>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {saved.toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </button>
  );
}
