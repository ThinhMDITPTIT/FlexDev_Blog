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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODI2MDAzMWQ0ODE0YTgzNGZmZGNmNSIsInVzZXJuYW1lIjoiam9obmphY29iIiwiZXhwIjoxNjQxMjg3OTU1LCJpYXQiOjE2MzYxMDM5NTV9.GM6Vvh_6jXNdIs6qUZtU4UH8aZACgJpraN44_6G77SU';

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
