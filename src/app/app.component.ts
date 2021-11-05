import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from './core/services/apis/articles-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'flexdev-blog';

    article = {
      title: "How to train your dragon",
      description: "Ever wonder how?",
      body: "Very carefully.",
      tagList: [
          "dragons",
          "training"
      ],
      comments: []
  }

  constructor(private articleApiService: ArticlesApiService) {}

  ngOnInit(){
    this.articleApiService.getFeed().subscribe(data => {
      console.log(data);

    })
  }
}
