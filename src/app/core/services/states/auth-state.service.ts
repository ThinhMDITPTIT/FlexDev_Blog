import { EventEmitter, Injectable } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';
import { concatMap, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  public currentUserProfile: any;
  public currentUserProfileEmit: EventEmitter<any>;
  public currentUserChangeEmit: EventEmitter<any>;
  public currentLoggedInEmit: EventEmitter<any>;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly localStorage: LocalStorageService
  ) {
    this.currentUserProfileEmit = new EventEmitter<any>();
    this.currentUserChangeEmit = new EventEmitter<any>();
    this.currentLoggedInEmit = new EventEmitter<any>();

    this.authApiService.getCurrentUser().subscribe((data: any) => {
      this.currentUserProfile = data;
      this.currentUserProfileEmit.emit(this.currentUserProfile);
    });

    this.currentUserChangeEmit.subscribe(() => {
      this.authApiService.getCurrentUser().subscribe((data: any) => {
        this.currentUserProfile = data;
        this.currentUserProfileEmit.emit(this.currentUserProfile);
      });
    });
  }

  public getCurrentUserInfo() {
    this.authApiService.getCurrentUser().subscribe(
      (data: any) => {
        this.currentLoggedInEmit.emit(data);
      },
      (error: any) => {
        this.currentLoggedInEmit.emit(error);
      }
    );
  }

  login(user: any) {
    return this.authApiService.login(user).pipe(
      tap((res) => {
        this.localStorage.store('token', res.user.token);
        this.currentUserChangeEmit.emit();
      })
    );
  }

  register(user: any) {
    return this.authApiService
      .register(user)
      .pipe(concatMap(() => this.login(user)));
  }
}
