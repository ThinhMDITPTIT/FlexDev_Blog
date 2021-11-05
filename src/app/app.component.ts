import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from './core/services/apis/articles-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'flexdev-blog';

  constructor(private articleApiService: ArticlesApiService) {}

  ngOnInit(){
    this.articleApiService.getArticleByAuthor('johnjacob').subscribe(data => {
      console.log(data);

    })
  }
}
