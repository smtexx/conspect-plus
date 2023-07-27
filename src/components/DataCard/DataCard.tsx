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
    <Link className="cm-card-link d-block" to={id}>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title style={{ height: '2.5em', overflow: 'hidden' }}>
            {title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {saved.toLocaleString()}
          </Card.Subtitle>
          <Card.Text style={{ height: '4.25em', overflow: 'hidden' }}>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
