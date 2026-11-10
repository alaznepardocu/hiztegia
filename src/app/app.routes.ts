import { Routes } from '@angular/router';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';
import { Info } from './info/info';
import { HiztegiaPraktikatu } from './hiztegia-praktikatu/hiztegia-praktikatu';
import { AditzakPraktikatu } from './aditzak-praktikatu/aditzak-praktikatu';
import { AditzaTaulak } from './aditza-taulak/aditza-taulak';

export const routes: Routes = [
  { path: 'hiztegia-praktikatu', component: HiztegiaPraktikatu, title: 'Hiztegia Praktikatu' },
  { path: 'visualizar-hiztegia', component: VisualizarHiztegia, title: 'Hiztegia' },
  { path: 'aditzak-praktikatu', component: AditzakPraktikatu, title: 'Aditzak Praktikatu' },
  { path: 'aditza-taulak', component: AditzaTaulak, title: 'Aditza Taulak' },
  { path: 'info', component: Info, title: 'Info' },
  // Ruta oculta de administración: NO se enlaza desde ningún menú.
  // Cambia 'gestion-x7k2' por el texto que quieras (la seguridad real es el login + RLS).
  {
    path: 'gestion-x7k2',
    loadComponent: () => import('./admin/admin').then(m => m.Admin),
    title: 'Admin',
  },
  { path: '**', redirectTo: '/info' },
];
