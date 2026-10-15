import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-visualizar-hiztegia',
  styleUrl: './visualizar-hiztegia.css',
  templateUrl: './visualizar-hiztegia.html',
})
export class VisualizarHiztegia {
     
    constructor(private serviceHiztegia: ServiceHiztegia) {
    
    }  

    palabrasFiltradas: Hitz[] = [];
    filtro = "";

    public filtrar(event: Event){
    this.palabrasFiltradas = this.serviceHiztegia.hiztegia().filter(palabra =>
      palabra.es.toLowerCase().includes(this.filtro.toLowerCase()) ||
      palabra.eu.toLowerCase().includes(this.filtro.toLowerCase()) 
    )
  }

}
