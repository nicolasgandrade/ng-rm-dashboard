import { Routes } from '@angular/router';
import { RootWorkspaceComponent } from './containers/root-workspace/root-workspace.component';

export default [
  {
    path: '',
    component: RootWorkspaceComponent,
    children: [
      {
        path: 'episodes',
        loadComponent: () =>
          import(
            '../../../features/episodes/containers/root-episodes/root-episodes.component'
          ).then((m) => m.RootEpisodesComponent),
      },
      {
        path: 'characters',
        loadComponent: () =>
          import(
            '../../../features/characters/containers/root-characters/root-characters.component'
          ).then((m) => m.RootCharactersComponent),
      },
    ],
  },
] as Routes;
