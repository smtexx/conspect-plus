import {
  E_TokenType,
  I_CodeToken,
  I_HeaderToken,
  I_LinkToken,
  I_ListToken,
  I_PreparsedToken,
  I_TextToken,
} from '../model/types';
import {
  escapeUnsupportedChars,
  normalizeWs,
  parseCodeToken,
  parseDecorationMarkers,
  parseHeaderToken,
  parseLinkMarkers,
  parseLinkToken,
  parseListToken,
  parseTextToken,
} from './parser';

describe('Function escapeUnsupportedChars:', () => {
  test('replaces not supported symbols', () => {
    const text = `
      I & You
      <h1 class="hidden">Hello</h1>
      const str = 'Hi!';
    `;
    const processed = `
      I & You
      &lt;h1 class=&quot;hidden&quot;&gt;Hello&lt;/h1&gt;
      const str = &apos;Hi!&apos;;
    `;
    expect(escapeUnsupportedChars(text)).toBe(processed);
  });
});

describe('Function normalizeWs:', () => {
  test('correctly replaces whitespaces', () => {
    const text = `
      hello  every    body

      hey
    `;
    const processed = 'hello every body hey';
    expect(normalizeWs(text)).toBe(processed);
  });
});

describe('Function parseDecorationMarkers:', () => {
  test('replace markers to html markup', () => {
    const text = `
      Пример ##_B жирного ##_/B текста в ##_B двух
      строках ##_/B, как то так ##_A Ссылка (https://ya.ru)##_/A
    `.trim();
    const replaced =
      'Пример <strong class="cheat-marker-bold">жирного</strong> текста в <strong class="cheat-marker-bold">двух строках</strong>, как то так ##_A Ссылка (https://ya.ru)##_/A';
    expect(parseDecorationMarkers(text)).toBe(replaced);
  });
});

describe('Function parseLinkMarkers:', () => {
  test('replace link markers to html markup', () => {
    const text = `
      Текстовая ссылка ##_A ссылка на 
      яндекс (https://ya.ru)##_/A а тут маркер
      жирного текста ##_B Жирный текст ##_/B
    `;

    const processed = `
      Текстовая ссылка <a class="cheat-marker-link" target="_blank" rel="noopener noreferrer" href="https://ya.ru">ссылка на яндекс</a> а тут маркер
      жирного текста ##_B Жирный текст ##_/B
    `;
    expect(parseLinkMarkers(text)).toBe(processed);
  });
});

describe('Function parseHeaderToken:', () => {
  test('correctly parse token', () => {
    const preparsedToken: I_PreparsedToken = {
      type: E_TokenType.H,
      innerMarkup: `Header 
      long text`,
    };
    const token: I_HeaderToken = {
      type: E_TokenType.H,
      text: 'Header long text',
    };

    expect(parseHeaderToken(preparsedToken)).toEqual(token);
  });
});

describe('Function parseLinkToken:', () => {
  test('correctly parse token', () => {
    const preparsedToken: I_PreparsedToken = {
      type: E_TokenType.R,
      innerMarkup: `Really long
      text of link ( https://ya.ru )`,
    };
    const token: I_LinkToken = {
      type: E_TokenType.R,
      text: 'Really long text of link',
      href: 'https://ya.ru',
    };

    expect(parseLinkToken(preparsedToken)).toEqual(token);
  });
});

describe('Function parseListToken:', () => {
  test('correctly parse token', () => {
    const preparsedToken: I_PreparsedToken = {
      type: E_TokenType.U,
      innerMarkup: `##_L Один ##_B из ##_/B пунктов
      списка ##_/L 
      ##_L Еще один ##_A пункт (https://ya.ru)##_/A списка##_/L`,
    };
    const token: I_ListToken = {
      type: E_TokenType.U,
      items: [
        'Один <strong class="cheat-marker-bold">из</strong> пунктов списка',
        'Еще один <a class="cheat-marker-link" target="_blank" rel="noopener noreferrer" href="https://ya.ru">пункт</a> списка',
      ],
    };

    expect(parseListToken(preparsedToken)).toEqual(token);
  });
});

describe('Function parseCodeToken:', () => {
  test('correctly parse token', () => {
    const preparsedToken: I_PreparsedToken = {
      type: E_TokenType.C,
      innerMarkup: `
        const a = 500;
        <Button onClick={console.log('Hello!')}>Greet</Button>
        ##_T Это специальная, ##_I особенная ##_/I обычная
        кнопка которая показывает приветствие ##_/T

        const b = 300;
        ##_T Просто константа ##_/T
      (javascript)`,
    };
    const token: I_CodeToken = {
      type: E_TokenType.C,
      text: `        const a = 500;
        <Button onClick={console.log('Hello!')}>Greet</Button>

        const b = 300;`,
      lang: 'javascript',
      tips: [
        {
          line: 1,
          html: 'Это специальная, <em class="cheat-marker-italic">особенная</em> обычная кнопка которая показывает приветствие',
        },
        {
          line: 3,
          html: 'Просто константа',
        },
      ],
    };

    const parsed = parseCodeToken(preparsedToken);

    expect(parsed).toEqual(token);
  });
});

describe('Function parseTextToken:', () => {
  test('correctly parse token', () => {
    const preparsedToken: I_PreparsedToken = {
      type: E_TokenType.P,
      innerMarkup: `
        Образец ##_I текста ##_/I для ##_M парсинга
        
        текста##_/M со ##_A ссылкой на

        яндекс (https://ya.ru)##_/A. 
        Просто текст.
      `,
    };
    const token: I_TextToken = {
      type: E_TokenType.P,
      html: 'Образец <em class="cheat-marker-italic">текста</em> для <mark class="cheat-marker-marked">парсинга текста</mark> со <a class="cheat-marker-link" target="_blank" rel="noopener noreferrer" href="https://ya.ru">ссылкой на яндекс</a>. Просто текст.',
    };

    expect(parseTextToken(preparsedToken)).toEqual(token);
  });
});
