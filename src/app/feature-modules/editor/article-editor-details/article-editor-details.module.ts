import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorDetailsRoutingModule } from './article-editor-details-routing.module';
import { ArticleEditorDetailsComponent } from './article-editor-details.component';
import { MarkdownEditorModule } from 'src/app/commons/shared-modules/markdown-editor/markdown-editor.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleEditorDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticleEditorDetailsRoutingModule,
    MarkdownEditorModule,
  ],
  exports: [ArticleEditorDetailsComponent],
})
export class ArticleEditorDetailsModule {}
