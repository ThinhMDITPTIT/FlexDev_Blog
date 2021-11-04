import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ListArticleModule } from 'src/app/commons/shared-modules/list-article/list-article.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, HomeRoutingModule, ListArticleModule],
  exports: [HomepageComponent],
})
export class HomeModule {}
