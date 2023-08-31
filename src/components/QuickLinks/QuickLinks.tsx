import { useState } from 'react';
import Screen from '../Screen/Screen';
import CustomLink from '../CustomLink/CustomLink';
import { useSelector } from 'react-redux';
import {
  selectDrafts,
  selectRecent,
} from '../../app/controller/redux/data/dataSlice';
import { I_RecentLink } from '../../app/model/typesModel';
import { FaMehRollingEyes } from 'react-icons/fa';
import useTitle from '../../lib/useTitle';

export enum E_QuickLinkTypes {
  NOTES = 'notes',
  LINKS = 'links',
  DRAFTS = 'drafts',
}

const cardDescription: {
  [prop in E_QuickLinkTypes]: { text: string };
} = {
  [E_QuickLinkTypes.NOTES]: {
    text: 'Последние из просмотренных страниц конспектов:',
  },
  [E_QuickLinkTypes.LINKS]: {
    text: 'Ссылки на ресурсы, которые были недавно открыты:',
  },
  [E_QuickLinkTypes.DRAFTS]: {
    text: 'Черновики страниц, которые редактировались, но небыли сохранены:',
  },
};

export default function QuickLinks() {
  const [type, setType] = useState(E_QuickLinkTypes.NOTES);
  const recentLinks = useSelector(selectRecent);
  const drafts = useSelector(selectDrafts);
  useTitle('Недавние записи | Конспект+');

  const links: Record<E_QuickLinkTypes, I_RecentLink[]> = {
    [E_QuickLinkTypes.NOTES]: recentLinks.notes,
    [E_QuickLinkTypes.LINKS]: recentLinks.links,
    [E_QuickLinkTypes.DRAFTS]: drafts.map((d) => ({
      href: `/edit/${d.id}`,
      text: d.title,
      date: d.saved,
    })),
  };

  return (
    <Screen title="Быстрые ссылки">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            onClick={() => setType(E_QuickLinkTypes.NOTES)}
            className={`nav-link ${
              type === E_QuickLinkTypes.NOTES
                ? 'active'
                : 'text-secondary'
            }`}
            aria-current={
              type === E_QuickLinkTypes.NOTES ? 'page' : undefined
            }
          >
            Страницы
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => setType(E_QuickLinkTypes.LINKS)}
            className={`nav-link ${
              type === E_QuickLinkTypes.LINKS
                ? 'active'
                : 'text-secondary'
            }`}
            aria-current={
              type === E_QuickLinkTypes.LINKS ? 'page' : undefined
            }
          >
            Ссылки
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => setType(E_QuickLinkTypes.DRAFTS)}
            className={`nav-link ${
              type === E_QuickLinkTypes.DRAFTS
                ? 'active'
                : 'text-secondary'
            }`}
            aria-current={
              type === E_QuickLinkTypes.DRAFTS ? 'page' : undefined
            }
          >
            Черновики
          </button>
        </li>
      </ul>
      <div className="border border-top-0 h-100 py-3 px-4">
        <p>{cardDescription[type].text}</p>
        {links[type].length === 0 ? (
          <p className="mt-4 text-center text-body-tertiary">
            <span className="fs-1">
              <FaMehRollingEyes />
            </span>
            <br />
            ссылки отсутствуют
          </p>
        ) : (
          <ul className="list-unstyled">
            {links[type].map((link, idx) => (
              <li key={idx}>
                {
                  <CustomLink
                    href={link.href}
                    text={link.text}
                    date={link.date}
                    counter={idx + 1}
                    external={type === E_QuickLinkTypes.LINKS}
                  />
                }
              </li>
            ))}
          </ul>
        )}
      </div>
    </Screen>
  );
}
