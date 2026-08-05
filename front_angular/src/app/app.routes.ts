import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', 
    loadComponent: () =>
      import ('./login/login.component').then(h => h.LoginComponent)
  },
  { path: 'home',
    loadComponent: () =>
      import ('./home/home.component').then(h => h.HomeComponent)
  },
  { path: 'admin',
    loadComponent: () =>
      import ('./admin/admin.component').then(h => h.AdminComponent)
  },
  { path: 'register',
    loadComponent: () =>
      import ('./register/register.component').then(h => h.RegisterComponent)
  },
  { path: '**', redirectTo: '/home' },
];
