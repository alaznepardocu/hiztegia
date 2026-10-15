import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Hitz } from './hiztegia';

@Injectable({ providedIn: 'root' })
export class ServiceHiztegia {
    constructor(private http: HttpClient) { }

    private url: string = 'https://api.jsonbin.io/v3/b/6acdd703ac6210605a2cbcf8?meta=false';

    hiztegia = signal<Hitz[]>([]);
    cursos = signal<string[]>(["Todos"]);
    fechas = signal<string[]>(["Todos"]);



    getData(): Observable<any> {
        return this.http.get<Hitz[]>(this.url)
    }
}
