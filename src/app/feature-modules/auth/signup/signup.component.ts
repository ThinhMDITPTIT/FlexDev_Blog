import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhiteSpaceValidator } from 'src/app/commons/validators/no-white-space.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  signUpForm = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength, NoWhiteSpaceValidator()]],
    confirmPassword: ['', [Validators.required, Validators.minLength, NoWhiteSpaceValidator()]]
  })

  constructor(
    private readonly _fb: FormBuilder
  ) {}


}
