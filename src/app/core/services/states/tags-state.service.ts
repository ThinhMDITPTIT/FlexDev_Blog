import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticlesApiService } from '../apis/articles-api.service';
import { TagsApiService } from '../apis/tags-api.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsStateService {
  public currentTag: string;
  public articlesByTag: any[];
  public articlesByTag$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentTagEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly articlesApiService: ArticlesApiService,
    private readonly tagsApiService: TagsApiService
  ) {
    this.currentTag = '';
    this.articlesByTag = [];
  }

  public clearCurrentTag() {
    this.currentTag = '';
    this.currentTagEmit.emit();
  }

  public getAllTags() {
    return this.tagsApiService.getTags().pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  public getArticlesDataByTag(tag: string) {
    this.currentTag = tag;
    return this.articlesApiService.getArticleByTag(tag).pipe(
      map((data: any) => {
        this.articlesByTag = data;
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error')
  }
}
