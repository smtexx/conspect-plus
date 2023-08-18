import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import s from './CustomLink.module.scss';

interface I_PropsExternal {
  href: string;
  text: string;
  counter?: number;
  external: true;
  date?: string;
}

interface I_PropsInternal {
  href: string;
  text: string;
  counter: number;
  external?: false;
  date?: string;
}

export default function CustomLink({
  href,
  text,
  counter,
  date,
  external,
}: I_PropsExternal | I_PropsInternal) {
  const parts = (
    <>
      <span className={s.icon}>
        {external ? <FaExternalLinkAlt /> : `#${counter}`}
      </span>
      <span className={s.text}>{text}</span>
      {date && (
        <span className={s.date}>
          {` [${new Date(date).toLocaleString()}]`}
        </span>
      )}
    </>
  );
  return external ? (
    <a
      className={s.external}
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {parts}
    </a>
  ) : (
    <Link className={s.internal} to={href}>
      {parts}
    </Link>
  );
}
