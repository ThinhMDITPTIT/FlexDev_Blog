import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthItcInterceptor implements HttpInterceptor {
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly toastr: ToastrService
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
        // console.log(err);
        if (err.status === 401) {
          this.localStorage.clear('token');
          return throwError(err);
        }
        if (err.status === 403) {
          this.toastr.error('Error!', err.error.errors.error.message);
        }
        if (err.status === 404) {
          this.toastr.error('Error!', err.error.errors.error.message);
        }
        return throwError(err);
      })
    );
  }
}
