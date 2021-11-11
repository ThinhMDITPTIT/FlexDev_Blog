import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommentsStateService } from 'src/app/core/services/states/comments-state.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input()
  public commentContent: any;

  @Input()
  public articleSlug: any;

  constructor(
    private readonly commentsStateService: CommentsStateService,
    private router: Router
  ) {}

  public deleteComment(commentId: any) {
    this.commentsStateService.deleteCommentOfArticle(
      this.articleSlug,
      commentId
    );
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }
}
