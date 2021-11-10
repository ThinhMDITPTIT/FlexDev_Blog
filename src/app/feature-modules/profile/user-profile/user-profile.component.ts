import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationEnd,
  ActivatedRoute,
  ParamMap,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';
import { switchMap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';
import { UserApiService } from 'src/app/core/services/apis/user-api.service';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnDestroy {
  public currentUser: string;
  // defaultBio: string = 'Description...';

  public authorProfileObj: any;
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
    private readonly activatedRoute: ActivatedRoute,
    private readonly articlesApiService: ArticlesApiService,
    private readonly articlesStateService: ArticlesStateService,
    private readonly authStateService: AuthStateService,
    private readonly userApiService: UserApiService
  ) {
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;
    this.myArticles_Subscription = new Subscription();
    this.favoritedArticles_Subscription = new Subscription();

    this.currentUser =
      authStateService.currentUserProfile?.user?.username || '';
    console.log(this.currentUser);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute.paramMap
          .pipe(
            switchMap((param: ParamMap) => {
              let username = param.get('username') || '';
              return this.userApiService.getProfile(username);
            })
          )
          .subscribe((res) => {
            this.authorProfileObj = res.profile;

            if (event.urlAfterRedirects.includes('favorites')) {
              this.currentFeature = 'favorites_articles';
              this.favoritedArticles_Subscription = this.articlesApiService
                .getArticleFavoriteByUsername(this.authorProfileObj.username)
                .subscribe((data: any) => {
                  this.favoritedArticles = data;
                  this.currentArticlesObj = this.favoritedArticles;
                  this.initDataForFeature();
                });
            } else {
              this.currentFeature = 'my_articles';
              this.myArticles_Subscription = this.articlesApiService
                .getArticleByAuthor(this.authorProfileObj.username)
                .subscribe((data: any) => {
                  this.myArticles = data;
                  this.currentArticlesObj = this.myArticles;
                  this.initDataForFeature();
                });
            }
          });
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

  public followUser() {
    console.log('Follow User');
  }
  public unFollowUser() {
    console.log('Unfollow User');
  }
}
