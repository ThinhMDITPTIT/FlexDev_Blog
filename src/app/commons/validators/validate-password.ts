import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ValidatePassword {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  static matchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    if (password !== confirmPassword && confirmPassword.length > 0) {
      control.get('confirmPassword')?.setErrors({ isPassswordMatch: true });
    }
  }

}
