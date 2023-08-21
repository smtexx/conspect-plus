import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ChangeEvent, useState, FormEventHandler } from 'react';
import { createId } from '../../lib/createId';
import CustomSideForm from '../CustomSideForm/CustomSideForm';

interface I_Props {
  title: string;
  description: string;
  titlePlaceholder: string;
  descriptionPlaceholder?: string;
  buttonText: string;
  buttonHandler: (title: string, description: string) => void;
}

const options = {
  minTitle: 3,
  maxTitle: 25,
  minDescription: 20,
  maxDescription: 60,
  filter: /[^\wа-я.,: -]/gi,
};

export default function EditBlockFormPart({
  title,
  description,
  titlePlaceholder,
  descriptionPlaceholder,
  buttonText,
  buttonHandler,
}: I_Props) {
  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replaceAll(options.filter, '');
    setTitleField(value);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replaceAll(options.filter, '');
    setDescriptionField(value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    buttonHandler(titleField, descriptionField);
  };

  const fieldPartID = createId(5);
  const titleInputID = `title_input_${fieldPartID}`;
  const titleInputHelpID = `title_input_help_${fieldPartID}`;
  const descriptionInputID = `description_input_${fieldPartID}`;
  const descriptionInputHelpID = `description_input_help_${fieldPartID}`;

  return (
    <CustomSideForm
      title={title}
      description={description}
      onSubmit={handleSubmit}
    >
      <FloatingLabel
        controlId={titleInputID}
        label={titlePlaceholder}
      >
        <Form.Control
          type="text"
          placeholder={titlePlaceholder}
          value={titleField}
          onChange={handleTitleChange}
          aria-labelledby={titleInputHelpID}
          minLength={options.minTitle}
          maxLength={options.maxTitle}
          required={true}
        />
      </FloatingLabel>
      <p id={titleInputHelpID} className="form-text">
        {`Длинна от ${options.minTitle} до ${options.maxTitle} символов. Текущая: ${titleField.length}`}
      </p>
      {descriptionPlaceholder && (
        <>
          <FloatingLabel
            controlId={descriptionInputID}
            label={descriptionPlaceholder}
          >
            <Form.Control
              as="textarea"
              placeholder={descriptionPlaceholder}
              style={{ height: '100px' }}
              value={descriptionField}
              onChange={handleDescriptionChange}
              aria-labelledby={descriptionInputHelpID}
              minLength={options.minDescription}
              maxLength={options.maxDescription}
              required={true}
            />
          </FloatingLabel>
          <p id={descriptionInputHelpID} className="form-text">
            {`Длинна от ${options.minDescription} до ${options.maxDescription} символов. Текущая: ${descriptionField.length}`}
          </p>
        </>
      )}
      <div className="pt-3 d-flex justify-content-end">
        <Button type="submit" variant="primary">
          {buttonText}
        </Button>
      </div>
    </CustomSideForm>
  );
}
