import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthItcInterceptor implements HttpInterceptor {
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('login')) {
      let token = this.localStorage.retrieve('token');
      if (token) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 0) {
          this.toastr.warning('', 'Unable to connect. Please check your network connection');
        }
        if (err.status === 401) {
          this.localStorage.clear('token');
          this.toastr.warning('', 'You must to Login!');
        }
        if (err.status === 403) {
          this.toastr.warning('Error!', "You don't have permissions!");
        }
        if (err.status === 404) {
          this.toastr.error('Error!', 'Request Not Found!');
          this.router.navigate(['404-not-found']);
        }
        return throwError(err);
      })
    );
  }
}
