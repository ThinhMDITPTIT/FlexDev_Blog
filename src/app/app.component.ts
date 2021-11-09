import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from './core/services/apis/articles-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flexdev-blog';
}
