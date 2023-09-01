import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../../entity/user";
import {HttpErrorResponse} from "@angular/common/http";

export const UserActions = createActionGroup({
    source: 'Einkaufszettel',
    events: {
        'Register': props<{ data: User }>(),
        'Register Success': props<{ data: User }>(),
        'Register Failure': props<{ error: HttpErrorResponse }>(),

        'Login': props<{ data: User }>(),
        'Login Localstorage': props<{ data: User }>(),
        'Login Success': props<{ data: User }>(),
        'Login Failure': props<{ error: HttpErrorResponse }>(),

        'Logout': emptyProps(),
        'Logout Success': emptyProps(),

        'Load Users': emptyProps(),
        'Load Users Success': props<{ data: User[] }>(),
        'Load Users Failure': props<{ error: HttpErrorResponse }>(),

    }
});
