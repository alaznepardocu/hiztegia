import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ServiceHiztegia } from '../hiztegiService';
import { NorNork, Trinkoa } from '../hiztegia';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-aditzak',
  styleUrl: './aditzak-praktikatu.css',
  templateUrl: './aditzak-praktikatu.html',
})
export class AditzakPraktikatu {
  cargado = false;
  filtrado = false;
  empezado = false;
  acertado = false;
  listaTrinkoakCompleta: Trinkoa[] = [];
  listaAuxiliarrakCompleta: any[] = [];
  arrayTrinkoak: string[] = [];
  arrayAuxiliarrak: string[] = [];
  trinkosAEstudiar: Trinkoa[] = [];
  auxiliarrakAEstudiar: NorNork[] = [];
  todosAditzakAEstudiar: any[] = [];
  orainaldia = true;
  lehenaldia = true;
  textoFiltrado = "";
  denborak: String[] = ["orainaldia", "lehenaldia"];
  nPalabras = 0;
  intentos = 3;
  palabraIntroducida: string = "";
  cursoSeleccionado: string = "Todos";
  fechaSeleccionada: string = "Todos";
  textoAcierto = "";
  classTextoAcierto = "text-center";
  modo = "trikoa";
  palabraSeleccionada: any = {};
  serviceHiztegia: ServiceHiztegia;
  verbosTransitivos: string[] = ["izan", "egon", "joan", "etorri", "ibili"];
  verbosNorNork: string[] = ["gonbidatu", "maite", "ikusi", "izendatu", "ikastera animatu"];
  verboNorNork: string ="";
 

  public constructor(serviceHiztegia: ServiceHiztegia) {
    this.serviceHiztegia = serviceHiztegia;
  }

  public cargar(): void {
    this.listaTrinkoakCompleta = [...this.serviceHiztegia.trinkoak()];
    this.listaAuxiliarrakCompleta = [...this.serviceHiztegia.auxiliarrak()];
    this.cargado = true;
  }

  get trinkoAditzak(): string[] {
    const disponibles = new Set(this.serviceHiztegia.aditzTrikoak());
    return [...this.serviceHiztegia.transitiboak(), ...this.serviceHiztegia.intransitiboak()]
      .filter((aditza, index, aditzak) => disponibles.has(aditza) && aditzak.indexOf(aditza) === index);
  }

  get todosTrinkoakSeleccionados(): boolean {
    return this.trinkoAditzak.length > 0 &&
      this.trinkoAditzak.every(aditza => this.arrayTrinkoak.includes(aditza));
  }

  public seleccionarTodosTrinkos(isChecked: boolean): void {
    const trinkoak = new Set(this.trinkoAditzak);
    this.arrayTrinkoak = isChecked
      ? [...new Set([...this.arrayTrinkoak, ...trinkoak])]
      : this.arrayTrinkoak.filter(aditza => !trinkoak.has(aditza));
  }

  public onChange(aditza: string, tipo: string, isChecked: boolean) {
    if(tipo === "trikoa"){
      if (isChecked) {
        if (!this.arrayTrinkoak.includes(aditza)) {
          this.arrayTrinkoak.push(aditza);
        }
      } else {
        let index = this.arrayTrinkoak.indexOf(aditza);
        if (index !== -1) {
          this.arrayTrinkoak.splice(index, 1);
        }
      }
    }
    if(tipo === "auxiliar"){
      if (isChecked) {
        this.arrayAuxiliarrak.push(aditza);
      } else {
        let index = this.arrayAuxiliarrak.indexOf(aditza);
        this.arrayAuxiliarrak.splice(index, 1);
      }
    }
  }





