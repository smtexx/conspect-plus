import { E_QuickLinkTypes } from '../../components/QuickLinks/QuickLinks';

interface I_RecentLink {
  text: string;
  href: string;
  wasActive: Date;
}

export type T_RecentLinks = {
  [prop in E_QuickLinkTypes]: I_RecentLink[];
};

export async function loadRecentLinks(): Promise<T_RecentLinks> {
  return {
    [E_QuickLinkTypes.NOTE]: [
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
    [E_QuickLinkTypes.RESOURCE]: [
      {
        text: 'Важный ресурс 1',
        href: '/resource/link1',
        wasActive: new Date(),
      },
      {
        text: 'Важный ресурс 2',
        href: '/resource/link2',
        wasActive: new Date(),
      },
      {
        text: 'Важный ресурс 3',
        href: '/resource/link3',
        wasActive: new Date(),
      },
      {
        text: 'Важный ресурс 4',
        href: '/resource/link4',
        wasActive: new Date(),
      },
    ],
    [E_QuickLinkTypes.DRAFT]: [
      {
        text: 'Черновик 1',
        href: '/draft/1',
        wasActive: new Date(),
      },
      {
        text: 'Черновик 2',
        href: '/draft/2',
        wasActive: new Date(),
      },
    ],
  };
}
