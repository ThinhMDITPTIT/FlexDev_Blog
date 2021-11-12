import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Event, NavigationEnd, NavigationStart, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/states/auth-state.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.localStorage.retrieve('token');
    if(!token){
      this.router.navigate(['login']);
      return false
    }
    return true
  }

}
