import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationEnd,
  ActivatedRoute,
  ParamMap,
  Params,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { switchMap } from 'rxjs/operators';
import { UserApiService } from 'src/app/core/services/apis/user-api.service';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public currentUser: string;

  public authorProfileObj: any;
  public currentFeature: any;
  public currentArticlesObj: any;
  public currentArticles: any;
  private articles_Subscription: Subscription = new Subscription();
  private profile_Subscription: Subscription = new Subscription();

  public pageSize: number;
  public maxSize: number;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly articlesStateService: ArticlesStateService,
    private readonly authStateService: AuthStateService,
    private readonly userApiService: UserApiService,
    private readonly userStateService: UserStateService,
    private readonly localStorage: LocalStorageService
  ) {
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;

    this.currentUser =
      this.authStateService.currentUserProfile?.user?.username || '';

    this.profile_Subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute.params
          .pipe(
            switchMap((param: Params) => {
              let username = param.username;
              return this.userApiService.getProfile(username);
            })
          )
          .subscribe((res) => {
            this.authorProfileObj = res.profile;

            if (event.urlAfterRedirects.includes('favorites')) {
              this.currentFeature = 'favorites_articles';
              this.getDataByFeature(this.currentFeature);
            } else {
              this.currentFeature = 'my_articles';
              this.getDataByFeature(this.currentFeature);
            }
          });
      }
    });
  }

  ngOnInit() {
    if(this.localStorage.retrieve('token')){
      this.currentUser = this.authStateService.currentUserProfile?.user?.username;
    }else {
      this.currentUser = '';
    }
  }

  ngOnDestroy() {
    this.articles_Subscription.unsubscribe();
    this.profile_Subscription.unsubscribe();
  }

  public getDataByFeature(featureName: string) {
    if (featureName === 'favorites_articles') {
      this.articlesStateService
        .getFavoriteArticlesByUsername(this.authorProfileObj.username)
        .subscribe(
          (data: any) => {
            this.currentArticlesObj = data;
            this.initDataForFeature();
          },
          () => {}
        );
    } else {
      this.articlesStateService
        .getArticlesByAuthor(this.authorProfileObj.username)
        .subscribe(
          (data: any) => {
            this.currentArticlesObj = data;
            this.initDataForFeature();
          },
          () => {}
        );
    }
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

  public followUser(username: any) {
    this.userStateService.followUserByUsername(username).subscribe(
      (data: any) => {
        this.authorProfileObj = data.profile;
      },
      () => {}
    );
  }
  public unFollowUser(username: any) {
    this.userStateService.unFollowUserByUsername(username).subscribe(
      (data: any) => {
        this.authorProfileObj = data.profile;
      },
      () => {}
    );
  }
}
