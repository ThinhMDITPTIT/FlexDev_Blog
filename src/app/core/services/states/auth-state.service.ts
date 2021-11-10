import { EventEmitter, Injectable } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  public currentUserProfile: any;
  public currentUserProfileEmit: EventEmitter<any>;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly localStorage: LocalStorageService
  ) {

    this.currentUserProfileEmit = new EventEmitter<any>();
    this.authApiService.getCurrentUser().subscribe((data: any) => {
      this.currentUserProfile = data;
      this.currentUserProfileEmit.emit(this.currentUserProfile);
    });
  }

  login(user: any) {
    return this.authApiService.login(user).pipe(
      tap(res => this.localStorage.store('token', res.user.token))
    );
  }

  register(user: any) {
    return this.authApiService.register(user).pipe(
      concatMap(() => this.login(user))
    )
  }
}
