import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditorDetailsComponent } from './article-editor-details.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleEditorDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleEditorDetailsRoutingModule {}
