import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  defaultUser: string = "ThinhMD";
  defaultBio: string = "Mô tả..."

  constructor(private readonly router: Router) {}

  toSetting() {
    this.router.navigate(['settings']);
  }
}
