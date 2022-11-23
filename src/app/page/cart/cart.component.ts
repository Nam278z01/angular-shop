import { Component, OnInit, Injector } from '@angular/core';

import { Utils } from './../../core/common/utils';
import { Customer } from './../../core/entities/customer';
import { Cart } from 'src/app/core/entities/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends Utils implements OnInit {

  customer: Customer;
  cart: Cart[];
  total_price: number;
  chose_all: any;
  isPaying: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._cartService.total_price$.subscribe((res: number) => {
      this.total_price = res;
    })

    this._dataService.customer$.subscribe(res => this.customer = res);

    this._cartService.cart$.subscribe((res: Cart[]) => {
      this.cart = res;

      this.chose_all = {
        value:
            this.cart.filter((product) => product.chose).length == this.cart.length,
      };
    })

  }

  choseAll() {
    let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

    cart.forEach((item: any) => {
      item.chose = this.chose_all.value;
    });

    this._storageService.setItem('CART', cart);

    this.cart.forEach((product) => {
        product.chose = this.chose_all.value;
    });

    // this._cartService.sendCart(this.cart);
    this._cartService.recalculateTotalPrice();
  }

  chose(product: Cart) {
    let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

    cart.forEach((item: any) => {
      if (item.cart_id == product.cart_id) {
        item.chose = product.chose;
      }
    });

    this._storageService.setItem('CART', cart);
    this.chose_all.value =
        this.cart.filter((product) => {
            return product.chose;
        }).length == this.cart.length;

    // this._cartService.sendCart(this.cart);
    this._cartService.recalculateTotalPrice();
  };

  checkout() {

  }
}
