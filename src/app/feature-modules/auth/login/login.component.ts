import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerService } from './../../../core/services/spinner/loading-spinner.service';
import { Main } from 'tsparticles';

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
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly spinner: LoadingSpinnerService
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
      this.authApiService
        .login({
          user: {
            email: this.email.value,
            password: this.password.value,
          },
        })
        .subscribe(
          (res) => {
            this.localStorage.store('token', res.user.token);
            setTimeout(() => {
              this.spinner.hideSpinner();
              this.authStateService.currentUserChangeEmit.emit();
              this.router.navigate(['']);
            }, 1000);
            this.toastr.info(`Wellcome back!`, `Hi, ${res.user.username}`);
          },
          (err) => {
            setTimeout(() => {
              this.spinner.hideSpinner();
            }, 500);
            if (err.error.errors) {
              this.toastr.warning(
                'Please try again!',
                'Email or Password is Invalid!'
              );
            }
          }
        );
    }
    this.submitted = true;
  }

  id = 'tsparticles';
  particlesUrl = 'http://foo.bar/particles.json';
  title = 'flexdev-blog';
  particlesOptions: any = {
    background: {
      color: {
        value: '#ffffff',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#9085ec',
      },
      links: {
        color: '#6554fd',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: any): void {
  }

  particlesInit(main: any): void {
  }
}
