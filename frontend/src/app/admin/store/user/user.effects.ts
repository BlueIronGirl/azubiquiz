import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, tap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import {UserService} from "../../../service/user.service";
import {UserActions} from "./user.actions";
import {LoginService} from "../../../service/login.service";
import {Router} from "@angular/router";


@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() => this.userService.getAll().pipe(
                map(users => UserActions.loadUsersSuccess({data: users})),
                catchError(error => of(UserActions.loadUsersFailure({error}))))
            )
        );
    });

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.register),
            map(action => action.data),
            concatMap(inputData => this.loginService.register(inputData).pipe(
                map(data => UserActions.registerSuccess({data: data})),
                catchError(error => of(UserActions.registerFailure({error})))
            ))
        )
    });

    registerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.registerSuccess),
            tap((action) => {
                this.router.navigateByUrl("/login");
            }),
        ), {dispatch: false});

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.login),
            map(action => action.data),
            concatMap(inputData => this.loginService.login(inputData).pipe(
                map(data => UserActions.loginSuccess({data: data})),
                catchError(error => of(UserActions.loginFailure({error})))
            ))
        )
    });

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginSuccess),
            tap((action) => {
                this.loginService.saveLoginStateToLocalStorage(action.data);
                this.router.navigateByUrl("/");
            }),
        ), {dispatch: false});

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.logout),
            map(() => UserActions.logoutSuccess()),
            tap(data => {
                this.loginService.saveLoginStateToLocalStorage(null);
                this.router.navigateByUrl("/login");
            }),
        )
    });


    constructor(private actions$: Actions, private router: Router, private userService: UserService, private loginService: LoginService) {
    }
}
