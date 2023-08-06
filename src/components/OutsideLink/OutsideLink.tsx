import { FaExternalLinkAlt } from 'react-icons/fa';
import s from './OutsideLink.module.scss';

interface I_Props {
  text: string;
  href: string;
}

export default function OutsideLink({ text, href }: I_Props) {
  return (
    <li className={s.wrapper}>
      <span className={s.icon}>
        <FaExternalLinkAlt />
      </span>
      <a
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        className={s.link}
      >
        {text}
      </a>
    </li>
  );
}
