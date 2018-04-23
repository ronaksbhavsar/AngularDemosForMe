import { Injectable } from '@angular/core';
import { IHttpOptions, IRequestOptions } from '../../shared/interfaces/http-interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpClientService {

  constructor(public http: HttpClient,
    public _router: Router ) { }

  get(url: string, headers?: HttpHeaders, params?: HttpParams, options?: IHttpOptions): Observable<any> {
    url = this.updateUrl(url);
    return this.http.get(url, <any>this.getRequestOptions(headers, params, options));
  }

  post(url: string, body: any, options?: IHttpOptions): Observable<any> {
    url = this.updateUrl(url);
    return this.http.post(url, body, <any>this.getRequestOptions(options));
  }

  put(url: string, body: any, options?: IHttpOptions): Observable<any> {
    url = this.updateUrl(url);
    return this.http.put(url, body, <any>this.getRequestOptions(options));
  }

  delete(url: string, options?: IHttpOptions): Observable<any> {
    url = this.updateUrl(url);
    return this.http.put(url, <any>this.getRequestOptions(options));
  }  

  public updateUrl(req: string) {
    if (req.indexOf('http://') == -1)
      return environment.origin + req;
    else
      return req;
  }

  public getRequestOptions(headers?: any, params?: any, options?: IHttpOptions): IRequestOptions {
    headers = headers || {};
    params = params || {};
    options = options || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const requestOptions = Object.assign({}, options);
    if (localStorage.getItem(environment.token)) {
      headers['Authorization'] = 'Bearer ' + (localStorage.getItem(environment.token));
    }
    requestOptions['headers'] = headers;
    requestOptions['params'] = params;
    return requestOptions;
  }
}
