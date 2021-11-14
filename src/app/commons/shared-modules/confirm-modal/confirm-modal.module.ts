import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent]
})
export class ConfirmModalModule { }
