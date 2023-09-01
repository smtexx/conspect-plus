import { Alert, Button, ButtonGroup, Form } from 'react-bootstrap';
import Screen from '../Screen/Screen';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { E_Marker, E_TokenType } from '../../app/model/typesModel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageInfo from '../PageInfo/PageInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/controller/redux/store';
import Page404 from '../Page404/Page404';
import {
  E_PageType,
  I_LinksetDraft,
  I_PageDraft,
} from '../../app/model/typesModel';
import {
  addDraft,
  createLinkset,
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

const descriptionLength = {
  min: 20,
  max: 60,
};

const languages: { title: string; code: string }[] = [
  { title: 'Arduino', code: 'arduino' },
  { title: 'C#', code: 'csharp' },
  { title: 'C++', code: 'cpp' },
  { title: 'CSS', code: 'css' },
  { title: 'cURL', code: 'curl' },
  { title: 'Dart', code: 'dart' },
  { title: 'GraphQL', code: 'graphql' },
  { title: 'HTML', code: 'html' },
  { title: 'JSON', code: 'json' },
  { title: 'Java', code: 'java' },
  { title: 'JavaScript', code: 'javascript' },
  { title: 'Kotlin', code: 'kotlin' },
  { title: 'Lua', code: 'lua' },
  { title: 'Markdown', code: 'markdown' },
  { title: 'Objective C', code: 'objectivec' },
  { title: 'PHP', code: 'php' },
  { title: 'Python', code: 'python' },
  { title: 'SCSS', code: 'scss' },
  { title: 'Svelte', code: 'svelte' },
  { title: 'Swift', code: 'swift' },
  { title: 'TypeScript', code: 'typescript' },
];

export default function Editor() {
  const [cursorPos, setCursorPos] = useState(0);
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [lang, setLang] = useState('javascript');
  const markupRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract data
  const draftID = useParams().draftID as string;
  const userData = useSelector((state: RootState) => state.data);
  const draft = userData.drafts.find((d) => d.id === draftID);

  // Fields initial state
  const initial = {
    title: draft?.title ? draft.title : '',
    markup: draft?.markup ? draft.markup : '',
    description: '',
  };

  if (draft?.type === E_PageType.LINKSET) {
    initial.description = draft.description;
  }

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [markup, setMarkup] = useState(initial.markup);

  useEffect(() => {
    if (draft !== undefined) {
      let currentDraft: I_PageDraft | I_LinksetDraft = {
        ...draft,
        title,
        markup,
        saved: new Date().toString(),
      };
      if (currentDraft.type === E_PageType.LINKSET) {
        currentDraft.description = description;
      }

      dispatch(addDraft(currentDraft));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, markup, description]);

  if (draft === undefined) {
    return <Page404 />;
  }

  let conspectTitle = '';
  let sectionTitle = '';

  if (draft.type === E_PageType.PAGE) {
    const conspect = userData.conspects.find(
      (c) => c.id === draft.conspectID
    );
    const section = conspect?.sections.find(
      (s) => s.id === draft.sectionID
    );

    if (conspect) {
      conspectTitle = conspect.title;
    }
    if (section) {
      sectionTitle = section.title;
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSaveDisabled(true);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDescription(value);
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
        insertion = `${startLineBreak}##_${type}\n\n##_/${type}`;
        cursorShift = 5 + startLineBreak.length;
        break;

      case E_TokenType.C:
        insertion = `${startLineBreak}##_${type}\n\n(${lang})##_/${type}`;
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
    if (draft.type === E_PageType.PAGE) {
      const newDraft: I_PageDraft = {
        ...draft,
        title,
        markup,
      };

      dispatch(createPage(newDraft));
      navigate(
        `/conspect/${draft.conspectID}/${draft.sectionID}/${draft.id}`
      );
    }

    if (draft.type === E_PageType.LINKSET) {
      const newDraft: I_LinksetDraft = {
        ...draft,
        title,
        description,
        markup,
      };

      dispatch(createLinkset(newDraft));
      navigate(`/linkset/${draft.id}`);
    }
  };

  const checkNewPage = () => {
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

      // Description checking
      if (
        draft.type === E_PageType.LINKSET &&
        description.length < descriptionLength.min
      ) {
        throw new PageError(
          `Длинна описания страницы менее ${descriptionLength.min} символов.`
        );
      }

      if (
        draft.type === E_PageType.LINKSET &&
        description.length > descriptionLength.max
      ) {
        throw new PageError(
          `Длинна описания страницы более ${descriptionLength.min} символов.`
        );
      }

      // Markup checking
      if (markup.trim().length === 0) {
        throw new PageError(
          `Пустая разметка страницы. Кажется вы забыли ее написать.`
        );
      }

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

      // Code block without lang attribute
      const codeBlocksEndingsSum = markup.match(/##_\/C/gs);
      const codeBlocksEndingsCorrect =
        markup.match(/\([a-z]+\)##_\/C/gs);

      if (
        codeBlocksEndingsSum !== null &&
        codeBlocksEndingsCorrect?.length !==
          codeBlocksEndingsSum.length
      ) {
        throw new PageError(
          'Разметка содержит блок кода без указания языка разработки.'
        );
      }

      // Code blocks with wrong language
      const allCodeBlocks = Array.from(
        markup.matchAll(/\(([a-z]+)\)##_\/C/gs)
      );
      for (let block of allCodeBlocks) {
        const lang = block[1];
        const langIsWrong =
          languages.findIndex(({ code }) => code === lang) === -1;
        if (langIsWrong) {
          throw new PageError(
            `Разметка содержит блок кода с неподдерживаемым языком разработки: ${lang}.`
          );
        }
      }

      // Code block without code
      const emptyCodeBlocks = markup.match(/##_C\s*\(.*?\)##_\/C/gs);
      if (emptyCodeBlocks !== null) {
        throw new PageError(
          `Разметка содержит блоки кода без фрагментов кода: ${emptyCodeBlocks[0]}.`
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

      setSaveDisabled(false);
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

  const handleDeleteDraft = () => {
    navigate('/');
    dispatch(deletePageDraft(draftID));
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
              placeholder="Новая страница"
              onChange={handleTitleChange}
            />
            <p className="form-text">
              Длинна названия страницы от 3 до 40 символов. Текущая:{' '}
              {title.length}
            </p>
          </Form.Group>

          {draft.type === E_PageType.LINKSET && (
            <Form.Group
              className="mb-4"
              controlId="draftDescriptionInput"
            >
              <Form.Label>Описание страницы:</Form.Label>
              <Form.Control
                className="text-white"
                type="text"
                value={description}
                placeholder="Например: онлайн конвертеры изображений"
                onChange={handleDescriptionChange}
              />
              <p className="form-text">
                Длинна описания страницы от 20 до 60 символов.
                Текущая: {description.length}
              </p>
            </Form.Group>
          )}

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
              {draft.type === E_PageType.PAGE && (
                <Form.Select
                  aria-label="Язык блоков кода"
                  title="Язык блоков кода"
                  style={{ width: '11.25rem' }}
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.title}
                    </option>
                  ))}
                </Form.Select>
              )}
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
              описанным на <Link to="/help">справочной странице</Link>
              .
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

            <div className="d-flex justify-content-end flex-wrap gap-3 column-gap-3 mt-4">
              <Button variant="primary" onClick={handleDeleteDraft}>
                Удалить черновик
              </Button>
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
    </Screen>
  );
}

class PageError extends Error {
  name = 'PageError';
}
