import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesApiService {

  baseUrl: string = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) { }

  getAllArticles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/articles`);
  }

  getArticleByAuthor(author: string): Observable<any> {
    const params = new HttpParams()
      .set('author', author)
    return this.http.get(`${this.baseUrl}/articles`, { params });
  }
}
