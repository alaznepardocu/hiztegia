import { Component, effect, signal } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';
import { HiztegiaPraktikatuFiltros } from './hiztegia-praktikatu-filtros';
import { HiztegiaPraktikatuPractica } from './hiztegia-praktikatu-practica';

@Component({
  imports: [HiztegiaPraktikatuFiltros, HiztegiaPraktikatuPractica],
  selector: 'app-hiztegia-praktikatu',
  styleUrl: './hiztegia-praktikatu.css',
  templateUrl: './hiztegia-praktikatu.html',
})
export class HiztegiaPraktikatu {
  pantalla = signal<'cargando' | 'filtros' | 'practicando'>('cargando');
  sesionPractica: { palabras: Hitz[]; modo: string } = { palabras: [], modo: 'Euskara' };

  public constructor(public readonly serviceHiztegia: ServiceHiztegia) {
    effect(() => {
      const palabras = this.serviceHiztegia.hiztegia();
      if (palabras.length > 0) {
        this.pantalla.set('filtros');
      }
    });
  }

  public empezarPractica(sesion: { palabras: Hitz[]; modo: string }): void {
    this.sesionPractica = sesion;
    this.pantalla.set('practicando');
  }

  public reset(): void {
    this.pantalla.set('filtros');
  }
}
