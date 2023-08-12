import { Link, Params, useParams } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import s from './Breadcrumbs.module.scss';
import { I_RoutePath, I_UserData } from '../../app/model/typesModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/controller/redux/store';

export default function Breadcrumbs() {
  const userData = useSelector((state: RootState) => state.data);
  const params = useParams();
  const routes = getRoutePaths(params, userData);

  return routes.length === 0 ? null : (
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

function getRoutePaths(
  params: Readonly<Params<string>>,
  userData: I_UserData
): I_RoutePath[] {
  const ids: I_RoutePath[] = [];
  const routeVars = {
    conspect: ['conspectID', 'sectionID', 'pageID'],
  };

  const conspectID = params[routeVars.conspect[0]];
  if (conspectID) {
    const conspect = userData.conspects.find(
      (c) => c.id === conspectID
    );
    if (conspect === undefined) return ids;
    const conspectLink = `/conspect/${conspectID}`;
    ids.push({ path: conspectLink, text: conspect.title });

    const sectionID = params[routeVars.conspect[1]];
    if (sectionID) {
      const section = conspect.sections.find(
        (s) => s.id === sectionID
      );
      if (section === undefined) return ids;
      const sectionLink = `${conspectLink}/${sectionID}`;
      ids.push({ path: sectionLink, text: section.title });

      const pageID = params[routeVars.conspect[2]];
      if (pageID) {
        const page = section.pages.find((p) => p.id === pageID);
        if (page === undefined) return ids;
        const pageLink = `${sectionLink}/${pageID}`;
        ids.push({ path: pageLink, text: page.title });
        return ids;
      }
    }
  }

  return ids;
}
