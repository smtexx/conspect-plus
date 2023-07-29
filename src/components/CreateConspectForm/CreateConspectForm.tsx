import { Button, FloatingLabel } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';

export default function CreateConspectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createDisabled, setCreateDisabled] = useState(true);

  const conspectRules = {
    titleLength: [3, 20],
    descriptionLength: [10, 40],
  };

  function unlockCreate() {
    if (
      title.length >= conspectRules.titleLength[0] &&
      title.length <= conspectRules.titleLength[1] &&
      description.length >= conspectRules.descriptionLength[0] &&
      description.length <= conspectRules.descriptionLength[1]
    ) {
      return setCreateDisabled(false);
    } else {
      return setCreateDisabled(true);
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setTitle(value);
    unlockCreate();
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setDescription(value);
    unlockCreate();
  }

  return (
    <>
      <FloatingLabel
        controlId="conspectTitleInput"
        label="Название конспекта"
      >
        <Form.Control
          type="text"
          placeholder="Название конспекта"
          value={title}
          onChange={handleTitleChange}
          aria-labelledby="titleHelpBlock"
        />
      </FloatingLabel>
      <p id="titleHelpBlock" className="form-text">
        {`Длинна заголовка от ${conspectRules.titleLength[0]} до ${conspectRules.titleLength[1]} символов.`}
      </p>
      <FloatingLabel
        controlId="conspectDescriptionInput"
        label="Описание конспекта"
      >
        <Form.Control
          as="textarea"
          placeholder="Описание конспекта"
          style={{ height: '100px' }}
          value={description}
          onChange={handleDescriptionChange}
        />
      </FloatingLabel>
      <p id="descriptionHelpBlock" className="form-text">
        {`Длинна описания от ${conspectRules.descriptionLength[0]} до ${conspectRules.descriptionLength[1]} символов.`}
      </p>
      <div className="pt-3 d-flex justify-content-end">
        <Button variant="primary" disabled={createDisabled}>
          Создать
        </Button>
      </div>
    </>
  );
}
