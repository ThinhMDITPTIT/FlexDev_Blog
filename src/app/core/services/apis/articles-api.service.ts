import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesApiService {
  // baseUrl: string = 'https://api.realworld.io/api/articles';
  baseUrl: string = 'http://localhost:3000/api/articles';

  constructor(private readonly http: HttpClient) {}

  // need auth
  getFeed(): Observable<any> {
    return this.http.get(`${this.baseUrl}/feed?limit=200`);
  }

  // no need auth
  getAllArticle(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?limit=200`);
  }

  // no need auth
  public getArticleBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${slug}`);
  }

  // no need auth
  getArticleByAuthor(author: string): Observable<any> {
    const params = new HttpParams().set('author', author);
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // no need auth
  getArticleFavoriteByUsername(username: string): Observable<any> {
    const params = new HttpParams().set('favorited', username);
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // no need auth
  getArticleByTag(tag: string): Observable<any> {
    const params = new HttpParams()
      .set('tag', tag)
      .set('limit', 100);
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // need auth
  createArticle(article: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, article);
  }

  updateAticle(slug: string, article: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${slug}`, article);
  }

  deleteArticle(slug: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${slug}`);
  }

  favoriteArticle(slug: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${slug}/favorite`, slug);
  }

  unfavoriteArticle(slug: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${slug}/favorite`);
  }

  getArticleByPage(offetNumber: number, limitNumber: number): Observable<any> {
    const params = new HttpParams()
      .set('offset', offetNumber)
      .set('limit', limitNumber)
    return this.http.get(`${this.baseUrl}`, { params })
  }

  getFeedByPage(offetNumber: number, limitNumber: number): Observable<any> {
    const params = new HttpParams()
      .set('offset', offetNumber)
      .set('limit', limitNumber)
    return this.http.get(`${this.baseUrl}/feed`, { params });
  }
}
