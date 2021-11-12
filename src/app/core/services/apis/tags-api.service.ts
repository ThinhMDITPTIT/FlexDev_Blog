import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  // baseUrl: string = 'https://api.realworld.io/api';
  baseUrl: string = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  // no need auth
  public getTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tags`);
  }
}
