import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, HomeRoutingModule],
  exports: [HomepageComponent],
})
export class HomeModule {}
