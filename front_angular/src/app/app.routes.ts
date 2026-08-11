import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';

export const routes: Routes = [
  { path: 'login', 
    loadComponent: () =>
      import ('./login/login.component').then(h => h.LoginComponent)
  },
  { path: 'home',
    loadComponent: () =>
      import ('./home/home.component').then(h => h.HomeComponent),
    canActivate: [AuthGuard],
  },
  { path: 'admin',
    loadComponent: () =>
      import ('./admin/admin.component').then(h => h.AdminComponent),
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'register',
    loadComponent: () =>
      import ('./register/register.component').then(h => h.RegisterComponent)
  },
  { path: '**', redirectTo: '/home' },
];
