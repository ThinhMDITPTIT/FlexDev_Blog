import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticlesApiService } from '../apis/articles-api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsStateService {
  public currentTag: string;
  public articlesByTag: any[];
  public articlesByTag$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentTagEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly articlesApiService: ArticlesApiService) {
    this.currentTag = '';
    this.articlesByTag = [];
  }

  public clearCurrentTag(){
    this.currentTag = '';
    this.currentTagEmit.emit();
  }

  public getArticlesDataByTag(tag: string) {
    this.currentTag = tag;
    return this.articlesApiService.getArticleByTag(tag).pipe(map((data: any) => {
      this.articlesByTag = data;
      return data;
    }));
  }
}
