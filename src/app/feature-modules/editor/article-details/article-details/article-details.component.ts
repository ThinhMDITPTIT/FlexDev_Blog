import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { CommentsStateService } from 'src/app/core/services/states/comments-state.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  public currentUser: string;
  public currentUserImage: any;

  public authorProfile: any;

  public currentPageIdx: number;
  public pageSize: number;
  public maxSize: number;
  public notChangeIdxPag: number;

  public commentForm: FormGroup;
  public minRowsMarkDown: number = 3;
  public isReset: number = Math.random();
  public showPreviewMarkdown: boolean = false;

  private commentIdToDelete: any;

  public currentSlug: any;
  public articleObj: any;
  public articleCommentsObj: any[];
  public articleComments: any;
  private articleSubscription: Subscription = new Subscription();
  private commentsSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();

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
    private readonly toastr: ToastrService,
    private readonly localStorage: LocalStorageService
  ) {
    this.currentPageIdx = 1;
    this.pageSize = this.articlesStateService.pageSize;
    this.maxSize = this.articlesStateService.maxSize;
    this.notChangeIdxPag = Math.random();

    this.currentUser =
      this.authStateService.currentUserProfile?.user?.username || '';

    this.commentForm = this._fb.group({
      content: ['', Validators.required],
    });
    this.routeSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentSlug = this.activatedRoute.snapshot.params.id;
        this.getCurrentArticleBySlug(this.currentSlug);
        this.getCommentsFromArticle(this.currentSlug);
      }
    });
    this.articleCommentsObj = [];
  }

  ngOnInit() {
    if (this.localStorage.retrieve('token')) {
      this.authStateService.getCurrentUserInfo().subscribe(
        (data: any) => {
          if (data?.user?.token) {
            this.currentUser = data.user.username;
            this.currentUserImage = data.user.image;
          }
        },
        () => {
          this.currentUser = this.authStateService.currentUserProfile;
        }
      );
    }else {
      this.currentUser = this.authStateService.currentUserProfile;
    }

    this.commentsSubscription =
      this.commentsStateService.currentCommentsOfArticle$.subscribe(
        (data: any) => {
          if (data.comments) {
            this.articleCommentsObj = data.comments.sort((a: any, b: any) => {
              let aDate = new Date(a.createdAt).getTime();
              let bDate = new Date(b.createdAt).getTime();
              return bDate - aDate;
            });
            this.initCommentsForArticle();
          }
        }
      );
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
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
        this.articleCommentsObj = data.comments.sort((a: any, b: any) => {
          let aDate = new Date(a.createdAt).getTime();
          let bDate = new Date(b.createdAt).getTime();
          return bDate - aDate;
        });
        this.initCommentsForArticle();
      },
      () => {}
    );
  }

  public followUser(username: any) {
    this.userStateService.followUserByUsername(username).subscribe(
      (data: any) => {
        this.authorProfile = data.profile;
      },
      () => {}
    );
  }
  public unFollowUser(username: any) {
    this.userStateService.unFollowUserByUsername(username).subscribe(
      (data: any) => {
        this.authorProfile = data.profile;
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
    this.isReset = Math.random();
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
      if (this.commentForm.get('content')?.hasError('required')) {
        this.toastr.warning('warning', 'You must enter the comment content!');
      }
    }
  }

  public initCommentsForArticle() {
    this.notChangeIdxPag = Math.random();
    let start =
      this.currentPageIdx === 1 ? 0 : (this.currentPageIdx - 1) * this.pageSize;
    let end =
      this.currentPageIdx === 1
        ? this.pageSize
        : this.currentPageIdx * this.pageSize;

    if (!this.articleCommentsObj[start]) {
      if (this.currentPageIdx > 1) this.currentPageIdx--;
      start =
        this.currentPageIdx === 1
          ? 0
          : (this.currentPageIdx - 1) * this.pageSize;
      end =
        this.currentPageIdx === 1
          ? this.pageSize
          : this.currentPageIdx * this.pageSize;
    }

    this.articleComments = this.articleCommentsObj?.slice(start, end);
  }

  public showDataByCurrentPage(page: number) {
    let start = page === 1 ? 0 : (page - 1) * this.pageSize;
    let end = page === 1 ? this.pageSize : page * this.pageSize;
    this.articleComments = this.articleCommentsObj?.slice(start, end);
  }

  public getCurrentPageIndex(event: any) {
    this.notChangeIdxPag = Math.random();
    this.currentPageIdx = Number(event);
    this.showDataByCurrentPage(Number(event));
  }

  public getCommentIdToDelete(id: any) {
    this.commentIdToDelete = id;
  }

  public confirmDeleteComment() {
    if (this.commentIdToDelete) {
      this.loadingSpinnerService.showSpinner();
      this.commentsStateService
        .deleteCommentOfArticle(this.currentSlug, this.commentIdToDelete)
        .subscribe(() => {
          this.commentsStateService
            .getCommentsFromArticle(this.currentSlug)
            .subscribe((data: any) => {
              this.commentsStateService.currentCommentsOfArticle$.next(data);
              setTimeout(() => {
                this.loadingSpinnerService.hideSpinner();
                this.toastr.success('Success!', 'Delete Comment completed!');
              }, 250);
            });
        });
    }
  }
}
