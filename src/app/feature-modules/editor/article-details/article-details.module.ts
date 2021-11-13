import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CustomPipesModule } from 'src/app/commons/pipes/custom-pipes.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MarkdownEditorModule } from 'src/app/commons/shared-modules/markdown-editor/markdown-editor.module';

@NgModule({
  declarations: [ArticleDetailsComponent, CommentDetailsComponent],
  imports: [
    CommonModule,
    ArticleDetailsRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MarkdownModule,
    CustomPipesModule,
    TextFieldModule,
    MarkdownEditorModule,
    CustomPipesModule
  ],
})
export class ArticleDetailsModule {}
