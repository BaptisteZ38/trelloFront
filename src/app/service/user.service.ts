import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private baseUrl = "http://localhost:8080/user"

    constructor(private httpClient: HttpClient){}

    getAllUser(): Observable<User[]>{
        return this.httpClient.get<User[]>(`${this.baseUrl}`);
    }

    createUser(user: User): Observable<User> {
        return this.httpClient.post<User>("http://localhost:8080/user", user);
    }
}