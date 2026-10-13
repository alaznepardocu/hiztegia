import { Component, Input, NgModule } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-proba',
  styleUrl: './proba.css',
  templateUrl: './proba.html',
})
export class Proba {
    palabraSeleccionada:Hitz = {
      EU: "kaixo",
      ES: "hola"
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
      this.palabrasAEstudiar = this.serviceHiztegia.hiztegia();
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
      if(this.palabraIntroducida.toLowerCase() == this.palabraSeleccionada.ES.toLowerCase()){
        this.textoAcierto = "Muy bien";
        this.acertado = true;
      }
      else{
        this.intentos --;
        this.textoAcierto = 'Intentalo de nuevo<br>Intentos restantes: ' + this.intentos;
      }
      }



 
      
    }

    
     
}
