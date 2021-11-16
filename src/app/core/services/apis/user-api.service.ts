import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/app/commons/enums/base-url.enum';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  baseUrl: string = BASEURL.LOCAL + 'profiles';

  constructor(private readonly http: HttpClient) {}

  getProfile(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  followUser(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${username}/follow`, username);
  }

  unfollowUser(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${username}/follow`);
  }
}
