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
    this.authStateService.currentLoggedIn$.subscribe((data: any) => {
      if (data === 'LoggedIn') {
        this.isAuthenticated = true;
        this.defaultUser =
          this.authStateService.currentUserProfile.user.username;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  toProfile() {
    this.router.navigate(['profile', this.defaultUser]);
  }

  logout() {
    this.localStorage.clear('token');
    this.spinner.showSpinner();
    this.authStateService.getCurrentUserInfo().subscribe(
      () => {},
      () => {
        setTimeout(() => {
          this.spinner.hideSpinner();
          this.router.navigate(['login']);
          // this.router.navigate(['']);
        }, 500);
      }
    );
  }

  displayBanner() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationStart) {
        this.showBanner = event.url === '/' ? true : false;
      }
    });
  }
}
