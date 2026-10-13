import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceHiztegia } from '../hiztegiService';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-visualizar-hiztegia',
  styleUrl: './visualizar-hiztegia.css',
  templateUrl: './visualizar-hiztegia.html',
})
export class VisualizarHiztegia {
     
    constructor(private serviceHiztegia: ServiceHiztegia) {
    
    }  

}
