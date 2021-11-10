import { EventEmitter, Injectable } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  public currentUserProfile: any;
  public currentUserProfileEmit: EventEmitter<any>;
  public currentUserChangeEmit: EventEmitter<any>;

  constructor(private readonly authApiService: AuthApiService) {
    this.currentUserProfileEmit = new EventEmitter<any>();
    this.currentUserChangeEmit = new EventEmitter<any>();
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
}
