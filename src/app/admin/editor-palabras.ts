import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hitz, NuevaHitz } from '../hiztegia';
import { ServiceHiztegia } from '../hiztegiService';
import { etiquetaIkasturtea, formatearFecha, ikasturteaPorDefecto, normalizar } from '../utilidades';

interface Borrador {
  id?: string;
  eu: string;
  euAlt: string;      // variantes separadas por comas
  es: string[];       // un significado por elemento
  notaes: string;
  notaeu: string;
  maila: string;
  ikasturtea: number;
  dia: number;
  mes: number;
  fechaOriginal?: string;
}

const MAX_FILAS = 100;

@Component({
  imports: [FormsModule],
  selector: 'app-editor-palabras',
  templateUrl: './editor-palabras.html',
})
export class EditorPalabras {
  readonly nivelesPosibles = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  readonly meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' },
  ];
  readonly maxFilas = MAX_FILAS;
  readonly etiquetaIkasturtea = etiquetaIkasturtea;
  readonly formatearFecha = formatearFecha;

  borrador: Borrador = this.borradorNuevo();
  filtroNivel = 'Todos';
  filtroIkasturtea = 'Todos';
  filtroData = 'Todos';
  filtroTexto = '';

  // Estado que cambia después de un "await": en signals (la app no usa zone.js)
  readonly guardando = signal(false);
  readonly editandoId = signal<string | null>(null);
  readonly mensaje = signal<{ texto: string; error: boolean } | null>(null);

  constructor(public readonly svc: ServiceHiztegia) {}

  get diasDisponibles(): number[] {
    const anio = this.anioDelCurso(this.borrador.mes);
    const total = new Date(anio, this.borrador.mes, 0).getDate();
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  cambiarMes(mes: number): void {
    this.borrador.mes = Number(mes);
    this.ajustarDia();
  }

  cambiarIkasturtea(ikasturtea: number): void {
    this.borrador.ikasturtea = Number(ikasturtea);
    this.ajustarDia();
  }

  private ajustarDia(): void {
    if (this.borrador.dia > this.diasDisponibles.length) {
      this.borrador.dia = this.diasDisponibles.length;
    }
  }

  get filtradas(): Hitz[] {
    const texto = normalizar(this.filtroTexto);
    return this.svc.hiztegia()
      .filter(p =>
        (this.filtroNivel === 'Todos' || p.maila === this.filtroNivel) &&
        (this.filtroIkasturtea === 'Todos' || etiquetaIkasturtea(p.ikasturtea) === this.filtroIkasturtea) &&
        (this.filtroData === 'Todos' || p.data === this.filtroData) &&
        (!texto ||
          normalizar(p.eu).includes(texto) ||
          p.es.some(s => normalizar(s).includes(texto))))
      .reverse();   // lo más reciente primero (filter devuelve una copia, no toca el original)
  }

  anadirSignificado(): void {
    this.borrador.es.push('');
  }

  quitarSignificado(i: number): void {
    this.borrador.es.splice(i, 1);
  }

  editar(p: Hitz): void {
    this.borrador = {
      id: p.id,
      eu: p.eu,
      euAlt: (p.eu_alt ?? []).join(', '),
      es: [...p.es],
      notaes: p.notaes ?? '',
      notaeu: p.notaeu ?? '',
      maila: p.maila,
      ikasturtea: p.ikasturtea,
      dia: Number(p.data.slice(8, 10)),
      mes: Number(p.data.slice(5, 7)),
      fechaOriginal: p.data,
    };
    this.editandoId.set(p.id ?? null);
    this.mensaje.set(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelar(): void {
    this.borrador = this.borradorNuevo();
    this.editandoId.set(null);
  }

  async guardar(): Promise<void> {
    const fila: NuevaHitz = {
      eu: this.borrador.eu.trim(),
      eu_alt: this.borrador.euAlt.split(',').map(s => s.trim()).filter(Boolean),
      notaeu: this.borrador.notaeu.trim() || null,
      es: this.borrador.es.map(s => s.trim()).filter(Boolean),
      notaes: this.borrador.notaes.trim() || null,
      maila: this.borrador.maila,
      ikasturtea: Number(this.borrador.ikasturtea),
      data: this.borrador.fechaOriginal ?? this.fechaSeleccionada(),
    };
    if (!fila.eu || fila.es.length === 0 || !Number.isInteger(fila.ikasturtea) || fila.ikasturtea < 1) {
      this.aviso('Escribe la palabra en euskera, al menos un significado y un curso válido.', true);
      return;
    }

    this.guardando.set(true);
    try {
      const id = this.borrador.id;
      if (id) {
        await this.svc.actualizarPalabra(id, fila);
        this.borrador = this.borradorNuevo({ maila: fila.maila, ikasturtea: fila.ikasturtea });
        this.editandoId.set(null);
      } else {
        await this.svc.crearPalabra(fila);
        // Se conservan nivel y curso para seguir añadiendo palabras seguidas
        this.borrador = this.borradorNuevo({ maila: fila.maila, ikasturtea: fila.ikasturtea });
      }
      this.aviso('Guardado correctamente.', false);
    } catch (e: any) {
      if (e?.code === '23505') {
        this.aviso('Ya existe esa palabra en ese nivel y curso: búscala en la lista, edítala y añade el significado.', true);
      } else if (e?.code === '42501') {
        this.aviso('No tienes permisos para guardar (¿sesión de admin caducada?).', true);
      } else {
        console.error(e);
        this.aviso('No se pudo guardar. Inténtalo de nuevo.', true);
      }
    } finally {
      this.guardando.set(false);
    }
  }

  async borrar(p: Hitz): Promise<void> {
    if (!p.id || !confirm(`¿Borrar "${p.eu}"?`)) return;
    try {
      await this.svc.borrarPalabra(p.id);
      if (this.editandoId() === p.id) this.cancelar();
      this.aviso('Palabra borrada.', false);
    } catch (e: any) {
      this.aviso(e?.code === '42501' ? 'No tienes permisos para borrar.' : 'No se pudo borrar.', true);
    }
  }

  private borradorNuevo(base: Partial<Borrador> = {}): Borrador {
    return {
      eu: '',
      euAlt: '',
      es: [''],
      notaes: '',
      notaeu: '',
      maila: base.maila ?? 'A1',
      ikasturtea: base.ikasturtea ?? ikasturteaPorDefecto(),
      dia: new Date().getDate(),
      mes: new Date().getMonth() + 1,
    };
  }

  private fechaSeleccionada(): string {
    const anio = this.anioDelCurso(this.borrador.mes);
    const mes = String(this.borrador.mes).padStart(2, '0');
    const dia = String(this.borrador.dia).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  private anioDelCurso(mes: number): number {
    return Number(this.borrador.ikasturtea) + (mes < 9 ? 1 : 0);
  }

  private aviso(texto: string, error: boolean): void {
    this.mensaje.set({ texto, error });
  }
}
