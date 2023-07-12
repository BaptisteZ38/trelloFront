import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../model/state';

@Injectable({
    providedIn: 'root'
})
export class StateService{
    private baseUrl = "https://localhost:8080/state"

    constructor(private httpClient: HttpClient){}

    getAllState(): Observable<State[]>{
        return this.httpClient.get<State[]>(`${this.baseUrl}`);
    }

    createState(state: State): Observable<State> {
        return this.httpClient.post<State>("https://localhost:8080/state", state);
    }
}