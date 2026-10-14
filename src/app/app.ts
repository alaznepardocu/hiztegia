import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VisualizarHiztegia } from './visualizar-hiztegia/visualizar-hiztegia';
import { Proba } from './proba/proba';
import { ServiceHiztegia } from './hiztegiService';
import { Hitz } from './hiztegia';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Hitz } from './hiztegia';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from 'firebase/firestore';


@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, VisualizarHiztegia],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  firestore: Firestore = inject(Firestore);
  constructor(private hiztegiService: ServiceHiztegia) { }

  ngOnInit(): void {
    const aCollection = collection(this.firestore, 'hiztegia');
    const items$: Observable<Hitz[]> = collectionData <Hitz>(aCollection);
    items$.subscribe((data: Hitz[]) => {
      console.log(data);
      this.hiztegiService.hiztegia.set(data);
    });

    /* this.hiztegiService.getData().subscribe((data: any) => {
      console.log(data);
      this.hiztegiService.hiztegia.set(data);
    }); */
  }

}
