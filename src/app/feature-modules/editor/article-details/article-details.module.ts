import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ArticleDetailsComponent, CommentDetailsComponent],
  imports: [
    CommonModule,
    ArticleDetailsRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ArticleDetailsModule {}
