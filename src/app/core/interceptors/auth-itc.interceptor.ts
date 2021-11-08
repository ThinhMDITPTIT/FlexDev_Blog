import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthItcInterceptor implements HttpInterceptor {

  constructor(private readonly localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);

    if(!request.url.includes('login')){

      let token = this.localStorage.retrieve('token');
      if(token){
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }



    return next.handle(request);
  }
}
