import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input-custom.component.html',
  styleUrls: ['./tag-input-custom.component.scss']
})
export class TagInputCustomComponent implements OnInit {
  @Input()
  public control: FormControl;

  constructor() {
    this.control = new FormControl();
  }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
  }


}
