import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { CommentsStateService } from 'src/app/core/services/states/comments-state.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  public currentUser: string;

  public authorProfile: any;

  public commentForm: FormGroup;
  public commentContentError: boolean;
  public currentSlug: any;
  public articleObj: any;
  public articleComments: any[];
  private articleSubscription: Subscription = new Subscription();
  private commentsSubscription: Subscription = new Subscription();
  private userProfileSubscription: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly userStateService: UserStateService,
    private readonly commentsStateService: CommentsStateService,
    private readonly authStateService: AuthStateService,
    private readonly articlesStateService: ArticlesStateService,
    private readonly tagsStateService: TagsStateService,
    private readonly loadingSpinnerService: LoadingSpinnerService
  ) {
    this.currentUser =
      this.authStateService.currentUserProfile?.user?.username || '';

    this.commentForm = this._fb.group({
      content: ['', Validators.required],
    });
    this.commentContentError = false;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentSlug = this.activatedRoute.snapshot.params.id;
        this.articlesStateService.getCurrentArticleBySlug(this.currentSlug);
        this.commentsStateService.getCommentsFromArticle(this.currentSlug);
      }
    });
    this.articleComments = [];
  }

  ngOnInit() {
    this.articleSubscription =
      this.articlesStateService.currentArticleBySlugEmit.subscribe(
        (data: any) => {
          this.articleObj = data.article;
          this.userStateService.getUserProfileByUsername(
            this.articleObj?.author?.username
          );
        }
      );

    this.commentsSubscription =
      this.commentsStateService.currentCommentsOfArticleEmit.subscribe(
        (data: any) => {
          this.articleComments = data.comments;
        }
      );

    this.userProfileSubscription =
      this.userStateService.userProfileEmit.subscribe((data: any) => {
        this.authorProfile = data.profile;
      });
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }

  public followUser(username: any) {
    this.userStateService.followUserByUsername(username);
  }
  public unFollowUser(username: any) {
    this.userStateService.unFollowUserByUsername(username);
  }

  public favoriteArticle() {
    this.articlesStateService.favoriteArticleBySlug(this.currentSlug);
  }
  public unFavoriteArticle() {
    this.articlesStateService.unFavoriteArticleBySlug(this.currentSlug);
  }

  public goToEditArticleDetails() {
    this.router.navigate(['editor', this.currentSlug]);
  }

  public deleteArticle() {
    this.loadingSpinnerService.showSpinner();
    this.articlesStateService.deleteArticleBySlug(this.currentSlug);
    this.redirectHome();
  }

  public redirectHome() {
    this.router.navigate(['']);
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }

  public getArticlesByHastag(tag: string) {
    this.redirectHome();
    this.tagsStateService.getArticlesDataByTag(tag);
  }

  public submitForm(formValue: FormGroup) {
    if (formValue.status === 'VALID') {
      let commentObj = {
        comment: {
          body: formValue.value.content,
        },
      };
      this.commentsStateService.addCommentToArticle(
        this.currentSlug,
        commentObj
      );
      this.commentForm.get('content')?.setValue('');
    } else {
      this.commentContentError = true;
      let formControlArr = formValue.controls;
      Object.keys(formControlArr).forEach((control) => {
        if (formControlArr[control]['status'] === 'INVALID') {
          formControlArr[control].markAsTouched();
        }
      });
    }
  }
}
