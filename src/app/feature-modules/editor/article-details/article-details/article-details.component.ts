import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';
import { CommentsApiService } from 'src/app/core/services/apis/comments-api.service';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  public currentUser: string;

  public commentForm: FormGroup;
  public commentContentError: boolean;
  private currentSlug: any;
  public articleObj: any;
  public articleComments: any[];
  private articleSubscription: Subscription;
  private commentsSubscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly articlesApiService: ArticlesApiService,
    private readonly commentsApiService: CommentsApiService,
    private readonly authStateService: AuthStateService,
    private readonly articlesStateService: ArticlesStateService
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
      }
    });
    this.articleComments = [];
    this.articleSubscription = new Subscription();
    this.commentsSubscription = new Subscription();
  }

  ngOnInit() {
    this.articleSubscription = this.articlesApiService
      .getArticleBySlug(this.currentSlug)
      .subscribe((data: any) => {
        this.articleObj = data.article;
      });
    this.commentsSubscription = this.commentsApiService
      .getCommentsFromAnArticle(this.currentSlug)
      .subscribe((data: any) => {
        this.articleComments = data.comments;
      });
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }

  public followUser() {
    console.log('Follow User');
  }
  public unFollowUser() {
    console.log('Unfollow User');
  }
  public favoriteArticle() {
    this.articlesApiService.favoriteArticle(this.currentSlug).subscribe(() => {
      console.log('Favorite Article');
    });
  }
  public unFavoriteArticle() {
    this.articlesApiService
      .unfavoriteArticle(this.currentSlug)
      .subscribe(() => {
        console.log('Unfavorite Article');
      });
  }

  public goToEditArticleDetails() {
    this.router.navigate(['editor', this.currentSlug]);
  }

  public deleteArticle() {
    console.log('delete');

    this.articlesApiService.deleteArticle(this.currentSlug).subscribe(() => {
      this.articlesStateService.dataChangedEmit.emit();
      this.redirectHome();
    });
  }

  public redirectHome() {
    this.router.navigate(['']);
  }

  public seeAuthorProfile(authorName: string) {
    this.router.navigate(['profile', authorName]);
  }

  public submitForm(formValue: FormGroup) {
    if (formValue.status === 'VALID') {
      let commentObj = {
        comment: {
          body: formValue.value.content,
        },
      };
      this.commentsApiService
        .addCommentToAnArticle(this.currentSlug, commentObj)
        .subscribe((data: any) => {
          this.articlesStateService.dataChangedEmit.emit();
        });
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
