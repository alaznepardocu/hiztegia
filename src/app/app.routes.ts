import { Routes } from '@angular/router';
import { Proba } from './proba/proba';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';

export const routes: Routes = [
  { path: 'proba', component: Proba },
  { path: 'visualizar-hiztegia', component: VisualizarHiztegia },
  { path: '', redirectTo: '/proba', pathMatch: 'full' }
];
