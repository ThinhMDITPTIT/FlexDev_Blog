import { Component } from '@angular/core';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public featuresHome: string[];

  constructor(private readonly authStateService: AuthStateService) {
    this.featuresHome = ['Your Feed', 'Global Feed'];

    this.authStateService.getCurrentUserInfo();
  }
}
