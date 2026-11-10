import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hitz } from '../hiztegia';
import { esCorrecta } from '../utilidades';

const palabraVacia = (): Hitz => ({ eu: '', es: [], maila: '', ikasturtea: 0, data: '' });

@Component({
  imports: [FormsModule],
  selector: 'app-hiztegia-praktikatu-practica',
  templateUrl: './hiztegia-praktikatu-practica.html',
})
export class HiztegiaPraktikatuPractica implements OnInit {
  @Input() modo = 'Euskara';
  @Input() palabrasAEstudiar: Hitz[] = [];
  palabraSeleccionada: Hitz = palabraVacia();
  nPalabras = 0;
  palabraIntroducida = '';
  intentos = 3;
  acertado = false;
  textoAcierto = '';
  classTextoAcierto = 'text-center';
  solucion = '';
  @Output() reset = new EventEmitter<void>();

  ngOnInit(): void {
    this.palabrasAEstudiar = [...this.palabrasAEstudiar];
    this.nPalabras = this.palabrasAEstudiar.length;
    this.sacarPalabra();
  }

  /** Lo que se enseña como solución cuando se agotan los intentos. */
  get respuestaVisible(): string {
    const p = this.palabraSeleccionada;
    return this.modo === 'Euskara' ? p.es.join(' · ') : [p.eu, ...(p.eu_alt ?? [])].join(' · ');
  }

  public sacarPalabra(): void {
    if (this.palabrasAEstudiar.length === 0) {
      return;
    }
    const indice = Math.trunc(Math.random() * this.palabrasAEstudiar.length);
    this.palabraSeleccionada = this.palabrasAEstudiar[indice];
    this.intentos = 3;
    this.textoAcierto = '';
    this.classTextoAcierto = 'text-center';
    this.acertado = false;
    this.palabraIntroducida = '';
    this.solucion = '';
  }

  public probar(): void {
    if (this.intentos <= 0) {
      return;
    }

    // Euskara -> vale CUALQUIERA de los significados en castellano.
    // Gaztelaina -> vale la palabra en euskera o cualquiera de sus variantes.
    const aceptadas = this.modo === 'Euskara'
      ? this.palabraSeleccionada.es
      : [this.palabraSeleccionada.eu, ...(this.palabraSeleccionada.eu_alt ?? [])];
    this.acertado = esCorrecta(aceptadas, this.palabraIntroducida);

    if (this.acertado) {
      this.textoAcierto = '<strong>Oso ondo!</strong><br>';
      this.solucion = `${this.palabraSeleccionada.eu} = ${this.palabraSeleccionada.es.join(' · ')}`;
      this.classTextoAcierto = 'text-center text-success fw-bold fs-2';
      this.palabrasAEstudiar.splice(this.palabrasAEstudiar.indexOf(this.palabraSeleccionada), 1);
      this.palabraIntroducida = '';
      this.palabraSeleccionada = palabraVacia();
      if (this.palabrasAEstudiar.length === 0) {
        this.textoAcierto = 'Zorionak!<br> Has adivinado todas las palabras.';
      }
      return;
    }

    this.intentos--;
    this.textoAcierto = this.intentos > 0 ? 'Intentalo de nuevo' : '';
    this.textoAcierto += `<br>Intentos restantes: ${this.intentos}`;
    this.classTextoAcierto = 'text-center text-info';
  }
}
