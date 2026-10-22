import { Component } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Trinkoa } from '../hiztegia';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  imports: [FormsModule, FormsModule, FormsModule, ReactiveFormsModule],
  selector: 'app-aditzak',
  styleUrl: './aditzak.css',
  templateUrl: './aditzak.html',
})
export class Aditzak {
  cargado = false;
  filtrado = false;
  empezado = false;
  acertado = false;
  serviceHiztegia: any;
  listaTrinkoakCompleta: Trinkoa[] = [];
  arrayAditzak: any = [];
  trinkosAEstudiar: Trinkoa[] = [];
  orainaldia = true;
  lehenaldia = true;
  textoError = "";
  denborak: String[] = ["orainaldia", "lehenaldia"];
  nPalabras = 0;
  intentos = 3;
  palabraIntroducida: string = "";
  cursoSeleccionado: string = "Todos";
  fechaSeleccionada: string = "Todos";
  textoAcierto = "";
  classTextoAcierto = "text-center";
  palabraSeleccionada: Trinkoa = {
    konjugaioa: '',
    pertsona: '',
    aditza: '',
    denbora: ''
  };

  public constructor(serviceHiztegia: ServiceHiztegia) {
    this.serviceHiztegia = serviceHiztegia;
  }

  public cargar(): void {
    this.listaTrinkoakCompleta = [...this.serviceHiztegia.trinkoak()];
    this.cargado = true;
  }

  public mostrarSeleccionados(): void {
    console.log(this.arrayAditzak)
  }


  public onChange(aditza: string, isChecked: boolean) {
    if (isChecked) {
      this.arrayAditzak.push(aditza);
    } else {
      let index = this.arrayAditzak.indexOf(aditza);
      this.arrayAditzak.splice(index, 1);
    }
  }


  public filtrar() {
    console.log(this.arrayAditzak)
    this.textoError = "";
    if (this.arrayAditzak.length > 0) {
      this.trinkosAEstudiar = this.listaTrinkoakCompleta;

      this.trinkosAEstudiar = this.trinkosAEstudiar.filter(aditza =>
        this.arrayAditzak.includes(aditza.aditza))

      if (!this.lehenaldia) {
        this.trinkosAEstudiar = this.trinkosAEstudiar.filter(aditza =>
          aditza.aditza === "orainaldia")
      }
      if (!this.orainaldia) {
        this.trinkosAEstudiar = this.trinkosAEstudiar.filter(aditza =>
          aditza.aditza === "lehenaldia")
      }

      this.textoError = "Filtrado con éxito";

    }
    else {
      this.textoError = "No se han seleccionado aditzak";
    }

    console.log(this.trinkosAEstudiar)
    this.filtrado = true;
    this.nPalabras = this.trinkosAEstudiar.length;



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
  }

  public sacarPalabra() {
    var maximo: number = this.trinkosAEstudiar.length;
    var indice: number = Math.trunc(Math.random() * this.trinkosAEstudiar.length);
    this.palabraSeleccionada = this.trinkosAEstudiar[indice]
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
      this.textoAcierto = "<strong>Muy bien</strong>";
      this.classTextoAcierto = "text-center  text-success fw-bold fs-2";
      this.trinkosAEstudiar.splice(this.trinkosAEstudiar.indexOf(this.palabraSeleccionada), 1);
      this.palabraIntroducida = "";
      this.palabraSeleccionada = {
        konjugaioa: '',
        pertsona: '',
        aditza: '',
        denbora: ''
      };
      if (this.trinkosAEstudiar.length === 0) {
        this.textoAcierto = "¡Felicidades! Has adivinado todas las palabras.";
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



