import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceHiztegia } from '../hiztegiService';
import { Hitz } from '../hiztegia';

@Component({
  imports: [FormsModule],
  selector: 'app-hiztegia-praktikatu-filtros',
  templateUrl: './hiztegia-praktikatu-filtros.html',
})
export class HiztegiaPraktikatuFiltros implements AfterViewInit, OnInit {
  modo = 'Euskara';
  cursoSeleccionado = 'Todos';
  fechaSeleccionada = 'Todos';
  palabrasFiltradas: Hitz[] | null = null;
  textoFiltrado = '';
  @Output() empezar = new EventEmitter<{ palabras: Hitz[]; modo: string }>();

  @ViewChild('panelFiltros') panelFiltros!: ElementRef<HTMLElement>;

  constructor(public readonly serviceHiztegia: ServiceHiztegia) {}

  ngAfterViewInit(): void {
    this.panelFiltros.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnInit(): void {
    this.filtrar();
  }

  get fechasDisponibles(): string[] {
    const curso = this.cursoSeleccionado.toLowerCase();
    const fechas = this.serviceHiztegia.hiztegia().reverse()
      .filter(palabra => curso === 'todos' || palabra.maila.toLowerCase() === curso)
      .map(palabra => palabra.data);
    return ['Todos', ...new Set(fechas)];
  }

  get nPalabras(): number {
    return this.palabrasFiltradas?.length ?? this.serviceHiztegia.hiztegia().length;
  }

  public cambiarCurso(curso: string): void {
    this.cursoSeleccionado = curso;
    if (!this.fechasDisponibles.some(fecha => fecha.toLowerCase() === this.fechaSeleccionada.toLowerCase())) {
      this.fechaSeleccionada = 'Todos';
    }
    this.filtrar();
  }

  public cambiarFecha(fecha: string): void {
    this.fechaSeleccionada = fecha;
    this.filtrar();
  }

  public filtrar(): void {
    this.palabrasFiltradas = this.serviceHiztegia.hiztegia().filter(palabra =>
      (this.cursoSeleccionado === 'Todos' ||
        palabra.maila.toLowerCase() === this.cursoSeleccionado.toLowerCase()) &&
      (this.fechaSeleccionada === 'Todos' ||
        palabra.data.toLowerCase() === this.fechaSeleccionada.toLowerCase())
    );
  }

  public iniciarPractica(): void {
    const palabras = this.palabrasFiltradas ?? this.serviceHiztegia.hiztegia();
    this.empezar.emit({ palabras: [...palabras], modo: this.modo });
  }
}
