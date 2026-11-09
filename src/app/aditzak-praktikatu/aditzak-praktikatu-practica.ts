import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NorNork, Trinkoa } from '../hiztegia';
import type { Aditza } from './aditzak-praktikatu';

@Component({
  imports: [FormsModule],
  selector: 'app-aditzak-praktikatu-practica',
  templateUrl: './aditzak-praktikatu-practica.html',
})
export class AditzakPraktikatuPractica implements OnInit {
  @Input() aditzak: Aditza[] = [];
  @Output() reset = new EventEmitter<void>();

  aditzakPendientes: Aditza[] = [];
  palabraSeleccionada: Aditza = { konjugaioa: '', aditza: '', denbora: '', pertsona: '' };
  modo = '';
  verboNorNork = '';
  intentos = 3;
  acertado = false;
  palabraIntroducida = '';
  textoAcierto = '';
  classTextoAcierto = 'text-center';
  readonly verbosNorNork = ['gonbidatu', 'maite', 'ikusi', 'izendatu', 'ikastera animatu'];

  ngOnInit(): void {
    this.aditzakPendientes = [...this.aditzak];
    this.sacarPalabra();
  }

  sacarPalabra(): void {
    if (this.aditzakPendientes.length === 0) {
      return;
    }

    const indice = Math.trunc(Math.random() * this.aditzakPendientes.length);
    this.palabraSeleccionada = this.aditzakPendientes[indice];
    if ('pertsona' in this.palabraSeleccionada) {
      this.modo = 'trikoa';
    } else if ('nor' in this.palabraSeleccionada && 'nork' in this.palabraSeleccionada) {
      this.modo = 'norNork';
      const verboIndice = Math.trunc(Math.random() * this.verbosNorNork.length);
      this.verboNorNork = this.verbosNorNork[verboIndice];
    }

    this.intentos = 3;
    this.textoAcierto = '';
    this.classTextoAcierto = 'text-center';
    this.acertado = false;
    this.palabraIntroducida = '';
  }

  probar(): void {
    if (this.intentos <= 0) {
      return;
    }

    this.acertado = this.palabraIntroducida.trim().toLowerCase() ===
      this.palabraSeleccionada.konjugaioa.toLowerCase();
    if (this.acertado) {
      this.textoAcierto = '<strong>Oso ondo!</strong>';
      this.classTextoAcierto = 'text-center text-success fw-bold fs-2';
      this.aditzakPendientes.splice(this.aditzakPendientes.indexOf(this.palabraSeleccionada), 1);
      this.palabraIntroducida = '';
      this.palabraSeleccionada = { konjugaioa: '', aditza: '', denbora: '', pertsona: '' };
      if (this.aditzakPendientes.length === 0) {
        this.textoAcierto = 'Zorionak!<br> Has adivinado todas las palabras.';
      }
      return;
    }

    this.intentos--;
    this.textoAcierto = this.intentos > 0 ? 'Intentalo de nuevo' : '';
    this.textoAcierto += `<br>Intentos restantes: ${this.intentos}`;
    this.classTextoAcierto = 'text-center text-info';
  }

  get respuesta(): string {
    return this.palabraSeleccionada.konjugaioa;
  }
}
