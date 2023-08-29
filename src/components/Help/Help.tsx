import Screen from '../Screen/Screen';
import TagCard from '../TagCard/TagCard';

interface I_Tag {
  title: string;
  description: string;
  sample: string;
  nesting: string;
}

const blocks: I_Tag[] = [
  {
    title: 'Заголовок',
    description: 'Оформление главного заголовка страницы.',
    nesting: 'текст',
    sample: `##_H Заголовок ##_/H`,
  },
  {
    title: 'Подзаголовок',
    description: 'Оформление заголовков разделов страницы.',
    nesting: 'текст',
    sample: `##_S Подзаголовок ##_/S`,
  },
  {
    title: 'Параграф',
    description: 'Оформление текстовых параграфов.',
    nesting: 'B, I, M, A, текст',
    sample: `##_P 
  Параграф текста 
#_/P`,
  },
  {
    title: 'Список',
    description: 'Оформление маркированных списков.',
    nesting: 'L',
    sample: `##_U
  Пункты списка
##_/U`,
  },
  {
    title: 'Список',
    description: 'Оформление нумерованных списков.',
    nesting: 'L',
    sample: `##_O
  Пункты списка
##_/O`,
  },
  {
    title: 'Код',
    description: 'Оформление форматированного програмного кода.',
    nesting: 'T, код',
    sample: `##_C
  Фрагмент кода
(язык)##_/C`,
  },
  {
    title: 'Предупреждение',
    description: 'Оформление текстовых предупреждений.',
    nesting: 'B, I, M, A, текст',
    sample: `##_W
  Текстовое предупреждение
##_/W`,
  },
  {
    title: 'Ресурс',
    description: 'Оформление блочных ссылок на внешний ресурс.',
    nesting: 'текст',
    sample: `##_R Описание (URL)##_/R`,
  },
];

const elements: I_Tag[] = [
  {
    title: 'Пункт',
    description: 'Оформление пунктов разных видов списков.',
    nesting: 'B, I, M, A, текст',
    sample: `##_L Пункт списка ##_/L`,
  },
  {
    title: 'Комментарий',
    description: 'Оформление комментариев к фрагментам кода.',
    nesting: 'B, I, M, A, текст',
    sample: `##_T Комментарий ##_/T`,
  },
];

const markers: I_Tag[] = [
  {
    title: 'Жирный текст',
    description: 'Выделение жирным фрагментов текста внутри блоков.',
    nesting: 'текст',
    sample: `##_B Жирный текст ##_/B`,
  },
  {
    title: 'Курсив',
    description:
      'Выделение курсивом фрагментов текста внутри блоков.',
    nesting: 'текст',
    sample: `##_I Курсив ##_/I`,
  },
  {
    title: 'Маркированный текст',
    description: 'Маркированные фрагменты текста внутри блоков.',
    nesting: 'текст',
    sample: `##_M Жирный текст ##_/M`,
  },
  {
    title: 'Гиперссылка',
    description: 'Оформление строчных гиперссылок внутри блоков.',
    nesting: 'текст',
    sample: `##_A Описание (URL)##_/A`,
  },
];

export default function Help() {
  return (
    <>
      <Screen title="Инструкция">
        <section>
          <h2 className="fs-4">Основные блоки</h2>
          <p style={{ maxWidth: '40rem' }}>
            Используются для вставки данных на самом верхнем уровне
            вложенности. Блоки ресурсов (##_R){' '}
            <strong>
              можно использовать только на страницах листов ссылок
            </strong>
            . <strong>Вложенность</strong> говорит о том какой контент
            допускается вкладывать в блоки.
          </p>
          <ul className="row list-unstyled row-cols-auto gy-4">
            {blocks.map((b) => (
              <li className="col" key={b.title}>
                <TagCard {...b} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h2 className="fs-4">Элементы блоков</h2>
          <p style={{ maxWidth: '40rem' }}>
            Используются только внутри определенных основных блоков,
            позволяют создавать дополнительную функциональность.
            Элементы комментариев распологают <strong>после</strong>{' '}
            строки кода, к которой данный комментарий относится.
          </p>
          <ul className="row list-unstyled row-cols-auto gy-4">
            {elements.map((b) => (
              <li className="col" key={b.title}>
                <TagCard {...b} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h2 className="fs-4">Маркеры</h2>
          <p style={{ maxWidth: '40rem' }}>
            Предназначены для форматирования текста и создания
            текстовых ссылок. Используются только внутри определенных
            текстовых блоков. В маркеры допускается вкладывать{' '}
            <strong>только текст</strong>.
          </p>
          <ul className="row list-unstyled row-cols-auto gy-4">
            {markers.map((b) => (
              <li className="col" key={b.title}>
                <TagCard {...b} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h2 className="fs-4">Пример конспекта</h2>
          <p style={{ maxWidth: '40rem' }}>
            Ниже представлен пример хорошо отформатированного
            конспекта.
          </p>
          <div
            className="p-3 ps-4  bg-body-secondary rounded"
            style={{ maxWidth: '40rem' }}
          >
            <code>
              <pre className="text-primary">
                {`##_H Заголовок ##_/H
##_S Подзаголовок ##_/S

##_P 
  Параграф с разными видами текстового содержимого. Например
  текст выделенный ##_B Жирный текст ##_/B, или текст написаный
  ##_I курсивом ##_/I, ну и конечно ##_M маркированный текст ##_/M. 
  А вот и текстовая ссылка ##_A Яндекс (https://ya.ru)##_/A
##_/P

##_W
  Очень важное текстовое предупреждение
##_/W

##_U
  ##_L Пункт маркированного списка ##_/L
  ##_L Пункт маркированного списка ##_/L
  ##_L Пункт маркированного списка ##_/L
##_/U

##_O
  ##_L Пункт один нумерованного списка ##_/L
  ##_L Пункт два нумерованного списка ##_/L
  ##_L Пункт три нумерованного списка ##_/L
##_/O

##_C
export interface I_RoutePath {
  ##_T Экспортируем интерфейс ##_/T
  text: string;
  path: string;
}

export function getFakeRoutes(): { routes: I_RoutePath[] } {
  return {
    ##_T Возвращаем из функции ##_B объект ##_/B содержащий текущий маршрут ##_/T
    routes: [
      { text: 'Конспекты', path: 'conspect', isOk: true },
      { text: 'JavaScript', path: 'conpectID' },
      { text: 'Работа с функциями', path: 'sectionID' },
      { text: 'Основы', path: 'pageID', idx: 15 },
    ],
  };
}
(typescript)##_/C

##_R Что такое MVC. (https://ru.wikipedia.org/wiki/Model-View-Controller)##_/R

`}
              </pre>
            </code>
          </div>
        </section>
      </Screen>
    </>
  );
}
