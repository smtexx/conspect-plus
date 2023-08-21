import { useState } from 'react';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import Screen from '../Screen/Screen';
import PageInfo from '../PageInfo/PageInfo';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';
import CustomLink from '../CustomLink/CustomLink';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDraft,
  deleteLinkset,
  selectLinkset,
} from '../../app/controller/redux/data/dataSlice';
import { RootState } from '../../app/controller/redux/store';
import Page404 from '../Page404/Page404';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { FaMehRollingEyes } from 'react-icons/fa';
import { I_LinksetDraft } from '../../app/model/typesModel';

export default function Links() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const params = useParams();
  const linksetID = params.linksetID as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkset = useSelector((state: RootState) =>
    selectLinkset(state, linksetID)
  );

  if (linkset === undefined) {
    return <Page404 />;
  }

  const handleOptionsOpen = () => {
    setOptionsIsOpen(true);
  };
  const handleOptionsClose = () => {
    setOptionsIsOpen(false);
  };

  const handleEditLinkset = () => {
    const linksetDraft: I_LinksetDraft = {
      ...linkset,
    };

    dispatch(addDraft(linksetDraft));
    navigate(`/edit/${linksetDraft.id}`);
  };

  const handleDeleteLinkset = () => {
    navigate('/linkset');
    dispatch(deleteLinkset(linksetID));
  };

  return (
    <>
      <Screen
        title={linkset.title}
        optionsHandler={handleOptionsOpen}
      >
        <Breadcrumbs titles={[linkset.title]} />
        <PageInfo
          tables={[
            [
              [
                'Создано: ',
                new Date(linkset.created).toLocaleString(),
              ],
              [
                'Изменено: ',
                new Date(linkset.saved).toLocaleString(),
              ],
            ],
          ]}
        />

        {linkset.tokens.length === 0 ? (
          <p className="mt-4 text-center text-body-tertiary">
            <span className="fs-1">
              <FaMehRollingEyes />
            </span>
            <br />
            ссылки отсутствуют
          </p>
        ) : (
          <ul className="list-unstyled">
            {linkset.tokens.map((token, idx) => (
              <li key={idx}>
                <CustomLink
                  text={token.text}
                  href={token.href}
                  external={true}
                  addRecent={true}
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
        <ProcessDataFormPart
          title="Изменить страницу"
          description="Для изменения текущей страницы, нажмите на кнопку ниже. Вы будете перенаправлены в редактор страниц."
          buttonText="Изменить"
          confirmTitle="Изменить страницу"
          confirmText="Вы действительно хотите изменить текущую страницу?"
          processHandler={handleEditLinkset}
        />
        <ProcessDataFormPart
          title="Удалить страницу"
          description="Удалить текущую страницу раздела без возможности восстановления."
          buttonText="Удалить"
          confirmTitle="Удаление страницы"
          confirmText="Вы действительно уверены что хотите удалить текущую страницу без возможности восстановления?"
          processHandler={handleDeleteLinkset}
        />
      </CustomSideMenu>
    </>
  );
}
