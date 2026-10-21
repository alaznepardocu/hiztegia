import { Component } from '@angular/core';
import { ServiceHiztegia } from '../hiztegiService';
import { Trinkoa } from '../hiztegia';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  imports: [FormsModule, FormsModule, FormsModule, ReactiveFormsModule],
  selector: 'app-aditzak',
  styleUrl: './aditzak.css',
  templateUrl: './aditzak.html',
})
export class Aditzak {
  cargado=false;
  serviceHiztegia: any;
  listaTrinkoak : Trinkoa[] = [];
  aditzakAEstudiar : any = [];

  public constructor(serviceHiztegia: ServiceHiztegia) {
    this.serviceHiztegia = serviceHiztegia;
  }

    public cargar(): void {
    this.listaTrinkoak = [...this.serviceHiztegia.trinkoak()];
    this.cargado = true;
  }

    public mostrarSeleccionados(): void {
      console.log(this.aditzakAEstudiar)
    }

    
    public onChange(aditza:string, isChecked: boolean) {
      if(isChecked) {
        this.aditzakAEstudiar.push(aditza);
      } else {
        let index = this.aditzakAEstudiar.indexOf(aditza);
        this.aditzakAEstudiar.splice(index,1);
      }
  }


}
