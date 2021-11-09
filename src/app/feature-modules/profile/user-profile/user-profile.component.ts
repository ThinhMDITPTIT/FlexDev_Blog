import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  defaultUser: string = 'ThinhMD';
  defaultBio: string = 'Description...';

  public currentFeature: any;
  public myArticles: any;
  public favoritedArticles: any;
  public currentArticlesObj: any;
  public currentArticles: any;
  public myArticles_Subscription: Subscription;
  public favoritedArticles_Subscription: Subscription;

  public pageSize: number;
  public maxSize: number;

  constructor(
    private readonly router: Router,
    private readonly articlesStateService: ArticlesStateService
  ) {
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;
    this.myArticles_Subscription = new Subscription();
    this.favoritedArticles_Subscription = new Subscription();

    this.myArticles = articlesStateService.myArticles;
    this.favoritedArticles = articlesStateService.favoritedArticles;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes('favorites')) {
          this.currentFeature = 'favorites_articles';
          this.currentArticlesObj = this.favoritedArticles;
          this.initDataForFeature();
        } else {
          this.currentFeature = 'my_articles';
          this.currentArticlesObj = this.myArticles;
          this.initDataForFeature();
        }
      }
    });
  }

  ngOnInit() {
    this.myArticles_Subscription =
      this.articlesStateService.myArticlesEmit.subscribe((data: any) => {
        this.myArticles = data;
        if (this.currentFeature == 'my_articles') {
          this.currentArticlesObj = this.myArticles;
          this.initDataForFeature();
        }
      });
    this.favoritedArticles_Subscription =
      this.articlesStateService.favoritedArticlesEmit.subscribe((data: any) => {
        this.favoritedArticles = data;
        if (this.currentFeature == 'favorites_articles') {
          this.currentArticlesObj = this.favoritedArticles;
          this.initDataForFeature();
        }
      });
  }

  ngOnDestroy() {
    this.myArticles_Subscription.unsubscribe();
    this.favoritedArticles_Subscription.unsubscribe();
  }

  public initDataForFeature() {
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

  toSetting() {
    this.router.navigate(['settings']);
  }
}
