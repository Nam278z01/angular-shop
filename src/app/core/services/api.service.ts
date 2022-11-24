import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Customer } from '../entities/customer';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  customer: Customer | null;
  host = environment.BASE_API;

  constructor(private _http: HttpClient, private _authService: AuthService, private _storageService: StorageService) {
    this.customer = this._authService.getLoggedInUser();
  }

  get<T>(url: string, params: any = {}, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      header['Authorization'] = `${this.customer?.token_type} ${this.customer?.access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
      params: this.getHttpParams(params)
    }

    return this._http.get<T>(this.host + url, options );
  }

  post(url: string, body: any, params: any = {}, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      header['Authorization'] = `${this.customer?.token_type} ${this.customer?.access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
      params: this.getHttpParams(params),
    }

    return this._http
      .post<any>(this.host + url, body, options)
  }

  put(url: string, body: any, params: any = {}, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      header['Authorization'] = `${this.customer?.token_type} ${this.customer?.access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
      params: this.getHttpParams(params)
    }

    return this._http
      .put<any>(this.host + url, body, options)
  }

  delete(url: string, params: any = {}, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      header['Authorization'] = `${this.customer?.token_type} ${this.customer?.access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
      params: this.getHttpParams(params)
    }

    return this._http
      .delete<any>(this.host + url, options)
  }

  getHttpParams(params : any) : HttpParams {
    let httpParams : HttpParams  = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key , params[key]);
      }
    });
     return httpParams;
   }
}
