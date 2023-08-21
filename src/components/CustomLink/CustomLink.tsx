import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import s from './CustomLink.module.scss';
import { useDispatch } from 'react-redux';
import { updateRecentLinks } from '../../app/controller/redux/data/dataSlice';

interface I_Props {
  href: string;
  text: string;
  date?: string;
  addRecent?: boolean;
}

interface I_PropsExternal extends I_Props {
  counter?: number;
  external: true;
}

interface I_PropsInternal extends I_Props {
  counter: number;
  external?: false;
}

export default function CustomLink({
  href,
  text,
  counter,
  date,
  external,
  addRecent,
}: I_PropsExternal | I_PropsInternal) {
  const dispatch = useDispatch();

  let handleClick;
  if (addRecent) {
    handleClick = () => {
      dispatch(updateRecentLinks({ text, href }));
    };
  }

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
      onClick={handleClick}
    >
      {parts}
    </a>
  ) : (
    <Link className={s.internal} to={href} onClick={handleClick}>
      {parts}
    </Link>
  );
}
