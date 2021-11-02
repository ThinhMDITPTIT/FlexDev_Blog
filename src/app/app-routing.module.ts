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
      import('./feature-modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
