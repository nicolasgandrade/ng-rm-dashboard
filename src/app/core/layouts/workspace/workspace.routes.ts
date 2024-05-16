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
    ],
  },
] as Routes;
