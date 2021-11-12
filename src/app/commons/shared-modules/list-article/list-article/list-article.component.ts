import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit, OnChanges, OnDestroy {
  public showArticlesByTag: boolean = false;
  public currentHastag: string;
  public currentPageIdx: number;

  @Input()
  public featuresArr: string[];

  public currentFeature: any;
  public currentArticlesObj: any;
  public currentArticles: any;
  public tagArticles_Subscription: Subscription = new Subscription();
  public feedArticlesChange_Subscription: Subscription = new Subscription();

  public pageSize: number;
  public maxSize: number;

  constructor(
    private readonly articlesStateService: ArticlesStateService,
    private readonly tagsStateService: TagsStateService,
    private readonly userStateService: UserStateService
  ) {
    this.currentHastag = 'Demo';
    this.currentPageIdx = 1;

    this.featuresArr = [];
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;
    this.currentFeature = this.featuresArr[0];
  }

  ngOnChanges() {
    this.currentFeature = this.featuresArr[0];
    this.currentPageIdx = 1;
    if (this.tagsStateService.currentTag === '') {
      this.getDataByFeature(this.currentFeature);
    }
  }

  ngOnInit() {
    this.tagArticles_Subscription =
      this.tagsStateService.articlesByTag$.subscribe((data: any) => {
        if (this.tagsStateService.currentTag === '') {
          this.showArticlesByTag = false;
        } else {
          this.showArticlesByTag = true;
          this.currentFeature = 'Tag Feed';
          this.currentHastag = this.tagsStateService.currentTag;
          this.currentArticlesObj = data;
          this.initDataForFeature();
        }
      });

    this.feedArticlesChange_Subscription =
      this.userStateService.userProfile$.subscribe((data: any) => {
        if (data) {
          this.articlesStateService.getFeedArticle().subscribe((data: any) => {
            this.currentArticlesObj = data;
            this.initDataForFeature();
            this.userStateService.userProfile$.next(undefined);
          });
        }
      });
  }

  ngOnDestroy() {
    this.tagArticles_Subscription.unsubscribe();
    this.feedArticlesChange_Subscription.unsubscribe();
  }

  public getDataByFeature(featureName: string) {
    this.showArticlesByTag = false;
    this.tagsStateService.clearCurrentTag();

    if (featureName === this.featuresArr[0]) {
      this.currentFeature = this.featuresArr[0];
      this.articlesStateService.getFeedArticle().subscribe((data: any) => {
        this.currentArticlesObj = data;
        this.initDataForFeature();
      });
    } else {
      this.currentFeature = this.featuresArr[1];
      this.articlesStateService.getGlobalArticle().subscribe((data: any) => {
        this.currentArticlesObj = data;
        this.initDataForFeature();
      });
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
