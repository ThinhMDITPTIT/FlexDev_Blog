import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule, MarkdownModule],
  exports: [MarkdownEditorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarkdownEditorModule {}
