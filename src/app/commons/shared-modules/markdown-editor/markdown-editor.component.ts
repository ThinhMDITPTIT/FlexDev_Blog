import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import '@github/markdown-toolbar-element';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements OnInit, OnChanges {
  public controlId: string;
  @Input()
  public control: FormControl;

  @Input()
  public minRows: number;

  @Input()
  public showPreview: boolean;

  @Input()
  public resetSize: number;

  @ViewChild('cfcAutosize')
  public contentFCAutosize: CdkTextareaAutosize | undefined;

  @HostBinding('class.focus') isFocus: boolean;

  constructor() {
    this.control = new FormControl();
    this.controlId = '';
    this.isFocus = false;
    this.showPreview = false;
    this.minRows = 6;
    this.resetSize = Math.random();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.resetSize){
      this.resetTextAreaSize();
    }
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

  resetTextAreaSize() {
    if (this.contentFCAutosize) {
      this.contentFCAutosize.reset();
    }
  }
}
