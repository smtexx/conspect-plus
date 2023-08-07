import { Link } from 'react-router-dom';
import s from './Logo.module.scss';

export default function Logo() {
  return (
    <>
      <div className={s.wrapper}>
        <Link className={s.title} to="/">
          Конспект
        </Link>
      </div>
      <main></main>
    </>
  );
}
