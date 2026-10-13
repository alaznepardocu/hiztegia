import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { User } from './userdata';

@Service()
export class Serviceusers {
    private httpclient=inject(HttpClient);
    readonly API_URL:string="https://jsonplaceholder.typicode.com/users";
    
    getUsers(){
        return this.httpclient.get<User[]>(this.API_URL);
    }

}
