import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from './commons/enums/route.enum';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { NoNeedAuthGuard } from './core/guards/no-need-auth-guard.guard';

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
    canActivate: [NoNeedAuthGuard],
  },
  {
    path: Route.SIGNUP,
    loadChildren: () =>
      import('./feature-modules/auth/signup/signup.module').then(
        (m) => m.SignUpModule
      ),
    canActivate: [NoNeedAuthGuard],
  },
  {
    path: Route.SETTING,
    loadChildren: () =>
      import('./feature-modules/auth/setting/setting.module').then(
        (m) => m.SettingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: Route.EDITOR,
    loadChildren: () =>
      import(
        './feature-modules/editor/article-editor-details/article-editor-details.module'
      ).then((m) => m.ArticleEditorDetailsModule),
    canActivate: [AuthGuard],
  },
  {
    path: Route.EDITOR_ID,
    loadChildren: () =>
      import(
        './feature-modules/editor/article-editor-details/article-editor-details.module'
      ).then((m) => m.ArticleEditorDetailsModule),
    canActivate: [AuthGuard],
  },
  {
    path: Route.ARTICLE_ID,
    loadChildren: () =>
      import(
        './feature-modules/editor/article-details/article-details.module'
      ).then((m) => m.ArticleDetailsModule),
  },
  {
    path: Route.PROFILE_USER,
    loadChildren: () =>
      import('./feature-modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./commons/shared-modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
