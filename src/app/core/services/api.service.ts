import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Customer } from '../entities/customer';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public customer: Customer | null;
  public host = environment.BASE_API;

  constructor(private _http: HttpClient, private _authService: AuthService, private _storageService: StorageService) {
    this.customer = this._authService.getLoggedInUser();
  }

  public get<T>(url: string, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      header['Authorization'] = `${this.customer?.token_type} ${this.customer?.token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header)
    }

    return this._http.get<T>(this.host + url, options);
  }

  public post(url: string, withToken: boolean = true, body: any) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      header['Authorization'] = `${this.customer?.token_type}${this.customer?.token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header)
    }

    return this._http
      .post<any>(this.host + url, body, options)
  }
}
