import { AbstractControl, ValidatorFn } from "@angular/forms";

export function NoWhiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): any => {
    let controlVal = control.value;
    if (typeof controlVal === "number") {
      controlVal = `${controlVal}`;
    }
    let isWhitespace = (controlVal || "").trim().length === 0;
    let isValid = !isWhitespace;
    return isValid;
  };
}
