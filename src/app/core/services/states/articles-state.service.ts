import { EventEmitter, Injectable } from '@angular/core';
import { ArticlesApiService } from '../apis/articles-api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStateService {
  public dataChangedEmit: EventEmitter<any>;
  public feedArticles: any;
  public globalArticles: any;
  public feedArticlesEmit: EventEmitter<any>;
  public globalArticlesEmit: EventEmitter<any>;

  public pageSize: number = 5;
  public maxSize: number = 3;

  constructor(private readonly articlesApiService: ArticlesApiService) {
    this.dataChangedEmit = new EventEmitter<any>();
    this.feedArticlesEmit = new EventEmitter<any>();
    this.globalArticlesEmit = new EventEmitter<any>();
    this.articlesApiService.getFeed().subscribe((data: any) => {
      this.feedArticles = data;
      this.feedArticlesEmit.emit(this.feedArticles);
    });
    this.articlesApiService.getAllArticle().subscribe((data: any) => {
      this.globalArticles = data;
      this.globalArticlesEmit.emit(this.globalArticles);
    });
    this.dataChangedEmit.subscribe(() => {
      this.articlesApiService.getFeed().subscribe((data: any) => {
        this.feedArticles = data;
        this.feedArticlesEmit.emit(this.feedArticles);
      });
      this.articlesApiService.getAllArticle().subscribe((data: any) => {
        this.globalArticles = data;
        this.globalArticlesEmit.emit(this.globalArticles);
      });
    });
  }
}
