import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';
import Screen from '../Screen/Screen';
import { fakeConspects } from '../../fakeData/getFakeConspects';
import DataCard from '../DataCard/DataCard';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';

export default function Conspect() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createDisabled, setCreateDisabled] = useState(true);

  const conspectRules = {
    titleLength: [3, 20],
    descriptionLength: [10, 40],
  };

  function handleMenuOpen() {
    setMenuIsOpen(true);
  }
  function handleMenuClose() {
    setTitle('');
    setDescription('');
    setCreateDisabled(true);
    setMenuIsOpen(false);
  }

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

  const { conspects } = fakeConspects;

  return (
    <>
      <Screen title="Мои конспекты" optionsHandler={handleMenuOpen}>
        <div className="row gy-4 justify-content-start align-items-stretch">
          {conspects.map(({ id, title, description, saved }) => (
            <div className="col-auto" key={id}>
              <DataCard
                id={id}
                title={title}
                description={description}
                saved={saved}
              />
            </div>
          ))}
        </div>
      </Screen>

      <CustomSideMenu show={menuIsOpen} onHide={handleMenuClose}>
        <Form>
          <h5>Создать конспект</h5>
          <p>
            Для создания нового конспекта заполните поля с названием и
            описанием конспекта:
          </p>
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
        </Form>
      </CustomSideMenu>
    </>
  );
}
