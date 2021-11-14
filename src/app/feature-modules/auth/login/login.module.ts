import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
  CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgParticlesModule
  ],
})
export class LoginModule {}
