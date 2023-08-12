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
  selectConspect,
} from '../../app/controller/redux/data/dataSlice';
import Page404 from '../Page404/Page404';
import { updateUserActivity } from '../../app/controller/redux/users/usersSlice';

export default function Sections() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const { conspectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const conspect = useSelector((state) =>
    selectConspect(state, conspectID as string)
  );

  function handleOptionsOpen() {
    setOptionsIsOpen(true);
  }
  function handleOptionsClose() {
    setOptionsIsOpen(false);
  }

  function handleCreateSection(title: string) {
    if (conspect !== undefined) {
      dispatch(updateUserActivity());
      dispatch(createSection({ conspectID: conspect.id, title }));
      handleOptionsClose();
    }
  }

  function handleEditConspect(title: string, description: string) {
    if (conspect !== undefined) {
      dispatch(updateUserActivity());
      dispatch(
        editConspect({ conspectID: conspect.id, title, description })
      );
      handleOptionsClose();
    }
  }

  function handleDeleteConspect() {
    if (conspect !== undefined) {
      navigate('/conspect');
      dispatch(updateUserActivity());
      dispatch(deleteConspect({ conspectID: conspect.id }));
    }
  }

  return conspect !== undefined ? (
    <>
      <Screen
        title={conspect.title}
        optionsHandler={handleOptionsOpen}
      >
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
            maxLength: 20,
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
  ) : (
    <Page404 />
  );
}
