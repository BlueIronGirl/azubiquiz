import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as UserActions from './user.actions';
import {UserStoreService} from "../../../shared/user-store.service";


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => this.userService.getAll().pipe(
        map(books => UserActions.loadUsersSuccess({data: books})),
        catchError(error => of(UserActions.loadUsersFailure({error}))))
      )
    );
  });


  constructor(private actions$: Actions, private userService: UserStoreService) {
  }
}
