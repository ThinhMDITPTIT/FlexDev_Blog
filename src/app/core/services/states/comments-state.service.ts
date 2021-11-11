import { EventEmitter, Injectable } from '@angular/core';
import { CommentsApiService } from '../apis/comments-api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsStateService {
  public currentCommentsOfArticleEmit: EventEmitter<any>;

  constructor(private readonly commentsApiService: CommentsApiService) {
    this.currentCommentsOfArticleEmit = new EventEmitter<any>();
  }

  public getCommentsFromArticle(slug: any) {
    this.commentsApiService
      .getCommentsFromAnArticle(slug)
      .subscribe((data: any) => {
        this.currentCommentsOfArticleEmit.emit(data);
      });
  }

  public addCommentToArticle(slug: any, commentObj: any) {
    this.commentsApiService
      .addCommentToAnArticle(slug, commentObj)
      .subscribe(() => {
        this.getCommentsFromArticle(slug);
      });
  }

  public deleteCommentOfArticle(slug: any, commentId: any) {
    this.commentsApiService
      .deleteCommentToAnArticle(slug, commentId)
      .subscribe(() => {
        this.getCommentsFromArticle(slug);
      });
  }
}
