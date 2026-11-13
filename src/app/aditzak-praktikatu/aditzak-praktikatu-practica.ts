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
  @Input() usarGauzak: boolean = true;
  @Output() reset = new EventEmitter<void>();

  aditzakPendientes: Aditza[] = [];
  modoGauzak: boolean = true;
  palabraSeleccionada: Aditza = { konjugaioa: '', aditza: '', denbora: '', pertsona: '' };
  modo = '';
  verboNorNork = '';
  intentos = 3;
  acertado = false;
  palabraIntroducida = '';
  fraseAAcertar: string[] = [''];
  textoAcierto = '';
  classTextoAcierto = 'text-center';
  readonly verbosNorNork = ['gonbidatu', 'maite', 'ikusi', 'izendatu', 'ikastera animatu'];
  readonly gauzakPoseerSingular = ['buruko mina', 'etxe handi bat', 'telefonoa', 'denbora asko', 'arazo bat'];
  readonly gauzakPoseerPlural = ['hiru txakurra', 'lagun asko', 'galdera batzuk', 'giltza guztiak', 'liburu berriak'];
  readonly gauzakLlevarSingular = ['ogia', 'gutun bat', 'ura', 'tarta handi bat', 'kotxea', 'gazta asko', 'poltsa', 'maleta'];
  readonly gauzakLlevarPlural = ['liburuak', 'bi maleta', 'opariak', 'lagunak', 'umeak', 'loreak'];
  readonly gauzakSaberSingular = ['erantzuna', 'euskara', 'sekretua', 'kanta hori', 'egia'];
  readonly gauzakSaberPlural = ['abezti guztiak', 'hitz asko', 'hiru hizkuntza', 'istorio asko', 'lagunen izenak', 'aditz hauek', 'euskal kantu asko', 'hitz berriak', 'galdera guztien erantzunak', 'aditz hauek'];

  ngOnInit(): void {
    this.aditzakPendientes = [...this.aditzak];
    this.modoGauzak = this.usarGauzak;
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
    this.fraseAAcertar = [];
    this.textoAMostrar();

  }

  textoAMostrar() {
    if (this.modo === 'trikoa') {
      // Si se ha seleccionado usar gauzak
      if ('objektu' in this.palabraSeleccionada && this.palabraSeleccionada.objektu) {
        if (this.modoGauzak) {
          if (this.palabraSeleccionada.objektu === 'singularra') {
            this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " gauza bat";
          } else {
            this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " bi gauza ";
          }
        }
        // Si se ha seleccionado no usar gauzak
        else {
          // Para los verbos eduki eta ukan se utilizan los gauzakPoseerSingular y Plural
          if (this.palabraSeleccionada.aditza === 'eduki' || this.palabraSeleccionada.aditza === 'ukan') {
            if (this.palabraSeleccionada.objektu === 'singularra') {
              var objektuIndice = Math.trunc(Math.random() * this.gauzakPoseerSingular.length);
              this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " " + this.gauzakPoseerSingular[objektuIndice];
            } else {
              var objektuIndice = Math.trunc(Math.random() * this.gauzakPoseerPlural.length);
              this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " " + this.gauzakPoseerPlural[objektuIndice];
            }
          } 
          // Para los verbos eraman eta ekarri se utilizan los gauzakLlevarSingular y Plural
          else if (this.palabraSeleccionada.aditza === 'eraman' || this.palabraSeleccionada.aditza === 'ekarri')
            if (this.palabraSeleccionada.objektu === 'singularra') {
              var objektuIndice = Math.trunc(Math.random() * this.gauzakLlevarSingular.length);
              this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " " + this.gauzakLlevarSingular[objektuIndice];
            } else {
              var objektuIndice = Math.trunc(Math.random() * this.gauzakLlevarPlural.length);
              this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " " + this.gauzakLlevarPlural[objektuIndice];
            } 
          // Para el verbo Jakin se utilizan los gauzakSaberSingular y Plural
            else if (this.palabraSeleccionada.aditza === 'jakin')
            if (this.palabraSeleccionada.objektu === 'singularra') {
              var objektuIndice = Math.trunc(Math.random() * this.gauzakSaberSingular.length);
              this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " " + this.gauzakSaberSingular[objektuIndice];
            } else {
              var objektuIndice = Math.trunc(Math.random() * this.gauzakSaberPlural.length);
              this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona + " " + this.gauzakSaberPlural[objektuIndice];
            }
        }


      } else if ('pertsona' in this.palabraSeleccionada) {
        this.fraseAAcertar[0] = this.palabraSeleccionada.pertsona;
        this.fraseAAcertar[1] = this.palabraSeleccionada.aditza;

      }
      this.fraseAAcertar[1] = "(" + this.palabraSeleccionada.aditza + ")";
      this.fraseAAcertar[2] = "\n(" + this.palabraSeleccionada.denbora + ")";
    } else if (this.modo === 'norNork' && 'nor' in this.palabraSeleccionada && 'nork' in this.palabraSeleccionada) {
      this.fraseAAcertar[0] = this.palabraSeleccionada.nork + " " + this.palabraSeleccionada.nor + " " + this.verboNorNork;
      this.fraseAAcertar[1] = "";
    }

    if (this.modo === 'trikoa') {
      this.fraseAAcertar[2] = "(" + this.palabraSeleccionada.denbora + ")";
    } else if (this.modo === 'norNork' && 'nor' in this.palabraSeleccionada && 'nork' in this.palabraSeleccionada) {
      this.fraseAAcertar[2] = "(" + this.palabraSeleccionada.denbora + ")" + "(" + this.palabraSeleccionada.modua + ")";
    }
  }

  probar(): void {
    if (this.intentos <= 0) {
      return;
    }

    this.acertado = this.palabraIntroducida.trim().toLowerCase() ===
      this.palabraSeleccionada.konjugaioa.toLowerCase();
    if (this.acertado) {
      this.textoAcierto = '<strong>Oso ondo!</strong><br>';
      this.classTextoAcierto = 'text-center text-success fw-bold fs-2';
      this.aditzakPendientes.splice(this.aditzakPendientes.indexOf(this.palabraSeleccionada), 1);
      this.palabraIntroducida = '';
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
}
