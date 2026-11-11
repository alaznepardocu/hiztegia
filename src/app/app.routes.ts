import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'hiztegia-praktikatu',
    loadComponent: () => import('./hiztegia-praktikatu/hiztegia-praktikatu').then(m => m.HiztegiaPraktikatu),
    title: 'Hiztegia Praktikatu',
  },
  {
    path: 'visualizar-hiztegia',
    loadComponent: () => import('./visualizar-hiztegia/visualizar-hiztegia').then(m => m.VisualizarHiztegia),
    title: 'Hiztegia',
  },
  {
    path: 'aditzak-praktikatu',
    loadComponent: () => import('./aditzak-praktikatu/aditzak-praktikatu').then(m => m.AditzakPraktikatu),
    title: 'Aditzak Praktikatu',
  },
  {
    path: 'aditza-taulak',
    loadComponent: () => import('./aditza-taulak/aditza-taulak').then(m => m.AditzaTaulak),
    title: 'Aditza Taulak',
  },
  { path: 'info', loadComponent: () => import('./info/info').then(m => m.Info), title: 'Info' },
  {
    path: 'menuAdmin',
    loadComponent: () => import('./admin/admin').then(m => m.Admin),
    title: 'Admin',
  },
  { path: '**', redirectTo: '/info' },
];
