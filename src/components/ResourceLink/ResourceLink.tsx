import { Link } from 'react-router-dom';

interface I_Props {
  to: string;
  text: string;
  counter: number;
}

export default function ResourceLink({ to, text, counter }: I_Props) {
  return (
    <Link to={to} className="cm-resource-link">
      <span>{`#${counter + 1}`}</span>
      <span>{text}</span>
    </Link>
  );
}
