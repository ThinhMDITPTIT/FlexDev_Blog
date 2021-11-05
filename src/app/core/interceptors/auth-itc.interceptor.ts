import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthItcInterceptor implements HttpInterceptor {
  public fakeToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODI1ZjRhNzY4YmM5YzQ0ZmE0MzIxMiIsInVzZXJuYW1lIjoiam9obmphY29iIiwiZXhwIjoxNjQxMzA3MDAxLCJpYXQiOjE2MzYxMjMwMDF9.YEHmnXyYZcK4nOULv2M_TqxS_oLBckJTzqD--T-ORxQ';

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.fakeToken),
    });

    return next.handle(request);
  }
}
