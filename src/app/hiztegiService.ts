import { computed, Injectable, signal } from '@angular/core';
import { AditzaFila, Hitz, NorNork, NuevaHitz, Trinkoa } from './hiztegia';
import { supabase } from './supabase';
import { etiquetaIkasturtea } from './utilidades';

const ORDEN_DENBORA: Record<string, number> = { orainaldia: 0, lehenaldia: 1 };

@Injectable({ providedIn: 'root' })
export class ServiceHiztegia {
    // ---- Palabras
    hiztegia = signal<Hitz[]>([]);
    niveles = signal<string[]>(['Todos']);        // A1, A2... (antes "cursos")
    ikasturteak = signal<string[]>(['Todos']);    // '2026-27'...
    fechas = signal<string[]>(['Todos']);         // fechas ISO, la más reciente primero

    /** Etiqueta del curso más reciente que hay en los datos (o 'Todos' si aún no hay datos). */
    ikasturteaActual = computed(() => {
        const años = this.hiztegia().map(p => p.ikasturtea);
        return años.length ? etiquetaIkasturtea(años.reduce((a, b) => Math.max(a, b))) : 'Todos';
    });

    // ---- Verbos (en la base de datos están unificados en "aditzak";
    //      aquí se siguen ofreciendo con la forma de siempre para no tocar las pantallas)
    trinkoak = signal<Trinkoa[]>([]);
    aditzTrikoak = signal<string[]>([]);
    intransitiboak = signal<string[]>(['izan', 'egon', 'joan', 'etorri', 'ibili']);
    transitiboak = signal<string[]>(['ukan', 'eduki', 'ekarri', 'eraman', 'jakin']);

    auxiliarrak = signal<NorNork[]>([]);
    aditzAuxiliarrak = signal<string[]>([]);
    auxiliarrakDisponibles = signal<string[]>(['nor-nork']);
    laguntzaileakDenborak = signal<string[]>([]);
    laguntzaileakModuak = signal<string[]>([]);

    // ---- Estado de carga
    cargado = signal(false);
    error = signal<string | null>(null);
    private promesa?: Promise<void>;

    /** Descarga los datos una sola vez. Con forzar = true los vuelve a pedir (p. ej. tras editar). */
    cargar(forzar = false): Promise<void> {
        if (!this.promesa || forzar) {
            this.promesa = this.descargar();
        }
        return this.promesa;
    }

    // ---- Escritura (solo funciona con sesión de admin: lo decide la base de datos con RLS)
    async crearPalabra(palabra: NuevaHitz): Promise<void> {
        const { error } = await supabase.from('palabras').insert(palabra);
        if (error) throw error;
        await this.cargar(true);
    }

    async actualizarPalabra(id: string, palabra: NuevaHitz): Promise<void> {
        const { data, error } = await supabase.from('palabras').update(palabra).eq('id', id).select('id');
        if (error) throw error;
        if (!data?.length) throw { code: '42501' };   // RLS no deja error: simplemente no toca ninguna fila
        await this.cargar(true);
    }

    async borrarPalabra(id: string): Promise<void> {
        const { data, error } = await supabase.from('palabras').delete().eq('id', id).select('id');
        if (error) throw error;
        if (!data?.length) throw { code: '42501' };
        await this.cargar(true);
    }

    // ---- Interno
    private async descargar(): Promise<void> {
        this.error.set(null);
        try {
            const [palabras, aditzak] = await Promise.all([
                this.traerTodo<Hitz>('palabras'),
                this.traerTodo<AditzaFila>('aditzak'),
            ]);

            // Palabras
            palabras.sort((a, b) => a.data.localeCompare(b.data) || a.eu.localeCompare(b.eu, 'eu'));
            this.hiztegia.set(palabras);
            this.niveles.set(['Todos', ...[...new Set(palabras.map(p => p.maila))].sort()]);
            this.ikasturteak.set([
                'Todos',
                ...[...new Set(palabras.map(p => p.ikasturtea))].sort((a, b) => b - a).map(etiquetaIkasturtea),
            ]);
            this.fechas.set(['Todos', ...[...new Set(palabras.map(p => p.data))].sort().reverse()]);

            // Verbos
            aditzak.sort((a, b) => (ORDEN_DENBORA[a.denbora] ?? 9) - (ORDEN_DENBORA[b.denbora] ?? 9));
            const trinkoak = aditzak.filter(f => f.mota !== 'nor-nork').map(aTrinkoa);
            const auxiliarrak = aditzak.filter(f => f.mota === 'nor-nork').map(aNorNork);
            const nombresAuxiliarrak = [...new Set(auxiliarrak.map(a => a.aditza))];
            const denboraAuxiliarrak = [...new Set(auxiliarrak.map(a => a.denbora))];
            const moduakAuxiliarrak = [...new Set(auxiliarrak.map(a => a.modua))];

            this.trinkoak.set(trinkoak);
            this.aditzTrikoak.set([...new Set(trinkoak.map(t => t.aditza))]);
            this.auxiliarrak.set(auxiliarrak);
            this.aditzAuxiliarrak.set(nombresAuxiliarrak);
            this.laguntzaileakDenborak.set(denboraAuxiliarrak);
            this.laguntzaileakModuak.set(moduakAuxiliarrak);
            this.auxiliarrakDisponibles.set(nombresAuxiliarrak);

            this.cargado.set(true);
        } catch (e) {
            console.error('Error cargando datos de Supabase', e);
            this.error.set('No se pudieron cargar los datos.');
            this.promesa = undefined;   // permite reintentar
        }
    }

    /** La API devuelve como máximo 1000 filas por petición: se pide por páginas. */
    private async traerTodo<T>(tabla: 'palabras' | 'aditzak'): Promise<T[]> {
        const filas: T[] = [];
        for (let desde = 0; ; desde += 1000) {
            const { data, error } = await supabase.from(tabla).select('*').order('id').range(desde, desde + 999);
            if (error) throw error;
            filas.push(...((data ?? []) as T[]));
            if (!data || data.length < 1000) break;
        }
        return filas;
    }
}

function aTrinkoa(f: AditzaFila): Trinkoa {
    return {
        konjugaioa: f.konjugaioa,
        pertsona: (f.mota === 'nor' ? f.nor : f.nork) ?? '',
        aditza: f.aditza,
        denbora: f.denbora,
        ...(f.objektu ? { objektu: f.objektu } : {}),
    };
}

function aNorNork(f: AditzaFila): NorNork {
    return {
        aditza: f.aditza,
        konjugaioa: f.konjugaioa,
        modua: f.modua ?? '',
        nor: f.nor ?? '',
        nork: f.nork ?? '',
        denbora: f.denbora,
    };
}
