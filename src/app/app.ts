
import { CommonModule } from '@angular/common';
import { ServiceHiztegia } from './hiztegiService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
/* import { Hitz } from './hiztegia';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from 'firebase/firestore'; */


@Component({
  imports: [CommonModule, RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  /* firestore: Firestore = inject(Firestore); */
  constructor(private hiztegiService: ServiceHiztegia) { }

  ngOnInit(): void {
    /* const aCollection = collection(this.firestore, 'hiztegia');
    const items$: Observable<Hitz[]> = collectionData <Hitz>(aCollection);
    items$.subscribe((data: Hitz[]) => {
      console.log(data);
      this.hiztegiService.hiztegia.set(data);
    }); */

    this.hiztegiService.getData().subscribe((data: any) => {
      console.log(data);
      this.hiztegiService.hiztegia.set(data);
    }); 
  }

}
