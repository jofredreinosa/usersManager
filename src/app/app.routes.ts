import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes').then(r => r.usersRoutes),
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
