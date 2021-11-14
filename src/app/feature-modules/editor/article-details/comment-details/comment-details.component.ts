import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input()
  public isHost: boolean = false;

  @Input()
  public commentContent: any;

  @Input()
  public articleSlug: any;

  @Output()
  public deleteCommentOutput: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router
  ) { }

  public deleteComment(commentID: any) {
    this.deleteCommentOutput.emit(commentID);
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }
}
