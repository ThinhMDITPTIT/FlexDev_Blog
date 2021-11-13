import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserApiService } from '../apis/user-api.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  // public userProfile$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private readonly userApiService: UserApiService) {}

  public getUserProfileByUsername(username: any) {
    return this.userApiService.getProfile(username).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  public followUserByUsername(username: any) {
    return this.userApiService.followUser(username).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  public unFollowUserByUsername(username: any) {
    return this.userApiService.unfollowUser(username).pipe(
      map((data: any) => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(error || 'Server error')
  }
}
