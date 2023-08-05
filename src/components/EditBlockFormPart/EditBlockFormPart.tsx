import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ChangeEvent, useState, useEffect } from 'react';
import { createId } from '../../lib/createId';
import CustomSideForm from '../CustomSideForm/CustomSideForm';

interface I_FieldConfig {
  placeholder: string;
  minLength: number;
  maxLength: number;
}

interface I_Props {
  title: string;
  description: string;
  titleFieldConfig: I_FieldConfig;
  descriptionFieldConfig?: I_FieldConfig;
  buttonText: string;
  buttonHandler: () => void;
}

export default function EditBlockFormPart({
  title,
  description,
  titleFieldConfig,
  descriptionFieldConfig,
  buttonText,
  buttonHandler,
}: I_Props) {
  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const tests = [
      titleField.length >= titleFieldConfig.minLength,
      titleField.length <= titleFieldConfig.maxLength,
    ];

    if (descriptionFieldConfig) {
      tests.push(
        descriptionField.length >= descriptionFieldConfig.minLength,
        descriptionField.length <= descriptionFieldConfig.maxLength
      );
    }

    let unlock = true;
    for (let test of tests) {
      if (!test) {
        unlock = false;
        break;
      }
    }

    if (unlock) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    titleField,
    descriptionField,
    titleFieldConfig.minLength,
    titleFieldConfig.maxLength,
    descriptionFieldConfig,
    descriptionFieldConfig?.minLength,
    descriptionFieldConfig?.maxLength,
  ]);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitleField(value);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDescriptionField(value);
  }

  const fieldPartID = createId(5);
  const titleInputID = `title_input_${fieldPartID}`;
  const titleInputHelpID = `title_input_help_${fieldPartID}`;
  const descriptionInputID = `description_input_${fieldPartID}`;
  const descriptionInputHelpID = `description_input_help_${fieldPartID}`;

  return (
    <CustomSideForm title={title} description={description}>
      <FloatingLabel
        controlId={titleInputID}
        label={titleFieldConfig.placeholder}
      >
        <Form.Control
          type="text"
          placeholder={titleFieldConfig.placeholder}
          value={titleField}
          onChange={handleTitleChange}
          aria-labelledby={titleInputHelpID}
        />
      </FloatingLabel>
      <p id={titleInputHelpID} className="form-text">
        {`Длинна от ${titleFieldConfig.minLength} до ${titleFieldConfig.maxLength} символов. Текущая: ${titleField.length}`}
      </p>
      {descriptionFieldConfig && (
        <>
          <FloatingLabel
            controlId={descriptionInputID}
            label={descriptionFieldConfig.placeholder}
          >
            <Form.Control
              as="textarea"
              placeholder={descriptionFieldConfig.placeholder}
              style={{ height: '100px' }}
              value={descriptionField}
              onChange={handleDescriptionChange}
              aria-labelledby={descriptionInputHelpID}
            />
          </FloatingLabel>
          <p id={descriptionInputHelpID} className="form-text">
            {`Длинна от ${descriptionFieldConfig.minLength} до ${descriptionFieldConfig.maxLength} символов. Текущая: ${descriptionField.length}`}
          </p>
        </>
      )}
      <div className="pt-3 d-flex justify-content-end">
        <Button
          variant="primary"
          disabled={disabled}
          onClick={buttonHandler}
        >
          {buttonText}
        </Button>
      </div>
    </CustomSideForm>
  );
}
