import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatePassword } from './../../../commons/validators/validate-password';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  submitted: boolean = false;

  isWhitespace = /^[\S]*$/;
  isContainLetter = /^(?=.*[a-zA-Z])/;
  isContainNumber = /^(?=.*[0-9])/;

  signUpForm = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        ValidatePassword.patternValidator(this.isWhitespace, { hasWhitespace: true }),
        ValidatePassword.patternValidator(this.isContainLetter, { hasLetter: true }),
        ValidatePassword.patternValidator(this.isContainNumber, { hasNumber: true }),
      ]
    ],
    confirmPassword: ['', Validators.required]
  }, {
    validators: [ValidatePassword.matchValidator]
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly authStateService: AuthStateService,
    private readonly route: Router,
    private readonly modalService: NgbModal
  ) {}

  get username() {
    return this.signUpForm.get('username') as FormControl
  }

  get email() {
    return this.signUpForm.get('email') as FormControl
  }

  get password() {
    return this.signUpForm.get('password') as FormControl
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword') as FormControl
  }

  register() {
    const user = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    }
    if(this.signUpForm.valid){
      this.authStateService.register({user}).subscribe(() => {
        this.route.navigate(['']);
      }, err => {
        const error = err.error.errors;
        if(error.username){
          this.username.setErrors({usernameAlreadyTaken: true})
        }
        if(error.email){
          this.email.setErrors({emailAlreadyTaken: true})
        }
      })
    }
    this.submitted = true;
  }
}
