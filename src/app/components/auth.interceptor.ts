import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('inside interceptor', request);

    if (request.method === 'POST' || request.method === 'GET' || request.method === 'PUT' || request.method == 'DELETE') {
      if (request.url.match('login')) {
        const user: any = request.body;
        request = request.clone({
          // url: environment.baseURL + request.url,
          url: environment.baseURL + 'users',
          headers: request.headers.set('Authorization', 'No Auth ' + btoa(unescape(user.email + ':' + user.password))),
        });
      } else {
        // console.log('inside else: ', request)
        request = request.clone({
          url: environment.baseURL + request.url,
          headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessTokenId)
        });
      }

      // console.log('final request: ', request)

      return next.handle(request).pipe(tap(event => { }, err => {
        // if ((err.status === 401 || err.status === 440) && this.router.url !== '/login') {
        //   let title = 'Session expired. Please login again';
        //   if (req.url.match('getUser')) {
        //   }
        //   this.authService.clearLocalStorage();
        //   return this.router.navigate(['/login']);
        // } else if (err.status && err.status !== 434) {
        //   if (err.error.error) {
        //   }
        // }
      })
      );
    } else {
      return next.handle(request);
    }
  }
}
