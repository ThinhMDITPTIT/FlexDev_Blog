import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatePassword } from './../../../commons/validators/validate-password';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { LoadingSpinnerService } from './../../../core/services/spinner/loading-spinner.service';
import { ToastrService } from 'ngx-toastr';

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

  signUpForm = this._fb.group(
    {
      username: ['',
        [
          Validators.required,
          Validators.minLength(6),
          ValidatePassword.patternValidator(this.isWhitespace, {
            hasWhitespace: true,
          }),
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          ValidatePassword.patternValidator(this.isWhitespace, {
            hasWhitespace: true,
          }),
          ValidatePassword.patternValidator(this.isContainLetter, {
            hasLetter: true,
          }),
          ValidatePassword.patternValidator(this.isContainNumber, {
            hasNumber: true,
          }),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [ValidatePassword.matchValidator],
    });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly authStateService: AuthStateService,
    private readonly route: Router,
    private readonly spinner: LoadingSpinnerService,
    private readonly toastr: ToastrService
  ) {}

  get username() {
    return this.signUpForm.get('username') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword') as FormControl;
  }

  register() {
    const user = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    };
    if (this.signUpForm.valid) {
      this.spinner.showSpinner();
      this.authStateService.register({ user }).subscribe(
        (res) => {
          setTimeout(() => {
            this.spinner.hideSpinner();
            this.toastr.success('', 'Register Successful!');
          }, 250);
          setTimeout(() => {
            this.route.navigate(['']);
            this.toastr.success(
              'Wellcome to FlexDev!',
              `Hi, ${res.user.username}`
            );
          }, 500);
        },
        (err) => {
          setTimeout(() => {
            this.spinner.hideSpinner();
          }, 700);
          setTimeout(() => {
            const error = err.error.errors;
            if (error.username) {
              this.username.setErrors({ usernameAlreadyTaken: true });
            }
            if (error.email) {
              this.email.setErrors({ emailAlreadyTaken: true });
            }
          }, 1000);
        }
      );
    }
    this.submitted = true;
  }
}
