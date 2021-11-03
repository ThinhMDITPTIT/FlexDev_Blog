import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, RouterModule],
})
export class ProfileModule {}
