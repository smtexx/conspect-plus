import { fakeConspects } from '../../fakeData/getFakeConspects';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import { useState } from 'react';
import Screen from '../Screen/Screen';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';
import EditBlockFormPart from '../EditBlockFormPart/EditBlockFormPart';
import CustomLink from '../CustomLink/CustomLink';

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
              <CustomLink
                href={`/conspect/${conspectID}/${sectionID}/${page.id}`}
                text={page.title}
                counter={idx + 1}
              />
            </li>
          ))}
        </ul>
      </Screen>

      <CustomSideMenu
        show={optionsIsOpen}
        onHide={handleOptionsClose}
      >
        <ProcessDataFormPart
          title="Создать страницу"
          description="Для создания новой страницы в текущем разделе конспекта, нажмите на кнопку ниже. Вы будете перенаправлены в редактор страниц."
          buttonText="Создать"
          confirmTitle="Создать страницу"
          confirmText="Вы действительно хотите создать новую страницу в текущем разделе конспекта?"
          processHandler={() => console.log('Страница создана!')}
        />

        <EditBlockFormPart
          title="Изменить раздел"
          description="Для изменения названия раздела, введите новое значение в поле ниже:"
          titleFieldConfig={{
            placeholder: 'Название раздела',
            minLength: 3,
            maxLength: 20,
          }}
          buttonText="Создать"
          buttonHandler={() => console.log('Раздел изменен!')}
        />
        <ProcessDataFormPart
          title="Удалить раздел"
          description="Удалить текущий раздел конспекта вместе со всеми вложенными страницами без возможности восстановления."
          buttonText="Удалить"
          confirmTitle="Удаление раздела"
          confirmText="Вы действительно уверены что хотите удалить текущий раздел без возможности восстановления?"
          processHandler={() => console.log('Раздел удален!')}
        />
      </CustomSideMenu>
    </>
  );
}
