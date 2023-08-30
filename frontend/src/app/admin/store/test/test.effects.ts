import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as TestActions from './test.actions';
import {TestStoreService} from "../../../shared/test-store.service";


@Injectable()
export class TestEffects {

  loadTests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestActions.loadTests),
      switchMap(() => this.testService.getAll().pipe(
        map(tests => TestActions.loadTestsSuccess({data: tests})),
        catchError(error => of(TestActions.loadTestsFailure({error}))))
      )
    );
  });

  addTest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestActions.addTest),
      map(action => action.test),
      concatMap(inputData => this.testService.addTest(inputData).pipe(
          map(data => TestActions.addTestSuccess({test: data})),
          catchError(error => of(TestActions.addTestFailure({error})))
        )
      )
    );
  });

  updateTest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestActions.updateTest),
      map(action => action.test),
      concatMap(inputData => this.testService.updateTest(inputData).pipe(
          map(data => TestActions.updateTestSuccess({test: data})),
          catchError(error => of(TestActions.updateTestFailure({error})))
        )
      )
    );
  });

  deleteTest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestActions.deleteTest),
      map(action => action.test),
      concatMap(inputData => this.testService.deleteTest(inputData).pipe(
          map(data => TestActions.deleteTestSuccess({test: data})),
          catchError(error => of(TestActions.deleteTestFailure({error})))
        )
      )
    )
  });


  constructor(private actions$: Actions, private testService: TestStoreService) {
  }
}
