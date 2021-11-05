import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/commons/models/IArticle';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit {
  public feedArticle: IArticle[];
  public globalArticle: IArticle[];
  public currentArticle: IArticle[];

  constructor(private readonly articlesApiService: ArticlesApiService) {
    this.feedArticle = [];
    this.globalArticle = [];
    this.currentArticle = [];
  }

  ngOnInit() {
    this.articlesApiService.getFeed().subscribe((data: any) => {
      console.log(data);
      this.feedArticle = data.articles;
    });
    this.articlesApiService.getAllArticle().subscribe((data: any) => {
      console.log(data);
      this.globalArticle = data.articles;
    });
  }

  public showFeed() {
    this.currentArticle = this.feedArticle;
  }
  public showGlobal() {
    this.currentArticle = this.globalArticle;
  }
}
