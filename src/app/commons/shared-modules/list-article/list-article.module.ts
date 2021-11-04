import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article/list-article.component';
import { SingleArticleComponent } from './single-article/single-article.component';

@NgModule({
  declarations: [SingleArticleComponent, ListArticleComponent],
  imports: [CommonModule],
  exports: [ListArticleComponent],
})
export class ListArticleModule {}
