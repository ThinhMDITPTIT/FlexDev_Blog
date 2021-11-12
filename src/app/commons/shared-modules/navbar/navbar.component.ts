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
export class NavbarComponent implements OnInit, OnChanges {
  @Input() isAuthenticated: boolean = !!this.localStorage.retrieve('token');

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
  }

  ngOnChanges(change: SimpleChanges){
    console.log(change);

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
