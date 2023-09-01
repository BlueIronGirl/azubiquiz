import {Action, createReducer, on} from '@ngrx/store';
import {User} from "../../../entity/user";
import {UserActions} from "./user.actions";

export const userFeatureKey = 'user';

export interface State {
    users: User[]
}

export const initialState: State = {
    users: []
};

export const reducer = createReducer(
    initialState,

    on(UserActions.loadUsersSuccess, (state, action) => {
        return {...state, users: action.data}
    }),
);
