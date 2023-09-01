import { Action, createReducer, on } from '@ngrx/store';
import {LoginActions} from "./login.actions";
import {User} from "../entity/user";

export const loginFeatureKey = 'login';

export interface State {
    loginUser: User | null;
}

export const initialState: State = {
    loginUser: null
};

export const loginReducer = createReducer(
  initialState,

    // register
    on(LoginActions.registerSuccess, (state, action) => {
        return {...state, loginUser: action.data}
    }),

    // login
    on(LoginActions.loginSuccess, (state, action) => {
        return {...state, loginUser: action.data}
    }),
    on(LoginActions.loginLocalstorage, (state, action) => {
        return {...state, loginUser: action.data}
    }),

    // logout
    on(LoginActions.logout, (state, action) => {
        return {...state, loginUser: null}
    }),

);
