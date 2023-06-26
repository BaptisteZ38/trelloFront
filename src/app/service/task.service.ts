import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../model/task'; 

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    
    private baseUrl = "http://localhost:8080/task"

    constructor(private httpClient: HttpClient){}

    getAllTask(): Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${this.baseUrl}`).pipe(catchError(this.handleError));
    }

    getTaskByName(task: string): Observable<Task> {
        return this.httpClient.get<Task>(`${this.baseUrl}/%7Btask%7D`, { params: { task: task } }).pipe(catchError(this.handleError));
    }

    createTask(task: Task): Observable<Task> {
        return this.httpClient.post<Task>(`${this.baseUrl}`, task).pipe(catchError(this.handleError));
    }

    updateTask(taskId: string, updatedTask: Task): Observable<Task> {
        return this.httpClient.put<Task>(`${this.baseUrl}/${taskId}`, updatedTask).pipe(catchError(this.handleError));
    }

    handleError(error:any) {
        let errorMessage = '';
    
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur client : ${error.error.message}`;
        } else {
          errorMessage = `Erreur serveur : ${error.status}\nMessage: ${error.error.message}`;
        }
        return throwError(() => {return errorMessage});
      }

}