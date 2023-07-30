import { fakeConspects } from '../../fakeData/getFakeConspects';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CreateSectionForm from '../CreateSectionForm/CreateSectionForm';
import CustomSideForm from '../CustomSideForm/CustomSideForm';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import DeleteDataForm from '../DeleteDataForm/DeleteDataForm';
import ResourceLink from '../ResourceLink/ResourceLink';
import { useState } from 'react';

import Screen from '../Screen/Screen';
import { Button } from 'react-bootstrap';

export default function Pages() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  function handleOptionsOpen() {
    setOptionsIsOpen(true);
  }
  function handleOptionsClose() {
    setOptionsIsOpen(false);
  }

  const section = fakeConspects.conspects[2].sections[1];
  const { conspectID, sectionID } = {
    conspectID: 'conspectID',
    sectionID: 'sectionID',
  };

  return (
    <>
      <Screen
        title={section.title}
        optionsHandler={handleOptionsOpen}
      >
        <Breadcrumbs />
        <ul className="list-unstyled cm-links-list">
          {section.pages.map((page, idx) => (
            <li key={page.id}>
              <ResourceLink
                to={`/conspect/${conspectID}/${sectionID}/${page.id}`}
                text={page.title}
                counter={idx}
              />
            </li>
          ))}
        </ul>
      </Screen>

      <CustomSideMenu
        show={optionsIsOpen}
        onHide={handleOptionsClose}
      >
        <CustomSideForm
          title="Изменить раздел"
          description="Для изменения названия раздела, введите новое значение в поле ниже."
        >
          <CreateSectionForm />
        </CustomSideForm>

        <CustomSideForm
          title="Создать страницу"
          description="Для создания новой страницы в текущем разделе конспекта, нажмите на кнопку ниже. Вы будете перенаправлены в редактор страниц."
        >
          <div className="d-flex justify-content-end">
            <Button variant="primary">Создать</Button>
          </div>
        </CustomSideForm>

        <DeleteDataForm
          title="Удалить раздел"
          description="Удалить текущий раздел конспекта со всеми вложенными страницами без возможности восстановления."
          confirmTitle="Удаление раздела"
          confirmText="Вы действительно уверены что хотите удалить текущий раздел конспекта, со всеми вложенными страницами, без возможности восстановления?"
          deleteHandler={() => {}}
        />
      </CustomSideMenu>
    </>
  );
}
