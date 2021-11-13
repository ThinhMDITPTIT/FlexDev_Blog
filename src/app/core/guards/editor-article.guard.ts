import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckDeactivate } from './../../commons/models/check-deactive';

@Injectable({
  providedIn: 'root'
})
export class EditorArticleGuard implements CanDeactivate<CheckDeactivate> {
  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
}
