import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthStateService } from '../services/states/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class NoNeedAuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly authStateService: AuthStateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authStateService.getCurrentUserInfo();

    const token = this.localStorage.retrieve('token');
    if(token){
      this.router.navigate(['']);
      return false
    }
    return true;
  }

}
