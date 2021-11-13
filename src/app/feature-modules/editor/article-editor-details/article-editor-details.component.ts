import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Event,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { ArticlesStateService } from 'src/app/core/services/states/articles-state.service';
import { CheckDeactivate } from './../../../commons/models/check-deactive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from './../../../commons/shared-modules/notification-modal/notification-modal.component';

@Component({
  selector: 'app-article-editor-details',
  templateUrl: './article-editor-details.component.html',
  styleUrls: ['./article-editor-details.component.scss'],
})
export class ArticleEditorDetailsComponent implements OnDestroy, CheckDeactivate {
  public markdownForm: FormGroup;
  public articleObj: any;
  private currentSlug: any;
  private articleSubscription: Subscription = new Subscription();
  public showPreviewMarkdown: boolean;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly articlesApiService: ArticlesApiService,
    private readonly articlesStateService: ArticlesStateService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal
  ) {
    this.markdownForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
    });

    this.showPreviewMarkdown = false;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.params.id) {
          this.currentSlug = this.activatedRoute.snapshot.params.id;
          this.getArticleDataBySlug(this.currentSlug);
        }
      }
    });
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
  }

  public getArticleDataBySlug(slug: any) {
    this.articleSubscription = this.articlesStateService
      .getCurrentArticleBySlug(slug)
      .subscribe((data: any) => {
        this.articleObj = data.article;
        this.markdownForm.get('title')?.setValue(this.articleObj.title);
        this.markdownForm
          .get('description')
          ?.setValue(this.articleObj.description);
        this.markdownForm.get('content')?.setValue(this.articleObj.body);
        this.markdownForm.get('tags')?.setValue(
          this.articleObj.tagList.map((tag: string) => {
            return { display: tag, value: tag };
          })
        );
      });
  }

  public get contentRawControl() {
    return this.markdownForm.controls.content as FormControl;
  }

  public get tagsRawControl() {
    return this.markdownForm.controls.tags as FormControl;
  }

  public submitForm(formValue: FormGroup) {
    if (formValue.status === 'VALID') {
      let articleObj = {
        article: {
          title: formValue.value.title,
          description: formValue.value.description,
          body: formValue.value.content,
          tagList: formValue.value.tags.map((tag: any) => tag.value),
        },
      };
      if (!this.currentSlug) {
        this.loadingSpinnerService.showSpinner();
        this.articlesApiService
          .createArticle(articleObj)
          .subscribe((data: any) => {
            setTimeout(() => {
              this.redirectArticleDetails(data.article.slug);
              this.loadingSpinnerService.hideSpinner();
              this.toastr.success('Success!', 'Create new completed!');
            }, 1500);
          });
      } else {
        this.loadingSpinnerService.showSpinner();
        this.articlesApiService
          .updateAticle(this.currentSlug, articleObj)
          .subscribe((data: any) => {
            setTimeout(() => {
              this.redirectArticleDetails(data.article.slug);
              this.loadingSpinnerService.hideSpinner();
              this.toastr.success('Success!', 'Update completed!');
            }, 1500);
          });
      }
    } else {
      this.toastr.error('Error!', 'Something wrong!');
      let formControlArr = formValue.controls;
      Object.keys(formControlArr).forEach((control) => {
        if (formControlArr[control]['status'] === 'INVALID') {
          formControlArr[control].markAsTouched();
        }
      });
    }
  }

  public redirectArticleDetails(slug: any) {
    this.router.navigate(['article', slug]);
  }

  get isEmpty (){
    const formValue = this.markdownForm.value;
    console.log(formValue);
    for(let key in formValue){
      if(formValue[key].length !== 0){
        return false;
      }
    }
    return true;
  }

  openModal() {
    const modalRef = this.modal.open(NotificationModalComponent);
    return modalRef.closed;
  }

  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.isEmpty || this.openModal();
  }

}
