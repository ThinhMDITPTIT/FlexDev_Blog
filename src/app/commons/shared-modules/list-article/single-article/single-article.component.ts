import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent {
  @Input()
  public articleObj: any;

  constructor() {}
}
