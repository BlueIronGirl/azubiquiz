import {Action, createReducer, on} from '@ngrx/store';
import {User} from "../../../entity/user";
import {UserActions} from "./user.actions";

export const userFeatureKey = 'user';

export interface State {
    loginUser: User | null;
    users: User[]
}

export const initialState: State = {
    loginUser: null,
    users: []
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

    on(UserActions.loadUsersSuccess, (state, action) => {
        return {...state, users: action.data}
    }),
);
