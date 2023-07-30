import { Link } from 'react-router-dom';
import s from './ResourceLink.module.scss';

interface I_Props {
  to: string;
  text: string;
  counter: number;
}

export default function ResourceLink({ to, text, counter }: I_Props) {
  return (
    <Link to={to} className={s.wrapper}>
      <span className={s.marker}>{`#${counter + 1}`}</span>
      <span className={s.text}>{text}</span>
    </Link>
  );
}
