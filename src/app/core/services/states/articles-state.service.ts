import { EventEmitter, Injectable } from '@angular/core';
import { ArticlesApiService } from '../apis/articles-api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStateService {
  public fakeUser: string = 'johnjacob';

  public feedArticles: any;
  public globalArticles: any;
  public myArticles: any;
  public favoritedArticles: any;
  public feedArticlesEmit: EventEmitter<any>;
  public globalArticlesEmit: EventEmitter<any>;
  public myArticlesEmit: EventEmitter<any>;
  public favoritedArticlesEmit: EventEmitter<any>;

  public pageSize: number = 5;
  public maxSize: number = 3;

  constructor(private readonly articlesApiService: ArticlesApiService) {
    this.feedArticlesEmit = new EventEmitter<any>();
    this.globalArticlesEmit = new EventEmitter<any>();
    this.myArticlesEmit = new EventEmitter<any>();
    this.favoritedArticlesEmit = new EventEmitter<any>();
    this.articlesApiService.getFeed().subscribe((data: any) => {
      this.feedArticles = data;
      this.feedArticlesEmit.emit(this.feedArticles);
    });
    this.articlesApiService.getAllArticle().subscribe((data: any) => {
      this.globalArticles = data;
      this.globalArticlesEmit.emit(this.globalArticles);
    });
    this.articlesApiService
      .getArticleByAuthor(this.fakeUser)
      .subscribe((data: any) => {
        this.myArticles = data;
        this.myArticlesEmit.emit(this.myArticles);
      });
    this.articlesApiService
      .getArticleFavoriteByUsername(this.fakeUser)
      .subscribe((data: any) => {
        this.favoritedArticles = data;
        this.favoritedArticlesEmit.emit(this.favoritedArticles);
      });
  }
}
