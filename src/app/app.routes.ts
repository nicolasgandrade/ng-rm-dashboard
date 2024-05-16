import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'w',
    loadChildren: () => import('./core/layouts/workspace/workspace.routes'),
  },
];
