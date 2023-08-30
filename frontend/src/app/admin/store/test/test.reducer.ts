import {createReducer, on} from '@ngrx/store';
import {
  addTest,
  addTestFailure,
  addTestSuccess,
  deleteTest, deleteTestFailure, deleteTestSuccess,
  loadTests,
  loadTestsFailure,
  loadTestsSuccess, updateTest, updateTestFailure, updateTestSuccess
} from './test.actions';
import {Test} from "../../../shared/entities/test";

export const testFeatureKey = 'test';

export interface State {
  tests: Test[],
  loading: boolean;
}

export const initialState: State = {
  tests: [],
  loading: false
};

export const reducer = createReducer(
  initialState,

  // loadTests
  on(loadTests, state => {
    return {...state, loading: true}
  }),
  on(loadTestsSuccess, (state, action) => {
    return {...state, tests: action.data, loading: false}
  }),
  on(loadTestsFailure, (state, action) => {
    return {...state, loading: false}
  }),

  // addTest
  on(addTest, state => {
    return {...state, loading: true}
  }),
  on(addTestSuccess, (state, action) => {
    let tests = [...state.tests];
    tests.push(action.test);
    return {tests, loading: false};
  }),
  on(addTestFailure, state => {
    return {...state, loading: false}
  }),

  // updateTest
  on(updateTest, state => {
    return {...state, loading: true}
  }),
  on(updateTestSuccess, (state, action) => {
    let indexToUpdate = state.tests.findIndex(item => item.id === action.test.id);

    let tests = [...state.tests];
    if (indexToUpdate >= 0) {
      tests[indexToUpdate] = action.test;
    }

    return {tests, loading: false};
  }),
  on(updateTestFailure, state => {
    return {...state, loading: false}
  }),

  // deleteTest
  on(deleteTest, state => {
    return {...state, loading: true};
  }),
  on(deleteTestSuccess, (state, action) => {
    let indexToRemove = state.tests.findIndex(item => item.id === action.test.id);

    let tests = [...state.tests];
    if (indexToRemove >= 0) {
      tests.splice(indexToRemove, 1);
    }

    return {tests, loading: false};
  }),
  on(deleteTestFailure, state => {
    return {...state, loading: false}
  })
);
