import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ListArticleModule } from 'src/app/commons/shared-modules/list-article/list-article.module';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbNavModule,
    ListArticleModule
  ]
})
export class ProfileModule {}
