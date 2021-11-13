import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticlesApiService } from '../apis/articles-api.service';
import { throwError } from 'rxjs';

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
      catchError(this.handleError)
    );
  }

  public getCurrentArticleBySlug(slug: any) {
    return this.articlesApiService.getArticleBySlug(slug).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  public deleteArticleBySlug(slug: any) {
    return this.articlesApiService.deleteArticle(slug).pipe(
      tap((data: any) => data),
      catchError(this.handleError)
    );
  }

  public getFavoriteArticlesByUsername(username: any) {
    return this.articlesApiService.getArticleFavoriteByUsername(username).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  public getArticlesByAuthor(username: any) {
    return this.articlesApiService.getArticleByAuthor(username).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  public favoriteArticleBySlug(slug: any) {
    return this.articlesApiService.favoriteArticle(slug).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  public unFavoriteArticleBySlug(slug: any) {
    return this.articlesApiService.unfavoriteArticle(slug).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(error || 'Server error');
  }
}
