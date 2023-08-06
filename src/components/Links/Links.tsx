import { useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import Screen from '../Screen/Screen';
import PageInfo from '../PageInfo/PageInfo';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';
import { getFakeResources } from '../../fakeData/getFakeResources';
import OutsideLink from '../OutsideLink/OutsideLink';

export default function Links() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  function handleOptionsOpen() {
    setOptionsIsOpen(true);
  }
  function handleOptionsClose() {
    setOptionsIsOpen(false);
  }

  const linkset = getFakeResources()[0];

  return (
    <>
      <Screen
        title={linkset.title}
        optionsHandler={handleOptionsOpen}
      >
        <Breadcrumbs />
        <PageInfo
          tables={[
            [
              ['Создано: ', linkset.created.toLocaleString()],
              ['Изменено: ', linkset.saved.toLocaleString()],
            ],
          ]}
        />

        <ul className="list-unstyled">
          {linkset.tokens.map((token, idx) => (
            <OutsideLink
              text={token.text}
              href={token.href}
              key={idx}
            />
          ))}
        </ul>
      </Screen>

      <CustomSideMenu
        show={optionsIsOpen}
        onHide={handleOptionsClose}
      >
        <ProcessDataFormPart
          title="Изменить страницу"
          description="Для изменения текущей страницы, нажмите на кнопку ниже. Вы будете перенаправлены в редактор страниц."
          buttonText="Изменить"
          confirmTitle="Изменить страницу"
          confirmText="Вы действительно хотите изменить текущую страницу?"
          processHandler={() => console.log('Страница изменена!')}
        />
        <ProcessDataFormPart
          title="Удалить страницу"
          description="Удалить текущую страницу раздела без возможности восстановления."
          buttonText="Удалить"
          confirmTitle="Удаление страницы"
          confirmText="Вы действительно уверены что хотите удалить текущую страницу без возможности восстановления?"
          processHandler={() => console.log('Страница удалена!')}
        />
      </CustomSideMenu>
    </>
  );
}
