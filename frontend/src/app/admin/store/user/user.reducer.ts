import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import {User} from "../../../shared/entities/user";

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  loading: boolean;
}

export const initialState: State = {
  users: [],
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => {
    return {...state, loading: true};
  }),

  on(UserActions.loadUsersSuccess, (state, action) => {
    return {...state, users: action.data, loading: false}
  }),

  on(UserActions.loadUsersFailure, (state, action) => {
    return {...state, loading: false}
  }),

);
