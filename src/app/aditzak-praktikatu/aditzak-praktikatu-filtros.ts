import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceHiztegia } from '../hiztegiService';
import { NorNork, Trinkoa } from '../hiztegia';
import type { Aditza } from './aditzak-praktikatu';

@Component({
  imports: [FormsModule],
  selector: 'app-aditzak-praktikatu-filtros',
  templateUrl: './aditzak-praktikatu-filtros.html',
})
export class AditzakPraktikatuFiltros {
  arrayTrinkoak: string[] = [];
  arrayAuxiliarrak: string[] = [];
  orainaldia = true;
  lehenaldia = true;
  textoFiltrado = '';
  filtrado = false;
  aditzakAEstudiar: Aditza[] = [];
  ocultarHi = false;
  @Output() empezar = new EventEmitter<Aditza[]>();

  constructor(public readonly serviceHiztegia: ServiceHiztegia) {}

  get trinkoAditzak(): string[] {
    const disponibles = new Set(this.serviceHiztegia.aditzTrikoak());
    return [...this.serviceHiztegia.intransitiboak(), ...this.serviceHiztegia.transitiboak()]
      .filter((aditza, index, aditzak) => disponibles.has(aditza) && aditzak.indexOf(aditza) === index);
  }

  get todosTrinkoakSeleccionados(): boolean {
    return this.trinkoAditzak.length > 0 &&
      this.trinkoAditzak.every(aditza => this.arrayTrinkoak.includes(aditza));
  }

  seleccionarTodosTrinkos(isChecked: boolean): void {
    const trinkoak = new Set(this.trinkoAditzak);
    this.arrayTrinkoak = isChecked
      ? [...new Set([...this.arrayTrinkoak, ...trinkoak])]
      : this.arrayTrinkoak.filter(aditza => !trinkoak.has(aditza));
    this.filtrar();
  }

  onChange(aditza: string, tipo: 'trikoa' | 'auxiliar', isChecked: boolean): void {
    const seleccionados = tipo === 'trikoa' ? this.arrayTrinkoak : this.arrayAuxiliarrak;
    if (isChecked && !seleccionados.includes(aditza)) {
      seleccionados.push(aditza);
    } else if (!isChecked) {
      const index = seleccionados.indexOf(aditza);
      if (index !== -1) {
        seleccionados.splice(index, 1);
      }
    }
    this.filtrar();
  }

  cambiarOcultarHi(isChecked: boolean): void {
    this.ocultarHi = isChecked;
    this.filtrar();
  }

  filtrar(): void {
    const tiempos = (aditza: Aditza) =>
      (this.orainaldia && aditza.denbora === 'orainaldia') ||
      (this.lehenaldia && aditza.denbora === 'lehenaldia');
    const trinkoak: Trinkoa[] = this.serviceHiztegia.trinkoak().filter(aditza =>
      this.arrayTrinkoak.includes(aditza.aditza) &&
      tiempos(aditza) &&
      (!this.ocultarHi || (aditza.pertsona !== 'hi' && aditza.pertsona !== 'hik'))
    );
    const auxiliarrak: NorNork[] = this.serviceHiztegia.auxiliarrak().filter(aditza =>
      this.arrayAuxiliarrak.includes(aditza.aditza) &&
      tiempos(aditza) &&
      (!this.ocultarHi || (aditza.nor !== 'hi' && aditza.nork !== 'hik'))
    );

    this.aditzakAEstudiar = [...trinkoak, ...auxiliarrak];

    this.filtrado = true;
    this.textoFiltrado = this.aditzakAEstudiar.length > 0
      ? 'Filtrado con éxito'
      : this.arrayTrinkoak.length === 0 && this.arrayAuxiliarrak.length === 0
        ? 'No se han seleccionado aditzak'
        : '';
  }

  iniciarPractica(): void {
    if (this.aditzakAEstudiar.length > 0) {
      this.empezar.emit([...this.aditzakAEstudiar]);
    }
  }
}
