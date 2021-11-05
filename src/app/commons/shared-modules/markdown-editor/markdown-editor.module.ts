import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
  ],
  exports: [MarkdownEditorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarkdownEditorModule {}
