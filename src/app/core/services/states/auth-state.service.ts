import { Injectable } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  public currentUserProfile: any;
  public currentUserProfile$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentLoggedIn$: BehaviorSubject<any> = new BehaviorSubject<string>("");
  public hasToken$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly localStorage: LocalStorageService
  ) {}

  public getCurrentUserInfo() {
    return this.authApiService.getCurrentUser().pipe(
      map((data: any) => {
        this.currentUserProfile = data;
        return data;
      }),
      catchError((err) => {
        this.currentUserProfile = undefined;
        return err;
      })
    );
  }

  login(user: any) {
    return this.authApiService.login(user).pipe(
      tap((res) => {
        this.localStorage.store('token', res.user.token);
        this.currentLoggedIn$.next(res.user.username);
        this.getCurrentUserInfo();
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
