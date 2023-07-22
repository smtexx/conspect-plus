interface I_User {
  login: string;
  notesQty: number;
  lastActivity: Date;
  isActive: boolean;
}

export function getFakeUsers(): { users: I_User[] } {
  return {
    users: [
      {
        login: 'Mariia',
        notesQty: 45,
        lastActivity: new Date(),
        isActive: false,
      },
      {
        login: 'Roman',
        notesQty: 65,
        lastActivity: new Date(),
        isActive: true,
      },
      {
        login: 'Djulia',
        notesQty: 4,
        lastActivity: new Date(),
        isActive: false,
      },
      {
        login: 'Milica',
        notesQty: 445,
        lastActivity: new Date(),
        isActive: false,
      },
    ],
  };
}
