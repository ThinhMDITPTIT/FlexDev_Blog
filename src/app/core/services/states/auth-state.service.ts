import { EventEmitter, Injectable } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  public currentUserProfile: any;
  public currentUserProfile$: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );
  public currentLoggedIn$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly localStorage: LocalStorageService
  ) {}

  public getCurrentUserInfo() {
    return this.authApiService.getCurrentUser().pipe(
      map((data: any) => {
        this.currentUserProfile = data;
        this.currentLoggedIn$.next('LoggedIn');
        return data;
      }),
      catchError((err) => {
        this.currentUserProfile = undefined;
        this.currentLoggedIn$.next('Logout');
        return err;
      })
    );
  }

  login(user: any) {
    return this.authApiService.login(user).pipe(
      tap((res) => {
        this.localStorage.store('token', res.user.token);
        return res.user.token;
      })
    );
  }

  register(user: any) {
    return this.authApiService
      .register(user)
      .pipe(concatMap(() => this.login(user)));
  }
}
