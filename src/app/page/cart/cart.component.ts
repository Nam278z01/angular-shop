import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Utils } from './../../core/common/utils';
import { Customer } from './../../core/entities/customer';
import { Cart } from 'src/app/core/entities/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends Utils implements OnInit, OnDestroy {

  customer: Customer;
  cart: Cart[];
  total_price: number;
  chose_all: any;
  isPaying: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._cartService.total_price$.subscribe((res: number) => {
      this.total_price = res;
    })

    this._dataService.customer$.subscribe(res => this.customer = res);

    this.subscriptions.push(
      this._cartService.cart$.subscribe((res: Cart[]) => {
        this.cart = res;

        this.chose_all = {
          value:
              this.cart.filter((product) => product.chose).length == this.cart.length,
        };
        console.log('cart from cart');
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
