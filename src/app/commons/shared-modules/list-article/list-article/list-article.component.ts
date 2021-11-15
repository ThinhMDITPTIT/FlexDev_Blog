import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit, OnChanges, OnDestroy {
  private feed = 'Your Feed';
  private global = 'Global Feed';
  private tag = 'Tag Feed';

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
  public currentFeature_Subscription: Subscription = new Subscription();

  public pageSize: number;
  public maxSize: number;

  constructor(
    private readonly articlesStateService: ArticlesStateService,
    private readonly tagsStateService: TagsStateService,
    private readonly localStorage: LocalStorageService
  ) {
    this.currentHastag = 'Demo';
    this.currentPageIdx = 1;

    this.featuresArr = [];
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;
  }

  ngOnChanges() {
    if (this.tagsStateService.currentTag === '') {
      if (this.featuresArr.length !== 0) {
        if (this.localStorage.retrieve('token')) {
          this.currentFeature_Subscription = this.articlesStateService
            .getFeedArticle()
            .subscribe((res) => {
              if (res.articlesCount === 0) {
                this.currentFeature = this.featuresArr[1];
                this.getDataByFeature(this.currentFeature);
              } else {
                let homeFeatureIdx =
                  this.localStorage.retrieve('homeFeatureIdx');
                if (homeFeatureIdx) {
                  this.currentFeature = homeFeatureIdx.feature;
                  this.getDataByFeature(this.currentFeature);
                } else {
                  this.currentFeature = this.featuresArr[0];
                  this.getDataByFeature(this.currentFeature);
                }
              }
            });
        } else {
          this.currentFeature = this.featuresArr[0];
          this.getDataByFeature(this.currentFeature);
        }
      }
    }
  }

  ngOnInit() {
    this.tagArticles_Subscription =
      this.tagsStateService.articlesByTag$.subscribe(() => {
        if (this.tagsStateService.currentTag === '') {
          this.showArticlesByTag = false;
        } else {
          this.tagsStateService.getArticlesDataByTag(this.tagsStateService.currentTag).subscribe((res) => {
            this.currentFeature = this.tag;
            this.showArticlesByTag = true;
            this.currentHastag = this.tagsStateService.currentTag;
            this.currentArticlesObj = res;
            this.initDataForFeature();
          })
        }
      });
  }

  ngOnDestroy() {
    this.tagArticles_Subscription.unsubscribe();
    this.currentFeature_Subscription.unsubscribe();
  }

  public getDataByFeature(featureName: string) {
    this.showArticlesByTag = false;
    this.tagsStateService.clearCurrentTag();

    if (featureName === this.feed) {
      this.currentFeature = this.feed;
      this.articlesStateService.getFeedArticle().subscribe(
        (data: any) => {
          this.currentArticlesObj = data;
          this.initDataForFeature();
        },
        () => {}
      );
    } else {
      this.currentFeature = this.global;
      this.articlesStateService.getGlobalArticle().subscribe(
        (data: any) => {
          this.currentArticlesObj = data;
          this.initDataForFeature();
        },
        () => {}
      );
    }
  }

  public initDataForFeature() {
    let homeFeatureIdx = this.localStorage.retrieve('homeFeatureIdx');
    if (homeFeatureIdx && homeFeatureIdx.feature === this.currentFeature) {
      this.currentPageIdx = homeFeatureIdx.pageIdx;
    } else {
      this.currentPageIdx = 1;
    }
    this.changePageStorage(this.currentPageIdx);
    let start =
      this.currentPageIdx === 1 ? 0 : (this.currentPageIdx - 1) * this.pageSize;
    let end =
      this.currentPageIdx === 1
        ? this.pageSize
        : this.currentPageIdx * this.pageSize;
    this.currentArticles = this.currentArticlesObj?.articles?.slice(start, end);
  }

  public showDataByCurrentPage(page: number) {
    let start = page === 1 ? 0 : (page - 1) * this.pageSize;
    let end = page === 1 ? this.pageSize : page * this.pageSize;
    this.currentArticles = this.currentArticlesObj?.articles?.slice(start, end);
  }

  public getCurrentPageIndex(event: any) {
    this.changePageStorage(event);
    this.showDataByCurrentPage(Number(event));
  }

  private changePageStorage(idx: any) {
    if (this.currentFeature === this.feed) {
      this.localStorage.store('homeFeatureIdx', {
        feature: this.feed,
        pageIdx: Number(idx),
      });
    }
    if (this.currentFeature === this.global) {
      this.localStorage.store('homeFeatureIdx', {
        feature: this.global,
        pageIdx: Number(idx),
      });
    }
    if (this.currentFeature === this.tag) {
      this.localStorage.store('homeFeatureIdx', {
        feature: this.tag,
        pageIdx: Number(idx),
      });
    }
  }
}
