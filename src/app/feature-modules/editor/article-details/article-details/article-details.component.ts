import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public currentUserImage: any;

  public authorProfile: any;

  public commentForm: FormGroup;
  public showPreviewMarkdown: boolean = false;
  public commentContentError: boolean;
  public currentSlug: any;
  public articleObj: any;
  public articleComments: any[];
  private articleSubscription: Subscription = new Subscription();
  private commentsSubscription: Subscription = new Subscription();

  private isDeleted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly userStateService: UserStateService,
    private readonly commentsStateService: CommentsStateService,
    private readonly authStateService: AuthStateService,
    private readonly articlesStateService: ArticlesStateService,
    private readonly tagsStateService: TagsStateService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly toastr: ToastrService
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
        if(!this.isDeleted){
          this.getCurrentArticleBySlug(this.currentSlug);
          this.getCommentsFromArticle(this.currentSlug);
        }
      }
    });
    this.articleComments = [];
  }

  ngOnInit() {
    this.authStateService.getCurrentUserInfo().subscribe(
      (data: any) => {
        if (data?.user?.token) {
          this.currentUser =
            this.authStateService.currentUserProfile.user.username;
          this.currentUserImage =
            this.authStateService.currentUserProfile.user.image;
        }
      },
      () => {
        this.currentUser = this.authStateService.currentUserProfile;
      }
    );

    this.commentsSubscription =
      this.commentsStateService.currentCommentsOfArticle$.subscribe(
        (data: any) => {
          this.articleComments = data.comments;
        }
      );
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }

  public get contentRawControl() {
    return this.commentForm.controls.content as FormControl;
  }

  public getCurrentArticleBySlug(slug: any) {
    this.articlesStateService.getCurrentArticleBySlug(slug).subscribe(
      (data: any) => {
        this.articleObj = data.article;
        this.userStateService
          .getUserProfileByUsername(this.articleObj?.author?.username)
          .subscribe(
            (data: any) => {
              this.authorProfile = data.profile;
            },
            () => {}
          );
      },
      () => {}
    );
  }

  public getCommentsFromArticle(slug: any) {
    this.commentsStateService.getCommentsFromArticle(slug).subscribe(
      (data: any) => {
        this.articleComments = data.comments;
      },
      () => {}
    );
  }

  public followUser(username: any) {
    this.userStateService.followUserByUsername(username).subscribe(
      (data: any) => {
        this.authorProfile = data.profile;
        // this.userStateService.userProfile$.next(data);
      },
      () => {}
    );
  }
  public unFollowUser(username: any) {
    this.userStateService.unFollowUserByUsername(username).subscribe(
      (data: any) => {
        this.authorProfile = data.profile;
        // this.userStateService.userProfile$.next(data);
      },
      () => {}
    );
  }

  public favoriteArticle() {
    this.articlesStateService.favoriteArticleBySlug(this.currentSlug).subscribe(
      (data: any) => {
        this.articleObj = data.article;
      },
      () => {}
    );
  }
  public unFavoriteArticle() {
    this.articlesStateService
      .unFavoriteArticleBySlug(this.currentSlug)
      .subscribe(
        (data: any) => {
          this.articleObj = data.article;
        },
        () => {}
      );
  }

  public goToEditArticleDetails() {
    this.router.navigate(['editor', this.currentSlug]);
  }

  public deleteArticle() {
    this.loadingSpinnerService.showSpinner();
    this.articlesStateService.deleteArticleBySlug(this.currentSlug).subscribe(
      () => {
        this.isDeleted = true;
        setTimeout(() => {
          this.loadingSpinnerService.hideSpinner();
          this.toastr.success('Success!', 'Delete Article completed!');
          this.redirectHome();
        }, 1500);
      },
      () => {}
    );
  }

  public redirectHome() {
    this.router.navigate(['']);
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }

  public getArticlesByHastag(tag: string) {
    this.tagsStateService.getArticlesDataByTag(tag).subscribe(
      (data: any) => {
        this.tagsStateService.articlesByTag$.next(data);
        this.redirectHome();
      },
      () => {}
    );
  }

  public submitForm(formValue: FormGroup) {
    if (formValue.status === 'VALID') {
      let commentObj = {
        comment: {
          body: formValue.value.content,
        },
      };
      this.commentsStateService
        .addCommentToArticle(this.currentSlug, commentObj)
        .subscribe(
          () => {
            this.getCommentsFromArticle(this.currentSlug);
          },
          () => {}
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
