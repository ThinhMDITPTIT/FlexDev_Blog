import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public featuresHome: string[];

  constructor() {
    this.featuresHome = ['Your Feed', 'Global Feed'];
  }
}
