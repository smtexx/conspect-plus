import { parse } from '../app/controller/parser';
import { I_Conspect, I_Page } from '../app/model/types';
import { sampleToParse } from '../other/sampleToParse';

interface I_Conspects {
  conspects: I_Conspect[];
}

export const fakeConspects = getFakeConspects();

function getFakeConspects(): I_Conspects {
  return {
    conspects: [
      {
        id: getRandomId(),
        title: 'HTML разметка',
        description: 'Основные правила написания HTML разметки с MDN',
        saved: getRandomDate(),
        sections: [
          {
            id: getRandomId(),
            title: 'Блочные теги',
            pages: getTopicPages(3),
          },
          {
            id: getRandomId(),
            title: 'Строчные теги',
            pages: getTopicPages(5),
          },
          {
            id: getRandomId(),
            title: 'Глобальные атрибуты',
            pages: getTopicPages(4),
          },
        ],
      },
      {
        id: getRandomId(),
        title: 'CSS стили',
        description: 'Правила написания CSS стилей. Источник MDN',
        saved: getRandomDate(),
        sections: [
          {
            id: getRandomId(),
            title: 'Блочная модель',
            pages: getTopicPages(2),
          },
          {
            id: getRandomId(),
            title: 'Правила каскада',
            pages: getTopicPages(3),
          },
        ],
      },
      {
        id: getRandomId(),
        title: 'JavaScript',
        description: 'Основы JavaScript с сайта learn.javascript.ru',
        saved: getRandomDate(),
        sections: [
          {
            id: getRandomId(),
            title: 'Типы данных',
            pages: getTopicPages(4),
          },
          {
            id: getRandomId(),
            title: 'Работа с функциями',
            pages: getTopicPages(2),
          },
          {
            id: getRandomId(),
            title: 'Классы',
            pages: getTopicPages(5),
          },
          {
            id: getRandomId(),
            title: 'Асинхронные функции',
            pages: getTopicPages(2),
          },
          {
            id: getRandomId(),
            title: 'Обработка ошибок',
            pages: getTopicPages(4),
          },
        ],
      },
      {
        id: getRandomId(),
        title: 'HTML разметка',
        description: 'Основные правила написания HTML разметки с MDN',
        saved: getRandomDate(),
        sections: [
          {
            id: getRandomId(),
            title: 'Блочные теги',
            pages: getTopicPages(3),
          },
          {
            id: getRandomId(),
            title: 'Строчные теги',
            pages: getTopicPages(5),
          },
          {
            id: getRandomId(),
            title: 'Глобальные атрибуты',
            pages: getTopicPages(4),
          },
        ],
      },
      {
        id: getRandomId(),
        title: 'CSS стили',
        description: 'Правила написания CSS стилей. Источник MDN',
        saved: getRandomDate(),
        sections: [
          {
            id: getRandomId(),
            title: 'Блочная модель',
            pages: getTopicPages(2),
          },
          {
            id: getRandomId(),
            title: 'Правила каскада',
            pages: getTopicPages(3),
          },
        ],
      },
      {
        id: getRandomId(),
        title: 'JavaScript',
        description: 'Основы JavaScript с сайта learn.javascript.ru',
        saved: getRandomDate(),
        sections: [
          {
            id: getRandomId(),
            title: 'Типы данных',
            pages: getTopicPages(4),
          },
          {
            id: getRandomId(),
            title: 'Работа с функциями',
            pages: getTopicPages(2),
          },
          {
            id: getRandomId(),
            title: 'Классы',
            pages: getTopicPages(5),
          },
          {
            id: getRandomId(),
            title: 'Асинхронные функции',
            pages: getTopicPages(2),
          },
          {
            id: getRandomId(),
            title: 'Обработка ошибок',
            pages: getTopicPages(4),
          },
        ],
      },
    ],
  };
}

function getRandomDate(): Date {
  return new Date(Date.now() - Math.ceil(Math.random() * 10000));
}

function getRandomId(): string {
  return Math.ceil(Math.random() * 1000000).toString();
}

function getTopicPages(qty: number): I_Page[] {
  return Array(qty)
    .fill('')
    .map((val, idx) => ({
      id: getRandomId(),
      title: `Страница ${idx + 1}`,
      saved: getRandomDate(),
      created: getRandomDate(),
      tokens: parse(sampleToParse),
      markup: sampleToParse,
    }));
}
