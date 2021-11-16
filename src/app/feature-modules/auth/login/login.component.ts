import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerService } from './../../../core/services/spinner/loading-spinner.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted: boolean = false;

  signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly authStateService: AuthStateService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly spinner: LoadingSpinnerService,
    private readonly localStorage: LocalStorageService,
  ) {}

  get email() {
    return this.signInForm.get('email') as FormControl;
  }

  get password() {
    return this.signInForm.get('password') as FormControl;
  }

  login() {
    if (!this.signInForm.invalid) {
      this.spinner.showSpinner();
      let userObj = {
        user: {
          email: String(this.email.value).toLowerCase(),
          password: this.password.value,
        },
      };
      this.authStateService.login(userObj).subscribe((res) => {
        setTimeout(() => {
          this.spinner.hideSpinner();
          const url = this.localStorage.retrieve('redirectUrl')
          if(url){
            this.router.navigateByUrl(url);
            this.localStorage.clear('redirectUrl');
          }else {
            this.router.navigate(['']);
          }
        }, 500)
        this.toastr.info(`Wellcome back!`, `Hi, ${res.user.username}`);
      }, err => {
        setTimeout(() => {
          this.spinner.hideSpinner();
        }, 700);
        if(err.error.errors){
          this.toastr.warning('Please try again!', 'Email or Password is Invalid!');
        }
      });
    }
    this.submitted = true;
  }
}
