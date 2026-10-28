import { Component } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule, FormsModule],
  selector: 'app-hiztegia-praktikatu',
  styleUrl: './hiztegia-praktikatu.css',
  templateUrl: './hiztegia-praktikatu.html',
})
export class HiztegiaPraktikatu {
cursos: any;
  palabraSeleccionada: Hitz = {
    eu: '',
    es: '',
    maila: '',
    data: ''
  };

  cargado = false;
  empezado = false;
  acertado = false;
  palabrasAEstudiar: Hitz[] = [];
  nPalabras = 0;
  palabraIntroducida: string = "";
  cursoSeleccionado: string = "Todos";
  fechaSeleccionada: string = "Todos";
  textoAcierto = "";
  classTextoAcierto = "text-center";
  intentos = 3;
  notificationType = new FormControl('', Validators.required);
  modo = 'Euskara';
  serviceHiztegia: any;
  textoFiltrado = "";

  public constructor(serviceHiztegia: ServiceHiztegia) {
    this.serviceHiztegia = serviceHiztegia;
  }

  public cargar(): void {
    this.palabrasAEstudiar = [...this.serviceHiztegia.hiztegia()];
    this.cargado = true;
    this.nPalabras = this.palabrasAEstudiar.length;
  }

  public empezar(): void {
    this.empezado = true;
    this.sacarPalabra();
    this.acertado = false;
    //console.log(this.modo);
    
  }


  public reset(): void {
    this.empezado = false;
    this.cursoSeleccionado = "Todos";
    this.fechaSeleccionada = "Todos";
    this.cargado = false;
    this.textoFiltrado = "";
  }

  public filtrar(): void {
    this.cargar();
    if (this.cursoSeleccionado != "Todos") {
      this.palabrasAEstudiar = this.palabrasAEstudiar.filter(palabra => 
        palabra.maila.toLowerCase() === this.cursoSeleccionado.toLowerCase())
      }
    if (this.fechaSeleccionada != "Todos") {
      this.palabrasAEstudiar = this.palabrasAEstudiar.filter(palabra => 
        palabra.data.toLowerCase() == this.fechaSeleccionada.toLowerCase())
      }
      // console.log(this.palabrasAEstudiar);
      this.textoFiltrado = "Filtrado con éxito, ya puedes empezar";
      this.nPalabras = this.palabrasAEstudiar.length;
    
  }

  public sacarPalabra() {
    var maximo: number = this.palabrasAEstudiar.length;
    var indice: number = Math.trunc(Math.random() * this.palabrasAEstudiar.length);
    this.palabraSeleccionada = this.palabrasAEstudiar[indice]
    this.intentos = 3;
    this.textoAcierto = "";
    this.classTextoAcierto = "text-center";
    this.acertado = false;
    this.palabraIntroducida = "";
  }

  public probar() {
    if (this.intentos > 0) {
      if (this.modo === "Euskara") {
        if (this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.es.toLowerCase()) {
          this.acertado = true;
        }
      }
      else {
        if (this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.eu.toLowerCase()) {
          this.acertado = true;
        }
      }
      if (this.acertado) {
        this.textoAcierto = "<strong>Oso ondo!</strong>";
        this.classTextoAcierto = "text-center  text-success fw-bold fs-2";
        this.palabrasAEstudiar.splice(this.palabrasAEstudiar.indexOf(this.palabraSeleccionada), 1);
        this.palabraIntroducida = "";
        this.palabraSeleccionada = {
          eu: '',
          es: '',
          maila: '',
          data: ''
        };
        if (this.palabrasAEstudiar.length === 0) {
          this.textoAcierto = "Zorionak!<br> Has adivinado todas las palabras.";
          this.classTextoAcierto = "text-center text-success fw-bold fs-2";
        }
      }
      else {
        this.intentos--;
        this.textoAcierto = "";
        if(this.intentos > 0){
          this.textoAcierto = "Intentalo de nuevo";
        }
        this.textoAcierto += "<br>Intentos restantes: " + this.intentos;
        this.classTextoAcierto = "text-center text-info";
      }
    }

  }





}
