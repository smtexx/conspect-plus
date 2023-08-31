import { useState } from 'react';
import Screen from '../Screen/Screen';
import DataCard from '../DataCard/DataCard';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import EditBlockFormPart from '../EditBlockFormPart/EditBlockFormPart';
import { useDispatch, useSelector } from 'react-redux';
import {
  createConspect,
  selectConspects,
} from '../../app/controller/redux/data/dataSlice';
import useTitle from '../../lib/useTitle';

export default function Conspects() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const conspects = useSelector(selectConspects);
  const dispatch = useDispatch();
  useTitle('Мои конспекты | Конспект+');

  function handleMenuOpen() {
    setMenuIsOpen(true);
  }
  function handleMenuClose() {
    setMenuIsOpen(false);
  }

  function handleCreateConspect(title: string, description: string) {
    dispatch(createConspect({ title, description }));
    setMenuIsOpen(false);
  }

  return (
    <>
      <Screen title="Мои конспекты" optionsHandler={handleMenuOpen}>
        <div className="row gy-4 justify-content-start align-items-stretch">
          {conspects.length === 0 ? (
            <p style={{ maxWidth: '40rem' }}>
              Конспекты отсутствуют. Создайте новый конспект используя
              меню опций в правой части заголовка окна.
            </p>
          ) : (
            conspects.map(({ id, title, description, saved }) => (
              <div className="col-auto" key={id}>
                <DataCard
                  id={id}
                  title={title}
                  description={description}
                  saved={saved}
                />
              </div>
            ))
          )}
        </div>
      </Screen>

      <CustomSideMenu show={menuIsOpen} onHide={handleMenuClose}>
        <EditBlockFormPart
          title="Создать конспект"
          description="Для создания нового конспекта заполните поля с названием и описанием конспекта: "
          titlePlaceholder="Название конспекта"
          descriptionPlaceholder="Описание конспекта"
          buttonText="Создать"
          buttonHandler={handleCreateConspect}
        />
      </CustomSideMenu>
    </>
  );
}
