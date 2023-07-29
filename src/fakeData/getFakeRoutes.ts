export interface I_RoutePath {
  text: string;
  path: string;
}

export function getFakeRoutes(): { routes: I_RoutePath[] } {
  return {
    routes: [
      { text: 'Конспекты', path: 'conspect' },
      { text: 'JavaScript', path: 'conpectID' },
      { text: 'Работа с функциями', path: 'sectionID' },
      { text: 'Основы', path: 'pageID' },
    ],
  };
}
