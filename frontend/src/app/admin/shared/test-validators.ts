import {AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class TestValidators {
  static atLeastOneElementInArray(controlArray: AbstractControl): ValidationErrors | null {
    if ((controlArray as FormArray).controls.some((el: AbstractControl) => el.value)) {
      return null;
    } else {
      return {
        atLeastOneElementInArray: {valid: false}
      };
    }
  }
}
