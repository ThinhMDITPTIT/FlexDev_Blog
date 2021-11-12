import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IUserLogin } from './../../../commons/models/IUserLogin';
import { IUserRegister } from './../../../commons/models/IUserRegister';
import { IUserDetails } from './../../../commons/models/IUserDetails';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  baseUrl: string = 'http://localhost:3000/api';

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

  updateUser(user: IUserDetails): Observable<any> {
    return this.http.put(`${this.baseUrl}/user`, user);
  }

}
