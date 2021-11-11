import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApiService } from '../apis/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  public userProfileEmit: EventEmitter<any>;

  constructor(private readonly userApiService: UserApiService) {
    this.userProfileEmit = new EventEmitter<any>();
  }

  public getUserProfileByUsername(username: any) {
    this.userApiService.getProfile(username).subscribe((data: any) => {
      this.userProfileEmit.emit(data);
    });
  }

  public followUserByUsername(username: any) {
    this.userApiService.followUser(username).subscribe((data: any) => {
      this.userProfileEmit.emit(data);
    });
  }

  public unFollowUserByUsername(username: any) {
    this.userApiService.unfollowUser(username).subscribe((data: any) => {
      this.userProfileEmit.emit(data);
    });
  }
}
