import { useState, useEffect } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getFakeRecentLinks } from '../../fakeData/getFakeRecentLinks';
import Screen from '../Screen/Screen';
import ResourceLink from '../ResourceLink/ResourceLink';

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
    text: 'Ссылки на ресурсы, которые были недавно открыты',
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

  const { links } = getFakeRecentLinks(type);

  return (
    <Screen title="Быстрые ссылки">
      <Card className="w-100" style={{ minHeight: '100%' }}>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#notes">
            <Nav.Item>
              <Nav.Link
                className={
                  type === E_QuickLinkTypes.NOTE
                    ? 'text-white'
                    : 'text-secondary'
                }
                active={type === E_QuickLinkTypes.NOTE}
                href="#notes"
              >
                Конспект
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={
                  type === E_QuickLinkTypes.RESOURCE
                    ? 'text-white'
                    : 'text-secondary'
                }
                active={type === E_QuickLinkTypes.RESOURCE}
                href="#resources"
              >
                Ресурс
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={
                  type === E_QuickLinkTypes.DRAFT
                    ? 'text-white'
                    : 'text-secondary'
                }
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
          <ul className="list-unstyled cm-links-list ms-3">
            {links.map((link, idx) => (
              <li key={link.href}>
                <ResourceLink
                  to={link.href}
                  text={link.text}
                  counter={idx}
                  date={link.wasActive}
                />
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Screen>
  );
}
