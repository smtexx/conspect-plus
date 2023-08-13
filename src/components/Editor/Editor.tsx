import { Alert, Button, ButtonGroup, Form } from 'react-bootstrap';
import Screen from '../Screen/Screen';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { E_Marker, E_TokenType } from '../../app/model/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageInfo from '../PageInfo/PageInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/controller/redux/store';
import Page404 from '../Page404/Page404';
import { E_PageType } from '../../app/model/typesModel';
import { updateUserActivity } from '../../app/controller/redux/users/usersSlice';
import {
  createPage,
  deletePageDraft,
} from '../../app/controller/redux/data/dataSlice';

interface I_MenuButton {
  symbol: E_TokenType | E_Marker;
  text: string;
}

interface I_MenuGroup {
  label: string;
  buttons: I_MenuButton[];
}

const titleLength = {
  min: 3,
  max: 40,
};

export default function Editor() {
  const [title, setTitle] = useState('');
  const [markup, setMarkup] = useState('');
  const [cursorPos, setCursorPos] = useState(0);
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const markupRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract data
  const draftID = useParams().draftID as string;
  const userData = useSelector((state: RootState) => state.data);
  const draft = userData.drafts.find((d) => d.id === draftID);

  useEffect(() => {
    if (draft?.title && draft.markup) {
      setTitle(draft.title);
      setMarkup(draft.markup);
    }
  }, [draft]);

  if (draft === undefined) {
    return <Page404 />;
  }

  let conspectTitle = '';
  let sectionTitle = '';
  let alert: React.ReactNode;

  if (draft.type === E_PageType.PAGE) {
    const conspect = userData.conspects.find(
      (c) => c.id === draft.conspectID
    );
    const section = conspect?.sections.find(
      (s) => s.id === draft.sectionID
    );

    if (conspect === undefined) {
      alert = (
        <Alert variant="danger" style={{ maxWidth: '40rem' }}>
          Черновик который вы хотели отредактировать, принадлежал
          удаленному конспекту. Редактирование такого черновика
          невозможно, поэтому он был также удален.
        </Alert>
      );
    } else if (section === undefined) {
      alert = (
        <Alert variant="danger" style={{ maxWidth: '40rem' }}>
          Черновик который вы хотели отредактировать, принадлежал
          удаленному разделу конспекта. Редактирование такого
          черновика невозможно, поэтому он был также удален.
        </Alert>
      );
    } else {
      conspectTitle = conspect.title;
      sectionTitle = section.title;
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSaveDisabled(true);
  }

  function handleMarkupSelectionChange(
    e: ChangeEvent<HTMLTextAreaElement>
  ) {
    const newCursorPos = e.target.selectionStart;
    setCursorPos(newCursorPos);
  }

  function handleMarkupChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newCursorPos = e.target.selectionStart;
    setCursorPos(newCursorPos);
    setMarkup(e.target.value);
    setSaveDisabled(true);
  }

  function addLineBreak(pos: number, markup: string): '' | '\n' {
    if (pos <= 0) {
      return '';
    }

    const prevString = markup.slice(0, pos);
    if (/.*\s*\n\s*$/.test(prevString)) {
      return '';
    } else {
      return '\n';
    }
  }

  const insertMarkup = (type: E_TokenType | E_Marker) => {
    let insertion, cursorShift;
    const startLineBreak = addLineBreak(cursorPos, markup);

    switch (type) {
      case E_TokenType.H:
      case E_TokenType.S:
        insertion = `${startLineBreak}##_${type}  ##_/${type}`;
        cursorShift = 5 + startLineBreak.length;
        break;

      case E_TokenType.P:
      case E_TokenType.W:
      case E_TokenType.O:
      case E_TokenType.U:
      case E_TokenType.C:
        insertion = `${startLineBreak}##_${type}\n\n##_/${type}`;
        cursorShift = 5 + startLineBreak.length;
        break;

      case E_TokenType.R:
        insertion = `${startLineBreak}##_${type}  (https://)##_/${type}`;
        cursorShift = 5 + startLineBreak.length;
        break;

      case E_Marker.B:
      case E_Marker.I:
      case E_Marker.M:
        insertion = `##_${type}  ##_/${type}`;
        cursorShift = 5;
        break;

      case E_Marker.A:
        insertion = `##_${type}  (https://)##_/${type}`;
        cursorShift = 5;
        break;

      case E_Marker.L:
      case E_Marker.T:
        insertion = `${startLineBreak}##_${type}  ##_/${type}`;
        cursorShift = 5 + startLineBreak.length;
        break;

      default:
        insertion = '';
        cursorShift = 0;
        break;
    }

    const modifiedText = `${markup.slice(
      0,
      cursorPos
    )}${insertion}${markup.slice(cursorPos)}`;
    setMarkup(modifiedText);

    const newCursorPos = cursorPos + cursorShift;

    if (markupRef.current) {
      markupRef.current.focus();
      setTimeout(() => {
        if (markupRef.current) {
          markupRef.current.selectionStart =
            markupRef.current.selectionEnd = newCursorPos;
        }
      }, 50);
    }
  };

  const handleSavePage = () => {
    dispatch(updateUserActivity());
    if (draft.type === E_PageType.PAGE) {
      dispatch(
        createPage({
          ...draft,
          title,
          markup,
          saved: new Date().toString(),
        })
      );
      navigate(
        `/conspect/${draft.conspectID}/${draft.sectionID}/${draft.id}`
      );
    }
    dispatch(deletePageDraft({ draftID: draftID }));
  };

  const checkNewPage = () => {
    const titleIsCorrect = title.length <= 3 && title.length <= 40;

    try {
      // Title checking
      if (title.length < titleLength.min) {
        throw new PageError(
          `Длинна заголовка страницы менее ${titleLength.min} символов.`
        );
      }

      if (title.length > titleLength.max) {
        throw new PageError(
          `Длинна заголовка страницы более ${titleLength.max} символов.`
        );
      }

      // Markup checking
      if (draft.type === E_PageType.LINKSET) {
        // Resources checking
        // Invalid tags
        const invalidTag = markup.match(/##_\/?([HSPUOCWLTBIMA])/);
        if (invalidTag !== null) {
          throw new PageError(
            `Найден недопустимый тег ${invalidTag[0]}.`
          );
        }
      } else {
        // Notes checking
        // No tags
        const tags = markup.match(/##_([HSPUOCW]).+?##_\/(\1)/s);
        if (tags === null) {
          throw new PageError(
            'Разметка страницы не содержит известных тегов.'
          );
        }
        // Invalid tags
        const invalidTag = markup.match(/##_\/?R/);
        if (invalidTag !== null) {
          throw new PageError(
            `Найден тег ресурса ##_R, который может быть использован только на странице ресурсов.`
          );
        }

        // Nesting
        const rules = [
          ['HSBIMAR', ''],
          ['PLTW', 'BIMA'],
          ['UO', 'L'],
          ['C', 'T'],
        ];

        rules.forEach((rule) => {
          const tagsMarkup = Array.from(
            markup.matchAll(
              new RegExp(`##_([${rule[0]}])(.*?)##_/(\\1)`, 'gs')
            )
          ).map((match) => match[2]);

          tagsMarkup.forEach((tagMarkup) => {
            const allowedTagTypes = rule[1].split('');
            const insideTagTypes = Array.from(
              tagMarkup.matchAll(
                /##_([HSPUOCWRLTBIMA]).*?##_\/(\1)/gs
              )
            ).map((match) => match[1]);

            insideTagTypes.forEach((tag) => {
              if (
                !allowedTagTypes.includes(
                  tag as E_Marker | E_TokenType
                )
              ) {
                throw new PageError(
                  `Фрагмент разметки "${tagMarkup}" содержит недопустимый тег "${tag}".`
                );
              }
            });
          });
        });

        // Empty tags
        const emptyTag = markup.match(
          /##_([HSPUOCWRLTBIMA])\s*##_\/(\1)/s
        );
        if (emptyTag !== null) {
          throw new PageError(
            `Разметка содержит пустой тег: ${emptyTag[0]}.`
          );
        }
      }

      // Nesting of identical tags
      const identicalTagsNesting = markup.match(
        // eslint-disable-next-line no-useless-escape
        /##_([HSPUOCWRLTBIMA])[^(##_\/(\1)]*?##_(\1)/s
      );

      if (identicalTagsNesting !== null) {
        throw new PageError(
          `Вложенность одинаковых тегов во фрагменте "${identicalTagsNesting[0]}".`
        );
      }

      // Empty link
      const linkWithoutText = markup.match(
        /##_([RA])\s*\(.*?\)##_\/(\1)/gs
      );
      if (linkWithoutText !== null) {
        throw new PageError(
          `Разметка содержит ссылку без текста: ${linkWithoutText[0]}.`
        );
      }

      // Link without href
      const linksWithoutHref = markup.match(
        /##_([RA]).*?\((https?:\/\/)?\s*\)##_\/(\1)/s
      );
      if (linksWithoutHref !== null) {
        throw new PageError(
          `Разметка содержит ссылку без гиперссылки: ${linksWithoutHref[0]}.`
        );
      }

      setSaveDisabled(titleIsCorrect);
      setError('');
    } catch (error) {
      if (error instanceof PageError) {
        setError(error.message);
        setSaveDisabled(true);
      } else {
        throw error;
      }
    }
  };

  const menu: I_MenuGroup[] =
    draft.type === E_PageType.PAGE
      ? [
          {
            label: 'Основные блоки',
            buttons: [
              { symbol: E_TokenType.H, text: 'Вставить заголовок' },
              {
                symbol: E_TokenType.S,
                text: 'Вставить подзаголовок',
              },
              { symbol: E_TokenType.P, text: 'Вставить параграф' },
              {
                symbol: E_TokenType.W,
                text: 'Вставить предупреждение',
              },
              {
                symbol: E_TokenType.U,
                text: 'Вставить маркированный список',
              },
              {
                symbol: E_TokenType.O,
                text: 'Вставить нумерованный список',
              },
              {
                symbol: E_TokenType.C,
                text: 'Вставить фрагмент кода',
              },
            ],
          },
          {
            label: 'Вложенные блоки',
            buttons: [
              { symbol: E_Marker.L, text: 'Вставить пункт списка' },
              {
                symbol: E_Marker.T,
                text: 'Вставить комментарий к коду',
              },
            ],
          },
          {
            label: 'Форматирование текста',
            buttons: [
              { symbol: E_Marker.B, text: 'Вставить жирный текст' },
              {
                symbol: E_Marker.I,
                text: 'Вставить курсивный текст',
              },
              {
                symbol: E_Marker.M,
                text: 'Вставить маркированный текст',
              },
              { symbol: E_Marker.A, text: 'Вставить ссылку' },
            ],
          },
        ]
      : [
          {
            label: 'Основные блоки',
            buttons: [
              {
                symbol: E_TokenType.R,
                text: 'Вставить ссылку на ресурс',
              },
            ],
          },
        ];

  const pageInfo: [string, string][][] = [
    [
      ['Дата создания: ', new Date(draft.created).toLocaleString()],
      ['Дата изменения: ', new Date(draft.saved).toLocaleString()],
    ],
  ];

  if (draft.type === E_PageType.PAGE) {
    pageInfo.push([
      ['Конспект: ', conspectTitle],
      ['Раздел: ', sectionTitle],
    ]);
  }

  return (
    <Screen title="Редактор страниц">
      {alert || (
        <>
          <PageInfo tables={pageInfo} />
          <Form>
            <h5 className="text-white">Редактор</h5>
            <p>
              Используйте форму ниже, для редактирования страницы.
              Вставляйте элементы разметки, с помощью меню над
              редактируемым полем. <br />
              Более подробно о том как использовать теги разметки
              конспекта вы можете узнать перейдя по ссылке на{' '}
              <Link to="/help">справочную страницу</Link>.
            </p>
            <Form.Group className="mb-4" controlId="draftTitleInput">
              <Form.Label>Название страницы:</Form.Label>
              <Form.Control
                className="text-white"
                type="text"
                value={title}
                placeholder="Одна из страниц конспекта"
                onChange={handleTitleChange}
              />
              <p className="form-text">
                Длинна названия страницы от 3 до 40 символов. Текущая:{' '}
                {title.length}
              </p>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="draftMarkupTextarea"
            >
              <Form.Label>Разметка страницы:</Form.Label>
              <div className="d-flex column-gap-4 row-gap-3 flex-wrap mb-3">
                {menu.map((menuGroup) => (
                  <ButtonGroup
                    aria-label={menuGroup.label}
                    key={menuGroup.label}
                  >
                    {menuGroup.buttons.map((button) => (
                      <Button
                        aria-label={button.text}
                        title={button.text}
                        className="fw-bold"
                        variant="primary"
                        key={button.text}
                        onClick={() => insertMarkup(button.symbol)}
                      >
                        {button.symbol}
                      </Button>
                    ))}
                  </ButtonGroup>
                ))}
              </div>
              <Form.Control
                className="text-white font-monospace"
                value={markup}
                as="textarea"
                rows={15}
                onChange={handleMarkupChange}
                onSelect={handleMarkupSelectionChange}
                ref={markupRef}
              />
              <p className="form-text mb-4">
                Разметка страницы должна соответствовать правилам
                описанным на{' '}
                <Link to="/help">справочной странице</Link>.
              </p>

              {error && (
                <Alert variant="danger" className="mb-4">
                  <Alert.Heading>Найдена ошибка</Alert.Heading>
                  <p>{error}</p>
                  <hr />
                  <p className="mb-0">
                    Для того чтобы сохранить страницу, вам необходимо
                    исправить найденную ошибку и выполнить проверку
                    черновика повторно.
                  </p>
                </Alert>
              )}

              <div className="d-flex justify-content-end column-gap-3 mt-4">
                <Button variant="primary">Удалить черновик</Button>
                <Button variant="primary" onClick={checkNewPage}>
                  Проверить
                </Button>
                <Button
                  disabled={saveDisabled}
                  variant="primary"
                  onClick={handleSavePage}
                >
                  Сохранить
                </Button>
              </div>
            </Form.Group>
          </Form>
        </>
      )}
    </Screen>
  );
}

class PageError extends Error {
  name = 'PageError';
}
