import { Offcanvas } from 'react-bootstrap';
import s from './CustomSideMenu.module.scss';

interface I_Props {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

export default function CustomSideMenu({
  show,
  onHide,
  children,
}: I_Props) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title as="h4">Редактор</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className={s.content}>{children}</div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
