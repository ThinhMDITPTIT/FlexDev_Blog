import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/app/commons/enums/base-url.enum';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  baseUrl: string = BASEURL.MAIN;

  constructor(private readonly http: HttpClient) {}

  // no need auth
  public getTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tags`);
  }
}
