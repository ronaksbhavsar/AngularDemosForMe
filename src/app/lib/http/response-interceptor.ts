import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import { AuthService } from '../../shared/services/auth.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CustomNotification } from '../../CustomNotification';
import { Utilities } from '../../Utilities';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public authService: AuthService, public _router: Router,
    private customNotification: CustomNotification) {
    this.isRefreshingToken = false;
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    } else {
      return req;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(this.addToken(req, this.authService.getAuthToken())).catch(x => this.handleAuthError(x, req, next)); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }

  public handleAuthError(err: HttpErrorResponse, req: any, next: any): Observable<any> {
    //handle your auth error or rethrow
    if (err instanceof HttpErrorResponse) {
      switch ((<HttpErrorResponse>err).status) {
        case 400:
          return this.handle400Error(err);
        case 401:
          return this.handle401Error(req, next);        
      }
    } else {
      return Observable.throw(err);
    }

    return Observable.throw(err);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      this.logoutUser();
      return this.authService.refreshToken()
        .switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        })
        .catch(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }
    return Observable.throw(error);
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    localStorage.removeItem(environment.token);
    this._router.navigate(['/login']);
    return Observable.throw('');
  }
}
