import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeCustomPipe } from './time-custom.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
      TimeCustomPipe
   ],
  exports: [TimeCustomPipe],
})
export class CustomPipesModule {}
