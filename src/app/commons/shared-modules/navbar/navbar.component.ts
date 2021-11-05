import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public defaultUser: string = 'ThinhMD';
  showBanner?: boolean;

  constructor(private readonly router: Router) {}

  ngOnInit(): void{
    this.displayBanner();
  }

  toProfile() {
    this.router.navigate(['profile', this.defaultUser]);
  }

  toLogout() {
    console.log('logout');
  }

  displayBanner(){
    this.router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationStart){
        this.showBanner = event.url === '/' ? true : false;
      }
    })
  }
}
