import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.injectToken(request)).pipe(
      filter(event => event instanceof HttpResponse),
      tap((event: HttpResponse<any>) => {;
        const X_REFRESH_TOKEN = event.headers.get('X_REFRESH_TOKEN');
        if(X_REFRESH_TOKEN !== null && X_REFRESH_TOKEN !== undefined && X_REFRESH_TOKEN !== ''){
          localStorage.setItem('X_AUTH_TOKEN', X_REFRESH_TOKEN);
        }
      })
    );
  }

  injectToken(request: HttpRequest<any>) {
    const X_AUTH_TOKEN = localStorage.getItem('X_AUTH_TOKEN');
    return request.clone({
      setHeaders: {
        X_AUTH_TOKEN: `${X_AUTH_TOKEN}`
      }
    });
  }

}
