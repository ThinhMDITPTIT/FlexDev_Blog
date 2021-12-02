import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserLogin } from './../../../commons/models/IUserLogin';
import { IUserRegister } from './../../../commons/models/IUserRegister';
import { IUserDetails } from './../../../commons/models/IUserDetails';
import { BASEURL } from 'src/app/commons/enums/base-url.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  baseUrl: string = BASEURL.MAIN;

  constructor(private readonly http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, user);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user`, user);
  }

}
