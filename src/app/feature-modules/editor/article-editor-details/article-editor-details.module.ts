import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorDetailsRoutingModule } from './article-editor-details-routing.module';
import { ArticleEditorDetailsComponent } from './article-editor-details.component';
import { MarkdownEditorModule } from 'src/app/commons/shared-modules/markdown-editor/markdown-editor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputCustomModule } from 'src/app/commons/shared-modules/tag-input-custom/tag-input-custom.module';

@NgModule({
  declarations: [ArticleEditorDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticleEditorDetailsRoutingModule,
    MarkdownEditorModule,
    TagInputCustomModule
  ],
  exports: [ArticleEditorDetailsComponent],
})
export class ArticleEditorDetailsModule {}
