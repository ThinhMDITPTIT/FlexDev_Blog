import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserLogin } from './../../../commons/models/IUserLogin';
import { IUserRegister } from './../../../commons/models/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  baseUrl: string = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) { }

  register(user: IUserRegister): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  login(user: IUserLogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, user);
  }


}
