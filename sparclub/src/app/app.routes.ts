import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent)
  },
  {
    path: 'sparer/:id',
    loadComponent: () => import('./pages/sparer-dashboard/sparer-dashboard.component').then(m => m.SparerDashboardComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];