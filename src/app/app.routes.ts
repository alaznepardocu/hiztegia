import { Routes } from '@angular/router';
import { Proba } from './proba/proba';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';

export const routes: Routes = [
  { path: 'proba', component: Proba , title: 'Test'},
  { path: 'visualizar-hiztegia', component: VisualizarHiztegia , title: 'Hiztegia'},
  { path: '**', redirectTo: '/proba' },
];
