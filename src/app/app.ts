import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';
import { Proba } from './proba/proba';
import { ServiceHiztegia } from './hiztegiService';
import { Hitz } from './hiztegia';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, VisualizarHiztegia],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App{

        constructor(private hiztegiService: ServiceHiztegia){ }
    
      ngOnInit(): void {
    this.hiztegiService.getData().subscribe((data: any) => {
      console.log(data);
      this.hiztegiService.hiztegia.set(data);
  });
      }

}