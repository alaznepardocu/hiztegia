import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceHiztegia } from '../hiztegiService';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-visualizar-hiztegia',
  styleUrl: './visualizar-hiztegia.css',
  templateUrl: './visualizar-hiztegia.html',
})
export class VisualizarHiztegia {
  public readonly cursoSeleccionado = signal('Todos');
  public readonly fechaSeleccionada = signal('Todos');
  public readonly filtro = signal('');
  public readonly palabrasFiltradas = computed(() => {
    const curso = this.cursoSeleccionado().toLowerCase();
    const fecha = this.fechaSeleccionada().toLowerCase();
    const filtro = this.filtro().trim().toLowerCase();

    return this.serviceHiztegia.hiztegia().filter(palabra =>
      (curso === 'todos' || palabra.maila.toLowerCase() === curso) &&
      (fecha === 'todos' || palabra.data.toLowerCase() === fecha) &&
      (!filtro ||
        palabra.es.toLowerCase().includes(filtro) ||
        palabra.eu.toLowerCase().includes(filtro) ||
        palabra.maila.toLowerCase().includes(filtro) ||
        palabra.data.toLowerCase().includes(filtro))
    );
  });

  constructor(public readonly serviceHiztegia: ServiceHiztegia) {}
}
