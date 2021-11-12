import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEnd,
} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;

  public defaultUser: string = 'huyda';
  showBanner?: boolean;

  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    this.displayBanner();
    this.authStateService.currentUserProfileEmit.subscribe((data: any) => {
      this.defaultUser = data.user.username;
    });
    this.authStateService.currentLoggedInEmit.subscribe((data: any) => {
      if(data?.user?.token){
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    })
  }

  toProfile() {
    this.router.navigate(['profile', this.defaultUser]);
  }

  logout() {
    this.localStorage.clear('token');
    this.router.navigate(['login']);
  }

  displayBanner() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationStart) {
        this.showBanner = event.url === '/' ? true : false;
      }
    });
  }
}
