import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then(c => c.UsersComponent)
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
