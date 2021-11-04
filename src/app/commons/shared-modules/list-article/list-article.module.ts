import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article/list-article.component';
import { SingleArticleComponent } from './single-article/single-article.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SingleArticleComponent, ListArticleComponent],
  imports: [CommonModule, NgbNavModule],
  exports: [ListArticleComponent, SingleArticleComponent],
})
export class ListArticleModule {}
