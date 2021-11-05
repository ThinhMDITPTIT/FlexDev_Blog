import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  baseUrl: string = 'http://localhost:3000/api/articles';

  constructor(private readonly http: HttpClient) { }

  getAllCommentsFromArticle(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${slug}/comments`);
  }

  createComment(slug: string, body:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${slug}`, body);
  }

  deleteComment(slug: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${slug}/${id}`);
  }
}
