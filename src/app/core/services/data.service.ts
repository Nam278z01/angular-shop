import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Category } from './../entities/category';
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private categories = new BehaviorSubject<Category[]>([]);
  categories$ = this.categories.asObservable();

  private customer = new BehaviorSubject<Customer>(new Customer());
  customer$ = this.customer.asObservable();

  constructor() {

  }

  sendCategories(categories: Category[]) {
    this.categories.next(categories);
    // console.log(this.categories);
  }

  sendCustomer(customer: Customer) {
    this.customer.next(customer);
  }

}
