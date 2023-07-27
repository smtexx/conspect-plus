import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface I_Props {
  id: string;
  title: string;
  description: string;
  saved: Date;
}

export default function DataCard({
  id,
  title,
  description,
  saved,
}: I_Props) {
  return (
    <Link className="cm-card-link w-100" to={id}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {saved.toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
