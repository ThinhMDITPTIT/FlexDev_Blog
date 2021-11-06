import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from 'src/app/commons/models/IArticle';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit {
  @Input()
  public featuresArr: string[];

  @Input()
  public userData: any;

  public feedArticle: IArticle[];
  public globalArticle: IArticle[];
  public myArticle: IArticle[];
  public favoritedArticle: IArticle[];
  public currentArticle: IArticle[];

  constructor(
    private router: Router,
    private readonly articlesApiService: ArticlesApiService
  ) {
    this.featuresArr = [];
    this.feedArticle = [];
    this.globalArticle = [];
    this.myArticle = [];
    this.favoritedArticle = [];
    this.currentArticle = [];
  }

  ngOnInit() {
    if (this.featuresArr.includes('Your Feed')) {
      this.articlesApiService.getFeed().subscribe((data: any) => {
        console.log(data);
        this.feedArticle = data.articles;
        this.currentArticle = this.feedArticle;
      });
      this.articlesApiService.getAllArticle().subscribe((data: any) => {
        console.log(data);
        this.globalArticle = data.articles;
      });
    } else {
      this.articlesApiService
        .getArticleByAuthor(this.userData)
        .subscribe((data: any) => {
          console.log(data);
          this.myArticle = data.articles;
          this.currentArticle = this.myArticle;
        });
    }
  }

  public showData(featureName: string) {
    if (featureName === 'Your Feed') {
      this.currentArticle = this.feedArticle;
      return;
    }
    if (featureName === 'Global Feed') {
      this.currentArticle = this.globalArticle;
      return;
    }
    if (featureName === 'My Articles') {
      // Change this ...
      this.currentArticle = this.myArticle;
      this.router.navigate(['', 'profile', this.userData]);
      return;
    }
    if (featureName === 'Favorites Articles') {
      // Change this ...
      this.currentArticle = this.favoritedArticle;
      this.router.navigate(['', 'profile', this.userData, 'favorites']);
      return;
    }
  }
}
