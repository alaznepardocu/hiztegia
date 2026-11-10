import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../authService';
import { EditorPalabras } from './editor-palabras';

@Component({
  imports: [FormsModule, EditorPalabras],
  selector: 'app-admin',
  templateUrl: './admin.html',
})
export class Admin {
  email = '';
  password = '';
  // La app no usa zone.js: lo que cambia después de un "await" va en signals para que se refresque la pantalla.
  readonly error = signal('');
  readonly entrando = signal(false);

  constructor(public readonly auth: AuthService) {}

  async entrar(): Promise<void> {
    this.error.set('');
    this.entrando.set(true);
    try {
      await this.auth.login(this.email.trim(), this.password);
      this.password = '';
    } catch {
      this.error.set('Email o contraseña incorrectos.');
    } finally {
      this.entrando.set(false);
    }
  }

  salir(): Promise<void> {
    return this.auth.logout();
  }
}
