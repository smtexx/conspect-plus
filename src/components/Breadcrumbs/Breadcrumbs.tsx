import { Link, useParams } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import s from './Breadcrumbs.module.scss';
import { I_RoutePath } from '../../app/model/typesModel';

interface I_Props {
  titles: string[];
}

export default function Breadcrumbs({ titles }: I_Props) {
  const { conspectID, sectionID, pageID, linksetID } = useParams();
  const routes: I_RoutePath[] = [];

  if (conspectID !== undefined) {
    routes.push(
      { path: '/conspect', text: 'Мои конспекты' },
      { path: `/conspect/${conspectID}`, text: titles[0] }
    );

    if (sectionID !== undefined) {
      routes.push({
        path: `${routes[1].path}/${sectionID}`,
        text: titles[1],
      });

      if (pageID !== undefined) {
        routes.push({
          path: `${routes[2].path}/${pageID}`,
          text: titles[2],
        });
      }
    }
  } else if (linksetID !== undefined) {
    routes.push(
      { path: '/linkset', text: 'Мои ссылки' },
      { path: `/linkset/${linksetID}`, text: titles[0] }
    );
  }

  return (
    <nav aria-label="breadcrumb" className="border-bottom mb-2">
      <ol className={s.list}>
        {routes.map((route, idx) => (
          <li className={s.listItem} key={route.path}>
            {idx !== 0 && (
              <span className={s.divider}>
                <MdOutlineKeyboardDoubleArrowRight />
              </span>
            )}
            {routes.length - 1 === idx ? (
              <span className={s.link}>{route.text}</span>
            ) : (
              <Link to={route.path} className={s.link}>
                {route.text}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
