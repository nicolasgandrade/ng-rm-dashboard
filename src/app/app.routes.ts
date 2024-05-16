import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'w',
    loadComponent: () =>
      import(
        './core/layouts/workspace/containers/root-workspace/root-workspace.component'
      ).then((m) => m.RootWorkspaceComponent),
  },
];
