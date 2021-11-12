import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApiService } from '../apis/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  // public userProfile: any;
  // public usernameAuthor: any;
  // public userProfileEmit: EventEmitter<any>;
  // public usernameAuthorSubject = new BehaviorSubject<string>('');

  constructor(private readonly userApiService: UserApiService) {
    // this.userProfileEmit = new EventEmitter<any>();
    // this.usernameAuthorSubject.subscribe((data: any) => {
    //   if (data !== '') {
    //     this.usernameAuthor = data;
    //     this.userApiService
    //       .getProfile(this.usernameAuthor)
    //       .subscribe((userData: any) => {
    //         this.userProfile = userData;
    //         this.userProfileEmit.emit(this.userProfile);
    //       });
    //   }
    // });
  }
}
