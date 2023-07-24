import { Button } from 'react-bootstrap';
import CustomModal from '../CustomModal/CustomModal';

interface I_Props {
  title: string;
  open: boolean;
  onHide: () => void;
  type: 'primary' | 'error';
  modalText: string;
  buttonText: string;
  buttonHandler: () => void;
}

export default function MessageModal({
  title,
  open,
  onHide,
  type,
  modalText,
  buttonText,
  buttonHandler,
}: I_Props) {
  return (
    <CustomModal
      title={title}
      open={open}
      onHide={onHide}
      type={type}
      controls={
        <Button
          variant={type === 'error' ? 'outline-danger' : 'primary'}
          onClick={buttonHandler}
        >
          {buttonText}
        </Button>
      }
    >
      {modalText}
    </CustomModal>
  );
}
