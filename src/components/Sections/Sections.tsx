import { useState } from 'react';
import Screen from '../Screen/Screen';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import EditBlockFormPart from '../EditBlockFormPart/EditBlockFormPart';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';
import CustomLink from '../CustomLink/CustomLink';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSection,
  deleteConspect,
  editConspect,
  selectConspects,
} from '../../app/controller/redux/data/dataSlice';
import Page404 from '../Page404/Page404';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function Sections() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const conspectID = useParams().conspectID as string;
  const conspects = useSelector(selectConspects);
  const conspect = conspects.find((c) => c.id === conspectID);

  if (conspect === undefined) {
    return <Page404 />;
  }

  const handleOptionsOpen = () => {
    setOptionsIsOpen(true);
  };
  const handleOptionsClose = () => {
    setOptionsIsOpen(false);
  };

  const handleCreateSection = (title: string) => {
    dispatch(createSection({ conspectID: conspect.id, title }));
    handleOptionsClose();
  };

  const handleEditConspect = (title: string, description: string) => {
    dispatch(
      editConspect({ conspectID: conspect.id, title, description })
    );
    handleOptionsClose();
  };

  const handleDeleteConspect = () => {
    navigate('/conspect');
    dispatch(deleteConspect({ conspectID: conspect.id }));
  };

  return (
    <>
      <Screen
        title={conspect.title}
        optionsHandler={handleOptionsOpen}
      >
        <Breadcrumbs titles={[conspect.title]} />
        {conspect.sections.length === 0 ? (
          <p style={{ maxWidth: '40rem' }}>
            Разделы отсутствуют. Создайте новый раздел конспекта
            используя меню опций в правой части заголовка окна.
          </p>
        ) : (
          <ul className="list-unstyled cm-links-list">
            {conspect.sections.map((section, idx) => (
              <li key={section.id}>
                <CustomLink
                  href={`/conspect/${conspect.id}/${section.id}`}
                  text={section.title}
                  counter={idx + 1}
                />
              </li>
            ))}
          </ul>
        )}
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
            maxLength: 25,
          }}
          buttonText="Создать"
          buttonHandler={handleCreateSection}
        />

        <EditBlockFormPart
          title="Изменить конспект"
          description="Для изменения названия или описания конспекта, введите новые значения в поля ниже:"
          titleFieldConfig={{
            placeholder: 'Название конспекта',
            minLength: 3,
            maxLength: 25,
          }}
          descriptionFieldConfig={{
            placeholder: 'Описание конспекта',
            minLength: 20,
            maxLength: 60,
          }}
          buttonText="Сохранить"
          buttonHandler={handleEditConspect}
        />

        <ProcessDataFormPart
          title="Удалить конспект"
          description="Удалить текущий конспект вместе со всеми вложенными разделами и страницами без возможности восстановления."
          buttonText="Удалить"
          confirmTitle="Удаление конспекта"
          confirmText="Вы действительно уверены что хотите удалить текущий конспект без возможности восстановления?"
          processHandler={handleDeleteConspect}
        />
      </CustomSideMenu>
    </>
  );
}
