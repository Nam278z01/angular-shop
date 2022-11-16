import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public host: string = environment.BASE_API;

  constructor(private _http: HttpClient, private _storageService: StorageService) {

  }

  public login(username: string, password: string): void {
    let body = {
      email: username,
      password
    }
    let header: any = {}
    header['Content-Type'] = 'application/json';

    let options: any = {
      headers: new HttpHeaders(header)
    }

    this._http
      .post<any>(this.host + '/api/login/customer', body, options)
  }

  public isAuthenticated(): boolean {
    if (this._storageService.getItem('CURRENT_CUSTOMER') != null) {
      return true;
    } else {
      return false;
    }
  }

  public getLoggedInUser(): Customer | null {
    let customer: Customer | null;
    if (this.isAuthenticated()) {
      let userData: any = JSON.parse(this._storageService.getItem('CURRENT_CUSTOMER') ?? '{}');
      customer = new Customer(userData.token, userData.token_type);
    } else {
      customer = null;
    }
    return customer;
  }
}
