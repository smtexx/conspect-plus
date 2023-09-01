import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import Screen from '../Screen/Screen';
import Token from '../Token/Token';
import { useState } from 'react';
import TipScreen from '../TipScreen/TipScreen';
import PageInfo from '../PageInfo/PageInfo';
import ProcessDataFormPart from '../ProcessDataFormPart/ProcessDataFormPart';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDraft,
  deletePage,
  selectConspects,
} from '../../app/controller/redux/data/dataSlice';
import Page404 from '../Page404/Page404';
import { I_PageDraft } from '../../app/model/typesModel';

export default function Note() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const params = useParams();
  const conspectID = params.conspectID as string;
  const sectionID = params.sectionID as string;
  const pageID = params.pageID as string;
  const conspects = useSelector(selectConspects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const conspect = conspects.find((c) => c.id === conspectID);
  const section = conspect?.sections.find((s) => s.id === sectionID);
  const page = section?.pages.find((p) => p.id === pageID);

  if (
    conspect === undefined ||
    section === undefined ||
    page === undefined
  ) {
    return <Page404 />;
  }

  const handleOptionsOpen = () => {
    setOptionsIsOpen(true);
  };
  const handleOptionsClose = () => {
    setOptionsIsOpen(false);
  };

  const handleEditPage = () => {
    const draft: I_PageDraft = {
      id: pageID,
      type: page.type,
      title: page.title,
      created: page.created,
      saved: new Date().toString(),
      markup: page.markup,
      conspectID,
      sectionID,
    };

    dispatch(addDraft(draft));
    navigate(`/edit/${draft.id}`);
  };

  const handleDeletePage = () => {
    dispatch(
      deletePage({
        conspectID,
        sectionID,
        pageID,
      })
    );
    navigate(`/conspect/${conspectID}/${sectionID}`);
  };

  return (
    <>
      <Screen title={page.title} optionsHandler={handleOptionsOpen}>
        <Breadcrumbs
          titles={[conspect.title, section.title, page.title]}
        />
        <PageInfo
          tables={[
            [
              ['Создано: ', new Date(page.created).toLocaleString()],
              ['Изменено: ', new Date(page.saved).toLocaleString()],
            ],
          ]}
        />

        <div className="pt-3">
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
          processHandler={handleEditPage}
        />
        <ProcessDataFormPart
          title="Удалить страницу"
          description="Удалить текущую страницу раздела без возможности восстановления."
          buttonText="Удалить"
          confirmTitle="Удаление страницы"
          confirmText="Вы действительно уверены что хотите удалить текущую страницу без возможности восстановления?"
          processHandler={handleDeletePage}
        />
      </CustomSideMenu>
    </>
  );
}
