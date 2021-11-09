import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input()
  public commentContent: any;

  constructor() {}

  public deleteComment() {
    console.log('Delete comment');
  }
}
