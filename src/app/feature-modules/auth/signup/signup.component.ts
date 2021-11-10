import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatePassword } from './../../../commons/validators/validate-password';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';
import { concatMap } from 'rxjs/operators'
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNotificationComponent } from './modal-notification/modal-notification.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  isWhitespace = /^[\S]*$/;
  isContainLetter = /^(?=.*[a-zA-Z])/;
  isContainNumber = /^(?=.*[0-9])/;

  errorMessage: any = {};

  signUpForm = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      [''],
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
    private readonly authApiService: AuthApiService,
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
    this.authApiService.register({
        user: {
          username: this.username.value,
          email: this.email.value,
          password: this.password.value,
        }
      })
      .subscribe(res => {
        // console.log(res);

      }, err => {
        this.errorMessage = err.error.errors;

      })
    // if(this.signUpForm.valid){
    //   this.modalService.open(ModalNotificationComponent)
    // }
  }
}
