
import { CommonModule } from '@angular/common';
import { ServiceHiztegia } from './hiztegiService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule, RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  constructor(private hiztegiService: ServiceHiztegia) { }

  ngOnInit(): void {
    this.hiztegiService.getData().subscribe((data: any) => {
      console.log(data);
      this.hiztegiService.hiztegia.set(data);
      this.hiztegiService.cursos.set(this.hiztegiService.cursos().concat(Array.from(new Set(this.hiztegiService.hiztegia().map((palabra: { maila: any; }) => palabra.maila)))));
      this.hiztegiService.fechas.set(this.hiztegiService.fechas().concat(Array.from(new Set(this.hiztegiService.hiztegia().map((palabra: { data: any; }) => palabra.data)))));
      console.log(this.hiztegiService.cursos());
      console.log(this.hiztegiService.fechas());

    });
  }
}
