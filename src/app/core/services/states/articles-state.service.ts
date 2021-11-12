import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticlesApiService } from '../apis/articles-api.service';
import { LoadingSpinnerService } from '../spinner/loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStateService {
  public articles$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentArticleBySlug$: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );

  public pageSize: number = 5;
  public maxSize: number = 3;

  constructor(private readonly articlesApiService: ArticlesApiService) {}

  public getGlobalArticle() {
    return this.articlesApiService.getAllArticle().pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public getFeedArticle() {
    return this.articlesApiService.getFeed().pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public getCurrentArticleBySlug(slug: any) {
    return this.articlesApiService.getArticleBySlug(slug).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public deleteArticleBySlug(slug: any) {
    return this.articlesApiService.deleteArticle(slug).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public getFavoriteArticlesByUsername(username: any) {
    return this.articlesApiService.getArticleFavoriteByUsername(username).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public getArticlesByAuthor(username: any) {
    return this.articlesApiService.getArticleByAuthor(username).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public favoriteArticleBySlug(slug: any) {
    return this.articlesApiService.favoriteArticle(slug).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public unFavoriteArticleBySlug(slug: any) {
    return this.articlesApiService.unfavoriteArticle(slug).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }
}
