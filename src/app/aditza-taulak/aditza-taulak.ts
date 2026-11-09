import { Component } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { NorNork, Trinkoa } from '../hiztegia';

@Component({
  imports: [],
  selector: 'app-aditza-taulak',
  styleUrl: './aditza-taulak.css',
  templateUrl: './aditza-taulak.html',
})
export class AditzaTaulak {
  listaTrinkoakCompleta: Trinkoa[] = [];
  listaAuxiliarrakCompleta: any[] = [];
  todosAditzak: any[] = [];
  constructor(public readonly serviceHiztegia: ServiceHiztegia) {
    this.serviceHiztegia = serviceHiztegia;
    this.listaTrinkoakCompleta = [...serviceHiztegia.trinkoak()];
    this.listaAuxiliarrakCompleta = [...serviceHiztegia.auxiliarrak()];
    this.todosAditzak = [...this.listaTrinkoakCompleta, ...this.listaAuxiliarrakCompleta];
    console.log("Todos los aditzak:", this.todosAditzak);
  }

  objecktuak = ["singularra", "plurala"];
  denborak = ["orainaldia", "lehenaldia"];
  ordenNor1 = ["ni", "hi", "hura", "gu", "zu", "zuek", "haiek"];
  ordenNor2 = ["ni", "zu", "hi", "hura", "gu", "zuek", "haiek"];
  ordenNork1 = ["nik", "hik", "hark", "guk", "zuk", "zuek", "haiek"];
  ordenNork2 = ["nik", "zuk", "hik", "hark", "guk", "zuek", "haiek"];
  norPertsonak = this.ordenNor1;
  norkPertsonak = this.ordenNork1;
  ordenAlternativo = false;
  ocultarHi = false;

  aditzaActual : Trinkoa[] | NorNork[] | any[] = []  ;

  cambiarOrden(ordenAlternativo: boolean): void {
    this.ordenAlternativo = ordenAlternativo;
    this.norPertsonak = ordenAlternativo ? this.ordenNor2 : this.ordenNor1;
    this.norkPertsonak = ordenAlternativo ? this.ordenNork2 : this.ordenNork1;
  }

  obtenerAditzaTrinkoa(aditza: string): void {
    this.aditzaActual =  this.serviceHiztegia.trinkoak().filter((item) => item.aditza === aditza);
  }

  irATabla(id: string): void {
    const tabla = document.getElementById(id);
    if (!tabla) {
      console.error(`No se encontró la tabla con id "${id}".`);
      return;
    }

    window.history.pushState(null, '', `#${id}`);
    tabla.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  obtenerTrinkoKonjugazioa(pertsona: string, denbora: string, objektu?: string): string {
    const trinkoa = this.aditzaActual.find((item) => 
      item.denbora === denbora &&
      item.pertsona === pertsona &&
      (objektu ? item.objektu === objektu : true)
    );
    return trinkoa ? trinkoa.konjugaioa : '';
  }

  obtenerTrinkoDenborak(): any[] {
    var denborak: string[] = this.aditzaActual.map((item) => item.denbora);
    var denborakUnicas: string[] = Array.from(new Set(denborak));
    return denborakUnicas;
  }



}
