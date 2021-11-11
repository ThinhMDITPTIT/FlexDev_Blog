import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit, OnChanges, OnDestroy {
  public showArticlesByTag: boolean;
  public currentHastag: string;
  public currentPageIdx: number;

  @Input()
  public featuresArr: string[];

  public currentFeature: any;
  public feedArticles: any;
  public globalArticles: any;
  public currentArticlesObj: any;
  public currentArticles: any;
  public feedArticles_Subscription: Subscription;
  public tagArticles_Subscription: Subscription;
  public globalArticles_Subscription: Subscription;

  public pageSize: number;
  public maxSize: number;

  constructor(
    private readonly articlesStateService: ArticlesStateService,
    private readonly tagsStateService: TagsStateService
  ) {
    this.showArticlesByTag = false;
    this.currentHastag = 'Demo';
    this.currentPageIdx = 1;

    this.featuresArr = [];
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;
    this.currentFeature = this.featuresArr[0];

    this.tagArticles_Subscription = new Subscription();
    this.feedArticles_Subscription = new Subscription();
    this.globalArticles_Subscription = new Subscription();

    this.feedArticles = articlesStateService.feedArticles;
    this.globalArticles = articlesStateService.globalArticles;
    this.currentArticlesObj = this.feedArticles;
    this.initDataForFeature();
  }

  ngOnChanges() {
    this.currentFeature = this.featuresArr[0];
    this.currentPageIdx = 1;
    this.tagsStateService.clearCurrentTag();
  }

  ngOnInit() {
    this.tagsStateService.clearCurrentTag();
    this.feedArticles_Subscription =
      this.articlesStateService.feedArticlesEmit.subscribe((data: any) => {
        this.feedArticles = data;
        this.currentArticlesObj = this.feedArticles;
        this.initDataForFeature();
      });
    this.globalArticles_Subscription =
      this.articlesStateService.globalArticlesEmit.subscribe((data: any) => {
        this.globalArticles = data;
      });
    this.tagArticles_Subscription =
      this.tagsStateService.articlesByTagEmit.subscribe((data: any) => {
        this.showArticlesByTag = true;
        this.currentFeature = 'Tag Feed';
        this.currentHastag = this.tagsStateService.currentTag;
        this.currentArticlesObj = data;
        this.initDataForFeature();
      });
  }

  ngOnDestroy() {
    this.feedArticles_Subscription.unsubscribe();
    this.globalArticles_Subscription.unsubscribe();
    this.tagArticles_Subscription.unsubscribe();
  }

  public getDataByFeature(featureName: string) {
    this.showArticlesByTag = false;
    this.tagsStateService.clearCurrentTag();
    if (featureName === this.featuresArr[0]) {
      this.currentFeature = this.featuresArr[0];
      this.currentArticlesObj = this.feedArticles;
      this.initDataForFeature();
    } else {
      this.currentFeature = this.featuresArr[1];
      this.currentArticlesObj = this.globalArticles;
      this.initDataForFeature();
    }
  }

  public initDataForFeature() {
    this.currentPageIdx = 1;
    this.currentArticles = this.currentArticlesObj?.articles?.slice(
      0,
      this.pageSize
    );
  }

  public showDataByCurrentPage(page: number) {
    let start = page === 1 ? 0 : (page - 1) * this.pageSize;
    let end = page === 1 ? this.pageSize : page * this.pageSize;
    this.currentArticles = this.currentArticlesObj?.articles?.slice(start, end);
  }

  public getCurrentPageIndex(event: any) {
    this.showDataByCurrentPage(Number(event));
  }
}
