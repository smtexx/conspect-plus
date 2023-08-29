import { Card } from 'react-bootstrap';
import s from './TagCard.module.scss';

interface I_Props {
  title: string;
  description: string;
  nesting: string;
  sample: string;
}

export default function TagCard({
  title,
  description,
  nesting,
  sample,
}: I_Props) {
  return (
    <Card className={s.wrapper}>
      <code className={s.code}>
        <pre>{sample}</pre>
      </code>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          Вложенность: <span className="text-white">{nesting}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
