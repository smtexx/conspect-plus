import { fakeConspects } from '../../fakeData/getFakeConspects';
import { useState } from 'react';
import Screen from '../Screen/Screen';
import ResourceLink from '../ResourceLink/ResourceLink';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import EditBlockFormPart from '../EditBlockFormPart/EditBlockFormPart';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';

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
        <EditBlockFormPart
          title="Создать раздел"
          description="Для создания нового раздела в текущем конспекте заполните поле с названием раздела ниже:"
          titleFieldConfig={{
            placeholder: 'Название раздела',
            minLength: 3,
            maxLength: 20,
          }}
          buttonText="Создать"
          buttonHandler={() => {
            console.log('Раздел создан!');
          }}
        />

        <EditBlockFormPart
          title="Изменить конспект"
          description="Для изменения названия или описания конспекта, введите новые значения в поля ниже:"
          titleFieldConfig={{
            placeholder: 'Название конспекта',
            minLength: 3,
            maxLength: 20,
          }}
          descriptionFieldConfig={{
            placeholder: 'Описание конспекта',
            minLength: 3,
            maxLength: 40,
          }}
          buttonText="Сохранить"
          buttonHandler={() => {
            console.log('Конспект изменен!');
          }}
        />

        <ProcessDataFormPart
          title="Удалить конспект"
          description="Удалить текущий конспект вместе со всеми вложенными разделами и страницами без возможности восстановления."
          buttonText="Удалить"
          confirmTitle="Удаление конспекта"
          confirmText="Вы действительно уверены что хотите удалить текущий конспект без возможности восстановления?"
          processHandler={() => console.log('Конспект удален!')}
        />
      </CustomSideMenu>
    </>
  );
}
