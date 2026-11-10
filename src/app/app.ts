
import { CommonModule } from '@angular/common';
import { ServiceHiztegia } from './hiztegiService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, NgbCollapseModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  constructor(private hiztegiService: ServiceHiztegia) { }
  isCollapsed = true;

  ngOnInit(): void {
    // Carga palabras y verbos desde Supabase y rellena los signals del servicio.
    this.hiztegiService.cargar();
  }
}
