import { Offcanvas } from 'react-bootstrap';

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
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
