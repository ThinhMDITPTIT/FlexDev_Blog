import { EventEmitter, Injectable } from '@angular/core';
import { ArticlesApiService } from '../apis/articles-api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsStateService {
  public currentTag: string;
  public articlesByTag: any[];
  public articlesByTagEmit: EventEmitter<any>;
  public currentTagEmit: EventEmitter<any>;

  constructor(private readonly articlesApiService: ArticlesApiService) {
    this.currentTag = '';
    this.articlesByTag = [];
    this.articlesByTagEmit = new EventEmitter<any>();
    this.currentTagEmit = new EventEmitter<any>();
  }

  public clearCurrentTag(){
    this.currentTag = '';
    this.currentTagEmit.emit();
  }

  public getArticlesDataByTag(tag: string) {
    this.currentTag = tag;
    this.articlesApiService.getArticleByTag(tag).subscribe((data: any) => {
      this.articlesByTag = data;
      this.articlesByTagEmit.emit(this.articlesByTag);
    });
  }
}
