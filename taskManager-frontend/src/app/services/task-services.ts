import { Injectable } from '@angular/core';
import { TaskModel } from '../models/tasks.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import e from 'express';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  private taskUrl = 'http://127.0.0.1:3000/tasks';

  constructor(private http: HttpClient) {}

  //Get All Tasks
  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.taskUrl).pipe(catchError(this.handleError));
  }

  //add task
  addTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.taskUrl, task).pipe(catchError(this.handleError));
  }

  //Update Task
  updateTask(task: TaskModel): Observable<TaskModel> {
    return this.http
      .put<TaskModel>(`${this.taskUrl}/${task.id}`, task)
      .pipe(catchError(this.handleError));
  }

  //Delete TASK
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.taskUrl}/${id}`).pipe(catchError(this.handleError));
  }

  //Centeralized the error handler
  private handleError(error: HttpErrorResponse) {
    let msg = 'Something went wrong';

    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Server error(${error.status})`;
    }

    return throwError(() => msg);
  }
}
