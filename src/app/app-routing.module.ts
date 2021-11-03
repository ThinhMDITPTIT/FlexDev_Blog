import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from './commons/enums/route.enum';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature-modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: Route.LOGIN,
    loadChildren: () =>
      import('./feature-modules/auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: Route.SIGNUP,
    loadChildren: () =>
      import('./feature-modules/auth/signup/signup.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: Route.SETTING,
    loadChildren: () =>
      import('./feature-modules/auth/setting/setting.module').then(
        (m) => m.SettingModule
      ),
  },
  {
    path: Route.EDITOR,
    loadChildren: () =>
      import('./feature-modules/editor/editor.module').then(
        (m) => m.EditorModule
      ),
  },
  {
    path: Route.EDITOR_ID,
    loadChildren: () =>
      import('./feature-modules/editor/editor.module').then(
        (m) => m.EditorModule
      ),
  },
  {
    path: Route.ARTICLE_ID,
    loadChildren: () =>
      import('./feature-modules/editor/editor.module').then(
        (m) => m.EditorModule
      ),
  },
  {
    path: Route.PROFILE_USER,
    loadChildren: () =>
      import('./feature-modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
