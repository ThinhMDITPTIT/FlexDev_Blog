import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent {
  public commentForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router) {
    this.commentForm = _fb.group({
      content: ['', Validators.required],
    });
  }

  public goToEditArticleDetails() {
    this.router.navigate(['editor/demoId']);
  }
}
