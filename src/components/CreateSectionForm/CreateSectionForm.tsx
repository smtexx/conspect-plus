import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';

export default function CreateSectionForm() {
  const [title, setTitle] = useState('');
  const [createDisabled, setCreateDisabled] = useState(true);

  const conspectRules = {
    titleLength: [3, 30],
  };

  function unlockCreate() {
    if (
      title.length >= conspectRules.titleLength[0] &&
      title.length <= conspectRules.titleLength[1]
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

  return (
    <>
      <FloatingLabel
        controlId="conspectTitleInput"
        label="Название раздела"
      >
        <Form.Control
          type="text"
          placeholder="Название раздела"
          value={title}
          onChange={handleTitleChange}
          aria-labelledby="sectionTitleHelpBlock"
        />
      </FloatingLabel>
      <p id="sectionTitleHelpBlock" className="form-text">
        {`Длинна названия от ${conspectRules.titleLength[0]} до ${conspectRules.titleLength[1]} символов.`}
      </p>

      <div className="pt-3 d-flex justify-content-end">
        <Button variant="primary" disabled={createDisabled}>
          Сохранить
        </Button>
      </div>
    </>
  );
}
