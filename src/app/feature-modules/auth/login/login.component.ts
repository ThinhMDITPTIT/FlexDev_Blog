import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength]],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly authApiService: AuthApiService,
    private readonly localStorage: LocalStorageService,
    private readonly router: Router
  ) {}

  get email() {
    return this.signInForm.get('email') as FormControl;
  }

  get password() {
    return this.signInForm.get('password') as FormControl;
  }

  login() {
    this.authApiService
      .login({
        user: {
          email: this.email.value,
          password: this.password.value,
        }
      })
      .subscribe((res) => {
        this.localStorage.store('token', res.user.token);
        this.router.navigate(['']);
      });
  }
}
