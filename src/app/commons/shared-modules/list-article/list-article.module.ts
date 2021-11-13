import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article/list-article.component';
import { SingleArticleComponent } from './single-article/single-article.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { TimeCustomPipe } from '../../pipes/time-custom.pipe';
import { CustomPipesModule } from '../../pipes/custom-pipes.module';

@NgModule({
  declarations: [SingleArticleComponent, ListArticleComponent],
  imports: [CommonModule, NgbNavModule, RouterModule, PaginationModule, CustomPipesModule],
  exports: [ListArticleComponent, SingleArticleComponent],
})
export class ListArticleModule {}
