import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEnd,
} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;

  public defaultUser: string = '';
  showBanner?: boolean;

  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly authStateService: AuthStateService,
    private readonly spinner: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.displayBanner();
    this.authStateService.currentLoggedIn$.subscribe(() => {
      if(this.localStorage.retrieve('token')){
        this.isAuthenticated = true;
        this.authStateService.getCurrentUserInfo().subscribe(res => {
          this.defaultUser = res.user.username;
        })
      }else {
        this.isAuthenticated = false;
      }
    });
  }

  toProfile() {
    this.authStateService.getCurrentUserInfo().subscribe(data => this.router.navigate(['profile', data.user.username]));
  }

  logout() {
    this.localStorage.clear('token');
    this.spinner.showSpinner();
    setTimeout(() => {
      this.authStateService.currentLoggedIn$.next('Logout');
      this.spinner.hideSpinner();
      this.router.navigate(['login']);
    }, 500);
  }

  displayBanner() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationStart) {
        this.showBanner = event.url === '/' ? true : false;
      }
    });
  }
}
