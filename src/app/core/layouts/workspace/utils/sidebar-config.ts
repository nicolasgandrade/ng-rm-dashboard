interface SidebarItem {
  path: string;
  icon: string;
  title: string;
}

export const sidebarConfig: SidebarItem[] = [
  {
    path: 'episodes',
    icon: 'bi bi-tv',
    title: 'Episódios',
  },
  {
    path: 'characters',
    icon: 'bi bi-person',
    title: 'Personagens',
  },
];
