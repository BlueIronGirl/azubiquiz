import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of, retry, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Test} from "../entity/test";

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private api = 'http://localhost:8080/tests';

  constructor(private httpClient: HttpClient) {
  }

  private static errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('Fehler aufgetreten!' + error);
    return throwError(() => error);
  }

  getAll(): Observable<Test[]> {
    return this.httpClient.get<Test[]>(`${this.api}`)
      .pipe(
        retry(3),
        catchError(TestService.errorHandler)
      )
  }

  addTest(test: Test): Observable<Test> {
    return this.httpClient.post<Test>(this.api, test).pipe(
      catchError(TestService.errorHandler)
    );
  }

  updateTest(test: Test): Observable<Test> {
    return this.httpClient.put<Test>(`${this.api}/${test.id}`, test).pipe(
      catchError(TestService.errorHandler)
    );
  }

  deleteTest(test: Test): Observable<Test> {
    return this.httpClient.delete<Test>(`${this.api}/${test.id}`).pipe(
      catchError(TestService.errorHandler)
    );
  }
}
