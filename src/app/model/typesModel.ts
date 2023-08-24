// Markup entities
export enum E_Marker {
  L = 'L',
  T = 'T',
  B = 'B',
  I = 'I',
  M = 'M',
  A = 'A',
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

export interface I_PreparsedToken {
  type: E_TokenType;
  innerMarkup: string;
}

export interface I_CustomToken {
  type: E_TokenType;
}

export interface I_HeaderToken extends I_CustomToken {
  type: E_TokenType.H | E_TokenType.S;
  text: string;
}

export interface I_ListToken extends I_CustomToken {
  type: E_TokenType.U | E_TokenType.O;
  items: string[];
}

export interface I_TextToken extends I_CustomToken {
  type: E_TokenType.P | E_TokenType.W;
  html: string;
}

export interface I_LinkToken extends I_CustomToken {
  type: E_TokenType.R;
  text: string;
  href: string;
}

export interface I_CodeToken extends I_CustomToken {
  type: E_TokenType.C;
  text: string;
  lang: string;
  tips: {
    line: number;
    html: string;
  }[];
}

export type T_Token =
  | I_HeaderToken
  | I_TextToken
  | I_ListToken
  | I_LinkToken
  | I_CodeToken;

// Data entities
export interface I_Entity {
  id: string;
  title: string;
  created: string;
  saved: string;
}

// Sections
export interface I_Section extends I_Entity {
  pages: I_Page[];
}

export interface I_Conspect extends I_Entity {
  description: string;
  sections: I_Section[];
}

// Pages
export enum E_PageType {
  LINKSET = 'linkset',
  PAGE = 'page',
}

export interface I_Draft extends I_Entity {
  type: E_PageType;
  markup: string;
}

export interface I_PageDraft extends I_Draft {
  type: E_PageType.PAGE;
  conspectID: string;
  sectionID: string;
}

export interface I_LinksetDraft extends I_Draft {
  type: E_PageType.LINKSET;
  description: string;
}

export interface I_Page extends I_PageDraft {
  tokens: T_Token[];
}

export interface I_Linkset extends I_LinksetDraft {
  tokens: I_LinkToken[];
}

export interface I_RecentLink {
  href: string;
  text: string;
  date: string;
}

export interface I_UserData {
  conspects: I_Conspect[];
  linksets: I_Linkset[];
  drafts: (I_PageDraft | I_LinksetDraft)[];
  recent: {
    notes: I_RecentLink[];
    links: I_RecentLink[];
  };
  tip: string;
  saved: boolean;
}

export interface I_User {
  login: string;
  created: string;
  lastActivity: string;
  isActive: boolean;
  notes: number;
}

export interface I_RoutePath {
  text: string;
  path: string;
}
