import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Hitz, Trinkoa } from './hiztegia';

@Injectable({ providedIn: 'root' })
export class ServiceHiztegia {
    constructor(private http: HttpClient) { }

    private urlHiztegia: string = 'https://api.jsonbin.io/v3/b/6acdd703ac6210605a2cbcf8?meta=false';
    private urlTrikoak: string = 'https://api.jsonbin.io/v3/b/6ad8eaa8ac6210605a4669ce?meta=false';
    private urlAuxiliarrak: string = 'https://api.jsonbin.io/v3/b/6aedc320ffd5d16053abcf48?meta=false';

    hiztegia = signal<Hitz[]>([]);
    cursos = signal<string[]>(["Todos"]);
    fechas = signal<string[]>(["Todos"]);

    trinkoak = signal<Trinkoa[]>([]);
    aditzTrikoak = signal<string[]>([]);
    transitiboak = signal<string[]>(["izan","egon","joan","etorri","ibili"]);
    intransitiboak = signal<string[]>(["ukan","eduki","ekarri","eraman","jakin"]);

    auxiliarrak = signal<any[]>([]);
    aditzAuxiliarrak = signal<string[]>([]);
    auxiliarrakDisponibles = signal<string[]>(["nor-nork"]);

    getHiztegia(): Observable<any> {
        return this.http.get<Hitz[]>(this.urlHiztegia)
    }

    getTrikoak(): Observable<any> {
        return this.http.get<Hitz[]>(this.urlTrikoak)
    }

    getAuxiliarrak(): Observable<any> {
        return this.http.get<Hitz[]>(this.urlAuxiliarrak)
    }
}
