import {
  E_TokenType,
  I_LinkToken,
  I_UserData,
} from '../model/typesModel';
import { parse } from './parser';

export function createID() {
  return Array(8)
    .fill('')
    .map(() =>
      String.fromCodePoint(Math.floor(Math.random() * 26) + 97)
    )
    .join('');
}

export function regenerateTokens(userData: I_UserData) {
  userData.conspects.forEach((c) => {
    c.sections.forEach((s) => {
      s.pages.forEach((p) => {
        p.tokens = parse(p.markup);
      });
    });
  });
  userData.linksets.forEach((l) => {
    const tokens = parse(l.markup);
    l.tokens = tokens.filter(
      (t) => t.type === E_TokenType.R
    ) as I_LinkToken[];
  });
}
