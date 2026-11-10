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
  nota: string;
  maila: string;
  ikasturtea: number;
}

const MAX_FILAS = 100;

@Component({
  imports: [FormsModule],
  selector: 'app-editor-palabras',
  templateUrl: './editor-palabras.html',
})
export class EditorPalabras {
  readonly nivelesPosibles = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  readonly maxFilas = MAX_FILAS;
  readonly etiquetaIkasturtea = etiquetaIkasturtea;
  readonly formatearFecha = formatearFecha;

  borrador: Borrador = this.borradorNuevo();
  filtroNivel = 'Todos';
  filtroIkasturtea = 'Todos';
  filtroTexto = '';

  // Estado que cambia después de un "await": en signals (la app no usa zone.js)
  readonly guardando = signal(false);
  readonly editandoId = signal<string | null>(null);
  readonly mensaje = signal<{ texto: string; error: boolean } | null>(null);

  constructor(public readonly svc: ServiceHiztegia) {}

  get filtradas(): Hitz[] {
    const texto = normalizar(this.filtroTexto);
    return this.svc.hiztegia()
      .filter(p =>
        (this.filtroNivel === 'Todos' || p.maila === this.filtroNivel) &&
        (this.filtroIkasturtea === 'Todos' || etiquetaIkasturtea(p.ikasturtea) === this.filtroIkasturtea) &&
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
      nota: p.nota ?? '',
      maila: p.maila,
      ikasturtea: p.ikasturtea,
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
      es: this.borrador.es.map(s => s.trim()).filter(Boolean),
      nota: this.borrador.nota.trim() || null,
      maila: this.borrador.maila,
      ikasturtea: Number(this.borrador.ikasturtea),
    };
    if (!fila.eu || fila.es.length === 0 || !fila.ikasturtea) {
      this.aviso('Escribe la palabra en euskera y al menos un significado.', true);
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
      nota: '',
      maila: base.maila ?? 'A1',
      ikasturtea: base.ikasturtea ?? ikasturteaPorDefecto(),
    };
  }

  private aviso(texto: string, error: boolean): void {
    this.mensaje.set({ texto, error });
  }
}
