import { Component } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule, FormsModule],
  selector: 'app-proba',
  styleUrl: './proba.css',
  templateUrl: './proba.html',
})
export class Proba {
  palabraSeleccionada: Hitz = {
    eu: '',
    es: ''
  };
  empezado = false;
  acertado = false;
  palabrasAEstudiar: Hitz[] = [];
  palabraIntroducida: string = "";
  textoAcierto = "";
  intentos = 3;
  notificationType = new FormControl('', Validators.required);
  modo = 'Euskara';

  constructor(private serviceHiztegia: ServiceHiztegia) {
  };
  
  public empezar(): void {
        this.empezado = true;
    this.palabrasAEstudiar = [...this.serviceHiztegia.hiztegia()];
    this.sacarPalabra();
    this.acertado = false;
    console.log(this.modo);
  }


  public reset(): void {
    this.empezado = false;
  }

  public sacarPalabra() {
    var maximo: number = this.palabrasAEstudiar.length;
    console.log(maximo);
    var indice: number = Math.trunc(Math.random() * this.palabrasAEstudiar.length);
    this.palabraSeleccionada = this.palabrasAEstudiar[indice]
    this.intentos = 3;
    this.textoAcierto = "";
    this.acertado = false;
    this.palabraIntroducida = "";
  }

  public probar() {
    if (this.intentos > 0) {
      if(this.modo === "Euskara"){
        this.acertado = true; 
        this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.es.toLowerCase()
      }
      else{
        this.acertado = true;
        this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.eu.toLowerCase()
      }
      if (this.acertado) {
        this.textoAcierto = "<strong>Muy bien</strong>";
        this.palabrasAEstudiar.splice(this.palabrasAEstudiar.indexOf(this.palabraSeleccionada), 1);
        this.palabraIntroducida = "";
        this.palabraSeleccionada = {
          eu: '',
          es: ''
        };
        if (this.palabrasAEstudiar.length === 0) {
          this.textoAcierto = "<strong>¡Felicidades! Has adivinado todas las palabras.</strong>";
        }
      }
      else {
        this.intentos--;
        this.textoAcierto = "Intentalo de nuevo<br>Intentos restantes: " + this.intentos;
      }
    }

  }





}
