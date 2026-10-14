import { Component, Input, NgModule } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-proba',
  styleUrl: './proba.css',
  templateUrl: './proba.html',
})
export class Proba {
    palabraSeleccionada:Hitz = {
      eu: '',
      es: ''
    };
    acertado = false;
    palabrasAEstudiar: Hitz [] = [];
    palabraIntroducida:string = "";
    textoAcierto = "";
    intentos = 3;

    constructor(private serviceHiztegia: ServiceHiztegia) { 
      this.reset();
    }  


    
    public reset() : void{
      this.palabrasAEstudiar = [...this.serviceHiztegia.hiztegia()];
      this.sacarPalabra();
      this.acertado = false;
    }

    public sacarPalabra(){
      var maximo :number = this.palabrasAEstudiar.length;
      console.log(maximo);
      var indice :number = Math.trunc(Math.random()*this.palabrasAEstudiar.length);
      this.palabraSeleccionada = this.palabrasAEstudiar[indice]
      this.intentos = 3;
      this.textoAcierto = "";
      this.acertado = false;
    }

    public probar(){
      if(this.intentos>0){
      if(this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.es.toLowerCase()){
        this.textoAcierto = "<strong>Muy bien</strong>";
        this.acertado = true;
        this.palabrasAEstudiar.splice(this.palabrasAEstudiar.indexOf(this.palabraSeleccionada), 1);
        this.palabraIntroducida = "";
        this.palabraSeleccionada = {
          eu: '',
          es: ''
        };
        if(this.palabrasAEstudiar.length === 0){
          this.textoAcierto = "<strong>¡Felicidades! Has adivinado todas las palabras.</strong>";
        }
      }
      else{
        this.intentos --;
        this.textoAcierto = "Intentalo de nuevo<br>Intentos restantes: " + this.intentos;
      }
      }



 
      
    }

    
     
}
