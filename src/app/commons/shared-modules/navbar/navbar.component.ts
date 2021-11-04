import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public defaultUser: string = 'ThinhMD';

  constructor(private readonly router: Router) {}

  toProfile() {
    this.router.navigate(['profile', this.defaultUser]);
  }

  toLogout() {
    console.log('logout');

  }
}
