import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { CommentsStateService } from 'src/app/core/services/states/comments-state.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input()
  public isHost: Boolean = false;

  @Input()
  public commentContent: any;

  @Input()
  public articleSlug: any;

  constructor(
    private readonly commentsStateService: CommentsStateService,
    private router: Router,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly toastr: ToastrService
  ) { }

  public deleteComment(commentId: any) {
    this.loadingSpinnerService.showSpinner();
    this.commentsStateService
      .deleteCommentOfArticle(this.articleSlug, commentId)
      .subscribe(() => {
        this.commentsStateService
          .getCommentsFromArticle(this.articleSlug)
          .subscribe((data: any) => {
            this.commentsStateService.currentCommentsOfArticle$.next(data);
            setTimeout(() => {
              this.loadingSpinnerService.hideSpinner();
              this.toastr.success('Success!', 'Delete Article completed!');
            }, 250);
          });
      });
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }
}
