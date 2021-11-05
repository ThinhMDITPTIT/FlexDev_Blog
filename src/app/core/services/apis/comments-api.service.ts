import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsApiService {
  baseUrl: string = 'http://localhost:3000/api';

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
  public deleteCommentToAnArticle(
    slug: string,
    commentId: any
  ): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/articles/${slug}/comments/${commentId}`
    );
  }
}
