import { Modal } from 'react-bootstrap';

interface I_Props {
  title: string;
  open: boolean;
  onHide: () => void;
  type: 'primary' | 'error';
  controls: React.ReactNode;
  children: React.ReactNode;
}

export default function CustomModal({
  title,
  open,
  onHide,
  type,
  controls,
  children,
}: I_Props) {
  return (
    <Modal show={open} onHide={onHide}>
      <Modal.Header
        className={type === 'error' ? 'bg-danger text-white' : ''}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>{controls}</Modal.Footer>
    </Modal>
  );
}
