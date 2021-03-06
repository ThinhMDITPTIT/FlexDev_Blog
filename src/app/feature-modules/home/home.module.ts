import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ListArticleModule } from 'src/app/commons/shared-modules/list-article/list-article.module';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [HomepageComponent, TagComponent],
  imports: [CommonModule, HomeRoutingModule, ListArticleModule],
  exports: [HomepageComponent],
})
export class HomeModule {}
