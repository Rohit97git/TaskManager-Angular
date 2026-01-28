import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentServices {
  private url = 'http://127.0.0.1:3000/comments';

  constructor(private http: HttpClient) {}

  getComments(taskId: number): Observable<CommentModel[]> {
    return this.http
      .get<CommentModel[]>(`${this.url}?taskId=${taskId}`)
      .pipe(catchError(this.handleError));
  }

  addComment(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.url, comment).pipe(catchError(this.handleError));
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(catchError(this.handleError));
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
