import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';

export const selectLoginState = createFeatureSelector<fromLogin.State>(
  fromLogin.loginFeatureKey
);

export const selectLogin = createSelector(
    selectLoginState,
    state => state.loginUser
)
