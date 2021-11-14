import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationEnd,
  ActivatedRoute,
  NavigationStart,
} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;

  public username: string = '';
  public imageUrl: string = '';
  public showBanner: boolean = false;
  public isHidden: boolean = false;
  private currentRoute: any;

  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly authStateService: AuthStateService,
    private readonly spinner: LoadingSpinnerService,
    private readonly userService: UserStateService
  ) {}

  ngOnInit(): void {
    this.display();
    this.displayInfo();
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url
      }
    })
  }

  toProfile() {
    this.authStateService.getCurrentUserInfo().subscribe(data => this.router.navigate(['profile', data.user.username]));
  }

  displayInfo(){
    this.authStateService.currentLoggedIn$.subscribe(() => {
      if(this.localStorage.retrieve('token')){
        this.isAuthenticated = true;
        this.authStateService.getCurrentUserInfo().pipe(
          switchMap(res => {
            this.username = res.user.username;
            return this.userService.getUserProfileByUsername(this.username);
          })
        )
        .subscribe(res => this.imageUrl = res.profile.image);
      }else {
        this.isAuthenticated = false;
      }
    });
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

  display() {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.showBanner = event.urlAfterRedirects === '/' ? true : false;
        this.isHidden = (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/register') ? true : false;
      }
    })
  }

  saveRoute(){
    this.localStorage.store('redirectUrl', this.currentRoute);
  }
}
