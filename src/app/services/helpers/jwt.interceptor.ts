import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = JSON.parse(this.authenticationService.getToken() || '{}');
    if (currentToken && currentToken.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken.token}`,
        },
      });
    }
    return next.handle(request);
  }

}
