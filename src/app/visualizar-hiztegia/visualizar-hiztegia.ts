import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceHiztegia } from '../hiztegiService';
import { etiquetaIkasturtea, formatearFecha, normalizar } from '../utilidades';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-visualizar-hiztegia',
  styleUrl: './visualizar-hiztegia.css',
  templateUrl: './visualizar-hiztegia.html',
})
export class VisualizarHiztegia {
  public readonly formatearFecha = formatearFecha;
  public readonly etiquetaIkasturtea = etiquetaIkasturtea;

  public readonly nivelSeleccionado = signal('Todos');
  public readonly ikasturteaElegida = signal<string | null>(null);   // null = el curso más reciente
  public readonly ikasturteaSeleccionada = computed(
    () => this.ikasturteaElegida() ?? this.serviceHiztegia.ikasturteaActual()
  );
  public readonly fechaSeleccionada = signal('Todos');
  public readonly filtro = signal('');

  public readonly palabrasFiltradas = computed(() => {
    const nivel = this.nivelSeleccionado();
    const ikasturtea = this.ikasturteaSeleccionada();
    const fecha = this.fechaSeleccionada();
    const filtro = normalizar(this.filtro());

    return this.serviceHiztegia.hiztegia().filter(palabra =>
      (nivel === 'Todos' || palabra.maila === nivel) &&
      (ikasturtea === 'Todos' || etiquetaIkasturtea(palabra.ikasturtea) === ikasturtea) &&
      (fecha === 'Todos' || palabra.data === fecha) &&
      (!filtro ||
        normalizar(palabra.eu).includes(filtro) ||
        (palabra.eu_alt ?? []).some(v => normalizar(v).includes(filtro)) ||
        palabra.es.some(s => normalizar(s).includes(filtro)) ||
        normalizar(palabra.maila).includes(filtro) ||
        formatearFecha(palabra.data).includes(filtro))
    );
  });

  constructor(public readonly serviceHiztegia: ServiceHiztegia) {}
}
