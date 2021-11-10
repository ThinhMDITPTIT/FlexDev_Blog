import { Component, Input } from '@angular/core';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input()
  public commentContent: any;

  constructor(private readonly articlesStateService: ArticlesStateService) {}

  public deleteComment() {
    console.log('Delete comment');
    this.articlesStateService.dataChangedEmit.emit();
  }
}
