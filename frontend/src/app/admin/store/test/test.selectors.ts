import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTest from './test.reducer';
import {TreenodeFactory} from "../../../shared/treenodefactory";
import {max} from "rxjs";

export const selectTestState = createFeatureSelector<fromTest.State>(
  fromTest.testFeatureKey
);

export const selectTestsLoading = createSelector(
  selectTestState,
  state => state.loading
)

export const selectAllTests = createSelector(
  selectTestState,
  state => state.tests
)

export const selectTestById = (id: number) => createSelector(
  selectTestState,
  state => state.tests[state.tests.findIndex(item => item.id === id)]
)

export const selectMaxTestId = createSelector(
  selectTestState,
  state => Math.max(...state.tests.map(test => test.id))
)
