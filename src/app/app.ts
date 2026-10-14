import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ServiceHiztegia } from './hiztegiService';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  imports: [CommonModule, RouterOutlet, RouterLink],
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