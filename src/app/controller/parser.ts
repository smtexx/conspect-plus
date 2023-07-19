import hljs from 'highlight.js';
import {
  E_TokenType,
  I_CodeToken,
  I_HeaderToken,
  I_LinkToken,
  I_ListToken,
  I_PreparsedToken,
  I_TextToken,
  T_Token,
} from '../model/types';

export function escapeUnsupportedChars(markup: string): string {
  return markup
    .replaceAll(`<`, '&lt;')
    .replaceAll(`>`, '&gt;')
    .replaceAll(`'`, '&apos;')
    .replaceAll(`"`, '&quot;');
}

export function normalizeWs(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

export function parseDecorationMarkers(markup: string): string {
  const replacers = [
    ['B', '<strong class="cheat-marker-bold">', '</strong>'],
    ['I', '<em class="cheat-marker-italic">', '</em>'],
    ['M', '<mark class="cheat-marker-marked">', '</mark>'],
  ];

  let parsed = markup;
  replacers.forEach(([marker, start, end]) => {
    parsed = parsed.replace(
      new RegExp(`##_${marker}(.+?)##_/${marker}`, 'gs'),
      (match, p1) => `${start}${normalizeWs(p1)}${end}`
    );
  });

  return parsed;
}

export function parseLinkMarkers(markup: string): string {
  return markup.replace(
    /##_A(.+?)\((.+?)\)##_\/A/gs,
    (match, p1, p2) =>
      `<a class="cheat-marker-link" target="_blank" rel="noopener noreferrer" href="${normalizeWs(
        p2
      )}">${normalizeWs(p1)}</a>`
  );
}

function assertTokenType<T>(
  type: unknown,
  allowed: E_TokenType[]
): asserts type is T {
  if (!allowed.includes(type as E_TokenType)) {
    throw new Error(
      `Wrong token type ${type} instead ${allowed.join(', ')}`
    );
  }
}

function process(
  markup: string,
  tube: Array<(val: string) => string>
): string {
  return tube.reduce((markup, fn) => fn(markup), markup);
}

export function parseHeaderToken(
  preparsedToken: I_PreparsedToken
): I_HeaderToken {
  assertTokenType<E_TokenType.H | E_TokenType.S>(
    preparsedToken.type,
    [E_TokenType.H, E_TokenType.S]
  );

  const token = {
    type: preparsedToken.type,
    text: process(preparsedToken.innerMarkup, [normalizeWs]),
  };

  return token;
}

export function parseLinkToken(
  preparsedToken: I_PreparsedToken
): I_LinkToken {
  assertTokenType<E_TokenType.R>(preparsedToken.type, [
    E_TokenType.R,
  ]);

  const token: I_LinkToken = {
    type: E_TokenType.R,
    text: '',
    href: '',
  };

  const match = preparsedToken.innerMarkup.match(/^(.+)\((.+)\)$/s);
  if (match !== null) {
    token.text = process(match[1], [normalizeWs]);
    token.href = process(match[2], [normalizeWs]);
  }

  return token;
}

export function parseListToken(
  preparsedToken: I_PreparsedToken
): I_ListToken {
  assertTokenType<E_TokenType.U | E_TokenType.O>(
    preparsedToken.type,
    [E_TokenType.U, E_TokenType.O]
  );

  const token: I_ListToken = {
    type: preparsedToken.type,
    items: [],
  };

  Array.from(
    preparsedToken.innerMarkup.matchAll(/##_L(.+?)##_\/L/gs)
  ).forEach((match) => {
    const markup = process(match[1], [
      parseDecorationMarkers,
      parseLinkMarkers,
      normalizeWs,
    ]);

    token.items.push(markup);
  });

  return token;
}

export function parseCodeToken(
  preparsedToken: I_PreparsedToken
): I_CodeToken {
  assertTokenType<E_TokenType.C>(preparsedToken.type, [
    E_TokenType.C,
  ]);

  const token: I_CodeToken = {
    type: E_TokenType.C,
    text: preparsedToken.innerMarkup,
    tips: [],
  };

  // Delete start line break if there is one
  token.text = token.text.replace(/^ *\n/, '');

  const tipRegExp = / *##_T(.+?)##_\/T *\n/s;

  while (tipRegExp.test(token.text)) {
    token.text = token.text.replace(
      tipRegExp,
      (match, p1, offset) => {
        const prevStringPart = token.text.slice(0, offset);
        const line = (prevStringPart.match(/\n/g) || []).length - 1;
        const html = process(p1, [
          parseDecorationMarkers,
          parseLinkMarkers,
          normalizeWs,
        ]);
        token.tips.push({ line, html });
        return '';
      }
    );
  }

  // Delete end line breake if there is one
  token.text = token.text.trimEnd();

  return token;
}

export function parseTextToken(
  preparsedToken: I_PreparsedToken
): I_TextToken {
  assertTokenType<E_TokenType.P | E_TokenType.W>(
    preparsedToken.type,
    [E_TokenType.P, E_TokenType.W]
  );

  const token = {
    type: preparsedToken.type,
    html: process(preparsedToken.innerMarkup, [
      parseDecorationMarkers,
      parseLinkMarkers,
      normalizeWs,
    ]),
  };

  return token;
}

export function splitToPreparsedTokens(
  markup: string
): I_PreparsedToken[] {
  const tokenRegExp = new RegExp(
    `##_([${Object.values(E_TokenType).join('')}])(.+?)##_/\\1`,
    'gs'
  );

  const tokens: I_PreparsedToken[] = Array.from(
    markup.matchAll(tokenRegExp)
  ).map((match) => ({
    type: match[1] as E_TokenType,
    innerMarkup: match[2],
  }));

  return tokens;
}

export function parse(markup: string): T_Token[] {
  return splitToPreparsedTokens(markup).map((preparsedToken) => {
    let token: T_Token;

    switch (preparsedToken.type) {
      case E_TokenType.C:
        token = parseCodeToken(preparsedToken);
        token.text = hljs.highlightAuto(token.text).value;
        break;

      case E_TokenType.H:
      case E_TokenType.S:
        token = parseHeaderToken(preparsedToken);
        break;

      case E_TokenType.O:
      case E_TokenType.U:
        token = parseListToken(preparsedToken);
        break;

      case E_TokenType.P:
      case E_TokenType.W:
        token = parseTextToken(preparsedToken);
        break;

      case E_TokenType.R:
        token = parseLinkToken(preparsedToken);
        break;
    }

    return token;
  });
}
