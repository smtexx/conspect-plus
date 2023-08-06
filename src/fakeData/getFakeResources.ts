import { E_TokenType, I_LinkToken } from '../app/model/types';

interface I_Resource {
  id: string;
  title: string;
  description: string;
  created: Date;
  saved: Date;
  tokens: I_LinkToken[];
  markup: string;
}

export function getFakeResources(): I_Resource[] {
  return [
    {
      id: 'resource_1',
      title: 'Библотеки',
      description:
        'Ссылки на страницы документации библиотек и фреймворков',
      saved: new Date(),
      created: new Date(),
      tokens: [
        {
          href: 'https://ya.ru',
          text: 'ReactJS',
          type: E_TokenType.R,
        },
        {
          href: 'https://ya.ru',
          text: 'NextJS',
          type: E_TokenType.R,
        },
        {
          href: 'https://ya.ru',
          text: 'ReduxJS',
          type: E_TokenType.R,
        },
      ],
      markup: `
      ##_R ReactJS (https://ya.ru)##_/R
      ##_R NextJS (https://ya.ru)##_/R
      ##_R ReduxJS (https://ya.ru)##_/R
      `.trim(),
    },
    {
      id: 'resource_2',
      title: 'Работа с контентом',
      description:
        'Ссылки на страницы сервисов обработки контента: иконки, шрифты и тд.',
      saved: new Date(),
      created: new Date(),
      tokens: [
        {
          href: 'https://ya.ru',
          text: 'Генератор иконок',
          type: E_TokenType.R,
        },
        {
          href: 'https://ya.ru',
          text: 'Конвертер шрифтов',
          type: E_TokenType.R,
        },
      ],
      markup: `
      ##_R Генератор иконок (https://ya.ru)##_/R
      ##_R Конвертер шрифтов (https://ya.ru)##_/R
      `.trim(),
    },
  ];
}
