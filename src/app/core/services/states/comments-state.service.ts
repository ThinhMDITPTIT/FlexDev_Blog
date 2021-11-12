import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommentsApiService } from '../apis/comments-api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsStateService {
  public currentCommentsOfArticle$: BehaviorSubject<any> =
    new BehaviorSubject<any>({});

  constructor(private readonly commentsApiService: CommentsApiService) {}

  public getCommentsFromArticle(slug: any) {
    return this.commentsApiService.getCommentsFromAnArticle(slug).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public addCommentToArticle(slug: any, commentObj: any) {
    return this.commentsApiService.addCommentToAnArticle(slug, commentObj).pipe(
      map((data: any) => data),
      catchError((err) => err)
    );
  }

  public deleteCommentOfArticle(slug: any, commentId: any) {
    return this.commentsApiService
      .deleteCommentToAnArticle(slug, commentId)
      .pipe(
        map((data: any) => data),
        catchError((err) => err)
      );
  }
}
