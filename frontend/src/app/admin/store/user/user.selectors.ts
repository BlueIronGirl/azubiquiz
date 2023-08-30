import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUsersLoading = createSelector(
  selectUserState,
  state => state.loading
)

export const selectAllUsers = createSelector(
  selectUserState,
  state => state.users
)
