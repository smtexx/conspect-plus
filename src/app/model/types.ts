export interface I_Storage {
  conspects: I_Conspect[];
  draft: I_ConspectDraft;
  tip: string;
}

export interface I_Conspect {
  id: string;
  title: string;
  saveDate: string;
  topics: I_Topic[];
}

export interface I_Topic {
  id: string;
  title: string;
  pages: I_Page[];
}

export interface I_Page {
  id: string;
  title: string;
  tokens: T_Token[];
  markup: string;
}

export type T_Token =
  | I_HeaderToken
  | I_ListToken
  | I_TextToken
  | I_LinkToken
  | I_CodeToken;

export interface I_HeaderToken {
  type: E_TokenType.H | E_TokenType.S;
  text: string;
}

export interface I_ListToken {
  type: E_TokenType.U | E_TokenType.O;
  items: string[];
}

export interface I_TextToken {
  type: E_TokenType.P | E_TokenType.W;
  html: string;
}

export interface I_LinkToken {
  type: E_TokenType.R;
  text: string;
  href: string;
}

export interface I_CodeToken {
  type: E_TokenType.C;
  text: string;
  tips: {
    line: number;
    html: string;
  }[];
}

export interface I_PreparsedToken {
  type: E_TokenType;
  innerMarkup: string;
}

export interface I_ConspectDraft {
  edited: string;
  markup: string;
}

export enum E_TokenType {
  H = 'H',
  S = 'S',
  P = 'P',
  U = 'U',
  O = 'O',
  C = 'C',
  W = 'W',
  R = 'R',
}

export enum E_Marker {
  L = 'L',
  T = 'T',
  B = 'B',
  I = 'I',
  M = 'M',
  A = 'A',
}
