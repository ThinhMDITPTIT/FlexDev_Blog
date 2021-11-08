import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesApiService } from 'src/app/core/services/apis/articles-api.service';

@Component({
  selector: 'app-article-editor-details',
  templateUrl: './article-editor-details.component.html',
  styleUrls: ['./article-editor-details.component.scss'],
})
export class ArticleEditorDetailsComponent implements OnInit, OnDestroy {
  public markdownForm: FormGroup;
  public articleObj: any;
  private currentSlug: any;
  private articleSubscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly articlesApiService: ArticlesApiService
  ) {
    this.markdownForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: [],
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.params.id) {
          this.currentSlug = this.activatedRoute.snapshot.params.id;
        }
      }
    });

    this.articleSubscription = new Subscription();
  }

  ngOnInit() {
    if (this.currentSlug) {
      this.articleSubscription = this.articlesApiService
        .getArticleBySlug(this.currentSlug)
        .subscribe((data: any) => {
          this.articleObj = data.article;
          this.markdownForm.get('title')?.setValue(this.articleObj.title);
          this.markdownForm
            .get('description')
            ?.setValue(this.articleObj.description);
          this.markdownForm.get('content')?.setValue(this.articleObj.body);
          this.markdownForm.get('tags')?.setValue(this.articleObj.tagList);
          console.log(data);
        });
    }
  }

  ngOnDestroy() {
    if (this.currentSlug) {
      this.articleSubscription.unsubscribe();
    }
  }

  public get contentRawControl() {
    return this.markdownForm.controls.content as FormControl;
  }

  public submitForm(formValue: FormGroup) {
    if (formValue.status === 'VALID') {
      console.log(formValue);
      let articleObj = {
        article: {
          title: formValue.value.title,
          description: formValue.value.description,
          body: formValue.value.content,
          tagList: [formValue.value.tags],
        },
      };
      if (!this.currentSlug) {
        this.articlesApiService
          .createArticle(articleObj)
          .subscribe((data: any) => {
            console.log('Create new done');
            this.redirectArticleDetails(data.article.slug);
          });
      } else {
        this.articlesApiService
          .updateAticle(this.currentSlug, articleObj)
          .subscribe((data: any) => {
            console.log('Update done');
            this.redirectArticleDetails(data.article.slug);
          });
      }
    } else {
      console.log('Have error');
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
}
