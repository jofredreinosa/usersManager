import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then(c => c.UsersComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/create-or-edit-users/create-or-edit-users.component').then(c => c.CreateOrEditUsersComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/create-or-edit-users/create-or-edit-users.component').then(c => c.CreateOrEditUsersComponent)
  }
];
