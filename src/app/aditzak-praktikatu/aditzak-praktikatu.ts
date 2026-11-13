import { Component, effect, signal } from '@angular/core';
import { NorNork, Trinkoa } from '../hiztegia';
import { ServiceHiztegia } from '../hiztegiService';
import { AditzakPraktikatuFiltros } from './aditzak-praktikatu-filtros';
import { AditzakPraktikatuPractica } from './aditzak-praktikatu-practica';

export type Aditza = Trinkoa | NorNork;

@Component({
  imports: [AditzakPraktikatuFiltros, AditzakPraktikatuPractica],
  selector: 'app-aditzak',
  styleUrl: './aditzak-praktikatu.css',
  templateUrl: './aditzak-praktikatu.html',
})
export class AditzakPraktikatu {
  readonly pantalla = signal<'cargando' | 'filtros' | 'practicando'>('cargando');
  aditzakAEstudiar: Aditza[] = [];
  usarGauzak: boolean = true;

  constructor(public readonly serviceHiztegia: ServiceHiztegia) {
    effect(() => {
      const trinkoak = this.serviceHiztegia.trinkoak();
      const auxiliarrak = this.serviceHiztegia.auxiliarrak();
      if (trinkoak.length > 0 && auxiliarrak.length > 0 && this.pantalla() === 'cargando') {
        this.pantalla.set('filtros');
      }
    });
  }

  empezar(datos: { aditzak: Aditza[]; usarGauzak: boolean }): void {
    this.aditzakAEstudiar = datos.aditzak;
    this.usarGauzak = datos.usarGauzak;
    this.pantalla.set('practicando');
  }

  reset(): void {
    this.aditzakAEstudiar = [];
    this.pantalla.set('filtros');
  }
}
