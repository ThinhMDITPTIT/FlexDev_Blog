import { Component } from '@angular/core';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public featuresHome: string[];

  constructor(
    private readonly localStorage: LocalStorageService,
  ) {
    this.featuresHome = [];

    if(this.localStorage.retrieve('token')){
      this.featuresHome = ['Your Feed', 'Global Feed'];
    }else {
      this.featuresHome = ['Global Feed'];
    }
  }
}
