import { Button } from 'react-bootstrap';
import CustomSideForm from '../CustomSideForm/CustomSideForm';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';

interface I_Props {
  title: string;
  description: string;
  confirmTitle: string;
  confirmText: string;
  deleteHandler: () => void;
}

export default function DeleteDataForm({
  title,
  description,
  confirmText,
  confirmTitle,
  deleteHandler,
}: I_Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleModalClose() {
    setModalIsOpen(false);
  }
  function handleModalIsOpen() {
    setModalIsOpen(true);
  }
  function handleModalConfirm() {
    deleteHandler();
    handleModalClose();
  }

  return (
    <>
      <CustomSideForm title={title} description={description}>
        <div className="pt-3 d-flex justify-content-end">
          <Button variant="primary" onClick={handleModalIsOpen}>
            Удалить
          </Button>
        </div>
      </CustomSideForm>

      <ConfirmModal
        title={confirmTitle}
        open={modalIsOpen}
        disabled={false}
        onHide={handleModalClose}
        buttonText="Удалить"
        buttonHandler={handleModalConfirm}
      >
        <p>{confirmText}</p>
      </ConfirmModal>
    </>
  );
}