  public filtrar() {
    this.trinkosAEstudiar = [];
    this.auxiliarrakAEstudiar = []
    console.log(this.arrayTrinkoak + " / " + this.arrayAuxiliarrak)
    this.todosAditzakAEstudiar = [];
    this.textoFiltrado = "";
    if (this.arrayTrinkoak.length > 0 || this.arrayAuxiliarrak.length > 0) {
      this.trinkosAEstudiar = [...this.listaTrinkoakCompleta];
      this.auxiliarrakAEstudiar = [...this.listaAuxiliarrakCompleta];

      this.trinkosAEstudiar = this.trinkosAEstudiar.filter(aditza =>
        this.arrayTrinkoak.includes(aditza.aditza));
      

      this.trinkosAEstudiar = this.trinkosAEstudiar.filter(aditza =>
        (this.orainaldia && aditza.denbora === "orainaldia") ||
        (this.lehenaldia && aditza.denbora === "lehenaldia"))
      
      this.auxiliarrakAEstudiar = this.auxiliarrakAEstudiar.filter(aditza =>
        (this.orainaldia && aditza.denbora === "orainaldia") ||
        (this.lehenaldia && aditza.denbora === "lehenaldia"))

      this.textoFiltrado = "Filtrado con éxito";
      this.filtrado = true;
      this.todosAditzakAEstudiar.push(...this.trinkosAEstudiar);
      this.todosAditzakAEstudiar.push(...this.auxiliarrakAEstudiar);
    }
    else {
      this.textoFiltrado = "No se han seleccionado aditzak";
    }

    //console.log(this.todosAditzakAEstudiar)
    
    this.nPalabras = this.todosAditzakAEstudiar.length;
  }


  public empezar(): void {
    this.empezado = true;
    this.sacarPalabra();
    this.acertado = false;
    // console.log(this.modo);

  }

    public reset(): void {
    this.empezado = false;
    this.cargado = false;
    this.trinkosAEstudiar= [];
    this.auxiliarrakAEstudiar = [];
    this.todosAditzakAEstudiar = [];
    this.arrayTrinkoak = [];
     this.arrayAuxiliarrak = [];
    this.filtrado=false;
    this.textoFiltrado ="";
  }

  public sacarPalabra() {
    var indice: number = Math.trunc(Math.random() * this.todosAditzakAEstudiar.length);
    this.palabraSeleccionada = this.todosAditzakAEstudiar[indice]
    // console.log(this.palabraSeleccionada);
    if("pertsona" in this.palabraSeleccionada){
      this.modo = "trikoa";
    }
    else if("nor" in this.palabraSeleccionada && "nork" in this.palabraSeleccionada){
      this.modo = "norNork";
      indice = Math.trunc(Math.random() * this.verbosNorNork.length)
      this.verboNorNork = this.verbosNorNork[indice];
    }
    else{
      this.modo = "desconocido";
    }
    this.intentos = 3;
    this.textoAcierto = "";
    this.classTextoAcierto = "text-center";
    this.acertado = false;
    this.palabraIntroducida = "";
  }

  public probar() {
    if (this.intentos > 0) {
      if (this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.konjugaioa) {
        this.acertado = true;
      }
    }
    if (this.acertado) {
      this.textoAcierto = "<strong>Oso ondo!</strong>";
      this.classTextoAcierto = "text-center  text-success fw-bold fs-2";
      this.todosAditzakAEstudiar.splice(this.todosAditzakAEstudiar.indexOf(this.palabraSeleccionada), 1);
      this.palabraIntroducida = "";
      this.palabraSeleccionada = {
        konjugaioa: '',
        pertsona: '',
        aditza: '',
        denbora: ''
      };
      if (this.todosAditzakAEstudiar.length === 0) {
        this.textoAcierto = "Zorionak!<br> Has adivinado todas las palabras.";
        this.classTextoAcierto = "text-center text-success fw-bold fs-2";
      }
    }
    else {
      this.intentos--;
      this.textoAcierto = "";
      if (this.intentos > 0) {
        this.textoAcierto = "Intentalo de nuevo";
      }
      this.textoAcierto += "<br>Intentos restantes: " + this.intentos;
      this.classTextoAcierto = "text-center text-info";
    }
  }

}
