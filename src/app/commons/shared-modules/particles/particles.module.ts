import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesComponent } from './particles.component';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  imports: [
    CommonModule,
    NgParticlesModule
  ],
  declarations: [ParticlesComponent],
  exports: [ParticlesComponent]
})
export class ParticlesModule { }
