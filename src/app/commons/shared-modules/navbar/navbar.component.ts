import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEnd,
} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public defaultUser: string = 'huyda';
  showBanner?: boolean;

  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly authStateService: AuthStateService,
    private readonly spinner: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.displayBanner();
    this.authStateService.currentUserProfileEmit.subscribe((data: any) => {
      this.defaultUser = data.user.username;
    });
  }

  toProfile() {
    this.router.navigate(['profile', this.defaultUser]);
  }

  logout() {
    this.localStorage.clear('token');
    this.spinner.showSpinner();
    setTimeout(() => {
      this.spinner.hideSpinner();
      this.router.navigate(['']);
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
