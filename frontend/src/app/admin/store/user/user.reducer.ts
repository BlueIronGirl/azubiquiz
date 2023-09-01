import { Action, createReducer, on } from '@ngrx/store';
import {User} from "../../../entity/user";
import {UserActions} from "./user.actions";

export const userFeatureKey = 'user';

export interface State {
  loginUser: User | null;
  users: User[];
  loading: boolean;
}

export const initialState: State = {
  loginUser: null,
  users: [],
  loading: false
};

export const reducer = createReducer(
  initialState,

    // register
    on(UserActions.registerSuccess, (state, action) => {
      return {...state, loginUser: action.data}
    }),

    // login
    on(UserActions.loginSuccess, (state, action) => {
      return {...state, loginUser: action.data}
    }),
    on(UserActions.loginLocalstorage, (state, action) => {
      return {...state, loginUser: action.data}
    }),

    // logout
    on(UserActions.logout, (state, action) => {
      return {...state, loginUser: null}
    }),

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
