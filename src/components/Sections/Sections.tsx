import { fakeConspects } from '../../fakeData/getFakeConspects';
import { useState } from 'react';
import Screen from '../Screen/Screen';
import ResourceLink from '../ResourceLink/ResourceLink';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import CreateConspectForm from '../CreateConspectForm/CreateConspectForm';
import CustomSideForm from '../CustomSideForm/CustomSideForm';
import DeleteDataForm from '../DeleteDataForm/DeleteDataForm';
import CreateSectionForm from '../CreateSectionForm/CreateSectionForm';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function Sections() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  function handleOptionsOpen() {
    setOptionsIsOpen(true);
  }
  function handleOptionsClose() {
    setOptionsIsOpen(false);
  }

  const conspect = fakeConspects.conspects[2];
  return (
    <>
      <Screen
        title={conspect.title}
        optionsHandler={handleOptionsOpen}
      >
        <Breadcrumbs />
        <ul className="list-unstyled cm-links-list">
          {conspect.sections.map((section, idx) => (
            <li key={section.id}>
              <ResourceLink
                to={`/conspect/${conspect.id}/${section.id}`}
                text={section.title}
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
          title="Создать раздел"
          description="Для создания нового раздела в текущем конспекте заполните поле с названием раздела ниже:"
        >
          <CreateSectionForm />
        </CustomSideForm>

        <CustomSideForm
          title="Изменить конспект"
          description="Для изменения названия или описания конспекта, введите новые значения в поля ниже."
        >
          <CreateConspectForm />
        </CustomSideForm>

        <DeleteDataForm
          title="Удалить конспект"
          description="Удалить текущий конспект без возможности восстановления."
          confirmTitle="Удаление конспекта"
          confirmText="Вы действительно уверены что хотите удалить текущий конспект без возможности восстановления?"
          deleteHandler={() => {}}
        />
      </CustomSideMenu>
    </>
  );
}
