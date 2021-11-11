import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputCustomComponent } from './tag-input-custom.component';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TagInputModule,
    ReactiveFormsModule
  ],
  declarations: [TagInputCustomComponent],
  exports: [TagInputCustomComponent]
})
export class TagInputCustomModule { }
