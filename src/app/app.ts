import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Serviceusers } from './serviceusers';
import { User } from './userdata';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  protected readonly title = signal('jsonPostUsers');

  serviceusers= inject(Serviceusers)
  users=signal<User[]>([])

  ngOnInit(): void {
    this.serviceusers.getUsers().subscribe({
      next:resultado =>{
        console.log(resultado);
        this.users.set(resultado)
      }
    })
  }
  

}
