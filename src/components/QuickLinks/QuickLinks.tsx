import { useState, useEffect } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { T_RecentLinks } from '../../app/controller/loadRecentLinks';

export enum E_QuickLinkTypes {
  NOTE = 'note',
  RESOURCE = 'resource',
  DRAFT = 'draft',
}

const cardDescription: {
  [prop in E_QuickLinkTypes]: { text: string };
} = {
  [E_QuickLinkTypes.NOTE]: {
    text: 'Конспекты, которые вы недавно просматривали',
  },
  [E_QuickLinkTypes.RESOURCE]: {
    text: 'Недавно открытые ссылки на ресурсы',
  },
  [E_QuickLinkTypes.DRAFT]: {
    text: 'Черновики конспектов, которые надавно редактировались',
  },
};

export default function QuickLinks() {
  const { hash } = useLocation();
  const [type, setType] = useState<E_QuickLinkTypes>(
    E_QuickLinkTypes.NOTE
  );

  useEffect(() => {
    switch (hash) {
      case '#drafts':
        setType(E_QuickLinkTypes.DRAFT);
        break;

      case '#resources':
        setType(E_QuickLinkTypes.RESOURCE);
        break;

      default:
        setType(E_QuickLinkTypes.NOTE);
        break;
    }
  }, [hash]);

  const recentLinks = useLoaderData() as T_RecentLinks;

  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#notes">
          <Nav.Item>
            <Nav.Link
              active={type === E_QuickLinkTypes.NOTE}
              href="#notes"
            >
              Конспект
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={type === E_QuickLinkTypes.RESOURCE}
              href="#resources"
            >
              Ресурс
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={type === E_QuickLinkTypes.DRAFT}
              href="#drafts"
            >
              Черновик
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Text>{cardDescription[type].text}</Card.Text>
        <ul className="d-flex flex-column">
          {recentLinks[type].map((link) => (
            <li className="pb-2" key={link.href}>
              <Link to={link.href}>{link.text}</Link> (
              {link.wasActive.toLocaleString()})
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}