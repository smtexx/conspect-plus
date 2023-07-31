import { Button } from 'react-bootstrap';
import { fakeConspects } from '../../fakeData/getFakeConspects';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CustomSideForm from '../CustomSideForm/CustomSideForm';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import Screen from '../Screen/Screen';
import Token from '../Token/Token';
import { useState } from 'react';
import DeleteDataForm from '../DeleteDataForm/DeleteDataForm';
import TipScreen from '../TipScreen/TipScreen';

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
        <table>
          <tr>
            <td className="pe-3">Создано: </td>{' '}
            <td>{page.created.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="pe-3">Изменено: </td>{' '}
            <td>{page.saved.toLocaleString()}</td>
          </tr>
        </table>

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
        <CustomSideForm
          title="Редактировать страницу"
          description="Для внесения изменений в текущую страницу, нажмите на кнопку ниже. Вы будете перенаправлены в редактор страниц."
        >
          <div className="d-flex justify-content-end">
            <Button variant="primary">Редактировать</Button>
          </div>
        </CustomSideForm>

        <DeleteDataForm
          title="Удалить страницу"
          description="Удалить текущую страницу без возможности восстановления."
          confirmTitle="Удаление страницы"
          confirmText="Вы действительно уверены, что хотите удалить текущую страницу, без возможности восстановления?"
          deleteHandler={() => {}}
        />
      </CustomSideMenu>
    </>
  );
}
