import { Button } from 'react-bootstrap';
import CustomSideForm from '../CustomSideForm/CustomSideForm';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';

interface I_Props {
  title: string;
  description: string;
  buttonText: string;
  confirmTitle: string;
  confirmText: string;
  processHandler: () => void;
}

export default function ProcessDataFormPart({
  title,
  description,
  buttonText,
  confirmTitle,
  confirmText,
  processHandler,
}: I_Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleModalClose() {
    setModalIsOpen(false);
  }
  function handleModalOpen() {
    setModalIsOpen(true);
  }
  function handleModalConfirm() {
    processHandler();
    handleModalClose();
  }

  return (
    <>
      <CustomSideForm title={title} description={description}>
        <div className="pt-3 d-flex justify-content-end">
          <Button variant="primary" onClick={handleModalOpen}>
            {buttonText}
          </Button>
        </div>
      </CustomSideForm>

      <ConfirmModal
        title={confirmTitle}
        open={modalIsOpen}
        disabled={false}
        onHide={handleModalClose}
        buttonText={buttonText}
        buttonHandler={handleModalConfirm}
      >
        <p>{confirmText}</p>
      </ConfirmModal>
    </>
  );
}
