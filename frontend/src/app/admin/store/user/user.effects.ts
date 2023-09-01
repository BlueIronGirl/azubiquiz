import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
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


    constructor(private actions$: Actions, private router: Router, private userService: UserService, private loginService: LoginService) {
    }
}
