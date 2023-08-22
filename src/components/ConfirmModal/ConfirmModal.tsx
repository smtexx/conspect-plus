import { Button } from 'react-bootstrap';
import CustomModal from '../CustomModal/CustomModal';

interface I_Props {
  title: string;
  open: boolean;
  onHide: () => void;
  buttonText: string;
  buttonHandler: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export default function ConfirmModal({
  title,
  open,
  onHide,
  buttonText,
  buttonHandler,
  disabled,
  children,
}: I_Props) {
  return (
    <CustomModal
      title={title}
      open={open}
      onHide={onHide}
      type="primary"
      controls={
        <div className="d-flex justify-content-end ">
          <Button variant="secondary" onClick={onHide} tabIndex={1}>
            Отмена
          </Button>
          <Button
            className="ms-3"
            variant="primary"
            onClick={buttonHandler}
            disabled={disabled}
            tabIndex={2}
          >
            {buttonText}
          </Button>
        </div>
      }
    >
      {children}
    </CustomModal>
  );
}
