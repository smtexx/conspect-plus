import { useState } from 'react';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import DataCard from '../DataCard/DataCard';
import Screen from '../Screen/Screen';
import EditBlockFormPart from '../EditBlockFormPart/EditBlockFormPart';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLinkset,
  selectLinksets,
} from '../../app/controller/redux/data/dataSlice';

export default function Linksets() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const links = useSelector(selectLinksets);
  const dispatch = useDispatch();

  function handleMenuOpen() {
    setMenuIsOpen(true);
  }
  function handleMenuClose() {
    setMenuIsOpen(false);
  }

  const handleCreateLinkset = (
    title: string,
    description: string
  ) => {
    dispatch(createLinkset({ title, description }));
    handleMenuClose();
  };

  return (
    <>
      <Screen title="Мои ссылки" optionsHandler={handleMenuOpen}>
        <div className="row gy-4 justify-content-start align-items-stretch">
          {links.length === 0 ? (
            <p style={{ maxWidth: '40rem' }}>
              Наборы ссылок отсутствуют. Создайте новый набор ссылок
              используя меню опций в правой части заголовка окна.
            </p>
          ) : (
            links.map(({ id, title, description, saved }) => (
              <div className="col-auto" key={id}>
                <DataCard
                  id={id}
                  title={title}
                  description={description}
                  saved={saved.toString()}
                />
              </div>
            ))
          )}
        </div>
      </Screen>
      <CustomSideMenu show={menuIsOpen} onHide={handleMenuClose}>
        <EditBlockFormPart
          title="Создать набор ссылок"
          description="Для создания нового набора ссылок заполните поля с названием и описанием набора ссылок: "
          titleFieldConfig={{
            placeholder: 'Название набора ссылок',
            minLength: 3,
            maxLength: 25,
          }}
          descriptionFieldConfig={{
            placeholder: 'Описание набора ссылок',
            minLength: 20,
            maxLength: 60,
          }}
          buttonText="Создать"
          buttonHandler={handleCreateLinkset}
        />
      </CustomSideMenu>
    </>
  );
}
