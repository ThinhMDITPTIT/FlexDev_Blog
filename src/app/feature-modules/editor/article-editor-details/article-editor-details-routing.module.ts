import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorArticleGuard } from 'src/app/core/guards/editor-article.guard';
import { ArticleEditorDetailsComponent } from './article-editor-details.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleEditorDetailsComponent,
    canDeactivate: [EditorArticleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleEditorDetailsRoutingModule {}
