import { E_QuickLinkTypes } from '../components/QuickLinks/QuickLinks';

interface I_RecentLink {
  text: string;
  href: string;
  wasActive: Date;
}

interface I_RecentLinks {
  links: I_RecentLink[];
}

export function getFakeRecentLinks(
  type: E_QuickLinkTypes
): I_RecentLinks {
  if (type === E_QuickLinkTypes.NOTES) {
    return {
      links: [
        {
          text: 'Важный конспект 1',
          href: '/conspect/note1',
          wasActive: new Date(),
        },
        {
          text: 'Важный конспект 2',
          href: '/conspect/note2',
          wasActive: new Date(),
        },
        {
          text: 'Важный конспект 3',
          href: '/conspect/note3',
          wasActive: new Date(),
        },
      ],
    };
  }
  if (type === E_QuickLinkTypes.LINKS) {
    return {
      links: [
        {
          text: 'Важный ресурс 1',
          href: 'https://ya.ru',
          wasActive: new Date(),
        },
        {
          text: 'Важный ресурс 2',
          href: 'https://ya.ru',
          wasActive: new Date(),
        },
        {
          text: 'Важный ресурс 3',
          href: 'https://ya.ru',
          wasActive: new Date(),
        },
        {
          text: 'Важный ресурс 4',
          href: 'https://ya.ru',
          wasActive: new Date(),
        },
      ],
    };
  }
  if (type === E_QuickLinkTypes.DRAFTS) {
    return {
      links: [
        {
          text: 'Черновик 1',
          href: '/edit/1',
          wasActive: new Date(),
        },
        {
          text: 'Черновик 2',
          href: '/edit/2',
          wasActive: new Date(),
        },
      ],
    };
  }

  throw new Error(`Unknown type of recent links ${type}`);
}
