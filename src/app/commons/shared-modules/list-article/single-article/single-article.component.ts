import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent implements OnInit, OnDestroy {
  @Input()
  public articleObj: any;

  public articleObjSubscription: Subscription = new Subscription();

  constructor(
    private readonly articlesStateService: ArticlesStateService,
    private readonly tagsStateService: TagsStateService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.articleObjSubscription =
      this.articlesStateService.currentArticleBySlugEmit.subscribe(
        (data: any) => {
          if (this.articleObj?.slug === data.article.slug) {
            this.articleObj = data.article;
          }
        }
      );
  }

  ngOnDestroy() {
    this.articleObjSubscription.unsubscribe();
  }

  public favoriteArticle() {
    this.articlesStateService.favoriteArticleBySlug(this.articleObj?.slug);
  }
  public unFavoriteArticle() {
    this.articlesStateService.unFavoriteArticleBySlug(this.articleObj?.slug);
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }

  public seeArticleDetails(slug: string) {
    this.router.navigate(['article', slug]);
  }

  public getArticlesByHastag(tag: string) {
    this.tagsStateService.getArticlesDataByTag(tag);
  }
}
