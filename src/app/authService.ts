import { Injectable, signal } from '@angular/core';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
    /** true cuando ya se ha comprobado si hay una sesión guardada */
    readonly listo = signal(false);
    readonly email = signal<string | null>(null);
    /** Solo sirve para mostrar u ocultar la interfaz: la seguridad real la ponen las políticas RLS. */
    readonly esAdmin = signal(false);

    constructor() {
        supabase.auth.getSession().then(({ data }) => {
            this.actualizar(data.session);
            this.listo.set(true);
        });
        supabase.auth.onAuthStateChange((_evento, session) => this.actualizar(session));
    }

    async login(email: string, password: string): Promise<void> {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    }

    async logout(): Promise<void> {
        await supabase.auth.signOut();
    }

    private actualizar(session: Session | null): void {
        this.email.set(session?.user?.email ?? null);
        this.esAdmin.set(session?.user?.app_metadata?.['role'] === 'admin');
    }
}
