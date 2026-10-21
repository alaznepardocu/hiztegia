import { Routes } from '@angular/router';
import { Proba } from './proba/proba';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';
import { Aditzak } from './aditzak/aditzak';
import { Info } from './info/info';

export const routes: Routes = [
  { path: 'proba', component: Proba, title: 'Probar' },
  { path: 'visualizar-hiztegia', component: VisualizarHiztegia, title: 'Hiztegia' },
  { path: 'aditzak', component: Aditzak, title: 'Aditzak' },
  { path: 'info', component: Info, title: 'Info' },
  { path: '**', redirectTo: '/proba' },
];
