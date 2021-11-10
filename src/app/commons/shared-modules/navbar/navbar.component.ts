import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public defaultUser: string = 'huyda';
  showBanner?: boolean;

  constructor(private readonly router: Router, private readonly localStorage: LocalStorageService) {}

  ngOnInit(): void{
    this.displayBanner();
  }

  toProfile() {
    this.router.navigate(['profile', this.defaultUser]);
  }

  logout() {
    this.localStorage.clear('token');
    this.router.navigate(['']);
  }

  displayBanner(){
    this.router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationStart){
        this.showBanner = event.url === '/' ? true : false;
      }
    })
  }
}
