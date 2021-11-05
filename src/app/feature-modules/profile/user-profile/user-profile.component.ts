import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  defaultUser: string = "ThinhMD";
  defaultBio: string = "Description...";

  constructor(private readonly router: Router) {}

  toSetting() {
    this.router.navigate(['settings']);
  }
}
