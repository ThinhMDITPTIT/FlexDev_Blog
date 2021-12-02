import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/app/commons/enums/base-url.enum';

@Injectable({
  providedIn: 'root',
})
export class CommentsApiService {
  baseUrl: string = BASEURL.MAIN;

  constructor(private readonly http: HttpClient) {}

  // auth optional
  public getCommentsFromAnArticle(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/articles/${slug}/comments`);
  }

  // need auth
  public addCommentToAnArticle(slug: string, comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/articles/${slug}/comments`, comment);
  }

  // need auth
  public deleteCommentToAnArticle(slug: string, commentId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/articles/${slug}/comments/${commentId}`);
  }
}
