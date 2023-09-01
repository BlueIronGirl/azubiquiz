import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {LoginService} from "../service/login.service";
import {LoginActions} from "./login.actions";

@Injectable()
export class LoginEffects {


  register$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(LoginActions.register),
        map(action => action.data),
        concatMap(inputData => this.loginService.register(inputData).pipe(
            map(data => LoginActions.registerSuccess({data: data})),
            catchError(error => of(LoginActions.registerFailure({error})))
        ))
    )
  });

  registerSuccess$ = createEffect(() =>
      this.actions$.pipe(
          ofType(LoginActions.registerSuccess),
          tap(() => {
            this.router.navigateByUrl("/login");
          }),
      ), {dispatch: false});

  login$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(LoginActions.login),
        map(action => action.data),
        concatMap(inputData => this.loginService.login(inputData).pipe(
            map(data => LoginActions.loginSuccess({data: data})),
            catchError(error => of(LoginActions.loginFailure({error})))
        ))
    )
  });

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
          ofType(LoginActions.loginSuccess),
          tap((action) => {
            this.loginService.saveLoginStateToLocalStorage(action.data);
            this.router.navigateByUrl("/");
          }),
      ), {dispatch: false});

  logout$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(LoginActions.logout),
        map(() => LoginActions.logoutSuccess()),
        tap(data => {
          this.loginService.saveLoginStateToLocalStorage(null);
          this.router.navigateByUrl("/login");
        }),
    )
  });


  constructor(private actions$: Actions, private router: Router, private loginService: LoginService) {
  }
}
