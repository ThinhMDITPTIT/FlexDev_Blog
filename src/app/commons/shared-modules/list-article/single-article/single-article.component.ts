import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent {
  @Input()
  public articleObj: any;

  constructor(
    private readonly articlesApiService: ArticlesApiService,
    private readonly router: Router
  ) {}

  public favoriteArticle() {
    this.articlesApiService
      .favoriteArticle(this.articleObj?.slug)
      .subscribe(() => {
        console.log('Favorite Article');
      });
  }
  public unFavoriteArticle() {
    this.articlesApiService
      .unfavoriteArticle(this.articleObj?.slug)
      .subscribe(() => {
        console.log('Unfavorite Article');
      });
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }

  public seeArticleDetails(slug: string) {
    this.router.navigate(['article', slug]);
  }
}
