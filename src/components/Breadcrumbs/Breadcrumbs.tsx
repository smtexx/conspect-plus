import { Link } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { getFakeRoutes } from '../../fakeData/getFakeRoutes';
import s from './Breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const { routes } = getFakeRoutes();
  let href = '';

  return (
    <nav aria-label="breadcrumb">
      <ol className={s.list}>
        {routes.map((route, idx) => {
          href += `/${route.path}`;

          return (
            <li className={s.listItem} key={route.path}>
              {idx !== 0 && (
                <span className={s.divider}>
                  <MdOutlineKeyboardDoubleArrowRight />
                </span>
              )}
              {routes.length - 1 === idx ? (
                <span className={s.link}>{route.text}</span>
              ) : (
                <Link to={href} className={s.link}>
                  {route.text}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
