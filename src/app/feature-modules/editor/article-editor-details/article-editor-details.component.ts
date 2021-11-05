import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-article-editor-details',
  templateUrl: './article-editor-details.component.html',
  styleUrls: ['./article-editor-details.component.scss'],
})
export class ArticleEditorDetailsComponent {
  public markdownForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.markdownForm = _fb.group({
      title: ['', Validators.required],
      description: [''],
      content: [''],
      tags: [],
    });
  }

  public get contentRawControl() {
    return this.markdownForm.controls.content as FormControl;
  }
}
