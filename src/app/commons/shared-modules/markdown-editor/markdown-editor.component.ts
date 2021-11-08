import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import '@github/markdown-toolbar-element';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements OnInit {
  public controlId: string;
  @Input()
  public control: FormControl;

  @HostBinding('class.focus') isFocus: boolean;

  constructor() {
    this.control = new FormControl();
    this.controlId = '';
    this.isFocus = false;
  }

  ngOnInit(): void {
    this.controlId = `MarkdownEditor-${Math.floor(100000 * Math.random())}`;
    this.control = this.control ?? new FormControl();
  }

  public focus() {
    this.isFocus = true;
  }

  public blur() {
    this.isFocus = false;
  }
}
