import { useState } from 'react';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import DataCard from '../DataCard/DataCard';
import Screen from '../Screen/Screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLinksetDraft,
  selectLinksets,
} from '../../app/controller/redux/data/dataSlice';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';
import { createID } from '../../app/controller/utils';
import { useNavigate } from 'react-router-dom';

export default function Linksets() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const links = useSelector(selectLinksets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleMenuOpen() {
    setMenuIsOpen(true);
  }
  function handleMenuClose() {
    setMenuIsOpen(false);
  }

  const handleCreateLinkset = () => {
    const linksetID = createID();
    dispatch(createLinksetDraft(linksetID));
    navigate(`/edit/${linksetID}`);
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
        <ProcessDataFormPart
          title="Создать набор ссылок"
          description="Для создания нового набора ссылок, нажмите на кнопку ниже. Вы будете перенаправлены в редактор страниц."
          buttonText="Создать"
          confirmTitle="Создать набор ссылок"
          confirmText="Вы действительно хотите создать новый набор ссылок?"
          processHandler={handleCreateLinkset}
        />
      </CustomSideMenu>
    </>
  );
}
