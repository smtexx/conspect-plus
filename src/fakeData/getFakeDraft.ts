import { parse } from '../app/controller/parser';
import { I_Page } from '../app/model/types';

interface I_NoteDraft extends I_Page {
  type: 'note';
  conspectID: string;
  sectionID: string;
}

interface I_ResourceDraft extends I_Page {
  type: 'resource';
  sectionID: string;
}

type T_Draft = I_NoteDraft | I_ResourceDraft;

const noteMarkup = `
##_H Заголовок ##_/H
##_S Подзаголовок ##_/S

##_P
  А здесь просто параграф текста
##_/P

##_P 
  А тут параграф с разными видами текстового содержимого. Например
  текст выделенный ##_B Жирный текст ##_/B, или текст написаный
  ##_I курсивом ##_/I, ну и конечно ##_M маркированный текст ##_/M. 
  Как то так. А вот и текстовая ссылка ##_A Яндекс (https://ya.ru)##_/A
##_/P

##_W
  Текстовое предупреждение, очень страшное текстовое предупреждение
##_/W

##_U
##_L Пункт первый ##_/L
##_L Пункт второй ##_/L
##_L Пункт третий ##_/L
##_/U

##_O
##_L Пункт один ##_/L
##_L Пункт два ##_/L
##_L Пункт три ##_/L
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

##_C
<!DOCTYPE html>
##_T Тип документа ##_/T
<html>
  <head>
  ##_T В теге head размещается информация о документе ##_/T
    <title>My First Webpage</title>
    <meta charset="UTF-8">
    <meta name="description" content="This is my first website. It includes lots of information about my life.">
  </head>
  <body>
    <h1>Welcome to my webpage</h1>
    <p>Welcome to <em>my</em> brand new website.</p>
    <p>This site will be my <strong>new<strong> home on the web.</p>
    <a href="http://www.google.com">Google</a>
    ##_T Так можно создать ссылку ##_/T
  </body>
</html>
(html)##_/C

##_R Что такое mvc? (https://ru.wikipedia.org/wiki/Model-View-Controller)##_/R
`.trim();

const resourceMarkup = `
##_R Яндекс (www.ya.ru)##_/R
##_R Гугл (www.google.com)##_/R
`.trim();

export default function getFakeDraft(
  type: 'note' | 'resource'
): T_Draft {
  if (type === 'note') {
    return {
      id: 'UniqID',
      type: 'note',
      title: 'Пример страницы конспекта',
      conspectID: '0000001',
      sectionID: '0000002',
      created: new Date(),
      saved: new Date(),
      markup: noteMarkup,
      tokens: parse(noteMarkup),
    };
  } else {
    return {
      id: 'UniqID',
      type: 'resource',
      title: 'Пример страницы с сылками',
      sectionID: '0000002',
      created: new Date(),
      saved: new Date(),
      markup: resourceMarkup,
      tokens: parse(resourceMarkup),
    };
  }
}
