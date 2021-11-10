import { Component } from '@angular/core';
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
  submitted: boolean = false;

  signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly authApiService: AuthApiService,
    private readonly authStateService: AuthStateService,
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
    if (!this.signInForm.invalid) {
      this.authApiService
        .login({
          user: {
            email: this.email.value,
            password: this.password.value,
          },
        })
        .subscribe((res) => {
          this.localStorage.store('token', res.user.token);
          this.authStateService.currentUserChangeEmit.emit();
          this.router.navigate(['']);
        });
    }
    this.submitted = true;
  }
}
