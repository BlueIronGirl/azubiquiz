import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../../entity/user";
import {HttpErrorResponse} from "@angular/common/http";

export const UserActions = createActionGroup({
    source: 'User',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<{ data: User[] }>(),
        'Load Users Failure': props<{ error: HttpErrorResponse }>(),

    }
});
