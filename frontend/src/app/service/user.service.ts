import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, retry, throwError} from "rxjs";
import {User} from "../entity/user";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.api}`)
      .pipe(
        retry(3),
        map(user => user.map(b => b)),
        catchError(this.errorHandler)
      )
  }
}
