import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticlesApiService } from '../apis/articles-api.service';
import { LoadingSpinnerService } from '../spinner/loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStateService {
  public articlesEmit: EventEmitter<any>;
  public currentArticleBySlugEmit: EventEmitter<any>;

  public pageSize: number = 5;
  public maxSize: number = 3;

  constructor(
    private readonly articlesApiService: ArticlesApiService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly toastr: ToastrService
  ) {
    this.articlesEmit = new EventEmitter<any>();
    this.currentArticleBySlugEmit = new EventEmitter<any>();
  }

  public getGlobalArticle() {
    this.articlesApiService.getAllArticle().subscribe((data: any) => {
      this.articlesEmit.emit(data);
    });
  }

  public getFeedArticle() {
    this.articlesApiService.getFeed().subscribe((data: any) => {
      this.articlesEmit.emit(data);
    });
  }

  public getCurrentArticleBySlug(slug: any) {
    this.articlesApiService.getArticleBySlug(slug).subscribe((data: any) => {
      this.currentArticleBySlugEmit.emit(data);
    });
  }

  public deleteArticleBySlug(slug: any) {
    this.articlesApiService.deleteArticle(slug).subscribe(() => {
      this.getFeedArticle();
      setTimeout(() => {
        this.loadingSpinnerService.hideSpinner();
        this.toastr.success('Success!', 'Delete Article completed!');
      }, 1500);
    });
  }

  public favoriteArticleBySlug(slug: any) {
    this.articlesApiService.favoriteArticle(slug).subscribe((data: any) => {
      this.currentArticleBySlugEmit.emit(data);
    });
  }

  public unFavoriteArticleBySlug(slug: any) {
    this.articlesApiService.unfavoriteArticle(slug).subscribe((data: any) => {
      this.currentArticleBySlugEmit.emit(data);
    });
  }
}
