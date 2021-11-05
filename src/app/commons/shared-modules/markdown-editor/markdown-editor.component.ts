import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MarkdownConfiguration } from './markdown-setting';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements OnInit {
  @Input()
  public control: FormControl;

  public config: AngularEditorConfig = MarkdownConfiguration;

  constructor() {
    this.control = new FormControl();
  }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
  }
}
