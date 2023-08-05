import { fakeConspects } from '../../fakeData/getFakeConspects';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import Screen from '../Screen/Screen';
import Token from '../Token/Token';
import { useState } from 'react';
import TipScreen from '../TipScreen/TipScreen';
import PageInfo from '../PageInfo/PageInfo';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';

export default function Note() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  function handleOptionsOpen() {
    setOptionsIsOpen(true);
  }
  function handleOptionsClose() {
    setOptionsIsOpen(false);
  }

  const page = fakeConspects.conspects[1].sections[1].pages[0];

  return (
    <>
      <Screen title={page.title} optionsHandler={handleOptionsOpen}>
        <Breadcrumbs />
        <PageInfo
          tables={[
            [
              ['Создано: ', page.created.toLocaleString()],
              ['Изменено: ', page.saved.toLocaleString()],
            ],
          ]}
        />

        <div className="text-white pt-3">
          {page.tokens.map((token, idx) => (
            <Token key={idx} token={token} />
          ))}
        </div>
        <TipScreen />
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
