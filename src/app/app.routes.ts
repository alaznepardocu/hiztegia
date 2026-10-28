import { Routes } from '@angular/router';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';
import { Aditzak } from './aditzak/aditzak';
import { Info } from './info/info';
import { HiztegiaPraktikatu } from './hiztegia-praktikatu/hiztegia-praktikatu';

export const routes: Routes = [
  { path: 'hiztegia-praktikatu', component: HiztegiaPraktikatu, title: 'Hiztegia Praktikatu' },
  { path: 'visualizar-hiztegia', component: VisualizarHiztegia, title: 'Hiztegia' },
  { path: 'aditzak', component: Aditzak, title: 'Aditzak' },
  { path: 'info', component: Info, title: 'Info' },
  { path: '**', redirectTo: '/info' },
];
