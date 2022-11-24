import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string = environment.BASE_API;

  constructor(private _http: HttpClient, private _storageService: StorageService, private _dataService: DataService) {
    this.getCurrentCustomer();
  }

  login(username: string, password: string) {
    let body = {
      email: username,
      password
    }
    let header: any = {}
    header['Content-Type'] = 'application/json';

    let options: any = {
      headers: new HttpHeaders(header)
    }

    return this._http
      .post<any>(this.host + '/api/login/customer', body, options)
  }

  logout() {
    if (this.isAuthenticated()) {
      let header: any = {}
      header['Content-Type'] = 'application/json';

      let customer = this.getLoggedInUser();
      console.log(customer)
      header['Authorization'] = `${customer?.token_type} ${customer?.access_token}`;

      let options: any = {
        headers: new HttpHeaders(header),
      }

      this._http.delete<any>(this.host + '/api/logout', options).subscribe((res: any) => {
        this._storageService.removeItem('CURRENT_CUSTOMER');
        window.location.reload();
      });
    }
  }

  isAuthenticated(): boolean {
    if (this._storageService.getItem('CURRENT_CUSTOMER') != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser(): Customer | null {
    let customer: Customer | null;
    if (this.isAuthenticated()) {
      let userData: any = JSON.parse(this._storageService.getItem('CURRENT_CUSTOMER') ?? '{}');
      customer = new Customer();
      customer.token_type = userData.token_type;
      customer.access_token = userData.access_token;
    } else {
      customer = null;
    }
    return customer;
  }

  getCurrentCustomer() {
    if (this.isAuthenticated()) {
      let header: any = {}
      header['Content-Type'] = 'application/json';

      let customer = this.getLoggedInUser();
      console.log(customer)
      header['Authorization'] = `${customer?.token_type} ${customer?.access_token}`;

      let options: any = {
        headers: new HttpHeaders(header),
      }

      this._http.get<Customer>(this.host + '/api/customer', options).subscribe((res: any) => {
        this._dataService.sendCustomer(res)
      });
    }
  }
}
