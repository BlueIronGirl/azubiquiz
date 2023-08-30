import {createAction, props} from '@ngrx/store';
import {Test} from "../../../shared/entities/test";
import {HttpErrorResponse} from "@angular/common/http";

// loadTests
export const loadTests = createAction(
  '[Test] Load Tests'
);
export const loadTestsSuccess = createAction(
  '[Test] Load Tests Success',
  props<{ data: Test[] }>()
);
export const loadTestsFailure = createAction(
  '[Test] Load Tests Failure',
  props<{ error: HttpErrorResponse }>()
);

// addTest
export const addTest = createAction(
  '[User] Add Test',
  props<{ test: Test }>()
);
export const addTestSuccess = createAction(
  '[Test] Add Test Success',
  props<{ test: Test }>()
);
export const addTestFailure = createAction(
  '[Test] Add Test Failure',
  props<{ error: HttpErrorResponse }>()
);

// updateTest
export const updateTest = createAction(
  '[User] Update Test',
  props<{ test: Test }>()
);
export const updateTestSuccess = createAction(
  '[Test] Update Test Success',
  props<{ test: Test }>()
);
export const updateTestFailure = createAction(
  '[Test] Update Test Failure',
  props<{ error: HttpErrorResponse }>()
);

// deleteTest
export const deleteTest = createAction(
  '[User] Delete Test',
  props<{ test: Test }>()
);
export const deleteTestSuccess = createAction(
  '[Test] Delete Test Success',
  props<{ test: Test }>()
);
export const deleteTestFailure = createAction(
  '[Test] Delete Test Failure',
  props<{ error: HttpErrorResponse }>()
);
