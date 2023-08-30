import { createAction, props } from '@ngrx/store';
import {User} from "../../../shared/entities/user";
import {HttpErrorResponse} from "@angular/common/http";

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: HttpErrorResponse }>()
);
