import { useState } from 'react';
import { getFakeResources } from '../../fakeData/getFakeResources';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import DataCard from '../DataCard/DataCard';
import Screen from '../Screen/Screen';
import EditBlockFormPart from '../EditBlockFormPart/EditBlockFormPart';

export default function Linksets() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleMenuOpen() {
    setMenuIsOpen(true);
  }
  function handleMenuClose() {
    setMenuIsOpen(false);
  }

  const links = getFakeResources();

  return (
    <>
      <Screen title="Мои ссылки" optionsHandler={handleMenuOpen}>
        <div className="row gy-4 justify-content-start align-items-stretch">
          {links.map(({ id, title, description, saved }) => (
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
        <EditBlockFormPart
          title="Создать набор ссылок"
          description="Для создания нового набора ссылок заполните поля с названием и описанием набора ссылок: "
          titleFieldConfig={{
            placeholder: 'Название набора ссылок',
            minLength: 3,
            maxLength: 20,
          }}
          descriptionFieldConfig={{
            placeholder: 'Описание набора ссылок',
            minLength: 3,
            maxLength: 40,
          }}
          buttonText="Создать"
          buttonHandler={() => {
            console.log('Набор ссылок создан!');
            setMenuIsOpen(false);
          }}
        />
      </CustomSideMenu>
    </>
  );
}
